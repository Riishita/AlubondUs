"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import FireHorizontalExperience from "./CertificationSection"; 

export default function CinematicVerticalTear() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

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

  // Slide the container horizontally
  const containerX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div 
      ref={containerRef} 
      className={`relative bg-black ${cursorSectionClassName}`}
      style={{ height: "200vh" }}
      {...cursorSectionProps}
    >
      <div id="certificatesection" className="absolute top-0 w-full h-full pointer-events-none" />
      
      {/* STICKY CONTAINER: Locks to screen while scrolling */}
      <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
        
        {/* HORIZONTAL SLIDING TRACK: Holds Video (left) and Certification (right) */}
        <motion.div 
          style={{ x: containerX }}
          className="flex h-full w-[200vw]"
        >
          
          {/* VIDEO SECTION: Takes up first 100vw */}
          <div className="w-[100vw] h-full relative shrink-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065540/VN20260413_125908_bxq5dm.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          </div>

          {/* CERTIFICATION SECTION: Takes up second 100vw */}
          <div className="w-[100vw] h-full relative shrink-0">
            <FireHorizontalExperience scrollProgress={scrollYProgress} isMobile={isMobile} />
          </div>

        </motion.div>

      </div>
    </div>
  );
}