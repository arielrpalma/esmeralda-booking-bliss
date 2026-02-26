import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/iframe-resizer.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/main.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl mb-12"
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

        {/* Booking widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-5xl bg-card/90 backdrop-blur-md rounded-sm shadow-2xl border border-border/50 p-4 md:p-6"
        >
          <iframe
            id="hw-booking-frame"
            src="https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms?currency=ARS&language=es-ES&rp="
            frameBorder="0"
            allowTransparency={true}
            scrolling="no"
            style={{ width: "100%", minHeight: "500px" }}
            title="Consultar disponibilidad"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#departamentos"
          className="mt-10 text-section-dark-foreground/60 hover:text-section-dark-foreground transition-colors"
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
