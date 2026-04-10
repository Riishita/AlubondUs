"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Al-Rashid",
    role: "Principal Architect, Dubai",
    text: "Fire-rated performance and finish quality stayed consistent from mockups to full-height execution.",
  },
  {
    name: "Elena Muller",
    role: "Construction Director, Berlin",
    text: "Delivery precision and panel consistency helped us accelerate facade installation without rework.",
  },
  {
    name: "James Chen",
    role: "Facade Engineer, Singapore",
    text: "Coating integrity and long-term weather response have been excellent across humid tropical exposure.",
  },
];

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const shellY = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const shellScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], [10, -40]);

  const rm = Boolean(reduceMotion);

  return (
    <section
  ref={sectionRef}
  className="relative z-30 -mt-[20vh] md:-mt-[25vh] w-full overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3rem] py-20 md:py-28"
>
      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,#020F2F_0%,#1E3A6D_50%,#4FA3C1_100%)]" />

      {/* ✨ SOFT GLOW */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_50%_40%_at_50%_20%,rgba(255,170,120,0.12),transparent_70%)]"
        style={{ y: rm ? 0 : glowY }}
      />

      {/* CONTENT */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20"
        style={{ y: rm ? 0 : shellY, scale: rm ? 1 : shellScale }}
      >
        {/* HEADER */}
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={rm ? false : { opacity: 0, y: 20 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.26em] text-orange-300/90 md:text-sm">
            Social Proof
          </p>
          <h2 className="mx-auto max-w-3xl font-heading text-3xl md:text-5xl text-white leading-tight">
            Trusted by leading facade teams
          </h2>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-[1.02]"
              initial={rm ? false : { opacity: 0, y: 30, scale: 0.96 }}
              whileInView={rm ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: rm ? 0 : index * 0.08,
                ease: EASE_PREMIUM,
              }}
            >
              {/* ⭐ STARS */}
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-orange-300 text-orange-300"
                  />
                ))}
              </div>

              {/* TEXT */}
              <p className="mb-5 text-sm leading-relaxed text-white/80">
                {item.text}
              </p>

              {/* USER */}
              <div>
                <p className="font-heading text-base text-white">
                  {item.name}
                </p>
                <p className="text-xs text-white/60 md:text-sm">
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}