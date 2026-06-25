import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Quote, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { type PersonaConfig, whatsappLink } from "@/content/personas";
import { trackLandingView, trackWhatsAppClick } from "@/lib/analytics";

interface Props {
  config: PersonaConfig;
}

const PersonaLanding = ({ config }: Props) => {
  const [barHeight, setBarHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);

  useEffect(() => {
    trackLandingView(config.key);
  }, [config.key]);

  const url = `https://esmeraldaapart.com.ar/alojamiento/${config.slug}`;
  const wa = whatsappLink(config.whatsappMessage);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://esmeraldaapart.com.ar/" },
      { "@type": "ListItem", position: 2, name: "Alojamiento", item: "https://esmeraldaapart.com.ar/" },
      { "@type": "ListItem", position: 3, name: config.cardTitle, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const scrollToBooking = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{config.seoTitle}</title>
        <meta name="description" content={config.seoDescription} />
        <meta name="keywords" content={config.keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={config.seoTitle} />
        <meta property="og:description" content={config.seoDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://esmeraldaapart.com.ar${config.heroImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.seoTitle} />
        <meta name="twitter:description" content={config.seoDescription} />
        <meta name="twitter:image" content={`https://esmeraldaapart.com.ar${config.heroImage}`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <img
          src={config.heroImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <nav className="text-xs font-body text-white/70 mb-6 flex items-center gap-1.5">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white">{config.cardTitle}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="w-20 h-[2px] bg-primary mb-6" />
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary font-body font-semibold mb-4">
              {config.eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-semibold text-white leading-tight mb-5 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              {config.title}
            </h1>
            <p className="text-base md:text-xl font-body font-light text-white/95 leading-relaxed mb-8 max-w-2xl [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              {config.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToBooking}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 rounded-lg font-body font-semibold text-sm tracking-wider uppercase shadow-xl transition-all"
              >
                Reservar ahora
              </button>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`landing_${config.key}_hero`)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white px-7 py-3.5 rounded-lg font-body font-semibold text-sm tracking-wider uppercase transition-all inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                WhatsApp directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-section-dark">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold">
              Pensado para vos
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-section-dark-foreground mt-3">
              Lo que necesitás, resuelto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-section-dark-foreground/5 border border-section-dark-foreground/10 rounded-xl p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-lg text-section-dark-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-section-dark-foreground/70 font-body leading-relaxed">{b.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold">
              Huéspedes como vos
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-3">
              Lo que dicen quienes ya pasaron por acá
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {config.testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <Quote className="text-primary mb-4" size={28} />
                <p className="font-body italic text-foreground/85 leading-relaxed mb-5">"{t.quote}"</p>
                <div>
                  <p className="font-display text-foreground">{t.name}</p>
                  <p className="text-xs font-body text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-secondary/40">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-semibold">
              Preguntas frecuentes
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mt-3">
              Resolvemos tus dudas
            </h2>
          </div>
          <div className="space-y-3">
            {config.faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-card border border-border rounded-xl px-5 py-4 open:shadow-md transition-shadow"
              >
                <summary className="cursor-pointer font-display text-foreground list-none flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <ChevronRight
                    className="text-primary transition-transform group-open:rotate-90 shrink-0"
                    size={18}
                  />
                </summary>
                <p className="font-body text-foreground/80 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-section-dark">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-section-dark-foreground mb-5">
            Reservá ahora y asegurá tu lugar
          </h2>
          <p className="font-body text-section-dark-foreground/75 max-w-2xl mx-auto mb-8">
            Mejor precio garantizado reservando directo. Sin comisiones de Booking ni Airbnb.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={scrollToBooking}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm tracking-wider uppercase shadow-xl transition-all inline-flex items-center justify-center gap-2"
            >
              Consultar disponibilidad <ArrowRight size={16} />
            </button>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`landing_${config.key}_final`)}
              className="bg-section-dark-foreground/10 hover:bg-section-dark-foreground/20 border border-section-dark-foreground/25 text-section-dark-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm tracking-wider uppercase transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight} />
    </div>
  );
};

export default PersonaLanding;
