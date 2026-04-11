"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

const panels = [
  {
     video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775799908/BurjKhalifa_loordq.mp4",
    title: "Burj Khalifa",
    location: "Dubai, UAE",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775677475/BurjKhalifa1_skpuon.mp4",
    title: "Red Sea Airport",
    location: "NEOM, Saudi Arabia",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775675409/Burjkhalifa_wioycw.mp4",
    title: "Yas Marina Circuit",
    location: "Abu Dhabi, UAE",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775800113/Gallart_lmzj8y.mp4",
    title: "Krestovsky Stadium",
    location: "St. Petersburg, Russia",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775675409/Burjkhalifa_wioycw.mp4",
    title: "Wood Finish",
    location: "Luxury",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775799908/BurjKhalifa_loordq.mp4",
    title: "Burj Khalifa",
    location: "Dubai, UAE",
  },
];

const easePremium = [0.22, 1, 0.36, 1] as const;

/** Groups header, masonry, CTA so they sequence in one scroll reveal. */
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

/**
 * Masonry gallery: parent staggerChildren reveals header → grid → CTA;
 * grid nests a second stagger for each tile (fade + rise), plus hover depth.
 */
export default function GallerySection() {
  const reduceMotion = useReducedMotion();

  const { cursorSectionProps, cursorSectionClassName } =
  useCustomCursorBindings(false); // 👈 white cursor

  return (
    <section
  {...cursorSectionProps}
  className={`relative overflow-hidden py-32 text-white ${cursorSectionClassName}`}
>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="grid h-full w-full grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/10" />
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
        <motion.div className="mx-auto mb-24 max-w-5xl px-6 text-center" variants={reduceMotion ? undefined : blockVariants}>
          <p className="mb-6 text-sm tracking-[0.3em] text-white/40">005 / GLOBAL PROJECTS</p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            TRUSTED BY <br />
            ARCHITECTS WORLDWIDE
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-white/60">
            From iconic towers in the Gulf to cultural landmarks across Europe —
            Alubond panels define skylines on every continent.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-7xl [perspective:1200px] columns-1 gap-6 space-y-6 px-6 md:columns-2 lg:columns-3"
          variants={reduceMotion ? undefined : gridVariants}
        >
          {panels.map((panel, i) => (
            <MasonryCard key={`${panel.title}-${i}`} panel={panel} index={i} reduced={Boolean(reduceMotion)} />
          ))}
        </motion.div>

        <motion.div className="mt-20 flex justify-center" variants={reduceMotion ? undefined : blockVariants}>
          <motion.button
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="group relative overflow-hidden rounded-full border border-white/20 px-10 py-4"
          >
            <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[100%] group-hover:opacity-100" />

            <span className="relative z-10 text-sm uppercase tracking-[0.3em] text-white">View All Projects</span>
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
    videoRef.current?.play();
  };

  const handleHoverEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const heights = [
    "h-[260px]",
    "h-[320px]",
    "h-[380px]",
    "h-[300px]",
    "h-[420px]",
    "h-[280px]",
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
              scale: 1.03,
              rotateY: -3.5,
              rotateX: 2.5,
              transition: { duration: 0.4, ease: easePremium },
            }
      }
      className={`relative mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl group transform-gpu [transform-style:preserve-3d] ${heights[index % heights.length]}`}
    >
      <video
        ref={videoRef}
        src={panel.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition duration-500 group-hover:via-black/10" />

      <div className="absolute bottom-5 left-5">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">{panel.location}</p>

        <h3 className="mt-2 text-lg font-semibold">{panel.title}</h3>

        <div className="mt-2 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-16" />
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/10 transition duration-500 group-hover:border-white/30" />
    </motion.div>
  );
}
