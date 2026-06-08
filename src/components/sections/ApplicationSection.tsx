"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
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
    desc: "Curtain walls, rainscreen cladding, and architectural envelope systems.",
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
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);

  // ✅ Scroll animation values
  const { smoothProgress: scrollYProgress } = useSectionScroll(
    sectionRef,
    ["start end", "end start"]
  );

  const bgRadius = useTransform(scrollYProgress, [0.08, 0.42], ["20%", "140%"]);
  const fgRadius = useTransform(scrollYProgress, [0.14, 0.52], ["20%", "135%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0.35, 1]);
  const contentScale = useTransform(scrollYProgress, [0.1, 0.45], [0.94, 1]);

  const bgClip = useMotionTemplate`circle(${bgRadius} at 50% 100%)`;
  const fgClip = useMotionTemplate`circle(${fgRadius} at 50% 100%)`;

  // ✅ motion value for auto-scroll track
  const x = useMotionValue(0);
  const controls = useRef<any>(null);

  // ✅ AUTO SCROLL + PAUSE LOGIC
  useEffect(() => {
    if (reduceMotion) return;

    if (!pause) {
      controls.current = animate(x, [-0, -2000], {
        ease: "linear",
        duration: 35,
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
      id="applications"
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
          className="relative z-10 h-full w-full flex flex-col justify-center"
          style={{
            clipPath: fgClip,
            opacity: contentOpacity,
            scale: contentScale,
          }}
        >
          <div className="w-full px-0 py-20 text-white">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-20 px-6">
              <p className="type-overline text-white/50 mb-6">
                004 / Applications
              </p>

              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-10 mt-5">
                <h1 className="type-h1 text-white uppercase leading-[0.95]">
                  WHERE ALUBOND <br /> PERFORMS
                </h1>

                <p className="type-body-sm max-w-sm text-white/60 mb-2">
                  Seven industries. One material.
                  Endless architectural possibility.
                </p>
              </div>
            </div>

            {/* CAROUSEL */}
            <div className="relative mt-16">
              <motion.div
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -2500, right: 0 }}
                dragElastic={0.1}
                dragTransition={{ bounceStiffness: 50, bounceDamping: 20 }}
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                className="flex w-max gap-10 px-6 md:px-16"
              >
                {duplicatedCards.map((card, i) => (
                  <Card key={`${card.id}-${i}`} card={card} index={i} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ card, index }: { card: typeof cards[0]; index: number }) {
  return (
    <motion.div 
      className="group relative h-[280px] w-[280px] md:h-[280px] md:w-[350px] overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-grab active:cursor-grabbing"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
         <motion.img 
            src={card.img} 
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
         />
         {/* Dual gradient for max legibility and aesthetics */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
         <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* TEXT CONTENT */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end">
         <div className="overflow-hidden mb-2">
            <p className="type-overline text-white/60 group-hover:text-accent transition-colors duration-300">
               {card.id}
            </p>
         </div>
         
         <h3 className="type-h3 uppercase text-white mb-2 drop-shadow-md leading-tight transform transition-transform duration-500 group-hover:-translate-y-1">
            {card.title}
         </h3>
         
         <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 ease-in-out">
            <p className="type-body-sm text-white/80 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75 line-clamp-2">
               {card.desc}
            </p>
         </div>
      </div>
      
      {/* GLOW EFFECT ON HOVER */}
      <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/0 group-hover:ring-white/30 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}