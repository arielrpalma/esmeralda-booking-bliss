import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ICAL_URL =
  "https://www.airbnb.com.ar/calendar/ical/1435846364750091867.ics?t=01ab22fb325849718df0a66428c21f86";

// Configuration
const SEARCH_DAYS_BEFORE = 30;
const SEARCH_DAYS_AFTER = 30;
const MAX_EXTRA_NIGHTS = 5; // suggest up to +5 nights longer
const MAX_SAME_NIGHTS = 4;  // max same-length alternatives
const MAX_LONGER_STAYS = 4; // max longer-stay suggestions

interface BlockedRange {
  start: Date;
  end: Date;
}

interface Suggestion {
  checkin: string;
  checkout: string;
  nights: number;
  type: "same" | "longer" | "extension";
  proximity: number; // days from original checkin
}

function parseIcal(text: string): BlockedRange[] {
  const ranges: BlockedRange[] = [];
  const events = text.split("BEGIN:VEVENT");

  for (let i = 1; i < events.length; i++) {
    const event = events[i];
    const dtstart = event.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
    const dtend = event.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);

    if (dtstart && dtend) {
      const s = dtstart[1];
      const e = dtend[1];
      ranges.push({
        start: new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`),
        end: new Date(`${e.slice(0, 4)}-${e.slice(4, 6)}-${e.slice(6, 8)}`),
      });
    }
  }
  return ranges;
}

function isRangeAvailable(checkin: Date, checkout: Date, blocked: BlockedRange[]): boolean {
  for (const b of blocked) {
    if (checkin < b.end && checkout > b.start) return false;
  }
  return true;
}

function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function diffDays(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Find same-length alternatives, searching outward from original date.
 * Alternates between forward and backward for proximity ordering.
 */
function findSameNightsAlternatives(
  checkin: Date,
  nights: number,
  blocked: BlockedRange[],
  today: Date,
  max: number
): Suggestion[] {
  const results: Suggestion[] = [];
  const seen = new Set<string>();

  // Interleave forward and backward offsets: +1, -1, +2, -2, ...
  for (let dist = 1; dist <= Math.max(SEARCH_DAYS_AFTER, SEARCH_DAYS_BEFORE) && results.length < max; dist++) {
    for (const dir of [1, -1]) {
      if (results.length >= max) break;
      const offset = dist * dir;
      if (dir === 1 && dist > SEARCH_DAYS_AFTER) continue;
      if (dir === -1 && dist > SEARCH_DAYS_BEFORE) continue;

      const candidate = addDays(checkin, offset);
      if (candidate < today) continue;

      const candidateEnd = addDays(candidate, nights);
      const key = `${dateStr(candidate)}-${dateStr(candidateEnd)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      if (isRangeAvailable(candidate, candidateEnd, blocked)) {
        results.push({
          checkin: dateStr(candidate),
          checkout: dateStr(candidateEnd),
          nights,
          type: "same",
          proximity: Math.abs(offset),
        });
      }
    }
  }

  return results;
}

/**
 * Find longer-stay alternatives from nearby dates.
 * Searches +1 to +MAX_EXTRA_NIGHTS additional nights.
 */
function findLongerStayAlternatives(
  checkin: Date,
  baseNights: number,
  blocked: BlockedRange[],
  today: Date,
  max: number
): Suggestion[] {
  const results: Suggestion[] = [];
  const seen = new Set<string>();

  for (let extra = 1; extra <= MAX_EXTRA_NIGHTS && results.length < max; extra++) {
    const nights = baseNights + extra;
    // Try from the original checkin first, then nearby dates
    for (let dist = 0; dist <= SEARCH_DAYS_AFTER && results.length < max; dist++) {
      for (const dir of dist === 0 ? [0] : [1, -1]) {
        if (results.length >= max) break;
        const offset = dist * (dir || 1);
        const candidate = addDays(checkin, offset);
        if (candidate < today) continue;

        const candidateEnd = addDays(candidate, nights);
        const key = `${dateStr(candidate)}-${dateStr(candidateEnd)}`;
        if (seen.has(key)) continue;
        seen.add(key);

        if (isRangeAvailable(candidate, candidateEnd, blocked)) {
          results.push({
            checkin: dateStr(candidate),
            checkout: dateStr(candidateEnd),
            nights,
            type: "longer",
            proximity: Math.abs(offset),
          });
          break; // one per extra-night tier, from closest date
        }
      }
    }
  }

  return results;
}

/**
 * Find extensions: same checkin, more nights (only when available).
 */
function findExtensions(
  checkin: Date,
  baseNights: number,
  blocked: BlockedRange[],
  max = 4
): Suggestion[] {
  const results: Suggestion[] = [];

  for (let extra = 1; extra <= MAX_EXTRA_NIGHTS + 2 && results.length < max; extra++) {
    const nights = baseNights + extra;
    const end = addDays(checkin, nights);

    if (isRangeAvailable(checkin, end, blocked)) {
      results.push({
        checkin: dateStr(checkin),
        checkout: dateStr(end),
        nights,
        type: "extension",
        proximity: 0,
      });
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

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = diffDays(checkinDate, checkoutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch iCal
    const icalResponse = await fetch(ICAL_URL);
    if (!icalResponse.ok) {
      throw new Error(`Failed to fetch iCal: ${icalResponse.status}`);
    }
    const icalText = await icalResponse.text();
    const blocked = parseIcal(icalText);

    const available = isRangeAvailable(checkinDate, checkoutDate, blocked);

    const result: Record<string, unknown> = {
      available,
      nights,
      checkin,
      checkout,
    };

    if (available) {
      // Offer extensions (longer stays from same checkin)
      result.extensions = findExtensions(checkinDate, nights, blocked);
    } else {
      // Offer categorized alternatives
      result.sameNights = findSameNightsAlternatives(
        checkinDate, nights, blocked, today, MAX_SAME_NIGHTS
      );
      result.longerStays = findLongerStayAlternatives(
        checkinDate, nights, blocked, today, MAX_LONGER_STAYS
      );
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("check-availability error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
