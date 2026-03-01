import { Search, CalendarDays, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const BOOKING_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms?currency=ARS&language=es-ES&rp=";

const FloatingBookingBar = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests) params.set("guests", guests);
    const separator = BOOKING_URL.includes("?") ? "&" : "?";
    window.open(`${BOOKING_URL}${separator}${params.toString()}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="bg-section-dark/95 backdrop-blur-md border-t border-border/20 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-4xl mx-auto">
            {/* Check In */}
            <div className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2">
              <CalendarDays size={16} className="text-primary shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">Check In</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-transparent text-sm font-body text-section-dark-foreground focus:outline-none [&::-webkit-calendar-picker-indicator]:scale-[1.3] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:ml-[-40px]"
                />
              </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2">
              <CalendarDays size={16} className="text-primary shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">Check Out</span>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-transparent text-sm font-body text-section-dark-foreground focus:outline-none [&::-webkit-calendar-picker-indicator]:scale-[1.3] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:ml-[-40px]"
                />
              </div>
            </div>

            {/* Huéspedes */}
            <div className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2">
              <Users size={16} className="text-primary shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">Huéspedes</span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent text-sm font-body text-section-dark-foreground focus:outline-none appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="text-foreground bg-background">
                      {n} {n === 1 ? "huésped" : "huéspedes"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buscar */}
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-3 font-body text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl shrink-0"
            >
              <Search size={18} />
              <span>Encontrar Estadía</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingBookingBar;
