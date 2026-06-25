// Event tracking helpers for GA4 (via GTM dataLayer) + Meta Pixel.
// All functions are safe to call even if GTM/Pixel are not configured.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, unknown>;

const pushDataLayer = (event: string, params: EventParams = {}) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
};

const fbqTrack = (event: string, params: EventParams = {}) => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
};

// Generates a unique id so server-side CAPI can dedupe with the browser pixel later.
const eventId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const trackWhatsAppClick = (location: string) => {
  pushDataLayer("whatsapp_click", { location });
  fbqTrack("Contact", { content_name: "WhatsApp", location });
};

export const trackCheckAvailability = (checkin: string, checkout: string, guests: number) => {
  pushDataLayer("check_availability", { checkin, checkout, guests });
  fbqTrack("Lead", {
    content_category: "availability",
    checkin,
    checkout,
    guests,
  });
};

export const trackBookingStart = (checkin: string, checkout: string, guests: number, nights: number) => {
  const id = eventId();
  pushDataLayer("booking_start", { checkin, checkout, guests, nights, event_id: id });
  fbqTrack("InitiateCheckout", {
    content_category: "booking",
    checkin,
    checkout,
    num_items: nights,
    eventID: id,
  });
  return id;
};

export const trackBookingComplete = (value?: number, currency: string = "ARS") => {
  // De-dup so refreshing /gracias does not fire twice.
  if (typeof window !== "undefined") {
    const key = "eap_booking_complete_fired";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  }
  const id = eventId();
  pushDataLayer("booking_complete", { value, currency, event_id: id });
  fbqTrack("Purchase", { value: value ?? 0, currency, eventID: id });
};

export const trackViewSection = (section: string) => {
  pushDataLayer("view_section", { section });
};

// Fired when the user actually sees the apartment listing (gallery in viewport).
// Maps to Meta's standard ViewContent so it can be used as a custom audience event.
export const trackViewListing = (listingName: string = "Esmeralda Apart") => {
  pushDataLayer("view_listing", { listing_name: listingName });
  fbqTrack("ViewContent", {
    content_type: "lodging",
    content_name: listingName,
    content_category: "apartment",
  });
};

// Funnel: visitor self-selects intent on the home selector.
export const trackIntentSelect = (intent: "trabajo" | "torneo" | "ruta9" | "familia") => {
  pushDataLayer("funnel_intent_select", { intent });
  fbqTrack("Lead", { content_category: "intent", content_name: intent });
};

// Funnel: persona-specific landing page view.
export const trackLandingView = (persona: "trabajo" | "torneo" | "ruta9" | "familia") => {
  pushDataLayer("landing_view", { persona });
  fbqTrack("ViewContent", { content_category: "landing", content_name: persona });
};
