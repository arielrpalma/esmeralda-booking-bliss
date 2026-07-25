import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { ArrowLeft, Car, Footprints, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import HubBreadcrumbs from "@/components/hub/HubBreadcrumbs";
import HubBlocks from "@/components/hub/HubBlocks";
import HubFaqs from "@/components/hub/HubFaqs";
import HubCta from "@/components/hub/HubCta";
import { SITE, getCluster, getEntry, getEntryByRef } from "@/content/hub";
import { getPostBySlug } from "@/content/posts";

/** Detail page of a topic-cluster entry. */
const HubEntryPage = ({ clusterSlug }: { clusterSlug?: string }) => {
  const params = useParams<{ cluster: string; slug: string }>();
  const clusterKey = clusterSlug ?? params.cluster;
  const entry = clusterKey && params.slug ? getEntry(clusterKey, params.slug) : undefined;
  const cluster = clusterKey ? getCluster(clusterKey) : undefined;
  const [barHeight, setBarHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);

  if (!entry || !cluster) return <Navigate to="/" replace />;

  const url = `${SITE}/${entry.cluster}/${entry.slug}`;
  const related = (entry.related ?? []).map(getEntryByRef).filter(Boolean);
  const relatedPosts = (entry.relatedPosts ?? []).map(getPostBySlug).filter(Boolean);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.h1,
    description: entry.description,
    image: `${SITE}${entry.image}`,
    dateModified: entry.updatedAt,
    author: { "@type": "Organization", name: "Esmeralda Apart" },
    publisher: { "@type": "Organization", name: "Esmeralda Apart" },
    mainEntityOfPage: url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: cluster.name, item: `${SITE}/${cluster.slug}` },
      { "@type": "ListItem", position: 3, name: entry.h1, item: url },
    ],
  };

  const faqJsonLd = entry.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: entry.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{entry.title} | Esmeralda Apart</title>
        <meta name="description" content={entry.description} />
        <meta name="keywords" content={entry.keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={entry.title} />
        <meta property="og:description" content={entry.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${SITE}${entry.image}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={entry.title} />
        <meta name="twitter:description" content={entry.description} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
      </Helmet>

      <Navbar />

      <main className="pt-28 px-6">
        <div className="container mx-auto max-w-3xl">
          <HubBreadcrumbs
            items={[{ name: "Inicio", href: "/" }, { name: cluster.name, href: `/${cluster.slug}` }, { name: entry.h1 }]}
          />

          <article>
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight mb-4">
                {entry.h1}
              </h1>
              <p className="font-body text-lg text-muted-foreground">{entry.description}</p>
            </header>

            <p className="font-body text-foreground/85 leading-relaxed bg-muted/50 border border-border rounded-xl p-5 mb-10">
              {entry.snippet}
            </p>

            <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-10">
              <img
                src={entry.image}
                alt={`${entry.h1} — Esmeralda Apart, Marcos Juárez`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <HubBlocks blocks={entry.body} />

            {entry.place && (
              <section className="mt-12">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
                  Ubicación y distancia desde Esmeralda Apart
                </h2>
                <ul className="grid gap-3 sm:grid-cols-3 mb-5">
                  <li className="rounded-xl border border-border p-4 font-body text-sm">
                    <MapPin size={16} className="text-primary mb-2" />
                    <span className="block text-muted-foreground">Distancia</span>
                    <strong className="text-foreground">{entry.place.distanceKm}</strong>
                  </li>
                  <li className="rounded-xl border border-border p-4 font-body text-sm">
                    <Car size={16} className="text-primary mb-2" />
                    <span className="block text-muted-foreground">En auto</span>
                    <strong className="text-foreground">{entry.place.driveMinutes}</strong>
                  </li>
                  <li className="rounded-xl border border-border p-4 font-body text-sm">
                    <Footprints size={16} className="text-primary mb-2" />
                    <span className="block text-muted-foreground">Caminando</span>
                    <strong className="text-foreground">{entry.place.walkMinutes}</strong>
                  </li>
                </ul>
                <p className="font-body text-sm text-muted-foreground mb-4">{entry.place.address}</p>
                <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                  <iframe
                    title={`Mapa de ${entry.h1} en Marcos Juárez`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(entry.place.mapQuery)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>
              </section>
            )}

            <HubFaqs faqs={entry.faqs} />

            <HubCta />
          </article>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">Seguí explorando</h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {related.map((r) => (
                  <li key={`${r!.cluster}/${r!.slug}`}>
                    <Link
                      to={`/${r!.cluster}/${r!.slug}`}
                      className="block rounded-xl border border-border p-4 font-body text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      {r!.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedPosts.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">Del blog</h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {relatedPosts.map((p) => (
                  <li key={p!.slug}>
                    <Link
                      to={`/blog/${p!.slug}`}
                      className="block rounded-xl border border-border p-4 font-body text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      {p!.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link
            to={`/${cluster.slug}`}
            className="mt-12 inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Volver a {cluster.name}
          </Link>
        </div>
      </main>

      <Footer />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight} />
    </div>
  );
};

export default HubEntryPage;
