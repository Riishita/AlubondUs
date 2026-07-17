"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
  { img: "/images/BUILDINGFACADES.png",   title: "Building Facades",        desc: "Curtain walls, rainscreen cladding, and architectural envelope systems.", id: "01" },
  { img: "/images/trailer.jpeg",           title: "Automobile Industry",     desc: "Lightweight panels for vehicle bodies and trailers.",                   id: "02" },
  { img: "/images/coporate identity.png",  title: "Corporate Identity",      desc: "Signage and branded installations.",                                    id: "03" },
  { img: "/images/machine covers.jpg",     title: "Machine Covers",          desc: "Industrial enclosures and housings.",                                   id: "04" },
  { img: "/images/elevators .avif",        title: "Elevators & Interiors",   desc: "Interior panels and partitions.",                                       id: "05" },
  { img: "/images/marine .jpg",            title: "Marine & Offshore",       desc: "Corrosion-resistant panels.",                                           id: "06" },
  { img: "/images/bullet train.png",       title: "Trains & Coaches",        desc: "Fire-rated lightweight panels.",                                        id: "07" },
];

const track = [...cards, ...cards];

export default function ApplicationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);

  return (
    <section
      ref={sectionRef}
      id="applications"
      {...cursorSectionProps}
      className={`relative w-full overflow-hidden gradient-amaterasu ${cursorSectionClassName}`}
      style={{ minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="type-overline text-white/50 mb-4">005 / Applications</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-7xl font-light tracking-tight text-white leading-[0.95] uppercase">
              Where Alubond <br />
              <span className="font-medium">Performs</span>
            </h2>
            <div className="flex flex-col items-start md:items-end gap-6">
              <p className="text-sm md:text-base text-white/60 max-w-xs leading-relaxed font-light">
                Seven industries. One material.<br />Endless architectural possibility.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Marquee Track ── */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-marquee {
            animation: marquee 38s linear infinite;
            width: max-content;
          }
          .desktop-marquee.is-paused {
            animation-play-state: paused;
          }
        }
        @media (max-width: 767px) {
          .mobile-scroll {
            width: 100%;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
            padding-right: 2rem;
          }
          .mobile-scroll::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left/Right edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 md:w-24 z-10"
          style={{ background: "linear-gradient(to right, rgba(7,26,58,0.95), transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 md:w-24 z-10"
          style={{ background: "linear-gradient(to left, rgba(7,26,58,0.95), transparent)" }} />

        {/* Scrolling strip */}
        <div
          className={`flex gap-4 md:gap-5 desktop-marquee mobile-scroll ${paused ? 'is-paused' : ''}`}
          style={{ paddingLeft: "1.25rem" }}
        >
          {track.map((card, i) => (
            <AppCard key={`${card.id}-${i}`} card={card} />
          ))}
        </div>
      </motion.div>

      {/* Mobile swipe indicator below images */}
      <div className="md:hidden flex items-center justify-center gap-2 text-white/50 text-xs uppercase tracking-widest font-medium mt-8">
        <span>Swipe to explore</span>
        <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* ── View All Applications CTA ── */}
      <motion.div
        className="flex justify-center mt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          id="applications-view-all-btn"
          onClick={() => navigate("/applications")}
          className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/25 text-white text-sm uppercase tracking-widest font-medium backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-400 ease-out"
        >
          <span>View All Applications</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </motion.div>
    </section>
  );
}

/* ── Single card – hover effects are pure CSS via Tailwind group ── */
function AppCard({ card }: { card: typeof cards[0] }) {
  return (
    <div className="group relative flex-shrink-0 w-[80vw] md:w-[400px] h-[260px] md:h-[360px] rounded-3xl overflow-hidden border border-white/10 cursor-pointer max-md:snap-center"
      style={{ willChange: "transform", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease" }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-8px) scale(1.02)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 60px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <img
        src={card.img}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 w-full p-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-1">{card.id}</p>
        <h3 className="text-base md:text-lg font-medium text-white leading-tight uppercase tracking-wide">
          {card.title}
        </h3>
        {/* Desc slides up on hover */}
        <p className="text-xs text-white/70 leading-relaxed mt-2 max-h-0 overflow-hidden opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 ease-out">
          {card.desc}
        </p>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 group-hover:ring-white/25 transition-all duration-500 pointer-events-none" />
    </div>
  );
}