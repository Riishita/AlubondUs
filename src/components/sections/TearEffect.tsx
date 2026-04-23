"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FireHorizontalExperience from "./CertificationSection"; 
import HeroSection from "./SheetDetail"; 

export default function CinematicVerticalTear() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- TIMING CONFIG ---
  // 0.0 -> 0.4: Video shifts to 50% width/position
  // 0.5 -> 0.9: Everything (Content + Video) tears apart

  // Video Shift Logic
  const videoWidth = useTransform(scrollYProgress, [0, 0.4], ["100%", "50%"]);
  const videoX = useTransform(scrollYProgress, [0, 0.4], ["0%", "50%"]);

  // Tear Logic (Applied to content AND the video during the split phase)
  const leftSideX = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "-100%"]);
  const rightSideX = useTransform(scrollYProgress, [0.5, 0.9], ["0%", "100%"]);
  
  // Background reveal
  const bgScale = useTransform(scrollYProgress, [0.5, 0.9], [0.99, 1]);

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      {/* 1. THE REVEALED BACKGROUND */}
      <motion.div 
        style={{ scale: bgScale }}
        className="sticky top-0 h-screen w-full z-0 overflow-hidden"
      >
        <HeroSection />
      </motion.div>

      {/* 2. THE TEAR LAYER (CONTENT) */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* Left Content Half */}
          <motion.div
            style={{ x: leftSideX, clipPath: "inset(0% 50% 0% 0%)" }}
            className="absolute inset-0 w-full h-full bg-[#F7F7F5] pointer-events-auto"
          >
             <FireHorizontalExperience scrollProgress={scrollYProgress} hideVideo={true} />
          </motion.div>

          {/* Right Content Half */}
          <motion.div
            style={{ x: rightSideX, clipPath: "inset(0% 0% 0% 50%)" }}
            className="absolute inset-0 w-full h-full bg-[#F7F7F5] pointer-events-auto"
          >
             <FireHorizontalExperience scrollProgress={scrollYProgress} hideVideo={true} />
          </motion.div>

          {/* 3. THE SINGLE VIDEO LAYER */}
          {/* This sits on top and splits using the same X transforms as the content */}
          <motion.div
            style={{ 
              width: videoWidth, 
              left: videoX,
              // When the tear starts (0.5+), we shift the video with the right side
              x: rightSideX 
            }}
            className="absolute top-0 h-screen z-20 overflow-hidden bg-black shadow-2xl pointer-events-none"
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://res.cloudinary.com/drgg4st9a/video/upload/v1776065390/VN20260413_125908_z8mjdx.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}