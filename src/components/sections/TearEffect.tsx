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
  // On desktop: shrinks to 50% width and shifts right
  // On mobile/tablet: shrinks to 40vh height at the top
  const videoWidth = useTransform(scrollYProgress, [0, 0.4], ["100%", isMobile ? "100%" : "50%"]);
  const videoHeight = useTransform(scrollYProgress, [0, 0.4], ["100vh", isMobile ? "40vh" : "100vh"]);
  const videoLeft = useTransform(scrollYProgress, [0, 0.4], ["0%", isMobile ? "0%" : "50%"]);
  const videoTop = useTransform(scrollYProgress, [0, 0.4], ["0%", "0%"]);

  // --- PHASE 2: THE TEAR (0.5 -> 0.9) ---
  const topOrLeftTransform = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "-100%"]);
  const bottomOrRightTransform = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "100%"]);
  
  const bgScale = useTransform(scrollYProgress, [0.5, 0.9], [0.85, 1]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-[600vh] bg-black"
    >
      <div id="certificatesection" className="absolute top-0 w-full h-[450vh] pointer-events-none" />
      {/* BACKGROUND REVEAL - Ensure it has a solid black background behind it */}
      <motion.div style={{ scale: bgScale }} className="sticky top-0 h-screen w-full z-0 overflow-hidden bg-black">
        <HeroSection />
      </motion.div>

      {/* TEAR LAYER */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
          
          {/* TOP PIECE (Contains Video Area Background) */}
          <motion.div
            style={{ 
              x: isMobile ? 0 : topOrLeftTransform,
              y: isMobile ? topOrLeftTransform : 0,
              // Mobile/Tablet: Shows the top 40% where the video sits
              clipPath: isMobile ? "inset(0% 0% 60% 0%)" : "inset(0% 50% 0% 0%)" 
            }}
            className="absolute inset-0 w-full h-full bg-[#F7F7F5] pointer-events-auto shadow-2xl"
          >
             <FireHorizontalExperience scrollProgress={scrollYProgress} isMobile={isMobile} />
          </motion.div>

          {/* BOTTOM PIECE (Contains Content) */}
          <motion.div
            style={{ 
              x: isMobile ? 0 : bottomOrRightTransform,
              y: isMobile ? bottomOrRightTransform : 0,
              // Mobile/Tablet: Shows the remaining 60% of the screen
              clipPath: isMobile ? "inset(40% 0% 0% 0%)" : "inset(0% 0% 0% 50%)" 
            }}
            className="absolute inset-0 w-full h-full bg-[#F7F7F5] pointer-events-auto shadow-2xl"
          >
             <FireHorizontalExperience scrollProgress={scrollYProgress} isMobile={isMobile} />
          </motion.div>

          {/* SINGLE VIDEO LAYER - Shared across desktop and mobile */}
          <motion.div
            style={{ 
              width: videoWidth, 
              height: videoHeight,
              left: videoLeft,
              top: videoTop,
              // Video moves with the "Top" piece on mobile, and "Right" piece on desktop
              y: isMobile ? topOrLeftTransform : 0,
              x: isMobile ? 0 : bottomOrRightTransform 
            }}
            className="absolute z-20 overflow-hidden bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-none"
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065540/VN20260413_125908_bxq5dm.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}