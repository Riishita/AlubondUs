"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

  /* 🌍 GLOBE FADE (Delayed for mobile) */
  const globeOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0.85, 1] : [0.75, 0.9],
    [1, 0.4]
  );

  /* 🎬 MASK REVEAL (Delayed + smoother on mobile) */
  const maskSize = useTransform(
    scrollYProgress,
    isMobile ? [0.85, 1] : [0.75, 1],
    [0, isMobile ? 180 : 150]
  );

  /* 🧠 Interaction Control */
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setIsRevealed(isMobile ? v > 0.9 : v > 0.75);
    });
  }, [scrollYProgress, isMobile]);

  /* 🎯 MASK POSITION (Aligned with globe) */
  const maskImageValue = useTransform(maskSize, (s) => {
    const centerY = isMobile ? "45%" : "70%";
    return `radial-gradient(circle at 50% ${centerY}, black ${s}%, transparent ${
      s + 10
    }%)`;
  });

  return (
    <div ref={containerRef} className="relative bg-gradient-to-b from-[#eae7e2] to-[#e6e2dc]">
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
        } as any}
        className={`
          relative z-10 
          ${isMobile ? "-mt-[40vh]" : "-mt-[80vh]"}
        `}
      >
        <ThirdSection />
      </motion.div>
    </div>
  );
}