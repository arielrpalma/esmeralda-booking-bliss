## Objetivo

Que el visitante identifique su motivo de viaje en 10 segundos y aterrice en una landing específica con copy, beneficios, testimonios y CTA alineados al motivo, para maximizar conversión de campañas Google y Meta.

## Cambios en la Home

**Nuevo bloque "Selector de motivo"** insertado entre el Hero y `WhyDirectSection` (alta visibilidad sin tapar el Hero):

- Título: "¿Por qué venís a Marcos Juárez?"
- 4 tarjetas grandes con ícono, título y micro-copy. Cada una linkea a su landing dedicada y dispara un evento `funnel_intent_select` al dataLayer (intent: trabajo/torneo/ruta9/familia) para medir cuál perfil convierte más.

```text
[💼 Trabajo]  [🏆 Torneo]  [🛣 Ruta 9]  [👨‍👩‍👧 Familia]
  Viajantes    Equipos      De paso       Visitas
  Factura A/B  Grupos       1 noche       Mascotas OK
```

Además, agregar **tabs / chips secundarias dentro del Hero** ("Vengo por…") como acceso inmediato sin necesidad de scrollear, para usuarios mobile.

## 4 Landings dedicadas

Crear `/alojamiento/trabajo`, `/alojamiento/torneo`, `/alojamiento/ruta-9`, `/alojamiento/familia` (rutas amigables para SEO y para usar como destino de Ads).

Cada landing reutiliza componentes existentes (Navbar, FloatingBookingBar, WhatsAppButton, Footer) y suma 1 archivo `PersonaLanding.tsx` parametrizado por config. Estructura común:

1. **Hero específico**: foto contextual + headline + sub-headline + 2 CTA (Reservar / WhatsApp con mensaje pre-cargado por persona).
2. **3 beneficios clave** del perfil (ej. Trabajo: factura, WiFi para Zoom, check-in 24 h).
3. **Prueba social**: 2-3 testimonios reales del perfil + logos/menciones.
4. **FAQ filtrada** (3-4 preguntas relevantes al perfil).
5. **Bloque "Cómo reservar"** con foco en 1 paso (mensaje único, sin distracciones).
6. **CTA final**.

Contenido por persona (resumen):

| Landing | Headline | Beneficios destacados | WhatsApp prefijado |
|---|---|---|---|
| Trabajo | "Apart para viajantes en Marcos Juárez" | Factura A/B · WiFi premium · Cochera · Check-in 24 h | "Hola, vengo por trabajo, necesito disponibilidad…" |
| Torneo | "Tu base para el torneo en Marcos Juárez" | Grupos · Cochera · Cerca de canchas · Late check-out | "Hola, vengo a un torneo, somos X personas…" |
| Ruta 9 | "Parada estratégica sobre Au Ruta9" | Acceso rápido · Check-in 24 h · Estacionamiento seguro · 1 noche | "Hola, estoy viajando por Ruta 9 y necesito 1 noche…" |
| Familia | "Departamento para visitar familia" | Pet friendly · Espacios amplios · Cocina equipada · Tranquilo | "Hola, vengo a visitar familia…" |

## SEO

- Cada landing con su propio `<Helmet>`: title, description, canonical, og y JSON-LD `LodgingBusiness` + `BreadcrumbList`.
- Agregar las 4 URLs a `scripts/generate-sitemap.ts`.
- Internal linking: Home → landings; cada landing → Home y Blog relacionado.

## Medición (GTM / GA4 / Meta)

Nuevos eventos en `src/lib/analytics.ts` que se empujan a `dataLayer` y `fbq`:

- `funnel_intent_select` (parámetro `intent`) al clic en las 4 tarjetas de la Home.
- `landing_view` (parámetro `persona`) al cargar cada landing.
- Los eventos existentes (`whatsapp_click`, `check_availability`, `booking_start`, `booking_complete`) ya heredan automáticamente.

Esto permite armar audiencias en Meta y conversiones en Google Ads por **persona**, no por sitio entero.

## Campañas (recomendación, no se ejecuta acá)

Cada landing es destino directo de:
- Google Ads: campañas separadas por keyword cluster ("apart viajantes Marcos Juárez", "alojamiento torneo Marcos Juárez", "hotel ruta 9 cerca", "departamento familia Marcos Juárez").
- Meta Ads: 4 conjuntos de anuncios con creatividades distintas pero misma landing matching.

## Detalles técnicos

- Nuevo componente `src/components/IntentSelector.tsx` (4 tarjetas + tracking).
- Nuevo componente reutilizable `src/components/persona/PersonaLanding.tsx` que recibe `config: PersonaConfig`.
- Nuevo archivo `src/content/personas.ts` con los 4 configs (textos, imágenes, FAQs, WhatsApp prefill, JSON-LD).
- Nuevas páginas en `src/pages/personas/` (`Trabajo.tsx`, `Torneo.tsx`, `Ruta9.tsx`, `Familia.tsx`) — cada una importa `PersonaLanding` con su config.
- Rutas agregadas en `src/App.tsx`.
- `src/lib/analytics.ts`: helpers `trackIntentSelect(intent)` y `trackLandingView(persona)`.
- Sitemap: agregar 4 entradas.

## Fuera de alcance

- No se crean campañas en Google/Meta (sólo se deja la infra y el tracking listos).
- No se rediseña el Hero existente; se le suman chips de intención y un bloque selector debajo.
- Las imágenes contextuales por persona usarán las que ya existen en `/images/`; si querés fotos específicas (ej. cancha, ruta, viajante con notebook) las generamos después.
