import { lazy, Suspense, useCallback, useState } from "react";
import Preloader from "@/components/Preloader";
import { useScrollLock } from "@/hooks/useScrollLock";

import LandingSection from "@/components/sections/LandingSection";

const GlobeSection = lazy(() => import("@/components/sections/GlobeSection"));
const HomeContent = lazy(() => import("@/components/sections/HomeContent"));
const QualitySection = lazy(() => import("@/components/sections/QualitySection"));
const Tearffect = lazy(() => import("@/components/sections/TearEffect"));

// const CertificationSection = lazy(() => import("@/components/sections/CertificationSection"));
const SheetDetail = lazy(() => import("@/components/sections/SheetDetail"));

const MaterialSection = lazy(() => import("@/components/sections/MaterialSection"));
const ApplicationSection = lazy(() => import("@/components/sections/ApplicationSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const FooterSection = lazy(() => import("@/components/sections/FooterSection"));


const Index = () => {
  const [loading, setLoading] = useState(true);

  useScrollLock(loading);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <main
        className={`${loading ? "invisible" : "visible"} transition-opacity duration-700`}
        aria-hidden={loading}
      >
        <LandingSection />
        <div className="relative z-10 bg-black w-full">
          {/* <Suspense fallback={<div className="min-h-screen" />}><GlobeSection /></Suspense>
          <Suspense fallback={<div className="min-h-screen" />}><PhilosophySection /></Suspense> */}
          <Suspense fallback={<div className="min-h-screen" />}><HomeContent /></Suspense>

          <div className="relative isolate">
            <Suspense fallback={<div className="min-h-screen" />}><QualitySection /></Suspense>
            
            {/* Parallax Overlay: TearEffect scrolls OVER QualitySection */}
            <div className="relative z-10 -mt-[100vh]">
              <Suspense fallback={<div className="min-h-screen" />}><Tearffect /></Suspense>
            </div>
          </div>
          <Suspense fallback={<div className="min-h-screen" />}><SheetDetail /></Suspense>
          <Suspense fallback={<div className="min-h-screen" />}><MaterialSection /></Suspense>
          <Suspense fallback={<div className="min-h-[50vh]" />}><ApplicationSection /></Suspense>
    
              <Suspense fallback={<div className="min-h-screen" />}><GallerySection /></Suspense>
        
          <Suspense fallback={<div className="min-h-[50vh]" />}><FooterSection /></Suspense>
        </div>
      </main>
    </>
  );
};

export default Index;
