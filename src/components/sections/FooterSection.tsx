"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";

/* ================= CTA SECTION ================= */

const CTASection = () => {

  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  // ✅ FIX: moved inside component
  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const fadeIn = useTransform(scrollYProgress, [0.05, 0.35], [0.6, 1]);
  const scaleIn = useTransform(scrollYProgress, [0, 0.4], [0.96, 1]);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        x: `${(i % 8) * 14 + 6}%`,
        y: `${Math.floor(i / 8) * 42 + 18}%`,
        delay: i * 0.2,
      })),
    []
  );

  const glowX = useTransform(mouseX, (v) => v - 200);
  const glowY = useTransform(mouseY, (v) => v - 200);

  const glowBg = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(106,196,255,0.18), transparent 65%)`;

  return (
    <section
      ref={sectionRef}
      {...cursorSectionProps}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      className={`relative overflow-hidden px-6 py-24 text-white md:px-16 md:py-32 ${cursorSectionClassName}`}
    >

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,#4aa3b5_0%,#1e3a6d_40%,#020617_100%)]" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBg }}
      />

      <motion.div
        className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-blue-400/20 blur-[100px] md:h-[400px] md:w-[400px] md:blur-[120px]"
        style={{ x: glowX, y: glowY }}
      />

      {!reduceMotion &&
        particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1 w-1 rounded-full bg-white/50"
            style={{ left: particle.x, top: particle.y }}
            animate={{ y: [0, -16, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      <motion.div
        style={{ opacity: fadeIn, scale: reduceMotion ? 1 : scaleIn }}
        className="relative z-10 max-w-5xl transform-gpu"
      >
        <p className="text-xs tracking-[0.3em] text-white/50 mb-6">
          006 / Let's Build
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          REQUEST <br /> TECHNICAL SPECS
        </motion.h2>

        <p className="text-white/70 max-w-xl mb-10">
          Get datasheets, fire test reports, and sample panels delivered
          to your specification team.
        </p>

        <div className="flex gap-4 flex-wrap">

          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-white text-[#1E2A5A] font-medium flex items-center gap-2 shadow-lg hover:shadow-blue-500/40 transition-all"
          >
            Request Technical Specs <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            className="px-8 py-4 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-all"
          >
            Downloads
          </motion.button>

        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-blue-500/20 to-transparent" />
    </section>
  );
};

/* ================= FOOTER ================= */

const Footer = () => {
  const reduceMotion = useReducedMotion();

  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  return (
    <motion.footer
      {...cursorSectionProps}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden px-8 py-20 text-black md:px-20 ${cursorSectionClassName}`}
    >

      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://cdn.pixabay.com/video/2020/01/15/31290-385265697_large.mp4" type="video/mp4" />
      </video>

      {/* 🔥 DARK OVERLAY (important for readability) */}
      <div className="absolute inset-0 bg-[#020617]/0 backdrop-blur-[2px]" />

      {/* ✨ OPTIONAL GLOW LAYER */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02),rgba(255,255,255,0.06))]"
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-12 text-sm">

        <div>
          <p className="text-xs tracking-widest opacity-70 mb-4">
            Precision-engineered façade solutions designed to bring architectural vision to life.
          </p>
        </div>

        <div>
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            Technical Resources
          </p>
          <ul className="space-y-2">
            {[
              "BIM Families",
              "Technical Datasheets",
              "Installation Guidelines",
              "Certifications & Reports",
              "Brochures",
              "Request a Sample",
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={reduceMotion ? undefined : { x: 4 }}
                className="cursor-pointer hover:opacity-80"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            Quick Links
          </p>
          <ul className="space-y-2">
            {["Home", "Technology", "Projects", "Contact"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={reduceMotion ? undefined : { x: 4 }}
                className="cursor-pointer hover:opacity-80"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            Social
          </p>
          <ul className="space-y-2">
            {["LinkedIn", "Instagram", "Facebook", "YouTube"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={reduceMotion ? undefined : { x: 4 }}
                className="cursor-pointer hover:opacity-80"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="md:text-right">
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            Contact
          </p>

          <h3 className="text-lg md:text-xl font-semibold">
            info@alubondusa.com
          </h3>

          <p className="mt-6 text-xs opacity-70">
            +1 (305) 000-0000
          </p>
        </div>
      </div>

      {/* LOGO */}
      <div className="relative z-10 flex justify-center my-16">
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          className="w-16 h-16 bg-[#141B3A]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl"
        >
          <img src="/alubond-logo.png" className="w-10 h-10 object-contain" />
        </motion.div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-xs opacity-90 gap-4">
        <p>© 2026 Alubond U.S.A.</p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:opacity-100">Privacy Policy</span>
          <span className="cursor-pointer hover:opacity-100">Terms of Use</span>
        </div>
      </div>
    </motion.footer>
  );
};


/* ================= FINAL ================= */

export default function FinalSection() {
  return (
    <>
      <CTASection />
      <Footer />
    </>
  );
}