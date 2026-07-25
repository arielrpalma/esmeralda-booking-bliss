import type { HubEntry } from "./types";

const IMG = "/images/hero.jpg";

export const rutas: HubEntry[] = [
  {
    cluster: "rutas",
    slug: "alojamiento-ruta-nacional-9",
    title: "Alojamiento sobre la Ruta Nacional 9 en Marcos Juárez",
    h1: "Alojamiento sobre la Ruta Nacional 9",
    description:
      "Alojamiento a minutos de la Au Ruta Nacional 9 en Marcos Juárez: parada segura entre Rosario y Córdoba con check-in 24 h, cochera y cocina equipada.",
    keywords: "alojamiento Ruta Nacional 9, dormir en Ruta 9, alojamiento autopista Rosario Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Marcos Juárez está a pocos minutos de la Au Ruta Nacional 9, a mitad de camino entre Rosario y Córdoba. Esmeralda Apart es una parada segura sobre el corredor: check-in digital 24 horas, cochera, cocina equipada y salida rápida a la autopista.",
    body: [
      { type: "p", text: "La Au Ruta 9 es el eje que une Buenos Aires, Rosario y Córdoba. Cortar el viaje a mitad de camino reduce el riesgo de manejar cansado y permite retomar temprano al otro día." },
      { type: "h2", text: "Distancias sobre el corredor" },
      {
        type: "table",
        headers: ["Origen / destino", "Distancia aprox.", "Tiempo en auto"],
        rows: [
          ["Rosario", "185 km", "1 h 50 min"],
          ["Córdoba capital", "255 km", "2 h 40 min"],
          ["Buenos Aires", "485 km", "5 h"],
          ["Acceso a la autopista", "3 km", "6 min"],
        ],
      },
      { type: "h2", text: "Por qué funciona como parada" },
      { type: "ul", items: [
        "Ingreso a cualquier hora con código digital.",
        "Cochera para dejar el auto cargado sin preocupaciones.",
        "Cocina equipada para cenar aunque llegues tarde.",
        "Salida rápida a la autopista al otro día.",
      ]},
      { type: "quote", text: "Cortá el viaje en Marcos Juárez: consultá disponibilidad y reservá directo." },
    ],
    faqs: [
      { q: "¿Dónde dormir sobre la Ruta 9?", a: "Marcos Juárez es una de las mejores paradas del corredor: está a 3 km del acceso a la autopista, a mitad de camino entre Rosario y Córdoba." },
      { q: "¿Puedo llegar de madrugada?", a: "Sí. El check-in es digital y funciona las 24 horas, sin recepción." },
    ],
    related: ["rutas/dormir-camino-a-cordoba", "rutas/dormir-camino-a-rosario", "servicios/cochera"],
    relatedPosts: ["donde-dormir-cerca-de-la-ruta-9-en-cordoba"],
  },
  {
    cluster: "rutas",
    slug: "dormir-camino-a-cordoba",
    title: "Dormir camino a Córdoba: parada en Marcos Juárez",
    h1: "Dormir camino a Córdoba",
    description:
      "Vas camino a Córdoba por la Ruta 9: parada para dormir en Marcos Juárez con check-in 24 h, cochera y salida rápida a la autopista.",
    keywords: "dormir camino a Córdoba, parada Ruta 9 hacia Córdoba, alojamiento camino a Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Si viajás hacia Córdoba por la Ruta 9, Marcos Juárez queda a unos 255 km de la capital: cerca de 2 horas y 40 minutos. Es la última gran parada con servicios antes de Bell Ville, con alojamiento de acceso 24 horas.",
    body: [
      { type: "p", text: "Salir de Buenos Aires o Rosario por la tarde y llegar de noche a Córdoba obliga a manejar cansado. Dormir en Marcos Juárez parte el viaje en dos tramos cómodos." },
      { type: "h2", text: "Cómo planificar el tramo" },
      { type: "ol", items: [
        "Llegá a Marcos Juárez a la hora que sea y entrá con tu código.",
        "Cená en el departamento o pedí delivery.",
        "Salí temprano: estás a 6 minutos de la autopista.",
        "Llegás a Córdoba descansado y sin manejar de noche.",
      ]},
      { type: "quote", text: "Reservá tu parada camino a Córdoba: mejor precio reservando directo." },
    ],
    faqs: [
      { q: "¿A cuántas horas está Marcos Juárez de Córdoba capital?", a: "A unos 255 km, cerca de 2 horas y 40 minutos por la Au Ruta 9." },
      { q: "¿Hay dónde cenar si llego tarde?", a: "Sí, hay delivery hasta tarde y el departamento cuenta con cocina equipada." },
    ],
    related: ["rutas/alojamiento-ruta-nacional-9", "rutas/donde-descansar-viajando-por-ruta-9", "turismo/restaurantes-recomendados"],
  },
  {
    cluster: "rutas",
    slug: "dormir-camino-a-rosario",
    title: "Dormir camino a Rosario: parada en Marcos Juárez",
    h1: "Dormir camino a Rosario",
    description:
      "Parada para dormir camino a Rosario por la Ruta 9: Marcos Juárez a 185 km, con acceso 24 horas, cochera y cocina equipada.",
    keywords: "dormir camino a Rosario, parada Ruta 9 Rosario, alojamiento camino a Rosario",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Marcos Juárez está a unos 185 km de Rosario, alrededor de 1 hora y 50 minutos por la Au Ruta 9. Es una parada práctica para quienes bajan de Córdoba y quieren llegar a Rosario temprano y descansados.",
    body: [
      { type: "p", text: "El tramo Córdoba–Rosario es largo para hacerlo de un tirón después de una jornada de trabajo. Dividirlo en Marcos Juárez permite llegar a Rosario a primera hora." },
      { type: "h2", text: "Referencias del tramo" },
      {
        type: "table",
        headers: ["Tramo", "Distancia", "Tiempo"],
        rows: [
          ["Marcos Juárez - Rosario", "185 km", "1 h 50 min"],
          ["Marcos Juárez - Cruz Alta", "35 km", "30 min"],
          ["Marcos Juárez - acceso autopista", "3 km", "6 min"],
        ],
      },
      { type: "quote", text: "Programá tu parada camino a Rosario y reservá directo desde la barra de disponibilidad." },
    ],
    faqs: [
      { q: "¿Cuánto se tarda de Marcos Juárez a Rosario?", a: "Cerca de 1 hora y 50 minutos, unos 185 km por la Au Ruta 9." },
      { q: "¿Puedo dejar el auto seguro durante la noche?", a: "Sí, coordinamos cochera al momento de la reserva." },
    ],
    related: ["rutas/alojamiento-ruta-nacional-9", "rutas/dormir-camino-a-cordoba", "servicios/seguridad"],
  },
  {
    cluster: "rutas",
    slug: "donde-descansar-viajando-por-ruta-9",
    title: "Dónde descansar viajando por la Ruta 9",
    h1: "Dónde descansar viajando por la Ruta 9",
    description:
      "Guía práctica para descansar viajando por la Ruta 9: cada cuántas horas parar, qué buscar en una parada nocturna y por qué elegir Marcos Juárez.",
    keywords: "dónde descansar Ruta 9, paradas seguras Ruta 9, descansar viaje Rosario Córdoba",
    image: IMG,
    updatedAt: "2026-07-01",
    snippet:
      "Se recomienda parar cada dos horas de manejo y dormir si el viaje supera las cinco. Sobre la Ruta 9, Marcos Juárez ofrece servicios, gastronomía y alojamiento con acceso digital 24 horas a solo 3 km de la autopista.",
    body: [
      { type: "p", text: "Manejar cansado es una de las principales causas de siniestros en rutas argentinas. Planificar la parada es tan importante como planificar el combustible." },
      { type: "h2", text: "Reglas simples para un viaje largo" },
      { type: "ul", items: [
        "Pará cada 2 horas para estirar las piernas.",
        "Si el viaje supera las 5 horas, dormí en el camino.",
        "Evitá el tramo entre las 2 y las 5 de la mañana.",
        "Elegí una parada con cochera y acceso a cualquier hora.",
      ]},
      { type: "h2", text: "Qué buscar en una parada nocturna" },
      {
        type: "table",
        headers: ["Requisito", "Por qué"],
        rows: [
          ["Check-in 24 h", "Nunca sabés a qué hora vas a llegar"],
          ["Cochera", "Vehículo cargado con equipaje"],
          ["Cocina o delivery", "Comer sin volver a manejar"],
          ["Cerca del acceso", "Salir rápido al día siguiente"],
        ],
      },
      { type: "quote", text: "Planificá tu descanso: consultá disponibilidad en Marcos Juárez y reservá directo." },
    ],
    faqs: [
      { q: "¿Cada cuánto conviene parar en la ruta?", a: "Cada dos horas para descansar y estirar las piernas; si el viaje supera las cinco horas, lo más seguro es dormir en el camino." },
      { q: "¿Cuál es una buena parada entre Rosario y Córdoba?", a: "Marcos Juárez: está a 3 km del acceso a la Au Ruta 9, con servicios abiertos hasta tarde y alojamiento con acceso digital 24 horas." },
    ],
    related: ["rutas/alojamiento-ruta-nacional-9", "servicios/check-in-digital", "alojamiento/hospedaje-para-viajantes"],
    relatedPosts: ["donde-dormir-cerca-de-la-ruta-9-en-cordoba"],
  },
];
