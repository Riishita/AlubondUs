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

  const cardWidthLg = isMobile ? 85 : 45; // vw
  const totalMoveLg = (panels.length - 1) * cardWidthLg;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const xLg = useTransform(smoothProgress, [0, 1], ["0vw", `-${totalMoveLg}vw`]);

  const buttonOpacity = useTransform(smoothProgress, [0.9, 0.98], [0, 1]);
  const buttonScale = useTransform(smoothProgress, [0.9, 0.98], [0.8, 1]);
  const buttonY = useTransform(smoothProgress, [0.9, 0.98], [20, 0]);

  return (
    <section 
      id="gallerysection"
      ref={containerRef} 
      className="bg-neutral-950 relative h-[400vh]"
    >
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Floating Heading */}
        <div className="absolute top-12 md:top-16 md:left-16 z-30 pointer-events-none w-full md:w-auto px-6 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 md:space-y-2 text-center md:text-left"
          >
            <p className="text-white/40 uppercase text-[9px] md:text-[11px] tracking-[0.4em] font-medium">005 / Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight">
              TRUSTED BY<br className="hidden md:block" />
              <span className="italic font-light text-white/70"> ARCHITECTS.</span>
            </h2>
          </motion.div>
        </div>

        {/* Dynamic Connected Track */}
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <div 
            className="relative z-20 pointer-events-none overflow-visible rounded-xl shadow-2xl"
            style={{ width: `${cardWidthLg}vw`, height: isMobile ? '70vh' : '80vh' }}
          >
            {/* Soft glowing backdrop */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />
            
            {/* The main masking container */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-[2rem] pointer-events-auto bg-neutral-900 border border-white/10 ring-1 ring-white/5">
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
      </div>

      <motion.div
        style={{ opacity: buttonOpacity, scale: buttonScale, y: buttonY }}
        className="absolute bottom-12 md:bottom-20 left-1/2 z-40 -translate-x-1/2"
      >
        <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] tracking-[0.3em] uppercase font-medium rounded-full overflow-hidden transition-all duration-500 hover:bg-white hover:text-black shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shine" />
          <span className="relative flex items-center gap-3">
            View All Projects
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </motion.div>
    </section>
  );
}

function LargeCard({ panel, index, progress, total, cardWidth }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const centerStep = index / (total - 1);
  
  // Create a stunning parallax effect within each contiguous card
  const parallaxX = useTransform(
    progress,
    [centerStep - 0.5, centerStep, centerStep + 0.5],
    ["25%", "0%", "-25%"]
  );

  // Fade text in only when perfectly centered
  const textOpacity = useTransform(progress, 
    [centerStep - 0.1, centerStep, centerStep + 0.1], 
    [0, 1, 0]
  );
  
  const textY = useTransform(progress, 
    [centerStep - 0.1, centerStep, centerStep + 0.1], 
    [20, 0, -20]
  );

  // Video scale down slightly when not in focus
  const videoScale = useTransform(progress,
    [centerStep - 0.2, centerStep, centerStep + 0.2],
    [1.1, 1, 1.1]
  );

  const overlayOpacity = useTransform(progress,
    [centerStep - 0.2, centerStep, centerStep + 0.2],
    [0.6, 0, 0.6]
  );

  useEffect(() => {
    const unsubscribe = progress.on("change", (v: number) => {
      // Play instantly when it enters the focus zone
      if (Math.abs(v - centerStep) < 0.2) {
        if (videoRef.current?.paused) {
          videoRef.current?.play().catch(() => {});
        }
      } else {
        if (!videoRef.current?.paused) {
          videoRef.current?.pause();
        }
      }
    });
    return () => unsubscribe();
  }, [progress, centerStep]);

  return (
    <div
      style={{ width: `${cardWidth}vw` }}
      className="relative flex-shrink-0 h-full overflow-hidden flex items-center justify-center border-r border-white/5 last:border-r-0"
    >
      <motion.div 
        style={{ x: parallaxX, scale: videoScale }}
        className="absolute inset-0 w-[120%] -left-[10%] h-full"
      >
        <video
          ref={videoRef}
          src={panel.video}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Dark overlay that fades away when active */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-10 pointer-events-none" 
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
      
      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="absolute bottom-10 md:bottom-16 left-0 right-0 text-center px-4 md:px-8 z-20"
      >
        <p className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-white/70 mb-2 font-medium">{panel.location}</p>
        <h3 className="text-2xl md:text-4xl font-light uppercase tracking-widest text-white">{panel.title}</h3>
      </motion.div>
    </div>
  );
}