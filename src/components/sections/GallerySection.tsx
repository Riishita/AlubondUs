"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";

const panels = [
  { video: "https://res.cloudinary.com/dh4jcgcpw/video/upload/v1782992104/video_3_kzkrdu.mp4", title: "Yas Island | Hotel on Yas Marina Circuit ", location: "W Abu Dhabi" },
  { video: "https://res.cloudinary.com/dh4jcgcpw/video/upload/v1782991995/video4_bbuhj3.mp4", title: "The Address Downtown", location: "Dubai, UAE" },
  { video: "https://res.cloudinary.com/dh4jcgcpw/video/upload/v1782991993/video5_zfqnc7.mp4", title: "Burj Khalifa", location: "Dubai, UAE" },
  { video: "https://res.cloudinary.com/dh4jcgcpw/video/upload/v1782992068/video6_q5ujxm.mp4", title: "Khalifa Stadium", location: "Doha, Qatar" },
];

export default function PremiumGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });
  // Move horizontally by a percentage of the total track width.
  // We want to move exactly (panels.length - 1) items to the left.
  const xTransform = useTransform(smoothProgress, [0, 1], ["0%", `-${(panels.length - 1) * 100 / panels.length}%`]);

  const buttonOpacity = useTransform(smoothProgress, [0.9, 1], [0, 1]);
  const buttonScale = useTransform(smoothProgress, [0.9, 1], [0.8, 1]);

  return (
    <section 
      ref={containerRef} 
      className={`bg-black relative h-[400vh] text-white ${cursorSectionClassName}`}
      {...cursorSectionProps}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col lg:grid lg:grid-cols-12 items-center px-6 lg:px-16 gap-6 lg:gap-8 overflow-hidden">
        
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
        <div className="lg:col-span-4 flex flex-col justify-center pt-24 lg:pt-0 z-20 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-4">
            <p className="type-overline text-white/50">
                006 / Gallery
              </p>

              <div className="flex justify-between flex-wrap gap-6 mt-5">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] mb-2 lg:mb-6">
                TRUSTED BY <br />
                <span className="text-white font-medium">ARCHITECTS.</span>
              </h2>
                
                 </div>

            <div className="w-16 h-[1px] bg-white/20 mt-4 lg:mt-8 hidden lg:block" />
          </motion.div>
        </div>

        {/* Right Gallery Column */}
        <div className="lg:col-span-8 w-full flex-1 flex items-center justify-center lg:justify-end pb-24 lg:pb-0 z-20 min-h-0">
          <div 
            className="relative overflow-hidden rounded-2xl border border-white/10 w-[85vw] h-[50vh] lg:w-[40vw] lg:h-[70vh]"
          >
            <motion.div style={{ x: xTransform }} className="flex h-full w-max transform-gpu will-change-transform">
              {panels.map((panel, i) => (
                <div key={i} className="relative h-full flex-shrink-0 w-[85vw] lg:w-[40vw]">
                  <video src={panel.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 lg:p-8">
                    <p className="type-overline text-white/80">{panel.location}</p>
                    <h3 className="type-h3">{panel.title}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          style={{ opacity: buttonOpacity, scale: buttonScale }}
          className="absolute bottom-8 lg:bottom-12 left-0 right-0 flex justify-center z-30"
        >
          <Link to="/gallery">
            <button className="type-btn px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm lg:text-base">
              View All Projects
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}