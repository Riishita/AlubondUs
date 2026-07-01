import { useParams, Link } from "react-router-dom";
import { newsItems } from "@/data/newsData";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { MessageSquare, Heart, Share2, ArrowRight, Search } from "lucide-react";

const NewsDetail = () => {
  const { id } = useParams();
  const news = newsItems.find(item => item.id === id) || newsItems[0];
  const recentPosts = newsItems.slice(0, 4);
  const archives = ["2021", "2020", "2019", "2018"];

  const dateParts = news.date.split(" ");
  const day = dateParts[0] || "16";
  const month = dateParts[1] || "Jan";
  const year = dateParts[2] || "2026";

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-16 text-center bg-white border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-gray-900">News Update</h1>
        <div className="w-16 h-1 bg-[#f97316] mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2">
          {/* Image with Date Box */}
          <div className="flex flex-col sm:flex-row items-stretch mb-10 overflow-hidden rounded-2xl shadow-sm border border-gray-200">
            {/* Date Box */}
            <div className="bg-[#1e2022] text-white flex flex-col justify-center items-center w-full sm:w-28 shrink-0 py-6 sm:py-8">
              <span className="text-3xl font-black">{day}</span>
              <span className="text-sm font-medium uppercase tracking-widest text-gray-400 border-t border-gray-700 w-16 text-center pt-2 mt-2">{month}</span>
              <span className="text-sm font-bold mt-1">{year}</span>
            </div>
            {/* Image */}
            <div className="flex-grow bg-gray-200">
              <img src={news.image} alt={news.title} className="w-full h-full min-h-[300px] object-cover" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 uppercase leading-tight mb-8">
            {news.title}
          </h2>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
            {news.fullContent.split("\n").filter(p => p.trim() !== "").map((para, idx) => (
              <p key={idx} className="text-[17px]">{para}</p>
            ))}
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="lg:col-span-1 space-y-12">
          
          {/* Recent Posts */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6 border-b pb-4">Recent Posts</h3>
            <div className="flex flex-col gap-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex gap-4 group">
                  <div className="w-20 h-20 shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link to={`/news/${post.id}`} className="text-sm font-semibold text-gray-800 hover:text-[#f97316] leading-snug mb-1 line-clamp-2 transition-colors">
                      {post.title}
                    </Link>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Archives */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide mb-6 border-b pb-4">Archives</h3>
            <div className="flex flex-col gap-2">
              {archives.map((year, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2 cursor-pointer hover:text-[#f97316] transition-colors group">
                  <ArrowRight className="w-4 h-4 text-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-medium text-gray-600 hover:text-[#f97316]">{year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full border border-gray-200 pl-10 pr-4 py-3 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
            />
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default NewsDetail;