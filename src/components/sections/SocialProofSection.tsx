"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

  const shellY = useTransform(scrollYProgress, [0, 1], [96, -128]);
  const shellScale = useTransform(scrollYProgress, [0, 1], [0.97, 1.02]);
  const glowY = useTransform(scrollYProgress, [0, 1], [20, -52]);

  const rm = Boolean(reduceMotion);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 -mt-[16vh] w-full overflow-hidden rounded-t-[2.5rem] py-24 md:-mt-[18vh] md:rounded-t-[3rem] md:py-28"
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#12337d_0%,#5bc9ff_100%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_45%_35%_at_50%_20%,rgba(255,170,120,0.2),transparent_65%)]"
        style={{ y: rm ? 0 : glowY }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-5 md:px-12 lg:px-20"
        style={{ y: rm ? 0 : shellY, scale: rm ? 1 : shellScale }}
      >
        <motion.div
          className="mb-8 text-center md:mb-12"
          initial={rm ? false : { opacity: 0, y: 20 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.26em] text-orange-300/90 md:text-sm">
            Social Proof
          </p>
          <h2 className="mx-auto max-w-3xl font-heading text-3xl text-white md:text-5xl">
            Trusted by leading facade teams
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              className="rounded-2xl border border-white/20 bg-white/[0.08] p-5 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md md:p-6"
              initial={rm ? false : { opacity: 0, y: 18, scale: 0.98 }}
              whileInView={rm ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                duration: 0.6,
                delay: rm ? 0 : index * 0.08,
                ease: EASE_PREMIUM,
              }}
            >
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-300 text-orange-300" />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/80">{item.text}</p>
              <div>
                <p className="font-heading text-base text-white">{item.name}</p>
                <p className="text-xs text-white/65 md:text-sm">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
