import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { personaList } from "@/content/personas";
import { trackIntentSelect } from "@/lib/analytics";

const IntentSelector = () => {
  return (
    <section id="motivo-viaje" className="py-16 md:py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold">
            Encontrá tu apart ideal
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mt-3 mb-3">
            ¿Por qué venís a Marcos Juárez?
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Elegí tu motivo y te mostramos los beneficios pensados para vos.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {personaList.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/alojamiento/${p.slug}`}
                  onClick={() => trackIntentSelect(p.key)}
                  className="group relative h-full flex flex-col justify-between bg-card border border-border rounded-2xl p-5 md:p-6 hover:border-primary/60 hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-colors" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center mb-4 transition-colors">
                      <Icon className="text-primary" size={24} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-lg md:text-xl text-foreground mb-1.5 leading-tight">
                      {p.cardTitle}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-body mb-4">
                      {p.cardLabel}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.cardChips.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] md:text-xs font-body"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="relative inline-flex items-center gap-1.5 text-xs md:text-sm font-body text-primary group-hover:gap-2.5 transition-all">
                    Ver beneficios <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IntentSelector;
