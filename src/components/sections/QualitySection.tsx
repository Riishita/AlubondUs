"use client";

import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { useEffect, useRef } from "react";
import {
  motion,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useSectionScroll } from "@/hooks/useSectionScroll";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function QualitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref);

  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings(false);

  const { smoothProgress } = useSectionScroll(
    ref,
    ["start start", "end end"]
  );

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
  return smoothProgress.on("change", (p) => {
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
}, [smoothProgress, reduceMotion]);

useEffect(() => {
  const video = videoRef.current;
  if (!video || reduceMotion || !isInView) return;

  let rafId: number;
  let isSeeking = false; // Track if the video is currently seeking

  const onSeeked = () => {
    isSeeking = false;
  };

  video.addEventListener("seeked", onSeeked);

  const update = () => {
    const d = durationRef.current;
    if (!d) {
      rafId = requestAnimationFrame(update);
      return;
    }

    const diff = targetTime.current - currentTime.current;
    
    // 1. Smoothly interpolate the logical time
    currentTime.current += diff * 0.07; // Slightly slower for more "weight"

    // 2. Only update the video if:
    //    - The difference is significant (> 0.05s)
    //    - The video is NOT currently busy seeking
    if (!isSeeking && Math.abs(video.currentTime - currentTime.current) > 0.05) {
      isSeeking = true;
      video.currentTime = currentTime.current;
    }

    rafId = requestAnimationFrame(update);
  };

  rafId = requestAnimationFrame(update);
  
  return () => {
    cancelAnimationFrame(rafId);
    video.removeEventListener("seeked", onSeeked);
  };
}, [reduceMotion, isInView]);

  // Content moves up; adjusted range for better mobile/desktop parity
  const contentY = useTransform(
    smoothProgress,
    [0, 0.1, 0.82, 1],
    ["0%", "-10%", "-150%", "-220%"] // Switched to % for better cross-device scaling
  );

  // Individual Parallax Offsets for "Framer Feel"
  const p1 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const p2 = useTransform(smoothProgress, [0, 1], [0, -300]);
  const p3 = useTransform(smoothProgress, [0, 1], [0, -200]);
  
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
            src="https://res.cloudinary.com/dnpdmq15v/video/upload/v1778065525/VN20260424_193642_oykfnh.mp4"
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
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* SCROLLING CONTENT LAYER */}
        <motion.div
          style={{ y: rm ? 0 : contentY }}
          className="relative z-10 h-full w-full will-change-transform"
        >
          {/* LEFT TEXT 1 */}
          <motion.div 
            style={{ y: rm ? 0 : p1 }} 
            className="absolute left-[8%] top-[20vh] max-w-[85%] sm:max-w-md md:left-[6%]"
          >
            <h2 className="type-h2 text-white drop-shadow-lg">
              What happens when design meets limitless possibility?
            </h2>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div 
            style={{ y: rm ? 0 : p2 }}
            className="absolute right-[8%] top-[75vh] max-w-[85%] text-right sm:max-w-md md:right-[6%] md:top-[70vh]"
          >
            <h2 className="type-h2 mb-4 text-white drop-shadow-lg">
              We build beyond borders
            </h2>
            <p className="type-body-sm text-white/90 drop-shadow-md">
              Multi-layer architecture ensures fire resistance, weather protection, and unmatched reliability in
              extreme environments.
            </p>
          </motion.div>

          {/* CARDS - Responsive Grid */}
          <div className="absolute left-0 top-[110vh] w-full px-6 md:px-16">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-white transition-transform md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <div className="mb-2">
                  <span className="type-stat bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#59c4ee] block mb-1">
                    100+
                  </span>
                  <span className="type-overline text-[#59c4ee] block">
                    Countries Reached
                  </span>
                </div>
                <p className="type-body-sm text-white/80">
                  Delivering trusted façade solutions across diverse global markets with consistent quality and
                  performance.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-white md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <div className="mb-2">
                  <span className="type-stat bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#59c4ee] block mb-1">
                    50,000+
                  </span>
                  <span className="type-overline text-[#59c4ee] block">
                    Projects Worldwide
                  </span>
                </div>
                <p className="type-body-sm text-white/80">
                  From iconic skylines to modern infrastructure, our panels power projects at every scale.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-white md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
              >
                <div className="mb-2">
                  <span className="type-stat bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#59c4ee] block mb-1">
                    35+
                  </span>
                  <span className="type-overline text-[#59c4ee] block">
                    Years of Leadership
                  </span>
                </div>
                <p className="type-body-sm text-white/80">
                  Decades of innovation, engineering excellence, and leadership in advanced building materials.
                </p>
              </motion.div>
            </div>
          </div>

          {/* LEFT TEXT 2 */}
          <motion.div 
            style={{ y: rm ? 0 : p1 }}
            className="absolute left-[8%] top-[210vh] max-w-[85%] sm:max-w-md md:left-[6%]"
          >
            <h2 className="type-h2 mb-4 text-white drop-shadow-lg">Uncompromised Durability</h2>
            <p className="type-body-sm text-white/90 drop-shadow-md">
              From impact to exposure, it holds its integrity—proving durability where it matters most.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}