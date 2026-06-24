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

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>Blog | Esmeralda Apart — Alquiler temporario en Marcos Juárez</title>
        <meta name="description" content="Consejos, guías y novedades sobre alquiler temporario y alojamiento en Marcos Juárez, Córdoba. Aprendé a elegir, ahorrar y disfrutar tu estadía." />
        <link rel="canonical" href="https://esmeraldaapart.com.ar/blog" />
        <meta property="og:title" content="Blog | Esmeralda Apart" />
        <meta property="og:url" content="https://esmeraldaapart.com.ar/blog" />
        <meta property="og:type" content="website" />
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
