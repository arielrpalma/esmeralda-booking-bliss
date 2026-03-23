import { Search, CalendarDays, Plus, Minus, Users, Check, X, Loader2, ArrowRight, Clock } from "lucide-react";
import { useState, useEffect } from "react";
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

interface Suggestion {
  checkin: string;
  checkout: string;
  nights: number;
}

interface AvailabilityResult {
  available: boolean;
  nights: number;
  checkin: string;
  checkout: string;
  extensions?: Suggestion[];
  before?: Suggestion[];
  after?: Suggestion[];
}

// --- Helpers ---

const safeDateFormat = (dateStr: string, fmt: string) => {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d.getTime())) return "—";
    return format(d, fmt, { locale: es });
  } catch {
    return "—";
  }
};

const nightsLabel = (n: number) => `${n} ${n === 1 ? "noche" : "noches"}`;

// --- Main Component ---

const FloatingBookingBar = ({ onBannerVisible }: { onBannerVisible?: (visible: boolean) => void }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [calendarOpen, setCalendarOpenRaw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const isMobile = useIsMobile();

  const setCalendarOpen = (open: boolean) => {
    if (open) { setDateRange(undefined); setResult(null); }
    setCalendarOpenRaw(open);
  };

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
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!dateRange?.from || !dateRange?.to) return;
    checkAvailability(format(dateRange.from, "yyyy-MM-dd"), format(dateRange.to, "yyyy-MM-dd"));
  };

  const openBookingEngine = (checkin: string, checkout: string) => {
    const params = new URLSearchParams();
    params.set("currency", "ARS");
    params.set("language", "es-ES");
    params.set("from", checkin);
    params.set("to", checkout);
    params.set("nAdults", String(adults));
    if (children > 0) params.set("nChilds", String(children));
    if (babies > 0) params.set("nBabies", String(babies));
    params.set("rp", "");
    window.open(`${BASE_URL}?${params.toString()}`, "_blank");
  };

  const handleBookNow = () => {
    if (!dateRange?.from || !dateRange?.to) return;
    openBookingEngine(format(dateRange.from, "yyyy-MM-dd"), format(dateRange.to, "yyyy-MM-dd"));
  };

  const handleSelectSuggestion = (s: Suggestion) => {
    setDateRange({
      from: new Date(s.checkin + "T00:00:00"),
      to: new Date(s.checkout + "T00:00:00"),
    });
    openBookingEngine(s.checkin, s.checkout);
  };

  const dismissResult = () => setResult(null);
  const summary = `1 dept. · ${totalGuests} huésp.`;
  const dateLabel = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "dd MMM", { locale: es })} → ${format(dateRange.to, "dd MMM", { locale: es })}`
      : `${format(dateRange.from, "dd MMM", { locale: es })} → ...`
    : "Seleccionar fechas";

  // --- Pill component ---
  const Pill = ({ s, variant = "default" }: { s: Suggestion; variant?: "default" | "primary" }) => (
    <button
      onClick={() => handleSelectSuggestion(s)}
      className={cn(
        "flex-shrink-0 rounded-lg transition-all text-left group flex items-center gap-1.5",
        isMobile ? "px-2.5 py-2" : "px-3 py-2",
        variant === "primary"
          ? "bg-primary/8 hover:bg-primary/15 border border-primary/25"
          : "bg-muted/60 hover:bg-primary/10 border border-border/50"
      )}
    >
      <div className="min-w-0">
        <span className={cn("font-body font-bold text-foreground block whitespace-nowrap", isMobile ? "text-xs" : "text-xs")}>
          {safeDateFormat(s.checkin, "d MMM")} → {safeDateFormat(s.checkout, "d MMM")}
        </span>
        <span className={cn("font-semibold text-muted-foreground group-hover:text-primary transition-colors", isMobile ? "text-[10px]" : "text-[10px]")}>
          {nightsLabel(s.nights)}
        </span>
      </div>
      <ArrowRight size={12} className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
    </button>
  );

  // --- Calendar & guests (unchanged) ---
  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setCalendarOpenRaw(false);
    }
  };

  const calendarContent = (
    <Calendar mode="range" selected={dateRange} onSelect={handleDateSelect}
      numberOfMonths={isMobile ? 1 : 2} locale={es}
      disabled={(date) => { const t = new Date(); t.setHours(0,0,0,0); return date < t; }}
      initialFocus className={cn("p-3 pointer-events-auto")} />
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
        <button onClick={() => setGuestsOpen(false)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors">
          Aplicar
        </button>
      </div>
    </div>
  );

  const dateTrigger = (
    <button className={cn("flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-lg text-left min-w-0", isMobile ? "px-2.5 py-1.5" : "px-3 py-2")}>
      <CalendarDays size={isMobile ? 14 : 16} className="text-primary shrink-0" />
      <div className="flex-1 min-w-0">
        <span className={cn("font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-0.5", isMobile ? "text-[9px]" : "text-[10px] mb-1")}>Llegada — Salida</span>
        <span className={cn("font-body truncate block", isMobile ? "text-xs" : "text-sm", dateRange?.from ? "text-section-dark-foreground" : "text-section-dark-foreground/40")}>{dateLabel}</span>
      </div>
    </button>
  );

  const guestsTrigger = (
    <button className={cn("flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-lg text-left min-w-0", isMobile ? "px-2.5 py-1.5" : "px-3 py-2")}>
      <Users size={isMobile ? 14 : 16} className="text-primary shrink-0" />
      <div className="flex-1 min-w-0">
        <span className={cn("font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-0.5", isMobile ? "text-[9px]" : "text-[10px] mb-1")}>Huéspedes</span>
        <span className={cn("font-body text-section-dark-foreground truncate block", isMobile ? "text-xs" : "text-sm")}>{summary}</span>
      </div>
    </button>
  );

  const hasBefore = result?.before && result.before.length > 0;
  const hasAfter = result?.after && result.after.length > 0;
  const hasNoAlternatives = result && !result.available && !hasBefore && !hasAfter;

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }} className="fixed bottom-0 left-0 right-0 z-50">

      {/* Results banner */}
      <AnimatePresence>
        {(result || loading) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}
            className="bg-card/95 backdrop-blur-xl border-t border-border/30 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
            <div className={cn("container mx-auto max-w-5xl", isMobile ? "px-3 py-2.5" : "px-4 py-3")}>

              {loading ? (
                <div className="flex items-center justify-center gap-3 py-2">
                  <Loader2 size={20} className="text-primary animate-spin" />
                  <span className="text-sm font-body text-muted-foreground">Consultando disponibilidad…</span>
                </div>

              ) : result?.available ? (
                /* ===== AVAILABLE ===== */
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-primary" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-body font-semibold text-foreground">¡Disponible!</span>
                        <span className="block text-[10px] sm:text-xs text-muted-foreground">
                          {safeDateFormat(result.checkin, "d 'de' MMM")} al {safeDateFormat(result.checkout, "d 'de' MMM")} — {nightsLabel(result.nights)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleBookNow}
                        className={cn("bg-primary text-primary-foreground rounded-lg font-body font-semibold hover:bg-primary/90 transition-all shadow-md", isMobile ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm")}>
                        Reservar ahora
                      </button>
                      <button onClick={dismissResult} className="p-1 rounded-full hover:bg-muted transition-colors">
                        <X size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {result.extensions && result.extensions.length > 0 && (
                    <div>
                      <span className={cn("font-body font-semibold uppercase tracking-wider text-muted-foreground mb-1 block", isMobile ? "text-[9px]" : "text-[10px]")}>
                        ¿Querés alargar tu estadía?
                      </span>
                      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {result.extensions.map((s, i) => <Pill key={i} s={s} variant="primary" />)}
                      </div>
                    </div>
                  )}
                </div>

              ) : result && !result.available ? (
                /* ===== NOT AVAILABLE ===== */
                <div className={cn("space-y-2.5", isMobile && "max-h-[45vh] overflow-y-auto scrollbar-hide")}>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
                        <X size={14} className="text-destructive" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-body font-semibold text-foreground">
                          No disponible del {safeDateFormat(result.checkin, "d 'de' MMM")} al {safeDateFormat(result.checkout, "d 'de' MMM")}
                        </span>
                        <span className="block text-[10px] sm:text-xs text-muted-foreground">
                          Te ofrecemos estas alternativas:
                        </span>
                      </div>
                    </div>
                    <button onClick={dismissResult} className="p-1 rounded-full hover:bg-muted transition-colors shrink-0">
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </div>

                  {/* Single row: BEFORE ← | → AFTER */}
                  {(hasBefore || hasAfter) && (
                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide items-center">
                      {/* Before pills */}
                      {hasBefore && result.before!.map((s, i) => <Pill key={`b-${i}`} s={s} />)}

                      {/* Divider */}
                      {hasBefore && hasAfter && (
                        <div className="shrink-0 w-px h-8 bg-border/60 mx-1" />
                      )}

                      {/* After pills */}
                      {hasAfter && result.after!.map((s, i) => <Pill key={`a-${i}`} s={s} variant="primary" />)}
                    </div>
                  )}

                  {hasNoAlternatives && (
                    <div className="flex items-center gap-2 py-2 px-3 bg-muted/50 rounded-lg">
                      <Clock size={14} className="text-muted-foreground shrink-0" />
                      <span className="text-xs font-body text-muted-foreground">
                        No encontramos opciones cercanas. Probá con otras fechas.
                      </span>
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
        <div className={cn("container mx-auto", isMobile ? "px-2.5 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]" : "px-4 py-3")}>
          <div className={cn("flex items-center gap-2 sm:gap-3 max-w-5xl mx-auto", isMobile && "flex-col gap-1.5")}>
            <div className={cn("flex items-center gap-2 w-full", !isMobile && "flex-1")}>
              {isMobile ? (
                <Drawer open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <DrawerTrigger asChild>{dateTrigger}</DrawerTrigger>
                  <DrawerContent><div className="p-4 flex justify-center overflow-auto">{calendarContent}</div></DrawerContent>
                </Drawer>
              ) : (
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>{dateTrigger}</PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={8}>{calendarContent}</PopoverContent>
                </Popover>
              )}
              {isMobile ? (
                <Drawer open={guestsOpen} onOpenChange={setGuestsOpen}>
                  <DrawerTrigger asChild>{guestsTrigger}</DrawerTrigger>
                  <DrawerContent>{guestsContent}</DrawerContent>
                </Drawer>
              ) : (
                <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                  <PopoverTrigger asChild>{guestsTrigger}</PopoverTrigger>
                  <PopoverContent className="w-[320px] p-0 pointer-events-auto" align="center" side="top" sideOffset={8}>{guestsContent}</PopoverContent>
                </Popover>
              )}
            </div>
            <button onClick={handleSearch} disabled={!dateRange?.from || !dateRange?.to || loading}
              className={cn("bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-body font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl shrink-0 disabled:opacity-50 disabled:cursor-not-allowed", isMobile ? "w-full px-3 py-2.5 text-xs" : "px-6 py-3 text-sm")}>
              {loading ? <Loader2 size={isMobile ? 16 : 18} className="animate-spin" /> : <Search size={isMobile ? 16 : 18} />}
              <span>Consultar</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CounterRow = ({ label, sublabel, value, onDecrement, onIncrement, min }: {
  label: string; sublabel?: string; value: number; onDecrement: () => void; onIncrement: () => void; min: number;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {sublabel && <span className="block text-[11px] text-muted-foreground">{sublabel}</span>}
    </div>
    <div className="flex items-center gap-3">
      <button onClick={onDecrement} disabled={value <= min} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><Minus size={14} /></button>
      <span className="text-sm font-semibold text-foreground w-4 text-center">{value}</span>
      <button onClick={onIncrement} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"><Plus size={14} /></button>
    </div>
  </div>
);

export default FloatingBookingBar;
