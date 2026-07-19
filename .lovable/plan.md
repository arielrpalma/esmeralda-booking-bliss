Reemplazar `public/llms.txt` por una versión profesional y completa, alineada al spec de llms.txt y a la arquitectura actual del sitio (Home, landings por intención, Blog, Gracias).

## Qué incluirá el nuevo `public/llms.txt`

1. **H1**: `# Esmeralda Apart`
2. **Blockquote** con propuesta de valor en una línea (apart inteligente en Marcos Juárez, check-in 24 h, Au Ruta9).
3. **Párrafos** breves con:
   - Ubicación exacta (9 de Julio 262, Marcos Juárez, Córdoba).
   - Modelo del negocio (departamentos temporarios, check-in electrónico 24 h, sin recepción, factura A/B, cocheras, pet friendly).
   - Cómo se reserva (barra flotante inferior con disponibilidad en tiempo real vía Airbnb iCal + WhatsApp directo).
   - Contacto (WhatsApp +54 9 3472 43-3334, Instagram/Facebook/TikTok @esmeraldaapart).

4. **## Landings por motivo de viaje** (embudo de conversión):
   - `/alojamiento/trabajo` — Viajantes y empresas (factura A/B, WiFi fibra, cochera).
   - `/alojamiento/torneo` — Equipos y deportistas (grupos, cocheras).
   - `/alojamiento/ruta-9` — Parada sobre Au Ruta9 (1 noche, 24 h).
   - `/alojamiento/familia` — Visitas familiares (pet friendly, cocina equipada).

5. **## Contenido**:
   - `/` — Home con secciones (por qué reservar directo, check-in en 3 pasos, features, amenities, galería, Ruta 9, FAQ).
   - `/blog` — Índice del blog con guías sobre Marcos Juárez y estadías.
   - Uno o dos posts representativos de `src/content/posts.ts` (verificaré los slugs reales antes de escribir).

6. **## Optional**:
   - `/gracias` — Página post-reserva.

7. **Exclusiones deliberadas** (no listadas): `/pago`, `/pago/status`, endpoints de edge functions, sitemap, robots — no aportan a un crawler LLM.

## Detalles técnicos

- Archivo único plano en `public/llms.txt`, servido en `/llms.txt`.
- Solo H1 y H2, listas de enlaces `- [Título](/ruta): descripción`.
- Sin HTML, sin emojis, sin H3.
- Antes de escribir: leer `src/content/posts.ts` y `src/App.tsx` para confirmar slugs de blog y rutas activas, evitando enlaces rotos.
