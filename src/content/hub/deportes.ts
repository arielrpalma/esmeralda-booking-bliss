import type { HubEntry } from "./types";

// Editorial rule: no invented club names, schedules, fees or contact data.

export const deportes: HubEntry[] = [
  {
    cluster: "deportes",
    slug: "clubes-de-marcos-juarez",
    title: "Clubes deportivos de Marcos Juárez",
    h1: "Clubes deportivos de Marcos Juárez",
    description:
      "Cómo es la vida deportiva de Marcos Juárez: clubes tradicionales, disciplinas que se practican, torneos regionales y alojamiento para delegaciones visitantes.",
    keywords: "clubes de Marcos Juárez, deportes Marcos Juárez, club deportivo Marcos Juárez",
    image: "/images/spaces.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Marcos Juárez tiene una vida deportiva intensa apoyada en clubes tradicionales que reúnen fútbol, básquet, hockey, tenis, natación y actividades sociales, y que organizan torneos regionales durante casi todo el año.",
    body: [
      { type: "p", text: "En las ciudades del interior de Córdoba el club es mucho más que una cancha: es el centro social del barrio. Marcos Juárez sostiene varios clubes con instalaciones para distintas disciplinas y una agenda constante de competencias." },
      { type: "h2", text: "Disciplinas más presentes" },
      { type: "ul", items: [
        "Fútbol, en ligas locales y regionales, con divisiones formativas.",
        "Básquet, con participación en torneos provinciales y federativos.",
        "Hockey sobre césped, con fuerte crecimiento en categorías juveniles.",
        "Tenis y pádel, en clubes y complejos privados.",
        "Natación y actividades de pileta durante la temporada de verano.",
        "Rugby, con presencia regional en el sudeste cordobés.",
      ]},
      { type: "h2", text: "Torneos y visitantes" },
      { type: "p", text: "Los fines de semana de torneo son los picos de ocupación hotelera del año en la ciudad: llegan delegaciones completas de la región, con jugadores, cuerpo técnico y familias. En esas fechas el alojamiento se agota con semanas de anticipación." },
      { type: "h2", text: "Alojamiento para delegaciones" },
      { type: "p", text: "Los departamentos funcionan mejor que las habitaciones de hotel para un plantel: permiten distribuir el grupo, cocinar, lavar ropa y manejar horarios propios de entrada y salida sin depender de recepción." },
      { type: "quote", text: "Reservá con anticipación para fines de semana de torneo. Escribinos por WhatsApp para grupos." },
    ],
    faqs: [
      { q: "¿Qué deportes se practican en Marcos Juárez?", a: "Principalmente fútbol, básquet, hockey, tenis, pádel, natación y rugby, tanto en clubes tradicionales como en complejos privados." },
      { q: "¿Dónde se alojan las delegaciones deportivas?", a: "Los departamentos temporarios son la opción más elegida por grupos: permiten repartir el plantel, cocinar y entrar o salir a cualquier hora." },
      { q: "¿Con cuánta anticipación conviene reservar en fecha de torneo?", a: "Cuanto antes mejor. En fines de semana con torneo regional la ciudad se llena y la disponibilidad se agota semanas antes." },
    ],
    related: ["deportes/torneos-y-delegaciones", "alojamiento/hospedaje-para-deportistas", "eventos/torneos-deportivos"],
  },
  {
    cluster: "deportes",
    slug: "padel-y-tenis",
    title: "Pádel y tenis en Marcos Juárez: canchas y torneos",
    h1: "Pádel y tenis en Marcos Juárez",
    description:
      "Canchas de pádel y tenis en Marcos Juárez: cómo funcionan los complejos, reservas de turno, torneos amateur y alojamiento cerca del centro para jugadores visitantes.",
    keywords: "canchas de padel Marcos Juárez, tenis Marcos Juárez, jugar padel Marcos Juárez",
    image: "/images/gallery1.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "En Marcos Juárez el pádel se juega en complejos privados con canchas techadas e iluminadas, y el tenis en clubes con canchas de polvo de ladrillo. Los turnos se reservan por teléfono o WhatsApp, con más demanda por la noche.",
    body: [
      { type: "p", text: "El pádel vive un momento de expansión en todo el interior del país y Marcos Juárez no es la excepción: hay complejos con canchas techadas que permiten jugar durante todo el año, incluso con lluvia." },
      { type: "h2", text: "Cómo reservar cancha" },
      { type: "ul", items: [
        "Los turnos se piden por teléfono o WhatsApp, casi nunca por web.",
        "Las franjas de la noche son las más demandadas entre semana.",
        "Muchos complejos alquilan paletas y venden pelotas, útil si viajás sin equipo.",
      ]},
      { type: "h2", text: "Tenis" },
      { type: "p", text: "El tenis se practica en los clubes de la ciudad, en general sobre polvo de ladrillo, con escuelas de formación y torneos amateur durante la temporada." },
      { type: "h2", text: "Si venís a un torneo" },
      { type: "p", text: "Los torneos de pádel amateur suelen extenderse todo el fin de semana con partidos que terminan tarde. Alojarte en el centro, con acceso electrónico 24 horas y cochera, evita el problema de volver de madrugada a un hotel con recepción cerrada." },
      { type: "quote", text: "Entrada a cualquier hora con tu código personal. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay canchas de pádel en Marcos Juárez?", a: "Sí, la ciudad cuenta con complejos de pádel con canchas techadas e iluminadas. Los turnos se reservan por teléfono o WhatsApp." },
      { q: "¿Se puede jugar al tenis siendo visitante?", a: "Los clubes suelen permitir el uso de canchas a no socios abonando el turno. Conviene consultarlo con el club antes de ir." },
      { q: "¿El apart está cerca de los complejos deportivos?", a: "Esmeralda Apart está en el centro, a pocos minutos en auto de los clubes y complejos de la ciudad, y coordinamos cochera." },
    ],
    related: ["deportes/clubes-de-marcos-juarez", "deportes/torneos-y-delegaciones", "servicios/cochera"],
  },
  {
    cluster: "deportes",
    slug: "futbol-basquet-y-hockey",
    title: "Fútbol, básquet y hockey en Marcos Juárez",
    h1: "Fútbol, básquet y hockey en Marcos Juárez",
    description:
      "Fútbol, básquet y hockey en Marcos Juárez: ligas locales y regionales, categorías formativas, calendario de competencia y llegada de equipos visitantes.",
    keywords: "futbol Marcos Juárez, basquet Marcos Juárez, hockey Marcos Juárez, liga regional Córdoba",
    image: "/images/gallery3.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "El fútbol, el básquet y el hockey son los deportes de equipo con más actividad en Marcos Juárez: se juegan en ligas locales y regionales del sudeste cordobés, con categorías formativas y competencia durante gran parte del año.",
    body: [
      { type: "p", text: "La ciudad participa del circuito deportivo del sudeste de Córdoba, que involucra a localidades vecinas como Leones, Corral de Bustos, Bell Ville e Inriville. Eso implica movimiento constante de equipos visitantes cada fin de semana." },
      { type: "h2", text: "Fútbol" },
      { type: "p", text: "Las ligas regionales organizan torneos de primera división y divisiones formativas. El fútbol infantil y juvenil mueve además a las familias, que acompañan a los chicos en los encuentros de fin de semana." },
      { type: "h2", text: "Básquet" },
      { type: "p", text: "El básquet tiene tradición fuerte en la provincia de Córdoba, con competencias federativas y torneos de formativas que reúnen delegaciones de varias ciudades en un mismo fin de semana." },
      { type: "h2", text: "Hockey" },
      { type: "p", text: "El hockey sobre césped creció mucho en categorías juveniles y femeninas, y los encuentros suelen concentrar varios partidos en una sola jornada, con equipos que llegan desde la mañana temprano." },
      { type: "h2", text: "Equipos visitantes" },
      { type: "p", text: "Para un plantel completo, el departamento resuelve lo que el hotel complica: distribuir jugadores, cocinar en grupo, lavar equipación y manejar horarios propios. Coordinamos varias unidades para el mismo grupo según disponibilidad." },
      { type: "quote", text: "Alojamiento para planteles y familias acompañantes. Escribinos por WhatsApp y armamos la reserva del grupo." },
    ],
    faqs: [
      { q: "¿Marcos Juárez recibe equipos de otras ciudades?", a: "Sí, forma parte del circuito deportivo del sudeste cordobés y recibe delegaciones de localidades vecinas prácticamente todos los fines de semana de temporada." },
      { q: "¿Pueden alojarse planteles completos?", a: "Sí, coordinamos varias unidades para un mismo grupo según disponibilidad. Conviene consultar por WhatsApp con anticipación." },
      { q: "¿Hay lugar para estacionar el micro o las camionetas?", a: "Coordinamos cochera para vehículos particulares. Para vehículos de gran porte, consultanos antes para ver alternativas en la zona." },
    ],
    related: ["deportes/clubes-de-marcos-juarez", "alojamiento/hospedaje-para-deportistas", "eventos/torneos-deportivos"],
  },
  {
    cluster: "deportes",
    slug: "gimnasios-y-actividad-fisica",
    title: "Gimnasios y actividad física en Marcos Juárez",
    h1: "Gimnasios y actividad física en Marcos Juárez",
    description:
      "Gimnasios, pases diarios y espacios para entrenar en Marcos Juárez: opciones para viajeros que quieren mantener la rutina, y circuitos para correr en el centro.",
    keywords: "gimnasios Marcos Juárez, entrenar en Marcos Juárez, correr Marcos Juárez",
    image: "/images/amenities.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Marcos Juárez tiene gimnasios de musculación y centros de entrenamiento funcional que suelen ofrecer pases diarios o semanales, además de espacios verdes y calles tranquilas del centro para salir a correr o caminar.",
    body: [
      { type: "p", text: "Sostener la rutina de entrenamiento en viaje de trabajo es más fácil de lo que parece en una ciudad chica: las distancias son cortas y hay opciones dentro del casco céntrico." },
      { type: "h2", text: "Gimnasios" },
      { type: "p", text: "Los gimnasios locales trabajan con abono mensual, pero varios aceptan pases diarios o semanales para visitantes. Conviene consultarlo directamente, porque la modalidad cambia de un local a otro." },
      { type: "h2", text: "Correr y caminar" },
      { type: "ul", items: [
        "Las calles del casco céntrico, tranquilas a la mañana temprano.",
        "Los espacios verdes y plazas de la ciudad, con circuitos cortos.",
        "Las avenidas de acceso, más amplias para tiradas largas.",
      ]},
      { type: "h2", text: "Entrenar desde el departamento" },
      { type: "p", text: "Si preferís entrenar sin salir, los departamentos tienen espacio suficiente para una rutina con peso corporal, y el WiFi de fibra permite seguir clases online sin cortes." },
      { type: "quote", text: "WiFi de fibra para tus clases online y ubicación céntrica para salir a correr. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Los gimnasios aceptan pases por día?", a: "Varios lo hacen, pero la modalidad cambia según el local. Conviene consultarlo directamente al llegar." },
      { q: "¿Es seguro salir a correr temprano?", a: "El casco céntrico de Marcos Juárez es tranquilo y las distancias son cortas. Como en cualquier ciudad, conviene elegir calles iluminadas y con circulación." },
      { q: "¿El apart tiene gimnasio?", a: "No cuenta con gimnasio propio, pero los departamentos tienen espacio para entrenar y WiFi de fibra para clases online." },
    ],
    related: ["turismo/parques", "servicios/wifi", "alojamiento/hospedaje-para-viajantes"],
  },
  {
    cluster: "deportes",
    slug: "torneos-y-delegaciones",
    title: "Torneos en Marcos Juárez: alojamiento para delegaciones",
    h1: "Torneos y delegaciones en Marcos Juárez",
    description:
      "Guía para delegaciones que viajan a un torneo en Marcos Juárez: cómo organizar el alojamiento del plantel, cocina, cocheras, horarios y facturación.",
    keywords: "torneos Marcos Juárez, alojamiento para delegaciones Marcos Juárez, hospedaje equipos deportivos Córdoba",
    image: "/images/apartment.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Para una delegación deportiva en Marcos Juárez, los departamentos temporarios superan al hotel: permiten repartir el plantel por unidades, cocinar en grupo, entrar y salir a cualquier hora y facturar el total del viaje a la institución.",
    body: [
      { type: "p", text: "Organizar el viaje de un equipo tiene una lógica distinta a la de una reserva individual: importa la cantidad de camas, el costo por persona, la posibilidad de cocinar y, sobre todo, la flexibilidad horaria." },
      { type: "h2", text: "Checklist para el delegado" },
      { type: "ol", items: [
        "Definir cantidad exacta de personas y cuántas unidades hacen falta.",
        "Confirmar fecha con anticipación: en fin de semana de torneo la ciudad se llena.",
        "Coordinar cocheras según cuántos vehículos viajan.",
        "Avisar si el pago lo realiza el club o la institución, para emitir la factura correspondiente.",
        "Chequear horarios reales de partidos, para prever llegadas o salidas fuera de horario.",
      ]},
      { type: "h2", text: "Por qué el departamento funciona mejor" },
      { type: "ul", items: [
        "Cocina equipada: desayunos y cenas del grupo sin gasto extra en restaurantes.",
        "Acceso electrónico 24 horas: sin recepción ni horario límite.",
        "Cochera coordinada para los vehículos del grupo.",
        "Factura A o B a nombre del club o la empresa.",
        "Espacios comunes dentro de cada unidad para juntarse antes o después del partido.",
      ]},
      { type: "h2", text: "Cómo cotizamos un grupo" },
      { type: "p", text: "Escribinos por WhatsApp con fecha, cantidad de personas y vehículos: armamos la propuesta con las unidades disponibles y la forma de facturación que necesite la institución." },
      { type: "quote", text: "Cotización para grupos por WhatsApp. Reservá con anticipación las fechas de torneo." },
    ],
    faqs: [
      { q: "¿Reciben delegaciones deportivas?", a: "Sí, es uno de los perfiles habituales de huéspedes. Coordinamos varias unidades para un mismo grupo según disponibilidad." },
      { q: "¿Pueden facturar a nombre del club?", a: "Sí, emitimos factura A o B a nombre de la institución o de la empresa que abone el viaje." },
      { q: "¿Hay problema si volvemos tarde de un partido?", a: "No. El acceso es electrónico y personalizado, funciona las 24 horas y no hay horario de recepción." },
      { q: "¿Cuántas personas entran por departamento?", a: "Depende de la unidad. Escribinos con la cantidad total del grupo y armamos la distribución que mejor funcione." },
    ],
    related: ["alojamiento/hospedaje-para-deportistas", "eventos/torneos-deportivos", "servicios/factura-a"],
  },
];
