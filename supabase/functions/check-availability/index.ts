import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ICAL_URL =
  "https://www.airbnb.com.ar/calendar/ical/1435846364750091867.ics?t=01ab22fb325849718df0a66428c21f86";

interface BlockedRange {
  start: Date;
  end: Date;
}

function parseIcal(text: string): BlockedRange[] {
  const ranges: BlockedRange[] = [];
  const events = text.split("BEGIN:VEVENT");

  for (let i = 1; i < events.length; i++) {
    const event = events[i];
    const dtstart = event.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
    const dtend = event.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);

    if (dtstart && dtend) {
      const startStr = dtstart[1];
      const endStr = dtend[1];
      ranges.push({
        start: new Date(
          `${startStr.slice(0, 4)}-${startStr.slice(4, 6)}-${startStr.slice(6, 8)}`
        ),
        end: new Date(
          `${endStr.slice(0, 4)}-${endStr.slice(4, 6)}-${endStr.slice(6, 8)}`
        ),
      });
    }
  }
  return ranges;
}

function isRangeBlocked(
  checkin: Date,
  checkout: Date,
  blocked: BlockedRange[]
): boolean {
  for (const b of blocked) {
    // Overlap: checkin < b.end && checkout > b.start
    if (checkin < b.end && checkout > b.start) {
      return true;
    }
  }
  return false;
}

function findAlternatives(
  checkin: Date,
  checkout: Date,
  blocked: BlockedRange[],
  count = 5
): { checkin: string; checkout: string; nights: number }[] {
  const minNights = Math.round(
    (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24)
  );
  const alternatives: { checkin: string; checkout: string; nights: number }[] =
    [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Try same nights first, then +1, +2 extra nights
  for (let extra = 0; extra <= 3 && alternatives.length < count; extra++) {
    const nights = minNights + extra;
    for (let offset = -7; offset <= 90 && alternatives.length < count; offset++) {
      if (offset === 0 && extra === 0) continue;
      const candidate = new Date(checkin);
      candidate.setDate(candidate.getDate() + offset);

      if (candidate < today) continue;

      const candidateEnd = new Date(candidate);
      candidateEnd.setDate(candidateEnd.getDate() + nights);

      // Avoid duplicates
      const key = `${candidate.toISOString().slice(0, 10)}-${candidateEnd.toISOString().slice(0, 10)}`;
      if (alternatives.some(a => `${a.checkin}-${a.checkout}` === key)) continue;

      if (!isRangeBlocked(candidate, candidateEnd, blocked)) {
        alternatives.push({
          checkin: candidate.toISOString().slice(0, 10),
          checkout: candidateEnd.toISOString().slice(0, 10),
          nights,
        });
      }
    }
  }
  return alternatives;
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

    // Fetch iCal
    const icalResponse = await fetch(ICAL_URL);
    if (!icalResponse.ok) {
      throw new Error(`Failed to fetch iCal: ${icalResponse.status}`);
    }
    const icalText = await icalResponse.text();
    const blocked = parseIcal(icalText);

    const available = !isRangeBlocked(checkinDate, checkoutDate, blocked);

    const result: Record<string, unknown> = { available };

    if (!available) {
      result.alternatives = findAlternatives(
        checkinDate,
        checkoutDate,
        blocked
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
