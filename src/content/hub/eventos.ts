import type { HubEntry } from "./types";

const IMG = "/images/gallery6.jpg";

export const eventos: HubEntry[] = [
  {
    cluster: "eventos",
    slug: "expo-marcos-juarez",
    title: "Expo Marcos Juárez: alojamiento y cómo organizar tu visita",
    h1: "Expo Marcos Juárez",
    description:
      "Todo sobre la Expo Marcos Juárez: qué es, cuándo se realiza, cómo llegar y dónde alojarse con check-in 24 h y factura A durante el evento.",
    keywords: "Expo Marcos Juárez, exposición Marcos Juárez, alojamiento Expo Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "La Expo Marcos Juárez es la muestra agroindustrial y comercial de la ciudad, con stands de maquinaria, servicios y comercios de la región. En días de expo el alojamiento se agota, por lo que conviene reservar directo con anticipación.",
    body: [
      { type: "p", text: "Las exposiciones agroindustriales son el gran momento comercial del año en el sudeste cordobés: llegan expositores, proveedores y visitantes de varias provincias." },
      { type: "h2", text: "Cómo organizar tu visita" },
      { type: "ol", items: [
        "Reservá el alojamiento en cuanto se confirmen las fechas.",
        "Si sos expositor, pedí factura A al confirmar la estadía.",
        "Usá el check-in digital para llegar la noche anterior al armado.",
        "Coordiná cochera si viajás con mercadería o materiales de stand.",
      ]},
      { type: "quote", text: "Días de expo: la disponibilidad se agota. Consultá fechas en la barra inferior y reservá directo." },
    ],
    faqs: [
      { q: "¿Dónde alojarse durante la Expo Marcos Juárez?", a: "En el centro de la ciudad, para moverte con rapidez al predio. Esmeralda Apart ofrece check-in 24 horas, cochera y factura A o B." },
      { q: "¿Con cuánta anticipación conviene reservar?", a: "Cuanto antes: en semanas de exposición o ferias la ocupación de la ciudad llega a su máximo." },
    ],
    related: ["eventos/ferias", "eventos/eventos-empresariales", "alojamiento/mejor-alojamiento-para-empresas"],
  },
  {
    cluster: "eventos",
    slug: "torneos-deportivos",
    title: "Torneos deportivos en Marcos Juárez: alojamiento para delegaciones",
    h1: "Torneos deportivos en Marcos Juárez",
    description:
      "Torneos de fútbol, básquet, vóley y hockey en Marcos Juárez: alojamiento para delegaciones con check-in 24 h, cochera para combis y tarifas por grupo.",
    keywords: "torneos deportivos Marcos Juárez, alojamiento delegaciones Marcos Juárez, torneo fútbol Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Marcos Juárez organiza torneos de fútbol, básquet, vóley y hockey durante todo el año en sus clubes. Las delegaciones necesitan ingresar de madrugada, estacionar la combi y cocinar: Esmeralda Apart resuelve las tres cosas con tarifas por grupo.",
    body: [
      { type: "p", text: "Los clubes locales son el motor social de la ciudad y reciben delegaciones de toda la región. Los fines de semana de torneo la ocupación hotelera se dispara." },
      { type: "h2", text: "Checklist para delegaciones" },
      { type: "ul", items: [
        "Varias unidades en el mismo edificio para todo el equipo.",
        "Acceso electrónico 24 horas: llegada de madrugada sin problemas.",
        "Cochera para combi o trafic.",
        "Cocina equipada para el desayuno pre-partido.",
      ]},
      { type: "quote", text: "Escribinos por WhatsApp con fechas y cantidad de deportistas: armamos el bloque de unidades." },
    ],
    faqs: [
      { q: "¿Aceptan delegaciones deportivas?", a: "Sí, reservamos varias unidades en simultáneo con tarifa por bloque y accesos digitales para todo el equipo." },
      { q: "¿Se puede llegar de madrugada por un torneo?", a: "Sí, el check-in es digital y funciona las 24 horas." },
    ],
    related: ["alojamiento/hospedaje-para-deportistas", "servicios/cochera", "servicios/check-in-digital"],
  },
  {
    cluster: "eventos",
    slug: "ferias",
    title: "Ferias en Marcos Juárez: calendario y alojamiento",
    h1: "Ferias en Marcos Juárez",
    description:
      "Ferias agropecuarias, comerciales y de emprendedores en Marcos Juárez: cuándo se hacen, dónde y cómo reservar alojamiento con anticipación.",
    keywords: "ferias Marcos Juárez, feria agropecuaria Marcos Juárez, eventos Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "En Marcos Juárez se realizan ferias agropecuarias, comerciales y de emprendedores, muchas en el predio de la Sociedad Rural. Coinciden con picos de ocupación del alojamiento, por lo que conviene reservar directo con semanas de anticipación.",
    body: [
      { type: "p", text: "Las ferias combinan negocio y encuentro social. Para expositores implican dos o tres días de estadía, armado de stand y traslado de materiales." },
      { type: "h2", text: "Qué necesita un expositor" },
      {
        type: "table",
        headers: ["Necesidad", "Solución"],
        rows: [
          ["Llegar la noche anterior", "Check-in digital 24 horas"],
          ["Trasladar materiales", "Cochera coordinada"],
          ["Rendir el gasto", "Factura A o B"],
          ["Estadía de varios días", "Tarifa semanal"],
        ],
      },
      { type: "quote", text: "Sos expositor: reservá directo, pedí factura A y coordiná la cochera por WhatsApp." },
    ],
    faqs: [
      { q: "¿Dónde se hacen las ferias en Marcos Juárez?", a: "Principalmente en el predio de la Sociedad Rural y en espacios del centro de la ciudad." },
      { q: "¿Conviene reservar antes de una feria?", a: "Sí, la ocupación crece mucho en esas fechas y las mejores unidades se agotan primero." },
    ],
    related: ["eventos/expo-marcos-juarez", "eventos/exposiciones", "empresas/molinos"],
  },
  {
    cluster: "eventos",
    slug: "exposiciones",
    title: "Exposiciones y muestras en Marcos Juárez",
    h1: "Exposiciones en Marcos Juárez",
    description:
      "Exposiciones rurales, muestras de maquinaria y eventos culturales en Marcos Juárez: qué esperar y dónde alojarse durante el evento.",
    keywords: "exposiciones Marcos Juárez, muestra rural Marcos Juárez, eventos culturales Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Las exposiciones de Marcos Juárez incluyen muestras rurales, presentaciones de maquinaria agrícola y eventos culturales. Se concentran en el predio de la Sociedad Rural y en el centro, ambos a minutos del alojamiento.",
    body: [
      { type: "p", text: "Entre septiembre y marzo se concentra la mayor parte de la agenda de exposiciones de la región, con jornadas técnicas y muestras que atraen público de varias provincias." },
      { type: "h2", text: "Cómo aprovechar el viaje" },
      { type: "ul", items: [
        "Sumá una noche extra y conocé el centro y la gastronomía local.",
        "Si vas con familia, elegí un departamento con ambientes separados.",
        "Coordiná el check-in digital si el evento termina tarde.",
      ]},
      { type: "quote", text: "Quedate una noche más: consultá disponibilidad y reservá directo sin comisiones." },
    ],
    faqs: [
      { q: "¿Cuándo hay exposiciones en Marcos Juárez?", a: "La agenda más intensa va de septiembre a marzo, con muestras rurales, jornadas técnicas y eventos culturales." },
      { q: "¿Hay alojamiento cerca del predio?", a: "Sí, desde el centro se llega en pocos minutos en auto." },
    ],
    related: ["eventos/ferias", "turismo/que-hacer-en-marcos-juarez", "alojamiento/hospedaje-para-familias"],
  },
  {
    cluster: "eventos",
    slug: "eventos-empresariales",
    title: "Eventos empresariales en Marcos Juárez: capacitaciones y reuniones",
    h1: "Eventos empresariales en Marcos Juárez",
    description:
      "Capacitaciones, lanzamientos y reuniones corporativas en Marcos Juárez: alojamiento para equipos con factura A, WiFi de fibra y check-in 24 h.",
    keywords: "eventos empresariales Marcos Juárez, capacitaciones Marcos Juárez, alojamiento corporativo Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Marcos Juárez recibe capacitaciones, lanzamientos de producto y reuniones regionales de empresas del agro. Para equipos de 4 a 10 personas conviene reservar varias unidades con factura A, WiFi de fibra y check-in digital 24 horas.",
    body: [
      { type: "p", text: "La ciudad es punto de encuentro natural para equipos comerciales que cubren el sudeste de Córdoba y el sur de Santa Fe: está sobre la autopista y a mitad de camino entre Rosario y Córdoba." },
      { type: "h2", text: "Para organizadores" },
      { type: "ol", items: [
        "Contanos cuántas personas viajan y las fechas.",
        "Reservamos el bloque de unidades necesario.",
        "Emitimos una factura A consolidada por el evento.",
        "Cada participante recibe su código de acceso digital.",
      ]},
      { type: "quote", text: "Organizás una capacitación: escribinos por WhatsApp y armamos el bloque con una sola factura." },
    ],
    faqs: [
      { q: "¿Pueden alojar a un equipo completo?", a: "Sí, reservamos varias unidades en simultáneo con facturación consolidada a nombre de la empresa." },
      { q: "¿El WiFi soporta videollamadas?", a: "Sí, todas las unidades tienen fibra óptica, apta para reuniones virtuales y streaming." },
    ],
    related: ["alojamiento/mejor-alojamiento-para-empresas", "servicios/wifi", "empresas/parque-industrial"],
  },
];
