import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/data/galleryData";
import { useEffect } from "react";

interface ProjectModalProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export default function ProjectModal({ selectedProject, setSelectedProject }: ProjectModalProps) {
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
                src={selectedProject.img}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111625]/20 md:to-[#111625]" />
            </div>

            {/* Right side: Details */}
            <div className="w-full md:w-[55%] h-full overflow-y-auto p-8 md:p-12 lg:p-16 flex flex-col text-white custom-scrollbar">
              {/* Header */}
              <div className="mb-8">
                <p className="text-[#4da6ff] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                  {selectedProject.type} &bull; {selectedProject.region}
                </p>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                  {selectedProject.name}
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
                  <span className="w-2/3 text-gray-200 text-sm">{selectedProject.type}</span>
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
                  <span
                    className={`w-2/3 font-medium text-sm ${
                      selectedProject.fireRated ? "text-[#4da6ff]" : "text-gray-200"
                    }`}
                  >
                    {selectedProject.fireRated ? "Yes — FR Certified" : "Standard Grade"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {selectedProject.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-12">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-white/10 text-gray-400 text-xs font-medium bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-auto flex items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setTimeout(() => {
                      document.getElementById("request-specs")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="px-6 py-3 bg-[#0a4b7c] hover:bg-[#083a61] text-white text-sm font-bold rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-[#0a4b7c]/20"
                >
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
  );
}
