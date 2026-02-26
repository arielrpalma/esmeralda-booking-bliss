import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Sparkles, AirVent } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Diseño y Calidad",
    description:
      "Terminaciones de alta gama, ambientados con criterio moderno y funcional. Mobiliario a medida, iluminación cálida y más detalles.",
    image: "/images/design.jpg",
  },
  {
    icon: Sparkles,
    title: "Experiencia Única",
    description:
      "Ambientes que invitan al descanso, la inspiración o el disfrute cotidiano. Ideal para viajes cortos, escapadas o visitas laborales.",
    image: "/images/experience.jpg",
  },
  {
    icon: AirVent,
    title: "Totalmente Equipados",
    description:
      "Aire acondicionado multisplit, cocina totalmente equipada con heladera, microondas, vajilla completa y todo lo necesario para una estadía confortable.",
    image: "/images/equipped.jpg",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="py-24 md:py-32 bg-section-dark">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">
            Lo que nos distingue
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-section-dark-foreground mb-6">
            Espacios funcionales y elegantes
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-sm mb-6">
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-section-dark/20 group-hover:bg-section-dark/10 transition-colors duration-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <f.icon className="text-primary" size={22} />
                <h3 className="text-xl font-display font-semibold text-section-dark-foreground">
                  {f.title}
                </h3>
              </div>
              <p className="font-body text-section-dark-foreground/70 leading-relaxed text-sm">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
