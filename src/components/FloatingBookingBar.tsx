import { Search, CalendarDays, BedDouble, Tag, Plus, Minus, Users } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [guestsOpen, setGuestsOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("currency", "ARS");
    params.set("language", "es-ES");
    if (dateRange?.from) params.set("checkin", format(dateRange.from, "yyyy-MM-dd"));
    if (dateRange?.to) params.set("checkout", format(dateRange.to, "yyyy-MM-dd"));

    // Distribuir huéspedes por habitación (formato indexado que espera HotelPMS)
    const adultsPerRoom = Math.floor(adults / rooms);
    const extraAdults = adults % rooms;
    const childrenPerRoom = Math.floor(children / rooms);
    const extraChildren = children % rooms;
    const babiesPerRoom = Math.floor(babies / rooms);
    const extraBabies = babies % rooms;

    for (let i = 0; i < rooms; i++) {
      const rAdults = adultsPerRoom + (i < extraAdults ? 1 : 0);
      const rChildren = childrenPerRoom + (i < extraChildren ? 1 : 0);
      const rBabies = babiesPerRoom + (i < extraBabies ? 1 : 0);
      params.set(`rooms[${i}][adults]`, String(rAdults));
      params.set(`rooms[${i}][children]`, String(rChildren));
      params.set(`rooms[${i}][infants]`, String(rBabies));
    }

    // No enviamos claves escalares que puedan colisionar con la estructura rooms[index][...]
    // porque el motor interpreta las habitaciones desde ese array indexado.
    if (promoCode) params.set("rp", promoCode);
    window.open(`${BASE_URL}?${params.toString()}`, "_blank");
  };

  const totalGuests = adults + children + babies;
  const summary = `${rooms} dept. · ${totalGuests} huésp.`;

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
            {/* Llegada / Salida */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2 text-left">
                  <CalendarDays size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                      Llegada — Salida
                    </span>
                    <span className={cn("text-sm font-body", dateRange?.from ? "text-section-dark-foreground" : "text-section-dark-foreground/40")}>
                      {dateRange?.from
                        ? dateRange.to
                          ? `${format(dateRange.from, "dd MMM", { locale: es })} → ${format(dateRange.to, "dd MMM", { locale: es })}`
                          : `${format(dateRange.from, "dd MMM", { locale: es })} → ...`
                        : "Seleccionar fechas"}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={8}>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {/* Huéspedes y Departamentos */}
            <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2 text-left">
                  <Users size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                      Huéspedes
                    </span>
                    <span className="text-sm font-body text-section-dark-foreground">
                      {summary}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[320px] p-0 pointer-events-auto"
                align="center"
                side="top"
                sideOffset={8}
              >
                <div className="p-5 space-y-4">
                  {/* Departamentos */}
                  <CounterRow
                    label="Departamentos"
                    sublabel="(habitaciones)"
                    value={rooms}
                    onDecrement={() => rooms > 1 && setRooms(rooms - 1)}
                    onIncrement={() => rooms < 5 && setRooms(rooms + 1)}
                    min={1}
                  />

                  <div className="border-t border-border" />

                  {/* Adultos */}
                  <CounterRow
                    label="Adultos"
                    sublabel="+15 años"
                    value={adults}
                    onDecrement={() => adults > 1 && setAdults(adults - 1)}
                    onIncrement={() => setAdults(adults + 1)}
                    min={1}
                  />

                  {/* Menores */}
                  <CounterRow
                    label="Menores"
                    sublabel="3-14 años"
                    value={children}
                    onDecrement={() => children > 0 && setChildren(children - 1)}
                    onIncrement={() => setChildren(children + 1)}
                    min={0}
                  />

                  {/* Bebés */}
                  <CounterRow
                    label="Bebés"
                    sublabel="< 2 años"
                    value={babies}
                    onDecrement={() => babies > 0 && setBabies(babies - 1)}
                    onIncrement={() => setBabies(babies + 1)}
                    min={0}
                  />

                  {/* Aplicar */}
                  <div className="flex justify-end pt-2 border-t border-border">
                    <button
                      onClick={() => setGuestsOpen(false)}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

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

// Reusable counter row component
const CounterRow = ({
  label,
  sublabel,
  value,
  onDecrement,
  onIncrement,
  min,
}: {
  label: string;
  sublabel?: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  min: number;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {sublabel && (
        <span className="block text-[11px] text-muted-foreground">{sublabel}</span>
      )}
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrement}
        disabled={value <= min}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus size={14} />
      </button>
      <span className="text-sm font-semibold text-foreground w-4 text-center">{value}</span>
      <button
        onClick={onIncrement}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

export default FloatingBookingBar;
