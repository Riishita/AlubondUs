"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Download,
  Flame,
  ShieldCheck,
  Building2,
  Globe2,
  FileCheck2,
  Award,
  Palette,
  Cloud,
  BadgeCheck,
  BookOpen,
  Search,
} from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";

/* ─── PDF CATALOGUE ─────────────────────────────────── */
const categories = [
  {
    id: "fire-safety",
    label: "Fire & Safety Certifications",
    accent: "#0a4b7c",
    docs: [
      {
        title: "EN 13501 – Fire Classification",
        desc: "European Fire Classification report for Alubond A2 panels (Class A2-S1,D0).",
        tag: "Class A2-S1,D0",
        icon: Flame,
        pdfPath: "/En-13501 Fire Classification.pdf",
        size: "162 KB",
      },
      {
        title: "EN 13501 – Eurocon Classification Report",
        desc: "Signed Eurocon classification report per EN 13501-1 standard.",
        tag: "BRE Certified",
        icon: BadgeCheck,
        pdfPath: "/0206-25-CR-01 Eurocon (EN 13501-1) Classification Report signed.pdf",
        size: "143 KB",
      },
      {
        title: "NFPA 285 – Fire Propagation (ESL)",
        desc: "NFPA 285 fire propagation compliance test report.",
        tag: "Fully Compliant",
        icon: ShieldCheck,
        pdfPath: "/ESL-26-12003.pdf",
        size: "939 KB",
      },
      {
        title: "BS 8414 – BRE British Standard",
        desc: "Full-scale fire test to BS 8414 for wall cladding assemblies.",
        tag: "BRE Certified",
        icon: Building2,
        pdfPath: "/DLR2139 Rev.0.pdf",
        size: "6.3 MB",
      },
      {
        title: "ULC-S134 – Canadian Fire Test",
        desc: "ULC S134 full-scale fire test for exterior wall assemblies.",
        tag: "Compliant",
        icon: Globe2,
        pdfPath: "/ULC S134 FRA2.pdf",
        size: "201 KB",
      },
      {
        title: "ASTM E-84 – Smoke & Flame Spread",
        desc: "ASTM E-84 surface burning characteristics test report.",
        tag: "Class A Rating",
        icon: FileCheck2,
        pdfPath: "/ASTM E-84.pdf",
        size: "360 KB",
      },
      {
        title: "ASTM D-1929 – Ignition Temperature",
        desc: "ASTM D-1929 ignition temperature certification.",
        tag: "Certified",
        icon: Flame,
        pdfPath: "/ASTM D-1929 Certificate.pdf",
        size: "200 KB",
      },
      {
        title: "3150T17-2 – Euroclass B Certification",
        desc: "Certification report for Alubond Euroclass B fire-rated panels.",
        tag: "Euroclass B",
        icon: FileText,
        pdfPath: "/3150T17-2 R2.pdf",
        size: "167 KB",
      },
    ],
  },
  {
    id: "quality",
    label: "Quality & Standards",
    accent: "#1a6b4b",
    docs: [
      {
        title: "ISO 9001 – Quality Management",
        desc: "EIAC certified ISO 9001 quality management system certificate.",
        tag: "Certified Facility",
        icon: Award,
        pdfPath: "/D 9001 EIAC - Main.pdf",
        size: "61 KB",
      },
      {
        title: "AAMA 2605 – Becker PVDF Coating",
        desc: "AAMA 2605-13 PVDF test certificate for Beckers® Fluor 630 coating.",
        tag: "PVDF Certified",
        icon: BadgeCheck,
        pdfPath: "/AAMA 2605- BECKER TC 2025.pdf",
        size: "81 KB",
      },
      {
        title: "Weather Resistance & Delamination",
        desc: "Weather resistance and delamination test report for METS 4mm A2 panels.",
        tag: "Tested",
        icon: Cloud,
        pdfPath: "/Weather resistance & Delamination METS 4mm A2.pdf",
        size: "262 KB",
      },
    ],
  },
  {
    id: "product-resources",
    label: "Product Resources",
    accent: "#5a3d8a",
    docs: [
      {
        title: "Alubond Color Chart A3",
        desc: "Full A3 color chart featuring all available Alubond finishes and palette options.",
        tag: "Color Guide",
        icon: Palette,
        pdfPath: "/Alubond Color Chart A3 .pdf",
        size: "8.0 MB",
      },
    ],
  },
];

/* ─── HERO ─────────────────────────────────────────── */
const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative pt-36 pb-20 px-8 md:px-16 lg:px-24 bg-white overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0a4b7c]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0a4b7c]/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="h-[1px] w-8 bg-[#0a4b7c]" />
          <p className="tracking-[0.2em] text-[10px] md:text-xs font-semibold text-[#0a4b7c] uppercase">
            Resource Centre
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[4rem] leading-tight mb-6 max-w-3xl"
        >
          <span className="font-medium text-black">Technical </span>
          <span className="font-medium text-[#0a4b7c]">Downloads</span>
          <br />
          <span className="font-light text-black text-3xl md:text-4xl lg:text-5xl">
            & Certifications
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-[#4B5563] leading-relaxed font-light max-w-2xl"
        >
          Access all Alubond technical documents, fire safety certifications,
          quality standards, and product resources. Every panel is independently
          tested and globally certified.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-6 md:gap-10 mt-10"
        >
          {[
            { n: "12+", l: "Certifications" },
            { n: "6", l: "Standards Bodies" },
            { n: "3", l: "Categories" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-semibold text-[#0a4b7c]">
                {s.n}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-[#0a4b7c]/50 mt-0.5">
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── CATEGORY SECTION ──────────────────────────────── */
const CategorySection = ({
  category,
  index,
  searchQuery,
}: {
  category: (typeof categories)[0];
  index: number;
  searchQuery: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filtered = category.docs.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery && filtered.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="mb-16"
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-1 h-8 rounded-full"
          style={{ background: category.accent }}
        />
        <h2
          className="text-xl md:text-2xl font-semibold tracking-tight"
          style={{ color: category.accent }}
        >
          {category.label}
        </h2>
        <div className="flex-1 h-[1px] bg-gray-100" />
        <span className="text-xs font-medium text-gray-400 tabular-nums">
          {filtered.length} document{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((doc, i) => {
          const Icon = doc.icon;
          return (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 + index * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(10,75,124,0.10)" }}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_24px_rgba(10,75,124,0.04)] cursor-default transition-all duration-300 hover:border-[#0a4b7c]/20"
            >
              {/* Top row: icon + tag */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `${category.accent}10`,
                    color: category.accent,
                  }}
                >
                  <Icon size={22} strokeWidth={1.3} />
                </div>
                <span
                  className="text-[9px] tracking-[0.18em] font-semibold uppercase px-2.5 py-1 rounded-full border"
                  style={{
                    color: category.accent,
                    background: `${category.accent}08`,
                    borderColor: `${category.accent}20`,
                  }}
                >
                  {doc.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-2 leading-snug tracking-tight">
                  {doc.title}
                </h3>
                <p className="text-[12px] text-[#6B7280] leading-relaxed font-light mb-5">
                  {doc.desc}
                </p>
              </div>

              {/* Bottom: size + download */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                  <BookOpen size={12} />
                  <span>{doc.size}</span>
                </div>

                <a
                  href={doc.pdfPath}
                  download={doc.title}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-[11px] font-semibold tracking-wide uppercase transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: category.accent }}
                >
                  <Download size={12} />
                  Download
                </a>
              </div>

              {/* Hover accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${category.accent}, transparent)` }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ─── PAGE ROOT ─────────────────────────────────────── */
export default function Downloads() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const isInView = useInView(searchRef, { once: true });

  const allCount = categories.reduce((s, c) => s + c.docs.length, 0);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />

      {/* ── SEARCH BAR ── */}
      <div className="px-8 md:px-16 lg:px-24 pb-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative max-w-xl"
          >
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search certifications, standards…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-200 bg-[#f9f9f9] text-sm text-[#1A1A1A] placeholder-gray-400 outline-none focus:border-[#0a4b7c]/40 focus:ring-2 focus:ring-[#0a4b7c]/10 transition-all duration-200"
            />
          </motion.div>
          {searchQuery && (
            <p className="mt-3 text-xs text-gray-400 font-medium">
              Showing results for{" "}
              <span className="text-[#0a4b7c] font-semibold">
                "{searchQuery}"
              </span>{" "}
              — {allCount} total documents
            </p>
          )}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <section className="px-8 md:px-16 lg:px-24 py-10 pb-24">
        <div className="max-w-7xl mx-auto">
          {categories.map((cat, i) => (
            <CategorySection
              key={cat.id}
              category={cat}
              index={i}
              searchQuery={searchQuery}
            />
          ))}

          {/* No results */}
          {searchQuery &&
            categories.every(
              (c) =>
                !c.docs.some(
                  (d) =>
                    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    d.tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
            ) && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <FileText size={48} className="text-gray-200 mb-4" />
                <p className="text-lg font-medium text-gray-400">
                  No documents found for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-sm text-[#0a4b7c] font-semibold underline underline-offset-2"
                >
                  Clear search
                </button>
              </div>
            )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
