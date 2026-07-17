import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";

/* ─── Application Data ─────────────────────────── */
const applications = [
  {
    id: "01",
    img: "/images/BUILDINGFACADES.png",
    title: "Building Facades",
    subtitle: "Architectural Envelope Systems",
    desc: "Alubond panels are the material of choice for modern curtain walls, rainscreen cladding, and complete architectural envelope systems. Their lightweight construction combined with exceptional rigidity and weather resistance makes them ideal for high-rise facades, commercial buildings, and prestige architectural projects worldwide. Available in a full palette of finishes, they allow architects to realise ambitious design visions without structural compromise.",
    features: ["Curtain Wall Systems", "Rainscreen Cladding", "Ventilated Façades", "High-Rise Structures"],
  },
  {
    id: "02",
    img: "/images/trailer.jpeg",
    title: "Automobile Industry",
    subtitle: "Lightweight Transport Solutions",
    desc: "In the transport sector, Alubond delivers substantial weight savings without sacrificing strength or durability. Vehicle manufacturers and trailer builders rely on our panels for body cladding, refrigerated units, and specialty vehicle construction. The corrosion-resistant surface eliminates costly repainting cycles and extends the service life of commercial vehicles operating in demanding environments.",
    features: ["Truck & Trailer Bodies", "Refrigerated Vehicles", "Specialty Vehicles", "Bus Cladding"],
  },
  {
    id: "03",
    img: "/images/coporate identity.png",
    title: "Corporate Identity",
    subtitle: "Signage & Branded Installations",
    desc: "Corporate signage and branded environments demand materials that are visually impactful, dimensionally stable, and long-lasting. Alubond panels offer an exceptional substrate for external signage, retail fascias, wayfinding systems, and large-format brand installations. Precision fabrication ensures sharp graphics and immaculate finishes that reinforce brand integrity at every touchpoint.",
    features: ["Exterior Signage", "Retail Fascias", "Wayfinding Systems", "Exhibition Stands"],
  },
  {
    id: "04",
    img: "/images/machine covers.jpg",
    title: "Machine Covers",
    subtitle: "Industrial Enclosures & Housings",
    desc: "Industrial environments require enclosures that withstand heat, vibration, chemical exposure, and mechanical impact. Alubond composite panels provide robust, lightweight housings for machinery, control cabinets, and technical equipment. Their ease of fabrication and clean surface finish meet both functional and aesthetic requirements in manufacturing, energy, and process industries.",
    features: ["Machinery Enclosures", "Control Cabinets", "Technical Housings", "Clean-Room Panels"],
  },
  {
    id: "05",
    img: "/images/elevators .avif",
    title: "Elevators & Interiors",
    subtitle: "Interior Panels & Partitions",
    desc: "The interior design market values materials that combine premium aesthetics with practical performance. Alubond panels are used extensively in elevator cabins, interior partitions, suspended ceilings, and decorative wall cladding. Their flat, flawless surface accepts a wide range of finishes — from mirror-polished metals to textured stone effects — enabling designers to create sophisticated interior environments.",
    features: ["Elevator Cabins", "Interior Partitions", "Suspended Ceilings", "Decorative Wall Cladding"],
  },
  {
    id: "06",
    img: "/images/marine .jpg",
    title: "Marine & Offshore",
    subtitle: "Corrosion-Resistant Panels",
    desc: "The marine environment is one of the most aggressive in the world. Continuous salt spray, UV exposure, and humidity place extreme demands on facade materials. Alubond's specially formulated marine-grade panels resist corrosion, delamination, and discoloration even in offshore conditions, making them the preferred choice for ship superstructures, offshore platforms, and waterfront architectural projects.",
    features: ["Ship Superstructures", "Offshore Platforms", "Waterfront Architecture", "Harbour Facilities"],
  },
  {
    id: "07",
    img: "/images/bullet train.png",
    title: "Trains & Coaches",
    subtitle: "Fire-Rated Lightweight Panels",
    desc: "Rail transport demands materials that combine lightweight properties with strict fire-safety compliance. Alubond's fire-rated panels meet international rail standards, contributing to both passenger safety and energy efficiency through reduced vehicle weight. Interior and exterior cladding applications in high-speed trains, metro systems, and coaches all benefit from the material's durability, formability, and premium appearance.",
    features: ["High-Speed Trains", "Metro Systems", "Coach Interiors", "Station Architecture"],
  },
];

/* ─── Card Component ───────────────────────────── */
function ApplicationCard({
  app,
  index,
}: {
  app: (typeof applications)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-0 rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)] bg-white group`}
    >
      {/* Image */}
      <div className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden flex-shrink-0">
        <img
          src={app.img}
          alt={app.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {/* ID badge */}
        <div className="absolute top-6 left-6 text-[11px] tracking-[0.3em] uppercase text-white/70 font-semibold">
          {app.id}
        </div>
      </div>

      {/* Content */}
      <div className="lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-14">
        <p className="text-xs tracking-[0.25em] uppercase text-[#0a4b7c] font-semibold mb-3">
          {app.subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-medium text-[#1A1A1A] tracking-tight leading-tight mb-4">
          {app.title}
        </h2>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-light mb-8">
          {app.desc}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2">
          {app.features.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 text-xs md:text-sm text-gray-600 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a4b7c] flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────── */
const Applications = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#0a4b7c] selection:text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="pt-36 pb-20 px-8 md:px-16 lg:px-24 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-semibold mb-4">
                005 / Applications
              </p> */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] leading-tight">
                <span className="font-medium text-black">Where Alubond </span>
                <br className="hidden md:block" />
                <span className="font-medium text-[#0a4b7c]">Performs</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="text-right flex flex-col items-end"
            >
              <span className="text-6xl md:text-7xl font-medium text-[#0a4b7c] leading-none mb-2">
                07
              </span>
              <span className="text-[13px] font-medium text-gray-500 uppercase tracking-widest">
                Industries
              </span>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={heroInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gray-200 origin-left mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-2xl"
          >
            Seven industries. One material. Alubond panels deliver unmatched
            performance across architecture, transport, signage, and beyond.
          </motion.p>
        </div>
      </section>

      {/* ── Cards ── */}
      <main className="pb-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {applications.map((app, i) => (
            <ApplicationCard key={app.id} app={app} index={i} />
          ))}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Applications;
