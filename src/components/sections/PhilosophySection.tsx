"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";

const ThirdSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ✨ Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative min-h-screen overflow-hidden bg-[#eae7e2] pb-32 pt-40 text-[#1f2937]",
        cursorSectionClassName
      )}
      {...cursorSectionProps}
    >
      {/* ✨ FLOATING LIGHT EFFECT */}
      {!reduceMotion && (
        <motion.div
          className="absolute left-[-100px] top-[-100px] h-[500px] w-[500px] rounded-full bg-orange-400/10 blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      )}

      {/* ✨ GRID (responsive clean grid) */}
<div className="absolute inset-0 pointer-events-none opacity-[0.04] md:opacity-[0.05]">
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
</div>

      {/* 📦 CONTENT */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto"
      >
        {/* 🔶 LABEL */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-xs text-black/40 uppercase mb-16"
        >
          001 / Technology
        </motion.p>

        {/* 🧱 TOP GRID */}
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* LEFT */}
          <motion.div style={{ y: yText }}>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.45 }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="text-6xl md:text-8xl font-serif leading-[0.95]"
            >
              {["ALUBOND", "PHILOSOPHY"].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 80 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className={`block ${
                    i === 1 ? "text-orange-500" : "text-[#2b2b2b]"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl text-black/70 leading-relaxed"
          >
            Architecture should speak of its time and place, but yearn for timelessness.
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-sm text-orange-500 tracking-widest"
            >
              — FRANK GEHRY
            </motion.div>
          </motion.div>
        </div>

        {/* 🔸 ANIMATED DIVIDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-4 my-20 origin-left"
        >
          <div className="flex-1 h-[1px] bg-black/10" />
          <motion.div
  layoutId="reveal-square"
  animate={{ rotate: [45, 225, 45] }}
  transition={{ duration: 6, repeat: Infinity }}
  className="w-2 h-2 bg-orange-500"
/>
          <div className="flex-1 h-[1px] bg-black/10" />
        </motion.div>

        {/* 📖 STORY */}
        <motion.div
          style={{ y: yText }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="max-w-3xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-lg italic text-black/70 mb-6"
          >
            A façade is not just the outer skin of a building — it is the expression of its character, ambition, and identity.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-black/60 leading-relaxed"
          >
            At Alubond, we believe every façade must do justice to the architect's vision while delivering the precision, consistency, and reliability demanded on site. Our philosophy is rooted in quality without compromise, care in every detail, and a deep understanding of what each project requires — from architects and consultants to façade contractors and developers. Because great façades are not simply manufactured. They are understood, engineered, and brought to life with intent.


          </motion.p>

          {/* 🔘 ABOUT BUTTON */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mt-10"
>
  <button className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-full border border-black/20 overflow-hidden transition-all duration-300">
    
    {/* TEXT */}
    <span className="relative z-10 text-sm tracking-wide text-[#1f2937] group-hover:text-white transition">
      About Us
    </span>

    {/* ARROW */}
    <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
      →
    </span>

    {/* HOVER BG */}
    <span className="absolute inset-0 bg-[#1f2937] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
  </button>
</motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default ThirdSection;