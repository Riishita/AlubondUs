import { useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE PATHS — change only the value on the right to swap an image.
// All files live in /public/products/
// ─────────────────────────────────────────────────────────────────────────────

// ── FIRE RATED ALUMINIUM COMPOSITE PANELS ────────────────────────────────────
const IMAGES_FIRE_RATED = {
  card1: "/products/FIRE RATED ALUMINIUM COMPOSITE PANELS .avif",  // Alubond A1
  card2: "/products/FIRE RATED ALUMINIUM COMPOSITE PANELS 2.avif", // Alubond A2
  card3: "/products/FIRE RATED ALUMINIUM COMPOSITE PANELS 3.avif", // Alubond Euroclass B
};

// ── EXOTIC FINISHES ──────────────────────────────────────────────────────────
const IMAGES_EXOTIC_FINISHES = {
  card1: "/products/EXOTIC FINISHES 1.jpg",
  card2: "/products/EXOTIC FINISHES 3.jpg",
  card3: "/products/EXOTIC FINISHES 2.jpg",
  card4: "/products/EXOTIC FINISHES 4.jpg",
  card5: "/products/EXOTIC FINISHES 5.jpg",
  card6: "/products/EXOTIC FINISHES 6.jpg",
  card7: "/products/EXOTIC FINISHES 7.jpg",
  card8: "/products/EXOTIC FINISHES 8.jpg",
};

// ── CORPORATE IDENTITY ────────────────────────────────────────────────────────
const IMAGES_CORPORATE_IDENTITY = {
  card1: "/products/CORPORATE IDENTITY 1.jpg",
  card2: "/products/CORPORATE IDENTITY 2.jpg",
};

// ── FACADE SYSTEMS ────────────────────────────────────────────────────────────
const IMAGES_FACADE_SYSTEMS = {
  card1: "/products/FACADE SYSTEMS 1.jpg",
  card2: "/products/FACADE SYSTEMS 2.jpg",
  card3: "/products/FACADE SYSTEMS 3.jpg",
};

// ─────────────────────────────────────────────────────────────────────────────

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

          {/* ── FIRE RATED ALUMINIUM COMPOSITE PANELS ─────────────────────── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                FIRE RATED ALUMINIUM COMPOSITE PANELS
              </h2>
              <div className="w-24 h-1 bg-[#0a4b7c]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {/* Card 1 – Alubond A1 */}
              <Link to="/products/fire-rated-a1">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_FIRE_RATED.card1} alt="Alubond A1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 2 – Alubond A2 */}
              <Link to="/products/fire-rated-a2">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_FIRE_RATED.card2} alt="Alubond A2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 3 – Alubond Euroclass B */}
              <Link to="/products/euroclass-b">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_FIRE_RATED.card3} alt="Alubond Euroclass B" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

            </div>
          </div>

          {/* ── EXOTIC FINISHES ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                EXOTIC FINISHES
              </h2>
              <div className="w-24 h-1 bg-[#0a4b7c]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {/* Card 1 */}
              <Link to="/products/exotic-finishes/1">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card1} alt="Exotic Finishes 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 2 */}
              <Link to="/products/exotic-finishes/2">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card2} alt="Exotic Finishes 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 3 */}
              <Link to="/products/exotic-finishes/3">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card3} alt="Exotic Finishes 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 4 */}
              <Link to="/products/exotic-finishes/4">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card4} alt="Exotic Finishes 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 5 */}
              <Link to="/products/exotic-finishes/5">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card5} alt="Exotic Finishes 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 6 */}
              <Link to="/products/exotic-finishes/6">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card6} alt="Exotic Finishes 6" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 7 */}
              <Link to="/products/exotic-finishes/7">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card7} alt="Exotic Finishes 7" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 8 */}
              <Link to="/products/exotic-finishes/8">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_EXOTIC_FINISHES.card8} alt="Exotic Finishes 8" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

            </div>
          </div>

          {/* ── CORPORATE IDENTITY ────────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                CORPORATE IDENTITY
              </h2>
              <div className="w-24 h-1 bg-[#0a4b7c]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {/* Card 1 */}
              <Link to="/products/corporate-identity/1">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_CORPORATE_IDENTITY.card1} alt="Corporate Identity 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 2 */}
              <Link to="/products/corporate-identity/2">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_CORPORATE_IDENTITY.card2} alt="Corporate Identity 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

            </div>
          </div>

          {/* ── FACADE SYSTEMS ────────────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">
                FACADE SYSTEMS
              </h2>
              <div className="w-24 h-1 bg-[#0a4b7c]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

              {/* Card 1 */}
              <Link to="/products/facade-systems/1">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_FACADE_SYSTEMS.card1} alt="Facade Systems 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 2 */}
              <Link to="/products/facade-systems/2">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_FACADE_SYSTEMS.card2} alt="Facade Systems 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Card 3 */}
              <Link to="/products/facade-systems/3">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-md group relative cursor-pointer">
                  <img src={IMAGES_FACADE_SYSTEMS.card3} alt="Facade Systems 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

            </div>
          </div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Products;
