"use client";

/**
 * Unified cinematic scene: one scroll range, one `scrollYProgress`.
 * - Video scrubs via RAF-smoothed currentTime (refs; no per-frame setState).
 * - Midground (steps) vs foreground (social overlay) use different transform curves
 *   from the SAME progress → parallax depth, reads as one continuous beat.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Star } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "HIGH-PERFORMANCE SURFACE FINISH",
    desc: "PVDF and FEVE fluoropolymer coatings applied over chromate pre-treatment and epoxy resin primer.",
  },
  {
    id: "02",
    title: "PRECISION-GRADE ALUMINIUM ALLOY",
    desc: "0.50mm aluminium alloy provides structural strength.",
  },
  {
    id: "03",
    title: "FIRE-RETARDANT MINERAL CORE",
    desc: "Engineered mineral-filled core achieving FR-A2 classification.",
  },
  {
    id: "04",
    title: "STRUCTURAL BACKING LAYER",
    desc: "Rear skin provides dimensional stability.",
  },
  {
    id: "05",
    title: "CORROSION-RESISTANT FOUNDATION",
    desc: "Multi-stage coating provides corrosion resistance.",
  },
];

const testimonials = [
  {
    name: "Ahmad Al-Rashid",
    role: "Principal Architect, Dubai",
    text: "CompoPanel's fire-rated panels gave us the safety and aesthetics we needed for our 40-story tower project.",
  },
  {
    name: "Elena Müller",
    role: "Construction Director, Berlin",
    text: "Exceptional product consistency and on-time delivery. We've used them across 12 projects without a single issue.",
  },
  {
    name: "James Chen",
    role: "Facade Engineer, Singapore",
    text: "The PVDF coated panels have held up perfectly in tropical conditions for over 8 years. Outstanding durability.",
  },
];

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export default function QualityWithSocialProofSection() {
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

  /* ─── Parallax: same progress, different amplitudes (px + scale = GPU-friendly) ─── */
  // Background video: slowest drift (deep layer)
  const videoShellY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const videoShellScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.1]);

  // Steps column: mid speed — visually “anchored” to the scrub narrative
  const stepsShellY = useTransform(scrollYProgress, [0, 0.45, 1], [0, -20, -48]);
  const stepsShellOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.88, 1],
    [1, 1, 1, 0.92]
  );

  // Social overlay: faster / wider travel — foreground float over the same timeline
  const overlayY = useTransform(scrollYProgress, [0, 0.35, 0.72, 1], [64, 4, -40, -88]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.84, 1],
    [0.22, 0.55, 1, 1, 0.94]
  );
  const overlayScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1, 1.03]);
  const headlineDrift = useTransform(scrollYProgress, [0, 1], [20, -36]);

  const enablePlaybackFallback = useCallback(() => {
    if (playbackFallbackRef.current) return;
    playbackFallbackRef.current = true;
    setPlaybackFallback(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      const d = video.duration;
      if (Number.isFinite(d) && d > 0) {
        durationRef.current = d;
        videoReadyRef.current = true;
        requestAnimationFrame(() => {
          const v = videoRef.current;
          if (!v || playbackFallbackRef.current) return;
          const maxT = Math.max(0, d - 0.04);
          const p = clamp(scrollYProgress.get(), 0, 1);
          const t = clamp(p * d, 0, maxT);
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
    video.defaultPlaybackRate = 1;
    video.pause();
    video.addEventListener("loadedmetadata", onReady);

    return () => video.removeEventListener("loadedmetadata", onReady);
  }, [scrollYProgress, enablePlaybackFallback]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduceMotion) return;
    if (playbackFallbackRef.current) return;
    if (!videoReadyRef.current) return;
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
      const alpha = 0.13;
      const nextSmooth =
        currentTimeRef.current + (target - currentTimeRef.current) * alpha;
      currentTimeRef.current =
        Math.abs(target - currentTimeRef.current) < 0.01 ? target : nextSmooth;

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
    <section ref={containerRef} className="relative h-[min(360vh,380svh)] w-full">
      <div className="sticky top-0 h-[100svh] min-h-[100dvh] w-full overflow-hidden contain-layout">
        {/* Deep layer: video + parallax shell (transform-only, promotes layer) */}
        <motion.div
          className="absolute inset-0 z-0 will-change-transform [transform:translateZ(0)]"
          style={{
            y: rm ? 0 : videoShellY,
            scale: rm ? 1.06 : videoShellScale,
          }}
        >
          <video
            ref={videoRef}
            src="/Marble.mp4"
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            autoPlay={false}
            loop={playbackFallback}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/52 to-black/68" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(0,0,0,0.52),transparent_55%)]" />

        {/* Midground: composition steps — slower parallax than overlay */}
        <motion.div
          className="relative z-10 flex h-full w-full items-center justify-between gap-4 px-4 will-change-transform [transform:translateZ(0)] md:gap-10 md:px-10 lg:px-16"
          style={{
            y: rm ? 0 : stepsShellY,
            opacity: rm ? 1 : stepsShellOpacity,
          }}
        >
          <div className="max-w-[min(100%,28rem)] space-y-3 md:space-y-5 lg:max-w-xl">
            {steps.map((step, i) => (
              <StepRow
                key={step.id}
                step={step}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
                reduceMotion={rm}
              />
            ))}
          </div>

          <div className="hidden space-y-4 text-right md:block">
            {steps.map((item, i) => (
              <StepIndex
                key={item.id}
                label={item.id}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>

        {/* Foreground: social proof — strongest parallax; same scroll driver */}
        {/* <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center will-change-transform [transform:translateZ(0)] md:items-center md:justify-end md:pr-5 lg:pr-12"
          style={{
            y: rm ? 0 : overlayY,
            opacity: rm ? 1 : overlayOpacity,
            scale: rm ? 1 : overlayScale,
          }}
        >
          <motion.div
            className="pointer-events-auto w-full max-w-7xl px-4 pb-6 sm:px-6 md:px-8 md:pb-0"
            style={{ y: rm ? 0 : headlineDrift }}
          >
            <div className="mb-5 text-center md:mb-7 md:text-left">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-accent">Testimonials</p>
              <h2 className="heading-lg text-white drop-shadow-md md:max-w-xl">
                Trusted by <span className="text-gradient">Industry Leaders</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {testimonials.map((t, i) => (
                <TrustCard key={t.name} testimonial={t} index={i} reduced={rm} />
              ))}
            </div>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
}

type Step = (typeof steps)[number];

function StepRow({
  step,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: {
  step: Step;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;

  const scrollOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.08), start, mid, end, Math.min(1, end + 0.08)],
    [0.22, 0.45, 1, 0.45, 0.22]
  );

  const scrollY = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), mid, Math.min(1, end + 0.05)],
    [10, 0, -6]
  );

  return (
    <motion.div
      style={{
        opacity: reduceMotion ? 1 : scrollOpacity,
        y: reduceMotion ? 0 : scrollY,
      }}
      className="transform-gpu will-change-[transform,opacity]"
    >
      <p className="mb-1 text-xs text-orange-400 md:text-sm">{step.id}</p>
      <h3 className="mb-1 text-base text-white md:mb-2 md:text-lg lg:text-2xl">{step.title}</h3>
      <p className="text-[11px] text-white/60 md:text-sm">{step.desc}</p>
    </motion.div>
  );
}

function StepIndex({
  label,
  index,
  total,
  scrollYProgress,
}: {
  label: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const o = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.06), mid, Math.min(1, end + 0.06)],
    [0.35, 1, 0.35]
  );
  const s = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.06), mid, Math.min(1, end + 0.06)],
    [1, 1.2, 1]
  );

  return (
    <motion.div style={{ opacity: o, scale: s }} className="text-sm text-white">
      {label}
    </motion.div>
  );
}

/** No whileInView here — sticky viewport would re-trigger and flicker; scroll opacity from parent is enough. */
// function TrustCard({
//   testimonial: t,
//   index,
//   reduced,
// }: {
//   testimonial: (typeof testimonials)[number];
//   index: number;
//   reduced: boolean;
// }) {
//   return (
//     <motion.div
//       whileHover={
//         reduced
//           ? undefined
//           : { y: -5, scale: 1.02, rotateZ: index % 2 === 0 ? -0.45 : 0.45 }
//       }
//       transition={{ type: "spring", stiffness: 380, damping: 28 }}
//       className="relative rounded-2xl border border-white/20 bg-card/85 p-5 shadow-[0_22px_70px_-28px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-6 md:p-7"
//     >
//       <motion.span
//         aria-hidden
//         className="pointer-events-none absolute -right-3 -top-3 block h-14 w-14 rounded-full bg-accent/12 blur-2xl sm:h-16 sm:w-16"
//         animate={reduced ? undefined : { y: [0, -6, 0], opacity: [0.48, 0.88, 0.48] }}
//         transition={{ duration: 5.2 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="mb-3 flex gap-1">
//         {[...Array(5)].map((_, j) => (
//           <Star key={j} className="h-4 w-4 shrink-0 fill-accent text-accent" />
//         ))}
//       </div>
//       <p className="mb-4 text-sm leading-relaxed text-foreground/85 md:text-base">
//         &quot;{t.text}&quot;
//       </p>
//       <div>
//         <p className="font-heading font-semibold text-foreground">{t.name}</p>
//         <p className="text-xs text-muted-foreground md:text-sm">{t.role}</p>
//       </div>
//     </motion.div>
//   );
// }
