"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const panels = [
  {
    video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066850/VN20260506_165456_ujqlmd.mp4",
    title: "Krestovsky Stadium",
    location: "St. Petersburg, Russia",
  },
  {
    video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066849/VN20260506_165518_q1j310.mp4",
    title: "The Address Downtown",
    location: "Dubai, UAE",
  },
  {
    video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066850/VN20260506_165356_drniqf.mp4",
    title: "Burj Khalifa",
    location: "Dubai, UAE",
  },
  {
    video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065542/VN20260414_022640_ideoyr.mp4",
    title: "Khalifa Stadium",
    location: "Doha, Qatar",
  },
  
];

export default function PremiumGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dimensions for small and large tracks
  const cardWidthLg = isMobile ? 70 : 30; // vw
  const cardWidthSm = isMobile ? 35 : 15; // vw
  const gapSm = isMobile ? 4 : 2; // vw

  const totalMoveLg = (panels.length - 1) * cardWidthLg;
  const totalMoveSm = (panels.length - 1) * (cardWidthSm + gapSm);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  const xLg = useTransform(smoothProgress, [0, 1], ["0vw", `-${totalMoveLg}vw`]);
  const xSm = useTransform(smoothProgress, [0, 1], ["0vw", `-${totalMoveSm}vw`]);

  const buttonOpacity = useTransform(smoothProgress, [0.9, 0.98], [0, 1]);
  const buttonScale = useTransform(smoothProgress, [0.9, 0.98], [0.8, 1]);
  const buttonY = useTransform(smoothProgress, [0.9, 0.98], [20, 0]);

  return (
    <section 
      id="gallerysection"
      ref={containerRef} 
      className="gradient-lumina relative h-[500vh]"
    >
      
      {/* Optional: Overlay to add that slight "grain" texture often seen in high-end UI */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Updated Heading Colors to match the dark blue/black text in the image */}
        <div className="absolute top-12 md:top-auto md:left-20 z-30 pointer-events-none w-full md:w-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-1 md:space-y-2 text-center md:text-left"
          >
            <p className="text-blue-900/40 uppercase text-[8px] md:text-[10px] tracking-[0.4em]">005 / Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-medium text-blue-950 leading-tight">
              TRUSTED BY<br className="hidden md:block" />
              <span className="italic font-light"> ARCHITECTS.</span>
            </h2>
          </motion.div>
        </div>

        {/* SMALL TRACK (Background) */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center overflow-hidden pointer-events-none">
          <motion.div
            style={{ x: xSm, gap: `${gapSm}vw` }}
            className="flex items-center h-full w-max"
          >
            {/* Spacer to center the first item initially */}
            <div style={{ width: `${50 - cardWidthSm / 2}vw`, flexShrink: 0 }} />
            
            {panels.map((panel, i) => (
              <SmallCard 
                key={i} 
                panel={panel} 
                cardWidth={cardWidthSm}
                index={i}
                progress={smoothProgress}
                total={panels.length}
              />
            ))}
          </motion.div>
        </div>

        {/* LARGE TRACK (Foreground Frame) */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          style={{ width: `${cardWidthLg}vw`, aspectRatio: '4/5' }}
        >
          {/* Dotted border wrapper (blue dot removed) */}
          <div className="absolute inset-[-10px] md:inset-[-15px] border border-dashed border-blue-900/20 rounded-lg pointer-events-none" />
          
          {/* Masking container for the large videos */}
          <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-auto shadow-2xl bg-neutral-900">
            <motion.div
              style={{ x: xLg }}
              className="flex items-center h-full w-max"
            >
              {panels.map((panel, i) => (
                <LargeCard 
                  key={i} 
                  panel={panel} 
                  index={i} 
                  progress={smoothProgress} 
                  total={panels.length}
                  cardWidth={cardWidthLg}
                />
              ))}
            </motion.div>
          </div>
        </div>

      </div>

      <motion.div
        style={{ opacity: buttonOpacity, scale: buttonScale, y: buttonY }}
        className="absolute bottom-12 md:bottom-20 right-10 md:right-[35vw] z-40 translate-x-1/2"
      >
        <button className="group relative px-10 py-4 bg-white/40 backdrop-blur-md border border-blue-900/10 text-blue-950 text-[10px] tracking-[0.3em] uppercase font-semibold rounded-full overflow-hidden transition-all duration-500 hover:bg-blue-950 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.05)]">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
          <span className="relative flex items-center gap-2">
            View All Projects
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </motion.div>
    </section>
  );
}

function SmallCard({ panel, cardWidth, index, progress, total }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const centerStep = index / (total - 1);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v: number) => {
      // Play if it's somewhat near the center
      if (Math.abs(v - centerStep) < 0.25) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    });
    return () => unsubscribe();
  }, [progress, centerStep]);

  return (
    <div
      className="relative flex-shrink-0 aspect-[4/5] overflow-hidden"
      style={{ width: `${cardWidth}vw`, opacity: 0.5 }}
    >
      <video
        ref={videoRef}
        src={panel.video}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

function LargeCard({ panel, index, progress, total, cardWidth }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const centerStep = index / (total - 1);
  
  const textOpacity = useTransform(progress, 
    [centerStep - 0.05, centerStep, centerStep + 0.05], 
    [0, 1, 0]
  );

  useEffect(() => {
    const unsubscribe = progress.on("change", (v: number) => {
      // Play only if it is the actively centered card
      if (Math.abs(v - centerStep) < 0.15) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    });
    return () => unsubscribe();
  }, [progress, centerStep]);

  return (
    <div
      style={{ width: `${cardWidth}vw` }}
      className="relative flex-shrink-0 h-full bg-neutral-900 overflow-hidden"
    >
      <video
        ref={videoRef}
        src={panel.video}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute bottom-6 md:bottom-10 left-0 right-0 text-center px-4 md:px-6"
      >
        <p className="text-[7px] md:text-[9px] tracking-[0.4em] uppercase text-white/50 mb-1">{panel.location}</p>
        <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter text-white">{panel.title}</h3>
      </motion.div>
    </div>
  );
}