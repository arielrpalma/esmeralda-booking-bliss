import {
  Bed,
  MapPin,
  Building2,
  CalendarDays,
  Route,
  Sparkles,
  UtensilsCrossed,
  Trophy,
  GraduationCap,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import type { ClusterConfig, ClusterKey, HubEntry } from "./types";
import { alojamiento } from "./alojamiento";
import { turismo } from "./turismo";
import { gastronomia } from "./gastronomia";
import { empresas } from "./empresas";
import { eventos } from "./eventos";
import { deportes } from "./deportes";
import { educacion } from "./educacion";
import { serviciosCiudad } from "./servicios-ciudad";
import { rutas } from "./rutas";
import { servicios } from "./servicios";

export * from "./types";

export const clusters: ClusterConfig[] = [
  {
    key: "alojamiento",
    slug: "alojamiento",
    name: "Alojamiento",
    title: "Dónde alojarse en Marcos Juárez: guía completa de alojamiento",
    description:
      "Guía completa de alojamiento en Marcos Juárez: apart hotel, departamentos temporarios, hospedaje para empresas, familias, deportistas y viajantes.",
    keywords: "alojamiento en Marcos Juárez, dónde alojarse en Marcos Juárez, apart hotel Marcos Juárez",
    intro:
      "Todo lo que necesitás para elegir dónde dormir en Marcos Juárez según tu motivo de viaje: tipos de alojamiento, precios de referencia, servicios y requisitos.",
    snippet:
      "En Marcos Juárez podés alojarte en apart hoteles, departamentos temporarios, hoteles tradicionales y hostales. Para trabajo conviene un apart con factura A y check-in 24 horas; para familias y grupos, un departamento con cocina equipada y cochera.",
  },
  {
    key: "turismo",
    slug: "turismo",
    name: "Turismo",
    title: "Turismo en Marcos Juárez: qué hacer, ver y dónde comer",
    description:
      "Guía de turismo en Marcos Juárez, Córdoba: qué hacer, lugares para visitar, restaurantes, cafeterías, vida nocturna, parques y compras.",
    keywords: "turismo Marcos Juárez, qué hacer en Marcos Juárez, qué visitar Marcos Juárez Córdoba",
    intro:
      "Actividades, gastronomía y paseos en Marcos Juárez, tanto para un fin de semana como para una escala de una noche en la Ruta 9.",
    snippet:
      "El turismo en Marcos Juárez combina el paseo por el casco histórico y la plaza principal, gastronomía de parrilla y pastas, cafeterías de especialidad, espacios verdes y compras en la zona comercial del centro.",
  },
  {
    key: "gastronomia",
    slug: "gastronomia",
    name: "Gastronomía",
    title: "Gastronomía en Marcos Juárez: dónde comer, parrillas y cafeterías",
    description:
      "Guía gastronómica de Marcos Juárez: parrillas, pizzerías, cafeterías, bares, panaderías y heladerías, con horarios típicos, delivery y qué hay cerca del centro.",
    keywords: "donde comer en Marcos Juárez, gastronomía Marcos Juárez, parrillas Marcos Juárez, restaurantes Marcos Juárez",
    intro:
      "Toda la oferta gastronómica de la ciudad explicada por categoría, con horarios habituales y opciones a distancia caminable del centro.",
    snippet:
      "La gastronomía de Marcos Juárez se concentra en el centro: parrillas con cortes clásicos, pizzerías con delivery, restaurantes de cocina casera, cafeterías para desayuno y merienda, y bares y cervecerías de jueves a sábado.",
  },
  {
    key: "deportes",
    slug: "deportes",
    name: "Deportes",
    title: "Deportes en Marcos Juárez: clubes, canchas y torneos",
    description:
      "Deportes en Marcos Juárez: clubes tradicionales, fútbol, básquet, hockey, pádel, tenis, gimnasios y alojamiento para delegaciones que llegan a un torneo.",
    keywords: "deportes Marcos Juárez, clubes de Marcos Juárez, canchas de padel Marcos Juárez, torneos Marcos Juárez",
    intro:
      "Qué se juega en la ciudad, cómo funcionan los clubes y complejos, y cómo organizar el viaje si llegás con una delegación.",
    snippet:
      "Marcos Juárez tiene clubes tradicionales con fútbol, básquet, hockey, tenis y natación, complejos privados de pádel y una agenda de torneos regionales que llena la ciudad de delegaciones varios fines de semana al año.",
  },
  {
    key: "educacion",
    slug: "educacion",
    name: "Educación",
    title: "Educación en Marcos Juárez: escuelas, institutos y academias",
    description:
      "Educación en Marcos Juárez: escuelas primarias y secundarias, institutos terciarios, universidades a distancia, academias y alojamiento para estudiantes.",
    keywords: "escuelas Marcos Juárez, institutos terciarios Marcos Juárez, universidades Marcos Juárez, estudiar en Marcos Juárez",
    intro:
      "Cómo se organiza la oferta educativa de la ciudad, desde el nivel inicial hasta la formación superior y las capacitaciones profesionales.",
    snippet:
      "Marcos Juárez concentra escuelas públicas y privadas de todos los niveles, institutos terciarios con carreras docentes y técnicas, propuestas universitarias a distancia y academias de idiomas, música e informática.",
  },
  {
    key: "servicios-en-marcos-juarez",
    slug: "servicios-en-marcos-juarez",
    name: "Servicios de la ciudad",
    title: "Servicios en Marcos Juárez: salud, bancos, farmacias y transporte",
    description:
      "Servicios esenciales de Marcos Juárez: hospital y clínicas, farmacias de turno, bancos y cajeros, estaciones de servicio, remises, supermercados y trámites.",
    keywords: "servicios Marcos Juárez, farmacia de turno Marcos Juárez, cajeros Marcos Juárez, remises Marcos Juárez",
    intro:
      "Todo lo práctico que necesitás resolver estando de viaje: salud, dinero, combustible, transporte, compras y trámites.",
    snippet:
      "Los servicios esenciales de Marcos Juárez están concentrados en el casco céntrico: el Hospital Abel Ayerza, farmacias con sistema de turno rotativo, bancos con cajeros de las redes Link y Banelco, supermercados, remises y estaciones de servicio.",
  },
  {
    key: "empresas",
    slug: "empresas",
    name: "Empresas e instituciones",
    title: "Empresas e instituciones de Marcos Juárez: fichas y distancias",
    description:
      "Fichas de las principales empresas e instituciones de Marcos Juárez con ubicación, mapa, distancia y tiempo desde Esmeralda Apart.",
    keywords: "empresas Marcos Juárez, instituciones Marcos Juárez, INTA Marcos Juárez, hospital Marcos Juárez",
    intro:
      "Cada ficha incluye descripción, mapa, distancia en kilómetros, tiempo en auto y caminando desde el apart, y acceso directo a la reserva.",
    snippet:
      "Las principales empresas e instituciones de Marcos Juárez incluyen el parque industrial, acopios y molinos de la zona, la estación experimental del INTA, el Hospital Abel Ayerza, la Municipalidad, los Tribunales y la zona bancaria del centro.",
  },
  {
    key: "eventos",
    slug: "eventos",
    name: "Eventos",
    title: "Eventos en Marcos Juárez: expo, ferias y torneos deportivos",
    description:
      "Eventos permanentes de Marcos Juárez: Expo Marcos Juárez, ferias, exposiciones, torneos deportivos y eventos empresariales, con alojamiento.",
    keywords: "eventos Marcos Juárez, Expo Marcos Juárez, torneos deportivos Marcos Juárez, ferias Marcos Juárez",
    intro:
      "Las fechas de expo, feria o torneo son los picos de ocupación del año. Acá te contamos qué esperar de cada evento y cómo asegurar tu alojamiento.",
    snippet:
      "Marcos Juárez concentra su agenda en la Expo Marcos Juárez, ferias agropecuarias y comerciales, exposiciones rurales, torneos deportivos de clubes y eventos empresariales. En esas fechas el alojamiento se agota y conviene reservar directo con anticipación.",
  },
  {
    key: "rutas",
    slug: "rutas",
    name: "Rutas y viajes",
    title: "Alojamiento en la Ruta 9: dormir camino a Córdoba o Rosario",
    description:
      "Guía de paradas sobre la Ruta Nacional 9: dormir camino a Córdoba o Rosario, distancias, tiempos y alojamiento con check-in 24 horas.",
    keywords: "alojamiento Ruta Nacional 9, dormir camino a Córdoba, dormir camino a Rosario, parada Ruta 9",
    intro:
      "Marcos Juárez está a 3 km del acceso a la Au Ruta 9, a mitad de camino entre Rosario y Córdoba: la parada natural para no manejar cansado.",
    snippet:
      "Marcos Juárez es una de las mejores paradas de la Au Ruta Nacional 9: está a 3 km del acceso, a 185 km de Rosario y 255 km de Córdoba capital, con alojamiento de check-in digital 24 horas y cochera.",
  },
  {
    key: "servicios",
    slug: "servicios",
    name: "Servicios",
    title: "Servicios del alojamiento: factura A, cochera, check-in 24 h y más",
    description:
      "Servicios de Esmeralda Apart en Marcos Juárez: factura A, cochera, check-in digital 24 h, WiFi de fibra, cocina equipada, aire, Smart TV y seguridad.",
    keywords: "alojamiento con factura A, alojamiento con cochera Marcos Juárez, check in digital 24 horas",
    intro:
      "Cada servicio explicado en detalle, con lo que incluye y por qué importa según tu tipo de viaje.",
    snippet:
      "Esmeralda Apart incluye factura A o B, cochera coordinada, check-in digital 24 horas, WiFi de fibra óptica, cocina equipada, aire acondicionado frío/calor, Smart TV con streaming y acceso electrónico personalizado.",
  },
];

export const clusterIcons: Record<ClusterKey, LucideIcon> = {
  alojamiento: Bed,
  turismo: MapPin,
  gastronomia: UtensilsCrossed,
  empresas: Building2,
  eventos: CalendarDays,
  deportes: Trophy,
  educacion: GraduationCap,
  "servicios-en-marcos-juarez": LifeBuoy,
  rutas: Route,
  servicios: Sparkles,
};

export const hubEntries: HubEntry[] = [
  ...alojamiento,
  ...turismo,
  ...gastronomia,
  ...empresas,
  ...eventos,
  ...deportes,
  ...educacion,
  ...serviciosCiudad,
  ...rutas,
  ...servicios,
];

export const getCluster = (slug: string) => clusters.find((c) => c.slug === slug);

export const getEntriesByCluster = (key: ClusterKey) =>
  hubEntries.filter((e) => e.cluster === key);

export const getEntry = (cluster: string, slug: string) =>
  hubEntries.find((e) => e.cluster === cluster && e.slug === slug);

export const getEntryByRef = (ref: string) => {
  const [cluster, slug] = ref.split("/");
  return getEntry(cluster, slug);
};

export const entryPath = (e: HubEntry) => `/${e.cluster}/${e.slug}`;
