import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import HubBreadcrumbs from "@/components/hub/HubBreadcrumbs";
import HubCta from "@/components/hub/HubCta";
import { SITE, clusterIcons, clusters, getEntriesByCluster, hubEntries } from "@/content/hub";

const TITLE = "Guía de Marcos Juárez: alojamiento, turismo, empresas y eventos";
const DESCRIPTION =
  "La guía más completa de Marcos Juárez, Córdoba: dónde alojarse, qué hacer, empresas e instituciones, eventos, la Au Ruta 9 y servicios del alojamiento.";

/** Hub index: entry point to every topic cluster. */
const HubIndex = () => {
  const [barHeight, setBarHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);
  const url = `${SITE}/guias`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url,
    hasPart: clusters.map((c) => ({
      "@type": "WebPage",
      name: c.title,
      url: `${SITE}/${c.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{TITLE} | Esmeralda Apart</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="guía Marcos Juárez, alojamiento Marcos Juárez, turismo Marcos Juárez, empresas Marcos Juárez, eventos Marcos Juárez"
        />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-28 px-6">
        <div className="container mx-auto max-w-5xl">
          <HubBreadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Guías" }]} />

          <header className="mb-10">
            <p className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-3">
              {hubEntries.length} guías locales
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight mb-4">
              Guía completa de Marcos Juárez
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl">{DESCRIPTION}</p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {clusters.map((c) => {
              const Icon = clusterIcons[c.key];
              const entries = getEntriesByCluster(c.key);
              return (
                <section key={c.key} className="rounded-2xl border border-border p-6">
                  <h2 className="flex items-center gap-2 font-display text-xl text-foreground mb-2">
                    <Icon size={18} className="text-primary" />
                    <Link to={`/${c.slug}`} className="hover:text-primary transition-colors">
                      {c.name}
                    </Link>
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mb-4">{c.intro}</p>
                  <ul className="space-y-2">
                    {entries.slice(0, 6).map((e) => (
                      <li key={e.slug}>
                        <Link
                          to={`/${e.cluster}/${e.slug}`}
                          className="font-body text-sm text-foreground/85 hover:text-primary transition-colors"
                        >
                          {e.h1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/${c.slug}`}
                    className="mt-4 inline-block font-body text-xs text-primary hover:underline"
                  >
                    Ver las {entries.length} guías de {c.name.toLowerCase()}
                  </Link>
                </section>
              );
            })}
          </div>

          <HubCta />
        </div>
      </main>

      <Footer />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight} />
    </div>
  );
};

export default HubIndex;
