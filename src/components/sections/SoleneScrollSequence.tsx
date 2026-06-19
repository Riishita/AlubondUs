import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Smile, Brain, Stethoscope, ShieldCheck, Flame, Globe2, Award, FileCheck2, Building2 } from "lucide-react";

// Certificate Data
const certs = [
  { title: "EN 13501", desc: "European Fire Classification", tag: "CLASS A2-S1,D0", icon: Flame },
  { title: "NFPA 285", desc: "Fire Propagation", tag: "FULLY COMPLIANT", icon: ShieldCheck },
  { title: "BS 8414", desc: "British Standard", tag: "BRE CERTIFIED", icon: Building2 },
  { title: "ULC-S134", desc: "Canadian Fire Test", tag: "COMPLIANT", icon: Globe2 },
  { title: "ASTM E-84", desc: "Smoke & Flame Spread", tag: "CLASS A RATING", icon: FileCheck2 },
  { title: "ISO 9001", desc: "Quality Management", tag: "CERTIFIED FACILITY", icon: Award },
];

const cardPositions = [
  "left-[2%] md:left-[8%] top-[0%]",
  "right-[2%] md:right-[10%] top-[20%]",
  "left-[5%] md:left-[15%] top-[40%]",
  "right-[5%] md:right-[15%] top-[60%]",
  "left-[2%] md:left-[10%] top-[80%]",
  "right-[8%] md:right-[20%] top-[100%]",
];

export default function SoleneScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // INITIAL TEXT LAYER
  const initialTextOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  // VIDEO LAYER
  // 0 -> 0.25: Video slides in from right
  // 0.45 -> 0.65: Video slides out to left
  const videoX = useTransform(
    smoothProgress,
    [0, 0.25, 0.45, 0.65],
    ["100vw", "0vw", "0vw", "-100vw"]
  );

  const videoCardsOpacity = useTransform(smoothProgress, [0.25, 0.35], [0, 1]);
  const videoCardsY = useTransform(smoothProgress, [0.25, 0.35], [50, 0]);

  // CERTIFICATE LAYER
  const certTextOpacity = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);

  // Certificate cards flow from bottom (100vh) to top (-150vh) between 0.5 and 1.0
  const certCardsY = useTransform(smoothProgress, [0.5, 1], ["100vh", "-150vh"]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-white">
      {/* Anchor to land exactly where certificates appear (after video) */}
      <div id="certificates" className="absolute top-[280vh] w-full h-px pointer-events-none" />
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
        
        {/* ================= INITIAL TEXT LAYER ================= */}
        <motion.div 
  style={{ opacity: initialTextOpacity }}
  className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20 pointer-events-none bg-[#F8F8F8]"
>
  <div className="flex flex-col items-center">
    
    {/* Main Headline */}
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black mb-10">
      WORLD'S LARGEST ACP BRAND
    </h1>

    {/* Subtle Divider - reduced width and opacity */}
    <div className="w-24 h-[1px] bg-black/20 mb-8" />

    {/* Certifications - more spacing and lighter touch */}
    <div className="flex flex-col gap-1 tracking-[0.2em]">
      <p className="text-xs md:text-xl font-medium text-black/70 uppercase">
        FR-A1 | FR-A2 | FR-B1 | FR-B2 Fire Rated Panels
      </p>
      <p className="text-[10px] md:text-xl text-black/50 uppercase">
        NFPA 285 & EN 13501 Certified | BS 8414 Compliant System
      </p>
    </div>
    
  </div>
</motion.div>

        {/* ================= CERTIFICATE LAYER (BEHIND VIDEO) ================= */}
        {/* Fixed Centered Text */}
        <motion.div 
          style={{ opacity: certTextOpacity }}
          className="absolute z-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
            <p className="tracking-[0.2em] text-xs font-semibold text-[#0a4b7c] uppercase">
              003 / Fire & Safety
            </p>
            <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A] mb-8 leading-[1.1]">
            Fire Standards <br />
            <span className="text-[#0a4b7c] font-medium"> & Certifications</span>
          </h2>
          
          <p className="text-sm md:text-lg text-[#4B5563] max-w-xl mx-auto mb-10 leading-relaxed font-light">
            Engineered for ultimate safety. From European classifications to American NFPA codes, every panel is independently tested, verified, and globally certified.
          </p>

          <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-full overflow-hidden w-fit pointer-events-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <span className="relative z-10 text-sm tracking-wider font-medium uppercase">
              View all
            </span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 bg-[#0a4b7c] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </button>
        </motion.div>

        {/* Scrolling Certificate Cards */}
       <motion.div 
  style={{ y: certCardsY }}
  className="absolute z-10 w-full h-[150vh] flex items-start justify-center pointer-events-none top-0"
>
  {certs.map((item, i) => {
    const Icon = item.icon;
    const positionClass = cardPositions[i % cardPositions.length];
    
    return (
      <div key={i} className={`pointer-events-auto absolute ${positionClass}`}>
        <div className="group relative w-[280px] h-[200px] md:w-[340px] md:h-[230px] rounded-[24px] border border-white/20 bg-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2 hover:border-[#0a4b7c]/30">
          
          {/* Subtle Inner Gradient Border (High-end UI Detail) */}
          <div className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
          
          <div className="relative z-10 h-full p-8 flex flex-col justify-between">
            {/* Header Area */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/60 shadow-sm flex items-center justify-center text-[#0a4b7c] transition-all duration-500 group-hover:bg-[#0a4b7c] group-hover:text-white">
                <Icon size={24} strokeWidth={1.2} />
              </div>
              <span className="text-[10px] tracking-[0.2em] font-medium text-[#0a4b7c] uppercase bg-[#0a4b7c]/5 px-3 py-1 rounded-full border border-[#0a4b7c]/10">
                {item.tag}
              </span>
            </div>
            
            {/* Body Text */}
            <div>
              <h3 className="text-lg md:text-xl font-medium text-[#1A1A1A] mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#4B5563]/80 leading-relaxed font-light line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>

          {/* Bottom Gradient Glow (The "Architectural" feel) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0a4b7c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    );
  })}
</motion.div>


        {/* ================= VIDEO LAYER ================= */}
        <motion.div 
          style={{ x: videoX }}
          className="absolute z-30 w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] md:w-[calc(100vw-4rem)] md:h-[calc(100vh-4rem)] rounded-[32px] overflow-hidden bg-black flex flex-col justify-end will-change-transform shadow-2xl"
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
            <source src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1781461544/VN20260614_235234_atfex7.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          {/* Cards over video */}
          <motion.div 
            style={{ opacity: videoCardsOpacity, y: videoCardsY }}
            className="relative z-40 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 px-8 md:px-20 pb-16 md:pb-24 w-full max-w-7xl mx-auto"
          >
            <div className="flex flex-col text-white">
  <ShieldCheck className="w-8 h-8 mb-4 text-white" />
  <h3 className="text-xl md:text-2xl font-medium mb-3">
    Fire Stability
  </h3>
  <p className="text-white/80 font-light text-sm md:text-base leading-relaxed">
    Maintains structural integrity and panel performance even under
    high-temperature exposure, helping reduce fire-related damage.
  </p>
</div>

<div className="flex flex-col text-white">
  <Flame className="w-8 h-8 mb-4 text-white" />
  <h3 className="text-xl md:text-2xl font-medium mb-3">
    Fire-Retardant Core
  </h3>
  <p className="text-white/80 font-light text-sm md:text-base leading-relaxed">
    Engineered with advanced fire-retardant technology that helps limit
    flame spread and enhances overall building safety.
  </p>
</div>

<div className="flex flex-col text-white">
  <Building2 className="w-8 h-8 mb-4 text-white" />
  <h3 className="text-xl md:text-2xl font-medium mb-3">
    Enhanced Protection
  </h3>
  <p className="text-white/80 font-light text-sm md:text-base leading-relaxed">
    Designed to minimize smoke generation and provide greater protection
    for occupants, property, and critical infrastructure.
  </p>
</div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
