import { Search, CalendarDays, BedDouble, Tag } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BASE_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms";

const FloatingBookingBar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [rooms, setRooms] = useState("1");
  const [promoCode, setPromoCode] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("currency", "ARS");
    params.set("language", "es-ES");
    if (checkIn) params.set("checkin", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkout", format(checkOut, "yyyy-MM-dd"));
    if (rooms) params.set("rooms", rooms);
    params.set("rp", promoCode);
    window.open(`${BASE_URL}?${params.toString()}`, "_blank");
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-5xl mx-auto">
            {/* Llegada */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2 text-left">
                  <CalendarDays size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                      Llegada
                    </span>
                    <span className={cn("text-sm font-body", checkIn ? "text-section-dark-foreground" : "text-section-dark-foreground/40")}>
                      {checkIn ? format(checkIn, "dd MMM yyyy", { locale: es }) : "Seleccionar"}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {/* Salida */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2 text-left">
                  <CalendarDays size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                      Salida
                    </span>
                    <span className={cn("text-sm font-body", checkOut ? "text-section-dark-foreground" : "text-section-dark-foreground/40")}>
                      {checkOut ? format(checkOut, "dd MMM yyyy", { locale: es }) : "Seleccionar"}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {/* Habitaciones */}
            <div className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2">
              <BedDouble size={16} className="text-primary shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                  Habitaciones
                </span>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="w-full bg-transparent text-sm font-body text-section-dark-foreground focus:outline-none appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n} className="text-foreground bg-background">
                      {n} {n === 1 ? "habitación" : "habitaciones"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Código Promocional */}
            <div className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2">
              <Tag size={16} className="text-primary shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                  Código Promo
                </span>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Opcional"
                  className="w-full bg-transparent text-sm font-body text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Buscar */}
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-3 font-body text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl shrink-0"
            >
              <Search size={18} />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingBookingBar;
