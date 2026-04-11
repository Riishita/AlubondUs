"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MarbleResilienceVideo from "@/components/sections/MarbleResilienceVideo";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";

const certs = [
  { title: "EN 13501", desc: "European Fire Classification", tag: "CLASS A2-S1,D0" },
  { title: "NFPA 285", desc: "Fire Propagation", tag: "FULLY COMPLIANT" },
  { title: "BS 8414", desc: "British Standard", tag: "BRE CERTIFIED" },
  { title: "ULC-S134", desc: "Canadian Fire Test", tag: "COMPLIANT" },
  { title: "ASTM E-84", desc: "Smoke & Flame Spread", tag: "CLASS A RATING" },
  { title: "ISO 9001", desc: "Quality Management", tag: "CERTIFIED FACILITY" },
];

export default function FireHorizontalExperience() {
  const [isHovered, setIsHovered] = useState(false);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

  const topRow = certs.slice(0, 3);
  const bottomRow = certs.slice(3, 6);

  return (
    <section
      className={cn("relative overflow-hidden bg-[#F7F7F5] py-32", cursorSectionClassName)}
      {...cursorSectionProps}
    >


{/* ✨ VERY LIGHT GRID (responsive clean) */}
<div className="absolute inset-0 pointer-events-none opacity-[0.04] md:opacity-[0.06]">

  {/* Vertical lines */}
  <div className="grid grid-cols-3 md:grid-cols-6 h-full">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className={`border-r border-black ${
          i >= 3 ? "hidden md:block" : ""
        }`}
      />
    ))}
  </div>

  {/* 🔥 Horizontal lines (lighter on mobile) */}
  <div className="absolute top-1/3 left-0 w-full h-[1px] bg-black opacity-50 md:opacity-100" />
  <div className="absolute top-2/3 left-0 w-full h-[1px] bg-black opacity-50 md:opacity-100" />

</div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">

        {/* HEADER */}
        <div className="mb-20 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="max-w-3xl">

          <p className="text-xs tracking-[0.3em] text-black/40 uppercase mb-16">
          002 / FIRE & SAFETY
        </p>

          <h2 className="text-6xl md:text-8xl font-serif leading-[0.95] tracking-tight">
              <span className="block text-[#2b2b2b]">
                Fire Standards
              </span>
              <span className="block text-orange-500">
                & Certifications
              </span>
            </h2>

          <p className="mt-6 text-[#6B6B6B] text-lg max-w-xl">
            From European classifications to American NFPA codes,
            every panel is independently tested and globally certified
            for fire performance.
          </p>

          {/* 🔥 PREMIUM BUTTON */}
          <button className="group mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E5E5] text-[#1A1A1A] overflow-hidden relative transition-all duration-300">
            
            <span className="relative z-10 group-hover:text-white transition">
              View all certifications
            </span>

            <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
              →
            </span>

            {/* hover bg */}
            <span className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
          </button>
          </div>

          {/* Right: marble resilience video (visual only) */}
          <div className="mx-auto w-full max-w-md mt-14  lg:mx-0 lg:max-w-none">
            <MarbleResilienceVideo />
          </div>
        </div>

        {/* EDGE FADE (LEFT + RIGHT)
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#F7F7F5] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#F7F7F5] to-transparent z-20" /> */}

       <div
  className="overflow-hidden cursor-grab active:cursor-grabbing"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <motion.div
    drag="x"
    dragConstraints={{ left: -500, right: 0 }}
    animate={{ x: isHovered ? 0 : [0, -500] }}
    transition={{
      repeat: Infinity,
      duration: 15,
      ease: "linear",
    }}
    className="flex w-max gap-6 md:gap-8"
  >
    {[...certs, ...certs].map((item, i) => (
      <Card key={`${item.title}-${i}`} item={item} />
    ))}
  </motion.div>
</div>

      </div>
    </section>
  );
}

/* ================= CARD ================= */
function Card({ item }: { item: (typeof certs)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ scale: 1.04, y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="min-w-[240px] transform-gpu rounded-2xl border bg-white/90 p-5 shadow-sm transition-all duration-300 [transform-style:preserve-3d] hover:shadow-xl md:min-w-[280px] md:p-6"
      style={{ borderColor: "#E5E5E5" }}
    >
      <h3 className="text-xl font-semibold tracking-tight text-[#1A1A1A]">
        {item.title}
      </h3>

      <p className="text-sm mt-2 text-[#6B6B6B]">
        {item.desc}
      </p>

      <p className="text-sm mt-4 font-medium tracking-wide text-[#E1654A]">
        {item.tag}
      </p>
    </motion.div>
  );
}