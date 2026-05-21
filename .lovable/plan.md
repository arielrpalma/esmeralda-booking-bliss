# Mejoras de homologación Mercado Pago

El reporte de MP dio **55/100**. Mucho de lo que pide aplica a Checkout Pro (Preferences), pero nuestra integración usa Payment Brick + `POST /v1/payments`. Aun así hay varias cosas concretas que conviene incorporar para subir el score, mejorar tasa de aprobación y reducir contracargos.

## Qué hacemos (prioridad alta)

### 1. Webhook de notificaciones de pago
Crear edge function `mp-webhook` pública que reciba `payment.updated` / `payment.created` de MP, consulte `/v1/payments/{id}` y persista el resultado.
- Registrar la URL en el panel de MP (manual, una vez): `https://<proyecto>.supabase.co/functions/v1/mp-webhook`.
- Verificar firma con `x-signature` + `x-request-id` y `MP_WEBHOOK_SECRET`.
- Sirve para enterarse de contracargos, devoluciones y cambios de estado.

### 2. Persistir pagos en base de datos
Nueva tabla `pagos` (id MP, status, amount, payer_email, payer_name, external_reference, created_at, raw jsonb). Sin RLS pública: solo escribe el edge function con service role.
- Permite conciliación, reenvío de comprobantes y trazabilidad.

### 3. `external_reference` único por pago
Generar un UUID por intento de pago en el frontend y enviarlo a `process-mp-payment`, que lo incluya en el body a MP. Queda como link entre nuestro sistema y MP.

### 4. Mejor data de `payer` (sube aprobación)
El Payment Brick ya pide email + identificación. Sumamos campos opcionales al formulario previo al Brick:
- Nombre y apellido (`payer.first_name`, `payer.last_name`).
- Teléfono (`payer.phone.area_code` + `number`).
Se pasan al edge function y se mandan a `/v1/payments` en `payer`. Todo opcional para no romper la UX simple, pero recomendado.

### 5. `binary_mode: true`
Agregar al request de `/v1/payments`. Fuerza respuesta `approved` o `rejected` (sin `in_process`/`pending`), que es lo que ya esperamos en la UI.

### 6. Logo oficial Mercado Pago
Mostrar el logo "Pagá con Mercado Pago" debajo del formulario y/o al lado del input de importe. MP lo exige para homologar y mejora confianza.

### 7. Mensajes de error claros según `status_detail`
Hoy mostramos el `status_detail` crudo (ej. `cc_rejected_insufficient_amount`). Mapear los códigos más comunes a mensajes en español accionables:
- `cc_rejected_insufficient_amount` → "Tu tarjeta no tiene fondos suficientes."
- `cc_rejected_bad_filled_security_code` → "Revisá el código de seguridad."
- `cc_rejected_call_for_authorize` → "Tenés que autorizar el pago con tu banco."
- etc.

## Qué NO hacemos (y por qué)

- **`notification_url` en preferencia, `back_urls`, `auto_return`, `items[]` detallados, `payer.address`**: aplican a Checkout Pro. Nuestra integración no usa Preferences en la UI.
- **API de chargebacks / refunds / cancelaciones desde el sitio**: se gestionan desde el panel de MP. No tiene sentido construir UI propia para esto hoy.
- **Reserva de fondos (`capture=false`)**: no aplica al modelo de pago de reserva ya confirmada.
- **Reportes de liquidaciones / transacciones**: se descargan del panel de MP.

## Detalles técnicos

**Tabla `pagos`**
```sql
create table public.pagos (
  id bigint primary key,                -- mp payment id
  status text not null,
  status_detail text,
  amount numeric(12,2) not null,
  payer_email text,
  payer_name text,
  external_reference text unique,
  payment_method_id text,
  raw jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.pagos enable row level security;
-- Sin policies: solo service_role accede (edge function).
```

**Edge function `mp-webhook`** (`verify_jwt = false` en `supabase/config.toml`):
1. Validar firma HMAC SHA256 con `MP_WEBHOOK_SECRET`.
2. `GET https://api.mercadopago.com/v1/payments/{data.id}` con `MP_ACCESS_TOKEN`.
3. `upsert` en `pagos`.
4. Si `status === 'approved'` y no estaba aprobado antes, disparar `send-payment-email`.

**Edge function `process-mp-payment`** — cambios:
- Aceptar y reenviar `external_reference`, `payer.first_name`, `payer.last_name`, `payer.phone`.
- Agregar `binary_mode: true`.
- Upsert inicial en `pagos` con la respuesta sincrónica (el webhook luego actualiza).

**Secrets nuevos**: `MP_WEBHOOK_SECRET` (lo da MP cuando configurás el webhook).

## Resultado esperado

- Score de homologación sube ~25-30 puntos.
- Mejor tasa de aprobación de tarjetas (menos rechazos por antifraude).
- Conciliación automática (sabemos qué pagó cada cliente sin entrar al panel de MP).
- Mensajes de error útiles para el huésped.
