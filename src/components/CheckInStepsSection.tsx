import { motion } from "framer-motion";
import { CalendarCheck, KeyRound, Clock, DoorOpen, Home, Sparkles } from "lucide-react";

const steps = [
  { icon: CalendarCheck, title: "Reservás", text: "Online en menos de 2 minutos." },
  { icon: KeyRound, title: "Recibís tu código", text: "Te llega por WhatsApp y email." },
  { icon: Clock, title: "Llegás cuando quieras", text: "Sin esperas. 24 horas, todos los días." },
  { icon: DoorOpen, title: "Abrís el portón", text: "Acceso electrónico simple y seguro." },
  { icon: Home, title: "Ingresás al depto", text: "Todo listo: WiFi, cocina, ropa de cama." },
  { icon: Sparkles, title: "Disfrutás", text: "Tu estadía, a tu ritmo. Sin recepción." },
];

const CheckInStepsSection = () => {
  return (
    <section id="check-in" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold">
            Check-in 24 Horas
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mt-3 mb-4">
            Llegá cuando quieras
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Sin recepción, sin esperas, sin horarios. Acceso electrónico 24 h con un código personal para tu estadía.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative bg-card border border-border rounded-xl p-5 text-center hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground font-display text-sm flex items-center justify-center shadow">
                {i + 1}
              </div>
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 mt-2">
                <s.icon className="text-primary" size={22} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-base text-foreground mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CheckInStepsSection;
