import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const DEFAULT_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms?currency=ARS&language=es-ES&rp=";

interface BookingSectionProps {
  iframeUrl?: string;
}

const BookingSection = ({ iframeUrl }: BookingSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/iframe-resizer.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://frame2.hotelpms.io/BookingFrameClient/public/assets/booking-frame/js/main.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const src = iframeUrl || DEFAULT_URL;

  return (
    <section id="reservar" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">
            Planificá tu estadía
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Consultar Disponibilidad
          </h2>
          <div className="w-16 h-[2px] bg-primary mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-card rounded-sm shadow-xl border border-border p-4 md:p-8"
        >
          <iframe
            id="hw-booking-frame"
            src={src}
            frameBorder="0"
            allowTransparency={true}
            scrolling="no"
            style={{ width: "100%", minHeight: "600px" }}
            title="Reservar departamento"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
