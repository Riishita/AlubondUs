import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import ProjectModal from "@/components/sections/ProjectModal";
import {
  MAIN_TABS,
  MainTab,
  Project,
  getProjectsForSubcategory,
  getCategoryInfo,
} from "@/data/galleryData";

const ProjectCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const id = categoryId || "corporate";
  const info = getCategoryInfo(id);
  
  const activeParent: MainTab =
    (location.state?.parentCategory as MainTab) || info.tab;
  const categoryName: string =
    location.state?.categoryName || info.name;

  const projects = getProjectsForSubcategory(id);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-right mt-8 md:mt-0 flex flex-col items-end"
            >
              <span className="text-6xl md:text-7xl font-medium text-[#0a4b7c] leading-none mb-2">
                {projects.length}
              </span>
              <span className="text-[13px] md:text-sm font-medium text-gray-500 uppercase tracking-widest">
                Projects
              </span>
            </motion.div>
          </div>

          {/* Navigation Tabs — navigate back to gallery with chosen tab active */}
          <div className="border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap gap-8 min-w-max md:min-w-0 pb-1">
              {MAIN_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    navigate("/project", { state: { activeCategory: tab } })
                  }
                  className={`relative pb-4 text-[15px] font-medium transition-colors duration-300 cursor-pointer ${
                    tab === activeParent
                      ? "text-[#0a4b7c]"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                  {tab === activeParent && (
                    <motion.div
                      layoutId="activeTabCategory"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0a4b7c]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="mb-10 text-[13px] font-medium flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-[#0a4b7c] hover:text-[#0a4b9d] flex items-center gap-1 transition-colors uppercase tracking-widest"
            >
              <span className="text-lg leading-none mb-0.5">&lsaquo;</span> BACK
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{categoryName}</span>
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  onClick={() => setSelectedProject(project)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer rounded-2xl shadow-sm"
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  <motion.img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />

                  {project.fireRated && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-white/10">
                      <span className="text-[#0a4b7c] text-[10px] font-bold tracking-wider">
                        FR
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    {project.location && (
                      <p className="text-gray-300 text-[10px] md:text-xs font-medium mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {project.location}
                      </p>
                    )}
                    <h3 className="text-white text-sm md:text-[15px] leading-snug font-medium uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {project.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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

export default ProjectCategory;
