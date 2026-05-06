"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import FireHorizontalExperience from "./CertificationSection"; 
import HeroSection from "./SheetDetail"; 

export default function CinematicVerticalTear() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- PHASE 1: VIDEO SHIFT (0.0 -> 0.4) ---
  const videoWidth = useTransform(scrollYProgress, [0, 0.4], ["100%", isMobile ? "100%" : "50%"]);
  const videoHeight = useTransform(scrollYProgress, [0, 0.4], ["100vh", isMobile ? "40vh" : "100vh"]);
  const videoLeft = useTransform(scrollYProgress, [0, 0.4], ["0%", isMobile ? "0%" : "50%"]);

  // --- PHASE 2: THE TEAR (0.5 -> 0.9) ---
  const topOrLeftTransform = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "-100%"]);
  const bottomOrRightTransform = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "100%"]);
  
  const bgScale = useTransform(scrollYProgress, [0.5, 0.9], [0.8, 1]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      {/* BACKGROUND REVEAL */}
      <motion.div style={{ scale: bgScale }} className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <HeroSection />
      </motion.div>

      {/* TEAR LAYER */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* TOP PIECE (Contains Video) */}
          <motion.div
            style={{ 
              x: isMobile ? 0 : topOrLeftTransform,
              y: isMobile ? topOrLeftTransform : 0,
              // Mobile: Only clips the top 40% (where the video sits)
              clipPath: isMobile ? "inset(0% 0% 60% 0%)" : "inset(0% 50% 0% 0%)" 
            }}
            className="absolute inset-0 w-full h-full bg-[#F7F7F5] pointer-events-auto"
          >
             <FireHorizontalExperience scrollProgress={scrollYProgress} isMobile={isMobile} />
          </motion.div>

          {/* BOTTOM PIECE (Contains Content) */}
          <motion.div
            style={{ 
              x: isMobile ? 0 : bottomOrRightTransform,
              y: isMobile ? bottomOrRightTransform : 0,
              // Mobile: Clips the remaining 60% of the screen
              clipPath: isMobile ? "inset(40% 0% 0% 0%)" : "inset(0% 0% 0% 50%)" 
            }}
            className="absolute inset-0 w-full h-full bg-[#F7F7F5] pointer-events-auto"
          >
             <FireHorizontalExperience scrollProgress={scrollYProgress} isMobile={isMobile} />
          </motion.div>

          {/* SINGLE VIDEO LAYER */}
          <motion.div
            style={{ 
              width: videoWidth, 
              height: videoHeight,
              left: videoLeft,
              top: 0,
              // Video is strictly attached to the "Top" move-up animation on mobile
              y: isMobile ? topOrLeftTransform : 0,
              x: isMobile ? 0 : bottomOrRightTransform 
            }}
            className="absolute z-20 overflow-hidden bg-black shadow-2xl pointer-events-none"
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065540/VN20260413_125908_bxq5dm.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}