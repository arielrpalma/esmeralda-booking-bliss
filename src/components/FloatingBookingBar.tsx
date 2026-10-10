import { useEffect } from "react";

// Multiapart embedded booking engine (replaces the old floating bottom bar).
const ENGINE_URL =
  "https://app.multiapart.com/embed/engine?hotel=esmeralda-apart&lang=es&currency=ARS";

const FloatingBookingBar = ({ onHeightChange }: { onHeightChange?: (height: number) => void }) => {
  useEffect(() => {
    // No fixed bar occupies the bottom of the screen anymore.
    onHeightChange?.(0);
  }, [onHeightChange]);

  return (
    <section id="reservar" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">Reservá directo</p>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Consultar disponibilidad
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto" />
        </div>
        <div className="max-w-6xl mx-auto">
          <iframe
            id="multiapart-booking"
            src={ENGINE_URL}
            style={{ width: "100%", minHeight: 900, border: 0 }}
            loading="lazy"
            title="Reservas"
          />
        </div>
      </div>
    </section>
  );
};

export default FloatingBookingBar;
