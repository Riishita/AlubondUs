import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import ProjectModal from "@/components/sections/ProjectModal";
import {
  MAIN_TABS,
  MainTab,
  getCategoriesForTab,
  FEATURED_PROJECTS,
  GalleryCategory,
  Project as ProjectType,
} from "@/data/galleryData";

const Project = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<MainTab>(
    location.state?.activeCategory || "Building Type"
  );
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const isFeatured = activeTab === "Featured";
  const subcategories: GalleryCategory[] = isFeatured ? [] : getCategoriesForTab(activeTab);

  const displayCount = isFeatured ? FEATURED_PROJECTS.length : subcategories.length;
  const displayLabel = isFeatured
    ? "Featured Projects"
    : activeTab === "Region"
    ? "Regions"
    : activeTab === "Colour Surface"
    ? "Finishes"
    : "Building Types";

  const handleTileClick = (cat: GalleryCategory) => {
    navigate(`/project/${encodeURIComponent(cat.id)}`, {
      state: { parentCategory: activeTab, categoryName: cat.name },
    });
  };

  const handleFeaturedClick = (project: ProjectType) => {
    setSelectedProject(project);
  };

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
              <span className="font-medium text-black">The Art of </span>
              <br className="hidden md:block" />
              <span className="font-medium text-[#0a4b7c]">Exterior Expression</span>
            </motion.h1>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-right mt-8 md:mt-0 flex flex-col items-end"
            >
              <span className="text-6xl md:text-7xl font-medium text-[#0a4b7c] leading-none mb-2">
                {displayCount}
              </span>
              <span className="text-[13px] md:text-sm font-medium text-gray-500 uppercase tracking-widest">
                {displayLabel}
              </span>
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap gap-8 min-w-max md:min-w-0 pb-1">
              {MAIN_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-4 text-[15px] font-medium transition-colors duration-300 ${
                    activeTab === tab ? "text-[#0a4b7c]" : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
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

          {/* Gallery Grid — subcategory tiles or featured shortcut */}
          <AnimatePresence mode="wait">
            {isFeatured ? (
              /* Featured: single "view all" tile or jump straight */
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3"
              >
                {FEATURED_PROJECTS.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    onClick={() => handleFeaturedClick(project)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer rounded-2xl shadow-sm"
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                    <motion.img
                      src={project.img}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    {project.fireRated && (
                      <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-[#0a4b7c] text-[10px] font-bold tracking-widest uppercase">FR</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <p className="text-gray-300 text-[10px] font-medium mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {project.location}
                      </p>
                      <h3 className="text-white text-[15px] leading-snug font-medium transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                        {project.name}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Subcategory tiles */
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
              >
                {subcategories.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    layout
                    onClick={() => handleTileClick(cat)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer rounded-2xl shadow-sm"
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                    <motion.img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />

                    {/* Project count badge */}
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                        {cat.count} Projects
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <h3 className="text-white text-[15px] leading-snug font-medium transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                        {cat.name}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <FooterSection />
      
      <ProjectModal 
        selectedProject={selectedProject} 
        setSelectedProject={setSelectedProject} 
      />
    </div>
  );
};

export default Project;
