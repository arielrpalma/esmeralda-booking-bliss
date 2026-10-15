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
        <title>Hotel y Apart en Marcos Juárez · Esmeralda | Mejor Precio Directo</title>
        <meta name="description" content="Departamentos céntricos para hasta 4 personas en Marcos Juárez. Check-in 24 h, cochera privada y cocina equipada. Reservá directo sin comisiones." />
        <link rel="canonical" href="https://esmeraldaapart.com.ar/" />
        <meta property="og:title" content="Esmeralda Apart · Hotel y Departamentos en Marcos Juárez" />
        <meta property="og:description" content="Alojamiento céntrico con check-in autónomo 24 h, cochera y cocina equipada. Reservá al mejor precio directo." />
        <meta property="og:url" content="https://esmeraldaapart.com.ar/" />
        <meta property="og:image" content="https://esmeraldaapart.com.ar/images/og-home.jpg" />
        <meta name="twitter:title" content="Esmeralda Apart · Hotel y Departamentos en Marcos Juárez" />
        <meta name="twitter:description" content="Alojamiento céntrico con check-in autónomo 24 h, cochera y cocina equipada. Reservá al mejor precio directo." />

        <meta name="twitter:image" content="https://esmeraldaapart.com.ar/images/og-home.jpg" />
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
