import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [bannerVisible, setBannerVisible] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <AmenitiesSection />
      <GallerySection />
      <Footer />
      <FloatingBookingBar onBannerVisible={setBannerVisible} />
      <WhatsAppButton extraBottom={bannerVisible ? 5 : 0} />
    </div>
  );
};

export default Index;
