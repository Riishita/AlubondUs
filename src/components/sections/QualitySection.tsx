"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function QualitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const { cursorSectionProps, cursorSectionClassName } =
  useCustomCursorBindings(false); // 👈 white cursor here

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const STEP_START = 0.1;
  const STEP_END = 0.9;

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

  // Content moves up (negative Y) as you scroll; video layer above stays untransformed.
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.82, 1],
    [0, -120, -1180, -1820]
  );
  const rm = Boolean(reduceMotion);

  return (
    <section
  ref={ref}
  {...cursorSectionProps}
  className={`relative z-10 h-[650vh] w-full ${cursorSectionClassName}`}
>
      <div className="sticky top-0 z-10 h-screen min-h-[100dvh] overflow-hidden [transform:translateZ(0)]">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/drgg4st9a/video/upload/v1775857399/VN20260411_031224_msqvzy.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <motion.div
          style={{ y: rm ? 0 : contentY }}
          className="relative z-10 h-full w-full px-6 text-white will-change-transform md:px-16"
        >
          {/* LEFT TEXT 1 */}
          <div className="absolute left-[6%] top-[15%] max-w-md">
            <h2 className="mb-4 text-3xl font-light md:text-5xl">
              What happens when design meets limitless possibility?
            </h2>
          </div>

          {/* RIGHT TEXT */}
          <div className="absolute right-[6%] top-[70%] max-w-md text-right">
            <h2 className="mb-4 text-3xl font-light md:text-5xl">We build beyond borders</h2>
            <p className="text-sm text-white/70">
              Multi-layer architecture ensures fire resistance, weather protection, and unmatched reliability in
              extreme environments.
            </p>
          </div>

          {/* CARDS */}
          <div className="absolute left-0 top-[130%] w-full px-6 md:px-16">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="bg-[#E9E5DE] p-6 text-[#203f65] md:p-8">
                <div className="mb-6 text-xl">✦</div>
                <h2 className="mb-3 text-lg font-medium md:text-2xl">100+ Countries</h2>
                <p className="text-sm">
                  Delivering trusted façade solutions across diverse global markets with consistent quality and
                  performance.
                </p>
              </div>

              <div className="bg-[#E9E5DE] p-6 text-[#203f65] md:p-8">
                <div className="mb-6 text-xl">✦</div>
                <h2 className="mb-3 text-lg font-medium md:text-2xl">50,000+ Projects Worldwide</h2>
                <p className="text-sm">
                  From iconic skylines to modern infrastructure, our panels power projects at every scale.
                </p>
              </div>

              <div className="bg-[#E9E5DE] p-6 text-[#203f65] md:p-8">
                <div className="mb-6 text-xl">✦</div>
                <h2 className="mb-3 text-lg font-medium md:text-2xl">35+ Industry Leadership</h2>
                <p className="text-sm">
                  Decades of innovation, engineering excellence, and leadership in advanced building materials.
                </p>
              </div>
            </div>
          </div>

          {/* LEFT TEXT 2 */}
          <div className="absolute left-[6%] top-[200%] max-w-md">
            <h2 className="mb-4 text-3xl font-light md:text-5xl">Global reliability</h2>
            <p className="text-sm text-white/70">
              Trusted across continents, delivering consistent quality in every architectural application.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}