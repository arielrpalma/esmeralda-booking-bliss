import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, Sofa, BedDouble } from "lucide-react";

const amenities = [
  {
    icon: UtensilsCrossed,
    title: "Cocina",
    items: ["Cocina completa", "Heladera", "Microondas", "Pava eléctrica", "Tostadora", "Juego de vajilla y batería", "Utensilios de cocina"],
  },
  {
    icon: Sofa,
    title: "Living",
    items: ["Mesa y sillas para 4", "2 Puff", "Sillón cama", "TV con PlaymeTV", "Netflix", "YouTube", "Disney+ y otros"],
  },
  {
    icon: BedDouble,
    title: "Dormitorio",
    items: ["Habitación privada", "Ropa blanca premium", "Aire acondicionado", "Vestidor", "Baño principal completo"],
  },
];

const AmenitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/amenities.jpg"
              alt="Interior departamento"
              className="w-full rounded-sm shadow-2xl"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">
              Todo incluido
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-10">
              Equipamiento completo
            </h2>

            <div className="space-y-8">
              {amenities.map((a) => (
                <div key={a.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <a.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-2">
                      {a.title}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {a.items.join(" · ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
