import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { ArrowRight } from "lucide-react";

const panels = [
  { video: "https://pixabay.com/videos/download/video-365294_source.mp4", title: "Yas Island | Hotel on Yas Marina Circuit ", location: "W Abu Dhabi" },
  { video: "https://pixabay.com/videos/download/video-365293_source.mp4", title: "The Address Downtown", location: "Dubai, UAE" },
  { video: "https://pixabay.com/videos/download/video-365295_source.mp4", title: "Burj Khalifa", location: "Dubai, UAE" },
  { video: "https://pixabay.com/videos/download/video-365296_source.mp4", title: "Khalifa Stadium", location: "Doha, Qatar" },
];

const DRAG_THRESHOLD = 50; // px needed to trigger a slide change

export default function PremiumGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag / swipe state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, panels.length);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const handleVideoEnded = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex((prev) => (prev + 1) % panels.length);
    }
  };

  // ─── Drag / Swipe handlers ────────────────────────────────────────────────
  const getClientX = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e ? e.touches[0].clientX : e.clientX;

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = getClientX(e);
    setDragOffset(0);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = getClientX(e) - dragStartX.current;
    setDragOffset(delta);
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragOffset < -DRAG_THRESHOLD && activeIndex < panels.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (dragOffset > DRAG_THRESHOLD && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  return (
    <section
      ref={containerRef}
      className={`bg-black relative min-h-screen w-full flex flex-col lg:grid lg:grid-cols-12 items-center px-6 lg:px-16 gap-6 lg:gap-8 overflow-hidden text-white ${cursorSectionClassName}`}
      {...cursorSectionProps}
    >
      {/* Aesthetic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-black to-neutral-900/50" />
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-neutral-800/40 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
      </div>

      {/* Left Text Column */}
      <div className="lg:col-span-4 flex flex-col justify-center pt-24 lg:pt-0 z-20 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <p className="type-overline text-white/50">
            004 / Project
          </p>

          <div className="flex justify-between flex-wrap gap-6 mt-5">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] mb-2 lg:mb-6">
              TRUSTED BY <br />
              <span className="text-white font-medium">ARCHITECTS.</span>
            </h2>
          </div>

          <p className="text-sm md:text-base text-white/50 font-light leading-relaxed max-w-xs hidden lg:block">
            Iconic skylines. Landmark projects. Alubond panels trusted by the world's leading architectural firms.
          </p>

          <div className="w-16 h-[1px] bg-white/20 mt-4 lg:mt-8 hidden lg:block" />

          {/* Dot indicators */}
          <div className="hidden lg:flex items-center gap-2 mt-6">
            {panels.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex mt-10">
            <Link to="/project">
              <button
                id="gallery-view-all-btn"
                className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/25 text-white text-sm uppercase tracking-widest font-medium backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 ease-out"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Gallery Column */}
      <div className="lg:col-span-8 w-full flex-1 flex items-center justify-center lg:justify-end pb-28 lg:pb-0 z-20 min-h-0">
        <div
          ref={sliderRef}
          className="relative overflow-hidden rounded-2xl border border-white/10 w-[85vw] h-[50vh] lg:w-[40vw] lg:h-[70vh] cursor-grab active:cursor-grabbing select-none"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          <motion.div
            animate={{ x: `calc(-${activeIndex * 100}% + ${dragOffset}px)` }}
            transition={isDragging.current ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }}
            className="flex h-full w-full transform-gpu will-change-transform"
          >
            {panels.map((panel, i) => (
              <div key={i} className="relative h-full flex-shrink-0 w-full">
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={panel.video}
                  muted
                  playsInline
                  onEnded={() => handleVideoEnded(i)}
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 lg:p-8 pointer-events-none">
                  <p className="type-overline text-white/80">{panel.location}</p>
                  <h3 className="type-h3">{panel.title}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile CTA + dots */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-4 z-30 lg:hidden">
        <div className="flex items-center gap-2">
          {panels.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <Link to="/project">
          <button
            id="gallery-view-all-mobile-btn"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/25 text-white text-sm uppercase tracking-widest font-medium backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </section>
  );
}