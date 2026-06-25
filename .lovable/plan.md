# Plan: Esmeralda Apart — Reservas directas (Fase 1)

Objetivo: maximizar reservas directas desde Google y Meta Ads. Empezamos por las bases que multiplican el efecto de todo lo demás: **medición + reposicionamiento del Home + bloque "reservá directo"**. Sin medición no sabemos qué funciona; sin Home reposicionado, todo el tráfico de Ads convierte mal.

Trabajo con las fotos y videos actuales (placeholders donde haga falta). URLs de landings serán descriptivas (ej. `/alojamiento-corporativo-marcos-juarez`).

---

## Fase 1 — Lo que voy a hacer ahora

### 1. Medición (te creo las cuentas paso a paso)
No tenés GA4, GTM ni Meta Pixel. Te preparo el código listo, vos creás las cuentas siguiendo una guía corta que te dejo, y me pasás los IDs. Voy a:

- Instalar **Google Tag Manager** (contenedor único) en `index.html`.
- Configurar **GA4** vía GTM con eventos: `view_apartment`, `check_availability`, `whatsapp_click`, `booking_start`, `booking_complete`.
- Instalar **Meta Pixel** + eventos estándar (`ViewContent`, `Lead`, `InitiateCheckout`, `Purchase`).
- Dejar **Meta Conversions API** preparada como Edge Function (server-side) para cuando tengas el token.
- Disparar eventos desde: WhatsApp button, FloatingBookingBar, iframe de HotelPMS (lo que sea trackeable desde nuestro lado), página `/gracias`.
- Documento corto: `docs/medicion-setup.md` con los 6 pasos para crear las cuentas y dónde pegar los IDs.

### 2. Reposicionamiento del Home
- **Hero nuevo**: titular "El apart inteligente de Marcos Juárez". Subtítulo: "Check-in electrónico 24 h · Llegá cuando quieras · Reservá directo". Dos CTAs grandes: **Reservar ahora** y **WhatsApp**. Badges de confianza (24h, sin recepción, a min. de Ruta 9).
- **Bloque "¿Por qué reservar directo?"** con 5 ventajas (mejor precio, atención directa, sin intermediarios, beneficios, cambios simples).
- **Sección "Cómo funciona el check-in 24 h"** — 6 pasos visuales (Reservás → Código → Llegás → Abrís portón → Ingresás → Disfrutás). Placeholder para video.
- **Sección "Parada ideal sobre Ruta Nacional 9"** con mapa embebido y tiempos.
- **CTAs persistentes**: ya existe FloatingBookingBar (la mantengo) + WhatsApp.

### 3. SEO técnico base para soportar landings futuras
- Instalar `react-helmet-async` y mover meta tags a per-ruta.
- Generador automático de sitemap (`scripts/generate-sitemap.ts`) en lugar del XML manual, para que las próximas landings se sumen solas.

---

## Fases 2-5 — Lo que viene después (no se ejecuta ahora)

| Fase | Contenido | Entregable |
|---|---|---|
| **2. Landings de Ads** | `/alojamiento-corporativo-marcos-juarez`, `/hospedaje-deportistas-marcos-juarez`, `/parada-ruta-9-marcos-juarez`, `/turismo-raices-marcos-juarez` | 4 landings optimizadas para campañas Google/Meta con su propio Hero, prueba social, FAQ específica y CTA |
| **3. SEO de contenidos** | Páginas de keywords ("alojamiento Marcos Juárez", "apart hotel Marcos Juárez", "cerca del INTA", etc.) + ampliar blog | Estructura silo con interlinking |
| **4. Confianza y experiencia** | Reseñas reales (importadas/manuales), FAQ ampliada, sección seguridad/acceso electrónico, fotos con personas (cuando las tengas) | Sección Trust + galería renovada |
| **5. Performance + Mobile polish** | Optimizar imágenes (AVIF/WebP), preload LCP, lazy-load, auditoría PageSpeed >90 mobile | Reporte antes/después |

---

## Detalles técnicos (para referencia)

- **Stack**: React + Vite + Tailwind + shadcn ya existentes. No cambia.
- **Medición**: GTM como single source; GA4 + Pixel viven dentro del contenedor. CAPI vía Supabase Edge Function (`send-meta-event`) para deduplicar con `event_id`.
- **Helmet**: `HelmetProvider` en `main.tsx`; cada ruta nueva define su `<title>`, `description`, canonical y JSON-LD propio. Mantengo `og:*` sitewide en `index.html` como fallback.
- **Sitemap**: script que se ejecuta en `predev`/`prebuild` y enumera rutas estáticas + posts del blog.
- **Diseño**: respeto la identidad visual existente (emerald + gold, Playfair + Raleway). No mezclo nuevo sistema.
- **HotelPMS iframe**: como es de terceros, los eventos de "reserva completada" se disparan en `/gracias` (post-redirect) y desde el webhook de Mercado Pago cuando aplique.

---

## Qué necesito de vos después de aprobar

1. Confirmar que avanzo con Fase 1 completa.
2. Cuando termine, te paso una guía de 10 min para crear GA4 + GTM + Meta Business + Pixel y me devolvés los IDs.
3. Cuando los tenga, los pego y la medición queda activa.

¿Avanzo?