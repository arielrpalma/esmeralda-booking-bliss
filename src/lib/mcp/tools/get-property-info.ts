import { defineTool } from "@lovable.dev/mcp-js";

// Only verified facts already published on the website.
const info = {
  name: "Esmeralda Apart",
  city: "Marcos Juárez, Córdoba, Argentina",
  website: "https://esmeraldaapart.com.ar",
  whatsapp: "https://wa.me/5493472433334",
  maxGuests: 4,
  guestRules: "Up to 4 guests occupying a bed (adults + children). Babies under 1 year do not count.",
  checkIn: "Automatic 24h self check-in; usual entry from 14:00. Access instructions sent via WhatsApp.",
  amenities: ["Private bathroom", "Hot/cold air conditioning", "Wi-Fi", "Smart TV", "Equipped kitchen (fridge, stove, microwave, tableware)"],
  motorcycleParking: "Parking space for motorcycles, to be coordinated in advance and subject to availability.",
  bookingPolicy: "Same-day bookings are not accepted after 22:00 (Argentina time).",
};

export default defineTool({
  name: "get_property_info",
  title: "Información del alojamiento",
  description: "Get verified information about Esmeralda Apart: location, amenities, capacity, check-in and contact.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
    structuredContent: { ...info, amenities: [...info.amenities] },
  }),
});
