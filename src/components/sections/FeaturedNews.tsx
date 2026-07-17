import { Link, useNavigate } from 'react-router-dom';
import { newsItems } from '@/data/newsData';
import { ArrowRight } from 'lucide-react';

interface FeaturedNewsProps {
  darkTheme?: boolean;
  showAll?: boolean;          // true → show all 4 news (News page)
  showViewAllButton?: boolean; // false → hide the View All buttons (News page)
}

export default function FeaturedNews({
  darkTheme = true,
  showAll = false,
  showViewAllButton = true,
}: FeaturedNewsProps) {
  const navigate = useNavigate();

  const displayed = showAll ? newsItems : newsItems.filter(news => news.id !== "4");

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 md:py-16">
      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end mb-16 px-4">
        <div>
          <h2 className={`text-sm font-light tracking-[0.2em] uppercase mb-4 ${darkTheme ? 'text-gray-100' : 'text-gray-500'}`}>
            Latest Updates
          </h2>
          <h3 className={`text-4xl md:text-5xl lg:text-[3.25rem] leading-tight font-medium ${darkTheme ? 'text-white' : 'text-[#0a4b7c]'}`}>
            <span className={darkTheme ? 'text-white' : 'text-black'}>Featured </span>
            News
          </h3>
        </div>

      </div>

      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayed.map((news, index) => (
          <div 
            key={index} 
            className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Date Badge (Glassmorphism) */}
              <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                {news.date}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative">
              {/* Title */}
              <h4 className={`text-xl font-bold uppercase leading-snug mb-3 pr-2 ${news.highlight ? 'text-gray-900' : 'text-gray-900'} group-hover:text-[#0a4b7c] transition-colors duration-300 line-clamp-2`}>
                {news.title}
              </h4>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {news.description}
              </p>
              
              {/* Footer / Read More */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <Link to={`/news/${news.id}`} className="inline-flex items-center text-sm font-bold text-gray-800 group-hover:text-[#0a4b7c] transition-colors duration-300">
                  Read Full Article
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom View All CTA (home page only) */}
      {showViewAllButton && (
        <div className="flex justify-center mt-12">
          <button
            id="news-view-all-bottom-btn"
            onClick={() => navigate('/news')}
            className={`group flex items-center gap-2 px-8 py-4 rounded-full border text-sm uppercase tracking-widest font-medium transition-all duration-300
              ${darkTheme
                ? 'border-white/25 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black hover:border-white'
                : 'border-[#0a4b7c]/30 text-[#0a4b7c] hover:bg-[#0a4b7c] hover:text-white'
              }`}
          >
            <span>View All News</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      )}
      
    </section>
  );
}