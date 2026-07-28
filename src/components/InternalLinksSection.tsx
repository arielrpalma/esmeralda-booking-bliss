import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Trophy, MapPinned, Heart, BookOpen } from "lucide-react";
import { posts } from "@/content/posts";
import { clusters, getEntriesByCluster } from "@/content/hub";


// SEO internal-linking hub: connects the home page with the persona landings
// and the most relevant blog articles (topical clusters around Marcos Juárez).
const landings = [
  { to: "/alojamiento/trabajo", icon: Briefcase, title: "Alojamiento para empresas y viajantes", text: "Factura A/B, WiFi premium y check-in a cualquier hora." },
  { to: "/alojamiento/torneo", icon: Trophy, title: "Alojamiento para torneos y delegaciones", text: "Grupos, horarios flexibles y cochera para el traslado." },
  { to: "/alojamiento/ruta-9", icon: MapPinned, title: "Alojamiento sobre la Au Ruta 9", text: "Parada segura a minutos de la autopista Rosario–Córdoba." },
  { to: "/alojamiento/familia", icon: Heart, title: "Departamentos para familias", text: "Cocina equipada, espacio y comodidad para visitar la zona." },
];

const InternalLinksSection = () => {
  const featured = posts.slice(0, 4);

  return (
    <section id="guias" className="py-20 px-6 bg-muted/40" aria-labelledby="guias-title">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-3">Explorá el sitio</p>
          <h2 id="guias-title" className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Encontrá tu alojamiento en Marcos Juárez
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Elegí la página según tu motivo de viaje o leé nuestras guías sobre hospedaje,
            alquiler temporario y departamentos por día en Marcos Juárez y la región.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-14">
          {landings.map(({ to, icon: Icon, title, text }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/60 hover:shadow-lg transition-all"
            >
              <span className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={20} className="text-primary" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-lg text-foreground group-hover:text-primary transition-colors">
                  {title}
                </span>
                <span className="block font-body text-sm text-muted-foreground mt-1">{text}</span>
              </span>
              <ArrowRight size={18} className="ml-auto shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </Link>
          ))}
        </div>

        {/* Topic-cluster pillar pages + their main child pages (deep internal linking) */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-foreground">
              Guía completa de Marcos Juárez
            </h3>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Alojamiento, turismo, gastronomía, empresas, eventos, deportes, educación, servicios y la Au Ruta 9.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {clusters.map((c) => {
              const entries = getEntriesByCluster(c.key).slice(0, 3);
              return (
                <div key={c.slug} className="rounded-2xl bg-card border border-border p-5">
                  <Link
                    to={`/${c.slug}`}
                    className="font-display text-base text-foreground hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                  <ul className="mt-3 space-y-1.5">
                    {entries.map((e) => (
                      <li key={e.slug}>
                        <Link
                          to={`/${e.cluster}/${e.slug}`}
                          className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {e.h1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/guias"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Ver todas las guías <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>


        <div className="text-center mb-8">
          <h3 className="text-2xl font-display font-semibold text-foreground">
            Guías sobre hospedaje en Marcos Juárez
          </h3>
        </div>


        <ul className="grid gap-3 md:grid-cols-2">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/blog/${p.slug}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/60 transition-colors font-body text-sm text-foreground"
              >
                <BookOpen size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span>{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity"
          >
            Ver todas las guías del blog <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InternalLinksSection;
