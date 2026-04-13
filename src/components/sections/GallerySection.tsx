"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

const panels = [
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775800113/Gallart_lmzj8y.mp4",
    title: "Krestovsky Stadium",
    location: "St. Petersburg, Russia",
  },
  
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775677475/BurjKhalifa1_skpuon.mp4",
    title: "Red Sea Airport",
    location: "NEOM, Saudi Arabia",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775799908/BurjKhalifa_loordq.mp4",
    title: "Burj Khalifa",
    location: "Dubai, UAE",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1776113873/VN20260414_022640_tsen5n.mp4",
    title: "Khalifa Stadium",
    location: "Doha, Qatar",
  },
  
  
];

const easePremium = [0.22, 1, 0.36, 1] as const;

const shellVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const blockVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easePremium },
  },
};

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easePremium },
  },
};

export default function GallerySection() {
  const reduceMotion = useReducedMotion();
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);

  return (
    <section
      {...cursorSectionProps}
      className={`relative overflow-hidden py-20 md:py-32 text-white ${cursorSectionClassName}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[400px] w-[400px] md:h-[800px] md:w-[800px] -translate-x-1/2 rounded-full bg-white/5 blur-[80px] md:blur-[120px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="grid h-full w-full grid-cols-6 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/10 last:border-r-0" />
          ))}
        </div>
      </div>

      <motion.div
        className="relative z-10"
        variants={reduceMotion ? undefined : shellVariants}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.07, margin: "-72px 0px" }}
      >
        <motion.div className="mx-auto mb-16 md:mb-24 max-w-5xl px-6 text-center" variants={reduceMotion ? undefined : blockVariants}>
          <p className="mb-4 md:mb-6 text-[10px] md:text-sm tracking-[0.3em] text-white/40">005 / GLOBAL PROJECTS</p>

          <h1 className="text-3xl font-bold leading-tight sm:text-5xl md:text-7xl">
            TRUSTED BY <br className="hidden sm:block" />
            ARCHITECTS WORLDWIDE
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-white/60 max-w-2xl mx-auto">
            From iconic towers in the Gulf to cultural landmarks across Europe —
            Alubond panels define skylines on every continent.
          </p>
        </motion.div>

        {/* Adjusted to columns-2 for better balance with 4 items on larger screens */}
        <motion.div
          className="mx-auto max-w-6xl [perspective:1200px] columns-1 sm:columns-2 gap-4 md:gap-6 space-y-4 md:space-y-6 px-4 md:px-8"
          variants={reduceMotion ? undefined : gridVariants}
        >
          {panels.map((panel, i) => (
            <MasonryCard key={`${panel.title}-${i}`} panel={panel} index={i} reduced={Boolean(reduceMotion)} />
          ))}
        </motion.div>

        <motion.div className="mt-12 md:mt-20 flex justify-center px-6" variants={reduceMotion ? undefined : blockVariants}>
          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="group relative w-full sm:w-auto overflow-hidden rounded-full border border-white/20 px-10 py-4"
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[100%] group-hover:opacity-100" />
            <span className="relative z-10 text-xs md:text-sm uppercase tracking-[0.3em] text-white">View All Projects</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MasonryCard({
  panel,
  index,
  reduced,
}: {
  panel: (typeof panels)[number];
  index: number;
  reduced: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleHoverStart = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleHoverEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Adjusted heights for a 4-item set to ensure a pleasing masonry stagger
  const heights = [
    "h-[280px] md:h-[320px]",
    "h-[380px] md:h-[480px]",
    "h-[380px] md:h-[480px]",
    "h-[280px] md:h-[320px]",
  ];

  return (
    <motion.div
      variants={reduced ? undefined : itemVariants}
      transition={reduced ? undefined : { delay: index * 0.04 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={
        reduced
          ? undefined
          : {
              scale: 1.02,
              rotateY: -2.5,
              rotateX: 1.5,
              transition: { duration: 0.4, ease: easePremium },
            }
      }
      className={`relative mb-4 md:mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl group transform-gpu [transform-style:preserve-3d] ${heights[index % heights.length]}`}
    >
      <video
        ref={videoRef}
        src={panel.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition duration-500 group-hover:via-black/20" />

      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 right-4">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/60">{panel.location}</p>
        <h3 className="mt-1 md:mt-2 text-base md:text-lg font-semibold leading-tight">{panel.title}</h3>
        <div className="mt-2 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-12 md:group-hover:w-16" />
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/10 transition duration-500 group-hover:border-white/30" />
    </motion.div>
  );
}