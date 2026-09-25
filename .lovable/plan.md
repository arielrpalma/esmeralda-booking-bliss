# Plan: Landing "Motoviajeros" — /motoviajeros

## Objetivo
Nueva landing independiente en `https://esmeraldaapart.com.ar/motoviajeros`, integrada visualmente a la identidad Esmeralda (esmeralda/dorado, Playfair Display + Raleway), orientada a motoviajeros adultos (+40) de media/alta gama. Concepto: "Tu parada en Marcos Juárez". No se modifica ninguna página ni funcionalidad existente.

## Estructura de la landing (orden)
1. **Hero** — "MOTOVIAJEROS / Tu parada en Marcos Juárez." + texto + 5 badges (cochera motos, apartamentos, cocina, gastronomía, ubicación) + CTAs "Reservar" (scroll a barra de reservas) y "Ver los apartamentos" (scroll a sección).
2. **Beneficios principales** — grilla de 4-6 beneficios reales.
3. **Mensaje emocional** — foto moto llegando + "Después de cientos de kilómetros, lo que necesitás es simple." + 5 ítems + frase "Vos descansás. Tu moto también."
4. **Cochera para motos** — "Tu moto también tiene lugar." Solo afirmar: espacio de cochera coordinado previamente (dato real del sitio). Sin vigilancia/cámaras/cerrada.
5. **Alojamiento** — "Un buen descanso cambia el viaje." Amenities reales ya publicados: cama confortable, baño privado, aire frío/calor, WiFi fibra, Smart TV, cocina equipada, check-in digital 24 h, hasta 4 huéspedes. CTA "Conocer los apartamentos".
6. **"Comé como quieras."** — 3 tarjetas: Salir a comer / Cocinar en el departamento / Pedir comida. Tono de libertad, no limitación.
7. **Gastronomía cercana** — "Después de la ruta, no busques dónde comer." Estructura de tarjetas (nombre, tipo, distancia, horario, precio, "Cómo llegar") alimentada desde un array de datos; arranca vacío con mensaje "Estamos cargando las opciones cercanas" — sin inventar restaurantes.
8. **Ubicación estratégica** — "Una parada estratégica en tu viaje." Diagrama visual de rutas (BS AS → Marcos Juárez → Córdoba → Norte; Uruguay → Entre Ríos → Santa Fe → Marcos Juárez) sin distancias/tiempos no verificados. Reutiliza distancias ya publicadas en el hub solo si aplican.
9. **Galería** — grilla con imágenes generadas (moto premium, ruta, llegada, descanso, gastronomía, café).
10. **FAQ** — 7 preguntas con respuestas basadas solo en datos reales ya publicados (cochera coordinada, cocina equipada, check-in 24 h, hasta 4 huéspedes, varias motos a coordinar por WhatsApp).
11. **CTA final** — "Reservar mi estadía" + "Consultar por WhatsApp" (mensaje precargado propio vía `src/lib/whatsapp.ts`).
12. Barra de reservas flotante + botón WhatsApp (mismos componentes globales, sin modificarlos).

## Imágenes
Generar con imagegen (estilo fotográfico premium, turismo de ruta argentino, motos de alta gama, adultos +40; sin estética biker/calaveras/llamas):
- Hero: moto de turismo premium estacionada frente a un apart elegante al atardecer.
- Emocional: motoviajero adulto llegando/descansando.
- 4-6 imágenes de galería (ruta, paisaje, café, moto estacionada, gastronomía).
Guardar en `public/images/motoviajeros/`.

## Reserva: identificar motoviajeros
Agregar a `FloatingBookingBar` un campo opcional "¿Viajás en moto?" (Sí, una / Sí, varias / No) y, si aplica, "¿Cuántas motos?" (1/2/3/4+). La selección se adjunta como texto al mensaje de WhatsApp y a la consulta — no altera disponibilidad, precios ni pagos. Si preferís no tocar la barra global, alternativa: el dato se pide solo por WhatsApp desde esta landing (mensaje precargado lo incluye). **Decisión por defecto del plan: campo en la barra, visible en todas las páginas pero sin impacto funcional.**

## SEO
- `react-helmet-async`: title "Motoviajeros | Alojamiento con cochera para motos en Marcos Juárez", meta description provista, canonical y og:url a `/motoviajeros`, og:image del hero.
- JSON-LD: BreadcrumbList + FAQPage.
- Keywords: motoviajeros, alojamiento para motos, mototurismo Córdoba, cochera para motos Marcos Juárez, etc.
- Agregar la ruta a `scripts/generate-sitemap.ts` y al prerender (`scripts/prerender.ts`), y un enlace desde `InternalLinksSection` (solo sumar un link, sin rediseñar).
- Registrar en `public/llms.txt`.

## Detalles técnicos
- Nuevo archivo `src/pages/Motoviajeros.tsx` (página autocontenida con secciones como componentes internos, reutilizando Navbar, Footer, FloatingBookingBar, WhatsAppButton).
- Nuevo archivo de datos `src/content/motoviajeros.ts` (beneficios, FAQs, array `restaurants` vacío listo para completar, rutas).
- Ruta `/motoviajeros` en `src/App.tsx` antes del catch-all.
- Campo moto en `FloatingBookingBar.tsx`: estado local + texto en mensaje; sin cambios en edge functions ni en HotelPMS.
- Tokens semánticos existentes (primary, section-dark); cero colores hardcodeados.
- Verificación: build OK + Playwright en `/motoviajeros` (desktop y mobile) + regenerar sitemap y prerender.
- Los cambios llegan al dominio real con la próxima publicación.
