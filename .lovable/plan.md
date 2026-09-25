# Plan: Sitio independiente Motoviajeros

## Resultado
Crear un sitio propio para `motoviajeros.esmeraldaapart.com.ar`, no una página en `/motoviajeros` del sitio actual. La portada presenta **MOTOVIAJEROS** y **Tu parada en Marcos Juárez** con una fotografía protagonista de una persona adulta junto a una BMW de turismo. El estilo seguirá la identidad premium de Esmeralda Park: verde esmeralda, acentos dorados y tipografías Playfair Display y Raleway. Sin estética biker, deportiva o juvenil.

**Esmeralda Apart permanece intacto:** sin cambios en sus páginas, barra de disponibilidad, pagos, WhatsApp, PMS, sitemap ni dominio principal. El subdominio todavía no está conectado a este proyecto; se deberá conectar al nuevo sitio, no a Esmeralda Apart.

## Contenido y experiencia
1. Portada fotográfica inmersiva: H1 “MOTOVIAJEROS”, subtítulo “Tu parada en Marcos Juárez”, texto proporcionado, cinco beneficios y accesos a reserva y apartamentos.
2. Beneficios y secuencia emocional de la parada: guardar la moto, descansar, comer, tomarse un tiempo y continuar ruta. Frase “Vos descansás. Tu moto también.”
3. Cochera: “Tu moto también tiene lugar.” Describir únicamente espacio de cochera a coordinar según disponibilidad; no prometer seguridad, vigilancia ni infraestructura no confirmada.
4. Apartamentos: mostrar fotos reales ya disponibles de Esmeralda Apart y describir únicamente servicios respaldados por el sitio. Enlace “Conocer los apartamentos”.
5. “Comé como quieras”: salir a comer, cocinar en el departamento o pedir comida, sin presentar ninguna opción como limitación.
6. Gastronomía cercana: sección diseñada para incorporar fichas verificadas (nombre, tipo, distancia, tiempo, horario, precio y cómo llegar). Mientras no haya establecimientos confirmados, mostrar un acceso a la guía gastronómica existente, sin fichas ficticias.
7. Ruta visual: recorridos desde Buenos Aires y Uruguay hacia Marcos Juárez, Córdoba y el norte, y continuación hacia el sur. Sin distancias ni tiempos no verificados.
8. Galería, preguntas frecuentes basadas en servicios confirmados y cierre con “Reservar mi estadía” y “Consultar por WhatsApp”.

## Fotografías
Generar una serie fotográfica coherente de turismo de ruta premium: imagen principal de motoviajero mayor de 40 años y BMW touring claramente visible; llegada, paisaje argentino, café y descanso. Las imágenes de apartamentos deben provenir de fotografías reales de Esmeralda Apart; ninguna imagen generada se presentará como si fuera una instalación real. Sin carreras, motocross ni elementos rockeros.

## Reserva y consultas
En el sitio nuevo, el botón de reserva enviará al sistema de reservas **existente** sin alterar su funcionamiento. Una consulta breve propia de esta landing preguntará “¿Viajás en moto?” (una moto / varias motos / no) y, cuando corresponda, “¿Cuántas motos?” (1, 2, 3, 4+); enviará esos datos en un mensaje de WhatsApp preparado para coordinar la cochera. No prometer que el PMS guardará estos datos automáticamente: esa integración queda para una etapa posterior.

## Visibilidad en Google
Aplicar literalmente el título y la descripción SEO proporcionados, URL canónica del subdominio, etiquetas sociales, contenido accesible a buscadores, preguntas frecuentes visibles y un sitemap propio del nuevo sitio. Dejar preparados módulos de datos para restaurantes, rutas y fotografías de huéspedes sin publicar información no comprobada.

## Puesta en línea y verificación
Construir y revisar el nuevo sitio en móvil, tableta y escritorio; comprobar enlaces de reserva, consulta por WhatsApp y textos. Después conectar `motoviajeros.esmeraldaapart.com.ar` **al proyecto nuevo** y publicar ese proyecto cuando se solicite expresamente. El dominio utiliza DNS externo y su conexión requerirá completar las indicaciones de DNS del asistente de dominios. Hasta conectar y publicar, solo habrá vista previa; el subdominio no estará activo.

## Detalles técnicos
- Crear un proyecto separado en React/Vite, con tokens visuales derivados de la marca y componentes reutilizables para secciones, fotos, fichas gastronómicas y FAQ.
- Mantener los enlaces al sitio y motor actuales como enlaces externos; no compartir ni modificar el estado de la barra flotante actual.
- El proyecto actual no permite separar una ruta en un sitio independiente mediante una simple edición: primero es necesario disponer del proyecto nuevo. Si esa creación no está disponible desde este entorno, preparar la implementación para el nuevo proyecto sin simular que el subdominio ya funciona.
