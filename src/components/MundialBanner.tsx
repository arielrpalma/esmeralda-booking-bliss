import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface MundialBannerProps {
  bottomOffset: number;
  onHeightChange?: (height: number) => void;
}

const STORAGE_KEY = "mundial-banner-dismissed";

const MundialBanner = ({ bottomOffset, onHeightChange }: MundialBannerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Read dismissed state on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setVisible(false);
  }, []);

  // Notify height changes (also when hidden -> 0)
  useEffect(() => {
    if (!onHeightChange) return;
    if (!visible) {
      onHeightChange(0);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      onHeightChange(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    onHeightChange(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, [onHeightChange, visible]);

  const handleDismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ bottom: bottomOffset }}
          className="fixed left-0 right-0 z-40 pointer-events-none"
        >
          <div className="pointer-events-auto bg-section-dark/95 backdrop-blur-md border-t border-accent/40 shadow-2xl overflow-visible">
            <div className="container mx-auto px-3 py-2 md:py-2.5 flex items-center justify-center gap-2 md:gap-3 flex-nowrap relative">
              {/* PlayMe TV logo */}
              <img
                src="/images/playmetv.png"
                alt="PlayMe TV"
                className="h-8 md:h-10 w-auto object-contain shrink-0 drop-shadow-[0_0_16px_rgba(255,255,255,0.35)]"
              />

              {/* Vertical separator */}
              <div className="h-4 md:h-5 w-px bg-accent/40 shrink-0" />

              {/* Text */}
              <p className="font-body text-[11px] md:text-sm text-section-dark-foreground text-center leading-tight min-w-0 pr-6 md:pr-8">
                Mirá todos los partidos del{" "}
                <span className="font-display italic text-accent font-semibold">
                  Mundial
                </span>{" "}
                por streaming en nuestros departamentos
              </p>

              {/* Mundial trophy */}
              <img
                src="/images/mundial-logo.png"
                alt="Copa Mundial FIFA"
                className="h-7 md:h-9 w-auto object-contain shrink-0 drop-shadow-[0_0_8px_rgba(212,161,74,0.3)]"
              />

              {/* Close button */}
              <button
                onClick={handleDismiss}
                aria-label="Cerrar banner del Mundial"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-section-dark-foreground/60 hover:text-section-dark-foreground hover:bg-section-dark-foreground/10 transition-colors"
              >
                <X size={14} strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MundialBanner;
