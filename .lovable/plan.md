# Pago simplificado con Payment Brick

## Objetivo
El cliente entra a `/pago`, escribe el importe en pesos, completa los datos de su tarjeta en un formulario embebido de Mercado Pago y paga. Sin redirección y sin pedir nombre, teléfono, departamento ni código de reserva.

## Cambios

### 1. Frontend — `src/pages/Pago.tsx`
- Eliminar los campos: nombre, apellido, email, teléfono, departamento, código de reserva.
- Dejar un único input: **Importe (ARS)** con formato de miles.
- Al presionar "Continuar", se monta el **Payment Brick** de Mercado Pago debajo, ya configurado con ese importe.
- El Brick muestra el formulario oficial de MP con: número de tarjeta, vencimiento, CVV, titular, DNI y cuotas.
- Al enviar, el Brick tokeniza la tarjeta en el navegador (los datos sensibles nunca tocan nuestro servidor) y llama a nuestra edge function con el token.
- Mostrar pantalla de éxito o error según la respuesta, con el `payment_id` y el estado.

### 2. Nueva edge function — `process-mp-payment`
- Recibe del Brick: `token`, `issuer_id`, `payment_method_id`, `installments`, `payer.email`, `payer.identification`, `transaction_amount`.
- Llama a `POST https://api.mercadopago.com/v1/payments` con el `MP_ACCESS_TOKEN` de producción.
- Devuelve `{ status, status_detail, id }` al frontend.
- Validación con Zod, CORS habilitado, sin guardar datos de tarjeta.

### 3. Secret nuevo
- Agregar `MP_PUBLIC_KEY` con el valor `APP_USR-2c6aa44e-aba7-4f79-b415-14a04f58c56c` para que el frontend pueda inicializar el SDK de MP (es clave pública, va en el navegador).

### 4. Mantener
- La función actual `create-mp-preference` queda como está (sin uso desde la UI) por si más adelante querés volver a Checkout Pro.
- Diseño Esmeralda (verde esmeralda + dorado, Playfair/Raleway).

## Lo que queda registrado al pagar
- En **Mercado Pago**: el pago completo (monto, tarjeta enmascarada, estado, email del pagador).
- En tu base: **nada** todavía. Si querés persistirlo, lo agregamos en una iteración siguiente con una tabla `pagos` y/o webhook.

## Notas técnicas
- SDK: `https://sdk.mercadopago.com/js/v2` cargado dinámicamente en `Pago.tsx`.
- Brick usado: `payment` (acepta tarjeta de crédito/débito). Se puede ampliar luego a efectivo/transferencia.
- El email del pagador lo pide el propio Brick, por lo que tampoco hace falta un campo extra.
