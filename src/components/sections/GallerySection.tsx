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
  {
    video: "https://res.cloudinary.com/drgg4st9a/video/upload/v1775800113/Gallart_lmzj8y.mp4",
    title: "Global Projects",
    location: "International",
  },
];

export default function PremiumGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? 70 : 30; 
  const gap = isMobile ? 5 : 3; 
  const totalMove = (panels.length - 1) * (cardWidth + gap);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0vw", `-${totalMove}vw`]);

  // Button Animation Logic: Appear only at the very end (0.95 to 1)
  const buttonOpacity = useTransform(smoothProgress, [0.9, 0.98], [0, 1]);
  const buttonScale = useTransform(smoothProgress, [0.9, 0.98], [0.8, 1]);
  const buttonY = useTransform(smoothProgress, [0.9, 0.98], [20, 0]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-cover bg-center bg-fixed"
  style={{ 
    backgroundImage: `linear-gradient(rgba(4, 4, 7, 0.68), rgba(5, 5, 6, 0.22)), url('YOUR_IMAGE_URL_HERE')`,
  }}>
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Responsive Heading */}
        <div className="absolute top-12 md:top-auto md:left-20 z-30 pointer-events-none w-full md:w-auto px-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-1 md:space-y-2 text-center md:text-left"
          >
            <p className="text-white/40 uppercase text-[8px] md:text-[10px] tracking-[0.4em]">005 / Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-medium text-white leading-tight">
              TRUSTED BY<br className="hidden md:block" />
              <span className="italic font-light"> ARCHITECTS.</span>
            </h2>
          </motion.div>
        </div>

        {/* The "Focal" Dotted Frame */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[30vw] aspect-[4/5] z-20 pointer-events-none">
          <div className="absolute inset-[-10px] md:inset-[-15px] border border-dashed border-white/20 rounded-lg">
             <div className="absolute -top-1 -right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
          </div>
        </div>

        {/* The Scrolling Row */}
        <div className="relative w-full h-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex items-center gap-[5vw] md:gap-[3vw] px-[15vw] md:px-[35vw]" 
          >
            {panels.map((panel, i) => (
              <Card 
                key={i} 
                panel={panel} 
                index={i} 
                progress={smoothProgress} 
                total={panels.length}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>
      </div>
<motion.div

style={{ opacity: buttonOpacity, scale: buttonScale, y: buttonY }}

className="absolute bottom-12 md:bottom-20 right-10 md:right-[35vw] z-40 translate-x-1/2"

>

<button className="group relative px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white text-[10px] tracking-[0.3em] uppercase font-semibold rounded-full overflow-hidden transition-all duration-500 hover:bg-white hover:text-black shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">

{/* Subtle shine effect on hover */}

<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />


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

function Card({ panel, index, progress, total, isMobile }: { panel: any; index: number; progress: any; total: number, isMobile: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const centerStep = index / (total - 1);
  
  const scale = useTransform(progress, 
    [centerStep - 0.2, centerStep, centerStep + 0.2], 
    [isMobile ? 0.75 : 0.55, 1, isMobile ? 0.75 : 0.55]
  );
  
  const opacity = useTransform(progress, 
    [centerStep - 0.2, centerStep, centerStep + 0.2], 
    [0.4, 1, 0.4]
  );

  const textOpacity = useTransform(progress, 
    [centerStep - 0.05, centerStep, centerStep + 0.05], 
    [0, 1, 0]
  );

  useEffect(() => {
    const unsubscribe = progress.on("change", (v: number) => {
      if (Math.abs(v - centerStep) < 0.05) {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    });
    return () => unsubscribe();
  }, [progress, centerStep]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="relative flex-shrink-0 w-[70vw] md:w-[30vw] aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden shadow-2xl"
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
    </motion.div>
  );
}