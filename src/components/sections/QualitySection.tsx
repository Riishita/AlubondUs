"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const steps = [
  {
    id: "01",
    title: "HIGH-PERFORMANCE SURFACE FINISH",
    desc: "PVDF and FEVE fluoropolymer coatings applied over chromate pre-treatment and epoxy resin primer. Delivers exceptional UV resistance, colour retention, and weatherability for 20+ years.",
    details: "AAMA 2605 • GSB MASTER • QUALICOAT CLASS 3 • ASTM D2244 • ISO 2813",
    right: "Specialisted Coating",
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
    right: "Fire Raared Core",
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

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function QualitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const STEP_START = 0.1;
  const STEP_END = 0.9;
  const totalSteps = steps.length;

  // ================= MASK REVEAL =================
  const reveal = useTransform(
    scrollYProgress,
    [0, 0.20],
    ["inset(50% 50% 90% 50%)", "inset(0% 0% 0% 0%)"]
  );

  // ================= VIDEO =================
  const durationRef = useRef(0);
  const currentTime = useRef(0);
  const targetTime = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      durationRef.current = video.duration || 0;
    };

    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      if (reduceMotion) return;
      const d = durationRef.current;
      if (!d) return;

      const normalized = clamp(
        (p - STEP_START) / (STEP_END - STEP_START),
        0,
        1
      );

      targetTime.current = normalized * d;
    });
  }, [scrollYProgress, reduceMotion]);

  useEffect(() => {
    let raf: number;

    const update = () => {
      raf = requestAnimationFrame(update);

      const video = videoRef.current;
      if (!video || reduceMotion) return;

      const diff = targetTime.current - currentTime.current;
      currentTime.current += diff * 0.045;

      if (Math.abs(video.currentTime - currentTime.current) > 0.02) {
        try {
          video.currentTime = currentTime.current;
        } catch {
          video.play().catch(() => {});
        }
      }
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  // ================= ACTIVE STEP =================
  const activeIndex = useTransform(scrollYProgress, (v) => {
    const normalized = clamp(
      (v - STEP_START) / (STEP_END - STEP_START),
      0,
      0.999
    );
    return Math.floor(normalized * totalSteps);
  });

  // ================= CONTENT MOVE =================
  const contentY = useTransform(
    scrollYProgress,
    [0.15, 0.85, 1],
    [0, -1100, -1150]
  );

  const holdOpacity = useTransform(
    scrollYProgress,
    [0.85, 1],
    [1, 0.96]
  );

  return (
    <section ref={ref} className="relative h-[650vh] w-full">
      
      {/* 🎥 STICKY LAYER WITH MASK */}
      <motion.div
        style={{
          clipPath: reveal,
          WebkitClipPath: reveal,
        }}
        className="sticky top-0 h-screen overflow-hidden"
      >

        {/* VIDEO */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/drgg4st9a/video/upload/v1775855900/VN20260411_024656_gcr3a1.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        {/* 🔥 CONTENT */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 px-6 md:px-16 pt-10 text-white"
        >

          {/* HEADING */}
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-orange-300 mb-3">
              QUALITY ARCHITECTURE
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Engineered in 5 precision layers
            </h2>
          </div>

          {/* STEPS */}
          <div className="max-w-6xl mx-auto space-y-32">

            {steps.map((step, i) => {
              const opacity = useTransform(activeIndex, (v) =>
                v === i ? 1 : v > i ? 0.4 : 0.2
              );

              const scale = useTransform(activeIndex, (v) =>
                v === i ? 1 : 0.95
              );

              return (
                <motion.div
                  key={step.id}
                  style={{ opacity, scale }}
                  className={`flex ${
                    i % 2 === 0
                      ? "md:justify-start"
                      : "md:justify-end"
                  }`}
                >
                  <div className="w-full md:w-[45%] bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl">
                    <p className="text-orange-300 text-xs mb-2">{step.id}</p>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}