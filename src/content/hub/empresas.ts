import type { HubEntry } from "./types";

// Company / institution pages: description + map + distance from the apart + booking CTA.
// Distances are approximate references measured from 9 de Julio 262, Marcos Juárez.

const IMG = "/images/gallery4.jpg";

export const empresas: HubEntry[] = [
  {
    cluster: "empresas",
    slug: "agd-aceitera-general-deheza",
    title: "AGD (Aceitera General Deheza): alojamiento para proveedores y visitas",
    h1: "AGD — Aceitera General Deheza",
    description:
      "Ficha de AGD (Aceitera General Deheza) para quienes viajan por trabajo al sudeste de Córdoba: ubicación, distancias y alojamiento con factura A en Marcos Juárez.",
    keywords: "AGD Aceitera General Deheza, alojamiento proveedores AGD, hospedaje trabajo agroindustria Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "AGD (Aceitera General Deheza) es una de las mayores agroindustriales del país, con sede en General Deheza y acopios y plantas distribuidos por Córdoba. Quienes visitan la zona del sudeste cordobés suelen alojarse en Marcos Juárez, sobre la Au Ruta 9, con factura A y check-in 24 horas.",
    body: [
      { type: "p", text: "AGD procesa oleaginosas y produce aceites, biodiésel y alimentos. Su casa central está en General Deheza (Córdoba) y opera acopios, plantas y oficinas comerciales en toda la provincia, por lo que recibe proveedores, transportistas y técnicos durante todo el año." },
      { type: "h2", text: "Por qué alojarse en Marcos Juárez" },
      { type: "ul", items: [
        "Nudo de la Au Ruta 9: conexión directa hacia Córdoba y Rosario.",
        "Factura A para rendir el gasto de viaje.",
        "Check-in digital 24 horas: llegás cuando termina la jornada.",
        "Cochera coordinada para camioneta o vehículo de empresa.",
      ]},
      { type: "quote", text: "Confirmá la dirección exacta de la planta o acopio con tu contacto en la empresa y reservá tu alojamiento directo con nosotros." },
    ],
    faqs: [
      { q: "¿Dónde está AGD?", a: "Su casa central está en General Deheza, Córdoba, y cuenta con plantas, acopios y oficinas en distintas localidades de la provincia." },
      { q: "¿Dónde alojarse si visito la zona por trabajo?", a: "Marcos Juárez es una base cómoda sobre la Au Ruta 9. Esmeralda Apart ofrece factura A o B, cochera y check-in digital 24 horas." },
    ],
    place: {
      address: "General Deheza, Córdoba (casa central)",
      mapQuery: "Aceitera General Deheza, General Deheza, Córdoba",
      distanceKm: "215 km aprox.",
      driveMinutes: "2 h 20 min aprox.",
      walkMinutes: "No aplica",
    },
    related: ["alojamiento/mejor-alojamiento-para-empresas", "servicios/factura-a", "empresas/parque-industrial"],
  },
  {
    cluster: "empresas",
    slug: "bunge",
    title: "Bunge Argentina: alojamiento para visitas de trabajo en la zona",
    h1: "Bunge Argentina",
    description:
      "Ficha de Bunge Argentina para viajes de trabajo al sudeste de Córdoba: perfil de la empresa, cómo moverse y alojamiento con factura A en Marcos Juárez.",
    keywords: "Bunge Argentina, alojamiento proveedores Bunge, hospedaje agroindustria Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Bunge Argentina opera plantas de crushing, acopios y terminales portuarias en el corredor agroindustrial de Córdoba y Santa Fe. Marcos Juárez, sobre la Au Ruta 9, funciona como base de alojamiento para proveedores y técnicos que recorren la zona.",
    body: [
      { type: "p", text: "Bunge es una de las principales exportadoras de granos y derivados del país. Sus operaciones en el corredor Rosario–Córdoba generan un flujo permanente de proveedores, transportistas y personal técnico." },
      { type: "h2", text: "Marcos Juárez como base logística" },
      {
        type: "table",
        headers: ["Destino", "Distancia aprox.", "Tiempo en auto"],
        rows: [
          ["Rosario (zona portuaria)", "185 km", "1 h 50 min"],
          ["Córdoba capital", "255 km", "2 h 40 min"],
          ["Bell Ville", "55 km", "40 min"],
          ["Leones", "25 km", "20 min"],
        ],
      },
      { type: "quote", text: "Reservá directo tu estadía en Marcos Juárez con factura A y cochera para el vehículo de la empresa." },
    ],
    faqs: [
      { q: "¿Conviene alojarse en Marcos Juárez para visitar plantas de la zona?", a: "Sí: está sobre la autopista Ruta 9 y a menos de una hora de las principales localidades del sudeste cordobés." },
      { q: "¿Emiten factura A para empresas?", a: "Sí, emitimos factura A o B a nombre de la empresa." },
    ],
    place: {
      address: "Operaciones en el corredor Rosario–Córdoba",
      mapQuery: "Bunge Argentina",
      distanceKm: "Según planta",
      driveMinutes: "Según planta",
      walkMinutes: "No aplica",
    },
    related: ["alojamiento/hospedaje-para-viajantes", "rutas/alojamiento-ruta-nacional-9", "servicios/cochera"],
  },
  {
    cluster: "empresas",
    slug: "molinos",
    title: "Molinos y acopios de granos: alojamiento para proveedores",
    h1: "Molinos y acopios de granos",
    description:
      "Molinos, acopios y cooperativas del sudeste de Córdoba: qué son, cuándo se intensifica la actividad y dónde alojarse en Marcos Juárez con factura A.",
    keywords: "molinos Marcos Juárez, acopios de granos Marcos Juárez, cooperativas agropecuarias Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Marcos Juárez y su región concentran molinos, acopios y cooperativas agropecuarias que multiplican su actividad durante la cosecha de trigo, maíz y soja. En esos períodos el alojamiento se ocupa rápido y conviene reservar directo con anticipación.",
    body: [
      { type: "p", text: "La cadena de granos define el pulso de la ciudad: acopios, plantas de acondicionamiento, molinos y cooperativas reciben transportistas, ingenieros agrónomos y personal técnico durante toda la campaña." },
      { type: "h2", text: "Calendario de campaña" },
      {
        type: "table",
        headers: ["Cultivo", "Cosecha", "Demanda de alojamiento"],
        rows: [
          ["Trigo", "Noviembre - diciembre", "Alta"],
          ["Maíz temprano", "Marzo - abril", "Alta"],
          ["Soja", "Abril - mayo", "Muy alta"],
          ["Maíz tardío", "Julio - agosto", "Media"],
        ],
      },
      { type: "quote", text: "En plena campaña el alojamiento se agota: consultá disponibilidad y reservá directo con anticipación." },
    ],
    faqs: [
      { q: "¿Cuándo se llena el alojamiento en Marcos Juárez?", a: "Durante las cosechas de trigo (noviembre-diciembre), maíz (marzo-abril) y soja (abril-mayo), además de los fines de semana con eventos deportivos o ferias." },
      { q: "¿Hacen tarifas para estadías largas de campaña?", a: "Sí, tenemos tarifas semanales y mensuales con factura A para empresas del sector." },
    ],
    place: {
      address: "Acopios y plantas en Marcos Juárez y la región",
      mapQuery: "acopio de granos Marcos Juárez Córdoba",
      distanceKm: "3 a 8 km",
      driveMinutes: "5 a 12 min",
      walkMinutes: "No recomendado",
    },
    related: ["alojamiento/mejor-alojamiento-para-empresas", "empresas/inta-marcos-juarez", "eventos/ferias"],
  },
  {
    cluster: "empresas",
    slug: "inta-marcos-juarez",
    title: "INTA Marcos Juárez: ubicación, distancia y alojamiento cerca",
    h1: "INTA Estación Experimental Marcos Juárez",
    description:
      "INTA Marcos Juárez: qué hace la estación experimental, cómo llegar, distancia desde el centro y alojamiento con factura A para jornadas y capacitaciones.",
    keywords: "INTA Marcos Juárez, estación experimental INTA Marcos Juárez, alojamiento cerca del INTA",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "La Estación Experimental Agropecuaria INTA Marcos Juárez es uno de los centros de investigación agrícola más importantes del país. Está a pocos kilómetros del centro de la ciudad, unos 10 minutos en auto desde Esmeralda Apart.",
    body: [
      { type: "p", text: "El INTA Marcos Juárez desarrolla investigación en trigo, soja, maíz, suelos y manejo de cultivos, y organiza jornadas técnicas y capacitaciones que convocan a productores, asesores y estudiantes de todo el país." },
      { type: "h2", text: "Para quienes asisten a jornadas técnicas" },
      { type: "ul", items: [
        "Alojamiento en el centro, a pocos minutos en auto de la estación experimental.",
        "Check-in digital 24 horas: llegás la noche anterior sin depender de una recepción.",
        "Factura A o B para rendir la capacitación como gasto.",
        "Cochera para el vehículo y WiFi de fibra para trabajar.",
      ]},
      { type: "quote", text: "Vas a una jornada del INTA: reservá directo y llegá la noche anterior sin apuros." },
    ],
    faqs: [
      { q: "¿Dónde está el INTA de Marcos Juárez?", a: "La Estación Experimental Agropecuaria está en las afueras de la ciudad, a pocos kilómetros del centro, con acceso rápido en auto." },
      { q: "¿Hay alojamiento cerca del INTA Marcos Juárez?", a: "Sí. Esmeralda Apart está en el centro, a unos 10 minutos en auto, con cochera, WiFi de fibra y check-in 24 horas." },
    ],
    place: {
      address: "Estación Experimental Agropecuaria INTA, Marcos Juárez, Córdoba",
      mapQuery: "INTA Estación Experimental Marcos Juárez",
      distanceKm: "6 km aprox.",
      driveMinutes: "10 min aprox.",
      walkMinutes: "No recomendado",
    },
    related: ["empresas/molinos", "eventos/ferias", "alojamiento/mejor-alojamiento-para-empresas"],
  },
  {
    cluster: "empresas",
    slug: "hospital-abel-ayerza",
    title: "Hospital Abel Ayerza: alojamiento cerca para acompañantes",
    h1: "Hospital Abel Ayerza (Marcos Juárez)",
    description:
      "Hospital Abel Ayerza de Marcos Juárez: ubicación, distancia caminando desde el centro y alojamiento para familiares y acompañantes de pacientes.",
    keywords: "Hospital Abel Ayerza Marcos Juárez, alojamiento cerca del hospital Marcos Juárez, hospedaje acompañantes",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "El Hospital Abel Ayerza es el principal centro de salud pública de Marcos Juárez y atiende a toda la región. Está a pocas cuadras del centro, por lo que familiares y acompañantes pueden alojarse en Esmeralda Apart y llegar caminando.",
    body: [
      { type: "p", text: "Muchas familias de la región viajan a Marcos Juárez por estudios, cirugías o internaciones. En esos casos el alojamiento cumple una función distinta: necesitás cocina, descanso real y poder entrar y salir a cualquier hora." },
      { type: "h2", text: "Pensado para acompañantes" },
      { type: "ul", items: [
        "Ubicación céntrica: se llega caminando en pocos minutos.",
        "Cocina equipada para preparar comidas y respetar dietas.",
        "Check-in y salida flexibles según la evolución del tratamiento.",
        "Estadías largas con tarifa semanal o mensual.",
        "Silencio y ambientes separados para descansar de verdad.",
      ]},
      { type: "quote", text: "Si necesitás acompañar una internación, escribinos por WhatsApp: coordinamos tarifas por estadía prolongada." },
    ],
    faqs: [
      { q: "¿Hay alojamiento cerca del Hospital Abel Ayerza?", a: "Sí. Esmeralda Apart está en el centro de Marcos Juárez, a pocos minutos caminando del hospital." },
      { q: "¿Se puede alquilar por varios días para acompañar a un paciente?", a: "Sí, ofrecemos tarifas por estadía prolongada y horarios de ingreso y salida flexibles." },
    ],
    place: {
      address: "Hospital Abel Ayerza, Marcos Juárez, Córdoba",
      mapQuery: "Hospital Abel Ayerza Marcos Juárez",
      distanceKm: "1,2 km aprox.",
      driveMinutes: "3 min aprox.",
      walkMinutes: "15 min aprox.",
    },
    related: ["servicios/cocina-equipada", "alojamiento/departamentos-temporarios", "empresas/municipalidad"],
  },
  {
    cluster: "empresas",
    slug: "municipalidad",
    title: "Municipalidad de Marcos Juárez: trámites y alojamiento cerca",
    h1: "Municipalidad de Marcos Juárez",
    description:
      "Municipalidad de Marcos Juárez: ubicación en el centro, horarios de atención al público y alojamiento a metros para quienes vienen a hacer trámites.",
    keywords: "Municipalidad de Marcos Juárez, trámites Marcos Juárez, alojamiento centro Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "La Municipalidad de Marcos Juárez está en el centro de la ciudad, frente a la zona institucional, y atiende al público en horario de mañana. Esmeralda Apart queda a pocas cuadras, así que los trámites se hacen caminando.",
    body: [
      { type: "p", text: "El área institucional de la ciudad —municipio, tribunales, bancos y oficinas públicas— está concentrada en pocas cuadras. Si venís a resolver trámites, alojarte en el centro te ahorra tiempo y estacionamiento." },
      { type: "h2", text: "Consejos para el día de trámites" },
      { type: "ol", items: [
        "La atención al público suele ser de mañana: llegá la noche anterior.",
        "Aprovechá el check-in digital 24 horas para entrar a cualquier hora.",
        "Dejá el auto en la cochera y movete caminando por el centro.",
        "Si necesitás comprobante fiscal, pedí factura A o B al reservar.",
      ]},
      { type: "quote", text: "Llegá la noche anterior y resolvé todo caminando: reservá directo en la barra de disponibilidad." },
    ],
    faqs: [
      { q: "¿Dónde queda la Municipalidad de Marcos Juárez?", a: "En el área institucional del centro de la ciudad, a pocas cuadras del alojamiento." },
      { q: "¿Conviene alojarse en el centro para hacer trámites?", a: "Sí: municipio, tribunales y bancos están concentrados en pocas cuadras y se recorren caminando." },
    ],
    place: {
      address: "Municipalidad de Marcos Juárez, Córdoba",
      mapQuery: "Municipalidad de Marcos Juárez",
      distanceKm: "600 m aprox.",
      driveMinutes: "2 min aprox.",
      walkMinutes: "8 min aprox.",
    },
    related: ["empresas/tribunales", "empresas/bancos", "servicios/check-in-digital"],
  },
  {
    cluster: "empresas",
    slug: "tribunales",
    title: "Tribunales de Marcos Juárez: alojamiento para audiencias",
    h1: "Tribunales de Marcos Juárez",
    description:
      "Tribunales de Marcos Juárez, cabecera judicial del departamento: ubicación céntrica, distancia caminando y alojamiento con factura A para abogados y partes.",
    keywords: "Tribunales Marcos Juárez, juzgado Marcos Juárez, alojamiento abogados Marcos Juárez",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Marcos Juárez es cabecera judicial del departamento y su sede de Tribunales recibe audiencias de toda la región. Está en el centro, a pocas cuadras de Esmeralda Apart, con alojamiento que emite factura A y permite ingresar a cualquier hora.",
    body: [
      { type: "p", text: "Abogados, peritos y partes viajan a Marcos Juárez por audiencias que suelen fijarse temprano. Llegar la noche anterior es la forma más segura de no depender de la ruta ni del clima." },
      { type: "h2", text: "Para profesionales del derecho" },
      { type: "ul", items: [
        "A pocas cuadras caminando de la sede judicial.",
        "Factura A para rendir el gasto profesional.",
        "WiFi de fibra y escritorio para revisar el expediente.",
        "Check-in digital 24 horas y cochera coordinada.",
      ]},
      { type: "quote", text: "Audiencia temprano: llegá la noche anterior y reservá directo con factura A." },
    ],
    faqs: [
      { q: "¿Hay alojamiento cerca de Tribunales en Marcos Juárez?", a: "Sí. Esmeralda Apart está en el centro, a pocos minutos caminando de la sede judicial." },
      { q: "¿Emiten factura A para profesionales?", a: "Sí, emitimos factura A o B con los datos fiscales que necesites." },
    ],
    place: {
      address: "Tribunales de Marcos Juárez, Córdoba",
      mapQuery: "Tribunales Marcos Juárez Córdoba",
      distanceKm: "800 m aprox.",
      driveMinutes: "3 min aprox.",
      walkMinutes: "10 min aprox.",
    },
    related: ["empresas/municipalidad", "servicios/factura-a", "servicios/wifi"],
  },
  {
    cluster: "empresas",
    slug: "bancos",
    title: "Bancos en Marcos Juárez: horarios y ubicación",
    h1: "Bancos en Marcos Juárez",
    description:
      "Bancos y cajeros automáticos en Marcos Juárez: horarios de atención, ubicación en el centro y alojamiento a metros para resolver gestiones bancarias.",
    keywords: "bancos Marcos Juárez, cajeros automáticos Marcos Juárez, horario bancos Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Los bancos de Marcos Juárez están en el centro y atienden de lunes a viernes de 8 a 13. Los cajeros automáticos funcionan las 24 horas. Esmeralda Apart está a pocas cuadras de la zona bancaria.",
    body: [
      { type: "p", text: "La actividad bancaria de la ciudad se concentra en pocas cuadras del microcentro, junto a las oficinas públicas y los principales comercios." },
      { type: "h2", text: "Horarios y disponibilidad" },
      {
        type: "table",
        headers: ["Servicio", "Horario", "Nota"],
        rows: [
          ["Atención en sucursal", "Lunes a viernes 8 - 13", "Feriados cerrado"],
          ["Cajeros automáticos", "24 horas", "Conviene retirar temprano los fines de semana"],
          ["Pagos y cobranzas", "8 - 13 y algunos comercios hasta 20", "Rapipago / Pago Fácil"],
        ],
      },
      { type: "quote", text: "Alojate en el centro y resolvé tus gestiones caminando: consultá disponibilidad y reservá directo." },
    ],
    faqs: [
      { q: "¿Qué horario tienen los bancos en Marcos Juárez?", a: "Atienden al público de lunes a viernes de 8 a 13. Los cajeros automáticos están disponibles las 24 horas." },
      { q: "¿Hay cajeros cerca del alojamiento?", a: "Sí, la zona bancaria está a pocas cuadras del apart, en el microcentro." },
    ],
    place: {
      address: "Zona bancaria, centro de Marcos Juárez",
      mapQuery: "bancos centro Marcos Juárez Córdoba",
      distanceKm: "500 m aprox.",
      driveMinutes: "2 min aprox.",
      walkMinutes: "7 min aprox.",
    },
    related: ["turismo/compras", "empresas/municipalidad", "alojamiento/departamentos-temporarios"],
  },
  {
    cluster: "empresas",
    slug: "parque-industrial",
    title: "Parque Industrial de Marcos Juárez: alojamiento cerca",
    h1: "Parque Industrial de Marcos Juárez",
    description:
      "Parque Industrial de Marcos Juárez: perfil productivo, accesos desde la Ruta 9 y alojamiento con factura A y cochera para técnicos y proveedores.",
    keywords: "parque industrial Marcos Juárez, empresas Marcos Juárez, alojamiento industrial Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "El Parque Industrial de Marcos Juárez reúne metalúrgicas, empresas de maquinaria agrícola, logística y servicios. Está a pocos minutos en auto del centro, donde Esmeralda Apart ofrece factura A, cochera y check-in digital 24 horas.",
    body: [
      { type: "p", text: "El polo industrial local combina metalmecánica, agropartes, logística y servicios para el agro. Recibe visitas técnicas, capacitaciones e instalaciones de equipos durante todo el año." },
      { type: "h2", text: "Accesos y tiempos" },
      {
        type: "table",
        headers: ["Desde", "Distancia aprox.", "Tiempo en auto"],
        rows: [
          ["Esmeralda Apart (centro)", "4 km", "8 min"],
          ["Acceso Au Ruta 9", "3 km", "6 min"],
          ["Terminal de ómnibus", "3,5 km", "7 min"],
        ],
      },
      { type: "quote", text: "Instalación o visita técnica en el parque industrial: reservá directo con factura A y cochera." },
    ],
    faqs: [
      { q: "¿A qué distancia está el parque industrial del centro?", a: "A unos 4 kilómetros, cerca de 8 minutos en auto desde el alojamiento." },
      { q: "¿Tienen cochera para vehículos de trabajo?", a: "Sí, coordinamos cochera para camionetas y vehículos con herramientas o equipos." },
    ],
    place: {
      address: "Parque Industrial, Marcos Juárez, Córdoba",
      mapQuery: "Parque Industrial Marcos Juárez Córdoba",
      distanceKm: "4 km aprox.",
      driveMinutes: "8 min aprox.",
      walkMinutes: "No recomendado",
    },
    related: ["alojamiento/mejor-alojamiento-para-empresas", "servicios/cochera", "eventos/eventos-empresariales"],
  },
  {
    cluster: "empresas",
    slug: "terminal-de-omnibus",
    title: "Terminal de ómnibus de Marcos Juárez: alojamiento cerca",
    h1: "Terminal de ómnibus de Marcos Juárez",
    description:
      "Terminal de ómnibus de Marcos Juárez: ubicación, cómo llegar al centro y alojamiento con check-in 24 horas para quienes llegan de noche.",
    keywords: "terminal de omnibus Marcos Juárez, colectivos Marcos Juárez, alojamiento cerca terminal",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "La terminal de ómnibus de Marcos Juárez conecta con Rosario, Córdoba, Buenos Aires y las localidades de la región. Está a pocos minutos del centro y Esmeralda Apart permite ingresar a cualquier hora con check-in digital, ideal si tu micro llega de madrugada.",
    body: [
      { type: "p", text: "Buena parte de los micros de larga distancia pasa por Marcos Juárez de noche o de madrugada. Ese es justamente el problema que resuelve un alojamiento con acceso electrónico: no hay horario límite para llegar." },
      { type: "h2", text: "Si llegás sin auto" },
      { type: "ul", items: [
        "Remises y aplicaciones de traslado disponibles en la terminal.",
        "El centro está a pocos minutos: casi todo se resuelve caminando.",
        "Cocina equipada para no depender de horarios de restaurantes.",
        "Código de acceso enviado antes de tu llegada.",
      ]},
      { type: "quote", text: "Tu micro llega de madrugada: reservá directo y entrá con tu código digital a la hora que sea." },
    ],
    faqs: [
      { q: "¿Puedo hacer check-in si llego de madrugada en micro?", a: "Sí, el ingreso es con código digital y funciona las 24 horas, sin recepción." },
      { q: "¿Está lejos la terminal del centro?", a: "No, está a pocos minutos en auto o remis del alojamiento." },
    ],
    place: {
      address: "Terminal de ómnibus, Marcos Juárez, Córdoba",
      mapQuery: "Terminal de omnibus Marcos Juárez",
      distanceKm: "2 km aprox.",
      driveMinutes: "5 min aprox.",
      walkMinutes: "25 min aprox.",
    },
    related: ["servicios/check-in-digital", "rutas/alojamiento-ruta-nacional-9", "turismo/que-hacer-en-marcos-juarez"],
  },
];
