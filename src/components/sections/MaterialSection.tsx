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
  { id: "ALW-314", name: "WHITEAHORN", image: "/materials/Wood1.webp", category: "Wood" },
  { id: "ALW-321", name: "ORIENTAL CANE", image: "/materials/Wood2.webp", category: "Wood" },
  { id: "ALW-322", name: "NATURAL OAK", image: "/materials/Wood3.webp", category: "Wood" },
  { id: "ALW-301", name: "WALNUT", image: "/materials/Wood4.webp", category: "Wood" },
  { id: "ALW-316", name: "ROSEWOOD", image: "/materials/Wood5.webp", category: "Wood" },
  { id: "ALW-323", name: "ROYAL TEAK", image: "/materials/Wood6.webp", category: "Wood" },
  { id: "ALW-320", name: "TEAK", image: "/materials/Wood7.webp", category: "Wood" },
  { id: "ALW-319", name: "DARKTEAK", image: "/materials/Wood8.webp", category: "Wood" },
  { id: "ALW-317", name: "QUERCUS", image: "/materials/Wood9.webp", category: "Wood" },
  { id: "ALW-315", name: "WENGE", image: "/materials/Wood10.webp", category: "Wood" },
  { id: "ALW-309", name: "ROYAL WENGE ", image: "/materials/Wood11.webp", category: "Wood" },
  { id: "ALW-304", name: "MAHOGANY", image: "/materials/Wood12.webp", category: "Wood" },

  { id: "ALS-117 ", name: "Yellow", image: "/materials/Solid1.webp", category: "Solid" },
  { id: "ALS-118", name: "Signal Red", image: "/materials/Solid2.webp", category: "Solid" },
  { id: "ALS-119", name: "Sea Blue", image: "/materials/Solid3.webp", category: "Solid" },
  { id: "ALS-120", name: "Dark Blue", image: "/materials/Solid4.webp", category: "Solid" },
  { id: "ALS-122", name: "Rat Grey", image: "/materials/Solid5.webp", category: "Solid" },
  { id: "ALS-125", name: "White", image: "/materials/Solid6.webp", category: "Solid" },
  { id: "ALS-126", name: "Appricot white", image: "/materials/Solid7.webp", category: "Solid" },
  { id: "ALS-127", name: "Ivory White", image: "/materials/Solid8.webp", category: "Solid" },
  { id: "ALS-128", name: "Pure White", image: "/materials/Solid9.webp", category: "Solid" },
  { id: "ALS-130", name: "Coal Blue", image: "/materials/Solid10.webp", category: "Solid" },
  { id: "ALS-137", name: "Burgundy", image: "/materials/Solid11.webp", category: "Solid" },
  { id: "ALS-140", name: "Bone White", image: "/materials/Solid12.webp", category: "Solid" },
  { id: "ALS-142", name: "Purple Blue", image: "/materials/Solid13.webp", category: "Solid" },
  { id: "ALS-377", name: "Orange", image: "/materials/Solid14.webp", category: "Solid" },
  { id: "ALS-430", name: "Cream White", image: "/materials/Solid15.webp", category: "Solid" },

  { id: "ALM001", name: "Silver Brushed", image: "/materials/Metallic1.webp", category: "Metallic" },
  { id: "ALM002", name: "Frost Metallic", image: "/materials/Metallic2.webp", category: "Metallic" },
  { id: "ALM003", name: "Steel Blue", image: "/materials/Metallic3.webp", category: "Metallic" },
  { id: "ALM004", name: "Champagne Gold", image: "/materials/Metallic4.webp", category: "Metallic" },
  { id: "ALM005", name: "Rich Gold", image: "/materials/Metallic5.webp", category: "Metallic" },
  { id: "ALM006", name: "Metallic Slate", image: "/materials/Metallic6.webp", category: "Metallic" },
  { id: "ALM007", name: "Metallic Silver", image: "/materials/Metallic7.webp", category: "Metallic" },
  { id: "ALM008", name: "Metallic Green", image: "/materials/Metallic8.webp", category: "Metallic" },
  { id: "ALM009", name: "Metallic Azure", image: "/materials/Metallic9.webp", category: "Metallic" },
  { id: "ALM010", name: "Metallic Pink", image: "/materials/Metallic10.webp", category: "Metallic" },
  { id: "ALM011", name: "Dark Steel", image: "/materials/Metallic11.webp", category: "Metallic" },
  { id: "ALM012", name: "Soft Silver", image: "/materials/Metallic12.webp", category: "Metallic" },
  { id: "ALM013", name: "Burnished Bronze", image: "/materials/Metallic13.webp", category: "Metallic" },
  { id: "ALM014", name: "Copper Glow", image: "/materials/Metallic14.webp", category: "Metallic" },
  { id: "ALM015", name: "Titanium Grey", image: "/materials/Metallic15.webp", category: "Metallic" },

  { id: "ALG-212", name: "WHITE GRANITE ", image: "/materials/Stone1.webp", category: "Stone & Marbles" },
  { id: "ALG-214", name: "YELLOW GRANITE ", image: "/materials/Stone2.webp", category: "Stone & Marbles" },
  { id: "ALG-201", name: "ROSA PORRINHO", image: "/materials/Stone3.webp", category: "Stone & Marbles" },
  { id: "ALG-211", name: "ROSA GRANITE  ", image: "/materials/Stone4.webp", category: "Stone & Marbles" },
  { id: "ALG-208", name: "SERPEGIANTE  ", image: "/materials/Stone5.webp", category: "Stone & Marbles" },
  { id: "ALG-202", name: "GRANITE NERO ", image: "/materials/Stone6.webp", category: "Stone & Marbles" },
  { id: "ALG-215", name: "WHITE MARBLE ", image: "/materials/Stone7.webp", category: "Stone & Marbles" },
  { id: "ALG-206", name: "RAVERTINE  ", image: "/materials/Stone8.webp", category: "Stone & Marbles" },
  { id: "ALG-216", name: "YELLOW MARBLE ", image: "/materials/Stone9.webp", category: "Stone & Marbles" },
  { id: "ALG-203", name: "CAFEE MARNO  ", image: "/materials/Stone10.webp", category: "Stone & Marbles" },

  { id: "ALPAT002", name: "Verdigris Green Oxide", image: "/materials/Patina1.webp", category: "Patina" },
  { id: "ALPAT001", name: "Aged Copper Patina", image: "/materials/Patina2.webp", category: "Patina" },
  { id: "ALPAT003", name: "Antique Bronze Wash", image: "/materials/Patina3.webp", category: "Patina" },
  { id: "ALPAT004", name: "Oxidized Steel Grey", image: "/materials/Patina4.webp", category: "Patina" },
  { id: "AB|SS|005", name: "Weathered Zinc Finish", image: "/materials/Patina5.webp", category: "Patina" },
  { id: "ALPAT006", name: "Rustic Iron Patina", image: "/materials/Patina6.webp", category: "Patina" },

  { id: "ALC001", name: "Raw Concrete Grey", image: "/materials/Concrete1.webp", category: "Concrete" },
  { id: "ALC002", name: "Smooth Cement Ash", image: "/materials/Concrete2.webp", category: "Concrete" },
  { id: "ALC003", name: "Urban Cement Light", image: "/materials/Concrete3.webp", category: "Concrete" },
  { id: "ALC004", name: "Neon Pink", image: "/materials/Concrete4.webp", category: "Concrete" },

  { id: "ALT008", name: "Graphite Stone Texture", image: "/materials/Texture1.webp", category: "Texture" },
  { id: "ALT009", name: "Ash Concrete Texture", image: "/materials/Texture2.webp", category: "Texture" },
  { id: "ALT010", name: "Sand Dune Texture", image: "/materials/Texture3.webp", category: "Texture" },
  { id: "ALT011", name: "Rustic Copper Texture", image: "/materials/Texture4.webp", category: "Texture" },
  { id: "ALT012", name: "Brushed Sand Texture", image: "/materials/Texture5.webp", category: "Texture" },
  { id: "ALT013", name: "Deep Forest Texture", image: "/materials/Texture6.webp", category: "Texture" },

  { id: "ALB001", name: "Brushed Gold", image: "/materials/Brush4.webp", category: "Anodised" },
  { id: "ALB002", name: "Brushed Silver", image: "/materials/Brush2.webp", category: "Anodised" },
  { id: "ALB003", name: "Brushed Coppper", image: "/materials/Brush3.webp", category: "Anodised" },
  { id: "ALB004", name: "Brushed Steel", image: "/materials/Brush1.webp ", category: "Anodised" },
  { id: "ALB005", name: "Brushed Graphite", image: "/materials/Brush5.webp", category: "Anodised" },
  { id: "ALB006", name: "Brushed Titanium", image: "/materials/Brush7.webp", category: "Anodised" },

  { id: "ALA001", name: "Anodized Gold", image: "/materials/Anodised1.webp", category: "Anodised" },
  { id: "ALA002", name: "Anodized Silver", image: "/materials/Anodised2.webp", category: "Anodised" },
  { id: "ALA003", name: "Champagne Anodic", image: "/materials/Anodised3.webp", category: "Anodised" },
  { id: "ALA004", name: "Bronze Anodic", image: "/materials/Anodised4.webp", category: "Anodised" },
  { id: "ALA005", name: "Dark Anodic", image: "/materials/Anodised5.webp", category: "Anodised" },
  { id: "ALA006", name: "Azure Anodic", image: "/materials/Anodised6.webp", category: "Anodised" },

  { id: "ALA008", name: "Desert Sand Dune", image: "/materials/Najdi1.webp", category: "Najdi" },
  { id: "ALA009", name: "Sahara Gold Dust", image: "/materials/Najdi2.webp", category: "Najdi" },
  { id: "ALA010", name: "Warm Sandstone Beige", image: "/materials/Najdi3.webp", category: "Najdi" },
  { id: "ALA011", name: "Arabian Clay Earth", image: "/materials/Najdi4.webp", category: "Najdi" },
  { id: "ALA012", name: "Najdi Sandstone", image: "/materials/Najdi5.webp", category: "Najdi" },
  { id: "ALA013", name: "Oasis Beige", image: "/materials/Najdi6.webp", category: "Najdi" },
  { id: "ALA014", name: "Desert Pearl", image: "/materials/Najdi7.webp", category: "Najdi" },
  { id: "ALA015", name: "Heritage Sand", image: "/materials/Najdi8.webp", category: "Najdi" },
  { id: "ALA016", name: "Arido sand", image: "/materials/Najdi9.webp", category: "Najdi" },

  { id: "ALP009", name: "Prism Silver", image: "/materials/Prismatic1.webp", category: "Prismatic" },
  { id: "ALP010", name: "Aurora White", image: "/materials/Prismatic02.webp", category: "Prismatic" },
  { id: "ALP011", name: "Spectrum Gold", image: "/materials/Prismatic3.webp", category: "Prismatic" },
  { id: "ALP012", name: "Prism Gold Deep", image: "/materials/Prismatic04.webp", category: "Prismatic" },
  { id: "ALP013", name: "Chromatic Bronze", image: "/materials/Prismatic05.webp", category: "Prismatic" },
  { id: "ALP014", name: "Sunset Prism", image: "/materials/Prismatic06.webp", category: "Prismatic" },

  { id: "ALK-501 ", name: "Prism Silver", image: "/materials/Sparkle1.webp", category: "Sparkle" },
  { id: "ALK-502", name: "Aurora White", image: "/materials/Sparkle2.webp", category: "Sparkle" },
  { id: "ALK-504", name: "Spectrum Gold", image: "/materials/Sparkle3.webp", category: "Sparkle" },
  { id: "ALK-505", name: "Sunset Prism", image: "/materials/Sparkle4.webp", category: "Sparkle" },
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
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg text-xs tracking-wider uppercase font-medium whitespace-nowrap z-50 shadow-2xl pointer-events-none flex flex-col items-center gap-1"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {mat.id && <span className="text-[10px] text-gray-300 font-bold">{mat.id}</span>}
                      <span>{mat.name}</span>
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

          <a 
            href="/Alubond Color Chart A3 .pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-[#1A1A1A] text-[#1A1A1A] rounded-full overflow-hidden w-fit transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <span className="relative z-10 text-xs md:text-sm tracking-wider font-bold uppercase group-hover:text-white transition-colors duration-300">
              Explore Color Chart
            </span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">→</span>
            <div className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
          </a>
        </motion.div>

        {/* ================= CERTIFICATE BANNER ================= */}
        <motion.div
  className="mt-12 flex flex-col md:flex-row items-center gap-6 md:gap-10 pt-10"
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, delay: 0.5 }}
>
  {/* Left Side: Grey Box - Reduced padding */}
  <div className="bg-gray-200 text-[#1A1A1A] rounded-[20px] p-6 md:p-8 w-full md:flex-1 shadow-lg flex flex-col justify-center transition-all duration-300 hover:shadow-xl">
    <h3 className="text-lg md:text-xl font-medium tracking-tight mb-1">Beckry®Fluor 630</h3>
    <p className="text-md md:text-lg font-normal text-[#2A2A2A]">AAMA 2605-13 PVDF Test Certificate</p>
  </div>

  {/* Right Side: Image Placeholder - Reduced width and gap */}
  <div className="flex flex-col items-center justify-center shrink-0 md:px-4">
    <img src="/Beckers.avif" alt="Beckers Logo" className="mb-2 w-[160px] object-contain drop-shadow-sm" />
    <p className="text-[11px] font-semibold text-[#1A1A1A] tracking-wide text-center uppercase">Adding Value Beyond the Surface</p>
  </div>
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