import React from 'react';

const newsItems = [
  {
    date: "16 Jan 2026",
    title: "New health privilege card in UAE to cover tourists for Dh149",
    image: "/News1.avif", // Replace with your image paths
  },
  {
    date: "16 Jan 2026",
    title: "T Ten Global Sports announces Indian Masters T10, set to take place...",
    image: "/Nrws2.avif",
  },
  {
    date: "16 Jan 2026",
    title: "Zimbabwe Cricket to launch six-team T10 tournament in March 2023",
    image: "/News3.avif",
  },
];

export default function FeaturedNews() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Section Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-white-900 mb-8">
        Featured News
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Date Badge */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                {news.date}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                {news.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}