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

  return (
    <section
      className={cn("relative overflow-hidden bg-[#F7F7F5] py-16 md:py-32", cursorSectionClassName)}
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

        {/* 🔥 Horizontal lines */}
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-black opacity-50 md:opacity-100" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-black opacity-50 md:opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* HEADER */}
        <div className="mb-12 md:mb-20 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="max-w-3xl">
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-black/40 uppercase mb-8 md:mb-16">
              002 / FIRE & SAFETY
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif leading-[1.1] md:leading-[0.95] tracking-tight">
              <span className="block text-[#2b2b2b]">
                Fire Standards
              </span>
              <span className="block text-orange-500">
                & Certifications
              </span>
            </h2>

            <p className="mt-6 text-[#6B6B6B] text-base md:text-lg max-w-xl">
              From European classifications to American NFPA codes,
              every panel is independently tested and globally certified
              for fire performance.
            </p>

            {/* 🔥 PREMIUM BUTTON */}
            <button className="group mt-8 md:mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E5E5] text-[#1A1A1A] overflow-hidden relative transition-all duration-300">
              <span className="relative z-10 group-hover:text-white transition text-sm md:text-base">
                View all certifications
              </span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
                →
              </span>
              <span className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </button>
          </div>

          {/* Right: marble resilience video */}
          <div className="mx-auto w-full max-w-sm md:max-w-md lg:mx-0 lg:max-w-none">
            <MarbleResilienceVideo />
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing -mx-6 md:-mx-10 px-6 md:px-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            animate={{ x: isHovered ? undefined : [0, -1000] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="flex w-max gap-4 md:gap-8 py-4"
          >
            {[...certs, ...certs, ...certs].map((item, i) => (
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
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-[220px] md:w-[280px] transform-gpu rounded-2xl border bg-white/90 p-5 shadow-sm transition-all duration-300 hover:shadow-xl md:p-6"
      style={{ borderColor: "#E5E5E5" }}
    >
      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#1A1A1A]">
        {item.title}
      </h3>

      <p className="text-xs md:text-sm mt-2 text-[#6B6B6B]">
        {item.desc}
      </p>

      <p className="text-xs md:text-sm mt-4 font-medium tracking-wide text-[#E1654A]">
        {item.tag}
      </p>
    </motion.div>
  );
}