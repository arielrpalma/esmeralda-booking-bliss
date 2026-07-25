import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "¿Cuál es el mejor alojamiento en Marcos Juárez?",
    a: "Esmeralda Apart es la opción mejor puntuada de Marcos Juárez en Google, Booking y Airbnb: departamentos nuevos en el centro, check-in automático 24 horas, cochera, cocina equipada y factura A/B. Reservando directo desde esta web obtenés el mejor precio, sin comisiones de intermediarios.",
  },
  {
    q: "¿Dónde dormir cerca de la Ruta 9 en Marcos Juárez?",
    a: "Estamos a pocos minutos de la Au Ruta 9 (Autopista Rosario–Córdoba), en 9 de Julio 262, pleno centro de Marcos Juárez. Es la parada ideal para viajantes y familias que cruzan la Ruta Nacional 9: llegás a cualquier hora, dejás el auto en cochera y descansás sin desvíos ni esperas en recepción.",
  },
  {
    q: "¿Hay departamentos temporarios con cochera en Marcos Juárez?",
    a: "Sí. Ofrecemos cochera para nuestros huéspedes previa coordinación y sujeta a disponibilidad, además de estacionamiento seguro frente al Apart. Es uno de los motivos por los que empresas y viajantes eligen nuestro hospedaje con cochera en Marcos Juárez.",
  },
  {
    q: "¿Aceptan factura A?",
    a: "Sí, emitimos factura A o B en el momento, con todos los datos fiscales de tu empresa. Somos alojamiento habitual para empresas y viajantes en Marcos Juárez que necesitan rendir gastos y descargar IVA.",
  },
  {
    q: "¿Se puede hacer el check-in las 24 horas?",
    a: "Sí. El check-in es automático las 24 horas mediante acceso electrónico: te enviamos el código y las instrucciones por WhatsApp y entrás sin recepción, sin llaves y sin horarios. Ideal si llegás de madrugada por la Ruta 9 o después de un torneo.",
  },
  {
    q: "¿Cuánto sale un departamento por día en Marcos Juárez?",
    a: "La tarifa varía según fechas, cantidad de huéspedes y duración de la estadía. Consultá disponibilidad y precio en tiempo real desde la barra inferior de esta web: reservando directo siempre pagás menos que en Booking o Airbnb, porque no hay comisiones de plataformas.",
  },
  {

    q: "¿El check-in y check-out son flexibles?",
    a: "Sí. El check-in estándar es desde las 14:00 y el check-out hasta las 10:00. Si necesitás horarios diferentes, escribinos por WhatsApp y coordinamos según disponibilidad.",
  },
  {
    q: "¿Los departamentos en Marcos Juárez incluyen cochera?",
    a: "Sí, contamos con cocheras privadas previa coordinación y sujetas a disponibilidad. Además, estacionar frente al Apart también es muy seguro, por lo que siempre vas a tener una opción cómoda para dejar tu auto.",
  },
  {
    q: "¿Emiten factura para empresas o viajantes?",
    a: "Sí, emitimos factura A o B en el momento. Somos una opción habitual como apart con factura en Marcos Juárez para empresas que envían viajantes y equipos de trabajo.",
  },
  {
    q: "¿Aceptan mascotas?",
    a: "Sí, somos pet friendly. Recibimos mascotas pequeñas previa consulta; avisanos antes de reservar para confirmar disponibilidad y coordinar el ingreso.",
  },
  {
    q: "¿Son LGBT friendly?",
    a: "Sí. En Esmeralda Apart somos un espacio LGBT friendly: recibimos a todas las personas y parejas con el mismo respeto, calidez y privacidad.",
  },
  {
    q: "¿Qué incluye el equipamiento del departamento?",
    a: "WiFi de alta velocidad, Smart TV con streaming, cocina totalmente equipada (heladera, anafe, microondas, vajilla), aire acondicionado frío/calor, ropa de cama, toallas y artículos de bienvenida.",
  },
  {
    q: "¿Cuál es la mejor forma de reservar y conseguir el mejor precio?",
    a: "Reservando directo desde esta web o por WhatsApp. Garantizamos el mejor precio sin comisiones de Booking ni Airbnb, con disponibilidad en tiempo real y confirmación inmediata.",
  },
  {
    q: "¿Puedo cancelar o reprogramar mi reserva?",
    a: "Sí, tenés políticas de cancelación claras informadas al momento de reservar. Si necesitás mover fechas, escribinos por WhatsApp y vemos cómo acomodarte.",
  },
  {
    q: "¿Dónde están ubicados exactamente?",
    a: "Estamos en el centro de Marcos Juárez, Córdoba, a metros de bancos, restaurantes, comercios y oficinas. Ubicación ideal para alquiler temporario en Marcos Juárez, tanto por trabajo como por turismo.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="py-20 px-6 bg-background">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-3">Preguntas frecuentes</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Todo lo que necesitás saber antes de reservar
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                >
                  <span className="font-display text-base md:text-lg text-foreground">{f.q}</span>
                  {isOpen ? <Minus size={18} className="text-primary shrink-0" /> : <Plus size={18} className="text-primary shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
