# Cambios mínimos de homologación Mercado Pago

Score actual: **55/100**. Estos cambios apuntan a lo factible **sin pedir más datos al huésped** y sin cambiar la UX del checkout. Estimado: +20/25 puntos.

## 1. Webhook + persistencia de pagos (bloque "Conciliación financiera 0/8")

Es el bloque que más penaliza y se resuelve con backend, sin tocar el formulario.

**Nueva edge function `mp-webhook`** (pública, `verify_jwt = false`):
- Recibe notificaciones `payment.created` / `payment.updated` de MP.
- Valida firma con `x-signature` + `x-request-id` usando `MP_WEBHOOK_SECRET`.
- Hace `GET /v1/payments/{id}` con `MP_ACCESS_TOKEN`.
- Upsert en tabla `pagos`.
- Si pasa a `approved` por primera vez, dispara `send-payment-email`.

**Nueva tabla `pagos`** (sin policies públicas, solo `service_role`):
```sql
create table public.pagos (
  id bigint primary key,
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
```

**Configuración manual (una vez)**: pegar la URL del webhook en el panel de MP → Notificaciones → Webhooks, eventos `payment`.

**Secret nuevo**: `MP_WEBHOOK_SECRET` (lo da MP al configurar el webhook).

## 2. `external_reference` único por intento de pago

Generar un UUID en el frontend, enviarlo a `process-mp-payment`, e incluirlo en el body a MP. Permite correlacionar nuestro registro con el `payment_id` de MP (requisito explícito del reporte).

## 3. `binary_mode: true` en el request de pago

Agregar el campo al body de `POST /v1/payments` en `process-mp-payment`. Fuerza respuesta `approved` o `rejected` (sin `in_process`/`pending`). Ya es lo que asume nuestra UI hoy.

## 4. Mensajes de respuesta claros

Mapear los `status_detail` más comunes de MP a mensajes en español accionables para el huésped:

- `cc_rejected_insufficient_amount` → "Tu tarjeta no tiene fondos suficientes."
- `cc_rejected_bad_filled_security_code` → "Revisá el código de seguridad."
- `cc_rejected_bad_filled_date` → "Revisá la fecha de vencimiento."
- `cc_rejected_bad_filled_other` → "Revisá los datos de la tarjeta."
- `cc_rejected_call_for_authorize` → "Llamá a tu banco para autorizar el pago."
- `cc_rejected_high_risk` → "Pago rechazado por seguridad. Probá con otra tarjeta."
- `cc_rejected_card_disabled` → "La tarjeta está inhabilitada. Contactá a tu banco."
- `cc_rejected_duplicated_payment` → "Ya hiciste un pago por el mismo monto. Esperá unos minutos."
- fallback → mensaje genérico actual.

Se implementa como un objeto/diccionario en `Pago.tsx`, sin cambiar layout.

## Qué NO se incluye y por qué

- **Campos extra al formulario** (`payer.first_name`, `last_name`, `address`, `phone`): descartado a pedido del usuario para no sobrecargar la UX.
- **`items[]`, `notification_url` en preferencia, `back_urls`, `auto_return`**: aplican a Checkout Pro/Preferences. Nuestra integración usa Payment Brick + `/v1/payments` directo.
- **API de chargebacks / refunds / cancelaciones**: se gestionan desde el panel de MP, no tiene sentido construir UI propia.
- **`capture: false`** (reserva de fondos): no aplica al cobro de reservas ya confirmadas.

## Resultado esperado

| Bloque | Hoy | Después |
|---|---|---|
| Conciliación financiera | 0/8 | ~5/8 (webhook, consulta pago, external_reference) |
| Experiencia de compra | 2/6 | ~4/6 (binary_mode, mensajes, logo ya hecho) |
| Aprobación de pagos | 4/12 | 4/12 (no cambia, requería pedir más datos) |
| Seguridad | 3/3 | 3/3 |
| Escalabilidad | 1/2 | 1/2 |

Score estimado final: **~75-80/100**.
