import { lazy, Suspense, useCallback, useState } from "react";
import Preloader from "@/components/Preloader";

import LandingSection from "@/components/sections/LandingSection";

const GlobeSection = lazy(() => import("@/components/sections/GlobeSection"));
const HomeContent = lazy(() => import("@/components/sections/HomeContent"));
const QualitySection = lazy(() => import("@/components/sections/QualitySection"));
const SheetDetail = lazy(() => import("@/components/sections/SheetDetail"));

const CertificationSection = lazy(() => import("@/components/sections/CertificationSection"));
const MaterialSection = lazy(() => import("@/components/sections/MaterialSection"));
const ApplicationSection = lazy(() => import("@/components/sections/ApplicationSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const FooterSection = lazy(() => import("@/components/sections/FooterSection"));


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
        {/* <Suspense fallback={<div className="min-h-screen" />}><GlobeSection /></Suspense>
        <Suspense fallback={<div className="min-h-screen" />}><PhilosophySection /></Suspense> */}
        <Suspense fallback={<div className="min-h-screen" />}><HomeContent /></Suspense>

        <div className="relative isolate">
          <Suspense fallback={<div className="min-h-screen" />}><QualitySection /></Suspense>
          <div className="relative z-20 -mt-[min(92vh,52rem)]">
            <Suspense fallback={<div className="min-h-screen" />}><CertificationSection /></Suspense>
          </div>
        </div>
        <Suspense fallback={<div className="min-h-screen bg-[#070b14]" />}><SheetDetail /></Suspense>

        <Suspense fallback={<div className="min-h-screen" />}><MaterialSection /></Suspense>
        <Suspense fallback={<div className="min-h-[50vh]" />}><ApplicationSection /></Suspense>
        <Suspense fallback={<div className="min-h-screen" />}><GallerySection /></Suspense>
        <Suspense fallback={<div className="min-h-[50vh]" />}><FooterSection /></Suspense>
      </main>
    </>
  );
};

export default Index;
