import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAnon } from "../supabase";
import { buildBookingUrl, isoDate } from "../booking";

interface Suggestion { checkin: string; checkout: string; nights: number }
interface AvailabilityResult {
  available: boolean; nights: number; checkin: string; checkout: string;
  extensions?: Suggestion[]; before?: Suggestion[]; after?: Suggestion[];
}

const toSuggestion = (s: Suggestion) => ({ checkin: s.checkin, checkout: s.checkout, nights: s.nights });

export default defineTool({
  name: "check_availability",
  title: "Consultar disponibilidad",
  description: "Check Esmeralda Apart availability for a date range and get a direct booking link plus alternative dates.",
  inputSchema: {
    checkin: z.string().regex(isoDate).describe("Check-in date, YYYY-MM-DD."),
    checkout: z.string().regex(isoDate).describe("Check-out date, YYYY-MM-DD."),
    adults: z.number().int().min(1).max(4).default(2).describe("Adults (+4 years)."),
    children: z.number().int().min(0).max(3).default(0).describe("Children occupying a bed."),
    babies: z.number().int().min(0).max(2).default(0).describe("Babies under 1 year (no bed)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ checkin, checkout, adults, children, babies }) => {
    if (checkout <= checkin) throw new ToolError("checkout must be after checkin");
    if (adults + children > 4) throw new ToolError("Maximum capacity is 4 guests (adults + children).");
    const { data, error } = await supabaseAnon().functions.invoke<AvailabilityResult>("check-availability", {
      body: { checkin, checkout },
    });
    if (error || !data) throw new ToolError("Could not check availability right now. Try again later.");
    const result = {
      available: data.available,
      checkin: data.checkin,
      checkout: data.checkout,
      nights: data.nights,
      bookingUrl: data.available ? buildBookingUrl(checkin, checkout, adults, children, babies) : null,
      extensions: (data.extensions ?? []).map(toSuggestion),
      alternativesBefore: (data.before ?? []).map(toSuggestion),
      alternativesAfter: (data.after ?? []).map(toSuggestion),
    };
    const text = data.available
      ? `Available ${checkin} → ${checkout} (${data.nights} nights). Book: ${result.bookingUrl}`
      : `Not available ${checkin} → ${checkout}. See alternative dates.`;
    return { content: [{ type: "text", text }], structuredContent: result };
  },
});
