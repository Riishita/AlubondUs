"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

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

export default function ApplicationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [pause, setPause] = useState(false);

  const duplicatedCards = useMemo(() => [...cards, ...cards], []);

  // ✅ Cursor
  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  // ✅ Scroll animation values
  const { smoothProgress: scrollYProgress } = useSectionScroll(
    sectionRef,
    ["start end", "end start"]
  );

  const bgRadius = useTransform(scrollYProgress, [0.08, 0.42], ["0%", "140%"]);
  const fgRadius = useTransform(scrollYProgress, [0.14, 0.52], ["0%", "135%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0.35, 1]);
  const contentScale = useTransform(scrollYProgress, [0.1, 0.45], [0.94, 1]);

  const bgClip = useMotionTemplate`circle(${bgRadius} at 50% 100%)`;
  const fgClip = useMotionTemplate`circle(${fgRadius} at 50% 100%)`;

  // ✅ NEW: motion value for smooth control
  const x = useMotionValue(0);
  const controls = useRef<any>(null);

  // ✅ AUTO SCROLL + PAUSE LOGIC
  useEffect(() => {
    if (reduceMotion) return;

    if (!pause) {
      controls.current = animate(x, [-0, -1500], {
        ease: "linear",
        duration: 25,
        repeat: Infinity,
      });
    } else {
      controls.current?.stop();
    }

    return () => controls.current?.stop();
  }, [pause, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      {...cursorSectionProps}
      className={`relative h-[220vh] gradient-lumina ${cursorSectionClassName}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* BACKGROUND */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ clipPath: bgClip }}
        >
          <div className="gradient-amaterasu h-full w-full" />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          className="relative z-10 h-full w-full"
          style={{
            clipPath: fgClip,
            opacity: contentOpacity,
            scale: contentScale,
          }}
        >
          <div className="relative h-full w-full px-0 py-20 text-white">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto mb-16 px-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                004 / Applications
              </p>

              <div className="flex justify-between flex-wrap gap-6 mt-5">
                <h2 className="text-4xl md:text-7xl font-heading">
                  WHERE ALUBOND <br /> PERFORMS
                </h2>

                <p className="max-w-sm text-white/60">
                  Seven industries. One material.
                  Endless architectural possibility.
                </p>
              </div>
            </div>

            {/* CAROUSEL */}
            <div className="relative mt-10">

              <motion.div
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -2000, right: 0 }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 50, bounceDamping: 20 }}
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                className="flex w-max gap-5 px-6 md:px-16"
              >
                {duplicatedCards.map((card, i) => (
                  <motion.div
                    key={`${card.id}-${i}`}
                    className="group w-[260px] md:w-[320px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-colors duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-grab active:cursor-grabbing"
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="w-full h-[160px] md:h-[200px] overflow-hidden relative">
                      <motion.img
                        src={card.img}
                        className="w-full h-full object-cover origin-center"
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>

                    <div className="p-5 md:p-6 relative z-10 bg-gradient-to-b from-white/5 to-transparent">
                      <p className="text-[10px] text-white/50 tracking-widest font-medium uppercase mb-1">{card.id}</p>
                      <h3 className="text-base md:text-xl font-light uppercase tracking-tight text-white drop-shadow-sm mb-2">
                        {card.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light">
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