import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface MundialBannerProps {
  bottomOffset: number;
  onHeightChange?: (height: number) => void;
}

const MundialBanner = ({ bottomOffset, onHeightChange }: MundialBannerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !onHeightChange) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      onHeightChange(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    onHeightChange(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, [onHeightChange]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ bottom: bottomOffset }}
      className="fixed left-0 right-0 z-40 pointer-events-none"
    >
      <div className="pointer-events-auto bg-section-dark/95 backdrop-blur-md border-t border-accent/40 shadow-2xl overflow-visible">
        <div className="container mx-auto px-3 py-2 md:py-2.5 flex items-center justify-center gap-2 md:gap-3 flex-nowrap">
          {/* DirecTV Go logo - already transparent */}
          <img
            src="/images/directv-go.png"
            alt="DirecTV Go"
            className="h-5 md:h-6 w-auto object-contain shrink-0 drop-shadow-[0_0_16px_rgba(255,255,255,0.45)]"
          />

          {/* Vertical separator */}
          <div className="h-4 md:h-5 w-px bg-accent/40 shrink-0" />

          {/* Text */}
          <p className="font-body text-[11px] md:text-sm text-section-dark-foreground text-center leading-tight min-w-0">
            Mirá todos los partidos del{" "}
            <span className="font-display italic text-accent font-semibold">
              Mundial
            </span>{" "}
            por streaming en nuestros departamentos
          </p>

          {/* Mundial trophy - calado, sólo el trofeo dorado */}
          <img
            src="/images/mundial-logo.png"
            alt="Copa Mundial FIFA"
            className="h-7 md:h-9 w-auto object-contain shrink-0 drop-shadow-[0_0_8px_rgba(212,161,74,0.3)]"
          />
        </div>
      </div>

    </motion.div>
  );
};

export default MundialBanner;
