"use client";

import Globe from "react-globe.gl";
import { useRef, useEffect, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";

export default function GlobeHero() {
  const globeRef = useRef<any>();
  const sectionRef = useRef(null);
  const { cursorSectionProps, cursorSectionClassName } =
    useCustomCursorBindings();

  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* 🌍 GLOBE ANIMATION */
  const globeScale = useTransform(scrollYProgress, [0, 1], [2.2, 1]);

  const globeY = isMobile
    ? useTransform(scrollYProgress, [0, 1], ["120%", "10%"])
    : useTransform(scrollYProgress, [0, 1], ["70%", "-10%"]);

  const globeX = useTransform(
  scrollYProgress,
  [0, 1],
  isMobile ? ["-50%", "-50%"] : ["-50%", "5%"]
);

  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const textY = isMobile
    ? useTransform(scrollYProgress, [0, 0.2], [0, -100])
    : useTransform(scrollYProgress, [0, 0.3], [0, -850]);

  const textScale = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const leftOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.05, 0.2], [80, 0]);

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  /* 📍 LOCATIONS */
  const locations = [
    { name: "India", lat: 20.5937, lng: 78.9629, logo: "alubond-logo.png", description: "Alubond India Plot No. 26, Sector 6 IMT Manesar, Gurugram Haryana 122052, India" },
    { name: "Europe", lat: 50.1109, lng: 8.6821, logo: "alubond-logo.png", description: "Alubond Europe Industrial Zone Europe" },
    { name: "UAE", lat: 23.4241, lng: 53.8478, logo: "alubond-logo.png", description: "Alubond UAE Dubai Investment Park" },
    { name: "USA", lat: 37.0902, lng: -95.7129, logo: "alubond-logo.png", description: "Alubond USA New York" },
    { name: "Canada", lat: 56.1304, lng: -106.3468, logo: "alubond-logo.png", description: "Alubond Canada Toronto" },
    { name: "Turkey", lat: 38.9637, lng: 35.2433, logo: "alubond-logo.png", description: "Alubond Turkey Istanbul" },
    { name: "Vietnam", lat: 14.0583, lng: 108.2772, logo: "alubond-logo.png", description: "Alubond Vietnam Ho Chi Minh City" },
    { name: "Egypt", lat: 26.8206, lng: 30.8025, logo: "alubond-logo.png", description: "Alubond Egypt Cairo" },
  ];

  const handleClick = (name: string) => {
    const place = locations.find((l) => l.name === name);
    if (!place) return;

    setSelectedPlace(place);

    globeRef.current.pointOfView(
      {
        lat: place.lat,
        lng: place.lng,
        altitude: 1.8,
      },
      1200
    );
  };

  /* ⚙️ CONTROLS */
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = !selectedPlace;
  }, [selectedPlace]);

  useEffect(() => {
    const unsubscribe = leftOpacity.on("change", (val) => {
      setShowPoints(val > 0.5);
    });
    return () => unsubscribe();
  }, [leftOpacity]);

  useEffect(() => {
  const unsubscribe = scrollYProgress.on("change", (v) => {
    // when user scrolls away from focused state
    if (v < 0.15 && selectedPlace) {
      setSelectedPlace(null);
    }
  });

  return () => unsubscribe();
}, [scrollYProgress, selectedPlace]);

  /* 🌍 GLOBE */
  /* 🌍 GLOBE */
const globe = useMemo(
  () => (
    <Globe
      ref={globeRef}
      width={isMobile ? 260 : 650}   // reduced for mobile
      height={isMobile ? 260 : 650}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor="rgba(0,0,0,0)"
      htmlElementsData={showPoints ? locations : []}
      htmlLat={(d: any) => d.lat}
      htmlLng={(d: any) => d.lng}
      htmlElement={(d: any) => {
        const el = document.createElement("div");

        el.innerHTML = `
          <div style="
            display:flex;
            flex-direction:column;
            align-items:center;
            transform: translate(-50%, -100%);
            cursor:pointer;
            font-size:${isMobile ? "10px" : "14px"};
          ">
            <img src="/${d.logo}" style="width:${isMobile ? "20px" : "30px"};height:${isMobile ? "20px" : "30px"};" />
            ${d.name}
          </div>
        `;

        el.onclick = () => handleClick(d.name);
        return el;
      }}
      pointLat={(d: any) => d.lat}
      pointLng={(d: any) => d.lng}
      pointColor={() => "#c2d6f7"}
      pointAltitude={0.02}
      pointRadius={0.5}
      ringsData={selectedPlace ? [selectedPlace] : []}
      ringLat={(d: any) => d.lat}
      ringLng={(d: any) => d.lng}
      ringColor={() => ["#77a8f5", "#ffce9b"]}
      ringMaxRadius={5}
      ringPropagationSpeed={2}
      ringRepeatPeriod={1000}
    />
  ),
  [showPoints, selectedPlace, isMobile]
);

  return (
    <section
      ref={sectionRef}
      className={cn("relative h-[180vh] bg-black", cursorSectionClassName)}
      {...cursorSectionProps}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        <div className="gradient-amaterasu min-h-screen px-6 md:px-10 py-24" />

        {/* HEADING */}
        <motion.h1
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="absolute top-[12%] w-full text-center text-white font-light tracking-[-2px] text-[clamp(40px,10vw,180px)]"
        >
          Global Impact
        </motion.h1>

        {/* GLOBE */}
        <motion.div
          style={{ scale: globeScale, y: globeY, x: globeX }}
          className={cn(
            "absolute left-1/2 -translate-x-1/2",
            isMobile ? "top-[10%]" : "bottom-0"
          )}
        >
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute w-[600px] md:w-[800px] h-[600px] md:h-[800px]
            bg-[radial-gradient(circle,rgba(59,130,246,0.25),transparent_70%)]
            blur-[120px] rounded-full -z-10"
          />
          {globe}
        </motion.div>

        {/* CONTENT */}
        <motion.div
          style={{ opacity: leftOpacity, y: leftY }}
          className={cn(
            "absolute text-white max-w-xl",
            isMobile
  ? "top-[45%] left-1/7 -translate-x-1/5 text-center px-4 w-full"
              : "left-[6%] top-[32%] -translate-y-1/7"
          )}
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">
            Our Global Presence <br />
            <span>Powers Local Delivery</span>
          </h2>

          <div className="mb-8">
            <p className="text-xs mb-2">● MANUFACTURING</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {["UAE", "India", "Europe"].map((item) => (
                <button key={item} onClick={() => handleClick(item)}
                  className="px-4 py-2 rounded-full border border-white hover:bg-white/20">
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs mb-2">● OFFICES</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {["USA", "Canada", "Egypt", "Turkey", "Vietnam"].map((item) => (
                <button key={item} onClick={() => handleClick(item)}
                  className="px-4 py-2 rounded-full border border-white hover:bg-white/20">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD */}
        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className={cn(
  "absolute w-[90%] p-5 md:p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/20 text-white",
  isMobile
    ? "bottom-4 left-1/4 -translate-x-1/5 w-[65%] max-w-sm"
    : "bottom-[5%] md:left-[6%] md:w-[30%]"
)}
            >
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                ✕
              </button>

              <h2 className="text-2xl font-semibold mb-2">
                {selectedPlace.name}
              </h2>

              <p className="text-white/60 mb-6 text-sm">
                {selectedPlace.description}
              </p>

              <button className="px-6 py-2 rounded-full border border-orange-400 text-orange-400">
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}