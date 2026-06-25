import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import { useState, useCallback } from "react";
import { posts } from "@/content/posts";

const Blog = () => {
  const [barHeight, setBarHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://esmeraldaapart.com.ar/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>Blog · Alquiler temporario en Marcos Juárez | Esmeralda Apart</title>
        <meta name="description" content="Guías y consejos sobre alquiler temporario en Marcos Juárez: zonas, precios, viajantes, mascotas y reservas directas sin comisiones." />
        <link rel="canonical" href="https://esmeraldaapart.com.ar/blog" />
        <meta property="og:title" content="Blog · Esmeralda Apart" />
        <meta property="og:description" content="Guías y consejos sobre alquiler temporario en Marcos Juárez, Córdoba." />
        <meta property="og:url" content="https://esmeraldaapart.com.ar/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://esmeraldaapart.com.ar/images/hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://esmeraldaapart.com.ar/images/hero.jpg" />
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-12 text-center">
            <p className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-3">Blog</p>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
              Alojamiento y alquiler temporario en Marcos Juárez
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Guías prácticas, consejos para viajeros y empresas, y todo lo que necesitás saber para elegir tu estadía en Marcos Juárez, Córdoba.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={`${post.title} — Esmeralda Apart, Marcos Juárez`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-body text-muted-foreground mb-2">
                      {new Date(post.publishedAt).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })} · {post.readingMinutes} min de lectura
                    </p>
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-body text-primary">
                      Leer artículo <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight} />
    </div>
  );
};

export default Blog;
