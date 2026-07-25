import type { HubEntry } from "./types";

export const turismo: HubEntry[] = [
  {
    cluster: "turismo",
    slug: "que-hacer-en-marcos-juarez",
    title: "Qué hacer en Marcos Juárez: guía de actividades",
    h1: "Qué hacer en Marcos Juárez",
    description:
      "Qué hacer en Marcos Juárez, Córdoba: plazas, gastronomía, deporte, compras y planes para un fin de semana o una escala en la Ruta 9.",
    keywords: "qué hacer en Marcos Juárez, turismo Marcos Juárez, Marcos Juárez Córdoba qué visitar",
    image: "/images/experience.jpg",
    updatedAt: "2026-07-01",
    snippet:
      "En Marcos Juárez se puede recorrer el centro histórico y la plaza principal, comer en parrillas y restaurantes de cocina casera, tomar café de especialidad, hacer deporte en los clubes de la ciudad y recorrer el circuito agroindustrial de la zona.",
    body: [
      { type: "p", text: "Marcos Juárez es una ciudad de escala humana: casi todo el centro se recorre caminando en veinte minutos. Eso la convierte en un destino cómodo tanto para un fin de semana como para una parada de una noche viajando por la Ruta 9." },
      { type: "h2", text: "Plan de un día" },
      { type: "ol", items: [
        "Desayuno en una cafetería del centro.",
        "Caminata por la plaza principal y el casco histórico.",
        "Almuerzo en una parrilla o restaurante de cocina casera.",
        "Tarde de compras por la peatonal y las calles comerciales.",
        "Cena tranquila y regreso caminando al alojamiento.",
      ]},
      { type: "h2", text: "Planes según el tipo de viaje" },
      {
        type: "table",
        headers: ["Perfil", "Plan recomendado", "Duración"],
        rows: [
          ["Familia", "Parques, heladería y paseo por el centro", "Medio día"],
          ["Trabajo", "Cena y caminata corta cerca del alojamiento", "2 horas"],
          ["De paso por Ruta 9", "Cena, descanso y desayuno antes de seguir", "1 noche"],
          ["Fin de semana", "Gastronomía, compras y evento deportivo", "2 días"],
        ],
      },
      { type: "h2", text: "Dónde dormir para moverte caminando" },
      { type: "p", text: "Alojarse en el centro cambia por completo la experiencia: no dependés del auto para comer, comprar o salir a caminar. Esmeralda Apart está a pocas cuadras de la plaza y de la zona gastronómica." },
      { type: "quote", text: "Consultá disponibilidad en la barra inferior y reservá tu departamento en el centro de Marcos Juárez." },
    ],
    faqs: [
      { q: "¿Qué se puede hacer en Marcos Juárez en un día?", a: "Recorrer la plaza principal y el casco histórico, tomar café de especialidad, almorzar en una parrilla local, hacer compras en la zona comercial y cerrar con una cena en el centro." },
      { q: "¿Marcos Juárez es una buena parada en la Ruta 9?", a: "Sí. Está a minutos de la autopista, tiene servicios abiertos hasta tarde y alojamiento con check-in 24 horas, ideal para cortar el viaje entre Rosario y Córdoba." },
      { q: "¿Cuánto tiempo se necesita para conocer la ciudad?", a: "Con un día completo se recorre lo principal; un fin de semana permite sumar gastronomía, compras y algún evento deportivo o feria." },
    ],
    related: ["turismo/lugares-para-visitar", "turismo/restaurantes-recomendados", "alojamiento/hospedaje-para-familias"],
  },
  {
    cluster: "turismo",
    slug: "lugares-para-visitar",
    title: "Lugares para visitar en Marcos Juárez y alrededores",
    h1: "Lugares para visitar en Marcos Juárez",
    description:
      "Los lugares imperdibles de Marcos Juárez: plaza principal, casco histórico, espacios verdes, circuito agroindustrial y pueblos cercanos del sudeste cordobés.",
    keywords: "lugares para visitar Marcos Juárez, atracciones Marcos Juárez, qué ver en Marcos Juárez",
    image: "/images/design.jpg",
    updatedAt: "2026-07-01",
    snippet:
      "Los lugares más visitados de Marcos Juárez son la plaza principal, el casco histórico con su arquitectura de principios de siglo, los espacios verdes de la ciudad, el predio de la Sociedad Rural y los pueblos cercanos como Leones y Corral de Bustos.",
    body: [
      { type: "p", text: "Marcos Juárez creció alrededor del ferrocarril y de la producción agropecuaria, y eso se ve en su traza y en su arquitectura. Estos son los puntos que vale la pena recorrer." },
      { type: "h2", text: "En la ciudad" },
      { type: "ul", items: [
        "Plaza principal: el centro de la vida social, ideal al atardecer.",
        "Casco histórico: fachadas de principios del siglo XX y edificios institucionales.",
        "Espacios verdes y paseos para caminar o correr.",
        "Predio de la Sociedad Rural, sede de ferias y exposiciones.",
        "Zona comercial y peatonal para compras.",
      ]},
      { type: "h2", text: "Escapadas cercanas" },
      {
        type: "table",
        headers: ["Destino", "Distancia", "Tiempo en auto"],
        rows: [
          ["Leones", "25 km", "20 min"],
          ["Corral de Bustos", "45 km", "35 min"],
          ["Bell Ville", "55 km", "40 min"],
          ["Cruz Alta (Santa Fe)", "35 km", "30 min"],
        ],
      },
      { type: "quote", text: "Alojate en el centro y recorré todo caminando: reservá directo en Esmeralda Apart." },
    ],
    faqs: [
      { q: "¿Qué ver en Marcos Juárez?", a: "La plaza principal, el casco histórico ferroviario, los espacios verdes de la ciudad, el predio de la Sociedad Rural y la zona comercial del centro." },
      { q: "¿Qué pueblos hay cerca de Marcos Juárez?", a: "Leones (25 km), Cruz Alta (35 km), Corral de Bustos (45 km) y Bell Ville (55 km), todos accesibles en menos de una hora." },
    ],
    related: ["turismo/que-hacer-en-marcos-juarez", "turismo/parques", "rutas/alojamiento-ruta-nacional-9"],
  },
  {
    cluster: "turismo",
    slug: "restaurantes-recomendados",
    title: "Restaurantes recomendados en Marcos Juárez",
    h1: "Restaurantes recomendados en Marcos Juárez",
    description:
      "Dónde comer en Marcos Juárez: parrillas, cocina casera, pastas, pizzerías y delivery cerca del centro. Guía práctica para viajeros y familias.",
    keywords: "restaurantes Marcos Juárez, dónde comer en Marcos Juárez, parrillas Marcos Juárez",
    image: "/images/spaces.jpg",
    updatedAt: "2026-07-01",
    snippet:
      "En Marcos Juárez se come muy bien parrilla, pastas caseras y pizza. La mayoría de los restaurantes está en el centro, a pocas cuadras de Esmeralda Apart, y varios trabajan con delivery hasta tarde, útil si llegás de noche por la Ruta 9.",
    body: [
      { type: "p", text: "La gastronomía local es de tradición italiana y criolla: asado, milanesas, pastas rellenas y pizza a la piedra. Los precios son notablemente más bajos que en Rosario o Córdoba capital." },
      { type: "h2", text: "Qué tipo de cocina vas a encontrar" },
      {
        type: "table",
        headers: ["Estilo", "Ideal para", "Franja horaria"],
        rows: [
          ["Parrilla", "Cena en grupo o de trabajo", "21 a 24 h"],
          ["Cocina casera", "Almuerzo rápido", "12 a 15 h"],
          ["Pizzería", "Familia y delivery", "20 a 24 h"],
          ["Cafetería", "Desayuno y merienda", "8 a 20 h"],
        ],
      },
      { type: "h2", text: "Consejos prácticos" },
      { type: "ul", items: [
        "En días de semana muchos locales cierran temprano: reservá o pedí delivery.",
        "Si llegás pasada la medianoche, conviene tener la cocina del departamento equipada.",
        "Los fines de semana con eventos deportivos el centro se llena: anticipá la mesa.",
      ]},
      { type: "quote", text: "Alojate a pocas cuadras de la zona gastronómica: consultá disponibilidad y reservá directo." },
    ],
    faqs: [
      { q: "¿Dónde comer en Marcos Juárez?", a: "En el centro se concentran parrillas, pizzerías, restaurantes de cocina casera y cafeterías, todos a pocas cuadras del alojamiento." },
      { q: "¿Hay delivery en Marcos Juárez?", a: "Sí, varias pizzerías y rotiserías trabajan con delivery hasta tarde, una buena opción si llegás de noche." },
    ],
    related: ["turismo/cafeterias", "turismo/vida-nocturna", "servicios/cocina-equipada"],
  },
  {
    cluster: "turismo",
    slug: "cafeterias",
    title: "Cafeterías en Marcos Juárez: dónde desayunar y merendar",
    h1: "Cafeterías en Marcos Juárez",
    description:
      "Cafeterías y bares de café en Marcos Juárez para desayunar, merendar o trabajar con notebook y WiFi, a pocas cuadras del centro.",
    keywords: "cafeterías Marcos Juárez, café de especialidad Marcos Juárez, dónde desayunar Marcos Juárez",
    image: "/images/amenities.jpg",
    updatedAt: "2026-07-01",
    snippet:
      "Las cafeterías de Marcos Juárez se concentran en el centro y abren desde temprano. Varias ofrecen café de especialidad, WiFi y mesas para trabajar, una alternativa útil para quienes viajan por trabajo y necesitan una reunión informal.",
    body: [
      { type: "p", text: "El café es parte de la rutina local: se desayuna temprano, se hace una pausa a media mañana y se merienda entre las 17 y las 19. Para quien viaja por trabajo, la cafetería es la sala de reuniones informal de la ciudad." },
      { type: "h2", text: "Qué buscar según tu plan" },
      { type: "ul", items: [
        "Desayuno rápido antes de una reunión: locales sobre la zona céntrica.",
        "Reunión de trabajo: mesas amplias y WiFi estable.",
        "Merienda en familia: espacio para cochecitos y opciones dulces.",
        "Café para llevar antes de salir a la ruta.",
      ]},
      { type: "h2", text: "Trabajar desde el departamento" },
      { type: "p", text: "Si necesitás videollamadas sin ruido, el WiFi de fibra del apart y el escritorio de la unidad suelen rendir mejor que una cafetería. Muchos huéspedes combinan: reunión en el café, trabajo en el departamento." },
      { type: "quote", text: "Reservá tu departamento con WiFi de fibra y escritorio: consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay café de especialidad en Marcos Juárez?", a: "Sí, en los últimos años abrieron cafeterías con café de especialidad y opciones de pastelería en la zona céntrica." },
      { q: "¿Se puede trabajar con notebook en las cafeterías?", a: "Varias ofrecen WiFi y mesas amplias. Para videollamadas conviene el departamento, que cuenta con fibra óptica y escritorio." },
    ],
    related: ["turismo/restaurantes-recomendados", "servicios/wifi", "alojamiento/mejor-alojamiento-para-empresas"],
  },
  {
    cluster: "turismo",
    slug: "vida-nocturna",
    title: "Vida nocturna en Marcos Juárez",
    h1: "Vida nocturna en Marcos Juárez",
    description:
      "Bares, cervecerías y salidas nocturnas en Marcos Juárez: qué esperar, horarios y cómo volver caminando al alojamiento en el centro.",
    keywords: "vida nocturna Marcos Juárez, bares Marcos Juárez, salidas nocturnas Marcos Juárez",
    image: "/images/gallery5.jpg",
    updatedAt: "2026-07-01",
    snippet:
      "La vida nocturna de Marcos Juárez se mueve entre bares, cervecerías y clubes sociales, sobre todo los viernes y sábados. Todo está a pocas cuadras del centro, así que alojarse en la zona permite volver caminando sin usar el auto.",
    body: [
      { type: "p", text: "No esperes una escena de gran ciudad: la noche de Marcos Juárez es tranquila, social y de encuentro. Bares con cerveza artesanal, previas en casas y eventos de club los fines de semana." },
      { type: "h2", text: "Cómo se organiza la noche" },
      {
        type: "table",
        headers: ["Horario", "Actividad"],
        rows: [
          ["21 a 23 h", "Cena en parrilla o pizzería"],
          ["23 a 1 h", "Bar o cervecería"],
          ["1 h en adelante", "Eventos y fiestas los fines de semana"],
        ],
      },
      { type: "h2", text: "Volver seguro" },
      { type: "ul", items: [
        "Alojarse en el centro evita manejar de noche.",
        "El check-in digital permite volver a la hora que sea, sin recepción.",
        "Hay remises y aplicaciones de traslado disponibles.",
      ]},
      { type: "quote", text: "Volvé a la hora que quieras: nuestro acceso es digital y funciona las 24 horas. Reservá directo." },
    ],
    faqs: [
      { q: "¿Hay bares en Marcos Juárez?", a: "Sí, hay bares y cervecerías en la zona céntrica que trabajan principalmente de jueves a sábado." },
      { q: "¿Puedo volver al alojamiento de madrugada?", a: "Sí. El ingreso es con código digital y funciona las 24 horas, sin depender de una recepción." },
    ],
    related: ["turismo/restaurantes-recomendados", "servicios/check-in-digital", "turismo/que-hacer-en-marcos-juarez"],
  },
  {
    cluster: "turismo",
    slug: "parques",
    title: "Parques y espacios verdes en Marcos Juárez",
    h1: "Parques y espacios verdes en Marcos Juárez",
    description:
      "Plazas, parques y paseos verdes de Marcos Juárez para caminar, correr o salir con chicos y mascotas, a pocos minutos del centro.",
    keywords: "parques Marcos Juárez, plazas Marcos Juárez, espacios verdes Marcos Juárez",
    image: "/images/gallery3.jpg",
    updatedAt: "2026-07-01",
    snippet:
      "Marcos Juárez tiene plazas arboladas y paseos verdes distribuidos por la ciudad, ideales para caminar, correr al atardecer o salir con chicos y mascotas. Los principales están a pocas cuadras del centro y del alojamiento.",
    body: [
      { type: "p", text: "El clima del sudeste cordobés invita a estar afuera casi todo el año. Las plazas son el punto de encuentro de la ciudad y funcionan como pista de running informal al atardecer." },
      { type: "h2", text: "Usos más frecuentes" },
      { type: "ul", items: [
        "Caminar o correr temprano y al atardecer.",
        "Juegos para chicos y merienda al aire libre.",
        "Paseo con mascotas: somos un alojamiento pet friendly.",
        "Punto de encuentro antes de una cena en el centro.",
      ]},
      { type: "quote", text: "Alojate cerca de las plazas y del centro: consultá disponibilidad y reservá directo." },
    ],
    faqs: [
      { q: "¿Hay parques para chicos en Marcos Juárez?", a: "Sí, las plazas principales cuentan con juegos y sectores verdes, a pocas cuadras del alojamiento." },
      { q: "¿Puedo salir a correr en Marcos Juárez?", a: "Sí, las plazas y paseos arbolados del centro son el circuito habitual para caminar y correr." },
    ],
    related: ["alojamiento/hospedaje-para-familias", "turismo/lugares-para-visitar", "turismo/que-hacer-en-marcos-juarez"],
  },
  {
    cluster: "turismo",
    slug: "compras",
    title: "Compras en Marcos Juárez: zona comercial y horarios",
    h1: "Compras en Marcos Juárez",
    description:
      "Dónde hacer compras en Marcos Juárez: zona comercial del centro, supermercados, indumentaria, farmacias y horarios de atención.",
    keywords: "compras Marcos Juárez, comercios Marcos Juárez, supermercados Marcos Juárez",
    image: "/images/gallery2.jpg",
    updatedAt: "2026-07-01",
    snippet:
      "La zona comercial de Marcos Juárez se concentra en el centro, con indumentaria, supermercados, farmacias y ferreterías. Los comercios abren de 8:30 a 12:30 y de 16:30 a 20:30, con corte al mediodía de lunes a sábado.",
    body: [
      { type: "p", text: "El comercio local es fuerte y abastece a toda la región. Si venís por trabajo, tené en cuenta el corte del mediodía: entre las 12:30 y las 16:30 casi todo cierra." },
      { type: "h2", text: "Horarios de referencia" },
      {
        type: "table",
        headers: ["Rubro", "Mañana", "Tarde"],
        rows: [
          ["Comercios en general", "8:30 - 12:30", "16:30 - 20:30"],
          ["Supermercados", "8:00 - 13:00", "16:00 - 21:00"],
          ["Farmacias", "Turnos rotativos", "Turno nocturno disponible"],
          ["Bancos", "8:00 - 13:00", "Cerrado"],
        ],
      },
      { type: "h2", text: "Qué conviene comprar antes de llegar" },
      { type: "ul", items: [
        "Si llegás de noche: algo para desayunar, porque los comercios abren a las 8:30.",
        "Los domingos la actividad comercial es mínima.",
        "El departamento tiene cocina equipada, así que conviene hacer una compra chica de supermercado.",
      ]},
      { type: "quote", text: "Reservá un departamento con cocina equipada y organizá tu estadía sin depender de horarios." },
    ],
    faqs: [
      { q: "¿Qué horario tienen los comercios en Marcos Juárez?", a: "En general de 8:30 a 12:30 y de 16:30 a 20:30, con corte al mediodía de lunes a sábado. Los bancos atienden solo de 8 a 13." },
      { q: "¿Hay supermercados cerca del centro?", a: "Sí, hay supermercados a pocas cuadras del alojamiento, con horario corrido más amplio que el resto del comercio." },
    ],
    related: ["empresas/bancos", "servicios/cocina-equipada", "turismo/que-hacer-en-marcos-juarez"],
  },
];
