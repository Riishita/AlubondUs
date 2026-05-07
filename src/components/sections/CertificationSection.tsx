"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState } from "react";

const certs = [
  { title: "EN 13501", desc: "European Fire Classification", tag: "CLASS A2-S1,D0" },
  { title: "NFPA 285", desc: "Fire Propagation", tag: "FULLY COMPLIANT" },
  { title: "BS 8414", desc: "British Standard", tag: "BRE CERTIFIED" },
  { title: "ULC-S134", desc: "Canadian Fire Test", tag: "COMPLIANT" },
  { title: "ASTM E-84", desc: "Smoke & Flame Spread", tag: "CLASS A RATING" },
  { title: "ISO 9001", desc: "Quality Management", tag: "CERTIFIED FACILITY" },
];

export default function FireHorizontalExperience({ 
  scrollProgress, 
  isMobile 
}: { 
  scrollProgress: MotionValue<number>, 
  isMobile: boolean 
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Content fades in as video shrinks
  const contentOpacity = useTransform(scrollProgress, [0.15, 0.35], [0, 1]);
  // Move text slightly up as it appears
  const contentY = useTransform(scrollProgress, [0.15, 0.35], [20, 0]);

  return (
    <div className="relative h-screen w-full bg-[#F7F7F5] overflow-hidden">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0">
        <div className={isMobile ? "grid grid-rows-6 w-full h-full" : "grid grid-cols-6 h-full"}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={isMobile ? "border-b border-black w-full" : "border-r border-black h-full"} />
          ))}
        </div>
      </div>

      <div className={`relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 ${isMobile ? 'pt-[40vh]' : ''}`}>
        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="w-full md:max-w-xl">
          <p className="text-[10px] md:text-xs tracking-[0.3em] text-black uppercase mb-4 md:mb-8">
            002 / FIRE & SAFETY
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.1] mb-4 md:mb-6">
            <span className="block text-[#2b2b2b]">Fire Standards & </span>
            <span className="block text-orange-500 italic">Certifications</span>
          </h2>
          
          <p className="text-[#6B6B6B] text-xs sm:text-sm md:text-lg max-w-md mb-6 md:mb-10">
            From European classifications to American NFPA codes,
            every panel is independently tested and globally certified.
          </p>

          <button className="group inline-flex items-center gap-2 px-6 py-2.5 md:py-3 rounded-full border border-[#E5E5E5] text-[#1A1A1A] overflow-hidden relative transition-all duration-300 text-xs md:text-sm mb-8 md:mb-12">
            <span className="relative z-10 group-hover:text-white transition">
              View all certifications →
            </span>
            <span className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </button>

          <div className="overflow-hidden w-full relative">
             {/* Gradient Mask for Carousel */}
             <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#F7F7F5] to-transparent z-10" />
             <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F7F7F5] to-transparent z-10" />
            
            <motion.div
              animate={{ x: isHovered ? undefined : [0, -800] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex w-max gap-4 md:gap-6 py-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {[...certs, ...certs, ...certs].map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

function Card({ item }: { item: (typeof certs)[number] }) {
  return (
    <div className="w-[140px] sm:w-[180px] md:w-[260px] rounded-xl border border-[#E5E5E5] bg-white p-3 md:p-5 shadow-sm shrink-0 transition-transform hover:scale-[1.02]">
      <h3 className="text-[10px] sm:text-xs md:text-base font-semibold text-[#1A1A1A] line-clamp-1">{item.title}</h3>
      <p className="text-[8px] sm:text-[10px] md:text-xs mt-1 text-[#6B6B6B] leading-tight line-clamp-2">{item.desc}</p>
      <div className="mt-3 md:mt-7">
        <p className="text-[7px] sm:text-[8px] md:text-[10px] font-bold text-orange-500 tracking-widest uppercase">{item.tag}</p>
      </div>
    </div>
  );
}