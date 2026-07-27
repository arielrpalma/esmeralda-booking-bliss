## Diagnóstico confirmado

Consulté los pagos reales. Los dos intentos de hace minutos (21:06 y 21:08, $82.000, `amex`) quedaron en `rejected` con `status_detail = cc_rejected_other_reason`, y un tercero igual el 12/07. Todas las operaciones con Visa, Cabal y débito Mastercard fueron aprobadas.

Dos hechos verificados en el registro del pago:

1. **El documento no viajó.** En el pago guardado, `payer.identification` llegó con `type` y `number` en `null`. El CUIT que cargó el cliente no se envió a Mercado Pago. Amex Argentina suele exigir identificación del titular y, sin ella, el emisor rechaza.
2. **El rechazo es del emisor, no una validación de formato.** `cc_rejected_other_reason` es el rechazo genérico de la tarjeta/emisor. Mercado Pago no devolvió "parámetro inválido"; el mensaje "operación inválida" que ve el cliente es nuestro texto genérico, que no refleja el motivo real.

Con esto, la causa más probable es (1): falta el documento en el request. No está 100 % confirmado que agregarlo haga aprobar la Amex corporativa (el emisor puede rechazar igual por política de la tarjeta), por eso el plan incluye instrumentación para verlo con certeza en el próximo intento.

## Plan

### 1. Asegurar que el documento se envíe siempre
- Configurar el Payment Brick para que el campo de identificación del titular esté visible y sea obligatorio, con selector de tipo que incluya **DNI, CUIT y CUIL**.
- Verificar en el envío que `payer.identification.type` y `.number` lleguen completos; si faltan, bloquear el envío con un aviso claro en vez de mandar el pago incompleto.

### 2. Validar coherencia tipo/número en el backend
- En `process-mp-payment`, hacer obligatorio `identification` y validar longitudes: DNI 7-8 dígitos, CUIT/CUIL 11 dígitos. Si no coincide, devolver un error explícito indicando qué corregir.

### 3. Mostrar el motivo real del rechazo
- Reemplazar "operación inválida" por mensajes específicos según `status_detail`: para `cc_rejected_other_reason` indicar que el rechazo lo hizo el banco emisor y sugerir contactar al emisor o usar otra tarjeta; cubrir también `cc_rejected_bad_filled_*`, `cc_rejected_insufficient_amount`, `cc_rejected_high_risk`.

### 4. Instrumentar para el próximo intento
- Loguear en la función de pago el `message`, `status_detail` y `cause` que devuelve Mercado Pago (sin token de tarjeta ni número de documento completo), para poder confirmar en el próximo intento con la Amex si el rechazo desaparece o es política del emisor.

### 5. Verificación
- Probar el flujo en el navegador: confirmar que aparece el selector con CUIT y que el pago se envía con `identification.type: "CUIT"` y 11 dígitos.
- Tras un intento real con la tarjeta corporativa, revisar el registro del pago para comprobar que la identificación quedó guardada y ver el motivo definitivo.

## Detalles técnicos
- `src/pages/Pago.tsx`: configuración de `customization` del Brick para el campo de identificación y propagación del `status_detail` al mensaje de error.
- `supabase/functions/process-mp-payment/index.ts`: esquema Zod con `identification` obligatorio y enum de tipos, validación de longitud y logging del error de Mercado Pago.
- No se toca el diseño, la lógica de idempotencia ni el resto del flujo de cobro.

## Nota importante
Si con el documento correcto la Amex sigue rechazando con `cc_rejected_other_reason`, el bloqueo es del emisor (habitual en corporativas con restricciones de rubro o de comercio online) y se resuelve llamando al banco emisor, no desde el sitio. La diferencia es que ahí el cliente va a ver el motivo real en pantalla en vez de un mensaje genérico.
