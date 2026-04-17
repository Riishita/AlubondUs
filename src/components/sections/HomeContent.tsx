"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import GlobeHero from "./GlobeSection";
import ThirdSection from "./PhilosophySection";

export default function SmoothTransitionWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 📱 Detect Mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ✨ SMOOTH SCROLL (KEY IMPROVEMENT) */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 20,
    damping: 5,
  });

  /* 🌍 GLOBE FADE (start later → no clash) */
  const globeOpacity = useTransform(
    smoothProgress,
    isMobile ? [0.88, 1] : [0.8, 0.95],
    [1, 0.3]
  );

  /* 🎬 MASK REVEAL (delayed properly) */
  const maskSize = useTransform(
    smoothProgress,
    isMobile ? [0.4, 1] : [0.6, 1],
    [0, isMobile ? 150 : 100]
  );

  /* 🧠 Interaction Control (more accurate threshold) */
  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      setIsRevealed(isMobile ? v > 0.92 : v > 0.85);
    });
  }, [smoothProgress, isMobile]);

  /* 🎯 MASK POSITION (more natural expansion) */
  const maskImageValue = useTransform(maskSize, (s) => {
    const centerY = isMobile ? "55%" : "72%";
    return `radial-gradient(circle at 50% ${centerY}, black ${s}%, transparent ${
      s + 8
    }%)`;
  });

  /* ✨ SUBTLE SCALE (adds premium feel) */
  const philosophyScale = useTransform(
    smoothProgress,
    [0.15, 1],
    [0.96, 1]
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-b from-[#eae7e2] to-[#e6e2dc]"
    >
      {/* 🌍 GLOBE */}
      <motion.div
        style={{
          opacity: globeOpacity,
          pointerEvents: isRevealed ? "none" : "auto",
        }}
        className="relative z-0"
      >
        <GlobeHero />
      </motion.div>

      {/* 🧱 PHILOSOPHY */}
      <motion.div
        style={{
          maskImage: maskImageValue,
          WebkitMaskImage: maskImageValue,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          pointerEvents: isRevealed ? "auto" : "none",
          scale: philosophyScale, // ✨ added
        } as any}
        className={`
          relative z-10 
          ${isMobile ? "-mt-[35vh]" : "-mt-[70vh]"}  // ✨ smoother overlap
        `}
      >
        <ThirdSection />
      </motion.div>
    </div>
  );
}