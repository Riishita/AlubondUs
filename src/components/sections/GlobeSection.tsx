"use client";

import Globe from "react-globe.gl";
import { useRef, useEffect, useMemo, useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import { useCustomCursorBindings } from "@/components/CustomCursor/CustomCursorProvider";
import { cn } from "@/lib/utils";

interface GlobeHeroProps {
  externalProgress?: any;
}

export default function GlobeHero({ externalProgress }: GlobeHeroProps) {
  const globeRef = useRef<any>();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const { cursorSectionProps, cursorSectionClassName } = useCustomCursorBindings();

  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [showPoints, setShowPoints] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { smoothProgress: localProgress } = useSectionScroll(
    sectionRef,
    ["start start", "end end"]
  );

  const scrollYProgress = externalProgress || localProgress;

  const globeScale = useTransform(scrollYProgress, [0, 0.4], [2.2, 1]);
  const globeY = isMobile
    ? useTransform(scrollYProgress, [0, 0.4], ["120%", "10%"])
    : useTransform(scrollYProgress, [0, 0.4], ["70%", "-10%"]);
  const globeX = useTransform(
    scrollYProgress,
    [0, 0.4],
    isMobile ? ["-50%", "-50%"] : ["-50%", "5%"]
  );

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textY = isMobile
    ? useTransform(scrollYProgress, [0, 0.15], [0, -100])
    : useTransform(scrollYProgress, [0, 0.2], [0, -850]);
  const textScale = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const leftOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.2, 0.45], [80, 0]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

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

  const resetGlobeView = () => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView({ lat: 25, lng: 10, altitude: 2.7 }, 1400);
  };

  /** * HOVER: Rotate to front, NO zoom (altitude stays high)
   */
  const handleHover = (name: string) => {
    // If a place is already selected, don't interrupt the view with a hover
    if (selectedPlace) return; 
    
    const place = locations.find((l) => l.name === name);
    if (!place || !globeRef.current) return;
    
    globeRef.current.pointOfView({ 
      lat: place.lat, 
      lng: place.lng, 
      altitude: 2.5 // High altitude = zoomed out
    }, 1000);
  };

  /** * CLICK: Rotate to front AND zoom in (altitude goes low)
   */
  const handleClick = (name: string) => {
    const place = locations.find((l) => l.name === name);
    if (!place) return;
    setSelectedPlace(place);
    
    globeRef.current.pointOfView({ 
      lat: place.lat, 
      lng: place.lng, 
      altitude: 1.8 // Low altitude = zoomed in
    }, 1200);
  };

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = !isMobile;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 12;
  }, [isMobile]);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = !selectedPlace && isInView;
  }, [selectedPlace, isInView]);

  useEffect(() => {
    const unsubscribe = leftOpacity.on("change", (val) => setShowPoints(val > 0.5));
    return () => unsubscribe();
  }, [leftOpacity]);

  const globe = useMemo(() => (
    <Globe
      ref={globeRef}
      width={isMobile ? 260 : 650}
      height={isMobile ? 260 : 650}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor="rgba(0,0,0,0)"
      rendererConfig={{ antialias: false, alpha: true, powerPreference: "high-performance", precision: "lowp" }}
      animateIn={false}
      htmlElementsData={showPoints ? locations : []}
      htmlLat={(d: any) => d.lat}
      htmlLng={(d: any) => d.lng}
      htmlElement={(d: any) => {
        const el = document.createElement("div");
        el.className = "globe-marker pointer-events-auto";
        el.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);cursor:pointer;">
            <img src="/${d.logo}" style="width:${isMobile ? "20px" : "30px"};height:${isMobile ? "20px" : "30px"};" />
            <span style="color:white;text-shadow:0px 0px 4px black;font-size:${isMobile ? "10px" : "14px"};pointer-events:none;">${d.name}</span>
          </div>`;
        el.onclick = () => handleClick(d.name);
        el.onmouseenter = () => handleHover(d.name);
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
  ), [showPoints, selectedPlace, isMobile]);

  return (
    <section ref={sectionRef} className={cn("relative h-[180vh] bg-black", cursorSectionClassName)} {...cursorSectionProps}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="gradient-amaterasu min-h-screen px-6 md:px-10 py-24" />
        <motion.h1 style={{ opacity: textOpacity, scale: textScale, y: textY }} className="absolute top-[12%] w-full text-center text-white font-light tracking-[-2px] text-[clamp(40px,10vw,180px)]">
          Global Impact
        </motion.h1>
        <motion.div style={{ scale: globeScale, y: globeY, x: globeX, willChange: "transform" }} className={cn("absolute left-1/2 -translate-x-1/2 transform-gpu", isMobile ? "top-[10%]" : "bottom-0")}>
          <motion.div style={{ opacity: glowOpacity, willChange: "opacity" }} className="absolute w-[700px] md:w-[900px] h-[700px] md:h-[900px] bg-[radial-gradient(circle,rgba(59,130,246,0.35),transparent_70%)] blur-[140px] rounded-full -z-10" />
          {globe}
        </motion.div>
        <motion.div style={{ opacity: leftOpacity, y: leftY }} className={cn("absolute text-white transition-all duration-500", isMobile ? "top-[40%] left-0 w-full px-6 text-center" : "left-[6%] top-[32%] -translate-y-1/7 max-w-xl")}>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Our Global Presence <br /><span>Powers Local Delivery</span></h2>
          
          <div className="mb-8">
            <p className="text-[10px] md:text-xs mb-2 opacity-60">● MANUFACTURING</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {["UAE", "India", "Europe"].map((item) => (
                <button 
                  key={item} 
                  onMouseEnter={() => handleHover(item)} 
                  onClick={() => handleClick(item)} 
                  className={cn("px-4 py-2 rounded-full border transition-all duration-300 text-sm md:text-base", selectedPlace?.name === item ? "bg-white text-black scale-105" : "border-white/40 hover:bg-white/20 hover:scale-105")}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] md:text-xs mb-2 opacity-60">● OFFICES</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {["USA", "Canada", "Egypt", "Turkey", "Vietnam"].map((item) => (
                <button 
                  key={item} 
                  onMouseEnter={() => handleHover(item)} 
                  onClick={() => handleClick(item)} 
                  className={cn("px-4 py-2 rounded-full border transition-all duration-300 text-sm md:text-base", selectedPlace?.name === item ? "bg-white text-black scale-105" : "border-white/40 hover:bg-white/20 hover:scale-105")}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedPlace && (
            <motion.div initial={{ opacity: 0, y: 40, scale: 0.96, x: isMobile ? "-50%" : "0%" }} animate={{ opacity: 1, y: 0, scale: 1, x: isMobile ? "-50%" : "0%" }} exit={{ opacity: 0, y: 20, x: isMobile ? "-50%" : "0%" }} className={cn("absolute z-50 p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-2xl", isMobile ? "bottom-6 left-1/2 w-[92%] max-w-[420px]" : "bottom-[5%] left-[6%] w-[380px]")}>
              <button onClick={() => { setSelectedPlace(null); resetGlobeView(); }} className="absolute top-6 right-4 text-white/40 hover:text-white p-2">✕</button>
              <h2 className="text-2xl font-semibold mb-2 pr-6">{selectedPlace.name}</h2>
              <p className="text-white/70 mb-6 text-sm leading-relaxed">{selectedPlace.description}</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2.5 rounded-full border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black transition font-medium text-sm">Contact</button>
                <button className="px-4 py-2.5 rounded-full border border-white/30 hover:bg-white/10 transition text-sm">Website</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}