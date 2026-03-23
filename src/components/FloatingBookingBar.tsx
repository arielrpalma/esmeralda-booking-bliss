import { Search, CalendarDays, Plus, Minus, Users, Check, X, Loader2 } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const BASE_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms";

interface Alternative {
  checkin: string;
  checkout: string;
  nights: number;
}

interface AvailabilityResult {
  available: boolean;
  alternatives?: Alternative[];
  extensions?: Alternative[];
}

const FloatingBookingBar = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const isMobile = useIsMobile();

  const MAX_GUESTS = 3;
  const totalGuests = adults + children + babies;
  const canAddMore = totalGuests < MAX_GUESTS;

  const checkAvailability = async (checkin: string, checkout: string) => {
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("check-availability", {
        body: { checkin, checkout },
      });
      if (error) throw error;
      setResult(data as AvailabilityResult);
    } catch (err) {
      console.error("Availability check failed:", err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!dateRange?.from || !dateRange?.to) return;
    const checkin = format(dateRange.from, "yyyy-MM-dd");
    const checkout = format(dateRange.to, "yyyy-MM-dd");
    checkAvailability(checkin, checkout);
  };

  const handleBookNow = () => {
    if (!dateRange?.from || !dateRange?.to) return;
    const params = new URLSearchParams();
    params.set("currency", "ARS");
    params.set("language", "es-ES");
    params.set("from", format(dateRange.from, "yyyy-MM-dd"));
    params.set("to", format(dateRange.to, "yyyy-MM-dd"));
    params.set("nAdults", String(adults));
    if (children > 0) params.set("nChilds", String(children));
    if (babies > 0) params.set("nBabies", String(babies));
    params.set("rp", "");
    window.open(`${BASE_URL}?${params.toString()}`, "_blank");
  };

  const handleSelectAlternative = (alt: Alternative) => {
    const from = new Date(alt.checkin + "T00:00:00");
    const to = new Date(alt.checkout + "T00:00:00");
    setDateRange({ from, to });
    // Redirect directly to booking engine
    const params = new URLSearchParams();
    params.set("currency", "ARS");
    params.set("language", "es-ES");
    params.set("from", alt.checkin);
    params.set("to", alt.checkout);
    params.set("nAdults", String(adults));
    if (children > 0) params.set("nChilds", String(children));
    if (babies > 0) params.set("nBabies", String(babies));
    params.set("rp", "");
    window.open(`${BASE_URL}?${params.toString()}`, "_blank");
  };

  const dismissResult = () => setResult(null);

  const summary = `1 dept. · ${totalGuests} huésp.`;

  const dateLabel = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "dd MMM", { locale: es })} → ${format(dateRange.to, "dd MMM", { locale: es })}`
      : `${format(dateRange.from, "dd MMM", { locale: es })} → ...`
    : "Seleccionar fechas";

  const calendarContent = (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={isMobile ? 1 : 2}
      locale={es}
      disabled={(date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
      }}
      initialFocus
      className={cn("p-3 pointer-events-auto")}
    />
  );

  const guestsContent = (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-foreground">Departamento</span>
          <span className="block text-[11px] text-muted-foreground">¿Más deptos? Agregá en el paso siguiente</span>
        </div>
        <span className="text-sm font-semibold text-foreground">1</span>
      </div>
      <div className="border-t border-border" />
      <CounterRow label="Adultos" sublabel="+15 años" value={adults} onDecrement={() => adults > 1 && setAdults(adults - 1)} onIncrement={() => canAddMore && setAdults(adults + 1)} min={1} />
      <CounterRow label="Menores" sublabel="3-14 años" value={children} onDecrement={() => children > 0 && setChildren(children - 1)} onIncrement={() => canAddMore && setChildren(children + 1)} min={0} />
      <CounterRow label="Bebés" sublabel="< 2 años" value={babies} onDecrement={() => babies > 0 && setBabies(babies - 1)} onIncrement={() => canAddMore && setBabies(babies + 1)} min={0} />
      <div className="flex justify-end pt-2 border-t border-border">
        <button
          onClick={() => setGuestsOpen(false)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          Aplicar
        </button>
      </div>
    </div>
  );

  const dateTrigger = (
    <button className={cn(
      "flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-lg text-left min-w-0",
      isMobile ? "px-2.5 py-1.5" : "px-3 py-2"
    )}>
      <CalendarDays size={isMobile ? 14 : 16} className="text-primary shrink-0" />
      <div className="flex-1 min-w-0">
        <span className={cn(
          "font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-0.5",
          isMobile ? "text-[9px]" : "text-[10px] mb-1"
        )}>
          Llegada — Salida
        </span>
        <span className={cn(
          "font-body truncate block",
          isMobile ? "text-xs" : "text-sm",
          dateRange?.from ? "text-section-dark-foreground" : "text-section-dark-foreground/40"
        )}>
          {dateLabel}
        </span>
      </div>
    </button>
  );

  const guestsTrigger = (
    <button className={cn(
      "flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-lg text-left min-w-0",
      isMobile ? "px-2.5 py-1.5" : "px-3 py-2"
    )}>
      <Users size={isMobile ? 14 : 16} className="text-primary shrink-0" />
      <div className="flex-1 min-w-0">
        <span className={cn(
          "font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-0.5",
          isMobile ? "text-[9px]" : "text-[10px] mb-1"
        )}>
          Huéspedes
        </span>
        <span className={cn(
          "font-body text-section-dark-foreground truncate block",
          isMobile ? "text-xs" : "text-sm"
        )}>
          {summary}
        </span>
      </div>
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Results banner */}
      <AnimatePresence>
        {(result || loading) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-card/95 backdrop-blur-xl border-t border-border/30 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
          >
            <div className="container mx-auto px-3 sm:px-4 py-3 max-w-5xl">
              {loading ? (
                <div className="flex items-center justify-center gap-3 py-2">
                  <Loader2 size={20} className="text-primary animate-spin" />
                  <span className="text-sm font-body text-muted-foreground">Consultando disponibilidad…</span>
                </div>
              ) : result?.available ? (
                <div className="space-y-2 sm:space-y-3">
                  <div className={cn("flex items-center justify-between gap-2 sm:gap-3", isMobile && "flex-wrap")}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-primary" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-body font-semibold text-foreground">¡Disponible!</span>
                        <span className="block text-[10px] sm:text-xs text-muted-foreground">Fechas libres</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleBookNow}
                        className="px-3 sm:px-5 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-body font-semibold hover:bg-primary/90 transition-all shadow-md"
                      >
                        Reservar ahora
                      </button>
                      <button onClick={dismissResult} className="p-1 sm:p-1.5 rounded-full hover:bg-muted transition-colors">
                        <X size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  {result.extensions && result.extensions.length > 0 && (
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-body font-semibold uppercase tracking-wider text-muted-foreground mb-1 block">
                        ¿Querés alargar tu estadía?
                      </span>
                      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {result.extensions.map((ext, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelectAlternative(ext)}
                            className="flex-shrink-0 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/5 hover:bg-primary/15 border border-primary/20 rounded-lg transition-all text-left group"
                          >
                            <span className="text-[10px] sm:text-xs font-body font-semibold text-foreground block whitespace-nowrap">
                              {format(new Date(ext.checkin + "T00:00:00"), "dd MMM", { locale: es })} → {format(new Date(ext.checkout + "T00:00:00"), "dd MMM", { locale: es })}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                              {ext.nights} {ext.nights === 1 ? "noche" : "noches"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : result && !result.available ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-destructive/15 flex items-center justify-center">
                        <X size={16} className="text-destructive" />
                      </div>
                      <div>
                        <span className="text-sm font-body font-semibold text-foreground">No disponible</span>
                        <span className="block text-xs text-muted-foreground">Probá con estas fechas alternativas</span>
                      </div>
                    </div>
                    <button onClick={dismissResult} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                  {result.alternatives && result.alternatives.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide max-h-24 sm:max-h-none">
                      {result.alternatives.map((alt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelectAlternative(alt)}
                          className="flex-shrink-0 px-3 py-2 bg-muted/80 hover:bg-primary/10 border border-border/50 rounded-lg transition-all text-left group"
                        >
                          <span className="text-xs font-body font-semibold text-foreground block whitespace-nowrap">
                            {format(new Date(alt.checkin + "T00:00:00"), "dd MMM", { locale: es })} → {format(new Date(alt.checkout + "T00:00:00"), "dd MMM", { locale: es })}
                          </span>
                          <span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                            {alt.nights} {alt.nights === 1 ? "noche" : "noches"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main bar */}
      <div className="bg-section-dark/90 backdrop-blur-xl border-t border-border/20 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className={cn(
            "flex items-center gap-2 sm:gap-3 max-w-5xl mx-auto",
            isMobile && "flex-col"
          )}>
            {/* Row 1 on mobile: dates + guests */}
            <div className={cn("flex items-center gap-2 w-full", !isMobile && "flex-1")}>
              {/* Fechas */}
              {isMobile ? (
                <Drawer open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <DrawerTrigger asChild>{dateTrigger}</DrawerTrigger>
                  <DrawerContent>
                    <div className="p-4 flex justify-center overflow-auto">
                      {calendarContent}
                    </div>
                  </DrawerContent>
                </Drawer>
              ) : (
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>{dateTrigger}</PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={8}>
                    {calendarContent}
                  </PopoverContent>
                </Popover>
              )}

              {/* Huéspedes */}
              {isMobile ? (
                <Drawer open={guestsOpen} onOpenChange={setGuestsOpen}>
                  <DrawerTrigger asChild>{guestsTrigger}</DrawerTrigger>
                  <DrawerContent>{guestsContent}</DrawerContent>
                </Drawer>
              ) : (
                <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                  <PopoverTrigger asChild>{guestsTrigger}</PopoverTrigger>
                  <PopoverContent className="w-[320px] p-0 pointer-events-auto" align="center" side="top" sideOffset={8}>
                    {guestsContent}
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              disabled={!dateRange?.from || !dateRange?.to || loading}
              className={cn(
                "bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 sm:px-6 py-3 font-body text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl shrink-0 disabled:opacity-50 disabled:cursor-not-allowed",
                isMobile && "w-full"
              )}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              <span>{isMobile ? "Consultar disponibilidad" : "Consultar"}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CounterRow = ({
  label, sublabel, value, onDecrement, onIncrement, min,
}: {
  label: string; sublabel?: string; value: number; onDecrement: () => void; onIncrement: () => void; min: number;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {sublabel && <span className="block text-[11px] text-muted-foreground">{sublabel}</span>}
    </div>
    <div className="flex items-center gap-3">
      <button onClick={onDecrement} disabled={value <= min} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
        <Minus size={14} />
      </button>
      <span className="text-sm font-semibold text-foreground w-4 text-center">{value}</span>
      <button onClick={onIncrement} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors">
        <Plus size={14} />
      </button>
    </div>
  </div>
);

export default FloatingBookingBar;
