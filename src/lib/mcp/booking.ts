// Shared booking helpers for MCP tools. No env reads at module top level.
export const BOOKING_BASE_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms";

export function buildBookingUrl(checkin: string, checkout: string, adults: number, children = 0, babies = 0) {
  const params = new URLSearchParams();
  params.set("currency", "ARS");
  params.set("language", "es-ES");
  params.set("from", checkin);
  params.set("to", checkout);
  params.set("nAdults", String(adults));
  if (children > 0) params.set("nChilds", String(children));
  if (babies > 0) params.set("nBabies", String(babies));
  params.set("rp", "");
  return `${BOOKING_BASE_URL}?${params.toString()}`;
}

export const isoDate = /^\d{4}-\d{2}-\d{2}$/;
