"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

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
    const timer = setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 SCROLL ANIMATION
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.75]);

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
        style={{ y: videoY }}
      >
        <div className="absolute inset-[-12%] h-[124%] w-[124%]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center brightness-[0.9] contrast-[1.05]"
            muted
            playsInline
            preload="auto"
          >
            <source
              src="https://cdn.pixabay.com/video/2024/07/04/219337_large.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* OVERLAYS */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 via-[#0f172a]/60 to-[#0f172a]/40"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/50 via-transparent to-[#0f172a]/20" />
      </motion.div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10 flex w-full h-full items-center justify-between px-8 md:px-16 lg:px-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* LEFT */}
        <div className="max-w-3xl">
          <p className="mb-6 text-xs tracking-[0.4em] text-white/50 uppercase">
            Alubond U.S.A — Est. 1989
          </p>

          <h1 className="text-5xl font-medium leading-tight text-white md:text-7xl lg:text-8xl">
            WORLD’S LARGEST
          </h1>

          <h2
            className="mb-8 text-5xl font-medium md:text-7xl lg:text-8xl"
            style={{ color: "#59c4ee" }}
          >
            ACP <br /> BRAND
          </h2>

          <p className="mb-10 max-w-md text-sm text-white/60">
            High-performance composite panels engineered for safety,
            designed for the extraordinary.
          </p>

          <button className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs tracking-[0.3em] text-white uppercase backdrop-blur-md hover:bg-white/20">
            Discover Innovation ↓
          </button>
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