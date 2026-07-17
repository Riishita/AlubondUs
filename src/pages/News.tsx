import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import FeaturedNews from "@/components/sections/FeaturedNews";

const News = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-24 md:pt-32">
        <FeaturedNews darkTheme={false} showAll={true} showViewAllButton={false} />
      </div>
      <FooterSection />
    </div>
  );
};

export default News;
