"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import GlobeHero from "./GlobeSection";

export default function SmoothTransitionWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30, // Increased damping for a smoother feel
    stiffness: 100,
  });

  /* 🎬 STRIP TRANSITION - SLOWED DOWN
     By widening the gap between stripStart and stripEnd (from 0.13 to 0.25), 
     the strips move significantly slower relative to the scroll speed.
  */
  const stripStart = 0.70; // Starts earlier so the motion has more "room" to breathe
  const stripEnd = 0.95;   // Ends at the same point

  // Individual strip timing - calculated to spread out the movement
  const strip1H = useTransform(smoothProgress, [stripStart, stripStart + 0.12], ["0%", "100%"]);
  const strip2H = useTransform(smoothProgress, [stripStart + 0.03, stripStart + 0.15], ["0%", "100%"]);
  const strip3H = useTransform(smoothProgress, [stripStart + 0.06, stripStart + 0.18], ["0%", "100%"]);
  const strip4H = useTransform(smoothProgress, [stripStart + 0.09, stripStart + 0.21], ["0%", "100%"]);
  const strip5H = useTransform(smoothProgress, [stripStart + 0.12, stripEnd], ["0%", "100%"]);

  /* 🧱 PHILOSOPHY CONTENT */
  const philosophyOpacity = useTransform(smoothProgress, [0.94, 0.99], [0, 1]);
  const philosophyY = useTransform(smoothProgress, [0.94, 1], [40, 0]);

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      // Reveal the content slightly before the strips fully finish for a layered look
      setIsRevealed(v > stripStart + 0.05);
    });
  }, [smoothProgress, stripStart]);

  return (
    <div ref={containerRef} className="relative bg-black h-[350vh]">
      <div className="sticky top-0 h-screen z-0">
        <GlobeHero externalProgress={smoothProgress} />
      </div>

      {/* 🎬 STRIP OVERLAY */}
      <div className="sticky top-0 h-screen w-full flex z-10 pointer-events-none">
        {[strip1H, strip2H, strip3H, strip4H, strip5H].map((h, i) => (
          <motion.div
            key={i}
            style={{ height: h }}
            className="flex-1 bg-[#eae7e2] border-r border-black/5 last:border-none origin-top shadow-[0_0_40px_rgba(0,0,0,0.1)]"
          />
        ))}
      </div>

      {/* 🧱 PHILOSOPHY SECTION */}
      <motion.div
        style={{
          opacity: isRevealed ? philosophyOpacity : 0,
          y: philosophyY,
          pointerEvents: isRevealed ? "auto" : "none",
        }}
        className="sticky top-0 h-screen z-20 flex items-center justify-center p-6 md:p-20 text-[#1f2937]"
      >
        <div className="max-w-6xl w-full mt-[-10vh]">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-black/40 mb-10 md:mb-16">
            001 / Philosophy
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start mb-16">
            <div>
              <h2 className="text-5xl md:text-8xl font-serif leading-[0.95] tracking-tight">
                ALUBOND <br />
                <span className="text-orange-500">PHILOSOPHY</span>
              </h2>
            </div>
            <div className="text-base md:text-xl text-black/70 leading-relaxed max-w-lg lg:pt-4">
              Architecture should speak of its time and place, but yearn for timelessness.
              <div className="mt-4 text-[10px] md:text-sm text-orange-500 tracking-widest font-medium uppercase">
                — FRANK GEHRY
              </div>
            </div>
          </div>

          <div className="max-w-3xl border-t border-black/10 pt-12 md:pt-20">
            <p className="text-lg md:text-2xl italic text-black/70 mb-8 leading-relaxed">
              "A façade is not just the outer skin of a building — it is the expression of its character, ambition, and identity."
            </p>
            <p className="text-sm md:text-lg text-black/60 leading-relaxed max-w-2xl">
              At Alubond, we believe every façade must do justice to the architect's vision while delivering the precision, consistency, and reliability demanded on site.
            </p>
            
            <button className="mt-12 group relative inline-flex items-center gap-3 px-8 py-3 rounded-full border border-black/20 overflow-hidden transition-all duration-300">
              <span className="relative z-10 text-xs md:text-sm tracking-wide text-[#1f2937] group-hover:text-white transition">
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