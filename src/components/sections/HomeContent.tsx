"use client";

import React, { lazy, Suspense, useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
    damping: 20,
    stiffness: 80,
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
            className="flex-1 bg-[#F8F8F8] border-r border-black/5 last:border-none origin-top shadow-[0_0_40px_rgba(0,0,0,0.01)]"
          />
        ))}
      </div>

      {/* 🧱 PHILOSOPHY SECTION - Premium Editorial Layout */}
      <motion.div
        style={{
          opacity: isRevealed ? philosophyOpacity : 0,
          y: philosophyY,
          pointerEvents: isRevealed ? "auto" : "none",
        }}
        className="sticky top-0 h-screen z-20 flex items-start md:items-center justify-center px-6 md:px-12 lg:px-16 py-12 md:py-20 text-[#1f2937] overflow-y-auto md:overflow-hidden"
      >
        <motion.div style={{ y: philosophyParallaxY }} className="max-w-[1400px] w-full flex flex-col justify-center relative my-auto md:my-0">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#0a4b7c]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left side: Heading */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
                <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
                <p className="tracking-[0.2em] text-[10px] md:text-xs font-semibold text-[#0a4b7c] uppercase">
                  001 / Philosophy
                </p>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-4 md:mb-8 mt-4 md:mt-0">
                Alubond <br />
                <span className="text-[#0a4b7c] font-medium">Philosophy</span>
              </h2>

              <p className="text-sm md:text-lg text-[#4B5563] leading-relaxed font-light max-w-md">
                At Alubond, we believe every facade must do justice to the architect's vision while delivering the precision, consistency, and reliability demanded on site.
              </p>

              {/* USPs */}
              <div className="flex flex-wrap gap-3 mt-8">
                {['Quality', 'Safety', 'Reliability', 'Durability'].map(usp => (
                  <span key={usp} className="px-5 py-2 rounded-full border border-[#0a4b7c]/20 text-[#0a4b7c] text-xs font-semibold uppercase tracking-wider bg-[#0a4b7c]/5">
                    {usp}
                  </span>
                ))}
              </div>

              <Link to="/about" className="mt-10 md:mt-12 group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-full overflow-hidden w-fit transition-all duration-300 hover:shadow-xl hover:shadow-[#1A1A1A]/20 hover:-translate-y-1">
                <span className="relative z-10 text-xs md:text-sm tracking-wider font-medium uppercase">
                  Explore Our Story
                </span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <div className="absolute inset-0 bg-[#0a4b7c] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </Link>
            </div>

            {/* Right side: Editorial Quote Card */}
            <div className="lg:col-span-7 relative">
              {/* Huge Decorative Quote Mark */}
              <div className="absolute -top-12 md:-top-20 -left-6 md:-left-12 text-[120px] md:text-[200px] text-[#0a4b7c]/10 leading-none select-none pointer-events-none">
                "
              </div>
              
              <div className="relative bg-white/70 backdrop-blur-xl border border-white p-6 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.06)] transition-shadow duration-500 mt-2 md:mt-0">
                <h3 className="text-xl md:text-3xl lg:text-4xl text-[#1A1A1A] leading-snug md:leading-normal mb-5 md:mb-10 font-light">
                  "A facade is not just the outer skin of a building - it is the expression of its character, ambition, and identity."
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#0a4b7c]"></div>
                  <div className="tracking-[0.2em] text-[10px] md:text-xs font-bold text-[#0a4b7c] uppercase">
                    Norman Foster
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
      <div id="philosophy" className="absolute bottom-0 w-full h-[100vh] pointer-events-none" />
    </div>
  );
}