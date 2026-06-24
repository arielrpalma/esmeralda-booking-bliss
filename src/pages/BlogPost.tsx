import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import { getPostBySlug, posts, type Block } from "@/content/posts";

const renderBlock = (block: Block, i: number) => {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="text-2xl md:text-3xl font-display font-semibold text-foreground mt-10 mb-4">{block.text}</h2>;
    case "h3":
      return <h3 key={i} className="text-xl font-display font-semibold text-foreground mt-8 mb-3">{block.text}</h3>;
    case "p":
      return <p key={i} className="font-body text-foreground/85 leading-relaxed mb-4">{block.text}</p>;
    case "ul":
      return (
        <ul key={i} className="font-body text-foreground/85 list-disc pl-6 mb-6 space-y-2">
          {block.items.map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="font-body text-foreground/85 list-decimal pl-6 mb-6 space-y-2">
          {block.items.map((it, j) => <li key={j}>{it}</li>)}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={i} className="border-l-4 border-primary bg-primary/5 px-6 py-5 rounded-r-lg my-8 font-body italic text-foreground">
          {block.text}
        </blockquote>
      );
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [barHeight, setBarHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);

  if (!post) return <Navigate to="/blog" replace />;

  const url = `https://esmeraldaapart.com.ar/blog/${post.slug}`;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://esmeraldaapart.com.ar${post.image}`,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Esmeralda Apart" },
    publisher: { "@type": "Organization", name: "Esmeralda Apart" },
    mainEntityOfPage: url,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://esmeraldaapart.com.ar/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://esmeraldaapart.com.ar/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{post.title} | Esmeralda Apart</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://esmeraldaapart.com.ar${post.image}`} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="pt-28 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft size={16} /> Volver al blog
          </Link>

          <article>
            <header className="mb-8">
              <p className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-3">
                {new Date(post.publishedAt).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })} · {post.readingMinutes} min
              </p>
              <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight mb-4">
                {post.title}
              </h1>
              <p className="font-body text-lg text-muted-foreground">{post.description}</p>
            </header>

            <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-10">
              <img
                src={post.image}
                alt={`${post.title} — Esmeralda Apart, Marcos Juárez`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose-custom">
              {post.body.map(renderBlock)}
            </div>

            <div className="mt-12 p-6 md:p-8 rounded-2xl bg-section-dark text-section-dark-foreground flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
              <div>
                <p className="font-display text-xl mb-1">Reservá directo y pagá menos</p>
                <p className="font-body text-sm text-section-dark-foreground/80">
                  Mejor precio garantizado sin comisiones de Booking ni Airbnb.
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-body text-sm hover:opacity-90 transition">
                  Reservá ahora <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/5493472433334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-section-dark-foreground/10 px-5 py-3 rounded-lg font-body text-sm hover:bg-section-dark-foreground/20 transition"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </article>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">Seguí leyendo</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden rounded-xl mb-3">
                      <img src={r.image} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="font-display text-sm text-foreground group-hover:text-primary transition-colors">
                      {r.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight} />
    </div>
  );
};

export default BlogPost;
