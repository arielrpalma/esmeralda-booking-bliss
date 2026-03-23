import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ICAL_URL =
  "https://www.airbnb.com.ar/calendar/ical/1435846364750091867.ics?t=01ab22fb325849718df0a66428c21f86";

interface BlockedRange { start: Date; end: Date; }
interface Suggestion { checkin: string; checkout: string; nights: number; }

function parseIcal(text: string): BlockedRange[] {
  const ranges: BlockedRange[] = [];
  const events = text.split("BEGIN:VEVENT");
  for (let i = 1; i < events.length; i++) {
    const ev = events[i];
    const ds = ev.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
    const de = ev.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);
    if (ds && de) {
      const s = ds[1], e = de[1];
      ranges.push({
        start: new Date(`${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,8)}`),
        end: new Date(`${e.slice(0,4)}-${e.slice(4,6)}-${e.slice(6,8)}`),
      });
    }
  }
  return ranges;
}

function isAvailable(ci: Date, co: Date, blocked: BlockedRange[]): boolean {
  for (const b of blocked) {
    if (ci < b.end && co > b.start) return false;
  }
  return true;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d); r.setDate(r.getDate() + n); return r;
}
function fmt(d: Date): string { return d.toISOString().slice(0, 10); }
function diffDays(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Find up to `count` available options AFTER the original checkin.
 * First tries same nights (+1 day, +2 days...), then same nights +1, +2...
 * So for 4-night stay: 4 noches después, 5 noches después, 6 noches después
 */
function findAfter(
  checkin: Date, baseNights: number, blocked: BlockedRange[], today: Date, count = 3
): Suggestion[] {
  const results: Suggestion[] = [];
  const seen = new Set<string>();

  // For each extra night tier (0 = same, 1 = +1 night, 2 = +2 nights...)
  for (let extra = 0; extra <= 7 && results.length < count; extra++) {
    const nights = baseNights + extra;
    // Search forward from day after original checkin
    for (let offset = 1; offset <= 60 && results.length < count; offset++) {
      const ci = addDays(checkin, offset);
      if (ci < today) continue;
      const co = addDays(ci, nights);
      const key = `${fmt(ci)}-${fmt(co)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      if (isAvailable(ci, co, blocked)) {
        results.push({ checkin: fmt(ci), checkout: fmt(co), nights });
        break; // one per tier, closest first
      }
    }
  }
  return results;
}

/**
 * Find up to `count` available options BEFORE the original checkin.
 * Same logic but searching backwards.
 */
function findBefore(
  checkin: Date, baseNights: number, blocked: BlockedRange[], today: Date, count = 3
): Suggestion[] {
  const results: Suggestion[] = [];
  const seen = new Set<string>();

  for (let extra = 0; extra <= 7 && results.length < count; extra++) {
    const nights = baseNights + extra;
    for (let offset = 1; offset <= 60 && results.length < count; offset++) {
      const ci = addDays(checkin, -offset);
      if (ci < today) continue;
      const co = addDays(ci, nights);
      const key = `${fmt(ci)}-${fmt(co)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      if (isAvailable(ci, co, blocked)) {
        results.push({ checkin: fmt(ci), checkout: fmt(co), nights });
        break;
      }
    }
  }
  return results.reverse(); // chronological order
}

/**
 * Extensions: same checkin, more nights (when original IS available).
 */
function findExtensions(
  checkin: Date, baseNights: number, blocked: BlockedRange[], count = 4
): Suggestion[] {
  const results: Suggestion[] = [];
  for (let extra = 1; extra <= 7 && results.length < count; extra++) {
    const nights = baseNights + extra;
    const co = addDays(checkin, nights);
    if (isAvailable(checkin, co, blocked)) {
      results.push({ checkin: fmt(checkin), checkout: fmt(co), nights });
    }
  }
  return results;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { checkin, checkout } = await req.json();
    if (!checkin || !checkout) {
      return new Response(
        JSON.stringify({ error: "checkin and checkout are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ciDate = new Date(checkin);
    const coDate = new Date(checkout);
    const nights = diffDays(ciDate, coDate);
    const today = new Date(); today.setHours(0, 0, 0, 0);

    const icalResp = await fetch(ICAL_URL);
    if (!icalResp.ok) throw new Error(`iCal fetch failed: ${icalResp.status}`);
    const blocked = parseIcal(await icalResp.text());

    const available = isAvailable(ciDate, coDate, blocked);

    const result: Record<string, unknown> = { available, nights, checkin, checkout };

    if (available) {
      result.extensions = findExtensions(ciDate, nights, blocked);
    } else {
      result.before = findBefore(ciDate, nights, blocked, today, 3);
      result.after = findAfter(ciDate, nights, blocked, today, 3);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("check-availability error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
