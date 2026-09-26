# Esmeralda Apart — Motoviajeros

Independent frontend intended for motoviajeros.esmeraldaapart.com.ar. It does not modify or deploy the existing Esmeralda Apart website.

Run `bun install` and `bun run dev` from this directory. To deploy, create a separate Lovable project from these files, connect the subdomain to that project, then publish it. Do not connect the subdomain to the original project (a primary-domain redirect may otherwise occur).

The booking footer reproduces the current date, guest, availability and HotelPMS flow; it calls the existing public `check-availability` function with the project's publishable key. No service-role key is used. Confirm cross-origin requests in production. The optional motorcycle inquiry is WhatsApp-only and does not alter reservations.

`src/content.ts` has an empty restaurant collection awaiting verified details. Generated travel photography is illustrative; apartment photos under public/images are copied from the actual Esmeralda Apart site. Do not describe the pictured generated building as the actual property.
