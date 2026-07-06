import { useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "FIRE RATED ALUMINIUM COMPOSITE PANELS",
    count: 3,
  },
  {
    title: "EXOTIC FINISHES",
    count: 8,
  },
  {
    title: "CORPORATE IDENTITY",
    count: 2,
  },
  {
    title: "FACADE SYSTEMS",
    count: 3,
  },
];

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-16 px-8 md:px-16 lg:px-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
            Our Products
          </h1>
          <p className="font-medium text-gray-600 md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our extensive range of high-quality products designed for innovation, durability, and aesthetics.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          {categories.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                  {category.title}
                </h2>
                <div className="w-24 h-1 bg-[#0a4b7c]"></div>
              </div>
              
              {/* Responsive Grid for Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Array.from({ length: category.count }).map((_, imgIdx) => {
                  const isFireRatedCategory = category.title === "FIRE RATED ALUMINIUM COMPOSITE PANELS";
                  
                  const getImagePath = (categoryTitle: string, index: number) => {
                    const number = index + 1;
                    if (categoryTitle === "FIRE RATED ALUMINIUM COMPOSITE PANELS") {
                      if (number === 1) return `/products/${categoryTitle} .avif`;
                      return `/products/${categoryTitle} ${number}.avif`;
                    }
                    return `/products/${categoryTitle} ${number}.jpg`;
                  };

                  const ImageCard = (
                    <div 
                      key={imgIdx} 
                      className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer"
                    >
                      <img 
                        src={getImagePath(category.title, imgIdx)}
                        alt={`${category.title} - Image ${imgIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );

                  if (isFireRatedCategory) {
                    if (imgIdx === 0) {
                      return <Link key={imgIdx} to="/products/fire-rated-a1">{ImageCard}</Link>;
                    } else if (imgIdx === 1) {
                      return <Link key={imgIdx} to="/products/fire-rated-a2">{ImageCard}</Link>;
                    } else if (imgIdx === 2) {
                      return <Link key={imgIdx} to="/products/euroclass-b">{ImageCard}</Link>;
                    }
                  } else {
                    const slug = category.title.toLowerCase().replace(/\s+/g, '-');
                    return <Link key={imgIdx} to={`/products/${slug}/${imgIdx + 1}`}>{ImageCard}</Link>;
                  }

                  return ImageCard;
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Products;
