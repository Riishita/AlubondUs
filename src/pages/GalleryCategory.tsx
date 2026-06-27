import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  location: string;
  image: string;
  badge: string;
  sector: string;
  region: string;
  finish: string;
  fireRated: string;
  description: string;
  tags: string[];
}

const ALL_PROJECTS: Project[] = [
  { 
    id: 1, 
    title: "QIPCO TOWER", 
    location: "Doha, Qatar", 
    image: "/AboutImages/10.avif", 
    badge: "FR",
    sector: "Corporate HQ & Offices",
    region: "Middle East",
    finish: "Metallic Finishes",
    fireRated: "Yes — FR Certified",
    description: "A prestige corporate tower in Doha's financial district featuring Alubond metallic panels delivering a reflective, premium facade aligned with the project's architectural language.",
    tags: ["Fire Rated", "Metallic", "High-Rise"]
  },
  { 
    id: 2, 
    title: "FRANCHI MARMI OFFICES", 
    location: "Carrara, Italy", 
    image: "/AboutImages/1.avif", 
    badge: "",
    sector: "Corporate HQ & Offices",
    region: "Europe",
    finish: "Solid Colours",
    fireRated: "Standard",
    description: "Modern office complex showcasing clean architectural lines and durable exterior finishes tailored for European climate conditions.",
    tags: ["Commercial", "Solid"]
  },
  { 
    id: 3, 
    title: "MINEC OFFICE BUILDING", 
    location: "Dubai, UAE", 
    image: "/AboutImages/2.avif", 
    badge: "",
    sector: "Corporate HQ & Offices",
    region: "Middle East",
    finish: "Wood & Stone Textures",
    fireRated: "Yes — FR Certified",
    description: "An innovative corporate space blending natural aesthetics with high-performance aluminum composite panels.",
    tags: ["Wood Finish", "Sustainable"]
  },
  { 
    id: 4, 
    title: "KINEUM BUILDING", 
    location: "Gothenburg, Sweden", 
    image: "/AboutImages/3.avif", 
    badge: "FR",
    sector: "Mixed Use",
    region: "Europe",
    finish: "Custom Pattern",
    fireRated: "Yes — A2 Rated",
    description: "A landmark mixed-use development demanding rigorous fire safety standards and a unique, visually striking facade design.",
    tags: ["A2 Rated", "Custom"]
  },
  {
    id: 5,
    title: "BURJ KHALIFA",
    location: "Dubai, UAE",
    image: "/AboutImages/8.avif",
    badge: "FR",
    sector: "Mixed Use",
    region: "Middle East",
    finish: "Metallic Finishes",
    fireRated: "Yes — FR Certified",
    description: "The world's tallest building, utilizing premium Alubond panels to achieve its iconic, shimmering metallic exterior.",
    tags: ["Iconic", "Super-tall", "Metallic"]
  },
  {
    id: 6,
    title: "W ABU DHABI",
    location: "Abu Dhabi, UAE",
    image: "/AboutImages/11.avif",
    badge: "",
    sector: "Hotels & Hospitality",
    region: "Middle East",
    finish: "Solid Colours",
    fireRated: "Yes — FR Certified",
    description: "An architectural marvel built over the Yas Marina Circuit, featuring a stunning LED canopy and solid color composite panels.",
    tags: ["Hospitality", "Iconic"]
  },
  {
    id: 7,
    title: "ZIM CYBER CITY",
    location: "Harare, Zimbabwe",
    image: "/AboutImages/9.avif",
    badge: "",
    sector: "Mixed Use",
    region: "Africa",
    finish: "Solid Colours",
    fireRated: "Standard",
    description: "A futuristic smart city development utilizing extensive Alubond cladding for a modern, sleek aesthetic.",
    tags: ["Smart City", "Development"]
  },
  {
    id: 8,
    title: "SYDNEY OPERA HOUSE PAVILION",
    location: "Sydney, Australia",
    image: "/AboutImages/4.avif",
    badge: "",
    sector: "Cultural & Civic",
    region: "Asia Pacific",
    finish: "Solid Colours",
    fireRated: "Yes — FR Certified",
    description: "Modern extensions to the iconic cultural center, utilizing pristine white solid panels to match the historic sails.",
    tags: ["Cultural", "Heritage"]
  },
  {
    id: 9,
    title: "NEW YORK TIMES BUILDING",
    location: "New York, USA",
    image: "/AboutImages/5.avif",
    badge: "FR",
    sector: "Corporate HQ & Offices",
    region: "North America",
    finish: "Metallic Finishes",
    fireRated: "Yes — FR Certified",
    description: "A prominent skyscraper featuring a ceramic rod screen wall backed by high-performance metallic composite panels.",
    tags: ["High-Rise", "Corporate"]
  }
];

const getProjectsForCategory = (categoryName: string): Project[] => {
  const normalizedCategory = categoryName.toLowerCase();
  
  // Filter projects if their sector, region, finish, or title matches the category name
  const matchingProjects = ALL_PROJECTS.filter(p => 
    p.sector.toLowerCase().includes(normalizedCategory) ||
    p.region.toLowerCase().includes(normalizedCategory) ||
    p.finish.toLowerCase().includes(normalizedCategory) ||
    p.title.toLowerCase().includes(normalizedCategory)
  );

  // If we found specific matches, return them
  if (matchingProjects.length > 0) {
    return matchingProjects;
  }

  // Custom broad fallbacks for things like "Building Type" generic searches
  if (normalizedCategory.includes("corporate") || normalizedCategory.includes("office")) {
    return ALL_PROJECTS.filter(p => p.sector.includes("Corporate"));
  }

  // Default fallback if no matches found
  return ALL_PROJECTS.slice(0, 4); 
};

const GalleryCategory = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const categoryName = decodeURIComponent(categoryId || "Category");
  const projects = getProjectsForCategory(categoryName);
  const activeParent = location.state?.parentCategory || "Building Type";
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#0a4b7c] selection:text-white">
      <Navbar />
      
      <main className="pt-36 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Section (Brand Aligned) */}
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

          {/* Navigation Tabs - Clickable, navigates back to gallery with chosen category */}
          <div className="border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap gap-8 min-w-max md:min-w-0 pb-1">
              {["Building Type", "Region", "Colour Surface", "Featured"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => navigate("/gallery", { state: { activeCategory: tab } })}
                  className={`relative pb-4 text-[15px] font-medium transition-colors duration-300 cursor-pointer ${
                    tab === activeParent ? "text-[#0a4b7c]" : "text-gray-500 hover:text-black"
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
            <Link to="/gallery" className="text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors uppercase tracking-widest">
              <span className="text-lg leading-none mb-0.5">&lsaquo;</span> ALL CATEGORIES
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{categoryName}</span>
          </div>

          {/* Projects Grid (Brand Aligned) */}
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
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  
                  {project.badge && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#111625]/80 backdrop-blur-md rounded-full border border-white/10">
                      <span className="text-orange-400 text-[10px] font-bold tracking-wider">{project.badge}</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 p-5 z-20 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    {project.location && (
                      <p className="text-gray-300 text-[10px] md:text-xs font-medium mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {project.location}
                      </p>
                    )}
                    <h3 className="text-white text-sm md:text-[15px] leading-snug font-medium uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <FooterSection />

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedProject(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl h-[85vh] md:h-[75vh] bg-[#111625] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
              >
                <X size={20} />
              </button>

              {/* Left side: Image */}
              <div className="w-full md:w-[45%] h-64 md:h-full relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111625]/20 md:to-[#111625]" />
              </div>

              {/* Right side: Details */}
              <div className="w-full md:w-[55%] h-full overflow-y-auto p-8 md:p-12 lg:p-16 flex flex-col text-white custom-scrollbar">
                
                {/* Header */}
                <div className="mb-8">
                  <p className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                    {selectedProject.sector} • {selectedProject.region}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Specs Table */}
                <div className="flex flex-col mb-8 border-t border-white/10">
                  <div className="flex py-4 border-b border-white/10">
                    <span className="w-1/3 text-gray-500 text-sm font-medium">Location</span>
                    <span className="w-2/3 text-gray-200 text-sm">{selectedProject.location}</span>
                  </div>
                  <div className="flex py-4 border-b border-white/10">
                    <span className="w-1/3 text-gray-500 text-sm font-medium">Sector</span>
                    <span className="w-2/3 text-gray-200 text-sm">{selectedProject.sector}</span>
                  </div>
                  <div className="flex py-4 border-b border-white/10">
                    <span className="w-1/3 text-gray-500 text-sm font-medium">Region</span>
                    <span className="w-2/3 text-gray-200 text-sm">{selectedProject.region}</span>
                  </div>
                  <div className="flex py-4 border-b border-white/10">
                    <span className="w-1/3 text-gray-500 text-sm font-medium">Finish</span>
                    <span className="w-2/3 text-gray-200 text-sm">{selectedProject.finish}</span>
                  </div>
                  <div className="flex py-4 border-b border-white/10">
                    <span className="w-1/3 text-gray-500 text-sm font-medium">Fire Rated</span>
                    <span className="w-2/3 text-orange-500 font-medium text-sm">{selectedProject.fireRated}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-12">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 text-gray-400 text-xs font-medium bg-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center gap-4">
                  <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20">
                    Request Specs <span>&rarr;</span>
                  </button>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 border border-white/10 hover:bg-white/5 text-gray-300 text-sm font-medium rounded-full transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryCategory;
