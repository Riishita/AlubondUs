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
    useCustomCursorBindings(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const STEP_START = 0.1;
  const STEP_END = 0.9;

  // ================= VIDEO LOGIC (Unchanged) =================
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
  const video = videoRef.current;
  if (!video || reduceMotion) return;

  let rafId: number;

  const update = () => {
    const d = durationRef.current;
    if (!d) {
      rafId = requestAnimationFrame(update);
      return;
    }

    const diff = targetTime.current - currentTime.current;

    // ✨ smoother interpolation (less aggressive)
    currentTime.current += diff * 0.08;

    // ✅ update only when needed (BIG FIX)
    if (Math.abs(video.currentTime - currentTime.current) > 0.04) {
      video.currentTime = currentTime.current;
    }

    rafId = requestAnimationFrame(update);
  };

  rafId = requestAnimationFrame(update);
  return () => cancelAnimationFrame(rafId);
}, [reduceMotion]);

  // Content moves up; adjusted range for better mobile/desktop parity
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.1, 0.82, 1],
    ["0%", "-10%", "-150%", "-220%"] // Switched to % for better cross-device scaling
  );
  
  const rm = Boolean(reduceMotion);

  return (
    <section
      ref={ref}
      {...cursorSectionProps}
      className={`relative z-10 h-[600vh] md:h-[650vh] w-full ${cursorSectionClassName}`}
    >
      <div className="sticky top-0 z-10 h-screen w-full overflow-hidden [transform:translateZ(0)]">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden">
  <motion.video
    ref={videoRef}
    src="https://res.cloudinary.com/drgg4st9a/video/upload/v1775857399/VN20260411_031224_msqvzy.mp4"
    muted
    playsInline
    preload="auto"
    className="
      absolute top-1/2 left-1/2 
      min-w-full min-h-full 
      w-auto h-auto 
      -translate-x-1/2 -translate-y-1/2
      object-cover
      will-change-transform
    "
  />
  
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black/30" />
</div>

        {/* SCROLLING CONTENT LAYER */}
        <motion.div
          style={{ y: rm ? 0 : contentY }}
          className="relative z-10 h-full w-full will-change-transform"
        >
          {/* LEFT TEXT 1 */}
          <div className="absolute left-[8%] top-[20vh] max-w-[85%] sm:max-w-md md:left-[6%]">
            <h2 className="text-3xl font-light leading-tight sm:text-4xl md:text-5xl">
              What happens when design meets limitless possibility?
            </h2>
          </div>

          {/* RIGHT TEXT */}
          <div className="absolute right-[8%] top-[75vh] max-w-[85%] text-right sm:max-w-md md:right-[6%] md:top-[70vh]">
            <h2 className="mb-4 text-3xl font-light sm:text-4xl md:text-5xl">
              We build beyond borders
            </h2>
            <p className="text-sm text-white/70 md:text-base">
              Multi-layer architecture ensures fire resistance, weather protection, and unmatched reliability in
              extreme environments.
            </p>
          </div>

          {/* CARDS - Responsive Grid */}
          <div className="absolute left-0 top-[130vh] w-full px-6 md:px-16">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
              <div className="bg-[#E9E5DE] p-6 text-[#203f65] transition-transform md:p-8">
    
                <h2 className="mb-2 text-lg font-medium md:mb-3 md:text-2xl">100+ Countries</h2>
                <p className="text-xs leading-relaxed md:text-sm">
                  Delivering trusted façade solutions across diverse global markets with consistent quality and
                  performance.
                </p>
              </div>

              <div className="bg-[#E9E5DE] p-6 text-[#203f65] md:p-8">
                
                <h2 className="mb-2 text-lg font-medium md:mb-3 md:text-2xl">50,000+ Projects Worldwide</h2>
                <p className="text-xs leading-relaxed md:text-sm">
                  From iconic skylines to modern infrastructure, our panels power projects at every scale.
                </p>
              </div>

              <div className="bg-[#E9E5DE] p-6 text-[#203f65] md:p-8">
                
                <h2 className="mb-2 text-lg font-medium md:mb-3 md:text-2xl">35+ Industry Leadership</h2>
                <p className="text-xs leading-relaxed md:text-sm">
                  Decades of innovation, engineering excellence, and leadership in advanced building materials.
                </p>
              </div>
            </div>
          </div>

          {/* LEFT TEXT 2 */}
          <div className="absolute left-[8%] top-[200vh] max-w-[85%] sm:max-w-md md:left-[6%]">
            <h2 className="mb-4 text-3xl font-light sm:text-4xl md:text-5xl">Global reliability</h2>
            <p className="text-sm text-white/70 md:text-base">
              Trusted across continents, delivering consistent quality in every architectural application.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}