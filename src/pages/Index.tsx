import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
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
        <title>Esmeralda Apart | Departamentos de lujo en Marcos Juárez</title>
        <meta name="description" content="Departamentos temporarios de lujo totalmente equipados en el centro de Marcos Juárez, Córdoba. Reservá online con disponibilidad en tiempo real." />
        <link rel="canonical" href="https://esmeraldaapart.com.ar/" />
        <meta property="og:url" content="https://esmeraldaapart.com.ar/" />
      </Helmet>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <AmenitiesSection />
      <GallerySection />
      <Footer />
      <MundialBanner bottomOffset={barHeight} onHeightChange={handleMundialHeight} />
      <FloatingBookingBar onHeightChange={handleHeightChange} />
      <WhatsAppButton barHeight={barHeight + mundialHeight} />
    </div>
  );
};

export default Index;
