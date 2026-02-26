import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="w-20 h-[2px] bg-primary mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-display font-semibold text-section-dark-foreground leading-tight mb-6">
            Esmeralda <span className="italic font-light">Apart</span>
          </h1>
          <p className="text-lg md:text-xl font-body font-light text-section-dark-foreground/85 tracking-wide mb-6">
            Lujo, diseño y confort en cada detalle
          </p>
          <div className="w-20 h-[2px] bg-primary mx-auto" />
        </motion.div>

        <motion.a
          href="#departamentos"
          className="absolute bottom-10 text-section-dark-foreground/60 hover:text-section-dark-foreground transition-colors"
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
