"use client";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= 3D MODEL ================= */
function PanelModel({
  activeLayer,
  split,
}: {
  activeLayer: number;
  split: boolean;
}) {
  const layers = [
    { y: 0.5, base: "#2E5BFF", active: "#081f6e" },
    { y: 0.25, base: "#BFC5CC", active: "#aeaca5" },
    { y: 0, base: "#E8EAED", active: "#cb650b" },
    { y: -0.25, base: "#778899", active: "#AAB4BF" },
    { y: -0.5, base: "#BFC5CC", active: "#707070" },
  ];

  // Dynamic scaling for mobile responsiveness within the Canvas
  const [scale, setScale] = useState(0.8);
  useEffect(() => {
    const handleResize = () => setScale(window.innerWidth < 768 ? 0.5 : 0.8);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!split) {
    return (
      <mesh scale={scale}>
        <boxGeometry args={[2.5, 1.2, 2.5]} />
        <meshStandardMaterial color="#E8EAED" metalness={0.5} roughness={0.3} />
      </mesh>
    );
  }

  return (
    <group scale={scale}>
      {layers.map((layer, i) => {
        const isActive = i === activeLayer;
        return (
          <mesh key={i} position={[0, layer.y, 0]}>
            <boxGeometry args={[2.5, 0.1, 2.5]} />
            <meshStandardMaterial
              color={isActive ? layer.active : layer.base}
              transparent
              opacity={isActive ? 1 : 0.6}
              emissive={isActive ? layer.active : "#000"}
              emissiveIntensity={isActive ? 0.5 : 0}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ================= DATA ================= */
const steps = [
  {
    id: "01",
    title: "HIGH-PERFORMANCE SURFACE FINISH",
    desc: "PVDF and FEVE fluoropolymer coatings applied over chromate pre-treatment and epoxy resin primer. Delivers exceptional UV resistance, colour retention, and weatherability for 20+ years.",
    details: "AAMA 2605 • GSB MASTER • QUALICOAT CLASS 3 • ASTM D2244 • ISO 2813",
    right: "Specialised Coating",
  },
  {
    id: "02",
    title: "PRECISION-GRADE ALUMINIUM ALLOY",
    desc: "0.50mm aluminium alloy 3003-H24/5005-H34 top skin provides the structural face of the panel. Hot-bonded to the core using a proprietary lamination process that ensures zero delamination under thermal cycling and wind-load stress.",
    details: "EN 485-2 • ASTM B209 • EN 573-3 • ISO 6361 • AAMA 2604",
    right: "Top Metal Skin",
  },
  {
    id: "03",
    title: "FIRE-RETARDANT MINERAL CORE",
    desc: "Engineered mineral-filled core achieving FR-A2 classification -the highest non-combustible rating for metal composite panels. Comprises over 90% inorganic mineral content with zero halogen compounds, ensuring minimal smoke generation and no flaming droplets under fire conditions.",
    details: "EN 13501-1 • NFPA 285 • ASTM E84 • BS 8414 • DIN 4102-B1 • UL 1040",
    right: "Fire Rated Core",
  },
  {
    id: "04",
    title: "STRUCTURAL BACKING LAYER",
    desc: "0.50mm aluminium alloy rear skin provides dimensional stability, rigidity, and resistance to panel warping under thermal expansion. Acts as a structural diaphragm that distributes wind-load forces evenly across the composite cross-section.",
    details: "EN 485-2 • ASTM B209 • ISO 7438 • ASTM D1781 • EN 14509",
    right: "Bottom Metal Skin",
  },
  {
    id: "05",
    title: "CORROSION-RESISTANT FOUNDATION",
    desc: "Multi-stage chromate conversion coating followed by epoxy resin primer and protective service coat. This tri-layer treatment provides the corrosion barrier essential for coastal, industrial, and high-humidity environments - protecting the panel substrate from inside out.",
    details: "AAMA 2605 • ISO 2409 • ASTM D3359 • ASTM B117 • ISO 9227",
    right: "Base Treatment",
  },
];

/* ================= COMPONENT ================= */
export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplit(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isScrolling = false;
    const isInView = () => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();
      return (
        rect.top <= window.innerHeight * 0.2 &&
        rect.bottom >= window.innerHeight * 0.8
      );
    };

    const handleScroll = (e: WheelEvent) => {
      if (!isInView()) return;
      if (isScrolling) return;
      isScrolling = true;

      setIndex((prev) => {
        if (e.deltaY > 0) {
          if (prev < steps.length - 1) {
            e.preventDefault();
            return prev + 1;
          }
          return prev;
        } else {
          if (prev > 0) {
            e.preventDefault();
            return prev - 1;
          }
          return prev;
        }
      });

      setTimeout(() => (isScrolling = false), 600);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      {...cursorSectionProps}
      className={`w-full h-screen relative overflow-hidden text-white gradient-amaterasu px-6 md:px-10 py-12 md:py-24 ${cursorSectionClassName}`}
    >
      {/* 🔵 3D CANVAS - Pushed down slightly on mobile to make room for text */}
      <motion.div
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 pointer-events-none mt-20 md:mt-0"
      >
        <Canvas camera={{ position: [3, 3, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <group rotation={[0.3, 0.5, 0]}>
            <PanelModel activeLayer={index} split={split} />
          </group>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </motion.div>

      {/* LEFT TEXT - Top on mobile, Left on Desktop */}
      {!showNext && (
        <div className="absolute top-10 md:top-24 left-6 md:left-16 right-6 md:max-w-md z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-orange-400 mb-1 text-sm md:text-base">
                {steps[index].id}
              </p>
              <h2 className="text-2xl md:text-4xl font-bold mb-3">
                {steps[index].title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {steps[index].desc}
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs mt-4 tracking-wider">
                {steps[index].details}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* RIGHT STEP LIST - Bottom on mobile, Right on Desktop */}
      {!showNext && (
        <div className="absolute bottom-10 left-6 right-6 md:right-16 md:left-auto flex md:flex-col flex-wrap md:space-y-4 gap-3 md:gap-0 justify-center md:justify-end text-right z-10">
          {steps.map((item, i) => (
            <p
              key={item.id}
              className={`cursor-pointer text-xs md:text-base transition-colors duration-300 whitespace-nowrap ${
                i === index ? "text-orange-500 font-bold" : "text-white/60"
              }`}
              onClick={() => setIndex(i)}
            >
              <span className="hidden md:inline">{item.id}. </span>
              {item.right}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}