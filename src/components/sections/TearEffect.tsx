"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import FireHorizontalExperience from "./CertificationSection"; 

export default function CinematicVerticalTear() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);

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

  // --- PHASE 1: VIDEO SHIFT ---
  // On desktop: shrinks to 50% width and shifts right
  // On mobile/tablet: shrinks to 40vh height at the top
  const videoWidth = useTransform(scrollYProgress, [0, 0.8], ["100%", isMobile ? "100%" : "50%"]);
  const videoHeight = useTransform(scrollYProgress, [0, 0.8], ["100vh", isMobile ? "40vh" : "100vh"]);
  const videoLeft = useTransform(scrollYProgress, [0, 0.8], ["0%", isMobile ? "0%" : "50%"]);
  const videoTop = useTransform(scrollYProgress, [0, 0.8], ["0%", "0%"]);

  return (
    <div 
      ref={containerRef} 
      className={`relative bg-black ${cursorSectionClassName}`}
      style={{ height: isMobile ? "150vh" : "200vh" }}
      {...cursorSectionProps}
    >
      <div id="certificatesection" className="absolute top-0 w-full h-full pointer-events-none" />
      
      {/* STICKY CONTAINER: Certification + Video */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
        {/* CERTIFICATION SECTION BACKGROUND (always present, revealed as video shrinks) */}
        <div className="absolute inset-0 w-full h-full bg-[#F7F7F5]">
          <FireHorizontalExperience scrollProgress={scrollYProgress} isMobile={isMobile} />
        </div>

        {/* SINGLE VIDEO LAYER - Shrinks and shifts right */}
        <motion.div
          style={{ 
            width: videoWidth, 
            height: videoHeight,
            left: videoLeft,
            top: videoTop,
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
  );
}