import { Search, CalendarDays, Plus, Minus, Users, Check, X, Loader2, ArrowRight, Clock, CalendarPlus } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import type { DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { trackCheckAvailability, trackBookingStart } from "@/lib/analytics";
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

// Multiapart booking widget (custom element) used in the booking overlay.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "hotel-booking": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        hotel?: string;
        mode?: string;
        lang?: string;
        currency?: string;
      };
    }
  }
}

const MULTIAPART_SCRIPT = "https://app.multiapart.com/embed.js";

// Brand overrides injected into the widget's open shadow root so it matches the previous dark/emerald bar.
const MULTIAPART_THEME = `
*{font-family:'Raleway',system-ui,sans-serif !important}
.bar{background:transparent !important;border:0 !important;box-shadow:none !important;padding:0 !important;gap:10px !important;align-items:stretch !important}
.bar label{color:hsl(var(--section-dark-foreground) / .6) !important;background:hsl(var(--section-dark-foreground) / .1);border-radius:8px;padding:6px 10px;font-size:10px !important;font-weight:600;letter-spacing:.08em;text-transform:uppercase;gap:2px;min-width:110px !important}
.bar input{background:transparent !important;border:0 !important;padding:2px 0 !important;color:hsl(var(--section-dark-foreground)) !important;font-size:14px !important;color-scheme:dark;outline:none}
.bar .btn,.btn{background:hsl(var(--primary)) !important;color:hsl(var(--primary-foreground)) !important;border-radius:8px !important;text-transform:uppercase;letter-spacing:.08em;font-weight:600;box-shadow:0 10px 15px -3px rgba(0,0,0,.3)}
.bar .btn:hover{background:hsl(var(--primary) / .9) !important;opacity:1 !important}
.modal{position:fixed !important;inset:0 !important;width:100vw !important;height:100dvh !important;padding:16px !important;overflow:hidden !important}
.modal iframe{display:block !important;width:100% !important;max-width:1120px !important;height:calc(100dvh - 32px) !important;max-height:calc(100dvh - 32px) !important;overflow:auto !important}
.close{position:fixed !important;top:max(10px,env(safe-area-inset-top)) !important;right:max(14px,env(safe-area-inset-right)) !important}
@media (max-width:767px){.bar{gap:6px !important}.bar label{min-width:calc(50% - 3px) !important;flex:1 1 calc(50% - 3px) !important}.bar .btn{width:100%;padding:10px !important;font-size:12px}.modal{padding:0 !important}.modal iframe{max-width:none !important;height:100dvh !important;max-height:100dvh !important;border-radius:0 !important}}
`;

const MultiapartSearchbar = ({ onModalChange }: { onModalChange: (open: boolean) => void }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let tries = 0;
    let observer: MutationObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const apply = () => {
      const root = ref.current?.shadowRoot;
      if (root) {
        if (!root.querySelector("style[data-brand]")) {
          const st = document.createElement("style");
          st.setAttribute("data-brand", "");
          st.textContent = MULTIAPART_THEME;
          root.appendChild(st);
        }
        const updateModalState = () => onModalChange(Boolean(root.querySelector(".modal")));
        updateModalState();
        observer = new MutationObserver(updateModalState);
        observer.observe(root, { childList: true, subtree: true });
        return;
      }
      if (tries++ < 50) timer = setTimeout(apply, 100);
    };
    apply();
    return () => {
      if (timer) clearTimeout(timer);
      observer?.disconnect();
      onModalChange(false);
    };
  }, [onModalChange]);
  return (
    <hotel-booking ref={ref} hotel="esmeralda-apart" mode="searchbar" lang="es" currency="USD"
      style={{ display: "block" }} />
  );
};

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

const FloatingBookingBar = ({ onHeightChange }: { onHeightChange?: (height: number) => void }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [calendarOpen, setCalendarOpenRaw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCalendarOpen, setRetryCalendarOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [multiapartModalOpen, setMultiapartModalOpen] = useState(false);
  const handleMultiapartModalChange = useCallback((open: boolean) => setMultiapartModalOpen(open), []);

  // Load the Multiapart embed script once
  useEffect(() => {
    if (document.querySelector(`script[src="${MULTIAPART_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = MULTIAPART_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure total height of the floating bar (bar + banner) and report it
  useEffect(() => {
    if (!onHeightChange) return;

    const measure = () => {
      if (containerRef.current) {
        onHeightChange(containerRef.current.getBoundingClientRect().height);
      }
    };

    // Measure now, after animations, and whenever the bar (incl. the Multiapart widget) resizes
    measure();
    const timers = [
      setTimeout(measure, 50),
      setTimeout(measure, 350),
      setTimeout(measure, 600),
      setTimeout(measure, 1500),
    ];
    const ro = containerRef.current ? new ResizeObserver(measure) : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);

    return () => { timers.forEach(clearTimeout); ro?.disconnect(); };
  }, [result, loading, onHeightChange]);

  const setCalendarOpen = (open: boolean) => {
    if (open) { setDateRange(undefined); setResult(null); setError(null); }
    setCalendarOpenRaw(open);
  };

  // Allow other pages (e.g. Motoviajeros) to open the booking calendar via a custom event
  useEffect(() => {
    const openBooking = () => {
      setResult(null);
      setError(null);
      setDateRange(undefined);
      setCalendarOpenRaw(true);
    };
    window.addEventListener("motoviajeros:open-booking", openBooking);
    return () => window.removeEventListener("motoviajeros:open-booking", openBooking);
  }, []);

  // Capacity: up to 4 guests occupying a bed (adults + children). Babies (<1) don't count.
  const MAX_GUESTS = 4;
  const MAX_BABIES = 2;
  const totalGuests = adults + children + babies;
  const bedGuests = adults + children;
  const canAddMore = bedGuests < MAX_GUESTS;

  const checkAvailability = async (checkin: string, checkout: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    trackCheckAvailability(checkin, checkout, totalGuests);
    try {
      const { data, error } = await supabase.functions.invoke("check-availability", {
        body: { checkin, checkout },
      });
      if (error) throw error;
      setResult(data as AvailabilityResult);
    } catch (err) {
      console.error("Availability check failed:", err);
      setError("No pudimos consultar la disponibilidad. Intentá de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  };

  // Opens the Multiapart engine directly; asks for dates first if missing.
  const handleSearch = () => {
    if (!dateRange?.from || !dateRange?.to) { setCalendarOpenRaw(true); return; }
    openBookingEngine(format(dateRange.from, "yyyy-MM-dd"), format(dateRange.to, "yyyy-MM-dd"));
  };

  // Opens the Multiapart booking widget in a full-screen overlay
  const openBookingEngine = (checkin: string, checkout: string, nights?: number) => {
    trackBookingStart(checkin, checkout, totalGuests, nights ?? 0);
    setBookingOpen(true);
  };

  const handleBookNow = () => {
    if (!dateRange?.from || !dateRange?.to) return;
    openBookingEngine(
      format(dateRange.from, "yyyy-MM-dd"),
      format(dateRange.to, "yyyy-MM-dd"),
      result?.nights,
    );
  };

  const handleSelectSuggestion = (s: Suggestion) => {
    setDateRange({
      from: new Date(s.checkin + "T00:00:00"),
      to: new Date(s.checkout + "T00:00:00"),
    });
    openBookingEngine(s.checkin, s.checkout, s.nights);
  };

  const dismissResult = () => { setResult(null); setError(null); setRetryCalendarOpen(false); };

  const [retryDateRange, setRetryDateRange] = useState<DateRange | undefined>();

  const handleRetryDateSelect = (range: DateRange | undefined) => {
    setRetryDateRange(range);
    if (range?.from && range?.to) {
      setRetryCalendarOpen(false);
      setDateRange(range);
      checkAvailability(format(range.from, "yyyy-MM-dd"), format(range.to, "yyyy-MM-dd"));
    }
  };

  const retryDefaultMonth = dateRange?.from ?? (result?.checkin ? new Date(result.checkin + "T00:00:00") : undefined);

  const retryCalendarContent = (
    <Calendar mode="range" selected={retryDateRange} onSelect={handleRetryDateSelect}
      numberOfMonths={isMobile ? 1 : 2} locale={es}
      defaultMonth={retryDefaultMonth}
      disabled={(date) => { const now = new Date(); const arHour = new Date(now.toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })).getHours(); const t = new Date(); t.setHours(0,0,0,0); if (arHour >= 22) t.setDate(t.getDate() + 1); return date < t; }}
      initialFocus className={cn("p-3 pointer-events-auto")} />
  );
  const summary = [`${adults} ${adults===1?"adulto":"adultos"}`, children?`${children} ${children===1?"menor":"menores"}`:"", babies?`${babies} ${babies===1?"bebé":"bebés"}`:""].filter(Boolean).join(" · ");
  const dateLabel = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "d MMM", { locale: es })} → ${format(dateRange.to, "d MMM yyyy", { locale: es })} · ${nightsLabel(Math.round((dateRange.to.getTime()-dateRange.from.getTime())/86400000))}`
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
      disabled={(date) => { const now = new Date(); const arHour = new Date(now.toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })).getHours(); const t = new Date(); t.setHours(0,0,0,0); if (arHour >= 22) t.setDate(t.getDate() + 1); return date < t; }}
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
      <CounterRow label="Adultos" sublabel="+4 años" value={adults} onDecrement={() => adults > 1 && setAdults(adults - 1)} onIncrement={() => canAddMore && setAdults(adults + 1)} min={1} />
      <CounterRow label="Menores" sublabel={"1 a 3 años\n(sin cama adicional)"} value={children} onDecrement={() => children > 0 && setChildren(children - 1)} onIncrement={() => canAddMore && setChildren(children + 1)} min={0} />
      <CounterRow label="Bebés" sublabel={"< 1 año\n(no ocupan plaza)"} value={babies} onDecrement={() => babies > 0 && setBabies(babies - 1)} onIncrement={() => babies < MAX_BABIES && setBabies(babies + 1)} min={0} />
      {!canAddMore && (
        <p className="text-[11px] text-muted-foreground text-center">Máximo 4 huéspedes por departamento</p>
      )}
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
        <span className={cn("font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-0.5", isMobile ? "text-[9px]" : "text-[10px] mb-1")}>Llegada · Salida</span>
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

  const showResults = !!(result || loading || error);

  return (
    <div ref={containerRef} className={cn("fixed bottom-0 left-0 right-0", multiapartModalOpen ? "z-[70]" : "z-50")}>

      {/* Main bar (always rendered, but hidden behind results when active) */}
      {!showResults && (
          <div className="bg-section-dark/95 backdrop-blur-xl border-t-2 border-primary/70 shadow-[0_-8px_40px_-4px_hsl(var(--primary)/0.55)] ring-1 ring-primary/30">
            <div className={cn("container mx-auto", isMobile ? "px-2.5 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]" : "px-4 py-3")}>
              {/* Official Multiapart searchbar widget */}
              <div className="max-w-5xl mx-auto">
                <MultiapartSearchbar onModalChange={handleMultiapartModalChange} />
              </div>
            </div>
          </div>
      )}

      {/* Results banner — replaces the bar when visible */}
      <AnimatePresence>
        {showResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}
            className="bg-card/95 backdrop-blur-xl border-t border-border/30 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]">
            <div className={cn("container mx-auto max-w-5xl", isMobile ? "px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))]" : "px-4 py-3")}>

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
                          <span className="font-bold text-foreground">{safeDateFormat(result.checkin, "d 'de' MMM")} al {safeDateFormat(result.checkout, "d 'de' MMM")} — {nightsLabel(result.nights)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleBookNow}
                        className={cn("bg-primary text-primary-foreground rounded-lg font-body font-semibold hover:bg-primary/90 transition-all shadow-md", isMobile ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm")}>
                        Reservar ahora
                      </button>
                      <button onClick={dismissResult} aria-label="Cerrar resultado de disponibilidad" className="p-1 rounded-full hover:bg-muted transition-colors">
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
                    <button onClick={dismissResult} aria-label="Cerrar mensaje de no disponibilidad" className="p-1 rounded-full hover:bg-muted transition-colors shrink-0">
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </div>

                  {/* Single row: BEFORE ← | → AFTER */}
                  {(hasBefore || hasAfter) && (
                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-hide items-center">
                      {hasBefore && result.before!.map((s, i) => <Pill key={`b-${i}`} s={s} />)}
                      {hasBefore && hasAfter && (
                        <div className="shrink-0 w-px h-8 bg-border/60 mx-1" />
                      )}
                      {hasAfter && result.after!.map((s, i) => <Pill key={`a-${i}`} s={s} variant="primary" />)}
                    </div>
                  )}

                  {/* Retry with new dates button */}
                  <div className="flex items-center gap-2">
                    {hasNoAlternatives && (
                      <div className="flex items-center gap-2 py-2 px-3 bg-muted/50 rounded-lg flex-1">
                        <Clock size={14} className="text-muted-foreground shrink-0" />
                        <span className="text-xs font-body text-muted-foreground">
                          No encontramos opciones cercanas.
                        </span>
                      </div>
                    )}
                    {isMobile ? (
                      <Drawer open={retryCalendarOpen} onOpenChange={(open) => { if (open) setRetryDateRange(undefined); setRetryCalendarOpen(open); }}>
                        <DrawerTrigger asChild>
                          <button className={cn("flex items-center gap-1.5 bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white rounded-lg font-body font-semibold transition-all shadow-md whitespace-nowrap", isMobile ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm")}>
                            <CalendarPlus size={14} />
                            <span>Otras fechas</span>
                          </button>
                        </DrawerTrigger>
                        <DrawerContent><div className="p-4 flex justify-center overflow-auto">{retryCalendarContent}</div></DrawerContent>
                      </Drawer>
                    ) : (
                      <Popover open={retryCalendarOpen} onOpenChange={(open) => { if (open) setRetryDateRange(undefined); setRetryCalendarOpen(open); }}>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-1.5 bg-[hsl(142,71%,45%)] hover:bg-[hsl(142,71%,40%)] text-white rounded-lg font-body font-semibold transition-all shadow-md whitespace-nowrap px-4 py-2 text-sm">
                            <CalendarPlus size={14} />
                            <span>Otras fechas</span>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end" side="top" sideOffset={8}>{retryCalendarContent}</PopoverContent>
                      </Popover>
                    )}
                  </div>
                </div>
              ) : error ? (
                /* ===== ERROR ===== */
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
                      <X size={14} className="text-destructive" />
                    </div>
                    <span className="text-xs sm:text-sm font-body text-muted-foreground">{error}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleSearch}
                      className={cn("bg-primary text-primary-foreground rounded-lg font-body font-semibold hover:bg-primary/90 transition-all shadow-md", isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm")}>
                      Reintentar
                    </button>
                    <button onClick={dismissResult} aria-label="Cerrar mensaje de error" className="p-1 rounded-full hover:bg-muted transition-colors shrink-0">
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ) : null}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multiapart booking engine opened directly in a modal iframe */}
      {bookingOpen && dateRange?.from && dateRange?.to && (
        <div className="fixed inset-0 z-[60] bg-section-dark/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => setBookingOpen(false)}>
          <button onClick={() => setBookingOpen(false)} aria-label="Cerrar reserva"
            className="absolute top-3 right-3 z-10 w-10 h-10 rounded-lg bg-section-dark text-section-dark-foreground flex items-center justify-center">
            <X size={20} />
          </button>
          <iframe title="Reservas"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1100px] h-[90dvh] bg-background rounded-xl border-0"
            src={`https://app.multiapart.com/sites/esmeralda-apart/reservar?${new URLSearchParams({
              embedded: "1", lang: "es", currency: "USD", plan: "", open: "1",
              checkIn: format(dateRange.from, "yyyy-MM-dd"),
              checkOut: format(dateRange.to, "yyyy-MM-dd"),
              adults: String(adults), children: String(children),
            }).toString()}`} />
        </div>
      )}
    </div>
  );
};

const CounterRow = ({ label, sublabel, value, onDecrement, onIncrement, min }: {
  label: string; sublabel?: string; value: number; onDecrement: () => void; onIncrement: () => void; min: number;
}) => (
  <div className="flex items-center justify-between">
    <div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {sublabel && <span className="block text-[11px] text-muted-foreground whitespace-pre-line leading-tight">{sublabel}</span>}
    </div>
    <div className="flex items-center gap-3">
      <button onClick={onDecrement} disabled={value <= min} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"><Minus size={14} /></button>
      <span className="text-sm font-semibold text-foreground w-4 text-center">{value}</span>
      <button onClick={onIncrement} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent transition-colors"><Plus size={14} /></button>
    </div>
  </div>
);

export default FloatingBookingBar;
