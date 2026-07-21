"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { VARIANTS } from "@/lib/transitions";

import CursorGridTrail from "./CursorFollower";
import Navbar from "./Navbar";

const NAV_EXCLUDE_TOP_PX = 96;

const stats = [
  { value: "35+", label: "YEARS" },
  { value: "90+", label: "COUNTRIES" },
  { value: "50K+", label: "PROJECTS" },
];

const LandingHero = () => {
  const reduceMotion = useReducedMotion();
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => console.error("Autoplay failed:", error));
    }
  }, []);

  const { smoothProgress } = useSectionScroll(heroSectionRef, ["start start", "end start"]);

  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const videoY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]); // Reduced vertical travel for better mobile fit
  const contentOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.5, 0.9]);

  return (
    <>
      <CursorGridTrail excludeTopPx={NAV_EXCLUDE_TOP_PX} sectionRef={heroSectionRef} />
      <Navbar />
      {/* Container height adjusted to remain functional on smaller screens */}
      <div ref={heroSectionRef} className="relative h-[100vh] md:h-[150vh] bg-black">
        <section className="relative md:fixed md:top-0 md:left-0 h-[100vh] md:h-screen w-full overflow-hidden z-0">
          
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
            style={{ scale: (reduceMotion || isMobile) ? 1 : videoScale, y: (reduceMotion || isMobile) ? "0%" : videoY, willChange: "transform" }}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover brightness-100 contrast-[1.05]"
              muted playsInline loop autoPlay preload="auto"
            >
              <source src="https://pixabay.com/videos/download/video-365255_source.mp4" type="video/mp4" />
            </video>
            <motion.div
              className="absolute inset-0 bg-black/10"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>

          <motion.div
            className="relative z-10 flex flex-col justify-center h-full w-full px-6 md:px-12 lg:px-24 py-24"
            style={{ y: isMobile ? 0 : contentY, opacity: isMobile ? 1 : contentOpacity }}
          >
            <div className="flex flex-col lg:flex-row w-full items-start lg:items-start justify-between gap-12">
              
              {/* Content Wrapper */}
              <motion.div 
                className="max-w-3xl"
                variants={VARIANTS.staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.p  className="mb-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
                  Alubond U.S.A — Est. 1989
                </motion.p>

                <motion.h2  className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight text-white/90 drop-shadow-lg uppercase">
                  WORLD'S LARGEST
                </motion.h2>

                <motion.h2 className="mb-6 text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight uppercase text-white/90 drop-shadow-lg">
                  ACP BRAND
                </motion.h2>

                <motion.p className="mb-8 max-w-md text-sm md:text-base font-medium text-white/90 leading-relaxed">
                  High-performance composite panels engineered for safety, designed for the extraordinary.
                </motion.p>

                <motion.button
                  onClick={() => {
                    const el = document.getElementById('sheet-detail');
                    if (el) el.scrollIntoView({ behavior: 'instant' });
                  }}
                  className="px-8 py-4 md:px-10 text-[14px] md:text-[15px] font-medium rounded bg-white/30 backdrop-blur-lg border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 ease-out"
                >
                  Discover Innovation
                </motion.button>

              </motion.div>

            
<motion.div 
  className="flex flex-row lg:flex-col items-start lg:items-end gap-6 md:gap-10 w-full lg:w-auto border-t border-white/20 pt-8 lg:border-none lg:pt-8 text-left lg:text-right"
>
  {stats.map((stat) => (
    <div key={stat.label}>
      <p className="text-4xl md:text-5xl font-black text-white uppercase">
        {stat.value}
      </p>
      <p className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white uppercase">
        {stat.label}
      </p>
    </div>
  ))}
</motion.div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/1 to-transparent pointer-events-none z-10" />
        </section>
      </div>
    </>
  );
};

export default LandingHero;