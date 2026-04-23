"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import GlobeHero from "./GlobeSection";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider"; // Import this
import { cn } from "@/lib/utils";

export default function SmoothTransitionWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

  // Handle responsiveness for strip count
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  });

  const stripStart = 0.70;
  const stripEnd = 0.95;

  // Strip transforms
  const strip1H = useTransform(smoothProgress, [stripStart, stripStart + 0.12], ["0%", "100%"]);
  const strip2H = useTransform(smoothProgress, [stripStart + 0.03, stripStart + 0.15], ["0%", "100%"]);
  const strip3H = useTransform(smoothProgress, [stripStart + 0.06, stripStart + 0.18], ["0%", "100%"]);
  const strip4H = useTransform(smoothProgress, [stripStart + 0.09, stripStart + 0.21], ["0%", "100%"]);
  const strip5H = useTransform(smoothProgress, [stripStart + 0.12, stripEnd], ["0%", "100%"]);

  // On mobile, we only use the first two animations
  const allStrips = [strip1H, strip2H, strip3H, strip4H, strip5H];
  const activeStrips = isMobile ? allStrips.slice(0, 2) : allStrips;

  const philosophyOpacity = useTransform(smoothProgress, [0.94, 0.99], [0, 1]);
  const philosophyY = useTransform(smoothProgress, [0.94, 1], [40, 0]);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      setIsRevealed(v > stripStart + 0.05);
    });
  }, [smoothProgress]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative bg-black h-[350vh]", cursorSectionClassName)}
      {...cursorSectionProps}
    >
      <div className="sticky top-0 h-screen z-0">
        <GlobeHero externalProgress={smoothProgress} />
      </div>

      {/* 🎬 STRIP OVERLAY - Responsive strip count */}
      <div className="sticky top-0 h-screen w-full flex z-10 pointer-events-none">
        {activeStrips.map((h, i) => (
          <motion.div
            key={i}
            style={{ height: h }}
            className="flex-1 bg-[#eae7e2] border-r border-black/5 last:border-none origin-top shadow-[0_0_40px_rgba(0,0,0,0.1)]"
          />
        ))}
      </div>

      {/* 🧱 PHILOSOPHY SECTION - Responsive spacing and font sizes */}
      <motion.div
        style={{
          opacity: isRevealed ? philosophyOpacity : 0,
          y: philosophyY,
          pointerEvents: isRevealed ? "auto" : "none",
        }}
        className="sticky top-0 h-screen z-20 flex items-center justify-center px-6 py-12 md:p-20 text-[#1f2937]"
      >
        <div className="max-w-6xl w-full flex flex-col justify-center">
          <p className="text-[9px] md:text-xs uppercase tracking-[0.4em] text-black/40 mb-6 md:mb-16">
            001 / Philosophy
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-start mb-8 md:mb-16">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif leading-[0.95] tracking-tight">
                ALUBOND <br />
                <span className="text-orange-500">PHILOSOPHY</span>
              </h2>
            </div>
            <div className="text-sm md:text-xl text-black/70 leading-relaxed max-w-lg lg:pt-4">
              Architecture should speak of its time and place, but yearn for timelessness.
              <div className="mt-2 md:mt-4 text-[9px] md:text-sm text-orange-500 tracking-widest font-medium uppercase">
                — FRANK GEHRY
              </div>
            </div>
          </div>

          <div className="max-w-3xl border-t border-black/10 pt-8 md:pt-20">
            <p className="text-base md:text-2xl italic text-black/70 mb-4 md:mb-8 leading-relaxed">
              "A façade is not just the outer skin of a building — it is the expression of its character, ambition, and identity."
            </p>
            <p className="text-xs md:text-lg text-black/60 leading-relaxed max-w-2xl">
              At Alubond, we believe every façade must do justice to the architect's vision while delivering the precision, consistency, and reliability demanded on site.
            </p>
            
            <button className="mt-8 md:mt-12 group relative inline-flex items-center gap-3 px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-black/20 overflow-hidden transition-all duration-300">
              <span className="relative z-10 text-[10px] md:text-sm tracking-wide text-[#1f2937] group-hover:text-white transition">
                Explore Our Story
              </span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
              <span className="absolute inset-0 bg-[#1f2937] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}