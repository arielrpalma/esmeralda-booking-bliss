# Corregir el popup de reservas

## Objetivo
Hacer que la ventana de Multiapart se vea completa dentro del área visible del navegador, tanto en computadora como en celular, sin cambiar el flujo de reserva.

## Cambios
- Revisar la estructura que genera el widget oficial al abrir la reserva y localizar el contenedor que actualmente excede la pantalla.
- Limitar la ventana al alto y ancho disponibles, respetando los bordes seguros del navegador.
- Mantener fija y accesible la opción para cerrar.
- Habilitar desplazamiento vertical dentro de la ventana cuando el formulario de huésped y la confirmación superen el alto disponible.
- Evitar que la barra inferior de reservas o el contenido de la página queden por encima del popup.
- Corregir también la advertencia actual del widget relacionada con la referencia interna, sin alterar Multiapart ni sus parámetros.

## Validación
- Abrir una consulta real desde la barra oficial de Multiapart.
- Comprobar en escritorio que se vean el encabezado, los datos del huésped y el contenido inferior mediante desplazamiento.
- Comprobar el mismo recorrido en pantalla móvil.
- Verificar que cerrar y volver a abrir la ventana funcione correctamente y que no aparezcan superposiciones.

## Detalles técnicos
La solución se aplicará sobre los estilos del popup generado por el elemento oficial `hotel-booking`, usando límites basados en el alto visible del dispositivo y desplazamiento interno. Se conservarán `hotel="esmeralda-apart"`, idioma español, moneda USD y el flujo propio de Multiapart.