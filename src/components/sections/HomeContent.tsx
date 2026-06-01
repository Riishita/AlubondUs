"use client";

import React, { lazy, Suspense, useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";

const GlobeHero = lazy(() => import("./GlobeSection"));

export default function SmoothTransitionWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

  // Handle responsiveness for strip count
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 10,
    stiffness: 40,
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
  const philosophyParallaxY = useTransform(smoothProgress, [0.94, 1], [0, -30]); // Additional inner parallax

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      setIsRevealed(v > stripStart + 0.01);
    });
  }, [smoothProgress]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative z-10 bg-black h-[350vh]", cursorSectionClassName)}
      {...cursorSectionProps}
    >
      <div className="sticky top-0 h-screen z-0">
        <Suspense fallback={<div className="h-screen w-full bg-black" />}>
          <GlobeHero externalProgress={smoothProgress} />
        </Suspense>
      </div>

      {/* 🎬 STRIP OVERLAY - Responsive strip count */}
      <div className="sticky top-0 h-screen w-full flex z-10 pointer-events-none">
        {activeStrips.map((h, i) => (
          <motion.div
            key={i}
            style={{ height: h }}
            className="flex-1 bg-[#eae7e2] border-r border-black/5 last:border-none origin-top shadow-[0_0_40px_rgba(0,0,0,0.01)]"
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
        <motion.div style={{ y: philosophyParallaxY }} className="max-w-6xl w-full flex flex-col justify-center">
          <p className="type-overline text-black/40 mb-6 md:mb-16">
            001 / Philosophy
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-start mb-8 md:mb-16">
            <div>
              <h2 className="type-h1">
                ALUBOND <br />
                <span className="text-[#134d7a]">PHILOSOPHY</span>
              </h2>
            </div>
            <div className="type-body text-black/70 max-w-lg lg:pt-4">
              Architecture should speak of its time and place, but yearn for timelessness.
              <div className="type-overline mt-2 md:mt-4 text-[#134d7a]">
                — FRANK GEHRY
              </div>
            </div>
          </div>

          <div className="max-w-3xl border-t border-black/10 pt-8 md:pt-20">
            <p className="type-body italic text-black/70 mb-4 md:mb-8">
              "A façade is not just the outer skin of a building — it is the expression of its character, ambition, and identity."
            </p>
            <p className="type-body text-black/60 max-w-2xl">
              At Alubond, we believe every façade must do justice to the architect's vision while delivering the precision, consistency, and reliability demanded on site.
            </p>
            
            <button className="type-btn mt-8 md:mt-12 group relative inline-flex items-center gap-3 px-6 md:px-8 py-2.5 md:py-3 rounded-full border border-black/20 overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
              <span className="relative z-10 text-[#1f2937] group-hover:text-white transition">
                Explore Our Story
              </span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
              <span className="absolute inset-0 bg-[#1f2937] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.32,0.72,0,1] rounded-full" />
            </button>
          </div>
        </motion.div>
      </motion.div>
      <div id="philosophy" className="absolute bottom-0 w-full h-[120vh] pointer-events-none" />
    </div>
  );
}