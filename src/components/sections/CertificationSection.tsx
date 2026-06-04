"use client";

import { motion, MotionValue } from "framer-motion";
import { ShieldCheck, Flame, Globe2, Award, FileCheck2, Building2 } from "lucide-react";

// Add some nice icons for the cards
const certs = [
  { title: "EN 13501", desc: "European Fire Classification", tag: "CLASS A2-S1,D0", icon: Flame },
  { title: "NFPA 285", desc: "Fire Propagation", tag: "FULLY COMPLIANT", icon: ShieldCheck },
  { title: "BS 8414", desc: "British Standard", tag: "BRE CERTIFIED", icon: Building2 },
  { title: "ULC-S134", desc: "Canadian Fire Test", tag: "COMPLIANT", icon: Globe2 },
  { title: "ASTM E-84", desc: "Smoke & Flame Spread", tag: "CLASS A RATING", icon: FileCheck2 },
  { title: "ISO 9001", desc: "Quality Management", tag: "CERTIFIED FACILITY", icon: Award },
];

export default function FireHorizontalExperience({ 
  scrollProgress, 
  isMobile 
}: { 
  scrollProgress: MotionValue<number>, 
  isMobile: boolean 
}) {
  return (
    <div className="relative h-screen w-full bg-[#F7F7F5] overflow-hidden flex items-center">
      {/* BACKGROUND ACCENTS */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className={isMobile ? "grid grid-rows-6 w-full h-full" : "grid grid-cols-6 h-full"}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={isMobile ? "border-b border-black w-full" : "border-r border-black h-full"} />
          ))}
        </div>
      </div>
      
      {/* Subtle glowing orb in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#0a4b7c]/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 lg:px-20 pt-20 md:pt-0">
        
        {/* LEFT COLUMN: TEXT */}
        <div className="w-full md:w-5/12 flex flex-col justify-center shrink-0">
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
            <span className="h-[1px] w-6 md:w-8 bg-[#0a4b7c]"></span>
            <p className="tracking-[0.2em] text-[10px] md:text-xs font-semibold text-[#0a4b7c] uppercase">
              002 / Fire & Safety
            </p>
          </div>

          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-[#1A1A1A] mb-4 md:mb-8 leading-[1.1]">
            Fire Standards <br className="hidden md:block" />
            <span className="text-[#0a4b7c] md:inline block">& Certifications</span>
          </h2>
          
          <p className="text-sm md:text-lg text-[#4B5563] max-w-md mb-6 md:mb-10 leading-relaxed font-light">
            Engineered for ultimate safety. From European classifications to American NFPA codes, every panel is independently tested, verified, and globally certified.
          </p>

          <button className="group relative inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#1A1A1A] text-white rounded-full overflow-hidden w-fit transition-all duration-300 hover:shadow-xl hover:shadow-[#1A1A1A]/20 hover:-translate-y-1">
            <span className="relative z-10 text-xs md:text-sm tracking-wider font-medium uppercase">
              View all
            </span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 bg-[#0a4b7c] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </button>
        </div>

        {/* RIGHT COLUMN: CERTIFICATE GRID */}
        <div className="w-full md:w-7/12 flex items-center justify-center relative mt-10 md:mt-0">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 lg:gap-6 w-full max-w-2xl relative scale-90 lg:scale-100 origin-center">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {certs.slice(0, 3).map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4 lg:gap-6 mt-12 lg:mt-16">
              {certs.slice(3, 6).map((item, i) => (
                <Card key={i + 3} item={item} />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Horizontal Scroll */}
          <div className="flex md:hidden w-[100vw] -mx-6 px-6 overflow-x-auto snap-x snap-mandatory gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
             {certs.map((item, i) => (
                <div key={i} className="snap-center shrink-0 w-[75vw] sm:w-[300px]">
                   <Card item={item} isMobile={true} />
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function Card({ item, isMobile = false }: { item: (typeof certs)[number], isMobile?: boolean }) {
  const Icon = item.icon;
  return (
    <div 
      className={`group relative bg-white/70 backdrop-blur-xl border border-white ${isMobile ? 'p-5' : 'p-6 lg:p-8'} rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-default`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`flex items-center justify-between ${isMobile ? 'mb-4' : 'mb-6'}`}>
          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-2xl bg-[#F3F4F6] flex items-center justify-center group-hover:bg-[#0a4b7c] group-hover:text-white transition-colors duration-500 text-[#0a4b7c]`}>
            <Icon size={isMobile ? 20 : 24} strokeWidth={1.5} />
          </div>
          <span className={`px-3 py-1 bg-[#F3F4F6] text-[#4B5563] text-[9px] md:text-[10px] font-bold tracking-widest uppercase rounded-full group-hover:bg-[#0a4b7c]/10 group-hover:text-[#0a4b7c] transition-colors duration-500`}>
            {item.tag}
          </span>
        </div>
        
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-[#111827] mb-2`}>{item.title}</h3>
        <p className={`text-xs md:text-sm text-[#6B7280] leading-relaxed font-light ${isMobile ? 'line-clamp-2' : ''}`}>{item.desc}</p>
        
        <div className={`mt-4 md:mt-6 w-full h-[1px] bg-gradient-to-r from-gray-200 to-transparent group-hover:from-[#0a4b7c]/30 transition-colors duration-500`} />
      </div>
    </div>
  );
}