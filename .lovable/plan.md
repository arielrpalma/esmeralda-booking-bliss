# Ampliar la capacidad a 4 huéspedes

Desde el 1 de septiembre los departamentos admiten hasta 4 personas. Hoy la web tiene un tope fijo de 3 y varios textos escritos para 2-3 personas.

## Qué cambia para el visitante

1. **Barra de reservas (abajo de todo)**
   - El selector de huéspedes permite llegar a 4 (adultos + menores).
   - Los bebés menores de 1 año siguen sin ocupar plaza y no cuentan para ese tope.
   - Al superar el máximo, el botón "+" queda deshabilitado y se muestra el aviso "Máximo 4 huéspedes por departamento".
   - Se sigue enviando la cantidad elegida al motor de reservas igual que hoy.

2. **Textos de la web**
   - Home, secciones de servicios y guías: donde se sugiere una capacidad, pasa a decir "hasta 4 personas", sin detallar la distribución de camas.
   - Preguntas frecuentes: se agrega "¿Para cuántas personas es el departamento?" con la respuesta de hasta 4, y se mantiene que menores de 1 a 3 años y bebés no ocupan plaza.
   - Página de la guía sobre cómo contamos a los huéspedes: se actualiza la tabla para reflejar el tope de 4 con cama.

3. **Landings por motivo de viaje** (trabajo, torneo, Ruta 9, familia)
   - Se ajustan los mensajes para que familia y equipos deportivos mencionen la opción de 4 personas, que es el uso más probable del cuarto lugar.

4. **Mensajes de WhatsApp**
   - Los textos precargados siguen igual; solo se revisa que ninguno mencione un límite de personas.

## Detalles técnicos

- `src/components/FloatingBookingBar.tsx`: `MAX_GUESTS` de 3 a 4 y el cálculo del tope pasa a contar solo `adults + children` (los bebés quedan fuera, con un límite propio razonable de 2 para evitar valores absurdos). Sublabels actualizados. Aviso de máximo alcanzado dentro del panel de huéspedes.
- `index.html`: en el bloque de datos estructurados del alojamiento se agrega `occupancy` (`QuantitativeValue`, máximo 4) al Hotel, manteniendo el resto igual.
- `src/components/FaqSection.tsx`: nueva pregunta de capacidad (también entra en el JSON-LD de FAQ existente).
- `src/content/hub/alojamiento.ts`: tabla de conteo de huéspedes y FAQ relacionadas actualizadas a 4.
- `src/content/personas.ts` y textos de secciones (`AmenitiesSection`, `WhyDirectSection` si corresponde): menciones de capacidad ajustadas.
- `public/llms.txt`: se refleja la capacidad de hasta 4 personas en la descripción del alojamiento.
- No hay cambios de base de datos ni en las funciones de disponibilidad y pagos.

## Fuera de alcance

- No se cambia el motor de reservas (ya tiene cargadas las unidades para 4).
- No se agregan fotos ni descripciones de camas por unidad.
