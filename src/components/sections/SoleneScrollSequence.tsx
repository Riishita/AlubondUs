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
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#FAF9F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAF9F4]">
        
        {/* ================= INITIAL TEXT LAYER ================= */}
        <motion.div 
          style={{ opacity: initialTextOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20 text-center z-20 pointer-events-none bg-[#FAF9F4]"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tight font-light text-black max-w-5xl leading-tight">
            A Unitized Building System thats<br/>
             <span className="text-[#203f65] font-normal">40% faster</span> to build and <span className="text-[#2d8eab] font-normal">30% more cost effective.</span>
          </h1>
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
              002 / Fire & Safety
            </p>
            <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-[#1A1A1A] mb-8 leading-[1.1]">
            Fire Standards <br />
            <span className="text-[#0a4b7c]"> & Certifications</span>
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
              <div 
                key={i} 
                className={`pointer-events-auto absolute ${positionClass}`}
              >
                {/* Fixed Size Card with Blue Gradient */}
                <div className="group relative bg-white/70 bg-gradient-to-br from-[#0a4b7c]/10 via-[#0a4b7c]/5 to-transparent backdrop-blur-3xl border border-white/60 p-6 rounded-[32px] shadow-[0_10px_40px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2 overflow-hidden w-[280px] h-[200px] md:w-[320px] md:h-[220px] flex flex-col justify-between">
                  
                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#0a4b7c] group-hover:text-white transition-colors duration-500 text-[#0a4b7c]">
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <span className="px-3 py-1 bg-white shadow-sm text-[#4B5563] text-[9px] font-bold tracking-widest uppercase rounded-full group-hover:bg-[#0a4b7c]/10 group-hover:text-[#0a4b7c] transition-colors duration-500">
                        {item.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-semibold text-[#111827] mb-2">{item.title}</h3>
                    <p className="text-xs md:text-sm text-[#6B7280] leading-relaxed font-light line-clamp-3">{item.desc}</p>
                  </div>
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
            <source src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065540/VN20260413_125908_bxq5dm.mp4" type="video/mp4" />
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
