"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

/* ================= DATA ================= */

const panels = [
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775677475/BurjKhalifa1_skpuon.mp4",
    title: "The Address Downtown",
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
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775678217/asdfg_hiiafm.mp4",
    title: "Landmark Development",
    location: "Croatia",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775675409/Burjkhalifa_wioycw.mp4",
    title: "Wood Finish",
    location: "Luxury",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775678217/asdfg_hiiafm.mp4",
    title: "Burj Khalifa",
    location: "Dubai, UAE",
  },
];

/* ================= MAIN ================= */

export default function PremiumGridGallery() {
  return (
    <section className="relative text-white py-32 overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* 🔥 RADIAL GLOW */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 🔳 GRID LINES */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="w-full h-full grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/10" />
          ))}
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mb-24">
        <p className="text-sm tracking-[0.3em] text-white/40 mb-6">
          005 / GLOBAL PROJECTS
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          TRUSTED BY <br />
          ARCHITECTS WORLDWIDE
        </h1>

        <p className="mt-8 text-lg text-white/60 leading-relaxed">
          From iconic towers in the Gulf to cultural landmarks across Europe —
          Alubond panels define skylines on every continent.
        </p>
      </div>

      {/* ================= MASONRY GRID ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {panels.map((panel, i) => (
          <MasonryCard key={i} panel={panel} index={i} />
        ))}
      </div>

      {/* ================= BUTTON ================= */}
      <div className="relative z-10 flex justify-center mt-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group relative px-10 py-4 border border-white/20 rounded-full overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700" />

          <span className="relative z-10 text-sm tracking-[0.3em] uppercase text-white">
            View All Projects
          </span>
        </motion.button>
      </div>
    </section>
  );
}

/* ================= MASONRY CARD ================= */

function MasonryCard({ panel, index }: any) {
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

  /* 🔥 DIFFERENT HEIGHTS */
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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className={`relative mb-6 break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer ${heights[index % heights.length]}`}
    >
      {/* 🎥 VIDEO */}
      <video
        ref={videoRef}
        src={panel.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:via-black/10 transition duration-500" />

      {/* TEXT */}
      <div className="absolute bottom-5 left-5">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/60">
          {panel.location}
        </p>

        <h3 className="text-lg font-semibold mt-2">
          {panel.title}
        </h3>

        <div className="w-0 group-hover:w-16 h-[2px] bg-white mt-2 transition-all duration-500" />
      </div>

      {/* BORDER */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition duration-500" />
    </motion.div>
  );
}