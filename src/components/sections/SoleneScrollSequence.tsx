import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Smile, Brain, Stethoscope, ShieldCheck, Flame, Globe2, Award, FileCheck2, Building2, FileText, BadgeCheck } from "lucide-react";

// Certificate Data
const certs = [
  { title: "EN 13501", desc: "European Fire Classification", tag: "CLASS A2-S1,D0", icon: Flame, pdfPath: "/En-13501 Fire Classification.pdf" },
  { title: "NFPA 285", desc: "Fire Propagation", tag: "FULLY COMPLIANT", icon: ShieldCheck, pdfPath: "/ESL-26-12003.pdf" },
  { title: "BS 8414", desc: "British Standard", tag: "BRE CERTIFIED", icon: Building2, pdfPath: "/DLR2139 Rev.0.pdf " },
  { title: "ULC-S134", desc: "Canadian Fire Test", tag: "COMPLIANT", icon: Globe2, pdfPath: "/ULC S134 FRA2.pdf" },
  { title: "ASTM E-84", desc: "Smoke & Flame Spread", tag: "CLASS A RATING", icon: FileCheck2, pdfPath: "/ASTM E-84.pdf" },
  { title: "ISO 9001", desc: "Quality Management", tag: "CERTIFIED FACILITY", icon: Award, pdfPath: "/D 9001 EIAC - Main.pdf" },
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768); // Only target mobile screens
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 35,
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
  const certTextOpacity = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);

  // Certificate cards flow from bottom (80vh) to top (-60vh) — reduced travel distance
  const certCardsY = useTransform(smoothProgress, [0.5, 1], ["80vh", "-60vh"]);

  if (isMobile) {
    return (
      <div className="relative w-full bg-white flex flex-col pt-20">
         <div id="certificates" className="absolute top-0 w-full h-px pointer-events-none" />
         
         {/* INITIAL TEXT LAYER */}
         <div className="flex flex-col items-center justify-center px-6 text-center mb-16 pt-10">
           <h1 className="text-4xl md:text-5xl font-semi-bold tracking-tight text-black mb-8">
             WORLD'S SAFEST <br /> <span className="text-[#0a4b7c] font-bold">ACP BRAND</span> 
           </h1>
           <div className="w-24 h-[1px] bg-[#0a4b7c]/30 mb-8" />
           
         </div>

         {/* VIDEO LAYER */}
         <div className="w-full px-4 mb-20">
           <div className="w-full rounded-[24px] overflow-hidden bg-black flex flex-col justify-end shadow-2xl relative" style={{ minHeight: '600px' }}>
             <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
               <source src="https://res.cloudinary.com/dh4jcgcpw/video/upload/v1782992016/VN20260629_004036_qpxpiy.mp4" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
             <div className="relative z-40 flex flex-col gap-8 px-6 pb-10 w-full mt-auto pt-40">
               <div className="flex flex-col text-white">
                 <ShieldCheck className="w-8 h-8 mb-3 text-white" />
                 <h3 className="text-xl font-medium mb-2">Fire & Smoke Stability</h3>
                 <p className="text-white/95 font-light text-sm leading-relaxed">
Engineered to maintain façade integrity during fire incidents by minimizing flame spread,
 smoke generation, and flaming droplets. Designed to enhance occupant safety while reducing fire-related damage.
                 </p>
               </div>
               <div className="flex flex-col text-white">
                 <BadgeCheck className="w-8 h-8 mb-3 text-white" />
                 <h3 className="text-xl font-medium mb-2">Alubond A2</h3>
                 <p className="text-white/95 font-light text-sm leading-relaxed mb-4">
                  Certified A2-s1,d0 to EN 13501-1, ALUBOND®️ A2 features a non-combustible mineral core,
                   delivering superior fire safety and long-lasting durability for demanding architectural applications.
                 </p>
                 <a href="/0206-25-CR-01 Eurocon (EN 13501-1) Classification Report signed.pdf" target="_blank" className="inline-flex items-center gap-2 text-white hover:text-white/80 text-xs font-medium transition-colors pointer-events-auto">
                   <FileText size={14} /> View Certificate
                 </a>
               </div>
               <div className="flex flex-col text-white">
                 <Flame className="w-8 h-8 mb-3 text-white" />
                 <h3 className="text-xl font-medium mb-2">Alubond FR</h3>
                 <p className="text-white/95 font-light text-sm leading-relaxed mb-4">
                  Certified B-s1,d0 to EN 13501-1, ALUBOND®️ FR features a fire-retardant core,
                   offering reliable fire safety, strength, and durability for a wide range of architectural applications.

                 </p>
                 <a href="/3150T17-2 R2.pdf" target="_blank" className="inline-flex items-center gap-2 text-white hover:text-white/80 text-xs font-medium transition-colors pointer-events-auto">
                   <FileText size={14} /> View Certificate
                 </a>
               </div>
               <div className="flex flex-col text-white">
                 <Building2 className="w-8 h-8 mb-3 text-white" />
                 <h3 className="text-xl font-medium mb-2">Enhanced Safety Performance</h3>
                 <p className="text-white/95 font-light text-sm leading-relaxed">
 ALUBOND®️ fire-rated panels combine certified fire protection with modern design, 
 delivering reliable safety, durability, and architectural excellence for every project.           
       </p>
               </div>
             </div>
           </div>
         </div>

         {/* CERTIFICATE TEXT */}
         <div className="flex flex-col items-center justify-center text-center px-6 mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
              <p className="tracking-[0.2em] text-xs font-semibold text-[#0a4b7c] uppercase">
                003 / Fire & Safety
              </p>
              <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
            </div>
            <h2 className="text-3xl font-light tracking-tight text-[#1A1A1A] mb-8 leading-[1.1]">
              Fire Standards <br />
              <span className="text-[#0a4b7c] font-medium"> & Certifications</span>
            </h2>
            <p className="text-sm text-[#4B5563] mb-10 leading-relaxed font-light">
              Engineered for ultimate safety. From European classifications to American NFPA codes, every panel is independently tested, verified, and globally certified.
            </p>
            <Link to="/downloads" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1A1A1A] text-white rounded-full overflow-hidden w-fit pointer-events-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <span className="relative z-10 text-sm tracking-wider font-medium uppercase">
                View all
              </span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              <div className="absolute inset-0 bg-[#0a4b7c] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </Link>
         </div>

         {/* CERTIFICATE CARDS */}
         <div className="flex flex-col gap-4 px-4 pb-20">
           {certs.map((item, i) => {
             const Icon = item.icon;
             return (
               <div key={i} className="w-full rounded-[24px] border border-black/5 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 flex flex-col justify-between">
                 <div className="flex items-center justify-between mb-4">
                   <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#0a4b7c]">
                     <Icon size={24} strokeWidth={1.2} />
                   </div>
                   <span className="text-[10px] tracking-[0.2em] font-medium text-[#0a4b7c] uppercase bg-[#0a4b7c]/5 px-3 py-1 rounded-full border border-[#0a4b7c]/10">
                     {item.tag}
                   </span>
                 </div>
                 <div>
                   <h3 className="text-lg font-medium text-[#1A1A1A] mb-2 tracking-tight">
                     {item.title}
                   </h3>
                   <p className="text-[13px] text-[#4B5563]/80 leading-relaxed font-light mb-4">
                     {item.desc}
                   </p>
                   <a href={item.pdfPath} target="_blank" className="inline-flex items-center gap-2 text-[#0a4b7c] hover:text-[#1A1A1A] text-xs font-medium transition-colors pointer-events-auto">
                     <FileText size={14} /> View Certificate
                   </a>
                 </div>
               </div>
             );
           })}
         </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-white">
      {/* Anchor to land exactly where certificates appear (after video) */}
      <div id="certificates" className="absolute top-[150vh] w-full h-px pointer-events-none" />
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
        
        {/* ================= INITIAL TEXT LAYER ================= */}
        <motion.div 
  style={{ opacity: initialTextOpacity }}
  className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20 pointer-events-none bg-[#F8F8F8]"
>
  <div className="flex flex-col items-center">
    
    {/* Main Headline with subtle blue accent on 'ACP' */}
    <h1 className="text-4xl sm:text-5xl md:text-9xl font-medium tracking-tight text-[#1A1A1A] mb-8 leading-[1.1]">
           World’s Safest <br />
            <span className="text-[#0a4b7c] font-bold"> ACP Brand</span>
          </h1>

    {/* Elegant divider */}
    {/* Certifications - Refined scale for professional balance */}
   
    
  </div>
</motion.div>

        {/* ================= CERTIFICATE LAYER (BEHIND VIDEO) ================= */}
        {/* Fixed Centered Text */}
        <motion.div 
          style={{ opacity: certTextOpacity }}
          className="absolute top-[6vh] left-0 right-0 z-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
            <p className="tracking-[0.2em] text-xs font-semibold text-[#0a4b7c] uppercase">
              003 / Fire & Safety
            </p>
            <span className="h-[1px] w-8 bg-[#0a4b7c]"></span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#1A1A1A] mb-4 leading-[1.1]">
            Fire Standards <br />
            <span className="text-[#0a4b7c] font-medium"> & Certifications</span>
          </h2>
          
          <p className="text-sm md:text-base text-[#4B5563] max-w-2xl mx-auto mb-6 leading-relaxed font-light">
            Engineered for ultimate safety. From European classifications to American NFPA codes, every panel is independently tested, verified, and globally certified.
          </p>

          <Link to="/downloads" className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#1A1A1A] text-white rounded-full overflow-hidden w-fit pointer-events-auto transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <span className="relative z-10 text-xs tracking-wider font-medium uppercase">
              View all
            </span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 bg-[#0a4b7c] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </Link>
        </motion.div>

        {/* Certificate Cards Grid */}
       <motion.div 
          style={{ opacity: certTextOpacity }}
          className="absolute top-[50vh] z-10 w-full px-6 flex items-start justify-center pointer-events-none"
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl pointer-events-auto">
            {certs.map((item, i) => {
              
              return (
                <div key={i} className="group relative w-full h-[150px] md:h-[160px] rounded-[24px] border border-black/5 bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-[#0a4b7c]/20">
                  
                  {/* Subtle Inner Gradient Border */}
                  <div className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 h-full p-4 md:p-5 flex flex-col justify-between">
                    {/* Header Area (No Icon, Only Tag) */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm md:text-base font-semi-bold text-[#1A1A1A] tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-[8px] md:text-[9px] tracking-[0.2em] font-medium text-[#0a4b7c] uppercase bg-[#0a4b7c]/5 px-2 py-1 rounded-full border border-[#0a4b7c]/10">
                        {item.tag}
                      </span>
                    </div>
                    
                    {/* Body Text */}
                    <div>
                      <p className="text-[11px] md:text-[12px] text-[#4B5563]/80 leading-relaxed font-light line-clamp-1 mb-2 md:mb-3">
                        {item.desc}
                      </p>
                      <a href={item.pdfPath} target="_blank" className="inline-flex items-center gap-1.5 md:gap-2 text-[#0a4b7c] hover:text-[#1A1A1A] text-[10px] md:text-xs font-medium transition-colors pointer-events-auto">
                        <FileText size={14} /> View Certificate
                      </a>
                    </div>
                  </div>

                  {/* Bottom Gradient Glow */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0a4b7c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-b-[24px]" />
                </div>
              );
            })}
          </div>
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
            <source src="https://res.cloudinary.com/dh4jcgcpw/video/upload/v1782992016/VN20260629_004036_qpxpiy.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          {/* Cards over video — premium layout */}
          <motion.div
            style={{ opacity: videoCardsOpacity, y: videoCardsY }}
            className="relative z-40 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 px-4 md:px-8 pb-16 md:pb-12 w-full max-w-9xl mx-auto"
          >
            <div className="flex flex-col text-white">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 leading-snug">
                Fire &amp; Smoke<br />Stability
              </h3>
              <p className="text-white/95 font-light text-sm md:text-base leading-[1.75]">
                Engineered to maintain façade integrity during fire incidents — minimizing flame spread, smoke generation, and flaming droplets to enhance occupant safety.
              </p>
            </div>

            {/* Col 2 — Alubond A2 */}
            <div className="flex flex-col text-white">
              <div className="w-10 h-10 rounded-full border border-[#59c4ee]/30 bg-[#59c4ee]/10 backdrop-blur-sm flex items-center justify-center mb-5 shrink-0">
                <BadgeCheck className="w-5 h-5 text-[#59c4ee]" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 leading-snug">
                Alubond A2
              </h3>
              <p className="text-white/95 font-light text-sm md:text-base leading-[1.75] mb-5">
                Certified A2-s1,d0 to EN 13501-1. Non-combustible mineral core delivering superior fire safety and long-lasting durability for demanding architectural applications.
              </p>
              <a
                href="/0206-25-CR-01 Eurocon (EN 13501-1) Classification Report signed.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 w-fit pointer-events-auto"
              >
                <FileText size={12} /> View Certificate
              </a>
            </div>

            {/* Col 3 — Alubond FR */}
            <div className="flex flex-col text-white">
              <div className="w-10 h-10 rounded-full border border-orange-400/30 bg-orange-400/10 backdrop-blur-sm flex items-center justify-center mb-5 shrink-0">
                <Flame className="w-5 h-5 text-orange-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 leading-snug">
                Alubond FR
              </h3>
              <p className="text-white/95 font-light text-sm md:text-base leading-[1.75] mb-5">
                Certified B-s1,d0 to EN 13501-1. Fire-retardant core offering reliable fire safety, strength, and durability for a wide range of architectural applications.
              </p>
              <a
                href="/3150T17-2 R2.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 w-fit pointer-events-auto"
              >
                <FileText size={12} /> View Certificate
              </a>
            </div>

            {/* Col 4 — Enhanced Safety Performance */}
            <div className="flex flex-col text-white">
              <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 shrink-0">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3 leading-snug">
                Enhanced Safety<br />Performance
              </h3>
              <p className="text-white/95 font-light text-sm md:text-base leading-[1.75]">
                ALUBOND® fire-rated panels combine certified fire protection with modern design — delivering reliable safety, durability, and architectural excellence for every project.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
