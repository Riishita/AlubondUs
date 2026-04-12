"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlobeHero from "./GlobeSection"; 
import ThirdSection from "./PhilosophySection";

export default function SmoothTransitionWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile to adjust the mask center point
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

  // 1. Globe Section: Dims slightly as the mask opens
  const globeOpacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0.4]);
  
  // 2. The Expansion Logic
  // We start the reveal later (0.6) to let the Globe finish its internal animations first
  const maskSize = useTransform(
    scrollYProgress,
    [0.6, 0.9], 
    [0, 150]
  );

  // 3. Dynamic Pointer Events
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // Logic: Only enable Philosophy clicks when it covers most of the screen
      setIsRevealed(v > 0.75);
    });
  }, [scrollYProgress]);

  // 4. The Magic: Radial Mask centered on the Globe's position
  // On desktop, the globe is near the bottom/center. On mobile, it's top/center.
  const maskImageValue = useTransform(maskSize, (s) => {
    const centerY = isMobile ? "25%" : "70%"; // Aligns with your GlobeHero globeY transforms
    return `radial-gradient(circle at 50% ${centerY}, black ${s}%, transparent ${s + 8}%)`;
  });

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* 🌍 GLOBE SECTION */}
      <motion.div 
        style={{ 
          opacity: globeOpacity,
          pointerEvents: isRevealed ? "none" : "auto" 
        }} 
        className="relative z-0"
      >
        <GlobeHero />
      </motion.div>

      {/* 🧱 PHILOSOPHY SECTION */}
      <motion.div
        style={{
          maskImage: maskImageValue,
          WebkitMaskImage: maskImageValue,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          pointerEvents: isRevealed ? "auto" : "none",
        } as any}
        className="relative z-10 -mt-[60vh] md:-mt-[80vh]" 
      >
        <ThirdSection />
      </motion.div>
    </div>
  );
}