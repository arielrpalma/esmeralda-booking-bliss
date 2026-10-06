import { useEffect, useRef } from "react";

// Multiapart booking widget (custom element) rendered in the fixed footer bar.
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

const SCRIPT_SRC = "https://app.multiapart.com/embed.js";

const FloatingBookingBar = ({ onHeightChange }: { onHeightChange?: (height: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the Multiapart embed script once
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // Report bar height so other floating elements (WhatsApp) can position themselves
  useEffect(() => {
    if (!containerRef.current || !onHeightChange) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => onHeightChange(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeightChange]);

  // Other pages can request focus on the booking bar
  useEffect(() => {
    const open = () => containerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    window.addEventListener("motoviajeros:open-booking", open);
    return () => window.removeEventListener("motoviajeros:open-booking", open);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-md px-2 py-2"
    >
      <div className="mx-auto max-w-5xl">
        <hotel-booking hotel="esmeralda-apart" mode="searchbar" lang="es" currency="USD"></hotel-booking>
      </div>
    </div>
  );
};

export default FloatingBookingBar;
