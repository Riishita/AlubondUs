"use client";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei"; // Added useTexture
import { useEffect, useState, useRef, Suspense } from "react"; // Added Suspense
import { motion, AnimatePresence, MotionValue, useInView } from "framer-motion";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { FileText } from "lucide-react";

/* ================= 3D MODEL ================= */
function PanelModel({
  activeLayer,
  split,
}: {
  activeLayer: number;
  split: boolean;
}) {
  // Load the texture - replace with your actual file name in /public
  const texture = useTexture("/texture.png"); 

  const layers = [
    { y: 0.5, base: "#ffffff", active: "#29272777" }, // Set to white to show texture clearly
    { y: 0.25, base: "#BFC5CC", active: "#aeaca5" },
    { y: 0, base: "#E8EAED", active: "#ffffff" },
    { y: -0.25, base: "#778899", active: "#AAB4BF" },
    { y: -0.5, base: "#BFC5CC", active: "#707070" },
  ];

  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const handleResize = () => setScale(window.innerWidth < 1024 ? 0.5 : 0.8);
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
        const isTopLayer = i === 0;

        return (
          <mesh key={i} position={[0, layer.y, 0]}>
            <boxGeometry args={[2.5, 0.1, 2.5]} />
            <meshStandardMaterial
              // Apply texture only to the top layer
              map={isTopLayer ? texture : null}
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
    details: "ΕΝ 485-2 • ASTM B209 • ISO 7438 • ASTM D1781 • EN 14509",
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
export default function HeroSection({ progress }: { progress?: MotionValue<number> }) {
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplit(true), 1000);
    return () => clearTimeout(timer);
  }, []);

 const { scrollYProgress } = useSectionScroll(
  sectionRef,
  ["start start", "end end"]
);

  const activeProgress = progress || scrollYProgress;

  useEffect(() => {
  if (!activeProgress || isMobile) return;

  return activeProgress.on("change", (v) => {
    const totalSteps = steps.length;

    const newIndex = Math.min(
      Math.floor(v * totalSteps),
      totalSteps - 1
    );

    setIndex(newIndex);
  });
}, [activeProgress, isMobile]);

 return (
  <section
    id="sheet-detail"
    ref={sectionRef}
    {...cursorSectionProps}
    className={`relative h-[100vh] md:h-[500vh] ${cursorSectionClassName}`}
  >
    <div className="sticky top-0 h-screen overflow-hidden">
      <div className="h-full w-full overflow-hidden text-white gradient-amaterasu px-6 md:px-10 py-12 md:py-24 relative">

        {/* Desktop Layout Guide */}
        <div className="hidden md:grid absolute inset-0 grid-cols-[50%_30%_20%] pointer-events-none">
          <div />
          <div />
          <div />
        </div>

        {/* 🔵 3D CANVAS */}
        <motion.div
  transition={{ duration: 0.8 }}
  className="
    absolute
    inset-x-0
    bottom-0
    top-[45%]
    md:inset-0
    z-0
    pointer-events-none
    md:left-[15%]
  "
>
          <Canvas camera={{ position: [3, 3, 5], fov: 45 }} frameloop={isInView ? "always" : "demand"}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={1.2}
              />

              <group rotation={[0.3, 0.5, 0]}>
                <PanelModel
                  activeLayer={index}
                  split={split}
                />
              </group>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={!isMobile}
                autoRotate
                autoRotateSpeed={4}
                enableDamping
                dampingFactor={0.05}
              />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* LEFT TEXT */}
        {!showNext && (
          <div
            className="
              absolute
              top-10
              md:top-24
              left-6
              md:left-16
              w-[300px]
              md:w-[38vw]
              md:max-w-[520px]
              z-10
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
              >
                <p className="type-overline text-white/50 mb-3 md:mb-4">
                  Layer {steps[index].id}
                </p>

                <h2 className="type-h2 text-white mb-4 md:mb-6">
                  {steps[index].title}
                </h2>

                <p className="type-body-sm text-white/70 mb-6 md:mb-8 max-w-sm">
                  {steps[index].desc}
                </p>

                <div className="pt-4 md:pt-6 border-t border-white/10">
                  <p className="type-body-sm text-white/70 leading-relaxed max-w-sm mb-4">
                    {steps[index].details}
                  </p>
                  <a href="#" target="_blank" className="inline-flex items-center gap-2 text-white hover:text-white/80 text-sm font-medium transition-colors pointer-events-auto">
                    <FileText size={16} /> View Certificate
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* RIGHT STEP LIST */}
        {!showNext && (
          <div
            className="
              absolute
              bottom-8
              left-6
              right-6
              md:left-auto
              md:bottom-auto
              md:top-1/2
              md:-translate-y-1/2
              md:right-16
              flex
              md:flex-col
              overflow-x-auto
              md:overflow-visible
              gap-6
              z-10
              scrollbar-hide
              md:items-end
              pb-2
              md:pb-0
            "
          >
            {steps.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center gap-3 md:gap-4 cursor-pointer group shrink-0"
                onClick={() => setIndex(i)}
              >
                <div className={`md:hidden h-[2px] transition-all duration-500 ${i === index ? "w-8 bg-white" : "w-3 bg-white/20 group-hover:bg-white/40"}`} />
                <span
                  className={`type-label transition-colors duration-500 ${
                    i === index ? "text-white" : "text-white/40 group-hover:text-white/60"
                  }`}
                >
                  {item.right}
                </span>
                <div className={`hidden md:block h-[2px] transition-all duration-500 ${i === index ? "w-16 bg-white" : "w-6 bg-white/40 group-hover:w-10 group-hover:bg-white/60"}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);
}