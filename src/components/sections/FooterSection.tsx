"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { ArrowRight, Linkedin, Instagram, Facebook, Youtube, Download, Phone, Printer, Mail, MapPin } from "lucide-react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { useNavigate, Link } from "react-router-dom";


/* ================= CTA SECTION ================= */

const CTASection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();

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
      id="request-specs"
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
            onClick={() => navigate('/contact')}
            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="type-btn px-8 py-4 rounded-full bg-white text-[#1E2A5A] flex items-center gap-3 shadow-lg hover:shadow-blue-500/40 transition-all"
          >
            Request Technical Specs <ArrowRight size={18} />
          </motion.button>

          <motion.button
            onClick={() => navigate('/downloads')}
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

  const columnHeaderStyle = "text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-8";
  const linkStyle = "text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer flex items-center text-sm font-medium";

  return (
    <footer
      id="contact"
      {...cursorSectionProps}
      className={`relative bg-[#0a0a0a] text-white px-6 md:px-16 pt-24 pb-12 flex flex-col justify-center ${cursorSectionClassName}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

          {/* Col 1: About + Newsletter (Span 4) */}
          <div className="flex flex-col items-start lg:col-span-5 pr-0 lg:pr-12">
            <img 
              src="/Alubond Logo-1.avif" 
              alt="Alubond Logo" 
              className="h-12 w-auto object-contain mb-8 opacity-90"
            />
            <p className="text-white/50 leading-relaxed text-sm mb-10 font-light">
              Alubond has emerged as the world's largest MCM & ACP Brand with a 25 Million sq.m production capacity. Completely integrated with FR A1/A2/B1 Core & Granules Production, Coil Coating, and Fire Rated Bonding Adhesives.
            </p>
            
            <div className="w-full">
              <p className={columnHeaderStyle}>NEWSLETTER</p>
              <div className="flex w-full border-b border-white/20 focus-within:border-white/60 transition-colors pb-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none"
                />
                <button className="text-white font-bold text-xs uppercase tracking-widest hover:text-blue-400 transition-colors flex items-center gap-2">
                  Subscribe <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (Span 3) */}
          <div className="flex flex-col items-start lg:col-span-3 lg:ml-12">
            <p className={columnHeaderStyle}>QUICK LINKS</p>
            <div className="flex flex-col gap-5">
              {[
                { name: "About Us", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Colours & Finishes", path: "/colours" },
                { name: "Projects", path: "/project" },
                { name: "News & Media", path: "/news" },
                { name: "Downloads", path: "/downloads" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <Link key={item.name} to={item.path} className={linkStyle}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Contact Details (Span 4) */}
          <div className="flex flex-col items-start lg:col-span-4">
            <p className={columnHeaderStyle}>CONTACT US</p>
            <div className="flex flex-col gap-6 w-full">
              
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                  <MapPin size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className="pt-2">
                  <span className="text-sm text-white/60 leading-relaxed font-light block">
                    Phase 1, Hamriyah Freezone,<br />Sharjah, U.A.E
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                  <Phone size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-white/80 font-medium">+971 (6) 526 2202</span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                  <Printer size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-white/80 font-medium">+971 (6) 526 2203</span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
                  <Mail size={16} className="text-white/60 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-white/80 font-medium">sales@alubond.com</span>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/40 font-light">© 2026 Alubond U.S.A. All Rights Reserved.</p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/company/alubond-acp/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all">
              <Linkedin size={16} />
            </a>
            <a href="https://www.instagram.com/alubondacp/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all">
              <Instagram size={16} />
            </a>
            <a href="https://www.facebook.com/alubondusaacp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all">
              <Facebook size={16} />
            </a>
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