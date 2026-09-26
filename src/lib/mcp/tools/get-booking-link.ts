import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { buildBookingUrl, isoDate } from "../booking";

export default defineTool({
  name: "get_booking_link",
  title: "Enlace de reserva",
  description: "Build the direct booking-engine link for given dates and guests (does not check availability).",
  inputSchema: {
    checkin: z.string().regex(isoDate).describe("Check-in date, YYYY-MM-DD."),
    checkout: z.string().regex(isoDate).describe("Check-out date, YYYY-MM-DD."),
    adults: z.number().int().min(1).max(4).default(2),
    children: z.number().int().min(0).max(3).default(0),
    babies: z.number().int().min(0).max(2).default(0),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ checkin, checkout, adults, children, babies }) => {
    if (checkout <= checkin) throw new ToolError("checkout must be after checkin");
    if (adults + children > 4) throw new ToolError("Maximum capacity is 4 guests (adults + children).");
    const url = buildBookingUrl(checkin, checkout, adults, children, babies);
    return { content: [{ type: "text", text: url }], structuredContent: { url } };
  },
});
