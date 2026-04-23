"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  hideVideo 
}: { 
  scrollProgress: MotionValue<number>, 
  hideVideo?: boolean 
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Content fades in as video shrinks (0.15 to 0.35)
  const contentOpacity = useTransform(scrollProgress, [0.15, 0.35], [0, 1]);
  const contentY = useTransform(scrollProgress, [0.15, 0.35], [40, 0]);

  return (
    <div className="relative h-screen w-full bg-[#F7F7F5] overflow-hidden">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-black h-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex items-center px-6 md:px-12">
        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="max-w-xl">
          <p className="text-[10px] tracking-[0.3em] text-black uppercase mb-6">002 / FIRE & SAFETY</p>
          <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-6">
            <span className="block text-[#2b2b2b]">Fire Standards & </span>
            <span className="block text-orange-500 italic">Certifications</span>
          </h2>
          
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: isHovered ? undefined : [0, -800] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex w-max gap-6 py-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {[...certs, ...certs].map((item, i) => (
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
    <div className="w-[200px] md:w-[260px] rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-sm shrink-0">
      <h3 className="text-base font-semibold text-[#1A1A1A]">{item.title}</h3>
      <p className="text-xs mt-1 text-[#6B6B6B] leading-tight">{item.desc}</p>
      <p className="text-[10px] mt-4 font-bold text-orange-500 tracking-widest uppercase">{item.tag}</p>
    </div>
  );
}