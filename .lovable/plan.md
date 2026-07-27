
# Guía de Marcos Juárez — expansión a autoridad local, con política de datos verificables

Sin tocar diseño ni identidad visual: se reutilizan los componentes de hub existentes (`HubBlocks`, `HubFaqs`, `HubBreadcrumbs`, `HubCta`) y se amplía contenido, categorías, menú y SEO local.

## Regla que gobierna todo el trabajo (nueva)

- **Cero invención.** Nombres propios, direcciones exactas, teléfonos, horarios, fechas de eventos y precios sólo se publican si se verifican en fuente pública (sitio oficial, Google Maps, Municipalidad, redes del comercio).
- Lo no verificable **no se completa**: el campo queda vacío y la página no lo muestra (renderizado condicional, sin "Consultar" de relleno).
- Cada dato dudoso se registra en un archivo nuevo `docs/revision-manual.md` con página, campo, fuente buscada y qué hace falta confirmar. Te lo entrego como checklist al final.
- El contenido se escribe **evergreen**: se evita "en 2026", "actualmente cuesta", "este fin de semana". Los eventos usan URL perenne + bloque "edición actual" acotado y fácil de actualizar.
- Nada de párrafos de relleno: si una categoría no da para una página con valor real, se fusiona con otra en lugar de inflar el conteo.

## Estado actual verificado

- Hub operativo en `/guias` con 6 clusters y 41 guías: alojamiento (6), turismo (7), empresas (10), eventos (5), rutas (4), servicios del apart (9).
- `HubEntryPage.tsx` ya emite title, description, canonical, OG, Twitter Card, Article + BreadcrumbList + FAQPage, mapa embebido y bloque distancia/auto/caminando.
- `src/components/Navbar.tsx` **no** enlaza la guía hoy (Inicio, Departamentos, Servicios, Galería, Blog).
- `HubPlace` tiene dirección, mapQuery y distancias, pero **no** coordenadas, horarios ni tipo de lugar.

## Árbol del nuevo contenido

```text
/guias  (índice existente → 9 categorías)
├── /empresas                    10 actuales + hasta 8 nuevas (sólo empresas verificables)
├── /gastronomia                 NUEVA — hasta 12
│     donde-comer, parrillas, pizzerias, restaurantes-familiares,
│     cafeterias, bares, cervecerias, heladerias, panaderias,
│     delivery, desayunos, comer-cerca-del-apart
├── /turismo                     7 actuales + hasta 7 nuevas
│     plaza-principal, museos, circuitos-turisticos, paseos-a-pie,
│     fin-de-semana, con-ninos, pueblos-cercanos
├── /servicios-en-marcos-juarez  NUEVA — hasta 9
│     hospitales, clinicas, farmacias, bancos-y-cajeros,
│     estaciones-de-servicio, remises-y-taxis, supermercados,
│     gomerias-y-lavaderos, tramites-utiles
├── /eventos                     5 actuales + hasta 4 (URL perenne, actualización anual)
├── /deportes                    NUEVA — hasta 9
│     clubes, padel, tenis, futbol, rugby, basquet, gimnasios,
│     torneos-y-delegaciones, natacion
├── /educacion                   NUEVA — hasta 6
├── /rutas                       4 actuales + 2 (distancias, como-llegar)
└── /servicios (del apart)       9 actuales, renombrado "Servicios del apart"
```

## Cantidad estimada

| Bloque | Ahora | Nuevas (techo) | Total |
|---|---|---|---|
| Páginas pilar | 6 | 3 | 9 |
| Guías internas | 41 | ~55 | ~96 |
| Índice /guias | 1 | 0 | 1 |
| **Hub indexable** | **48** | **~58** | **~106** |

El techo es orientativo: si la verificación no alcanza para sostener una página, se publica una menos. La cifra final se informa al cierre.

## Prioridad de implementación

1. **Fase 1 — Estructura y menú**: nuevos `ClusterKey`, 3 clusters, rutas, "Guía de Marcos Juárez" en Navbar (desktop + mobile) y Footer, `/guias` reorganizado en 9 tarjetas.
2. **Fase 2 — Gastronomía**: mayor volumen turístico local; páginas por categoría (parrillas, cafeterías) que no dependen de horarios de un único local.
3. **Fase 3 — Servicios de la ciudad + Deportes**.
4. **Fase 4 — Empresas + Turismo**.
5. **Fase 5 — Educación, Eventos, Rutas**.
6. **Fase 6 — SEO técnico**: coordenadas, Schema por tipo de lugar, enlazado automático, sitemap, `llms.txt`, verificación con navegador y entrega de `docs/revision-manual.md`.

## Palabras clave objetivo (muestra)

- Gastronomía: "donde comer en Marcos Juárez", "parrillas Marcos Juárez", "pizzerías Marcos Juárez", "cafeterías Marcos Juárez", "delivery Marcos Juárez".
- Servicios: "farmacia de turno Marcos Juárez", "cajeros automáticos Marcos Juárez", "remises Marcos Juárez", "supermercados Marcos Juárez", "hospital Marcos Juárez".
- Deportes: "clubes de Marcos Juárez", "canchas de pádel Marcos Juárez", "torneos Marcos Juárez", "gimnasios Marcos Juárez".
- Educación: "escuelas Marcos Juárez", "institutos terciarios Marcos Juárez", "alojamiento para estudiantes Marcos Juárez".
- Empresas: "parque industrial Marcos Juárez", "acopios Marcos Juárez", "concesionarias Marcos Juárez".
- Turismo: "museos Marcos Juárez", "qué hacer un fin de semana en Marcos Juárez", "pueblos cercanos a Marcos Juárez".
- Eventos: "Expo Marcos Juárez", "fiesta patronal Marcos Juárez", "maratón Marcos Juárez".

Más long-tail: "cerca de Esmeralda Apart", "a cuántas cuadras", "cómo llegar", "horarios".

## Impacto SEO esperado

- Cobertura: de ~62 a ~124 URLs indexables (hub + blog + landings).
- Autoridad temática: 9 clusters con enlazado bidireccional pilar↔guía↔blog↔reserva.
- AI Overview / ChatGPT / Gemini / Perplexity: cada página abre con respuesta directa de 40-55 palabras + FAQ estructurada; al no inventar datos, se reduce el riesgo de que un motor detecte imprecisiones y descarte la fuente.
- Conversión: ~58 puertas de entrada nuevas que terminan en el CTA de reserva directa.
- Plazos: indexación 2-4 semanas, movimiento de posiciones 2-4 meses.

## Detalles técnicos

- `src/content/hub/types.ts`: `ClusterKey` suma `gastronomia | deportes | educacion | serviciosCiudad`. `HubPlace` suma `lat?`, `lng?`, `hours?`, `phone?`, `placeType?`, `verified: boolean`. Todos los campos nuevos son opcionales y sólo se renderizan si existen.
- Nuevos archivos: `gastronomia.ts`, `deportes.ts`, `educacion.ts`, `servicios-ciudad.ts`, más ampliación de los actuales. Redacción manual, sin plantillas repetidas entre páginas.
- `HubEntryPage.tsx`: agrega JSON-LD `Place`/`LocalBusiness` con `@type` según `placeType` (`Restaurant`, `Hospital`, `Pharmacy`, `BankOrCreditUnion`, `GasStation`, `SportsActivityLocation`, `School`, `Museum`, `Park`), `geo` sólo si hay coordenadas y `openingHours` sólo si están verificadas.
- Enlazado automático: helper `getAutoRelated(entry)` (cercanía geográfica + cluster complementario) y componente `HubRelated` con los estilos actuales. Cadena empresa → gastronomía cercana → alojamiento → turismo → reserva.
- Investigación de datos: búsquedas web por lote (fuentes oficiales y Google Maps) antes de escribir cada página; lo que no se confirma va al archivo de revisión manual.
- Fotos: se reutilizan las imágenes existentes de `public/images` con `loading="lazy"`. No se generan fotos ficticias de comercios de terceros.
- `scripts/generate-sitemap.ts` y `public/llms.txt` se regeneran con las 9 categorías.
- Navbar: un único ítem "Guía MJ" para no romper el layout de 360 px.
- Verificación final con Playwright: una página por cluster, H1 único, JSON-LD válido, sin errores de consola.

## Entregables finales

1. Sitio con las nuevas categorías navegables e indexables.
2. `docs/revision-manual.md` con los datos pendientes de confirmar.
3. Resumen de páginas publicadas por categoría y keywords asignadas.

## Fuera de alcance

No se cambian colores, tipografías, Hero, galería, barra flotante de reservas ni flujo de pago.
