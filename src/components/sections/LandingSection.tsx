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

  // 🎥 VIDEO CONTROL
  const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  if (videoRef.current) {
    // Explicitly set muted to true to bypass mobile autoplay blocks
    videoRef.current.defaultMuted = true;
    videoRef.current.muted = true;
    
    // Play immediately or with minimal delay
    videoRef.current.play().catch((error) => {
      console.error("Autoplay failed:", error);
    });
  }
}, []);

  // 🔥 SCROLL ANIMATION
  const { smoothProgress } = useSectionScroll(heroSectionRef, ["start start", "end start"]);

  const videoY = useTransform(smoothProgress, [0, 1], ["0%", "18%"]);
  const videoScale = useTransform(smoothProgress, [0, 0.6, 1], [1, 1.04, 1.01]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "-34%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.4, 0.75]);

  return (
    <section
      ref={heroSectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* 🌊 BACKGROUND GRADIENT */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35), transparent 40%),
            radial-gradient(circle at 30% 70%, rgba(80,140,220,0.35), transparent 50%),
            linear-gradient(135deg, #dbeafe 0%, #93c5fd 40%, #60a5fa 70%, #3b82f6 100%)
          `,
        }}
      />

      <CursorGridTrail
        excludeTopPx={NAV_EXCLUDE_TOP_PX}
        sectionRef={heroSectionRef}
      />
      <Navbar />

      {/* 🎥 VIDEO PARALLAX */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        style={{ y: videoY, scale: reduceMotion ? 1 : videoScale, willChange: "transform" }}
      >
        <div className="absolute inset-[-12%] h-[124%] w-[124%]">
          <video
  ref={videoRef}
  className="h-full w-full object-cover object-center brightness-[0.9] contrast-[1.05] transform-gpu"
  muted        // Critical
  playsInline  // Critical for iOS (prevents full-screen takeover)
  loop         // Keeps it running
  autoPlay     // Attempt immediate start
  preload="auto" 
>
  <source
    src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066245/8996270-uhd_3840_2160_30fps_qfalkr.mp4"
    type="video/mp4"
  />
</video>
        </div>

        {/* OVERLAYS */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 via-[#0f172a]/60 to-[#0f172a]/40 group-hover:pointer-events-none"
          style={{ opacity: overlayOpacity, willChange: "opacity" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/50 via-transparent to-[#0f172a]/20 pointer-events-none" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-between px-5 md:px-10 lg:px-24"
        style={{ y: contentY, opacity: contentOpacity, willChange: "transform, opacity" }}
      >
        {/* LEFT */}
        <div className="max-w-3xl">
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={VARIANTS.fadeUpBlur}
            className="mb-6 text-[10px] uppercase tracking-[0.35em] text-white/50 sm:text-xs"
          >
            Alubond U.S.A — Est. 1989
          </motion.p>

          <motion.h1
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={VARIANTS.fadeUpBlur}
            className="text-4xl font-medium leading-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
          >
            WORLD’S LARGEST
          </motion.h1>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={VARIANTS.fadeUpBlur}
            className="mb-8 text-4xl font-medium sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ color: "#59c4ee" }}
          >
            ACP <br /> BRAND
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={VARIANTS.fadeUpBlur}
            className="mb-8 max-w-md text-sm text-white/60 md:mb-10"
          >
            High-performance composite panels engineered for safety,
            designed for the extraordinary.
          </motion.p>

          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            className="group flex transform-gpu items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md hover:bg-white/20 md:px-8 md:py-4 md:text-xs"
          >
            Discover Innovation ↓
          </motion.button>
        </div>

        {/* RIGHT */}
        <div className="hidden flex-col items-end gap-10 md:flex">
          {stats.map((stat) => (
            <div key={stat.label} className="text-right">
              <p className="text-4xl text-white lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-white/40 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent" />
    </section>
  );
};

export default LandingHero;