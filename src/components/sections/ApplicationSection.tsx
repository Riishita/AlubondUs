"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";

const cards = [
  {
    img: "/images/BUILDINGFACADES.png",
    title: "BUILDING FACADES",
    desc:
      "Curtain walls, rainscreen cladding, and architectural envelope systems.",
    id: "01",
  },
  {
    img: "/images/trailer.jpeg",
    title: "AUTOMOBILE INDUSTRY",
    desc: "Lightweight panels for vehicle bodies and trailers.",
    id: "02",
  },
  {
    img: "/images/coporate identity.png",
    title: "CORPORATE IDENTITY",
    desc: "Signage and branded installations.",
    id: "03",
  },
  {
    img: "/images/machine covers.jpg",
    title: "MACHINE COVERS",
    desc: "Industrial enclosures and housings.",
    id: "04",
  },
  {
    img: "/images/elevators .avif",
    title: "ELEVATORS & INTERIORS",
    desc: "Interior panels and partitions.",
    id: "05",
  },
  {
    img: "/images/marine .jpg",
    title: "MARINE & OFFSHORE",
    desc: "Corrosion-resistant panels.",
    id: "06",
  },
  {
    img: "/images/bullet train.png",
    title: "TRAINS & COACHES",
    desc: "Fire-rated lightweight panels.",
    id: "07",
  },
];

/**
 * Scroll-driven circular mask reveal: background plane opens first, foreground content follows
 * (two clip-path radii). GPU-friendly: clip-path + opacity + scale only.
 */
export default function ApplicationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);
  const reduceMotion = useReducedMotion();
  const duplicatedCards = useMemo(() => [...cards, ...cards], []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Radius 0% → 140%: fully reveals past viewport corners (circle at center)
  const bgRadius = useTransform(scrollYProgress, [0.08, 0.42], ["0%", "140%"]);
  const fgRadius = useTransform(scrollYProgress, [0.14, 0.52], ["0%", "135%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0.35, 1]);
  const contentScale = useTransform(scrollYProgress, [0.1, 0.45], [0.94, 1]);

  const bgClip = useMotionTemplate`circle(${bgRadius} at 50% 45%)`;
  const fgClip = useMotionTemplate`circle(${fgRadius} at 50% 50%)`;

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: ambient field, revealed first by larger circle */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 will-change-[clip-path]"
          style={reduceMotion ? undefined : { clipPath: bgClip }}
        >
          <div className="h-full w-full bg-gradient-to-br from-[#0a1f44] via-[#134d7a] to-[#1fa2a6] opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
        </motion.div>

        {/* Layer 2: soft vignette for depth (also masked so edges stay cinematic) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] will-change-[clip-path]"
          style={reduceMotion ? undefined : { clipPath: bgClip }}
        >
          <div className="h-full w-full bg-gradient-to-t from-black/35 via-transparent to-black/25" />
        </motion.div>

        {/* Layer 3: main content, tighter mask + opacity/scale for premium entrance */}
        <motion.div
          className="relative z-10 h-full w-full will-change-[clip-path,transform,opacity]"
          style={
            reduceMotion
              ? undefined
              : {
                  clipPath: fgClip,
                  opacity: contentOpacity,
                  scale: contentScale,
                }
          }
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

          <div className="relative h-full w-full overflow-hidden px-0 py-29 text-white gradient-amaterasu">
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                marginBottom: "50px",
              }}
            >
              <p className="mt-16 text-xs uppercase tracking-[0.3em] text-white/50">
                004 / Applications
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <h2 className="mt-5 text-4xl font-serif leading-[0.95] tracking-tight md:text-8xl">
                  <span className="block text-[#dadada]">
                    WHERE ALUBOND <br />
                    PERFORMS
                  </span>
                </h2>

                <p
                  style={{
                    maxWidth: "300px",
                    color: "#d7d7d7",
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                >
                  Seven industries. One material.
                  <br />
                  Endless architectural possibility.
                </p>
              </div>
            </div>

            <div className="relative mt-12 md:mt-20">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#1e2a5a] to-transparent md:w-40" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#4da3a6] to-transparent md:w-40" />

              <motion.div
                className="flex w-max gap-5 px-6 md:gap-8 md:px-16"
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                animate={{ x: pause || reduceMotion ? 0 : ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }}
              >
                {duplicatedCards.map((card, i) => (
                  <motion.div
                    key={`${card.id}-${i}`}
                    className="w-[260px] transform-gpu overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md md:w-[320px]"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -6, rotateX: 4, rotateY: -4, scale: 1.02 }
                    }
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className="h-[160px] w-full object-cover md:h-[200px]"
                      loading="lazy"
                    />

                    <div className="p-4 md:p-5">
                      <p className="text-xs text-gray-300">{card.id}</p>

                      <h3 className="mt-1 text-sm font-semibold md:text-lg">{card.title}</h3>

                      <p className="mt-2 text-xs leading-relaxed text-gray-300 md:text-sm">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
