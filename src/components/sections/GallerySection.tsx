"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";

const panels = [
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066850/VN20260506_165456_ujqlmd.mp4", title: "Krestovsky Stadium", location: "St. Petersburg, Russia" },
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066849/VN20260506_165518_q1j310.mp4", title: "The Address Downtown", location: "Dubai, UAE" },
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066850/VN20260506_165356_drniqf.mp4", title: "Burj Khalifa", location: "Dubai, UAE" },
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065542/VN20260414_022640_ideoyr.mp4", title: "Khalifa Stadium", location: "Doha, Qatar" },
];

export default function PremiumGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? 85 : 40;
  // Reduced card height on mobile to provide more breathing room for the button
  const cardHeight = isMobile ? "38vh" : "70vh";
  
  const totalMove = (panels.length - 1) * cardWidth;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });
  const xTransform = useTransform(smoothProgress, [0, 1], ["0vw", `-${totalMove}vw`]);

  const buttonOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);
  const buttonScale = useTransform(smoothProgress, [0.9, 1], [0.8, 1]);

  return (
    <section 
      ref={containerRef} 
      className={`bg-black relative h-[400vh] text-white ${cursorSectionClassName}`}
      {...cursorSectionProps}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col lg:grid lg:grid-cols-12 items-center px-6 lg:px-16 gap-8 overflow-hidden">
        
        {/* Aesthetic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-black to-neutral-900/50" />
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
              y: useTransform(smoothProgress, [0, 1], ["0%", "20%"])
            }}
            className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[120px] transform-gpu will-change-transform" 
          />
          <motion.div 
            style={{ 
              opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]), 
              scale: useTransform(smoothProgress, [0, 1], [1, 1.2]) 
            }}
            className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-neutral-800/40 blur-[150px] transform-gpu will-change-transform" 
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        </div>

        {/* Left Text Column */}
        <div className="lg:col-span-4 flex flex-col justify-center h-full pt-12 lg:pt-0 z-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-4">
            <p className="type-overline text-white/50">
                004 / Applications
              </p>

              <div className="flex justify-between flex-wrap gap-6 mt-5">
                <h1 className="type-h1 text-white uppercase">

                 
                  TRUSTED BY <br /> ARCHITECTS.
                </h1>
                 </div>

            <div className="w-16 h-[1px] bg-white/20 mt-8" />
          </motion.div>
        </div>

        {/* Right Gallery Column - Added margin bottom for mobile separation */}
        <div className="lg:col-span-8 w-full flex items-center justify-center lg:justify-end mb-24 lg:mb-0 z-20">
          <div 
            className="relative overflow-hidden rounded-2xl border border-white/10"
            style={{ width: `${cardWidth}vw`, height: cardHeight }}
          >
            <motion.div style={{ x: xTransform }} className="flex h-full w-max transform-gpu will-change-transform">
              {panels.map((panel, i) => (
                <div key={i} style={{ width: `${cardWidth}vw` }} className="relative h-full flex-shrink-0">
                  <video src={panel.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <p className="type-overline text-white/60">{panel.location}</p>
                    <h3 className="type-h3">{panel.title}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Button - Adjusted bottom spacing */}
        <motion.div
          style={{ opacity: buttonOpacity, scale: buttonScale }}
          className="absolute bottom-8 lg:bottom-12 left-0 right-0 flex justify-center z-30"
        >
          <button className="type-btn px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}