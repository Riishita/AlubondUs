"use client";

import Globe from "react-globe.gl";
import { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
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
  const [isHovering, setIsHovering] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    fetch('/countries.json?v=2')
      .then(res => res.json())
      .then(data => {
        if (data && data.features) {
          setCountries(data);
        }
      })
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    // Threshold set to 1024px to cover mobile and tablet
    const check = () => setIsTabletOrMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { smoothProgress: localProgress } = useSectionScroll(
    sectionRef,
    ["start start", "end end"]
  );

  const scrollYProgress = externalProgress || localProgress;

  const globeScale = useTransform(scrollYProgress, [0, 0.4], [3, 1]);

  const globeY = isTabletOrMobile
    ? useTransform(scrollYProgress, [0, 0.4], ["100%", "20%"])
    : useTransform(scrollYProgress, [0, 0.4], ["40%", "-50%"]);

  const globeX = useTransform(
    scrollYProgress,
    [0, 0.4],
    isTabletOrMobile ? ["-50%", "-50%"] : ["-50%", "5%"]
  );

  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textY = isTabletOrMobile
    ? useTransform(scrollYProgress, [0, 0.15], [0, -100])
    : useTransform(scrollYProgress, [0, 0.2], [0, -850]);
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const leftOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const leftY = isTabletOrMobile
    ? useTransform(scrollYProgress, [0.2, 0.45], [10, 0])
    : useTransform(scrollYProgress, [0.2, 0.45], ["-40%", "-50%"]);
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

    globeRef.current.pointOfView(
      { lat: 25, lng: 10, altitude: 2.7 },
      1400
    );

    // 🔥 CLOSE CARD
    setSelectedPlace(null);
  };

  const handleHover = (name: string) => {
    if (selectedPlace) return;
    const place = locations.find((l) => l.name === name);
    if (!place || !globeRef.current) return;
    globeRef.current.pointOfView({ lat: place.lat, lng: place.lng, altitude: 2.5 }, 1000);
  };

  const handleClick = (name: string) => {
    const place = locations.find((l) => l.name === name);
    if (!place) return;

    // 🔥 replace instead of stacking
    setSelectedPlace(place);

    globeRef.current.pointOfView(
      { lat: place.lat, lng: place.lng, altitude: 1.8 },
      1200
    );
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      // when user scrolls past zoom focus area → close card
      if (v > 0.5 && selectedPlace) {
        setSelectedPlace(null);
        resetGlobeView();
      }
    });

    return () => unsubscribe();
  }, [selectedPlace]);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = !isTabletOrMobile;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 6;
  }, [isTabletOrMobile]);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = !selectedPlace && !isHovering && isInView;
  }, [selectedPlace, isHovering, isInView]);

  useEffect(() => {
    const unsubscribe = leftOpacity.on("change", (val) => setShowPoints(val > 0.5));
    return () => unsubscribe();
  }, [leftOpacity]);

  const networkData = useMemo(() => {
    // Generate nodes floating around the globe
    const nodes = [...Array(80).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      alt: Math.random() * 0.3 + 0.1,
      size: Math.random() * 0.8 + 0.3
    }));

    const arcs: any[] = [];
    for (let i = 0; i < nodes.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].lat - nodes[j].lat, 2) + 
          Math.pow(nodes[i].lng - nodes[j].lng, 2)
        );
        if (dist < 40 && connections < 3) {
          arcs.push({
            startLat: nodes[i].lat,
            startLng: nodes[i].lng,
            startAlt: nodes[i].alt,
            endLat: nodes[j].lat,
            endLng: nodes[j].lng,
            endAlt: nodes[j].alt,
            color: 'rgba(89,196,238,0.6)'
          });
          connections++;
        }
      }
    }
    return { nodes, arcs };
  }, []);

  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0x052b4a,
      emissive: 0x083d6a,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });
  }, []);

  const globe = useMemo(() => (
    <Globe
      ref={globeRef}
      width={isTabletOrMobile ? 320 : 650}
      height={isTabletOrMobile ? 320 : 650}
      globeMaterial={globeMaterial}
      backgroundColor="rgba(0,0,0,0)"
      rendererConfig={{ antialias: false, alpha: true, powerPreference: "high-performance", precision: "lowp" }}
      animateIn={false}
      showAtmosphere={true}
      atmosphereColor="#59c4ee"
      atmosphereAltitude={0.25}
      polygonsData={countries.features}
      polygonCapColor={() => "rgba(89, 196, 238, 0.3)"}
      polygonSideColor={() => "rgba(0, 0, 0, 0)"}
      polygonStrokeColor={() => "rgba(89, 196, 238, 1)"}
      arcsData={networkData.arcs}
      arcStartLat="startLat"
      arcStartLng="startLng"
      arcStartAlt="startAlt"
      arcEndLat="endLat"
      arcEndLng="endLng"
      arcEndAlt="endAlt"
      arcColor="color"
      arcAltitudeAutoScale={0.1}
      arcStroke={0.3}
      arcDashLength={0.5}
      arcDashGap={0.1}
      arcDashAnimateTime={3000}
      customLayerData={networkData.nodes}
      customThreeObject={(d: any) => {
        return new THREE.Mesh(
          new THREE.SphereGeometry(d.size),
          new THREE.MeshBasicMaterial({ color: 0x59c4ee })
        );
      }}
      customThreeObjectUpdate={(obj: any, d: any) => {
        if (globeRef.current) {
          Object.assign(obj.position, globeRef.current.getCoords(d.lat, d.lng, d.alt));
        }
      }}
      htmlElementsData={showPoints ? locations : []}
      htmlLat={(d: any) => d.lat}
      htmlLng={(d: any) => d.lng}
      htmlElement={(d: any) => {
        const el = document.createElement("div");
        el.className = "globe-marker pointer-events-auto";
        el.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);cursor:pointer;transition:transform 0.3s ease;">
            <div style="position:relative;width:${isTabletOrMobile ? "10px" : "12px"};height:${isTabletOrMobile ? "10px" : "12px"};">
              <div style="position:absolute;inset:0;border-radius:50%;background:#59c4ee;box-shadow:0 0 8px 2px rgba(89,196,238,0.7);transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.4)';" onmouseout="this.style.transform='scale(1)';"></div>
              <div style="position:absolute;inset:-4px;border-radius:50%;border:1px solid rgba(89,196,238,0.35);animation:pulse-ring 2s ease-out infinite;"></div>
            </div>
            <span style="color:white;text-shadow:0px 2px 8px rgba(0,0,0,0.9);font-size:${isTabletOrMobile ? "10px" : "12px"};font-weight:400;margin-top:6px;letter-spacing:0.06em;pointer-events:none;opacity:0.85;white-space:nowrap;">${d.name}</span>
          </div>`;
        el.onclick = () => handleClick(d.name);
        el.onmouseenter = () => setIsHovering(true);
        el.onmouseleave = () => setIsHovering(false);
        return el;
      }}
      ringsData={
  selectedPlace
    ? [{ ...selectedPlace, altitude: 0.1 }]
    : []
}
ringAltitude={(d: any) => d.altitude}
      ringLat={(d: any) => d.lat}
      ringLng={(d: any) => d.lng}
      ringColor={() => "#f9f9f9"}
      ringMaxRadius={5}
      ringPropagationSpeed={1.5}
      ringRepeatPeriod={1200}
    />
  ), [showPoints, selectedPlace, isTabletOrMobile, countries, globeMaterial, networkData]);

  return (
    <section ref={sectionRef} className={cn("relative h-screen w-full bg-black overflow-hidden", cursorSectionClassName)} {...cursorSectionProps}>
      <div className="relative w-full h-full">
        <div className="gradient-amaterasu min-h-screen px-6 md:px-10 py-24" />

        {!isTabletOrMobile && (
          <motion.h1 style={{ opacity: textOpacity, scale: textScale, y: textY }} className="absolute top-[12%] w-full text-center text-5xl md:text-9xl font-extralight tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Global Impact
          </motion.h1>
        )}

        <motion.div style={{ scale: isTabletOrMobile ? 1 : globeScale, y: isTabletOrMobile ? 0 : globeY, x: isTabletOrMobile ? "-50%" : globeX, willChange: "transform" }} className={cn("absolute left-1/2 -translate-x-1/2 transform-gpu", isTabletOrMobile ? "top-[10%]" : "top-1/2")}>
          <motion.div style={{ opacity: isTabletOrMobile ? 1 : glowOpacity, willChange: "opacity" }} className="absolute w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-[radial-gradient(circle,rgba(59,130,246,0.35),transparent_70%)] blur-[140px] rounded-full -z-10" />
          {globe}
        </motion.div>

        {/* Centered text and buttons for Tablet/Mobile */}
        <motion.div style={{ opacity: isTabletOrMobile ? 1 : leftOpacity, y: isTabletOrMobile ? 0 : leftY }} className={cn("absolute text-white transition-all duration-500", isTabletOrMobile ? "top-[50%] left-0 w-full px-6 text-center" : "left-[8%] top-1/2 -translate-y-1/2 max-w-xl")}>
          <h2 className="text-2xl md:text-5xl font-light leading-tight mb-6 md:mb-10 text-white">
            Our Global Presence <br />
            <span className="text-white font-medium">Powers Local Delivery</span>
          </h2>

          <div className="mb-10">
            <div className={cn("flex items-center gap-3 mb-5", isTabletOrMobile ? "justify-center" : "justify-start")}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#59c4ee] shadow-[0_0_8px_#59c4ee]"></div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium">Manufacturing</p>
            </div>
            <div className={cn("flex flex-wrap gap-3", isTabletOrMobile ? "justify-center" : "justify-start")}>
              {["UAE", "India", "Europe"].map((item) => (
                <button
                  key={item}
                  onMouseEnter={() => { setIsHovering(true); handleHover(item); }}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => handleClick(item)}
                  className={cn(
                    "text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 rounded-full border backdrop-blur-md transition-all duration-500 ease-out", 
                    selectedPlace?.name === item 
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className={cn("flex items-center gap-3 mb-5", isTabletOrMobile ? "justify-center" : "justify-start")}>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium">Offices</p>
            </div>
            <div className={cn("flex flex-wrap gap-3", isTabletOrMobile ? "justify-center" : "justify-start")}>
              {["USA", "Canada", "Egypt", "Turkey", "Vietnam"].map((item) => (
                <button
                  key={item}
                  onMouseEnter={() => { setIsHovering(true); handleHover(item); }}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => handleClick(item)}
                  className={cn(
                    "text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 rounded-full border backdrop-blur-md transition-all duration-500 ease-out", 
                    selectedPlace?.name === item 
                      ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95, x: isTabletOrMobile ? "-50%" : "0%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: isTabletOrMobile ? "-50%" : "0%" }}
              exit={{ opacity: 0, y: 20, scale: 0.95, x: isTabletOrMobile ? "-50%" : "0%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute z-50 p-6 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 text-white shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden",
                isTabletOrMobile
                  ? "bottom-6 left-1/2 w-[90%] max-w-[340px]"
                  : "bottom-[8%] left-[8%] w-[340px]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedPlace(null); resetGlobeView(); }} 
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10 z-20 cursor-pointer"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="relative z-10">
                <h3 className="text-2xl font-light mb-2 pr-6 text-white">{selectedPlace.name}</h3>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-6 min-h-[50px]">{selectedPlace.description}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="group relative w-full overflow-hidden rounded-full border border-white bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:text-black">
                    <span className="relative z-10">Contact</span>
                    <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out -z-0" />
                  </button>
                  <button className="group w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30">
                    Website
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}