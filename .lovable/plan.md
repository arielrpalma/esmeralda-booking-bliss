## Objetivo

Maximizar el alcance en Google con cambios mínimos en la home actual, más conexión a Google Search Console.

## 1. SEO on-page sin tocar el diseño

- **FAQ con schema en la home**: nueva sección `FaqSection` al final (antes del footer), con 8 preguntas frecuentes orientadas a keywords locales (cochera, factura, mascotas, check-in, mejor precio sin comisión, mascotas, niños, cancelación). Inyecta `FAQPage` JSON-LD vía Helmet → habilita rich snippets en Google.
- **Reescritura ligera de copys existentes** en `AboutSection`, `AmenitiesSection`, `BookingSection` para incluir naturalmente "alquiler temporario en Marcos Juárez", "departamentos por día", "apart hotel Marcos Juárez", "alojamiento en Marcos Juárez Córdoba". Mismo layout, mismas imágenes.
- **`alt` de imágenes** enriquecido con keywords descriptivas.
- **Meta description e índice** revisados en `index.html` para apuntar a las keywords principales.

## 2. Blog estático con 10 artículos SEO

Lo más rentable para alcance: contenido nuevo indexable sin tocar la home.

- Nuevas rutas `/blog` (índice) y `/blog/:slug` (post individual), con Helmet por ruta (`title`, `description`, `canonical`, `og:url`, JSON-LD `Article` + `BreadcrumbList`).
- 10 posts en `src/content/posts.ts` (≥800 palabras, español argentino) con los títulos del brief original. Cada post enlaza internamente a `/` y cierra con CTA "Reservá ahora" / WhatsApp.
- Link "Blog" en el Navbar.

## 3. SEO técnico

- Regenero `public/sitemap.xml` con `/`, `/blog`, y cada `/blog/:slug`.
- `robots.txt` con la línea `Sitemap: https://esmeraldaapart.com.ar/sitemap.xml`.
- Aprovecho `react-helmet-async` que ya está montado.

## 4. Google Search Console (asistido)

Conectar GSC requiere tu autorización OAuth (no puedo hacerlo solo). El flujo será:

1. Disparar el conector de Google Search Console — verás un botón "Conectar" en el chat para autorizar con tu cuenta de Google.
2. Solicitar un token de verificación META a Google y agregarlo como `<meta name="google-site-verification">` en `index.html`.
3. **Publicar el sitio** (paso tuyo) para que el meta tag quede en el HTML servido.
4. Llamar a Google para verificar la propiedad de `https://esmeraldaapart.com.ar/`.
5. Dar de alta el sitio en Search Console y enviar el sitemap `https://esmeraldaapart.com.ar/sitemap.xml`.
6. Inspeccionar la URL principal para confirmar indexación.

A partir de ahí podés ver impresiones, clics, queries y errores directamente desde GSC, y pedirme inspeccionar URLs o resubir el sitemap cuando agregues posts.

## Entregable extra

Documento `/mnt/documents/esmeralda-apart-marketing.md` con: 10 títulos extra de blog, 10 ideas para redes, 5 Google Ads, 5 Meta Ads, FAQ ampliadas. Para usar fuera del sitio.

## Fuera de alcance

- Páginas separadas /departamentos /ubicacion /servicios (su contenido ya vive en la home).
- Cambios de diseño del Hero, barra de reservas, WhatsApp, /gracias, /pago.
- Backend o panel admin para posts (se editan en `src/content/posts.ts`).

## Notas

- Tras publicar, Google tarda días/semanas en indexar; el sitemap + GSC aceleran el proceso.
- Para que la verificación META funcione, hay que publicar **después** de agregar el meta tag y **antes** de pedir verify.
