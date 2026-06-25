import { motion } from "framer-motion";
import { BadgeDollarSign, MessageCircle, ShieldCheck, Gift, RefreshCw } from "lucide-react";

const benefits = [
  { icon: BadgeDollarSign, title: "Mejor precio garantizado", text: "Sin comisiones de OTAs. Pagás menos reservando directo." },
  { icon: MessageCircle, title: "Atención directa", text: "Hablás con nosotros por WhatsApp, no con un call center." },
  { icon: ShieldCheck, title: "Sin intermediarios", text: "Tu reserva, tu pago, tu confirmación. Todo en un solo lugar." },
  { icon: Gift, title: "Beneficios exclusivos", text: "Late check-out sujeto a disponibilidad y sorpresas para huéspedes directos." },
  { icon: RefreshCw, title: "Cambios más simples", text: "Modificá tu reserva con una sola conversación, sin políticas rígidas." },
];

const WhyDirectSection = () => {
  return (
    <section id="reservar-directo" className="py-20 px-6 bg-section-dark">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold">
            Reservá Directo
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-section-dark-foreground mt-3 mb-4">
            ¿Por qué reservar directo con nosotros?
          </h2>
          <p className="text-section-dark-foreground/70 font-body max-w-2xl mx-auto">
            Reservás más rápido, pagás menos y tenés atención directa de los dueños. Sin intermediarios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-section-dark-foreground/5 border border-section-dark-foreground/10 rounded-xl p-6 hover:border-primary/40 hover:bg-section-dark-foreground/10 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                <b.icon className="text-primary" size={22} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg text-section-dark-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-section-dark-foreground/65 font-body leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDirectSection;
