"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/* ================= DATA CONFIG ================= */

const heroData = {
  image: "/images/Hero-palatte.jpeg",

  label: "003 / Color & Finishes",
  title: ["A Palette", "Without Limits"],

  // 🔥 CONTROL HERE
  overlay: {
    opacityFrom: 0.5, // bottom (0–1)
    opacityVia: 0.4,  // middle
    opacityTo: 0.0,   // top
  },

  text: {
    color: "#ffffff",
    opacity: 1,
  },
};

const categories = [
  "Wood",
  "Metallic",
  "Stone & Marbles",
  "Patina",
  "Concrete",
  "Texture",
  "Brush",
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

  { name: "AB-SS-003", image: "/materials/Brush1.webp", category: "Brush" },
{ name: "AB-SS-004", image: "/materials/Brush2.webp", category: "Brush" },
{ name: "AB-SS-005", image: "/materials/Brush3.webp", category: "Brush" },
{ name: "AB-SS-006", image: "/materials/Brush4.webp", category: "Brush" },
{ name: "AB-SS-007", image: "/materials/Brush5.webp", category: "Brush" },
{ name: "AB-SS-008", image: "/materials/Brush6.webp", category: "Brush" },
{ name: "AB-SS-009", image: "/materials/Brush7.webp", category: "Brush" },

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
  { name: "AB-SS-004 ", image: "/materials/Prismatic2.webp", category: "Prismatic" },
  { name: "AB-SS-005 ", image: "/materials/Prismatic3.webp", category: "Prismatic" },
  { name: "AB-SS-006", image: "/materials/Prismatic4.webp", category: "Prismatic" },
  { name: "AB-SS-007", image: "/materials/Prismatic5.webp", category: "Prismatic" },
  { name: "AB-SS-008 ", image: "/materials/Prismatic6.webp", category: "Prismatic" },


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
const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="relative h-[100vh]">
      
      {/* Background */}
      <motion.div className="absolute inset-0 transform-gpu" style={{ y: imageY, scale: imageScale }}>
        <img
          src={heroData.image}
          alt="Color and finishes"
          className="w-full h-[110%] object-cover"
          loading="lazy"
        />

        {/* 🔥 DYNAMIC OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              rgba(0,0,0,${heroData.overlay.opacityFrom}),
              rgba(0,0,0,${heroData.overlay.opacityVia}),
              rgba(0,0,0,${heroData.overlay.opacityTo})
            )`,
          }}
        />
      </motion.div>

      

      {/* Text */}
      <motion.div
        className="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 pb-20"
        style={{ y: textY }}
      >
        <motion.p
  className="text-xs tracking-[0.3em] text-white/50 uppercase mb-16"
  style={{
    color: heroData.text.color,
    opacity: 0.9,
    textShadow: "0 2px 10px rgba(106, 106, 106, 0.6)",
  }}
>
  {heroData.label}
</motion.p>


        <motion.h1
  className="text-6xl md:text-8xl font-serif leading-[0.95] tracking-tight"
  style={{
    color: heroData.text.color,
    textShadow: "0 4px 20px rgba(0,0,0,0.8)", // 🔥 makes text pop
  }}
>
          {heroData.title[0]}
          <br />
          {heroData.title[1]}
        </motion.h1>
      </motion.div>
    </section>
  );
};

/* ================= MARQUEE ================= */


const MarqueeStrip = () => {
  return (
    <div className="py-6 bg-[#134d7a] text-white overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // 🔥 speed control (lower = faster)
        }}
      >
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-[0.15em] uppercase opacity-60"
          >
            {word} <span className="mx-4 opacity-30">●</span>
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
  const reduceMotion = useReducedMotion();

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered = materials.filter((m) => m.category === active);

  return (
    <section ref={ref} className="py-24 px-8 md:px-16 bg-white">

      {/* ================= FILTERS ================= */}
      <motion.div
        className="flex flex-wrap gap-3 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {categories.map((cat, i) => (
  <motion.button
    key={cat}
    onClick={() => setActive(cat)}
    className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300
      ${
        active === cat
          ? "border-blue-500 text-orange-500 bg-white shadow-sm"
          : "border-gray-300 text-gray-700 bg-white hover:border-gray-500"
      }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: i * 0.05 }}
  >
    {cat}
  </motion.button>
))}
      </motion.div>

      {/* ================= DESCRIPTION ================= */}
      <motion.p
        className="text-gray-500 text-base md:text-lg mb-12 max-w-xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        Texture series — tactile surface interest for feature walls and cladding.
      </motion.p>

      {/* ================= SWATCHES ================= */}
      <div className="mb-20 flex flex-wrap gap-4 md:gap-5 [perspective:1000px]">
        <AnimatePresence mode="popLayout">
          {filtered.map((mat, i) => (
            <motion.div
              key={mat.name + i}
              layout
              className="group relative transform-gpu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* 🔥 3D CARD */}
<div
  className="relative [perspective:1000px]"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -20;
    const rotateY = ((x - rect.width / 2) / rect.width) * 20;

    const card = e.currentTarget.firstElementChild as HTMLElement;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.12)
    `;
  }}
  onMouseLeave={(e) => {
    const card = e.currentTarget.firstElementChild as HTMLElement;

    card.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }}
>
  <div
    className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl shadow-xl transition-transform duration-200 ease-out"
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* IMAGE (depth) */}
    <img
      src={mat.image}
      alt={mat.name}
      className="w-full h-full object-cover rounded-xl"
      loading="lazy"
      style={{ transform: "translateZ(40px)" }}
    />

    {/* LIGHT REFLECTION */}
    <div
      className="absolute inset-0 rounded-xl pointer-events-none"
      style={{
        background:
          "linear-gradient(120deg, rgba(255,255,255,0.35), transparent 40%)",
        transform: "translateZ(50px)",
        mixBlendMode: "overlay",
      }}
    />

    {/* DEPTH SHADOW */}
    <div
      className="absolute inset-0 rounded-xl"
      style={{
        transform: "translateZ(-20px)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
      }}
    />
  </div>
</div>
              

              {/* Tooltip */}
              <AnimatePresence>
  {hovered === i && (
    <motion.div
      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap z-20"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      {mat.name}
    </motion.div>
  )}
</AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ================= BOTTOM ================= */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        <p className="text-gray-500 text-sm md:text-base max-w-md mb-6 md:mb-0">
          Over 200 colours, wood grains, stone finishes, and metallic effects available.
        </p>

          <button className="group mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E5E5] text-[#1A1A1A] overflow-hidden relative transition-all duration-300">
            
            <span className="relative z-10 group-hover:text-white transition">
              Explore Color Studio
            </span>

            <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
              →
            </span>

            {/* hover bg */}
            <span className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
          </button>
      </motion.div>
    </section>
  );
};

/* ================= FINAL ================= */

export default function SixthSection() {
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(true);

  return (
    <div className={cn("relative", cursorSectionClassName)} {...cursorSectionProps}>
      {/* HERO (sticks) */}
      <HeroSection />

      {/* SCROLL CONTENT (slides over) */}
      <div className="relative z-20 bg-white">
        <MarqueeStrip />
        <MaterialsSection />
      </div>

    </div>
  );
}