import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";

const categories = ["Building Type", "Region", "Colour Surface", "Featured"];

const galleryItems = [
  // Building Type
  { id: 1, category: "Building Type", title: "Corporate HQ & Offices", image: "/AboutImages/10.avif" },
  { id: 2, category: "Building Type", title: "Hotels & Hospitality", image: "/AboutImages/10.avif" },
  { id: 3, category: "Building Type", title: "Cultural & Civic", image: "/AboutImages/10.avif" },
  { id: 4, category: "Building Type", title: "Healthcare", image: "/AboutImages/10.avif" },
  { id: 5, category: "Building Type", title: "Retail & Commercial", image: "/AboutImages/10.avif" },
  { id: 6, category: "Building Type", title: "Residential", image: "/AboutImages/10.avif" },
  { id: 7, category: "Building Type", title: "Transportation", image: "/AboutImages/10.avif" },
  { id: 8, category: "Building Type", title: "Education", image: "/AboutImages/10.avif" },
  { id: 9, category: "Building Type", title: "Sports & Leisure", image: "/AboutImages/10.avif" },
  { id: 10, category: "Building Type", title: "Mixed Use", image: "/AboutImages/10.avif" },
  
  // Region
  { id: 11, category: "Region", title: "Middle East", image: "/AboutImages/1.avif" },
  { id: 12, category: "Region", title: "Europe", image: "/AboutImages/2.avif" },
  { id: 13, category: "Region", title: "Asia Pacific", image: "/AboutImages/3.avif" },
  { id: 14, category: "Region", title: "North America", image: "/AboutImages/4.avif" },

  // Colour Surface
  { id: 15, category: "Colour Surface", title: "Metallic Finishes", image: "/AboutImages/5.avif" },
  { id: 16, category: "Colour Surface", title: "Solid Colours", image: "/AboutImages/6.avif" },
  { id: 17, category: "Colour Surface", title: "Wood & Stone Textures", image: "/AboutImages/7.avif" },

  // Featured
  { id: 18, category: "Featured", title: "Burj Khalifa", image: "/AboutImages/8.avif" },
  { id: 19, category: "Featured", title: "Zim Cyber City", image: "/AboutImages/9.avif" },
  { id: 20, category: "Featured", title: "W Abu Dhabi", image: "/AboutImages/11.avif" },
];

const Gallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.activeCategory || "Building Type");

  const displayedItems = galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#0a4b7c] selection:text-white">
      <Navbar />
      
      <main className="pt-36 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-[3.25rem] leading-tight"
            >
              <span className="font-medium text-black">The Art of </span><br className="hidden md:block"/>
              <span className="font-medium text-[#0a4b7c]">Exterior Expression</span>
            </motion.h1>

            <motion.div 
              key={activeCategory} // Add key to animate when category changes
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-right mt-8 md:mt-0 flex flex-col items-end"
            >
              <span className="text-6xl md:text-7xl font-medium text-[#0a4b7c] leading-none mb-2">
                {displayedItems.length}
              </span>
              <span className="text-[13px] md:text-sm font-medium text-gray-500 uppercase tracking-widest">
                {activeCategory}
              </span>
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap gap-8 min-w-max md:min-w-0 pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative pb-4 text-[15px] font-medium transition-colors duration-300 ${
                    activeCategory === category ? "text-[#0a4b7c]" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTabGallery"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0a4b7c]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  onClick={() => navigate(`/gallery/${encodeURIComponent(item.title)}`, { state: { parentCategory: item.category } })}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer rounded-2xl shadow-sm"
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  
                  {/* Hover Badge for Projects Count */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase">4 Projects</span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <h3 className="text-white text-[15px] leading-snug font-medium transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Gallery;
