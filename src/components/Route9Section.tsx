import { motion } from "framer-motion";
import { MapPin, Clock, Fuel } from "lucide-react";

const Route9Section = () => {
  return (
    <section id="ruta-9" className="py-20 px-6 bg-section-dark">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold">
            Au Ruta9
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-section-dark-foreground mt-3 mb-5">
            Parada ideal sobre Au Ruta9
          </h2>
          <p className="text-section-dark-foreground/75 font-body leading-relaxed mb-7">
            Descansá hoy, seguí viaje mañana. A pocos minutos del acceso a Au Ruta9,
            con cochera privada, check-in 24 h y todo lo que necesitás para parar tranquilo
            entre Buenos Aires, Rosario, Córdoba o el NOA.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3 text-section-dark-foreground/85 font-body">
              <Clock className="text-primary shrink-0 mt-0.5" size={20} />
              <span><strong className="text-section-dark-foreground">A 5 minutos</strong> del acceso a Au Ruta9.</span>
            </li>
            <li className="flex items-start gap-3 text-section-dark-foreground/85 font-body">
              <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
              <span><strong className="text-section-dark-foreground">Centro de Marcos Juárez</strong> — restaurantes y estaciones cerca.</span>
            </li>
            <li className="flex items-start gap-3 text-section-dark-foreground/85 font-body">
              <Fuel className="text-primary shrink-0 mt-0.5" size={20} />
              <span><strong className="text-section-dark-foreground">Cargás combustible, descansás y seguís</strong> sin demoras.</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-section-dark-foreground/10 aspect-[4/3] lg:aspect-auto lg:h-[420px]"
        >
          <iframe
            title="Ubicación Esmeralda Apart sobre Au Ruta9 - Marcos Juárez"
            src="https://www.google.com/maps?q=9%20de%20Julio%20262%2C%20Marcos%20Ju%C3%A1rez%2C%20C%C3%B3rdoba&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Route9Section;
