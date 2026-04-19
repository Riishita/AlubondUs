"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const certs = [
  { title: "EN 13501", desc: "European Fire Classification", tag: "CLASS A2-S1,D0" },
  { title: "NFPA 285", desc: "Fire Propagation", tag: "FULLY COMPLIANT" },
  { title: "BS 8414", desc: "British Standard", tag: "BRE CERTIFIED" },
  { title: "ULC-S134", desc: "Canadian Fire Test", tag: "COMPLIANT" },
  { title: "ASTM E-84", desc: "Smoke & Flame Spread", tag: "CLASS A RATING" },
  { title: "ISO 9001", desc: "Quality Management", tag: "CERTIFIED FACILITY" },
];

export default function FireHorizontalExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { smoothProgress: scrollYProgress } = useSectionScroll(
    containerRef,
    ["start start", "end end"]
  );

  // Desktop: Shifts Right. Mobile: Stays full or scales down height
  const videoWidth = useTransform(scrollYProgress, [0, 0.3], ["100%", "50%"]);
  const videoX = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);
  
  // Mobile specific height transition to reveal content below it
  const videoHeightMobile = useTransform(scrollYProgress, [0, 0.3], ["100vh", "35vh"]);

  // Content appearance
 const contentOpacity = useTransform(scrollYProgress, [0.12, 0.22], [0.2, 1]);
const contentY = useTransform(scrollYProgress, [0.12, 0.22], [30, 0]);
  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#F7F7F5]">
      <section
        className={cn(
          "sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden",
          cursorSectionClassName
        )}
        {...cursorSectionProps}
      >
        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] md:opacity-[0.06] z-0">
          <div className="grid grid-cols-3 md:grid-cols-6 h-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={cn("border-r border-black", i >= 3 && "hidden md:block")} />
            ))}
          </div>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:pr-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <motion.div
              style={{ 
                opacity: contentOpacity, 
                y: contentY,
                // On mobile, ensure it doesn't get covered by the video when it shrinks
                marginTop: isMobile ? "35vh" : "0" 
              }}
              className="max-w-xl py-6 sm:py-12 lg:py-0"
            >
              <p className="text-[10px] md:text-xs tracking-[0.3em] text-black uppercase mb-4 md:mb-12">
                002 / FIRE & SAFETY
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-serif leading-[1.1] md:leading-[0.95] tracking-tight mb-4 md:mb-8">
                <span className="block text-[#2b2b2b]">Fire Standards & </span>
                <span className="block text-orange-500 italic">Certifications</span>
              </h2>

              <p className="text-[#6B6B6B] text-sm md:text-lg max-w-md mb-6 md:mb-10">
                From European classifications to American NFPA codes,
                every panel is independently tested and globally certified.
              </p>

              <button className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E5E5] text-[#1A1A1A] overflow-hidden relative transition-all duration-300 text-sm">
                <span className="relative z-10 group-hover:text-white transition">
                  View all certifications →
                </span>
                <span className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              </button>

              {/* CAROUSEL */}
              <div
                className="mt-6 md:mt-10 overflow-visible cursor-grab active:cursor-grabbing -mx-4 sm:-mx-6 md:-mx-10 px-4 sm:px-6 md:px-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ left: -1000, right: 0 }}
                  animate={{ x: isHovered ? undefined : [0, -600] }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="flex w-max gap-4 md:gap-6 py-4 md:py-8"
                >
                  {[...certs, ...certs].map((item, i) => (
                    <Card key={i} item={item} />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Spacer for Desktop Layout */}
            <div className="hidden lg:block h-screen" />
          </div>
        </div>

        {/* VIDEO ELEMENT */}
        <motion.div
          style={{
            width: isMobile ? "100%" : videoWidth,
            height: isMobile ? videoHeightMobile : "100%",
            x: isMobile ? 0 : videoX,
          }}
          className="absolute top-0 left-0 z-20 overflow-hidden bg-black shadow-2xl"
        >
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://res.cloudinary.com/drgg4st9a/video/upload/v1776065390/VN20260413_125908_z8mjdx.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </section>
    </div>
  );
}

function Card({ item }: { item: (typeof certs)[number] }) {
  return (
    <div className="w-[180px] md:w-[240px] rounded-xl border border-[#E5E5E5] bg-white p-4 md:p-5 shadow-sm shrink-0">
      <h3 className="text-sm md:text-base font-semibold text-[#1A1A1A]">
        {item.title}
      </h3>
      <p className="text-[10px] md:text-xs mt-1 text-[#6B6B6B] leading-tight">
        {item.desc}
      </p>
      <p className="text-[10px] mt-3 font-bold text-orange-500 tracking-wider uppercase">
        {item.tag}
      </p>
    </div>
  );
}