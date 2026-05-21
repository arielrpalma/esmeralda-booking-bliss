# Mejoras de homologación Mercado Pago — Ajustado

## Contexto
El reporte de MP dio 55/100. El usuario decide **no pedir más datos al huésped** para mantener la carga liviana. Solo agregaremos el logo oficial de MP en el pie de página.

## Qué hacemos

### 1. Logo monocromático de Mercado Pago en el pie
Agregar en el `Footer` un loguito simple, monocromático (blanco/gris) que diga "Powered by Mercado Pago" o muestre la marca. Esto es un requisito de homologación de MP y aumenta la confianza del pagador.
- SVG inline liviano, sin request extra.
- Alineado al centro o junto al copyright, en tono sutil que no compita con la marca Esmeralda.

## Qué NO hacemos

- **No agregamos campos extra** al formulario (nombre, apellido, teléfono, dirección) para no sobrecargar la UX.
- **No implementamos webhooks ni persistencia** en esta iteración (se puede agregar después si se quiere subir más el score).
- **No agregamos `binary_mode`, `external_reference`, etc.** a la integración Payment Brick (el Brick ya maneja eso internamente; estos campos aplican más a Checkout Pro/Preferences).

## Resultado esperado

- Cumplimos visiblemente el requisito de "Logos oficiales de Mercado Pago" del reporte de homologación.
- La UX de pago sigue siendo exactamente igual de simple.
