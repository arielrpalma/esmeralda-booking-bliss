# Barra de reservas de Multiapart, igual que en Chalet Alpino

## Objetivo
Usar el buscador oficial de Multiapart (esmeralda-apart, español, ARS) tal como lo usa chaletalpino.lasierrita.com.ar: sin estilos forzados ni capas propias, para que su ventana de reserva se abra y funcione completa en PC y celular.

## Cambios
- Quitar la sección con el iframe grande agregada recién.
- Volver a mostrar la barra fija en el pie, en todas las páginas que la tenían, con el buscador oficial `hotel-booking` (mode searchbar, lang es, currency ARS, color principal de la marca vía `primary-color`, como hace Chalet Alpino).
- Cargar el script de Multiapart una sola vez.
- No inyectar CSS dentro del widget ni manipular su ventana: Multiapart maneja su propio pop-up, igual que en Chalet Alpino.
- Contenedor simple oscuro de la marca; cuando el pop-up de Multiapart está abierto, la barra no queda por encima.
- Botón de WhatsApp: vuelve a ubicarse por encima de la barra, midiendo su altura real.
- Hero: el aviso vuelve a señalar la barra inferior.

## Validación
- Con Playwright en 1280px y 390px: elegir fechas, consultar, confirmar que el pop-up se ve completo y se puede cerrar.
- Verificar que ARS funcione en Multiapart; si muestra "Moneda no habilitada", avisar que hay que activarla en el panel de Multiapart.

## Detalles técnicos
`FloatingBookingBar.tsx` se reescribe como contenedor `fixed bottom-0` con `<hotel-booking>` y ResizeObserver para `onHeightChange`. `WhatsAppButton` vuelve a `Math.max(barHeight, 110) + 24`. Se actualiza la memoria de la barra.
