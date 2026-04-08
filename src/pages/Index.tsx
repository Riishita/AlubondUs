import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";

import LandingSection from "@/components/sections/LandingSection";
import GlobeSection from "@/components/sections/GlobeSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import QualitySection from "@/components/sections/QualitySection";

import CertificationSection from "@/components/sections/CertificationSection";
import MaterialSection from "@/components/sections/MaterialSection";
import ApplicationSection from "@/components/sections/ApplicationSection";
import GallerySection from "@/components/sections/GallerySection";
import FooterSection from "@/components/sections/FooterSection";
import heroBg from "@/assets/hero-bg.jpg";
import applicationImg from "@/assets/application.jpg";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <main className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        <LandingSection />

        {/* Parallax between Landing & Globe */}


        <GlobeSection />
        <PhilosophySection />
        <QualitySection />

        {/* Parallax between Quality & Social Proof */}
    

        
        <CertificationSection />
        <MaterialSection />
        <ApplicationSection />
        <GallerySection />
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
