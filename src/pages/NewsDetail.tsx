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
  const month = dateParts[1] || "Jan";
  const year = dateParts[2] || "2026";

  // Use blue theme color
  const themeBlue = "#0a4b7c";

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-36 pb-12 text-center bg-white">
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-tight text-black uppercase">
          News <span className="text-[#0a4b7c]">Update</span>
        </h1>
        <div className="w-16 h-1 bg-[#0a4b7c] mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        
        {/* Main Content (Left Column) */}
        <div className="lg:col-span-2">
          {/* Image with Date Box Overlay */}
          <div className="relative mb-12 overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
            {/* Date Box */}
            <div className="absolute top-0 left-0 bg-[#0a4b7c]/95 backdrop-blur-md text-white flex flex-col justify-center items-center w-24 h-24 z-10 shadow-lg rounded-br-[2rem]">
              <span className="text-sm font-bold tracking-widest uppercase text-white/80">{month}</span>
              <span className="text-xl font-black mt-0.5">{year}</span>
            </div>
            {/* Image */}
            <div className="w-full aspect-video bg-gray-100">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover object-top" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase leading-tight mb-8">
            {news.title}
          </h2>

          {/* Stats / Icons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1"></div>
            <div className="flex items-center gap-6 text-gray-700 font-bold text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#0a4b7c] fill-[#0a4b7c]" />
                <span>{news.comments || 3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#0a4b7c] fill-[#0a4b7c]" />
                <span>{news.likes || 10}</span>
              </div>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Share2 className="w-5 h-5 text-[#0a4b7c] stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-black font-medium leading-[1.8] space-y-8">
            {news.fullContent.split("\n").filter(p => p.trim() !== "").map((para, idx) => (
              <p key={idx} className="text-[14px] md:text-[15px]">{para}</p>
            ))}
          </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="lg:col-span-1 space-y-12">
          
          {/* Recent Posts */}
          <div className="bg-white">
            <h3 className="text-sm font-black text-black uppercase tracking-wider mb-6">Recent Posts</h3>
            <div className="flex flex-col gap-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex gap-4 group border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="w-24 h-20 shrink-0 bg-gray-200 overflow-hidden rounded-xl">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link to={`/news/${post.id}`} className="text-[13px] font-medium text-gray-800 hover:text-[#0a4b7c] leading-relaxed mb-2 transition-colors">
                      {post.title}
                    </Link>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {post.date.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Archives */}
          <div className="bg-white">
            <h3 className="text-sm font-black text-black uppercase tracking-wider mb-6">Archives</h3>
            <div className="flex flex-col gap-0 border-t border-gray-100">
              {archives.map((year, idx) => (
                <div key={idx} className="flex items-center gap-3 py-4 border-b border-gray-100 cursor-pointer group">
                  <ArrowRight className="w-4 h-4 text-[#0a4b7c]" />
                  <span className="text-[13px] font-medium text-gray-700 group-hover:text-[#0a4b7c] transition-colors">{year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full border border-gray-200 pl-12 pr-4 py-3.5 text-sm rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#0a4b7c] focus:border-[#0a4b7c] transition-all bg-white"
            />
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
};

export default NewsDetail;