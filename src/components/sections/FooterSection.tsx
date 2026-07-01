"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { ArrowRight, Linkedin, Instagram, Facebook, Youtube, Download } from "lucide-react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { useSectionScroll } from "@/hooks/useSectionScroll";


/* ================= CTA SECTION ================= */

const CTASection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  // 👇 ADD YOUR BACKGROUND IMAGE URL HERE 👇
  const bgImageUrl = "/footer.webp";

  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { smoothProgress: scrollYProgress } = useSectionScroll(
    sectionRef,
    ["start end", "end start"]
  );

  const fadeIn = useTransform(scrollYProgress, [0.02, 0.35], [1, 1]);
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
      className={`gradient-amaterasu relative overflow-hidden px-6 py-16 text-white md:px-16 min-h-[50vh] flex flex-col justify-center text-left ${cursorSectionClassName}`}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
      }}
    >
      {/* Optional Background Image */}
      {bgImageUrl && (
        <>
          <div 
            className="absolute inset-0 z-0 opacity-80"
            style={{
            backgroundImage: `url(${bgImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent mix-blend-multiply" />
        </>
      )}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBg }}
      />

      <motion.div
        className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-blue-400/20 blur-[100px] md:h-[200px] md:w-[400px] md:blur-[120px]"
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
        className="relative z-10 max-w-7xl mx-auto w-full transform-gpu flex flex-col items-start"
      >
        <p className="type-overline text-white/60 mb-6">
          007 / Let's Build
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="type-h1 mb-8"
        >
          REQUEST <br /> TECHNICAL SPECS
        </motion.h2>

        <p className="type-body text-white/80 max-w-xl mb-12">
          Get datasheets, fire test reports, and sample panels delivered
          to your specification team.
        </p>

        <div className="flex gap-4 flex-wrap">
          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="type-btn px-8 py-4 rounded-full bg-white text-[#1E2A5A] flex items-center gap-3 shadow-lg hover:shadow-blue-500/40 transition-all"
          >
            Request Technical Specs <ArrowRight size={18} />
          </motion.button>

          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            className="type-btn px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all flex items-center gap-3"
          >
            <Download size={18} className="text-white/70" /> Downloads
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none" />
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

  const columnHeaderStyle = "type-overline text-white/40 mb-6";
  const linkStyle = "text-white/80 hover:text-white transition-colors duration-300 cursor-pointer flex items-center";

  const socialIcons: Record<string, any> = {
    LinkedIn: <Linkedin size={18} strokeWidth={1.5} className="mr-3 text-white/50 group-hover:text-white transition-colors" />,
    Instagram: <Instagram size={18} strokeWidth={1.5} className="mr-3 text-white/50 group-hover:text-white transition-colors" />,
    Facebook: <Facebook size={18} strokeWidth={1.5} className="mr-3 text-white/50 group-hover:text-white transition-colors" />,
    YouTube: <Youtube size={18} strokeWidth={1.5} className="mr-3 text-white/50 group-hover:text-white transition-colors" />,
  };

  return (
    <footer
      id="contact"
      {...cursorSectionProps}
      className={`relative bg-[#0a0a0a] text-white px-6 md:px-16 py-16 md:py-24 min-h-[80vh] flex flex-col justify-center ${cursorSectionClassName}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Middle Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 type-body-sm mb-16">

          {/* Col 1: About Our Company + Newsletter */}
          <div className="flex flex-col gap-4">
            <p className={columnHeaderStyle}>ABOUT OUR COMPANY</p>
            <img src="/Logo.png" alt="Alubond Logo" className="h-8 w-auto object-contain origin-left mb-2" />
            <p className="text-white/70 leading-relaxed text-sm">
              Alubond has emerged as the world's largest MCM &amp; ACP Brand with a 25 Million sq.m production capacity across various production bases. Completely integrated with FR A1/A2/B1 Core &amp; Granules Production, Coil Coating, Fire Rated Bonding Adhesives &amp; Paint Production.
            </p>
            {/* Newsletter */}
            <div className="mt-4">
              <p className={columnHeaderStyle}>SUBSCRIBE TO OUR NEWSLETTER</p>
              <div className="flex w-full rounded-lg overflow-hidden border border-white/15 mt-3 bg-white/5">
                <input
                  type="email"
                  placeholder="E-mail Address"
                  className="flex-1 bg-transparent text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none min-w-0"
                />
                <button className="bg-white/20 hover:bg-white/30 transition-colors text-white font-bold text-xs uppercase tracking-widest px-5 py-3 shrink-0">
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <p className={columnHeaderStyle}>QUICK LINKS</p>
            {["Products", "Downloads", "News", "Colours & Finishes", "Contact Us"].map((item) => (
              <span key={item} className={`group ${linkStyle}`}>
                <ArrowRight size={14} className="mr-2 text-white/40 group-hover:text-white transition-colors" />
                {item}
              </span>
            ))}
          </div>

          {/* Col 3: Global Presence */}
          <div className="flex flex-col gap-5">
            <p className={columnHeaderStyle}>GLOBAL PRESENCE</p>
            {["Alubond Global", "Alubond USA", "Alubond Canada", "Alubond Qatar", "Alubond Turkey", "Alubond Egypt"].map((item) => (
              <span key={item} className={`group ${linkStyle}`}>
                <ArrowRight size={14} className="mr-2 text-white/40 group-hover:text-white transition-colors" />
                {item}
              </span>
            ))}
          </div>

          {/* Col 4: Contact Us */}
          <div className="flex flex-col gap-5">
            <p className={columnHeaderStyle}>CONTACT US</p>
            <p className="text-white/70 leading-relaxed text-sm mb-2">
              Have questions, comments or just want to say hello:
            </p>
            <div className="flex items-center gap-3 text-white/80">
              <span className="text-[#0a4b7c]">📞</span>
              <span>+971 (6) 526 2202</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <span className="text-[#0a4b7c]">🖨️</span>
              <span>+971 (6) 526 2203</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <span className="text-[#0a4b7c]">✉️</span>
              <span>sales@alubond.com</span>
            </div>
            <div className="flex items-start gap-3 text-white/80">
              <span className="text-[#0a4b7c] mt-0.5">📍</span>
              <span>Phase 1, Hamriyah Freezone, Sharjah, U.A.E</span>
            </div>
          </div>
        </div>



        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center type-body-sm text-white/80 gap-6 mt-4">
          <p>© 2026 Alubond U.S.A. All Rights Reserved.</p>
          
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