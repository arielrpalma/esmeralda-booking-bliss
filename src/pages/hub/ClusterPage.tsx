import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import HubBreadcrumbs from "@/components/hub/HubBreadcrumbs";
import HubCta from "@/components/hub/HubCta";
import { SITE, clusterIcons, clusters, getCluster, getEntriesByCluster } from "@/content/hub";

/** Pillar page of a topic cluster: intro, snippet and the full list of child pages. */
const ClusterPage = ({ clusterSlug }: { clusterSlug?: string }) => {
  const params = useParams<{ cluster: string }>();
  const slug = clusterSlug ?? params.cluster;
  const cluster = slug ? getCluster(slug) : undefined;
  const [barHeight, setBarHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);

  if (!cluster) return <Navigate to="/" replace />;

  const entries = getEntriesByCluster(cluster.key);
  const url = `${SITE}/${cluster.slug}`;
  const Icon = clusterIcons[cluster.key];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: cluster.name, item: url },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cluster.title,
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.h1,
      url: `${SITE}/${e.cluster}/${e.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{cluster.title} | Esmeralda Apart</title>
        <meta name="description" content={cluster.description} />
        <meta name="keywords" content={cluster.keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={cluster.title} />
        <meta property="og:description" content={cluster.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-28 px-6">
        <div className="container mx-auto max-w-4xl">
          <HubBreadcrumbs items={[{ name: "Inicio", href: "/" }, { name: cluster.name }]} />

          <header className="mb-8">
            <p className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.3em] text-primary mb-3">
              <Icon size={14} /> Guía Marcos Juárez
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight mb-4">
              {cluster.title}
            </h1>
            <p className="font-body text-lg text-muted-foreground">{cluster.intro}</p>
          </header>

          <p className="font-body text-foreground/85 leading-relaxed bg-muted/50 border border-border rounded-xl p-5 mb-10">
            {cluster.snippet}
          </p>

          <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
            Todo sobre {cluster.name.toLowerCase()} en Marcos Juárez
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {entries.map((e) => (
              <li key={e.slug}>
                <Link
                  to={`/${e.cluster}/${e.slug}`}
                  className="group block h-full rounded-xl border border-border p-5 hover:border-primary hover:shadow-md transition-all"
                >
                  <p className="font-display text-base text-foreground group-hover:text-primary transition-colors mb-2">
                    {e.h1}
                  </p>
                  <p className="font-body text-sm text-muted-foreground line-clamp-3">{e.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-body text-primary">
                    Leer más <ArrowRight size={12} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <HubCta />

          <section className="mt-16">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Otras guías de Marcos Juárez</h2>
            <div className="flex flex-wrap gap-3">
              {clusters
                .filter((c) => c.key !== cluster.key)
                .map((c) => (
                  <Link
                    key={c.key}
                    to={`/${c.slug}`}
                    className="rounded-full border border-border px-4 py-2 font-body text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              <Link
                to="/blog"
                className="rounded-full border border-border px-4 py-2 font-body text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight} />
    </div>
  );
};

export default ClusterPage;
