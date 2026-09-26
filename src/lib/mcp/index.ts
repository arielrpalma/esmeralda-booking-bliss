import { defineMcp } from "@lovable.dev/mcp-js";
import checkAvailability from "./tools/check-availability";
import getPropertyInfo from "./tools/get-property-info";
import getBookingLink from "./tools/get-booking-link";

// Public server: tools only expose public data and the public availability function.
export default defineMcp({
  name: "esmeralda-apart",
  title: "Esmeralda Apart",
  version: "0.1.0",
  instructions:
    "Tools for Esmeralda Apart, apartments in Marcos Juárez (Córdoba, Argentina). Use `get_property_info` for verified details, `check_availability` to check dates and get a booking link, and `get_booking_link` to build a booking URL. Never invent facts about the property.",
  tools: [checkAvailability, getPropertyInfo, getBookingLink],
});
