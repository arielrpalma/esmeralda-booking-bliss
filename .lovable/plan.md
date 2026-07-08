## Problema

En `/posnet` un cliente pudo pagar dos veces la misma reserva. La causa más probable: doble clic sobre "Pagar" del Brick de Mercado Pago antes de que el frontend bloquee el botón, o reintento manual tras un aparente cuelgue. Hoy la protección es débil:

- El `X-Idempotency-Key` que enviamos a MP es `${token}-${Date.now()}`. Al usar `Date.now()`, cada clic genera una key distinta → MP procesa los dos cobros como independientes.
- El `external_reference` se genera nuevo en cada submit del Brick (nuevo `crypto.randomUUID()` en el cliente), así que tampoco sirve para deduplicar server-side.
- En el frontend hay un `setProcessing(true)` pero el overlay se monta *después* del primer `await`, dejando una ventana de ~100–300 ms donde el botón del Brick sigue clickeable.

## Solución (defensa en 3 capas)

### 1. Idempotencia real contra Mercado Pago (backend)
En `supabase/functions/process-mp-payment/index.ts`:
- Exigir `external_reference` en el body (quitar el fallback `crypto.randomUUID()` server-side, que enmascara duplicados).
- Usar como `X-Idempotency-Key` el propio `external_reference` (sin `Date.now()`). MP garantiza que dos requests con la misma key devuelven el mismo `payment.id` en vez de crear un cobro nuevo — es exactamente el caso del doble clic.
- Antes de llamar a MP, hacer un `SELECT` en `pagos` por `external_reference`; si ya existe un pago con `status = approved | in_process | pending`, devolver ese mismo registro sin volver a llamar a MP.

### 2. Bloqueo idempotente en la base (backend)
Migración sobre `public.pagos`:
- `ALTER TABLE public.pagos ADD CONSTRAINT pagos_external_reference_key UNIQUE (external_reference);`
- Así, aun si dos invocaciones concurrentes de la edge function llegaran al mismo tiempo, el segundo `upsert`/`insert` cae por violación de unicidad y podemos devolver el pago existente en lugar de duplicar.

### 3. Blindaje del botón en el frontend (`src/pages/Pago.tsx`)
- Generar `external_reference` **una sola vez** por sesión de pago (al montar el Brick con `debouncedAmount`), no dentro de `onSubmit`. Guardarlo en un `useRef`. Así reintentos del mismo formulario reusan la misma key → MP deduplica.
- En `onSubmit`, cortar inmediatamente si `processing` ya es `true` (guard con `useRef` para evitar el gap del `setState` async).
- Mantener el overlay "Procesando pago..." y además desmontar el Brick apenas se dispare el submit, para que un segundo tap no llegue nunca al iframe.
- Al recibir respuesta (aprobado o rechazado), regenerar un nuevo `external_reference` sólo si el usuario toca "Reintentar".

## Cambios técnicos por archivo

- `supabase/migrations/<timestamp>_pagos_unique_external_ref.sql` — nuevo, agrega el UNIQUE. Antes de aplicarlo, limpiar posibles `external_reference` NULL/duplicados existentes (backfill con `id::text` para filas viejas).
- `supabase/functions/process-mp-payment/index.ts` — external_reference obligatorio; pre-check en `pagos`; `X-Idempotency-Key = external_reference`; manejar `23505` devolviendo la fila existente.
- `src/pages/Pago.tsx` — `externalRefRef = useRef<string>()`, `processingRef = useRef(false)`, generar la ref al montar el Brick, guard sincrónico en `onSubmit`, resetear ref en `reset()`.

## Qué NO cambia

- Flujo de UI, textos, comprobante, envío por WhatsApp/email: idénticos.
- Webhook de MP: sigue igual; ya hace `upsert` por `id`.
- Estructura de la tabla `pagos` fuera de la nueva constraint.

## Verificación

- Reproducir doble clic con Playwright sobre `/posnet` en modo test de MP: debe crearse **un solo** registro en `pagos` y el segundo request debe devolver el mismo `payment.id`.
- Revisar `pagos` para confirmar que no aparecen dos filas con el mismo `external_reference`.
