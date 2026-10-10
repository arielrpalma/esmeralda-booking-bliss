import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntentSelector from "@/components/IntentSelector";
import WhyDirectSection from "@/components/WhyDirectSection";
import CheckInStepsSection from "@/components/CheckInStepsSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import Route9Section from "@/components/Route9Section";
import FaqSection from "@/components/FaqSection";
import InternalLinksSection from "@/components/InternalLinksSection";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [barHeight, setBarHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);

  // Breadcrumb for the home page (site root).
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://esmeraldaapart.com.ar/" },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>Hotel y Apart en Marcos Juárez · Esmeralda Apart | Reservá directo</title>
        <meta name="description" content="Tu hotel y apart en Marcos Juárez: departamentos por día para hasta 4 personas, check-in 24 h, cochera, cocina equipada y factura A/B. Mejor precio reservando directo." />
        <link rel="canonical" href="https://esmeraldaapart.com.ar/" />
        <meta property="og:title" content="Hotel y Apart en Marcos Juárez · Esmeralda Apart" />
        <meta property="og:description" content="Departamentos por día en el centro de Marcos Juárez: check-in 24 h, cochera y el mejor precio reservando directo." />
        <meta property="og:url" content="https://esmeraldaapart.com.ar/" />
        <meta property="og:image" content="https://esmeraldaapart.com.ar/images/hero.jpg" />
        <meta name="twitter:title" content="Hotel y Apart en Marcos Juárez · Esmeralda Apart" />
        <meta name="twitter:description" content="Departamentos por día en el centro de Marcos Juárez: check-in 24 h, cochera y el mejor precio reservando directo." />

        <meta name="twitter:image" content="https://esmeraldaapart.com.ar/images/hero.jpg" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <IntentSelector />
        <WhyDirectSection />
        <CheckInStepsSection />
        <AboutSection />
        <FeaturesSection />
        <AmenitiesSection />
        <GallerySection />
        <Route9Section />
        <FaqSection />
        <InternalLinksSection />
      </main>
      <Footer />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight} />
    </div>
  );
};

export default Index;
