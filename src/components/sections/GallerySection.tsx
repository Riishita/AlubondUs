"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

const panels = [
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775800113/Gallart_lmzj8y.mp4",
    title: "Krestovsky Stadium",
    location: "St. Petersburg, Russia",
  },
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1776397400/VN20260417_091134_sdc9ni.mp4",
    title: "The Address Downtown",
    location: "Dubai, UAE",
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

export default function PremiumGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Handle Responsiveness & Width Calculations
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      if (scrollTrackRef.current) {
        const trackWidth = scrollTrackRef.current.scrollWidth;
        setXRange(-(trackWidth - width));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Desktop horizontal move, Mobile stays at 0
  const x = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : xRange]);

  return (
    <section
      ref={containerRef}
      // On mobile, height is auto (natural). On desktop, height is 400vh for scroll duration.
      className={`relative bg-black text-white ${isMobile ? "h-auto py-20" : "h-[400vh]"}`}
    >
      {/* Sticky only on Desktop */}
      <div className={`${isMobile ? "relative" : "sticky top-0 h-screen overflow-hidden flex flex-col justify-center"}`}>
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-white/[0.01] blur-[120px] rounded-full" />

        {/* Heading */}
        <div className="relative z-20 px-6 md:px-20 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              005 / Global Portfolio
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.1] md:leading-[0.85] tracking-tighter">
              TRUSTED BY <br />
              <span className="text-white/70">ARCHITECTS.</span>
            </h2>
          </motion.div>
        </div>

        {/* Scroll Area: Flex-col for mobile, Flex-row for desktop */}
        <div className="relative w-full overflow-visible">
          <motion.div
            ref={scrollTrackRef}
            style={{ x: shouldReduceMotion ? 0 : x }}
            className={`flex px-6 md:px-20 items-center gap-6 md:gap-10 ${isMobile ? "flex-col w-full" : "flex-row w-max"}`}
          >
            {panels.map((panel, i) => (
              <Card key={i} panel={panel} />
            ))}

            {/* View All Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className={`flex-shrink-0 flex flex-col items-center justify-center group transition-all border border-white/10 rounded-3xl 
                ${isMobile ? "w-full h-[200px] mt-4" : "w-[400px] h-[450px] mr-20"}`}
            >
              <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/10 group-hover:border-white flex items-center justify-center mb-4 md:mb-6 transition-all group-hover:bg-white group-hover:text-black">
                <ArrowRight className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">
                View All Projects
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Card({ panel }: { panel: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      // Autoplay on scroll for mobile, hover for desktop
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => videoRef.current?.play()}
      onViewportLeave={() => videoRef.current?.pause()}
      onHoverStart={() => videoRef.current?.play()}
      onHoverEnd={() => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
      className="relative flex-shrink-0 w-full md:w-[450px] h-[350px] md:h-[450px] rounded-2xl md:rounded-[2rem] overflow-hidden group border border-white/5 bg-neutral-800"
    >
      <video
        ref={videoRef}
        src={panel.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition duration-1000 opacity-60 group-hover:opacity-100 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80" />

      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-8 z-10 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase mb-2">
          {panel.location}
        </p>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          {panel.title}
        </h3>
        <div className="h-[1px] w-0 md:group-hover:w-full bg-white/20 mt-4 transition-all duration-700" />
      </div>
    </motion.div>
  );
}