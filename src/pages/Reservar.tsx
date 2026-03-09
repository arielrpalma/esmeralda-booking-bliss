import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CalendarDays, Moon, Users, ChevronDown, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const NOBEDS_BASE = "https://nobeds.app/DirectForm/Step/1508195409";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const fmt = (d: Date) => d.toISOString().split("T")[0];

const Reservar = () => {
  const [checkIn, setCheckIn] = useState(fmt(today));
  const [checkOut, setCheckOut] = useState(fmt(tomorrow));
  const [guests, setGuests] = useState("2");
  const [selected, setSelected] = useState(true);
  const [step] = useState(1);

  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const handleNext = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests) params.set("guests", guests);
    window.open(`${NOBEDS_BASE}&${params.toString()}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-section-dark py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-section-dark-foreground/70 hover:text-primary transition-colors duration-300 font-body text-sm tracking-wider uppercase"
          >
            <ArrowLeft size={16} />
            <span>Volver</span>
          </Link>

          <a href="/">
            <img
              src="/images/esmeralda-logo-new.png"
              alt="Esmeralda Apart"
              className="h-10 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          <div className="flex items-center gap-2 text-section-dark-foreground/60 font-body text-xs tracking-wider">
            <MapPin size={13} className="text-primary" />
            <span className="hidden sm:inline">Marcos Juárez, Córdoba</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-48 md:h-60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <div className="absolute inset-0 bg-section-dark/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <p className="text-[10px] font-body font-semibold tracking-[0.4em] uppercase text-primary mb-3">
            Planificá tu estadía
          </p>
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-section-dark-foreground leading-tight">
            Consultar <span className="italic font-light">Disponibilidad</span>
          </h1>
          <div className="w-10 h-[2px] bg-primary mt-4 mx-auto" />
        </motion.div>
      </div>

      {/* Main */}
      <main className="flex-1 bg-background py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-card rounded-sm shadow-2xl border border-border overflow-hidden"
          >
            {/* Stepper */}
            <div className="bg-section-dark px-8 py-6">
              <div className="flex items-center justify-center gap-0 relative max-w-sm mx-auto">
                {/* Step 1 */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-lg">🏠</span>
                  </div>
                  <p className="mt-2 font-body text-[11px] font-semibold tracking-wider text-section-dark-foreground/90 text-center">
                    Elegí la habitación
                  </p>
                </div>

                {/* Line */}
                <div className="flex-1 h-[2px] bg-section-dark-foreground/20 mx-3 mb-5" />

                {/* Step 2 */}
                <div className="flex flex-col items-center z-10 opacity-40">
                  <div className="w-11 h-11 rounded-full bg-section-dark-foreground/20 border border-section-dark-foreground/20 flex items-center justify-center">
                    <Check size={16} className="text-section-dark-foreground" />
                  </div>
                  <p className="mt-2 font-body text-[11px] font-semibold tracking-wider text-section-dark-foreground/70 text-center">
                    Reserva Aprobada
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 md:p-8">
              {/* Fechas */}
              <div className="mb-6">
                <label className="block font-body text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Fechas
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center gap-3 border border-border rounded-sm px-4 py-3 bg-background focus-within:border-primary transition-colors">
                    <CalendarDays size={16} className="text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] font-body font-semibold tracking-wider uppercase text-muted-foreground leading-none mb-1">Check-in</p>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                          if (e.target.value >= checkOut) {
                            const d = new Date(e.target.value);
                            d.setDate(d.getDate() + 1);
                            setCheckOut(fmt(d));
                          }
                        }}
                        className="w-full bg-transparent font-body text-sm text-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-3 border border-border rounded-sm px-4 py-3 bg-background focus-within:border-primary transition-colors">
                    <CalendarDays size={16} className="text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] font-body font-semibold tracking-wider uppercase text-muted-foreground leading-none mb-1">Check-out</p>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn}
                        className="w-full bg-transparent font-body text-sm text-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Noches + Huéspedes */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* Noches */}
                <div className="flex-1 flex items-center gap-3 border border-border rounded-sm px-4 py-3 bg-background">
                  <Moon size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] font-body font-semibold tracking-wider uppercase text-muted-foreground leading-none mb-1">Noches</p>
                    <p className="font-body text-sm font-semibold text-foreground">{nights}</p>
                  </div>
                </div>

                {/* Huéspedes */}
                <div className="flex-1 flex items-center gap-3 border border-border rounded-sm px-4 py-3 bg-background focus-within:border-primary transition-colors relative">
                  <Users size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-[10px] font-body font-semibold tracking-wider uppercase text-muted-foreground leading-none mb-1">Huéspedes</p>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-transparent font-body text-sm text-foreground focus:outline-none appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Huésped" : "Huéspedes"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <ChevronDown size={14} className="text-muted-foreground shrink-0" />
                </div>
              </div>

              {/* Habitaciones disponibles */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-foreground">
                    Habitaciones disponibles
                  </p>
                </div>

                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 bg-muted rounded-sm mb-1">
                  <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">Habitación</span>
                  <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-muted-foreground text-center">Máx. huéspedes</span>
                  <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-muted-foreground text-right">Precio por estadía</span>
                </div>

                {/* Room row */}
                <button
                  onClick={() => setSelected(!selected)}
                  className={`w-full grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 sm:gap-4 px-4 py-4 rounded-sm border transition-all duration-200 text-left ${
                    selected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-primary border-primary" : "border-border"}`}>
                      {selected && <Check size={11} className="text-primary-foreground" strokeWidth={3} />}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-foreground">Esmeralda Apart</p>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">Departamento completo · 9 de Julio 262</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center pl-8 sm:pl-0">
                    <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-muted-foreground sm:hidden">Máx. huéspedes</span>
                    <span className="font-body text-sm text-foreground font-medium">3 personas · 2 niños</span>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center pl-8 sm:pl-0">
                    <span className="font-body text-[10px] font-semibold tracking-wider uppercase text-muted-foreground sm:hidden">Precio estadía</span>
                    <div className="text-right">
                      <span className="font-body text-xs text-muted-foreground">ARS </span>
                      <span className="font-body text-base font-bold text-foreground">82.500</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* CTA */}
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className="flex items-center gap-3 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-primary-foreground font-body text-sm font-semibold tracking-[0.2em] uppercase px-8 py-3.5 rounded-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Siguiente
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { label: "Check-in", value: "14:00 hs", icon: "🕒" },
              { label: "Check-out", value: "11:00 hs", icon: "🕐" },
              { label: "Consultas", value: "+54 9 3472 43-3334", icon: "📞" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card border border-border rounded-sm px-5 py-4 flex items-center gap-4 shadow-sm"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-0.5">
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
      <footer className="bg-section-dark py-5 px-6 mt-8">
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
