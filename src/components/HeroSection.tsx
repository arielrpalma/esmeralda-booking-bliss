import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <img
        src="/images/hero.jpg"
        srcSet="/images/hero-mobile.jpg 800w, /images/hero.jpg 1800w"
        sizes="(max-width: 768px) 100vw, 1800px"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 h-full flex items-center px-6 pt-32 pb-24">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl text-center md:text-left"
          >
            <div className="w-20 h-[2px] bg-primary mb-8 mx-auto md:mx-0" />
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-section-dark-foreground leading-tight mb-6">
              Esmeralda <span className="italic font-light">Apart</span>
              <span className="sr-only"> — Departamentos temporarios de lujo en Marcos Juárez</span>
            </h1>
            <p className="text-lg md:text-xl font-body font-light text-section-dark-foreground/85 tracking-wide mb-6">
              Lujo, diseño y confort en cada detalle
            </p>
            <div className="w-20 h-[2px] bg-primary mx-auto md:mx-0" />
          </motion.div>

          {/* Right - Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="shrink-0"
          >
            <img
              src="/images/cuadro.png"
              alt="Mejor Puntuado - Booking, Airbnb, Agoda, Google Hotel"
              className="w-48 md:w-64 drop-shadow-2xl"
            />
          </motion.div>
        </div>





        <motion.a
          href="#departamentos"
          aria-label="Bajar a la sección de departamentos"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-section-dark-foreground/60 hover:text-section-dark-foreground transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
