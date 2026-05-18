# Selector compacto de medio de pago

## Objetivo
Eliminar el paso intermedio con dos botones grandes (Crédito / Débito) y mostrar el formulario de Mercado Pago directamente, con dos pestañas pequeñas arriba para alternar entre crédito y débito.

## Cambios en `src/pages/Pago.tsx`

1. **Default a crédito**: inicializar `paymentType` en `"credit"` en lugar de `null`, así el Brick se monta apenas el importe es válido.
2. **Eliminar el bloque de selección grande**: quitar el `div` con los dos botones (`CreditCard` / `Wallet`) que aparecía cuando `!paymentType`.
3. **Tabs compactos**: encima del contenedor del Brick, mostrar dos pestañas chicas estilo segmented control:
   - "Crédito" y "Débito"
   - Estado activo con `bg-primary text-primary-foreground`, inactivo con `text-muted-foreground hover:text-foreground`
   - Tipografía `font-body text-xs`, alto reducido (~h-9), border inferior sutil
4. **Cambio entre tabs**: al hacer click se actualiza `paymentType`, el `useEffect` ya remonta el Brick con la nueva configuración (lógica existente).
5. **Quitar botón "Cambiar"** y la línea "Tarjeta de crédito/débito" sobre el Brick (los tabs ya cumplen esa función).
6. **`reset`**: volver a `paymentType = "credit"` en vez de `null`.
7. **Imports**: quitar `Wallet` si deja de usarse (mantener `CreditCard` solo si se usa en los tabs, opcional).

## Resultado visual
```text
[ Importe: $ 12.345 ]
[ Crédito | Débito ]   ← tabs compactos
[ Formulario MP Brick ]
```

Sin pantalla intermedia: el usuario completa el importe y ve directo el formulario, alternando medio con un click si lo necesita.
