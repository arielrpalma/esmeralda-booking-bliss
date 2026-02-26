import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="departamentos" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">
            Marcos Juárez, Córdoba
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Departamentos
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/images/apartment.jpg"
              alt="Departamento Esmeralda Apart"
              className="w-full rounded-sm shadow-2xl"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-semibold text-foreground">
              Un exclusivo desarrollo con estilo
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              Presentamos un exclusivo desarrollo, ideal para estadías cortas con estilo. 
              Departamentos modernos y equipados, pensados para descansar, trabajar o 
              disfrutar con total confort. Diseño, calidez y practicidad.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Ubicado en pleno centro de Marcos Juárez, en una zona segura y tranquila, 
              Esmeralda Apart ofrece la perfecta combinación entre accesibilidad, 
              comodidad y tranquilidad.
            </p>
            <a
              href="#reservar"
              className="inline-block mt-4 px-8 py-3 border-2 border-primary text-primary font-body text-sm font-semibold tracking-[0.15em] uppercase rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Reservar Ahora
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
