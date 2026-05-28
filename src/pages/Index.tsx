import { useState, useCallback } from "react";
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
