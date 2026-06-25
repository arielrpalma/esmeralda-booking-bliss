import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
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
    a: "Recibimos mascotas pequeñas previa consulta. Avisanos antes de reservar para confirmar disponibilidad y coordinar.",
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
