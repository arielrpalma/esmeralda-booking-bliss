// Persona-based landing configs. Each landing is a target for a specific Ads campaign.

import {
  Briefcase, Trophy, MapPinned, Heart,
  FileText, Wifi, Car, Clock, Users, Coffee, Bed, ShieldCheck, PawPrint, Home, Utensils,
  type LucideIcon,
} from "lucide-react";

export type PersonaKey = "trabajo" | "torneo" | "ruta9" | "familia";

export interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface PersonaFaq {
  q: string;
  a: string;
}

export interface PersonaConfig {
  key: PersonaKey;
  slug: string;            // URL slug under /alojamiento/
  icon: LucideIcon;
  // Selector card copy (home):
  cardTitle: string;
  cardLabel: string;       // "Viajantes", "Equipos", etc.
  cardChips: string[];     // 2 short chips shown on the card
  // Landing copy:
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  whatsappMessage: string; // pre-filled WhatsApp text
  benefits: Benefit[];
  testimonials: Testimonial[];
  faqs: PersonaFaq[];
  // SEO:
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

const WA_PHONE = "5493472433334";

export const personas: Record<PersonaKey, PersonaConfig> = {
  trabajo: {
    key: "trabajo",
    slug: "trabajo",
    icon: Briefcase,
    cardTitle: "Vengo por trabajo",
    cardLabel: "Viajantes y empresas",
    cardChips: ["Factura A/B", "WiFi premium"],
    eyebrow: "Para viajantes y empresas",
    title: "El apart de los viajantes en Marcos Juárez",
    subtitle:
      "Llegás tarde, salís temprano, necesitás factura y WiFi que ande. Acá tenés todo eso, sin recepción ni esperas.",
    heroImage: "/images/gallery2.jpg",
    whatsappMessage:
      "Hola, vengo por trabajo a Marcos Juárez y necesito disponibilidad en Esmeralda Apart. ¿Pueden confirmarme precio y factura?",
    benefits: [
      { icon: FileText, title: "Factura A o B en el momento", text: "Listo para rendir gastos. Empresa o monotributista, sin trámites." },
      { icon: Wifi, title: "WiFi de fibra para Zoom", text: "Banda ancha simétrica para videollamadas y trabajo remoto sin cortes." },
      { icon: Clock, title: "Check-in 24 h sin esperas", text: "Acceso electrónico. Llegás de noche o de madrugada, entrás directo." },
      { icon: Car, title: "Cochera incluida", text: "Estacionamiento privado bajo coordinación. Tu auto seguro toda la estadía." },
    ],
    testimonials: [
      { name: "Federico G.", role: "Viajante comercial · Rosario", quote: "Vengo cada 15 días. Llego a la 1 AM, entro solo, factura en la casilla al toque. Es lo más práctico que encontré." },
      { name: "Marina S.", role: "Gerente de zona · Buenos Aires", quote: "Reservé para todo el equipo. WiFi excelente, cochera asegurada y facturación impecable. Lo recomiendo a colegas." },
    ],
    faqs: [
      { q: "¿Emiten factura A o B?", a: "Sí, factura A o B en el momento, a nombre de la empresa o personal. Sin recargos ni demoras." },
      { q: "¿Hay tarifa corporativa por estadías largas?", a: "Sí. Estadías de 7+ noches o reservas recurrentes tienen tarifa preferencial. Coordinámoslo por WhatsApp." },
      { q: "¿Puedo llegar fuera del horario de check-in?", a: "Sí, el check-in es 24 h con acceso electrónico. Te enviamos las instrucciones antes de llegar." },
      { q: "¿La cochera está garantizada?", a: "La coordinamos previo a tu llegada según disponibilidad. Estacionar frente al Apart también es seguro." },
    ],
    seoTitle: "Apart para viajantes en Marcos Juárez · Factura A/B | Esmeralda Apart",
    seoDescription:
      "Departamentos para viajantes en Marcos Juárez con factura A/B, WiFi de fibra, cochera y check-in 24 h. Tarifa corporativa disponible.",
    keywords: "apart viajantes Marcos Juárez, hotel con factura Marcos Juárez, alojamiento corporativo Marcos Juárez",
  },

  torneo: {
    key: "torneo",
    slug: "torneo",
    icon: Trophy,
    cardTitle: "Vengo a un torneo",
    cardLabel: "Equipos y deportistas",
    cardChips: ["Grupos", "Cochera"],
    eyebrow: "Para equipos y deportistas",
    title: "Tu base para el torneo en Marcos Juárez",
    subtitle:
      "Vienen en grupo, juegan temprano y necesitan descansar bien. Departamentos amplios, cocheras seguras y a minutos de los predios deportivos.",
    heroImage: "/images/gallery3.jpg",
    whatsappMessage:
      "Hola, venimos a un torneo a Marcos Juárez. Somos un grupo y queremos consultar disponibilidad y tarifa.",
    benefits: [
      { icon: Users, title: "Espacios para grupos", text: "Departamentos cómodos para equipos. Coordinamos varias unidades juntas." },
      { icon: Bed, title: "Descanso real entre partidos", text: "Camas premium, blackout, AC frío/calor. Te despertás como nuevo." },
      { icon: Car, title: "Cocheras seguras", text: "Estacionamiento privado para autos y combis. Equipamiento deportivo protegido." },
      { icon: Clock, title: "Check-in y check-out flexibles", text: "Si tu partido es temprano o tarde, lo coordinamos. Sin penalidades absurdas." },
    ],
    testimonials: [
      { name: "DT Equipo Sub-17", role: "Visitante · Liga Cordobesa", quote: "Reservamos para todo el plantel. Cocheras, espacio para hidratación, y descanso real entre partidos. Volvemos seguro." },
      { name: "Lucía P.", role: "Padel amateur · San Francisco", quote: "Vinimos por un torneo de fin de semana. Llegamos viernes a la noche y ya entramos solos. Cómodo y a metros del club." },
    ],
    faqs: [
      { q: "¿Tienen capacidad para todo el equipo?", a: "Sí, coordinamos varias unidades para grupos. Decinos cuántas personas y te armamos la mejor combinación." },
      { q: "¿Hay descuento por reservar varias unidades?", a: "Sí, ofrecemos tarifa grupal para reservas de 2 o más departamentos. Consultanos por WhatsApp." },
      { q: "¿Están cerca de los predios deportivos?", a: "Sí, en el centro de Marcos Juárez, a minutos de los clubes y polideportivos principales." },
      { q: "¿Podemos hacer late check-out el día del partido?", a: "Sí, sujeto a disponibilidad. Avisanos al reservar y lo dejamos coordinado." },
    ],
    seoTitle: "Alojamiento para torneos en Marcos Juárez | Esmeralda Apart",
    seoDescription:
      "Departamentos para equipos y deportistas en torneos en Marcos Juárez. Grupos, cocheras seguras, descanso real y tarifa grupal.",
    keywords: "alojamiento torneo Marcos Juárez, hotel para equipos Marcos Juárez, apart deportistas Marcos Juárez",
  },

  ruta9: {
    key: "ruta9",
    slug: "ruta-9",
    icon: MapPinned,
    cardTitle: "Viajo por Ruta 9",
    cardLabel: "Parada estratégica",
    cardChips: ["1 noche", "24 h"],
    eyebrow: "Parada estratégica · Au Ruta9",
    title: "Tu parada cómoda sobre la Au Ruta9",
    subtitle:
      "A pocos minutos de la autopista. Llegás a la hora que sea, descansás bien y al amanecer seguís viaje. Sin recepción, sin trámites.",
    heroImage: "/images/hero.jpg",
    whatsappMessage:
      "Hola, estoy viajando por la Au Ruta9 y necesito 1 noche en Esmeralda Apart. ¿Tienen disponibilidad?",
    benefits: [
      { icon: MapPinned, title: "A minutos de Au Ruta9", text: "Salís de la autopista y en pocos minutos ya estás descansando." },
      { icon: Clock, title: "Acceso 24 h sin recepción", text: "Llegás a las 3 AM o a las 11 PM, da igual. Entrás solo con tu código." },
      { icon: Car, title: "Estacionamiento seguro", text: "Cochera privada bajo coordinación. Tu auto y carga, tranquilos." },
      { icon: ShieldCheck, title: "Ideal para 1 noche", text: "Tarifa pensada para parada de paso. Sin mínimos de estadía absurdos." },
    ],
    testimonials: [
      { name: "Carlos M.", role: "Camionero · Tucumán-Buenos Aires", quote: "Hago este tramo seguido. Encontré mi parada fija. Llego, duermo, sigo. Sin vueltas." },
      { name: "Familia Ruiz", role: "De vacaciones · Mendoza-Mar del Plata", quote: "Veníamos cansados con los chicos. Llegamos a las 11 de la noche y al toque estábamos descansando. Perfecto para cortar el viaje." },
    ],
    faqs: [
      { q: "¿A qué distancia están de la Au Ruta9?", a: "A pocos minutos del acceso a Marcos Juárez desde la autopista. Te pasamos la ubicación exacta al confirmar." },
      { q: "¿Puedo reservar solo 1 noche?", a: "Sí, especialmente para parada de paso. Sin recargos por estadía corta." },
      { q: "¿Hay alguien si llego de madrugada?", a: "El check-in es 100% electrónico. Recibís un código y entrás solo, a cualquier hora." },
      { q: "¿Dónde dejo el auto?", a: "Coordinamos cochera privada según disponibilidad. Frente al Apart también es zona muy segura." },
    ],
    seoTitle: "Hotel sobre Ruta 9 en Marcos Juárez · Parada 24 h | Esmeralda Apart",
    seoDescription:
      "Departamentos a minutos de la Au Ruta9 en Marcos Juárez. Check-in 24 h, estacionamiento seguro y tarifa para 1 noche. Ideal para parar en el viaje.",
    keywords: "hotel ruta 9 Marcos Juárez, parada ruta 9 Córdoba, alojamiento autopista 9, dormir en Marcos Juárez de paso",
  },

  familia: {
    key: "familia",
    slug: "familia",
    icon: Heart,
    cardTitle: "Visito familia",
    cardLabel: "Estadías cómodas",
    cardChips: ["Pet friendly", "Espacios amplios"],
    eyebrow: "Para visitas familiares",
    title: "Tu departamento cuando venís a visitar familia",
    subtitle:
      "Comodidad, privacidad y libertad. Tu base propia para venir a Marcos Juárez sin invadir a nadie, con la familia cerca y tu mascota incluida.",
    heroImage: "/images/gallery4.jpg",
    whatsappMessage:
      "Hola, vengo a visitar familia a Marcos Juárez y quiero consultar disponibilidad en Esmeralda Apart.",
    benefits: [
      { icon: Home, title: "Tu propio espacio", text: "Independencia total. Vas y venís sin horarios, sin molestar a nadie." },
      { icon: PawPrint, title: "Pet friendly", text: "Tu mascota es parte de la familia. Recibimos mascotas pequeñas previa consulta." },
      { icon: Utensils, title: "Cocina equipada", text: "Heladera, anafe, microondas y vajilla completa. Comés cuando querés." },
      { icon: Coffee, title: "Cómodo y tranquilo", text: "Ambiente silencioso, blackout, AC y todo lo que necesitás para descansar de verdad." },
    ],
    testimonials: [
      { name: "Sofía R.", role: "De visita · Córdoba Capital", quote: "Vengo a ver a mis viejos cada 2 meses. Ya no quiero quedarme en otro lado. Privacidad total y a 5 cuadras de su casa." },
      { name: "Diego y Pau", role: "Visita con perro · Rosario", quote: "Buscábamos algo pet friendly y cómodo. Acá lo encontramos. Volvemos seguro." },
    ],
    faqs: [
      { q: "¿Aceptan mascotas?", a: "Sí, recibimos mascotas pequeñas previa consulta. Avisanos al reservar para coordinar el ingreso." },
      { q: "¿Cuántas personas entran cómodas?", a: "Depende del departamento. Tenemos unidades para 2, 4 y hasta más personas. Consultanos según tu grupo." },
      { q: "¿Está cerca del centro?", a: "Sí, en pleno centro de Marcos Juárez. A pocas cuadras de comercios, restaurantes y zonas residenciales." },
      { q: "¿Puedo recibir visitas?", a: "Sí, dentro del departamento. Pedimos respetar el descanso de los demás huéspedes." },
    ],
    seoTitle: "Departamento para visitar familia en Marcos Juárez · Pet Friendly | Esmeralda Apart",
    seoDescription:
      "Departamentos cómodos y pet friendly para tu visita familiar en Marcos Juárez. Tu propio espacio, cocina equipada y privacidad total.",
    keywords: "departamento para visita familiar Marcos Juárez, alojamiento pet friendly Marcos Juárez, apart familia Córdoba",
  },
};

export const personaList: PersonaConfig[] = [
  personas.trabajo,
  personas.torneo,
  personas.ruta9,
  personas.familia,
];

export const whatsappLink = (message: string) =>
  `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
