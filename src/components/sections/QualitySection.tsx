"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const steps = [
  {
    id: "01",
    title: "HIGH-PERFORMANCE SURFACE FINISH",
desc: "PVDF and FEVE fluoropolymer coatings applied over chromate pre-treatment and epoxy resin primer. Delivers exceptional UV resistance, colour retention, and weatherability for 20+ years.",
    side: "right" as const,
    top: "7%",
  },
  {
    id: "02",
    title: "PRECISION-GRADE ALUMINIUM ALLOY",
desc: "0.50mm aluminium alloy 3003-H24/5005-H34 top skin provides the structural face of the panel. Hot-bonded to the core using a proprietary lamination process that ensures zero delamination under thermal cycling and wind-load stress.",
    side: "left" as const,
    top: "25%",
  },
  {
    id: "03",
    title: "FIRE-RETARDANT MINERAL CORE",
desc: "Engineered mineral-filled core achieving FR-A2 classification -the highest non-combustible rating for metal composite panels. Comprises over 90% inorganic mineral content with zero halogen compounds, ensuring minimal smoke generation and no flaming droplets under fire conditions.",
    side: "right" as const,
    top: "43%",
  },
  {
    id: "04",
    title: "STRUCTURAL BACKING LAYER",
desc: "0.50mm aluminium alloy rear skin provides dimensional stability, rigidity, and resistance to panel warping under thermal expansion. Acts as a structural diaphragm that distributes wind-load forces evenly across the composite cross-section.",
    side: "left" as const,
    top: "61%",
  },
  {
    id: "05",
    title: "CORROSION-RESISTANT FOUNDATION",
desc: "Multi-stage chromate conversion coating followed by epoxy resin primer and protective service coat. This tri-layer treatment provides the corrosion barrier essential for coastal, industrial, and high-humidity environments - protecting the panel substrate from inside out.",
    side: "right" as const,
    top: "79%",
  },
];

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function smoothStep(x: number) {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

export default function QualitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const durationRef = useRef(0);
  const videoReadyRef = useRef(false);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const playbackFallbackRef = useRef(false);
  const [playbackFallback, setPlaybackFallback] = useState(false);
  const seekErrorCountRef = useRef(0);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: entryProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const shellY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const shellScale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);
  const entryScale = useTransform(entryProgress, [0, 1], [0.95, 1]);
  const entryOpacity = useTransform(entryProgress, [0, 1], [0, 1]);
  const combinedScale = useTransform(
    [entryScale, shellScale],
    ([enter, depth]) => Number(enter) * Number(depth)
  );
  const revealHalfSize = useTransform(entryProgress, [0, 1], [0.7, 80]);
  const revealClipPath = useTransform(
    revealHalfSize,
    (s) =>
      `inset(calc(50% - ${Math.max(0, s)}vmax) calc(50% - ${Math.max(
        0,
        s
      )}vmax) calc(50% - ${Math.max(0, s)}vmax) calc(50% - ${Math.max(0, s)}vmax))`
  );
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.09]);
  const stepsY = useTransform(scrollYProgress, [0, 0.4, 1], [0, -16, -42]);
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const enablePlaybackFallback = useCallback(() => {
    if (playbackFallbackRef.current) return;
    playbackFallbackRef.current = true;
    setPlaybackFallback(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        durationRef.current = duration;
        videoReadyRef.current = true;
        requestAnimationFrame(() => {
          const v = videoRef.current;
          if (!v || playbackFallbackRef.current) return;
          const maxT = Math.max(0, duration - 0.04);
          const p = clamp(scrollYProgress.get(), 0, 1);
          const t = clamp(p * duration, 0, maxT);
          currentTimeRef.current = t;
          targetTimeRef.current = t;
          try {
            v.currentTime = t;
          } catch {
            enablePlaybackFallback();
          }
        });
      }
    };

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.pause();
    video.addEventListener("loadedmetadata", onReady);
    return () => video.removeEventListener("loadedmetadata", onReady);
  }, [scrollYProgress, enablePlaybackFallback]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduceMotion || playbackFallbackRef.current || !videoReadyRef.current) return;
    const duration = durationRef.current;
    if (!(duration > 0)) return;
    const p = clamp(progress, 0, 1);
    const maxT = Math.max(0, duration - 0.04);
    targetTimeRef.current = clamp(p * duration, 0, maxT);
  });

  useEffect(() => {
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const video = videoRef.current;
      if (!video) return;

      if (reduceMotion) {
        try {
          video.pause();
        } catch {
          /* ignore */
        }
        return;
      }

      if (playbackFallbackRef.current) {
        video.muted = true;
        if (video.paused) video.play().catch(() => {});
        return;
      }

      if (!videoReadyRef.current) return;
      const duration = durationRef.current;
      if (!(duration > 0)) return;

      const maxT = Math.max(0, duration - 0.04);
      const target = clamp(targetTimeRef.current, 0, maxT);
      const alpha = 0.14;
      currentTimeRef.current =
        Math.abs(target - currentTimeRef.current) < 0.01
          ? target
          : currentTimeRef.current + (target - currentTimeRef.current) * alpha;

      const next = clamp(currentTimeRef.current, 0, maxT);
      if (Math.abs(video.currentTime - next) > 0.009) {
        try {
          video.currentTime = next;
          seekErrorCountRef.current = 0;
        } catch {
          seekErrorCountRef.current += 1;
          if (seekErrorCountRef.current >= 2) enablePlaybackFallback();
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, enablePlaybackFallback]);

  const rm = Boolean(reduceMotion);

  return (
    <section ref={containerRef} className="relative z-10 h-[420vh] w-full">
      <motion.div
        className="sticky top-0 h-[100svh] min-h-[100dvh] w-full overflow-hidden will-change-[transform,opacity,clip-path]"
        style={{
          y: rm ? 0 : shellY,
          scale: rm ? 1 : combinedScale,
          opacity: rm ? 1 : entryOpacity,
          clipPath: rm ? "inset(0% 0% 0% 0% round 0px)" : revealClipPath,
        }}
      >
        <motion.div
          className="absolute inset-0 z-0 will-change-transform [transform:translateZ(0)]"
          style={{ y: rm ? 0 : videoY, scale: rm ? 1 : videoScale }}
        >
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/drgg4st9a/video/upload/v1775807684/Wood_Sheets_Transform_Water_and_Fire_qo0dlt.mp4"
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            autoPlay={false}
            loop={playbackFallback}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/48 via-black/58 to-black/72" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_68%_at_50%_42%,rgba(255,255,255,0.08),transparent_62%)]" />

        <motion.div className="relative z-10 h-full w-full px-5 py-8 md:px-12 lg:px-20" style={{ y: rm ? 0 : stepsY }}>
          <motion.div className="mb-7 text-center md:mb-11" style={{ y: rm ? 0 : headerY }}>
            <p className="mb-3 text-xs uppercase tracking-[0.26em] text-orange-300/90 md:text-sm">Quality Architecture</p>
            <h2 className="mx-auto max-w-3xl font-heading text-3xl text-black md:text-5xl">
              Engineered in 5 precision layers
            </h2>
          </motion.div>

          <div className="relative mx-auto h-[76vh] max-w-6xl">
            <div className="pointer-events-none absolute left-1/2 top-[8%] h-[78%] w-px -translate-x-1/2 bg-gradient-to-b from-white/15 via-white/40 to-white/15" />
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                total={steps.length}
                scrollYProgress={scrollYProgress}
                reduceMotion={rm}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

type Step = (typeof steps)[number];

function StepCard({
  step,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: {
  step: Step;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const segment = 1 / total;
  const center = (index + 0.5) * segment;

  const localProgress = useTransform(scrollYProgress, (v) => {
    const start = center - segment * 0.95;
    const end = center + segment * 0.5;
    return smoothStep((v - start) / (end - start));
  });

  const opacity = useTransform(scrollYProgress, (v) => {
    const currentIndex = Math.floor(clamp(v * total, 0, total - 0.001));
    const distance = Math.abs(index - currentIndex);
    if (index < currentIndex) return 0.42;
    if (distance === 0) return 1;
    if (distance === 1) return 0.62;
    return 0.24;
  });

  const scale = useTransform(scrollYProgress, (v) => {
    const currentIndex = Math.floor(clamp(v * total, 0, total - 0.001));
    if (index === currentIndex) return 1;
    if (index < currentIndex) return 0.96;
    return 0.94;
  });

  const blur = useTransform(scrollYProgress, (v) => {
    const currentIndex = Math.floor(clamp(v * total, 0, total - 0.001));
    const d = Math.abs(index - currentIndex);
    if (d === 0) return 0;
    if (d === 1) return 1.2;
    return 2.1;
  });
  const blurFilter = useTransform(blur, (b) => `blur(${reduceMotion ? 0 : b}px)`);
  const y = useTransform(localProgress, [0, 1], [26, 0]);
  const x = useTransform(localProgress, [0, 1], [step.side === "right" ? 12 : -12, 0]);

  const alignClass =
    step.side === "right"
      ? "left-1/2 -translate-x-1/2 md:left-[52%] md:translate-x-0"
      : "left-1/2 -translate-x-1/2 md:left-auto md:right-[52%] md:translate-x-0";

  return (
    <motion.article
      className={`absolute ${alignClass} w-[88%] max-w-[520px] rounded-2xl border border-white/20 bg-white/10 p-5 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.75)] backdrop-blur-lg md:w-[44%] md:p-6`}
      style={{
        top: step.top,
        opacity: reduceMotion ? 1 : opacity,
        scale: reduceMotion ? 1 : scale,
        y: reduceMotion ? 0 : y,
        x: reduceMotion ? 0 : x,
        filter: blurFilter,
      }}
      transition={{ duration: 0.75, ease: EASE_PREMIUM }}
    >
      <p className="mb-2 text-xs tracking-[0.25em] text-orange-300/90 md:text-sm">{step.id}</p>
      <h3 className="mb-2 font-heading text-base text-white md:text-xl">{step.title}</h3>
      <p className="text-xs leading-relaxed text-white/80 md:text-sm">{step.desc}</p>
    </motion.article>
  );
}
