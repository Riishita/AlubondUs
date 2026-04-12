import { lazy, Suspense, useCallback, useState } from "react";
import Preloader from "@/components/Preloader";

const LandingSection = lazy(() => import("@/components/sections/LandingSection"));
const GlobeSection = lazy(() => import("@/components/sections/GlobeSection"));
const PhilosophySection = lazy(() => import("@/components/sections/PhilosophySection"));
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
        <Suspense fallback={null}>
          <LandingSection />
          {/* <GlobeSection />
          <PhilosophySection /> */}
          <HomeContent />
          
          <div className="relative isolate">
            <QualitySection />
            <div className="relative z-20 -mt-[min(92vh,52rem)]">
              <SheetDetail />
            </div>
          </div>
          <CertificationSection />
          <MaterialSection />
          <ApplicationSection />
          <GallerySection />
          <FooterSection />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
