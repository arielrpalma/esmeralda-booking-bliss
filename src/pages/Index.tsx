import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import BookingSection from "@/components/BookingSection";
import FloatingBookingBar from "@/components/FloatingBookingBar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [bookingUrl, setBookingUrl] = useState<string>();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <AmenitiesSection />
      <GallerySection />
      <BookingSection iframeUrl={bookingUrl} />
      <Footer />
      <FloatingBookingBar onSearch={setBookingUrl} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
