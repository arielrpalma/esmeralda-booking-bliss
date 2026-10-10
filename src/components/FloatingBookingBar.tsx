import { useEffect, useRef } from "react";

// Multiapart official booking searchbar (custom element with its own popup).
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "hotel-booking": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        hotel?: string;
        mode?: string;
        lang?: string;
        currency?: string;
        "primary-color"?: string;
      };
    }
  }
}

const MULTIAPART_SCRIPT = "https://app.multiapart.com/embed.js";

const FloatingBookingBar = ({ onHeightChange }: { onHeightChange?: (height: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Load the Multiapart script only once per page
  useEffect(() => {
    if (!document.querySelector(`script[src="${MULTIAPART_SCRIPT}"]`)) {
      const s = document.createElement("script");
      s.src = MULTIAPART_SCRIPT;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // Report real bar height so the WhatsApp button stays above it
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const report = () => onHeightChange?.(el.offsetHeight);
    report();
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeightChange]);

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-50 bg-section-dark/95 backdrop-blur-xl border-t border-section-dark-foreground/10 px-3 py-3"
    >
      <div className="container mx-auto">
        <hotel-booking hotel="esmeralda-apart" mode="searchbar" lang="es" currency="ARS" primary-color="#008a7a" />
      </div>
    </div>
  );
};

export default FloatingBookingBar;
