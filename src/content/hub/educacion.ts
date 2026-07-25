import type { HubEntry } from "./types";

// Editorial rule: no invented institution names, addresses or enrolment data.

export const educacion: HubEntry[] = [
  {
    cluster: "educacion",
    slug: "escuelas-y-colegios",
    title: "Escuelas y colegios en Marcos Juárez",
    h1: "Escuelas y colegios en Marcos Juárez",
    description:
      "Cómo se organiza la educación primaria y secundaria en Marcos Juárez: escuelas públicas y privadas, orientaciones y calendario escolar de la provincia de Córdoba.",
    keywords: "escuelas Marcos Juárez, colegios Marcos Juárez, educacion Marcos Juárez",
    image: "/images/design.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Marcos Juárez concentra escuelas primarias y secundarias de gestión pública y privada, con orientaciones en ciencias sociales, naturales, economía y técnicas agropecuarias, dentro del calendario escolar de la provincia de Córdoba.",
    body: [
      { type: "p", text: "Al ser cabecera departamental, Marcos Juárez recibe estudiantes de localidades vecinas y de la zona rural, sobre todo en el nivel secundario y en las orientaciones técnicas ligadas al perfil agropecuario de la región." },
      { type: "h2", text: "Niveles y gestión" },
      { type: "ul", items: [
        "Nivel inicial y primario, en escuelas públicas provinciales y privadas.",
        "Nivel secundario, con orientaciones humanísticas, científicas, económicas y técnicas.",
        "Escuelas técnicas con perfil agropecuario y de gestión, vinculadas al entorno productivo.",
        "Educación de adultos y modalidades semipresenciales.",
      ]},
      { type: "h2", text: "Calendario escolar" },
      { type: "p", text: "El ciclo lectivo sigue el calendario de la provincia de Córdoba: inicio a fines de febrero o comienzos de marzo, receso de invierno en julio y cierre en diciembre. Los actos, muestras y viajes de egresados se concentran en esas fechas y generan movimiento de familias en la ciudad." },
      { type: "h2", text: "Familias que viajan por la escuela" },
      { type: "p", text: "Actos escolares, mudanzas por cambio de colegio, entrevistas de admisión o acompañar a un hijo que estudia en la ciudad son motivos frecuentes de viaje. Para estadías cortas en familia, el departamento con cocina y cochera resulta más práctico y económico que un hotel." },
      { type: "quote", text: "Departamentos para familias, con cocina equipada y cochera. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay escuelas privadas en Marcos Juárez?", a: "Sí, la ciudad tiene establecimientos de gestión pública y privada en los niveles inicial, primario y secundario." },
      { q: "¿Cuándo empieza el ciclo lectivo?", a: "Sigue el calendario de la provincia de Córdoba: el inicio suele ubicarse entre fines de febrero y los primeros días de marzo." },
      { q: "¿Se puede alojar una familia por unos días?", a: "Sí. Los departamentos tienen cocina equipada y coordinamos cochera, lo que hace más cómoda una estadía familiar corta." },
    ],
    related: ["educacion/institutos-y-universidades", "alojamiento/hospedaje-para-familias", "serviciosCiudad/tramites-utiles"],
  },
  {
    cluster: "educacion",
    slug: "institutos-y-universidades",
    title: "Institutos terciarios y universidades en Marcos Juárez",
    h1: "Institutos terciarios y universidades en Marcos Juárez",
    description:
      "Educación superior en Marcos Juárez: institutos terciarios, carreras cortas, sedes y modalidades a distancia, y opciones cercanas en Córdoba y Rosario.",
    keywords: "institutos terciarios Marcos Juárez, universidades Marcos Juárez, estudiar en Marcos Juárez",
    image: "/images/gallery2.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "La educación superior en Marcos Juárez se apoya en institutos terciarios con carreras de formación docente, técnicas y administrativas, además de sedes y modalidades a distancia de universidades con base en Córdoba y Rosario.",
    body: [
      { type: "p", text: "Muchos estudiantes de la región eligen quedarse cerca de casa para el primer tramo de la formación superior. Marcos Juárez ofrece esa alternativa con institutos terciarios y propuestas a distancia, dejando las carreras largas para Córdoba capital, Rosario o Río Cuarto." },
      { type: "h2", text: "Oferta local" },
      { type: "ul", items: [
        "Institutos de formación docente.",
        "Tecnicaturas vinculadas a administración, salud y producción agropecuaria.",
        "Cursos y capacitaciones de oficios y actualización profesional.",
        "Modalidades a distancia y semipresenciales de universidades nacionales y privadas.",
      ]},
      { type: "h2", text: "Ciudades universitarias cercanas" },
      {
        type: "table",
        headers: ["Ciudad", "Distancia aproximada desde Marcos Juárez"],
        rows: [
          ["Rosario", "185 km"],
          ["Córdoba capital", "255 km"],
          ["Bell Ville", "Menos de 60 km"],
        ],
      },
      { type: "h2", text: "Viajes por examen o inscripción" },
      { type: "p", text: "Exámenes finales, inscripciones y cursillos de ingreso son motivos habituales de estadías cortas. El check-in digital 24 horas resuelve las llegadas de madrugada y el WiFi de fibra permite rendir o cursar online sin cortes." },
      { type: "quote", text: "WiFi de fibra y escritorio en cada departamento. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay universidad en Marcos Juárez?", a: "La oferta local se concentra en institutos terciarios y en modalidades a distancia o sedes de universidades. Las carreras universitarias presenciales largas se cursan principalmente en Córdoba, Rosario o Río Cuarto." },
      { q: "¿Qué distancia hay hasta Córdoba capital?", a: "Aproximadamente 255 km por la Au Ruta Nacional 9. Hasta Rosario son unos 185 km." },
      { q: "¿Sirve el alojamiento para rendir un examen online?", a: "Sí: los departamentos tienen WiFi de fibra óptica, escritorio y ambiente silencioso." },
    ],
    related: ["educacion/alojamiento-para-estudiantes", "servicios/wifi", "rutas/dormir-camino-a-cordoba"],
  },
  {
    cluster: "educacion",
    slug: "academias-y-cursos",
    title: "Academias y cursos en Marcos Juárez",
    h1: "Academias y cursos en Marcos Juárez",
    description:
      "Academias de idiomas, informática, música y capacitaciones profesionales en Marcos Juárez: qué tipo de formación se consigue en la ciudad y para quién sirve.",
    keywords: "academias Marcos Juárez, cursos Marcos Juárez, ingles Marcos Juárez, capacitaciones Marcos Juárez",
    image: "/images/gallery4.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "En Marcos Juárez funcionan academias de idiomas, escuelas de música y danza, centros de informática y espacios de capacitación profesional, con propuestas anuales y cursos cortos orientados al sector agropecuario y comercial.",
    body: [
      { type: "p", text: "Además de la educación formal, la ciudad tiene una red de academias y espacios de formación complementaria que funcionan durante el ciclo lectivo y ofrecen cursos intensivos en verano." },
      { type: "h2", text: "Qué se puede estudiar" },
      { type: "ul", items: [
        "Idiomas, principalmente inglés, con exámenes internacionales.",
        "Música, danza y expresión artística.",
        "Informática y herramientas digitales.",
        "Capacitaciones profesionales y de oficios, muchas vinculadas al agro y al comercio.",
      ]},
      { type: "h2", text: "Capacitaciones empresariales" },
      { type: "p", text: "Las cámaras empresariales y las entidades del sector agropecuario organizan jornadas y capacitaciones que atraen participantes de toda la zona. Suelen concentrarse en una o dos jornadas, con asistentes que llegan la noche anterior." },
      { type: "h2", text: "Alojarse para una capacitación" },
      { type: "p", text: "Para una jornada de capacitación, la estadía típica es de una noche: llegada la tarde previa, jornada completa y salida al final del día. Emitimos factura A o B para que la empresa rinda el gasto." },
      { type: "quote", text: "Una noche, factura A y check-in 24 horas. Consultá disponibilidad en la barra inferior." },
    ],
    faqs: [
      { q: "¿Hay academias de inglés en Marcos Juárez?", a: "Sí, la ciudad cuenta con academias de idiomas que preparan también para exámenes internacionales." },
      { q: "¿Se dictan capacitaciones para empresas?", a: "Sí, es habitual que cámaras y entidades del sector agropecuario organicen jornadas de capacitación en la ciudad." },
      { q: "¿Emiten factura para una capacitación de trabajo?", a: "Sí, emitimos factura A o B a nombre de la empresa." },
    ],
    related: ["educacion/institutos-y-universidades", "eventos/eventos-empresariales", "servicios/factura-a"],
  },
  {
    cluster: "educacion",
    slug: "alojamiento-para-estudiantes",
    title: "Alojamiento para estudiantes en Marcos Juárez",
    h1: "Alojamiento para estudiantes en Marcos Juárez",
    description:
      "Opciones de alojamiento para estudiantes y familias que viajan a Marcos Juárez por exámenes, cursillos, inscripciones o mudanzas, con cocina, WiFi y cochera.",
    keywords: "alojamiento para estudiantes Marcos Juárez, hospedaje estudiantes Marcos Juárez, departamento temporario estudiantes",
    image: "/images/equipped.jpg",
    updatedAt: "2026-07-25",
    snippet:
      "Para estudiantes que viajan a Marcos Juárez por exámenes, inscripciones o cursillos, el departamento temporario con cocina equipada, WiFi de fibra y check-in digital 24 horas es la alternativa más práctica y económica al hotel.",
    body: [
      { type: "p", text: "Las estadías estudiantiles tienen un patrón claro: pocos días, presupuesto ajustado y necesidad de un lugar tranquilo para estudiar. El departamento cubre las tres cosas mejor que una habitación de hotel." },
      { type: "h2", text: "Qué necesita un estudiante de visita" },
      { type: "ul", items: [
        "WiFi de fibra estable para material online y clases o exámenes virtuales.",
        "Escritorio y ambiente silencioso para estudiar.",
        "Cocina equipada, para no gastar en cada comida.",
        "Entrada libre a cualquier hora, sin horario de recepción.",
        "Cochera si el viaje es en auto propio o familiar.",
      ]},
      { type: "h2", text: "Estadías largas" },
      { type: "p", text: "Si la estadía se extiende varias semanas —por un cursillo o un tramo de cursado presencial— escribinos por WhatsApp: trabajamos condiciones especiales para permanencias largas." },
      { type: "h2", text: "Viajar con la familia" },
      { type: "p", text: "Es habitual que un estudiante viaje acompañado por sus padres para una inscripción o entrevista. El departamento permite alojar al grupo en una sola unidad, con cocina y espacios comunes." },
      { type: "quote", text: "Estadías cortas o largas para estudiantes. Escribinos por WhatsApp y te cotizamos." },
    ],
    faqs: [
      { q: "¿Tienen tarifas para estadías largas?", a: "Sí, trabajamos condiciones especiales para permanencias prolongadas. Consultanos por WhatsApp con las fechas concretas." },
      { q: "¿El WiFi sirve para rendir un examen online?", a: "Sí, los departamentos tienen fibra óptica y ambiente silencioso, aptos para exámenes y clases virtuales." },
      { q: "¿Puedo llegar de madrugada después de viajar?", a: "Sí. El acceso es electrónico y personalizado, disponible las 24 horas, sin recepción." },
    ],
    related: ["educacion/institutos-y-universidades", "servicios/check-in-digital", "alojamiento/departamentos-temporarios"],
  },
];
