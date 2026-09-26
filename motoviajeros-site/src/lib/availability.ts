// Public availability endpoint shared with Esmeralda Apart; no authentication or private key is used.
const API_URL = "https://plpuwzntnkrsivtjqdsf.supabase.co/functions/v1/check-availability";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscHV3em50bmtyc2l2dGpxZHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjQyMjgsImV4cCI6MjA4OTgwMDIyOH0.J7PsnvoSmVDOm4wzsYW23RXTBrv_9JTUo0F88OR1WKg";

export async function checkAvailabilityRequest(checkin: string, checkout: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    body: JSON.stringify({ checkin, checkout }),
  });
  if (!response.ok) throw new Error(`Availability request failed: ${response.status}`);
  return response.json();
}
