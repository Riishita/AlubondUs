import { lazy, Suspense } from "react";

import LandingSection from "@/components/sections/LandingSection";

const HomeContent = lazy(() => import("@/components/sections/HomeContent"));
const QualitySection = lazy(() => import("@/components/sections/QualitySection"));
const SoleneScrollSequence = lazy(() => import("@/components/sections/SoleneScrollSequence"));
const SheetDetail = lazy(() => import("@/components/sections/SheetDetail"));
const Featurednews = lazy(() => import("@/components/sections/FeaturedNews"));
const MaterialSection = lazy(() => import("@/components/sections/MaterialSection"));
const ApplicationSection = lazy(() => import("@/components/sections/ApplicationSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const FooterSection = lazy(() => import("@/components/sections/FooterSection"));
const Index = () => {
  return (
    <>
      <main>
        <LandingSection />
        <div className="relative z-10 bg-black w-full">
          <Suspense fallback={<div className="min-h-screen" />}><HomeContent /></Suspense>

          <Suspense fallback={<div className="min-h-screen" />}><QualitySection /></Suspense>
          <Suspense fallback={<div className="min-h-screen" />}><SoleneScrollSequence /></Suspense>
          <Suspense fallback={<div className="min-h-screen" />}><SheetDetail /></Suspense>
          <Suspense fallback={<div className="min-h-screen" />}><MaterialSection /></Suspense>
          <Suspense fallback={<div className="min-h-[50vh]" />}><ApplicationSection /></Suspense>
    <Suspense fallback={<div className="min-h-screen" />}><Featurednews /></Suspense>
              <Suspense fallback={<div className="min-h-screen" />}><GallerySection /></Suspense>
        
          <Suspense fallback={<div className="min-h-[50vh]" />}><FooterSection /></Suspense>
        </div>
      </main>
    </>
  );
};

export default Index;
