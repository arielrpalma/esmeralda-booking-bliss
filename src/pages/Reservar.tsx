import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Reservar = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-section-dark py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-section-dark-foreground/70 hover:text-primary transition-colors duration-300 font-body text-sm tracking-wider uppercase"
          >
            <ArrowLeft size={18} />
            <span>Volver</span>
          </Link>

          <a href="/" className="flex items-center">
            <img
              src="/images/esmeralda-logo-new.png"
              alt="Esmeralda Apart"
              className="h-10 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          <div className="flex items-center gap-2 text-section-dark-foreground/60 font-body text-xs tracking-wider">
            <MapPin size={14} className="text-primary" />
            <span>Marcos Juárez, Córdoba</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-52 md:h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="absolute inset-0 bg-section-dark/40" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <div className="w-12 h-[2px] bg-primary mb-4 mx-auto" />
          <p className="text-xs font-body font-semibold tracking-[0.3em] uppercase text-primary mb-3">
            Planificá tu estadía
          </p>
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-section-dark-foreground leading-tight">
            Consultar{" "}
            <span className="italic font-light">Disponibilidad</span>
          </h1>
          <div className="w-12 h-[2px] bg-primary mt-4 mx-auto" />
        </motion.div>
      </div>

      {/* Booking Form Container */}
      <main className="flex-1 bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-sm shadow-2xl border border-border overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-section-dark px-6 py-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <p className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-section-dark-foreground/90">
                Esmeralda Apart · Reserva Online
              </p>
            </div>

            {/* iframe */}
            <div className="p-0">
              <iframe
                src="https://nobeds.app/DirectForm/Step/1508195409"
                className="w-full border-0"
                style={{ minHeight: "600px", height: "75vh" }}
                title="Reservar en Esmeralda Apart"
                allow="payment"
                scrolling="yes"
              />
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { label: "Check-in", value: "14:00 hs", icon: "🕒" },
              { label: "Check-out", value: "11:00 hs", icon: "🕐" },
              { label: "Consultas", value: "WhatsApp / Teléfono", icon: "📞" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-sm px-5 py-4 flex items-center gap-4 shadow-sm"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-0.5">
                    {item.label}
                  </p>
                  <p className="font-body text-sm font-medium text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="bg-section-dark py-6 px-6 mt-8">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <img
            src="/images/esmeralda-logo-new.png"
            alt="Esmeralda Apart"
            className="h-8 w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="font-body text-xs text-section-dark-foreground/40 text-center">
            © {new Date().getFullYear()} Esmeralda Desarrollos. Todos los derechos reservados.
          </p>
          <a
            href="https://wa.me/5493472433334"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-primary hover:text-primary/80 transition-colors tracking-wider"
          >
            +54 9 3472 43-3334
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Reservar;
