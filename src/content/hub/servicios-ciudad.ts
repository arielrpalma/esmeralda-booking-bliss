import type { HubEntry } from "./types";

// Editorial rule: no invented names, phones, addresses or opening hours.
// Only verifiable, city-level information plus practical guidance.

export const serviciosCiudad: HubEntry[] = [
  {
    cluster: "serviciosCiudad",
    slug: "hospitales-y-clinicas",
    title: "Hospitales y clínicas en Marcos Juárez",
    h1: "Hospitales y clínicas en Marcos Juárez",
    description:
      "Atención médica en Marcos Juárez: el Hospital Abel Ayerza, clínicas y sanatorios privados, guardias y qué hacer si necesitás asistencia estando de viaje.",
    keywords: "hospital Marcos Juárez, clinicas Marcos Juárez, guardia medica Marcos Juárez",
    image: "/images/spaces.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Marcos Juárez cuenta con el Hospital Abel Ayerza, de gestión pública provincial, además de clínicas y sanatorios privados y centros de diagnóstico. La guardia del hospital funciona las 24 horas para urgencias.",
    body: [
      { type: "p", text: "Marcos Juárez es cabecera departamental y concentra la atención médica de una amplia zona rural: eso significa que la ciudad tiene más infraestructura sanitaria de la que correspondería a su tamaño." },
      { type: "h2", text: "Sistema público" },
      { type: "p", text: "El Hospital Abel Ayerza es el efector público de referencia de la ciudad y del departamento Marcos Juárez. Atiende consultas programadas y urgencias, con guardia permanente." },
      { type: "h2", text: "Sistema privado" },
      { type: "p", text: "La ciudad tiene clínicas y sanatorios privados y centros de diagnóstico por imágenes y laboratorio. Si tenés obra social o prepaga, conviene consultar la cartilla antes de viajar para saber qué prestador te corresponde en la localidad." },
      { type: "h2", text: "Si te sentís mal durante tu estadía" },
      { type: "ol", items: [
        "Para una urgencia, la guardia del hospital funciona las 24 horas.",
        "Para una consulta menor, la farmacia de turno es el primer paso razonable.",
        "Si necesitás traslado, hay servicio de remis y taxi en la ciudad.",
        "Escribinos por WhatsApp: te orientamos con la dirección y cómo llegar desde el apart.",
      ]},
      { type: "h2", text: "Acompañantes de pacientes" },
      { type: "p", text: "Parte de nuestros huéspedes viaja para acompañar a un familiar internado o para un tratamiento programado. En esos casos, el check-in digital 24 horas y la cocina equipada hacen la diferencia: se entra y se sale a cualquier hora sin depender de recepción." },
      { type: "quote", text: "Estadías largas o de última hora para acompañantes. Consultá disponibilidad en la barra inferior o escribinos por WhatsApp." },
    ],
    faqs: [
      { q: "¿Marcos Juárez tiene hospital?", a: "Sí, el Hospital Abel Ayerza es el hospital público de referencia de la ciudad y del departamento, con guardia las 24 horas." },
      { q: "¿Hay clínicas privadas?", a: "Sí, la ciudad cuenta con clínicas y sanatorios privados y centros de diagnóstico. Conviene verificar en la cartilla de tu obra social o prepaga qué prestador te corresponde." },
      { q: "¿Puedo hospedarme si acompaño a un paciente internado?", a: "Sí. Es un caso frecuente: el acceso electrónico 24 horas permite entrar y salir a cualquier hora, y podemos coordinar estadías largas por WhatsApp." },
    ],
    related: ["empresas/hospital-abel-ayerza", "serviciosCiudad/farmacias", "serviciosCiudad/remises-y-taxis"],
  },
  {
    cluster: "serviciosCiudad",
    slug: "farmacias",
    title: "Farmacias en Marcos Juárez y farmacia de turno",
    h1: "Farmacias en Marcos Juárez",
    description:
      "Farmacias en Marcos Juárez: cómo funciona el sistema de farmacia de turno, dónde consultar cuál está de guardia y qué llevar si viajás con medicación.",
    keywords: "farmacias Marcos Juárez, farmacia de turno Marcos Juárez, farmacia 24 horas Marcos Juárez",
    image: "/images/amenities.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "En Marcos Juárez las farmacias del centro trabajan en horario comercial y rotan un sistema de farmacia de turno para cubrir noches, domingos y feriados. El turno se publica en las vidrieras de las farmacias y en medios locales.",
    body: [
      { type: "p", text: "Como en el resto de la provincia de Córdoba, las farmacias de Marcos Juárez se organizan con un sistema de turnos rotativos: fuera del horario comercial siempre hay una farmacia de guardia habilitada para vender." },
      { type: "h2", text: "Cómo saber cuál está de turno" },
      { type: "ul", items: [
        "En la vidriera de cualquier farmacia del centro suele estar el listado del turno.",
        "Los medios y las páginas locales publican el turno diario.",
        "Escribinos por WhatsApp y te orientamos con la que esté de guardia.",
      ]},
      { type: "h2", text: "Si viajás con medicación" },
      { type: "p", text: "Traé la receta si tomás medicación crónica: sin receta, muchos productos no pueden despacharse. Si necesitás conservar algo en frío, todos los departamentos tienen heladera." },
      { type: "h2", text: "Botiquín básico" },
      { type: "p", text: "Para una parada de una noche viajando por la Au Ruta 9, conviene llevar analgésicos, antiácido y lo que uses habitualmente: fuera del horario comercial dependés del turno, que puede quedar a varias cuadras." },
      { type: "quote", text: "Departamentos en el centro, cerca de las farmacias y del hospital. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay farmacias 24 horas en Marcos Juárez?", a: "No hay una farmacia abierta permanentemente, pero funciona un sistema rotativo de farmacia de turno que cubre noches, domingos y feriados." },
      { q: "¿Cómo averiguo la farmacia de turno?", a: "El turno se publica en las vidrieras de las farmacias del centro y en medios locales. También podés escribirnos por WhatsApp y te orientamos." },
      { q: "¿Las farmacias están cerca del apart?", a: "Sí, hay farmacias dentro del casco céntrico, a distancia caminable desde 9 de Julio 262." },
    ],
    related: ["serviciosCiudad/hospitales-y-clinicas", "serviciosCiudad/supermercados", "rutas/donde-descansar-viajando-por-ruta-9"],
  },
  {
    cluster: "serviciosCiudad",
    slug: "bancos-y-cajeros",
    title: "Bancos y cajeros automáticos en Marcos Juárez",
    h1: "Bancos y cajeros automáticos en Marcos Juárez",
    description:
      "Bancos y cajeros automáticos en Marcos Juárez: dónde están, cómo funcionan los horarios bancarios y qué tener en cuenta con el efectivo en fines de semana largos.",
    keywords: "bancos Marcos Juárez, cajeros automaticos Marcos Juárez, extraer efectivo Marcos Juárez",
    image: "/images/design.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Los bancos de Marcos Juárez se concentran en el casco céntrico, con atención al público en horario bancario de mañana y cajeros automáticos de las redes Link y Banelco disponibles las 24 horas en sus sucursales.",
    body: [
      { type: "p", text: "La zona bancaria de Marcos Juárez está en el centro, en pocas cuadras alrededor de la plaza principal, lo que facilita resolver trámites o extracciones a pie si te alojás en la zona." },
      { type: "h2", text: "Horarios" },
      { type: "p", text: "La atención al público de los bancos en Argentina es de mañana, de lunes a viernes hábiles. Los cajeros automáticos funcionan las 24 horas, aunque en fines de semana largos pueden quedarse sin efectivo por la alta demanda." },
      { type: "h2", text: "Consejos prácticos" },
      { type: "ul", items: [
        "Si llegás un viernes a la tarde, extraé efectivo temprano: el fin de semana los cajeros del interior suelen agotarse.",
        "Muchos comercios aceptan transferencias por billeteras virtuales, alternativa útil si no conseguís efectivo.",
        "Para viajes de trabajo, guardá los comprobantes: emitimos factura A o B para rendición de gastos.",
      ]},
      { type: "h2", text: "Pagos en el apart" },
      { type: "p", text: "En Esmeralda Apart podés abonar por transferencia, con tarjeta a través de nuestro posnet virtual o en efectivo, y siempre emitimos comprobante fiscal." },
      { type: "quote", text: "Factura A o B para tu rendición de gastos. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay cajeros automáticos en Marcos Juárez?", a: "Sí, hay cajeros de las redes Link y Banelco en las sucursales bancarias del casco céntrico, disponibles las 24 horas." },
      { q: "¿Cuál es el horario de los bancos?", a: "La atención al público es en horario bancario de mañana, de lunes a viernes hábiles. Los cajeros funcionan siempre." },
      { q: "¿Puedo pagar el alojamiento con tarjeta?", a: "Sí. Aceptamos tarjeta mediante posnet virtual, transferencia bancaria y efectivo, y emitimos factura A o B." },
    ],
    related: ["empresas/bancos", "servicios/factura-a", "serviciosCiudad/tramites-utiles"],
  },
  {
    cluster: "serviciosCiudad",
    slug: "estaciones-de-servicio",
    title: "Estaciones de servicio en Marcos Juárez y Ruta 9",
    h1: "Estaciones de servicio en Marcos Juárez",
    description:
      "Estaciones de servicio en Marcos Juárez y sobre la Au Ruta 9: dónde cargar combustible, GNC, y cómo planificar la parada si viajás entre Rosario y Córdoba.",
    keywords: "estaciones de servicio Marcos Juárez, nafta Ruta 9, GNC Marcos Juárez, cargar combustible Marcos Juárez",
    image: "/images/gallery2.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Marcos Juárez tiene estaciones de servicio en los accesos y dentro de la ciudad, además de las paradas sobre la Au Ruta Nacional 9, que pasa a unos 3 km del centro. Varias operan en horario extendido para el tránsito de la autopista.",
    body: [
      { type: "p", text: "La ciudad está a unos 3 km del acceso a la Au Ruta Nacional 9, el corredor que une Rosario con Córdoba. Esa cercanía es lo que la convierte en una parada natural para cargar combustible, comer y dormir." },
      { type: "h2", text: "Dónde cargar" },
      { type: "ul", items: [
        "Estaciones sobre los accesos a la ciudad, las más usadas por el tránsito de paso.",
        "Estaciones dentro del casco urbano, prácticas si ya estás alojado.",
        "Paradas de ruta sobre la Au Ruta 9, con horario extendido.",
      ]},
      { type: "h2", text: "Planificar la parada" },
      { type: "p", text: "Si venís manejando desde Rosario (unos 185 km) o desde Córdoba capital (unos 255 km), Marcos Juárez cae a mitad de camino. La combinación habitual es cargar combustible al entrar, cenar en el centro y salir descansado a la mañana siguiente." },
      { type: "h2", text: "Dejar el auto" },
      { type: "p", text: "Coordinamos cochera para los huéspedes que llegan en auto, así no tenés que dejar el vehículo en la calle durante la noche." },
      { type: "quote", text: "Parada segura sobre la Au Ruta 9: cochera y check-in 24 horas. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿A qué distancia está Marcos Juárez de la Ruta 9?", a: "El acceso a la Au Ruta Nacional 9 está a unos 3 km del centro de la ciudad, unos pocos minutos en auto." },
      { q: "¿Hay GNC en Marcos Juárez?", a: "Sí, hay estaciones con expendio de GNC en la ciudad. Conviene verificar el horario de la estación puntual antes de ir." },
      { q: "¿El alojamiento tiene cochera?", a: "Sí, coordinamos cochera para los huéspedes que llegan en auto. Avisanos al reservar para reservar el espacio." },
    ],
    related: ["rutas/alojamiento-ruta-nacional-9", "servicios/cochera", "rutas/dormir-camino-a-cordoba"],
  },
  {
    cluster: "serviciosCiudad",
    slug: "remises-y-taxis",
    title: "Remises y taxis en Marcos Juárez",
    h1: "Remises y taxis en Marcos Juárez",
    description:
      "Cómo moverse en Marcos Juárez sin auto: remises, taxis, traslados desde la terminal de ómnibus y distancias caminables dentro del centro.",
    keywords: "remises Marcos Juárez, taxis Marcos Juárez, como moverse en Marcos Juárez",
    image: "/images/gallery4.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "En Marcos Juárez el transporte urbano se resuelve con remises y taxis, que se piden por teléfono o WhatsApp. El centro es plenamente caminable, así que el remis se usa sobre todo para la terminal, el parque industrial y los accesos.",
    body: [
      { type: "p", text: "Marcos Juárez no tiene una red de transporte público urbano como la de una ciudad grande: el desplazamiento interno se resuelve caminando dentro del centro y con remis o taxi para distancias mayores." },
      { type: "h2", text: "Cuándo vas a necesitar un remis" },
      { type: "ul", items: [
        "Traslado desde o hacia la terminal de ómnibus.",
        "Visitas al parque industrial o a empresas en los accesos.",
        "Salidas nocturnas fuera del casco céntrico.",
        "Traslados con equipaje pesado o en grupo.",
      ]},
      { type: "h2", text: "Cómo se piden" },
      { type: "p", text: "Las agencias de remis trabajan por teléfono y WhatsApp, y hay paradas de taxi en puntos del centro. Si te alojás con nosotros y necesitás un traslado, escribinos y te pasamos el contacto de una agencia activa al momento de tu estadía." },
      { type: "h2", text: "Todo a pie desde el centro" },
      { type: "p", text: "Desde 9 de Julio 262, la plaza principal, los bancos, las farmacias, los supermercados y la zona gastronómica quedan a pocas cuadras. Para la mayoría de las estadías, no vas a necesitar transporte." },
      { type: "quote", text: "Ubicación céntrica: casi todo a pie. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay Uber o Cabify en Marcos Juárez?", a: "No es una ciudad con cobertura de aplicaciones de viaje: el servicio se resuelve con agencias de remis y taxis locales, que se piden por teléfono o WhatsApp." },
      { q: "¿Cómo llego desde la terminal de ómnibus al apart?", a: "La terminal está dentro de la ciudad, a corta distancia del centro: podés llegar en remis o caminando si viajás liviano. Escribinos y te orientamos." },
      { q: "¿Necesito auto para alojarme en el centro?", a: "No. El casco céntrico concentra los servicios y se recorre a pie. Si venís en auto, coordinamos cochera." },
    ],
    related: ["empresas/terminal-de-omnibus", "serviciosCiudad/estaciones-de-servicio", "gastronomia/comer-cerca-de-esmeralda-apart"],
  },
  {
    cluster: "serviciosCiudad",
    slug: "supermercados",
    title: "Supermercados en Marcos Juárez: dónde hacer las compras",
    h1: "Supermercados en Marcos Juárez",
    description:
      "Supermercados, autoservicios y despensas en Marcos Juárez: dónde comprar cerca del centro, horarios habituales y qué conviene comprar si tu alojamiento tiene cocina.",
    keywords: "supermercados Marcos Juárez, donde comprar Marcos Juárez, autoservicio Marcos Juárez",
    image: "/images/equipped.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Marcos Juárez tiene supermercados de cadena regional, autoservicios y despensas de barrio, en su mayoría dentro del casco céntrico. Trabajan en horario comercial con corte de siesta y horario reducido los domingos.",
    body: [
      { type: "p", text: "Si te alojás en un departamento con cocina, el supermercado es la primera parada del viaje. La buena noticia es que en Marcos Juárez la oferta está concentrada en el centro y a pocas cuadras del apart." },
      { type: "h2", text: "Tipos de comercio" },
      { type: "ul", items: [
        "Supermercados de cadena regional, con la góndola más completa.",
        "Autoservicios y minimercados, prácticos para compras chicas.",
        "Despensas y almacenes de barrio, con horarios más flexibles.",
        "Carnicerías, verdulerías y fiambrerías del centro.",
      ]},
      { type: "h2", text: "Horarios" },
      { type: "p", text: "El comercio local mantiene el corte de siesta: cierre al mediodía y reapertura por la tarde. Los domingos el horario es reducido y algunos locales no abren. Si llegás tarde un domingo, conviene resolver la cena por delivery." },
      { type: "h2", text: "Compra base para el departamento" },
      { type: "p", text: "Para una estadía de trabajo de varios días, con café, leche, pan, fruta, algo para el desayuno y una cena simple alcanza. La cocina equipada del apart incluye anafe, microondas, heladera con freezer, vajilla y utensilios." },
      { type: "quote", text: "Cocina equipada y supermercados a pocas cuadras. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay supermercados cerca del centro de Marcos Juárez?", a: "Sí, la mayoría de los supermercados y autoservicios de la ciudad están dentro del casco céntrico, a distancia caminable." },
      { q: "¿Abren los domingos?", a: "Algunos abren con horario reducido y otros permanecen cerrados. Los autoservicios y despensas de barrio suelen tener más disponibilidad." },
      { q: "¿El departamento tiene todo para cocinar?", a: "Sí: heladera con freezer, anafe, microondas, vajilla, utensilios y elementos básicos de cocina." },
    ],
    related: ["servicios/cocina-equipada", "gastronomia/comer-cerca-de-esmeralda-apart", "alojamiento/hospedaje-para-familias"],
  },
  {
    cluster: "serviciosCiudad",
    slug: "tramites-utiles",
    title: "Trámites y servicios útiles en Marcos Juárez",
    h1: "Trámites y servicios útiles en Marcos Juárez",
    description:
      "Dónde hacer trámites en Marcos Juárez: Municipalidad, Tribunales, correo, registro civil y servicios de apoyo para quienes viajan por gestiones administrativas.",
    keywords: "tramites Marcos Juárez, municipalidad Marcos Juárez, registro civil Marcos Juárez, correo Marcos Juárez",
    image: "/images/gallery6.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Marcos Juárez es cabecera departamental: concentra la Municipalidad, los Tribunales, el registro civil, oficinas provinciales y el correo, todos en el casco céntrico y con atención al público en horario de mañana.",
    body: [
      { type: "p", text: "Buena parte de quienes viajan a Marcos Juárez lo hacen por gestiones: audiencias judiciales, trámites municipales, escrituras o presentaciones ante organismos provinciales. Al ser cabecera del departamento, la ciudad concentra esas oficinas." },
      { type: "h2", text: "Dónde se hacen los trámites" },
      { type: "ul", items: [
        "Municipalidad de Marcos Juárez: habilitaciones, tasas y trámites locales.",
        "Tribunales: sede judicial del departamento.",
        "Registro civil: documentación personal y actas.",
        "Correo y oficinas de servicios provinciales, en el centro.",
      ]},
      { type: "h2", text: "Horarios de atención" },
      { type: "p", text: "Las oficinas públicas atienden en horario de mañana de días hábiles. Si venís de otra ciudad por una gestión, llegar la noche anterior evita el riesgo de perder el turno por un imprevisto en la ruta." },
      { type: "h2", text: "Alojarse la noche previa" },
      { type: "p", text: "El check-in digital 24 horas permite llegar a cualquier hora sin coordinar con nadie, y estar a pocas cuadras de las oficinas del centro significa ir caminando a la mañana siguiente. Emitimos factura A o B para rendir el viaje." },
      { type: "quote", text: "Llegá la noche anterior y andá caminando al trámite. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Marcos Juárez es cabecera departamental?", a: "Sí, es la ciudad cabecera del departamento Marcos Juárez, en el sudeste de la provincia de Córdoba, y concentra las oficinas administrativas y judiciales de la zona." },
      { q: "¿En qué horario atienden las oficinas públicas?", a: "En general, en horario de mañana de días hábiles. Conviene confirmar el horario y el sistema de turnos del organismo antes de viajar." },
      { q: "¿Emiten factura para rendir el viaje?", a: "Sí, emitimos factura A o B a nombre de la empresa o del particular, según corresponda." },
    ],
    related: ["empresas/municipalidad", "empresas/tribunales", "servicios/factura-a"],
  },
];
