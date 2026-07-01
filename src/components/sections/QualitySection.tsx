"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText } from "lucide-react";

const stats = [
  {
    stat: "100+",
    label: "Countries Reached",
    desc: "Delivering trusted façade solutions across diverse global markets with consistent quality and performance.",
    accent: "#0a4b7c",
  },
  {
    stat: "50,000+",
    label: "Projects Worldwide",
    desc: "From iconic skylines to modern infrastructure, our panels power projects at every scale.",
    accent: "#0a4b7c",
  },
  {
    stat: "35+",
    label: "Years of Leadership",
    desc: "Decades of innovation, engineering excellence, and leadership in advanced building materials.",
    accent: "#0a4b7c",
  },
];

export default function QualitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  return (
    <section
      ref={ref}
      {...cursorSectionProps}
      className={`relative w-full bg-white ${cursorSectionClassName}`}
      style={{ minHeight: "100vh" }}
    >
      {/* ── Main two-column layout ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 flex flex-col h-full">

        {/* TOP ROW: Left text + Right video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center flex-1">

          {/* ── LEFT: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[#0a4b7c]" />
              <p className="tracking-[0.2em] text-[10px] md:text-xs font-semibold text-[#0a4b7c] uppercase">
                002 / Quality
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
              Weather<br />
              <span className="text-[#0a4b7c] font-medium"> Resistance</span>
            </h2>

            {/* Body */}
            <p className="text-base md:text-lg text-[#4B5563] leading-relaxed font-light max-w-md mb-8">

Designed to perform in the harshest environments, our panels meet ASTM and other international quality standards to ensure durability, safety, and consistent performance. Advanced paint systems deliver excellent UV, weather, and corrosion resistance, while rigorous anti-delamination testing ensures long-term structural integrity. Every certification reflects our commitment to globally recognized quality and reliable architectural performance.
        </p>
        <a href="#" target="_blank" className="inline-flex items-center gap-2 text-white bg-[#0a4b7c] hover:bg-[#0a4b7c]/90 px-6 py-3 rounded-full text-sm font-medium transition-colors w-fit shadow-lg shadow-[#0a4b7c]/20">
          <FileText size={18} /> View Certificate
        </a>

           
          </motion.div>

          {/* ── RIGHT: Video in a rounded box ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative w-full"
          >
            {/* Soft shadow backdrop */}
            <div className="absolute -inset-3 bg-[#0a4b7c]/8 rounded-[2rem] blur-2xl pointer-events-none" />

            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-[#0a4b7c]/10 shadow-[0_24px_80px_rgba(10,75,124,0.12)]"
              style={{ aspectRatio: "19/12" }}
            >
              <video
                src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1782818326/VN20260627_162429_unovtj.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Subtle inner vignette */}
              <div className="absolute inset-0 rounded-[1.75rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.08)] pointer-events-none" />
            </div>

            {/* Video caption tag */}
           
          </motion.div>
        </div>

        {/* ── BOTTOM ROW: 3 Stat Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(10,75,124,0.12)" }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="bg-white border border-[#0a4b7c]/10 rounded-2xl p-6 md:p-7 shadow-[0_4px_24px_rgba(10,75,124,0.06)] cursor-default"
            >
              {/* Stat */}
              <span
                className="block text-3xl md:text-4xl font-semibold tracking-tight mb-1"
                style={{ color: "#0a4b7c" }}
              >
                {s.stat}
              </span>
              {/* Label */}
              <span className="block text-[10px] tracking-[0.22em] uppercase font-semibold text-[#0a4b7c]/60 mb-3">
                {s.label}
              </span>
              {/* Divider */}
              <div className="w-8 h-[1px] bg-[#0a4b7c]/20 mb-3" />
              {/* Desc */}
              <p className="text-sm text-[#6B7280] leading-relaxed font-light">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}