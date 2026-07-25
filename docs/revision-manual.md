# Revisión manual de datos — Guía de Marcos Juárez

Política editorial aplicada al hub de contenidos (`src/content/hub/`):

- No se publican nombres de comercios, teléfonos, direcciones, horarios ni precios que no puedan verificarse en una fuente pública.
- Los campos opcionales de `HubPlace` (`lat`, `lng`, `hours`, `phone`) sólo se renderizan si están cargados: si faltan, la página simplemente no muestra la sección, sin textos de relleno.
- El contenido está escrito en clave evergreen: sin años, precios ni fechas concretas que caduquen.

## Datos pendientes de confirmar

Completar en el archivo de contenido indicado. Mientras no estén verificados, deben quedar vacíos.

| Página | Campo pendiente | Archivo | Cómo verificar |
|---|---|---|---|
| Todas las guías con `place` | `lat` / `lng` | `src/content/hub/*.ts` | Coordenadas exactas desde Google Maps (clic derecho sobre el punto → copiar coordenadas). Mejoran el SEO "cerca de mí". |
| Empresas (fichas existentes) | `hours`, `phone` | `empresas.ts` | Sitio oficial de cada organismo o ficha de Google Maps verificada. |
| Hospital Abel Ayerza | Dirección exacta y teléfono de guardia | `empresas.ts`, `servicios-ciudad.ts` | Sitio del Ministerio de Salud de Córdoba o Municipalidad. |
| Farmacias | Listado y sistema de turnos | `servicios-ciudad.ts` | Colegio de Farmacéuticos de Córdoba / medios locales. Sólo publicar si hay fuente estable. |
| Bancos y cajeros | Sucursales concretas y redes disponibles | `servicios-ciudad.ts` | Sitios de cada banco. Hoy la página describe la zona bancaria sin nombrar entidades. |
| Estaciones de servicio | Banderas, ubicación y GNC | `servicios-ciudad.ts` | Google Maps + sitio de cada petrolera. |
| Remises y taxis | Agencias y teléfonos | `servicios-ciudad.ts` | Registro municipal de transporte. No publicar teléfonos sin confirmar vigencia. |
| Supermercados | Cadenas presentes y horarios | `servicios-ciudad.ts` | Google Maps con horarios verificados por el comercio. |
| Gastronomía | Nombres de locales, horarios, delivery | `gastronomia.ts` | Sólo incorporar locales con presencia digital activa (Instagram o ficha de Maps actualizada). Hoy las páginas son por categoría, sin nombres propios. |
| Deportes | Nombres de clubes y complejos de pádel | `deportes.ts` | Sitios y redes oficiales de cada club. |
| Educación | Nombres de escuelas e institutos | `educacion.ts` | Padrón de establecimientos del Ministerio de Educación de Córdoba. |
| Eventos | Fechas de la edición vigente | `eventos.ts` | Municipalidad y Sociedad Rural. Mantener la misma URL y actualizar sólo el bloque de la edición en curso. |

## Cómo cargar un dato verificado

En la entrada correspondiente de `src/content/hub/<cluster>.ts`:

```ts
place: {
  address: "Dirección exacta verificada",
  mapQuery: "Dirección exacta verificada, Marcos Juárez, Córdoba",
  distanceKm: "1,2 km",
  driveMinutes: "4 min",
  walkMinutes: "15 min",
  lat: -32.6960,      // sólo si se copió de Google Maps
  lng: -62.1060,      // sólo si se copió de Google Maps
  hours: ["Mo-Fr 08:00-13:00"],  // formato Schema.org, sólo si está confirmado
  phone: "+54 3472 ...",          // sólo si está confirmado
  placeType: "Hospital",
},
```

Al cargar `lat`/`lng`, `hours` o `phone`, la página los muestra y además los incluye en el JSON-LD `Place` automáticamente.

## Actualización anual de eventos

Las páginas de `/eventos` usan URL perenne. Para la edición del año:

1. No cambiar el `slug`.
2. Actualizar el bloque de contenido de la edición vigente y el campo `updatedAt`.
3. Nunca escribir el año en el `title` ni en el `slug`, para conservar la autoridad acumulada de la URL.
