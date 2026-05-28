# Banner Mundial en Hero

## Qué se construye

Banner destacado superpuesto en el Hero (sección principal con la foto), bien visible al entrar al sitio, anunciando el streaming del Mundial.

**Texto**: "Mirá todos los partidos del Mundial a través de streaming en nuestros departamentos"

**Logos**: DirecTV Go + Mundial (los subís vos).

## Diseño propuesto

- Tarjeta flotante con efecto glassmorphism (fondo emerald oscuro semitransparente + borde dorado fino), alineada al estilo de marca existente.
- Posicionada dentro del Hero, debajo del título "Esmeralda Apart" y arriba del scroll indicator, centrada en mobile y alineada a la izquierda en desktop.
- Layout: los dos logos a la izquierda (DirecTV Go + Mundial, alturas equilibradas, separador dorado vertical entre ambos) y el texto a la derecha en Raleway, con una palabra clave ("Mundial") resaltada en dorado/itálica Playfair.
- Animación de entrada suave (fade + slide up) coherente con el resto del Hero.
- Responsive: en mobile (360px) los logos quedan arriba y el texto debajo, compacto, sin tapar el badge de "Mejor Puntuado".

## Implementación técnica

1. Crear `src/components/MundialBanner.tsx` — componente autocontenido con framer-motion, usando tokens semánticos (`bg-section-dark/70`, `border-primary/30`, `text-gold`, etc.).
2. Insertar el banner dentro de `HeroSection.tsx`, posicionado absoluto en la parte inferior del contenido del Hero o como bloque flotante centrado, sin romper el layout actual del badge "cuadro.png".
3. Recibir los logos en `public/images/` con nombres `directv-go.png` y `mundial-logo.png` (los subís vos en el siguiente mensaje).
4. Alt text descriptivo en ambos logos para SEO/accesibilidad.

## Pendiente de tu lado

Subí en el próximo mensaje las imágenes de:
- Logo DirecTV Go (PNG con fondo transparente preferentemente)
- Logo del Mundial (PNG con fondo transparente preferentemente)

Una vez que estén, paso a build mode y lo implemento.
