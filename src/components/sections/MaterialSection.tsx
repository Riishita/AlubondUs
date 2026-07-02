"use client";

import { useRef, useState } from "react";
import {
  motion,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/* ================= DATA CONFIG ================= */

const heroData = {
  image: "/images/Hero-palatte.jpeg",
  label: "004 / Color & Finishes",
  title: ["A Palette", "Without Limits"],
};

const categories = [
  "Wood",
  "Solid",
  "Metallic",
  "Stone & Marbles",
  "Patina",
  "Concrete",
  "Texture",

  "Anodised",
  "Najdi",
  "Prismatic",
  "Sparkle",
];

const words = [
  "Innovation", "Durability", "Sustainability", "Performance",
  "Precision", "Excellence", "Design", "Quality",
];

const materials = [
  { name: "WHITEAHORN", image: "/materials/Wood1.webp", category: "Wood" },
  { name: "ORIENTAL CANE", image: "/materials/Wood2.webp", category: "Wood" },
  { name: "NATURAL OAK", image: "/materials/Wood3.webp", category: "Wood" },
  { name: "WALNUT", image: "/materials/Wood4.webp", category: "Wood" },
  { name: "ROSEWOOD", image: "/materials/Wood5.webp", category: "Wood" },
  { name: "ROYAL TEAK", image: "/materials/Wood6.webp", category: "Wood" },
  { name: "TEAK", image: "/materials/Wood7.webp", category: "Wood" },
  { name: "DARKTEAK", image: "/materials/Wood8.webp", category: "Wood" },
  { name: "QUERCUS", image: "/materials/Wood9.webp", category: "Wood" },
  { name: "WENGE", image: "/materials/Wood10.webp", category: "Wood" },
  { name: "ROYAL WENGE ", image: "/materials/Wood11.webp", category: "Wood" },
  { name: "MAHOGANY", image: "/materials/Wood12.webp", category: "Wood" },

  { name: "Yellow", image: "/materials/Solid1.webp", category: "Solid" },
  { name: "Signal Red", image: "/materials/Solid2.webp", category: "Solid" },
  { name: "Sea Blue", image: "/materials/Solid3.webp", category: "Solid" },
  { name: "Dark Blue", image: "/materials/Solid4.webp", category: "Solid" },
  { name: "Rat Grey", image: "/materials/Solid5.webp", category: "Solid" },
  { name: "White", image: "/materials/Solid6.webp", category: "Solid" },
  { name: "Appricot white", image: "/materials/Solid7.webp", category: "Solid" },
  { name: "Ivory White", image: "/materials/Solid8.webp", category: "Solid" },
  { name: "Pure White", image: "/materials/Solid9.webp", category: "Solid" },
  { name: "Coal Blue", image: "/materials/Solid10.webp", category: "Solid" },
  { name: "Burgundy", image: "/materials/Solid11.webp", category: "Solid" },
  { name: "Bone White", image: "/materials/Solid12.webp", category: "Solid" },
  { name: "Purple Blue", image: "/materials/Solid13.webp", category: "Solid" },
  { name: "Orange", image: "/materials/Solid14.webp", category: "Solid" },
  { name: "Cream White", image: "/materials/Solid15.webp", category: "Solid" },

  { name: "CHAMPAGNE GOLD", image: "/materials/Metallic1.webp", category: "Metallic" },
  { name: "BRIGHT CHAMPAGNE SILVER", image: "/materials/Metallic2.webp", category: "Metallic" },
  { name: "METALLIC BLACK", image: "/materials/Metallic3.webp", category: "Metallic" },
  { name: "METALLIC BRONZE", image: "/materials/Metallic4.webp", category: "Metallic" },
  { name: "METALLIC GOLD", image: "/materials/Metallic5.webp", category: "Metallic" },
  { name: "DESERT ROSE METALLIC", image: "/materials/Metallic6.webp", category: "Metallic" },
  { name: "BRUSHED SILVER", image: "/materials/Metallic7.webp", category: "Metallic" },
  { name: "BRIGHT SILVER", image: "/materials/Metallic8.webp", category: "Metallic" },
  { name: "METALLIC BRASS", image: "/materials/Metallic9.webp", category: "Metallic" },
  { name: "RAW GREY", image: "/materials/Metallic10.webp", category: "Metallic" },
  { name: "GRAY METALLIC SILVER ", image: "/materials/Metallic11.webp", category: "Metallic" },
  { name: "METALLIC JADE", image: "/materials/Metallic12.webp", category: "Metallic" },
  { name: "SMOKE SILVER", image: "/materials/Metallic13.webp", category: "Metallic" },
  { name: "ROYAL WENGE ", image: "/materials/Metallic14.webp", category: "Metallic" },
  { name: "BLUE METALLIC", image: "/materials/Metallic15.webp", category: "Metallic" },

  { name: "WHITE GRANITE ", image: "/materials/Stone1.webp", category: "Stone & Marbles" },
  { name: "YELLOW GRANITE ", image: "/materials/Stone2.webp", category: "Stone & Marbles" },
  { name: "ROSA PORRINHO", image: "/materials/Stone3.webp", category: "Stone & Marbles" },
  { name: "ROSA GRANITE  ", image: "/materials/Stone4.webp", category: "Stone & Marbles" },
  { name: "SERPEGIANTE  ", image: "/materials/Stone5.webp", category: "Stone & Marbles" },
  { name: "GRANITE NERO ", image: "/materials/Stone6.webp", category: "Stone & Marbles" },
  { name: "WHITE MARBLE ", image: "/materials/Stone7.webp", category: "Stone & Marbles" },
  { name: "RAVERTINE  ", image: "/materials/Stone8.webp", category: "Stone & Marbles" },
  { name: "YELLOW MARBLE ", image: "/materials/Stone9.webp", category: "Stone & Marbles" },
  { name: "CAFEE MARNO  ", image: "/materials/Stone10.webp", category: "Stone & Marbles" },

  { name: "AB-SS-003", image: "/materials/Patina1.webp", category: "Patina" },
  { name: "AB-SS-004", image: "/materials/Patina2.webp", category: "Patina" },
  { name: "AB-SS-005", image: "/materials/Patina3.webp", category: "Patina" },
  { name: "AB-SS-006", image: "/materials/Patina4.webp", category: "Patina" },
  { name: "AB-SS-007", image: "/materials/Patina5.webp", category: "Patina" },
  { name: "AB-SS-008", image: "/materials/Patina6.webp", category: "Patina" },

  { name: "AB-SS-003", image: "/materials/Concrete1.webp", category: "Concrete" },
  { name: "AB-SS-004", image: "/materials/Concrete2.webp", category: "Concrete" },
  { name: "AB-SS-005", image: "/materials/Concrete3.webp", category: "Concrete" },
  { name: "AB-SS-006", image: "/materials/Concrete4.webp", category: "Concrete" },

  { name: "AB-SS-003", image: "/materials/Texture1.webp", category: "Texture" },
  { name: "AB-SS-004", image: "/materials/Texture2.webp", category: "Texture" },
  { name: "AB-SS-005", image: "/materials/Texture3.webp", category: "Texture" },
  { name: "AB-SS-006", image: "/materials/Texture4.webp", category: "Texture" },
  { name: "AB-SS-007", image: "/materials/Texture5.webp", category: "Texture" },
  { name: "AB-SS-008", image: "/materials/Texture6.webp", category: "Texture" },

  { name: "AB-SS-003", image: "/materials/Brush1.webp", category: "Anodised" },
  { name: "AB-SS-004", image: "/materials/Brush2.webp", category: "Anodised" },
  { name: "AB-SS-005", image: "/materials/Brush3.webp", category: "Anodised" },
  { name: "AB-SS-006", image: "/materials/Brush4.webp", category: "Anodised" },
  { name: "AB-SS-007", image: "/materials/Brush5.webp", category: "Anodised" },
  { name: "AB-SS-008", image: "/materials/Brush6.webp", category: "Anodised" },
  { name: "AB-SS-009", image: "/materials/Brush7.webp", category: "Anodised" },

  { name: "BRONZE", image: "/materials/Anodised1.webp", category: "Anodised" },
  { name: "BRUSH ", image: "/materials/Anodised2.webp", category: "Anodised" },
  { name: "GOLD 20", image: "/materials/Anodised3.webp", category: "Anodised" },
  { name: "BROWN", image: "/materials/Anodised4.webp", category: "Anodised" },
  { name: "BLACK", image: "/materials/Anodised5.webp", category: "Anodised" },
  { name: "TI-LOOK ", image: "/materials/Anodised6.webp", category: "Anodised" },

  { name: "AB-SS-003", image: "/materials/Najdi1.webp", category: "Najdi" },
  { name: "AB-SS-004", image: "/materials/Najdi2.webp", category: "Najdi" },
  { name: "AB-SS-005", image: "/materials/Najdi3.webp", category: "Najdi" },
  { name: "AB-SS-006", image: "/materials/Najdi4.webp", category: "Najdi" },
  { name: "AB-SS-007", image: "/materials/Najdi5.webp", category: "Najdi" },
  { name: "AB-SS-008", image: "/materials/Najdi6.webp", category: "Najdi" },
  { name: "AB-SS-009", image: "/materials/Najdi7.webp", category: "Najdi" },
  { name: "AB-SS-010", image: "/materials/Najdi8.webp", category: "Najdi" },
  { name: "AB-SS-011", image: "/materials/Najdi9.webp", category: "Najdi" },

  { name: "AB-SS-003", image: "/materials/Prismatic1.webp", category: "Prismatic" },
  { name: "AB-SS-004 ", image: "/materials/Prismatic02.webp", category: "Prismatic" },
  { name: "AB-SS-005 ", image: "/materials/Prismatic3.webp", category: "Prismatic" },
  { name: "AB-SS-006", image: "/materials/Prismatic04.webp", category: "Prismatic" },
  { name: "AB-SS-007", image: "/materials/Prismatic05.webp", category: "Prismatic" },
  { name: "AB-SS-008 ", image: "/materials/Prismatic06.webp", category: "Prismatic" },

  { name: "SPARKLING BLACK", image: "/materials/Sparkle1.webp", category: "Sparkle" },
  { name: "SPARKLING WHITE", image: "/materials/Sparkle2.webp", category: "Sparkle" },
  { name: "SPARKLING GOLD", image: "/materials/Sparkle3.webp", category: "Sparkle" },
  { name: "SPARKLING GREY", image: "/materials/Sparkle4.webp", category: "Sparkle" },
];

/* ================= HERO ================= */

const HeroSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { smoothProgress: scrollYProgress } = useSectionScroll(
    ref,
    ["start start", "end start"]
  );
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      
      {/* Background Image with Scale Parallax */}
      <motion.div className="absolute inset-0 transform-gpu will-change-transform" style={{ scale: imageScale }}>
        <img
          src={heroData.image}
          alt="Color and finishes"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-8 md:px-16 pt-20 transform-gpu will-change-transform"
        style={{ y: textY }}
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-6 md:mb-10"
        >
          <span className="h-[1px] w-8 md:w-12 bg-white/60"></span>
          <p className="tracking-[0.2em] text-[10px] md:text-xs font-semibold text-white uppercase">
            {heroData.label}
          </p>
          <span className="h-[1px] w-8 md:w-12 bg-white/60"></span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.1] text-center"
          style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
        >
          {heroData.title[0]} <br />
          <span className="text-white/90">{heroData.title[1]}</span>
        </motion.h1>
      </motion.div>
    </section>
  );
};

/* ================= MARQUEE ================= */

const MarqueeStrip = () => {
  return (
    <div className="py-5 bg-[#1A1A1A] border-t border-white/10 text-white/80 overflow-hidden relative z-20 shadow-2xl">
      <motion.div
        className="flex gap-12 whitespace-nowrap transform-gpu will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Smoother, slightly slower speed
        }}
      >
        {[...words, ...words, ...words].map((word, i) => (
          <span
            key={i}
            className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold"
          >
            {word} <span className="mx-6 md:mx-10 opacity-30 text-[#0a4b7c]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ================= MATERIALS ================= */

const MaterialsSection = () => {
  const [active, setActive] = useState("Wood");
  const [hovered, setHovered] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = materials.filter((m) => m.category === active);

  return (
    <section ref={ref} className="bg-[#FAFAFA] py-24 md:py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">

      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#0a4b7c]/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* ================= HEADER & DESCRIPTION ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#1A1A1A] mb-4">
              Material <span className="text-[#0a4b7c]">Library</span>
            </h2>
            <p className="text-base md:text-lg text-[#6B7280] max-w-lg font-light leading-relaxed">
              Explore our comprehensive collection of architectural finishes, featuring tactile surfaces, vibrant solid colors, and elegant natural textures.
            </p>
          </motion.div>
        </div>

        {/* ================= FILTERS ================= */}
        <motion.div
          className="mb-16 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-full px-6 py-3 text-xs md:text-sm font-medium tracking-wide transition-all duration-300
              ${
                active === cat
                  ? "bg-[#1A1A1A] text-white shadow-lg shadow-black/10 scale-105"
                  : "bg-white border border-gray-200 text-[#4B5563] hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ================= SWATCHES GRID ================= */}
        <div className="flex flex-wrap content-start items-start gap-6 md:gap-8 min-h-[250px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((mat, i) => (
              <motion.div
                key={mat.name + i}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative group cursor-pointer"
              >
                {/* 🔥 3D CARD IMPLEMENTATION */}
                <div
                  className="relative [perspective:1200px]"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rotateX = ((y - rect.height / 2) / rect.height) * -25;
                    const rotateY = ((x - rect.width / 2) / rect.width) * 25;
                    const card = e.currentTarget.firstElementChild as HTMLElement;
                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget.firstElementChild as HTMLElement;
                    card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
                  }}
                >
                  <div
                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 transition-transform duration-400 ease-out flex items-center justify-center p-2"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Material Image */}
                    <img
                      src={mat.image}
                      alt={mat.name}
                      className="w-full h-full object-cover rounded-xl shadow-inner"
                      loading="lazy"
                      style={{ transform: "translateZ(30px)" }}
                    />
                    
                    {/* Gloss Reflection Overlay */}
                    <div 
                      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)",
                        transform: "translateZ(40px)"
                      }}
                    />
                  </div>
                </div>
                
                {/* Tooltip Popup */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs tracking-wider uppercase font-medium whitespace-nowrap z-50 shadow-2xl pointer-events-none"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {mat.name}
                      {/* Triangle Pointer */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1A1A1A] rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <motion.div
          className="mt-16 pt-10 border-t border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div>
            <h4 className="text-xl font-medium text-[#1A1A1A] mb-2">Can't find what you're looking for?</h4>
            <p className="text-sm text-[#6B7280] max-w-md font-light">
              We offer bespoke color matching and custom finishes engineered specifically for your architectural requirements.
            </p>
          </div>

          <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-[#1A1A1A] text-[#1A1A1A] rounded-full overflow-hidden w-fit transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <span className="relative z-10 text-xs md:text-sm tracking-wider font-bold uppercase group-hover:text-white transition-colors duration-300">
              Explore Color Studio
            </span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">→</span>
            <div className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

/* ================= FINAL ================= */

export default function SixthSection() {
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

  return (
    <div id="materials" className={cn("relative", cursorSectionClassName)} {...cursorSectionProps}>
      {/* HERO (sticks) */}
      <HeroSection />

      {/* SCROLL CONTENT (slides over) */}
      <div className="relative z-20 bg-[#FAFAFA]">
        <MarqueeStrip />
        <MaterialsSection />
      </div>

    </div>
  );
}