# Configuración de medición (GA4 + GTM + Meta Pixel)

Toda la infraestructura ya está instalada en el código. Solo necesitás crear las cuentas y pegarme los IDs.

## 1. Google Tag Manager (GTM)

1. Andá a https://tagmanager.google.com y entrá con tu Google.
2. **Crear cuenta** → Nombre: `Esmeralda Apart` · País: Argentina.
3. **Nombre del contenedor**: `esmeraldaapart.com.ar` · Tipo: **Web**.
4. Aceptás los términos.
5. Te aparece un código `GTM-XXXXXXX` (arriba a la derecha). **Ese es el ID** que necesito.

## 2. Google Analytics 4 (GA4)

1. Andá a https://analytics.google.com → **Empezar a medir**.
2. **Cuenta**: `Esmeralda Apart`. **Propiedad**: `Esmeralda Apart Web` · Zona horaria: Argentina · Moneda: ARS.
3. Categoría: **Viajes**. Tamaño: pequeño.
4. **Flujo de datos** → Web → URL `https://esmeraldaapart.com.ar` → nombre `Sitio principal`.
5. Anotá el **Measurement ID** (`G-XXXXXXXXXX`).

Después, en GTM, creás una etiqueta `Google Analytics: GA4 Configuration` con ese `G-XXXX` y activador `All Pages`. (Te paso los pasos detallados después.)

## 3. Meta Business + Pixel

1. https://business.facebook.com → **Crear cuenta** con tu Facebook.
2. **Configuración del negocio** → **Orígenes de datos** → **Píxeles** → **Agregar**.
3. Nombre: `Esmeralda Apart Pixel` · URL: `https://esmeraldaapart.com.ar`.
4. Copiá el **ID del Pixel** (número de ~15 dígitos).
5. Para CAPI (server-side, opcional pero recomendado): **Configuración** → **Conversions API** → **Generar token de acceso**. Guardalo.

## 4. Pasame los IDs

Mandame en el chat:

```
GTM_ID = GTM-XXXXXXX
GA4_ID = G-XXXXXXXXXX
META_PIXEL_ID = 123456789012345
META_CAPI_TOKEN = (opcional, si lo generaste)
```

Yo los configuro como secrets (`VITE_GTM_ID`, `VITE_META_PIXEL_ID`, `META_CAPI_TOKEN`) y queda todo activo en el próximo deploy.

## Eventos que ya están instrumentados

| Evento | Disparador |
|---|---|
| `PageView` | Carga inicial (Pixel) + cada cambio de ruta (GA4 vía GTM) |
| `whatsapp_click` / `Contact` | Click en el botón flotante de WhatsApp |
| `check_availability` / `Lead` | Click en "Consultar" de la barra de reserva |
| `booking_start` / `InitiateCheckout` | Click en "Reservar ahora" tras consultar disponibilidad |
| `booking_complete` / `Purchase` | Carga de la página `/gracias` (con de-dup por sesión) |

## Configurar las conversiones en Ads

- **Google Ads**: importá `booking_start` y `booking_complete` desde GA4 como conversiones.
- **Meta Ads**: marcá `InitiateCheckout` y `Purchase` como eventos de optimización.

## Verificar que funciona

1. Instalá la extensión **Tag Assistant** de Google y **Meta Pixel Helper**.
2. Entrá al sitio publicado → debería aparecer GTM y el Pixel activos.
3. Hacé un click en WhatsApp → debería dispararse `whatsapp_click` en GTM Preview y `Contact` en el Pixel Helper.
