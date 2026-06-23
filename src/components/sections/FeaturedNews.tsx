import React from 'react';

const newsItems = [
  {
    date: "16 Jan 2026",
    title: "ALUBOND HAS SUCCESFULLY PASSED CAN/ULC-S134 TEST",
    description: "We proudly announce that we have passed CAN/ULC -S134 full-scale wall-assembly test designed to measure the limits of its fire spread, heat flux and burning characteristics of an exterior wall with controlled fire exposure.",
    image: "/1news.png",
    highlight: false,
  },
  {
    date: "16 Jan 2026",
    title: "ALUBOND SECURES TECH TO REDUCE THE SPREAD OF FIRE IN HIGH RISES.",
    description: "The tech 'breakthrough' has made Alubond A1 the world's safest and highest fire rated composite panels.",
    image: "/2news.jpg",
    highlight: true,
  },
  {
    date: "16 Jan 2026",
    title: "ALUBOND SECURES BREAKTHROUGH BY DEVELOPING AN A1 FIRE-RATED ALUMINUM CORE.",
    description: "The Fire-Retardant A1 Aluminum Composite Panels are fully non-combustible and [...]",
    image: "/3news.jpeg",
    highlight: false,
  },
];

export default function FeaturedNews() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 my-8">
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-16 px-4">
        <div>
          <h2 className="text-sm font-light tracking-[0.2em] text-white-200 uppercase mb-4">
            Latest Updates
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white-900 tracking-tight">
            Featured News
          </h3>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {newsItems.map((news, index) => (
          <div 
            key={index} 
            className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative h-60 overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Date Badge (Glassmorphism) */}
              <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                {news.date}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative">
              {/* Floating Action Button */}
              

              {/* Title */}
              <h4 className={`text-lg font-bold uppercase leading-snug mb-3 pr-2 ${news.highlight ? 'text-gray-900' : 'text-gray-900'} group-hover:text-[#0a4b7c] transition-colors duration-300`}>
                {news.title}
              </h4>
              
              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                {news.description}
              </p>
              
              {/* Footer / Read More */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <a href="#" className="inline-flex items-center text-sm font-bold text-gray-800 group-hover:text-[#0a4b7c] transition-colors duration-300">
                  Read Full Article
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}