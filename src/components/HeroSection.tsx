import { motion } from "framer-motion";
import { ChevronDown, KeyRound, Clock, MapPin, MessageCircle, PawPrint, Rainbow } from "lucide-react";

const HeroSection = () => {
  const scrollToBooking = () => {
    // Brings the FloatingBookingBar into focus by scrolling to top.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className="relative z-10 h-full flex items-center px-6 pt-28 pb-32">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl text-center lg:text-left"
          >
            <div className="w-20 h-[2px] bg-primary mb-6 mx-auto lg:mx-0" />

            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-body font-semibold mb-4">
              El apart inteligente de Marcos Juárez
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-section-dark-foreground leading-tight mb-5">
              Llegá <span className="italic font-light">cuando</span> quieras.
            </h1>

            <p className="text-base md:text-xl font-body font-light text-section-dark-foreground/85 leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
              Check-in electrónico 24 h · Sin recepción · Reservá directo y pagá menos.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              <Badge icon={Clock} text="24 horas" />
              <Badge icon={KeyRound} text="Acceso electrónico" />
              <Badge icon={MapPin} text="A min. de Au Ruta9" />
              <Badge icon={PawPrint} text="Pet friendly" />
              <Badge icon={Rainbow} text="LGBT friendly" />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={scrollToBooking}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 rounded-lg font-body font-semibold text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all"
              >
                Reservar ahora
              </button>
              <a
                href="https://wa.me/5493472433334"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-section-dark-foreground/10 hover:bg-section-dark-foreground/20 backdrop-blur-md border border-section-dark-foreground/25 text-section-dark-foreground px-7 py-3.5 rounded-lg font-body font-semibold text-sm tracking-wider uppercase transition-all inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Consultar por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right - Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="shrink-0 hidden md:block"
          >
            <img
              src="/images/cuadro.png"
              alt="Mejor Puntuado - Booking, Airbnb, Agoda, Google Hotel"
              className="w-48 lg:w-60 drop-shadow-2xl"
            />
          </motion.div>
        </div>

        <motion.a
          href="#reservar-directo"
          aria-label="Bajar a la siguiente sección"
          className="absolute bottom-28 left-1/2 -translate-x-1/2 text-section-dark-foreground/60 hover:text-section-dark-foreground transition-colors hidden md:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} />
        </motion.a>
      </div>
    </section>
  );
};

const Badge = ({ icon: Icon, text }: { icon: typeof Clock; text: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-section-dark-foreground/10 backdrop-blur-md border border-section-dark-foreground/20 text-xs font-body font-medium text-section-dark-foreground">
    <Icon size={13} className="text-primary" />
    {text}
  </span>
);

export default HeroSection;
