import type { HubEntry } from "./types";

const IMG = "/images/equipped.jpg";

export const servicios: HubEntry[] = [
  {
    cluster: "servicios",
    slug: "factura-a",
    title: "Alojamiento con factura A en Marcos Juárez",
    h1: "Factura A y B para empresas",
    description:
      "Alojamiento en Marcos Juárez con factura A o B a nombre de la empresa: cómo pedirla, qué datos necesitamos y facturación mensual para convenios.",
    keywords: "alojamiento con factura A Marcos Juárez, factura A hotel, alojamiento corporativo factura",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Esmeralda Apart emite factura A o B a nombre de la empresa por cada estadía en Marcos Juárez. Solo hace falta CUIT, razón social y condición frente al IVA al momento de reservar; en convenios corporativos se factura de forma mensual consolidada.",
    body: [
      { type: "p", text: "Para un viajante o un técnico, el comprobante es tan importante como la cama: sin factura A no hay rendición de gastos ni crédito fiscal." },
      { type: "h2", text: "Datos que necesitamos" },
      { type: "ul", items: ["Razón social", "CUIT", "Condición frente al IVA", "Domicilio fiscal", "Correo para enviar el comprobante"] },
      { type: "h2", text: "Formas de pago" },
      { type: "ul", items: ["Transferencia bancaria", "Débito y crédito", "Efectivo", "Cuenta corriente en convenios corporativos"] },
      { type: "quote", text: "Pedí tu factura A al reservar: escribinos por WhatsApp con los datos fiscales de la empresa." },
    ],
    faqs: [
      { q: "¿Emiten factura A?", a: "Sí, emitimos factura A o B a nombre de la empresa con todos los datos fiscales necesarios para rendir el gasto." },
      { q: "¿Se puede facturar todo el mes junto?", a: "Sí, en convenios corporativos consolidamos la facturación mensual." },
    ],
    related: ["alojamiento/mejor-alojamiento-para-empresas", "alojamiento/hospedaje-para-viajantes", "empresas/parque-industrial"],
  },
  {
    cluster: "servicios",
    slug: "cochera",
    title: "Alojamiento con cochera en Marcos Juárez",
    h1: "Cochera para tu vehículo",
    description:
      "Alojamiento con cochera en Marcos Juárez: estacionamiento coordinado para autos, camionetas y combis, ideal para viajantes y delegaciones.",
    keywords: "alojamiento con cochera Marcos Juárez, estacionamiento Marcos Juárez, hotel con cochera Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Esmeralda Apart cuenta con cochera coordinada previamente para autos, camionetas y vehículos de trabajo. Es clave si viajás con herramientas, muestras o equipaje y no querés dejar el vehículo en la calle.",
    body: [
      { type: "p", text: "El estacionamiento es uno de los factores que más pesa a la hora de elegir alojamiento en una ciudad del interior, sobre todo si el vehículo lleva mercadería o equipos." },
      { type: "h2", text: "Cómo funciona" },
      { type: "ol", items: [
        "Avisanos al reservar el tipo de vehículo.",
        "Confirmamos disponibilidad de cochera para esas fechas.",
        "Recibís las indicaciones de acceso junto con tu código digital.",
      ]},
      { type: "quote", text: "Reservá con cochera: indicá tu vehículo al confirmar la estadía." },
    ],
    faqs: [
      { q: "¿Tienen cochera?", a: "Sí, contamos con cochera coordinada previamente. Avisanos el tipo de vehículo al reservar." },
      { q: "¿Entra una camioneta o combi?", a: "En la mayoría de los casos sí; para combis o trafic conviene confirmarlo por WhatsApp antes de viajar." },
    ],
    related: ["alojamiento/hospedaje-para-deportistas", "rutas/alojamiento-ruta-nacional-9", "servicios/seguridad"],
  },
  {
    cluster: "servicios",
    slug: "check-in-digital",
    title: "Check-in digital 24 horas en Marcos Juárez",
    h1: "Check-in digital 24 horas",
    description:
      "Cómo funciona el check-in digital 24 horas de Esmeralda Apart: código de acceso, ingreso sin recepción y llegada a cualquier hora.",
    keywords: "check in digital Marcos Juárez, check in 24 horas, alojamiento sin recepción",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "El check-in digital permite entrar al departamento con un código enviado antes de la llegada, sin recepción ni llaves. Funciona las 24 horas, así que podés ingresar de madrugada después de un viaje largo o un partido.",
    body: [
      { type: "p", text: "Es el servicio que más valoran los huéspedes: nadie quiere avisar a qué hora llega ni esperar a que abran una recepción." },
      { type: "h2", text: "Paso a paso" },
      { type: "ol", items: [
        "Reservás y confirmás la estadía.",
        "Recibís por WhatsApp la dirección y el código de acceso.",
        "Ingresás por la puerta principal a la hora que quieras.",
        "Al salir, dejás la unidad y listo: sin trámites.",
      ]},
      { type: "quote", text: "Llegá cuando quieras: reservá directo y recibí tu código de acceso." },
    ],
    faqs: [
      { q: "¿Se puede hacer check-in a cualquier hora?", a: "Sí, el ingreso es con código digital y funciona las 24 horas, todos los días del año." },
      { q: "¿Hay recepción?", a: "No hace falta: el acceso es electrónico y te acompañamos por WhatsApp ante cualquier consulta." },
    ],
    related: ["rutas/donde-descansar-viajando-por-ruta-9", "empresas/terminal-de-omnibus", "alojamiento/apart-hotel"],
    relatedPosts: ["alojamiento-con-check-in-automatico-24-horas"],
  },
  {
    cluster: "servicios",
    slug: "wifi",
    title: "WiFi de fibra óptica para trabajar en Marcos Juárez",
    h1: "WiFi de fibra óptica",
    description:
      "Alojamiento con WiFi de fibra óptica en Marcos Juárez: conexión estable para videollamadas, trabajo remoto y streaming en todas las unidades.",
    keywords: "alojamiento con wifi Marcos Juárez, wifi fibra óptica departamento, trabajo remoto Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Todas las unidades de Esmeralda Apart cuentan con WiFi de fibra óptica, apto para videollamadas, subir archivos pesados y ver streaming. Es una de las razones por las que empresas eligen el apart para estadías de trabajo.",
    body: [
      { type: "p", text: "Una conexión inestable arruina una jornada de trabajo remoto. Por eso la fibra óptica es un requisito y no un extra." },
      { type: "h2", text: "Para trabajar cómodo" },
      { type: "ul", items: ["Fibra óptica en todas las unidades", "Espacio de trabajo y buena iluminación", "Ambientes silenciosos", "Smart TV para compartir pantalla"] },
      { type: "quote", text: "Trabajás desde el departamento: reservá directo y aprovechá el WiFi de fibra." },
    ],
    faqs: [
      { q: "¿El WiFi sirve para videollamadas?", a: "Sí, la conexión es de fibra óptica y soporta videollamadas, streaming y transferencia de archivos." },
      { q: "¿Hay escritorio para trabajar?", a: "Sí, las unidades cuentan con superficie de trabajo y buena iluminación." },
    ],
    related: ["alojamiento/mejor-alojamiento-para-empresas", "turismo/cafeterias", "eventos/eventos-empresariales"],
  },
  {
    cluster: "servicios",
    slug: "cocina-equipada",
    title: "Departamentos con cocina equipada en Marcos Juárez",
    h1: "Cocina equipada",
    description:
      "Departamentos con cocina equipada en Marcos Juárez: heladera, anafe, microondas, vajilla y todo para cocinar durante tu estadía.",
    keywords: "departamento con cocina equipada Marcos Juárez, alojamiento con cocina, apart con cocina Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Las unidades de Esmeralda Apart incluyen cocina equipada con heladera, anafe, microondas, pava eléctrica, vajilla y utensilios. Permite ahorrar en comidas y resolver la cena aunque llegues de madrugada.",
    body: [
      { type: "p", text: "Poder cocinar cambia la economía del viaje: un desayuno y una cena en el departamento reducen sensiblemente el gasto diario, sobre todo en estadías largas o en familia." },
      { type: "h2", text: "Qué incluye" },
      { type: "ul", items: ["Heladera con freezer", "Anafe y microondas", "Pava eléctrica y cafetera", "Vajilla, ollas y utensilios", "Vajilla para todos los huéspedes"] },
      { type: "quote", text: "Reservá un departamento con cocina equipada y organizá tu estadía a tu ritmo." },
    ],
    faqs: [
      { q: "¿La cocina está equipada?", a: "Sí, incluye heladera, anafe, microondas, pava eléctrica, vajilla y utensilios de cocina." },
      { q: "¿Se puede cocinar de noche?", a: "Sí, el departamento es de uso exclusivo y no tiene restricciones horarias." },
    ],
    related: ["alojamiento/hospedaje-para-familias", "turismo/compras", "alojamiento/departamentos-temporarios"],
  },
  {
    cluster: "servicios",
    slug: "aire-acondicionado",
    title: "Departamentos con aire acondicionado frío/calor en Marcos Juárez",
    h1: "Aire acondicionado frío/calor",
    description:
      "Departamentos con aire acondicionado frío/calor en Marcos Juárez: confort en verano e invierno en todas las unidades del apart.",
    keywords: "departamento con aire acondicionado Marcos Juárez, alojamiento climatizado Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Todas las unidades de Esmeralda Apart tienen aire acondicionado frío/calor. En Marcos Juárez el verano supera con frecuencia los 35 °C y el invierno baja de 0 °C, por lo que la climatización es indispensable.",
    body: [
      { type: "p", text: "El clima del sudeste cordobés es continental: veranos calurosos y húmedos, inviernos fríos con heladas. La climatización eficiente define la calidad del descanso." },
      { type: "h2", text: "Clima de referencia" },
      {
        type: "table",
        headers: ["Temporada", "Temperatura típica", "Recomendación"],
        rows: [
          ["Verano (dic-feb)", "20 a 35 °C", "Aire frío y persianas bajas de día"],
          ["Otoño / primavera", "12 a 26 °C", "Ventilación natural"],
          ["Invierno (jun-ago)", "0 a 16 °C", "Aire caliente y ropa de cama abrigada"],
        ],
      },
      { type: "quote", text: "Reservá una unidad climatizada todo el año: consultá disponibilidad y reservá directo." },
    ],
    faqs: [
      { q: "¿Las unidades tienen aire acondicionado?", a: "Sí, todas cuentan con aire acondicionado frío/calor." },
      { q: "¿Hace mucho calor en Marcos Juárez?", a: "En verano se superan con frecuencia los 35 °C, por eso todas las unidades están climatizadas." },
    ],
    related: ["alojamiento/apart-hotel", "servicios/smart-tv", "alojamiento/hospedaje-para-familias"],
  },
  {
    cluster: "servicios",
    slug: "smart-tv",
    title: "Departamentos con Smart TV y streaming en Marcos Juárez",
    h1: "Smart TV con streaming",
    description:
      "Departamentos con Smart TV y streaming en Marcos Juárez: mirá series, deportes o compartí pantalla desde tu notebook durante la estadía.",
    keywords: "departamento con smart tv Marcos Juárez, alojamiento con streaming, apart con netflix",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Las unidades de Esmeralda Apart incluyen Smart TV con acceso a plataformas de streaming y conexión al WiFi de fibra, para ver series, partidos o compartir pantalla desde la notebook.",
    body: [
      { type: "p", text: "Después de un día de reuniones o de ruta, la mejor parte de un departamento es poder desconectar como en casa." },
      { type: "h2", text: "Cómo usarla" },
      { type: "ul", items: [
        "Iniciá sesión con tus propias cuentas de streaming.",
        "Compartí pantalla desde el celular o la notebook.",
        "Cerrá sesión antes del check-out para proteger tus datos.",
      ]},
      { type: "quote", text: "Reservá directo y disfrutá tu estadía como en casa." },
    ],
    faqs: [
      { q: "¿Las unidades tienen Smart TV?", a: "Sí, con acceso a plataformas de streaming y conexión al WiFi de fibra del apart." },
      { q: "¿Puedo usar mis cuentas de streaming?", a: "Sí, podés iniciar sesión con tus cuentas y cerrarlas antes de salir." },
    ],
    related: ["servicios/wifi", "servicios/aire-acondicionado", "alojamiento/hospedaje-para-familias"],
  },
  {
    cluster: "servicios",
    slug: "seguridad",
    title: "Seguridad y acceso controlado en el alojamiento",
    h1: "Seguridad y acceso controlado",
    description:
      "Alojamiento seguro en Marcos Juárez: acceso electrónico personalizado, edificio con puerta principal controlada y cochera para tu vehículo.",
    keywords: "alojamiento seguro Marcos Juárez, acceso controlado departamento, seguridad apart Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "El acceso a Esmeralda Apart es electrónico y personalizado: cada huésped recibe un código propio válido solo durante su estadía. El edificio tiene puerta principal controlada y cochera para el vehículo.",
    body: [
      { type: "p", text: "La seguridad de un alojamiento sin recepción se basa en el control del acceso: códigos individuales, con vigencia limitada y sin llaves físicas que puedan copiarse o perderse." },
      { type: "h2", text: "Cómo protegemos tu estadía" },
      { type: "ul", items: [
        "Código de acceso único por reserva, válido solo durante la estadía.",
        "Puerta principal del edificio con cierre controlado.",
        "Cochera para el vehículo, sin dejarlo en la calle.",
        "Soporte por WhatsApp durante todo el alojamiento.",
        "Zona céntrica, transitada y bien iluminada.",
      ]},
      { type: "quote", text: "Reservá con tranquilidad: acceso personalizado y soporte por WhatsApp durante toda tu estadía." },
    ],
    faqs: [
      { q: "¿Es seguro un alojamiento sin recepción?", a: "Sí: el acceso es con código individual válido solo durante tu estadía, el edificio tiene puerta controlada y contás con soporte por WhatsApp las 24 horas." },
      { q: "¿Dónde dejo el auto?", a: "En la cochera coordinada al momento de la reserva." },
    ],
    related: ["servicios/check-in-digital", "servicios/cochera", "alojamiento/hospedaje-para-familias"],
  },
];
