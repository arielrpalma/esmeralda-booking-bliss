## Diagnóstico (verificado con Search Console)

Consulté la API de Search Console para la propiedad `https://esmeraldaapart.com.ar/`:

- **La página con "noindex" es `/gracias`** — `coverageState: Excluded by 'noindex' tag`, `indexingState: BLOCKED_BY_META_TAG`. Esa etiqueta está puesta a propósito (página de agradecimiento post-reserva). **El aviso es correcto y no perjudica al sitio.**
- La home está bien: `Submitted and indexed`.
- El problema real: el sitemap tiene **94 URLs enviadas con "indexed: 0"**. Google descargó el sitemap el 27/07, pero `/guias`, `/blog` y las páginas de clusters aparecen como *"URL desconocida"* o *"Descubierta: actualmente sin indexar"*. Son páginas nuevas y el sitio es una SPA (contenido renderizado por JavaScript), lo que retrasa el rastreo.

## Punto 1 — Cerrar el aviso de noindex

- Mantener `noindex` en `/gracias`, `/posnet` y `/pago/*` (es lo correcto).
- Quitar enlaces internos hacia `/gracias` para que Google deje de descubrirla.
- Agregar en `robots.txt` un bloque `Disallow` para `/gracias`, `/posnet` y `/pago/` de modo que el aviso no reaparezca (la página ya está desindexada, así que bloquear el rastreo ahora es seguro).
- Confirmar que ninguna de esas rutas figure en el sitemap ni en `llms.txt`.

## Punto 2 — Acelerar la indexación de las 94 páginas

- Bloque visible en la home con acceso a la "Guía de Marcos Juárez" y enlaces a los 10 clusters (hoy el enlazado hacia el hub es débil desde la página más indexada del sitio).
- Revisar `InternalLinksSection` para que cada cluster enlace a sus fichas principales y las fichas enlacen entre sí (Google indexa mucho más rápido lo enlazado que lo que sólo está en el sitemap).
- Higiene del sitemap: dejar `lastmod` sólo donde hay fecha real de contenido y quitar prioridades/valores no específicos.
- Auditar títulos y descripciones de las páginas nuevas para detectar duplicados y diferenciarlos.

## Punto 3 — Prerenderizado estático

- Generar HTML completo en el build para todas las rutas públicas (home, blog, landings, 10 clusters y fichas del hub), de modo que Google reciba el contenido en la primera respuesta en lugar de tener que ejecutar JavaScript.
- Implementación: script de prerender post-build que recorre las rutas del sitemap y escribe un `index.html` por ruta en `dist/`.
- **Tope de seguridad**: constante `MAX_PRERENDER_PAGES` (por ejemplo 500, configurable por env) muy por debajo del límite de publicación, para que el crecimiento de contenido nunca rompa el deploy.
- Excluir del prerender las rutas `noindex` (`/gracias`, `/posnet`, `/pago/*`).
- No cambia el diseño, el contenido ni la lógica de reservas o pagos; sólo la salida del build.

## Detalles técnicos

- Archivos: `public/robots.txt`, `public/llms.txt`, `scripts/generate-sitemap.ts`, nuevo `scripts/prerender.ts`, `package.json` (hook `postbuild`), `src/components/InternalLinksSection.tsx`, `src/pages/Index.tsx`, contenido del hub para metadatos duplicados.
- Verificación: build local + revisión del HTML generado de varias rutas y chequeo de que el conteo de archivos quede dentro del tope.
- La indexación depende de Google: los cambios aceleran el rastreo, pero los resultados se ven en días o semanas.
