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
import FloatingBookingBar from "@/components/FloatingBookingBar";
import MundialBanner from "@/components/MundialBanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [barHeight, setBarHeight] = useState(0);
  const [mundialHeight, setMundialHeight] = useState(0);
  const handleHeightChange = useCallback((h: number) => setBarHeight(h), []);
  const handleMundialHeight = useCallback((h: number) => setMundialHeight(h), []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Helmet>
        <title>Apart inteligente en Marcos Juárez · Check-in 24 h | Esmeralda Apart</title>
        <meta name="description" content="Departamentos por día en Marcos Juárez con check-in electrónico 24 h, cocheras y factura. A minutos de Au Ruta9. Reservá directo y pagá menos." />
        <link rel="canonical" href="https://esmeraldaapart.com.ar/" />
        <meta property="og:title" content="Apart inteligente en Marcos Juárez · Check-in 24 h" />
        <meta property="og:description" content="Reservá directo el mejor apart de Marcos Juárez: diseño, cochera, factura y check-in 24 h sin esperas." />
        <meta property="og:url" content="https://esmeraldaapart.com.ar/" />
        <meta property="og:image" content="https://esmeraldaapart.com.ar/images/hero.jpg" />
        <meta name="twitter:title" content="Apart inteligente en Marcos Juárez · Check-in 24 h" />
        <meta name="twitter:description" content="Reservá directo el mejor apart de Marcos Juárez: diseño, cochera, factura y check-in 24 h." />
        <meta name="twitter:image" content="https://esmeraldaapart.com.ar/images/hero.jpg" />
      </Helmet>
      <Navbar />
      <HeroSection />
      <WhyDirectSection />
      <CheckInStepsSection />
      <AboutSection />
      <FeaturesSection />
      <AmenitiesSection />
      <GallerySection />
      <Route9Section />
      <FaqSection />
      <Footer />
      <MundialBanner bottomOffset={barHeight} onHeightChange={handleMundialHeight} />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight + mundialHeight} />
    </div>
  );
};

export default Index;
