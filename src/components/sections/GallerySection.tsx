"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const panels = [
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066850/VN20260506_165456_ujqlmd.mp4", title: "Krestovsky Stadium", location: "St. Petersburg, Russia" },
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066849/VN20260506_165518_q1j310.mp4", title: "The Address Downtown", location: "Dubai, UAE" },
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778066850/VN20260506_165356_drniqf.mp4", title: "Burj Khalifa", location: "Dubai, UAE" },
  { video: "https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065542/VN20260414_022640_ideoyr.mp4", title: "Khalifa Stadium", location: "Doha, Qatar" },
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

  const cardWidth = isMobile ? 85 : 40;
  // Reduced card height on mobile to provide more breathing room for the button
  const cardHeight = isMobile ? "45vh" : "70vh";
  
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
    <section ref={containerRef} className="bg-neutral-950 relative h-[400vh] text-white">
      <div className="sticky top-0 h-screen w-full flex flex-col lg:grid lg:grid-cols-12 items-center px-6 lg:px-16 gap-8 overflow-hidden">
        
        {/* Left Text Column */}
        <div className="lg:col-span-4 flex flex-col justify-center h-full pt-12 lg:pt-0 z-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-4">
            <p className="text-white/40 uppercase text-[10px] tracking-[0.4em] font-medium">005 / Portfolio</p>
            <h2 className="text-4xl lg:text-6xl font-medium leading-tight">
              TRUSTED BY<br/>
              <span className="italic font-light text-white/60"> ARCHITECTS.</span>
            </h2>
            <div className="w-16 h-[1px] bg-white/20 mt-8" />
          </motion.div>
        </div>

        {/* Right Gallery Column - Added margin bottom for mobile separation */}
        <div className="lg:col-span-8 w-full flex items-center justify-center lg:justify-end mb-16 lg:mb-0">
          <div 
            className="relative overflow-hidden rounded-2xl border border-white/10"
            style={{ width: `${cardWidth}vw`, height: cardHeight }}
          >
            <motion.div style={{ x: xTransform }} className="flex h-full w-max">
              {panels.map((panel, i) => (
                <div key={i} style={{ width: `${cardWidth}vw` }} className="relative h-full flex-shrink-0">
                  <video src={panel.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/60">{panel.location}</p>
                    <h3 className="text-2xl font-light tracking-wide">{panel.title}</h3>
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
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] tracking-[0.3em] uppercase font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}