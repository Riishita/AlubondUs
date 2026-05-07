"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/* ================= CTA SECTION ================= */

/* ================= CTA SECTION ================= */

const CTASection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { smoothProgress: scrollYProgress } = useSectionScroll(
    sectionRef,
    ["start end", "end start"]
  );

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
      /* Added flex, items-center, justify-center, and text-center */
      className={`relative overflow-hidden px-6 py-24 text-white md:px-16 md:py-32 flex flex-col items-center justify-center text-center ${cursorSectionClassName}`}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
      }}
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
        /* justify-center added to the button container's parent flex */
        className="relative z-10 max-w-5xl transform-gpu flex flex-col items-center"
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

        {/* Added justify-center to keep buttons centered */}
        <div className="flex gap-4 flex-wrap justify-center">
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

/* ================= PREMIUM TRANSITION ================= */

const SectionDivider = () => {
  const containerRef = useRef(null);
  const { smoothProgress: scrollYProgress } = useSectionScroll(
    containerRef,
    ["start end", "end start"]
  );

  const width = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-px w-full bg-white/10 overflow-visible">
      <motion.div 
        style={{ width, opacity }}
        className="absolute inset-0 mx-auto h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(96,165,250,0.5)]" 
      />
    </div>
  );
};

/* ================= FOOTER ================= */

const Footer = () => {
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);

  // Orange theme hover class
  const hoverOrange = "hover:text-orange-500 transition-colors duration-300 cursor-pointer";

  return (
    <footer
      {...cursorSectionProps}
      className={`relative bg-[#0a0a0a] text-white px-6 md:px-16 py-16 md:py-24 ${cursorSectionClassName}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Text */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-white/90 leading-snug">
            Precision-engineered façade solutions designed to <br className="hidden md:block" />
            bring architectural vision to life.
          </h2>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white/10 mb-16 md:mb-20" />

        {/* Middle Grid - Responsive 2 Columns for Tablet/Mobile, 4 for Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 text-[13px] md:text-[14px] text-white/70 font-light mb-20 md:mb-32">
          
          {/* Col 1: Contact */}
          <div className="flex flex-col gap-6">
            <p className="text-white/40 uppercase tracking-tighter text-[10px] mb-2">Contact</p>
            <p className={hoverOrange}>info@alubondusa.com</p>
            <p className={hoverOrange}>+1 (305) 000-0000</p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-white/40 uppercase tracking-tighter text-[10px] mb-2">Explore</p>
            {["Home", "Technology", "Projects", "Contact"].map((item) => (
              <span key={item} className={hoverOrange}>{item}</span>
            ))}
          </div>

          {/* Col 3: Technical Resources */}
          <div className="flex flex-col gap-4">
            <p className="text-white/40 uppercase tracking-tighter text-[10px] mb-2">Resources</p>
            {["BIM Families", "Technical Datasheets", "Installation Guidelines", "Certifications", "Brochures", "Request a Sample"].map((item) => (
              <span key={item} className={hoverOrange}>{item}</span>
            ))}
          </div>

          {/* Col 4: Socials */}
          <div className="flex flex-col gap-4 uppercase tracking-widest text-[11px] md:text-[12px]">
             <p className="text-white/40 uppercase tracking-tighter text-[10px] mb-2">Social</p>
            {[
              { name: "LINKEDIN", url: "#" },
              { name: "INSTAGRAM", url: "#" },
              { name: "FACEBOOK", url: "#" },
              { name: "YOUTUBE", url: "#" },
            ].map((social) => (
              <a key={social.name} href={social.url} className={`group flex items-center justify-between max-w-[140px] ${hoverOrange}`}>
                <span>{social.name}</span>
                <span className="transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↘</span>
              </a>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Section: Copyright & Legal Links Horizontal */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] md:text-[13px] text-white/50 gap-6">
          <p>Copyright: © 2026 Alubond U.S.A. All Rights Reserved.</p>
          
          <div className="flex gap-6 md:gap-10">
            {["FAQ", "Terms", "Privacy"].map((link) => (
              <span key={link} className={hoverOrange}>
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================= FINAL ================= */

export default function FinalSection() {
  return (
    <main className="bg-[#020617]">
      <CTASection />
      <SectionDivider />
      <Footer />
    </main>
  );
}