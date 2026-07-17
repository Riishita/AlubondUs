import ProductDetailTemplate from "@/components/sections/ProductDetailTemplate";


const IMAGES = {
  mainLeft:      "/products/Product EB 3.webp",  
  featuresImg:   "/products/Products1.webp",      

  technicalData: [
    "/products/cert1.webp",
    "/products/cert2.webp",
    "/products/cert3.webp",
    // "/products/cert4.webp",
    "/products/cert5.webp",
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

const featuresText = [
  <h2 key="h" className="text-xl md:text-2xl font-semibold text-gray-500 mb-4">
    Alubond Euroclass B – Creating A Sustainable Future
  </h2>,
  <p key="p1">
    Alubond U.S.A is a metal composite panel consisting of two layers of a metallic skin like Aluminum,
    Stainless Steel, Copper, Zinc, Titanium etc., sandwiching a fire rated core in a continuous co-extrusion process.
  </p>,
  <p key="p2">
    Alubond U.S.A is a registered brand of American Building Technologies located in Rockford Illinois with
    production bases in Europe, Middle East and India. Alubond U.S.A is committed to a sustainable future and
    is now available in three fire rated cores and an innovative eco friendly green core.
  </p>,
  <p key="p3">
    Alubond U.S.A has emerged as The World's Largest ACP Brand with new expansions under progress in Russia,
    Saudi Arabia and Sri Lanka. The installed production capacity by June 2011 will be over 11,000,000m² with
    10 production lines and two coil coating lines.
  </p>,
];

const ProductDetailEuroclassB = () => {
  return (
    <ProductDetailTemplate
      productName="Alubond Euroclass B"
      mainTitle="Alubond Euroclass B"
      mainDescriptions={[]}
      mainImageLeft={IMAGES.mainLeft}
      featuresTitle="Alubond Euroclass B - Features"
      featuresText={featuresText}
      featuresImage={IMAGES.featuresImg}
      advantagesTabTitle="Alubond Euroclass B - Advantages"
      technicalDataImages={IMAGES.technicalData}
    />
  );
};

export default ProductDetailEuroclassB;
