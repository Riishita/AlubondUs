"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => console.error("Autoplay failed:", error));
    }
  }, []);

  const { smoothProgress } = useSectionScroll(heroSectionRef, ["start start", "end start"]);

  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.5, 0.9]); // Darkened for better contrast

  return (
    <>
      <CursorGridTrail excludeTopPx={NAV_EXCLUDE_TOP_PX} sectionRef={heroSectionRef} />
      <Navbar />
      <div ref={heroSectionRef} className="relative h-[150vh] bg-black">
        <section className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0">
          
          {/* 🎥 VIDEO PARALLAX */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
            style={{ scale: reduceMotion ? 1 : videoScale, willChange: "transform" }}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover brightness-[0.7] contrast-[1.1]"
              muted playsInline loop autoPlay preload="auto"
            >
              <source src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066245/8996270-uhd_3840_2160_30fps_qfalkr.mp4" type="video/mp4" />
            </video>

            {/* ENHANCED OVERLAYS FOR READABILITY */}
            <motion.div
              className="absolute inset-0 bg-black/20"
              style={{ opacity: overlayOpacity }}
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            className="relative z-10 flex flex-col md:flex-row h-full w-full items-start md:items-center justify-center md:justify-between px-6 pt-24 pb-12 md:pb-0 md:px-20 lg:px-24 gap-8 md:gap-0"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            {/* LEFT - BOLDER TYPOGRAPHY */}
            <motion.div 
              className="max-w-4xl"
              variants={VARIANTS.staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.p variants={VARIANTS.framerFadeUp} className="mb-6 text-[11px] font-bold uppercase tracking-[0.4em] text-white/80">
                Alubond U.S.A — Est. 1989
              </motion.p>

              <motion.h1 variants={VARIANTS.framerFadeUp} className="text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-7xl lg:text-8xl drop-shadow-2xl">
                WORLD’S LARGEST
              </motion.h1>

              <motion.h2 variants={VARIANTS.framerFadeUp} className="mb-8 text-5xl font-black sm:text-7xl lg:text-8xl tracking-tighter drop-shadow-2xl" style={{ color: "#59c4ee" }}>
                ACP BRAND
              </motion.h2>

              <motion.p variants={VARIANTS.framerFadeUp} className="mb-10 max-w-lg text-base font-medium text-white/90 drop-shadow-md leading-relaxed">
                High-performance composite panels engineered for safety, designed for the extraordinary.
              </motion.p>

              <motion.button
                variants={VARIANTS.framerFadeUp}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 rounded-none border border-white bg-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-black hover:bg-[#59c4ee] hover:border-[#59c4ee] hover:text-white transition-all duration-300 shadow-2xl"
              >
                Discover Innovation ↓
              </motion.button>
            </motion.div>

            {/* RIGHT - BOLD STATS (Now responsive and visible on mobile) */}
            <motion.div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start w-full md:w-auto gap-4 md:gap-12 mt-4 md:mt-0 z-10 border-t border-white/10 md:border-none pt-8 md:pt-0">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left md:text-right flex-1 md:flex-initial">
                  <p className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 md:mt-2 text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-[#59c4ee] uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        </section>
      </div>
    </>
  );
};

export default LandingHero;