import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import { Grid, FilePlus, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const ColourStudio = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans relative overflow-hidden text-[#1A1A1A]">
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 lg:px-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-black/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-[800px] h-[800px] bg-[#0a4b7c]/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tight text-[#1A1A1A] mb-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span className="font-medium text-[#1A1A1A]">Alubond</span>
              <span className="hidden md:block w-[2px] h-12 bg-gray-300"></span>
              <span className="text-[#0a4b7c]">Colour Studio</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg text-[#6B7280] max-w-2xl mx-auto font-light leading-relaxed"
            >
              Experience the ultimate digital facade visualization. Browse, upload, and apply our extensive collection of finishes in real-time.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="group relative bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 hover:shadow-xl transition-all duration-500 flex flex-col h-full min-h-[320px] text-left hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0a4b7c]/5 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 bg-[#FAFAFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0a4b7c] transition-colors duration-500">
                  <Grid className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl text-[#1A1A1A] font-medium mb-2">Explore Gallery</h2>
                <p className="text-[9px] text-[#0a4b7c] tracking-[0.2em] uppercase font-bold mb-4">No Upload Needed</p>
                <p className="text-[#6B7280] text-sm leading-relaxed font-light">
                  Browse 3D building models and apply Alubond facade materials, textures, and finishes in real time to visualize your next project.
                </p>
              </div>
              <div className="mt-auto relative z-10">
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white rounded-full text-[11px] uppercase tracking-wider font-semibold hover:bg-[#0a4b7c] transition-all duration-300 w-fit">
                  Start Exploring <span className="text-xs">→</span>
                </a>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="group relative bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 hover:shadow-xl transition-all duration-500 flex flex-col h-full min-h-[320px] text-left hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0a4b7c]/5 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 bg-[#FAFAFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0a4b7c] transition-colors duration-500">
                  <FilePlus className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl text-[#1A1A1A] font-medium mb-2">Upload IFC Model</h2>
                <p className="text-[9px] text-[#0a4b7c] tracking-[0.2em] uppercase font-bold mb-4">Import Your BIM File</p>
                <p className="text-[#6B7280] text-sm leading-relaxed font-light">
                  Import an IFC building file and visualize it with the full facade collection to see exactly how our materials fit your architecture.
                </p>
              </div>
              <div className="mt-auto relative z-10">
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white rounded-full text-[11px] uppercase tracking-wider font-semibold hover:bg-[#0a4b7c] transition-all duration-300 w-fit">
                  Upload IFC <span className="text-xs">→</span>
                </a>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="group relative bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 hover:shadow-xl transition-all duration-500 flex flex-col h-full min-h-[320px] text-left hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0a4b7c]/5 rounded-bl-full transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 bg-[#FAFAFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0a4b7c] transition-colors duration-500">
                  <ImageIcon className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl text-[#1A1A1A] font-medium mb-2">Upload Image</h2>
                <p className="text-[9px] text-[#0a4b7c] tracking-[0.2em] uppercase font-bold mb-4">Photo Or Render</p>
                <p className="text-[#6B7280] text-sm leading-relaxed font-light">
                  Upload a building image; our AI rapidly applies your chosen facade materials directly to the visualization seamlessly.
                </p>
              </div>
              <div className="mt-auto relative z-10">
                <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] text-white rounded-full text-[11px] uppercase tracking-wider font-semibold hover:bg-[#0a4b7c] transition-all duration-300 w-fit">
                  Upload Image <span className="text-xs">→</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        className="mt-auto py-8 text-center bg-[#FAFAFA] relative z-10"
      >
        <p className="text-[10px] md:text-xs text-gray-400 tracking-[0.2em] uppercase font-semibold px-4">
          Alubond U.S.A — Fire-retardant metal composites — Digital facade visualization
        </p>
      </motion.div>
    </div>
  );
};

export default ColourStudio;
