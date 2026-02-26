import { motion } from "framer-motion";
import { ChevronDown, Search, CalendarDays, Users } from "lucide-react";
import { useState } from "react";

const BOOKING_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms?currency=ARS&language=es-ES&rp=";

const HeroSection = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    window.open(BOOKING_URL, "_blank");
  };

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
          className="max-w-3xl mb-16"
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

        {/* Booking bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-3xl"
        >
          <div className="bg-card/95 backdrop-blur-md rounded-lg shadow-2xl border border-border/30 p-4 md:p-5">
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
              {/* Check In */}
              <div className="flex-1">
                <label className="text-xs font-body font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  Check In
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-md px-3 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Check Out */}
              <div className="flex-1">
                <label className="text-xs font-body font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  Check Out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-md px-3 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Huéspedes */}
              <div className="flex-1">
                <label className="text-xs font-body font-semibold tracking-wider uppercase text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Users size={14} />
                  Huéspedes
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-muted/50 border border-border rounded-md px-3 py-2.5 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "huésped" : "huéspedes"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buscar */}
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-2.5 font-body text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl min-h-[42px]"
              >
                <Search size={18} />
                <span className="hidden md:inline">Buscar</span>
              </button>
            </div>
          </div>
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
