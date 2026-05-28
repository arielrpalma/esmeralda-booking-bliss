## Objetivo
Cuando un pago en `/posnet` se aprueba, generar un comprobante visual con el formato de un ticket térmico de Posnet, permitiendo al usuario **descargarlo como PNG** en su celular y **compartirlo por WhatsApp** (descarga automática + apertura del chat con texto).

## Cambios

### 1. `src/components/PaymentReceipt.tsx` (nuevo)
Componente React que renderiza el ticket con el look & feel de un comprobante térmico de Posnet:

- Ancho fijo angosto (~340px) sobre fondo blanco, fuente monoespaciada (`font-mono`).
- Encabezado centrado:
  - **ESMERALDA DESARROLLOS INMOBILIARIOS S.R.L.**
  - 9 de Julio 262 — Marcos Juárez
  - CUIT 30-71546692-5
- Separador de guiones (`-----------------------`).
- Bloque de transacción: fecha y hora (dd/mm/aaaa hh:mm, hora Argentina), N° operación, método de pago (Mercado Pago + `payment_method_id`), cuotas si aplica.
- Importe en grande, centrado: `$ 12.345,67`.
- Estado: **APROBADO** en negrita.
- Footer: "Gracias por su pago" + leyenda "Comprobante no válido como factura".
- Bordes festoneados arriba y abajo (efecto ticket recortado) con CSS (`mask-image` o pseudo-elementos triangulares).

El ticket vive oculto fuera de viewport (`position: absolute; left: -9999px`) para que `html-to-image` pueda capturarlo a alta resolución.

### 2. `src/pages/Pago.tsx`
En la vista de éxito (`approved === true`):

- Renderizar `<PaymentReceipt ref={receiptRef} ... />` oculto.
- Reemplazar el bloque actual de éxito por:
  - Ícono ✓ y título "¡Pago aprobado!" (se mantiene).
  - Vista previa miniatura del ticket (escalada al 70%, visible en pantalla, con sombra suave).
  - Botón **"Descargar comprobante"** (icon `Download`) → genera PNG con `html-to-image` y dispara descarga `comprobante-<id>.png`.
  - Botón **"Enviar por WhatsApp"** (se mantiene) → primero descarga el PNG automáticamente, luego abre `wa.me/...` con el texto actual + nota "Adjuntá la imagen recién descargada".
- Helper `downloadReceipt()` reutilizable por ambos botones.

### 3. Dependencia
Instalar `html-to-image` (~15 KB gzip, sin canvas nativo, compatible con iOS Safari).

## Detalles técnicos

**Datos disponibles tras aprobación** (ya devueltos por `process-mp-payment`):
- `id`, `status`, `transaction_amount`, `payment_method_id`, `external_reference`.

**Fecha y hora**: generadas en el cliente al recibir la respuesta, formateadas con `Intl.DateTimeFormat('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })`.

**Cuotas / tarjeta**: el endpoint actual no devuelve `installments` ni los últimos 4 dígitos. Se omiten en esta iteración (el usuario eligió mostrar comercio + CUIT + dirección; cuotas/tarjeta no fueron seleccionadas). Si más adelante se quieren incluir, habrá que extender la respuesta del edge function `process-mp-payment` agregando `installments` y `card.last_four_digits` desde `mpData`.

**Render PNG**:
```ts
import { toPng } from 'html-to-image';
const dataUrl = await toPng(receiptRef.current, { pixelRatio: 2, backgroundColor: '#ffffff' });
const a = document.createElement('a');
a.href = dataUrl;
a.download = `comprobante-${result.id}.png`;
a.click();
```

**Flujo WhatsApp**: `await downloadReceipt()` → `window.open(wa.me URL, '_blank')`. En mobile el archivo queda en Descargas y el usuario lo adjunta manualmente en el chat (limitación conocida de wa.me, no permite adjuntos automáticos).

## Fuera de alcance
- Generar PDF (el usuario eligió PNG).
- Adjuntar el archivo automáticamente al chat de WhatsApp (no es posible vía wa.me).
- Cambios en el edge function de pago.