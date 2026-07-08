import ProductDetailTemplate from "@/components/sections/ProductDetailTemplate";

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE PATHS – change these to update images for Alubond A1
// ─────────────────────────────────────────────────────────────────────────────
const IMAGES = {
  mainLeft:      "/products/Product2.webp",      // Left diagram image (product overview tab)
  mainRight:     "/products/Products1.webp",      // Right image (product overview tab)
  featuresImg:   "/products/Products1.webp",      // Image shown in Features & Advantages tab

  // Technical Data – add or remove image paths here as needed
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
    Alubond A1 – Creating A Sustainable Future
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

const mainDescriptions = [
  <p key="d1">
    Alubond U.S.A is a metal composite panel consisting of two layers of a metallic skin like Aluminum,
    Stainless Steel, Copper, Zinc, Titanium etc., sandwiching a fire rated core in a continuous co-extrusion
    process. Alubond U.S.A is a registered brand of American Building Technologies located in Rockford Illinois
    with production bases in Europe, Middle East and India. Alubond U.S.A is committed to a sustainable future
    and is now available in three fire rated cores and an innovative eco friendly green core. Alubond U.S.A has
    emerged as The World's Largest ACP Brand with new expansions under progress in Russia, Saudi Arabia and
    Sri Lanka. The installed production capacity by June 2011 will be over 11,000,000m² with 10 production
    lines and two coil coating lines.
  </p>,
];

const dimensionText = (
  <>
    <span className="font-bold text-black">Panel Dimension</span> STANDARD WIDTH: 1250mm AVAILABLE WIDTH:
    1000mm, 1250mm, 1500mm STANDARD LENGTH: 3200mm, 4000mm AVAILABLE LENGTH: Custom order upto 11000mm
    AVAILABLE THICKNESS: 3mm, 4mm, 5mm, 6mm AVAILABLE SKIN THICKNES: 0.3mm - 0.5mm
    <br />
    <span className="text-xs">*Note: FR A1 Max Width 1500mm</span>
  </>
);

const toleranceText = (
  <>
    <span className="font-bold text-black">Panel Tolerance</span> LENGTH: + 4mm WIDTH: + 2mm THICKNESS:
    ± 0.2mm upto 4mm, ± 0.3mm upto 6mm BOW: (LENGTH AND OR WIDTH) Maximum 0.8% SQUARENESS: Maximum 5mm
    SKIN THICKNESS: As per International Standards
  </>
);

const advantagesText = (
  <>
    <span className="font-bold text-black">Alubond U.S.A Product Advantages</span>
    <br />
    LIGHTWEIGHT, yet extremely rigid and flat resulting in an economical option for high quality building
    facades and interior cladding. WEATHER RESISTANCE combined with high acoustics, Thermal and Fire Rated
    values. EXTENSIVE CHOICE of finishes including Solid, Metallic, Granite, Veneer, and Chameleon Colors.
    HIGHLY MALLEABLE gives flexibility of shapes making it a versatile panel to achieve complex design solutions.
  </>
);

const finishColorText = (
  <>
    <span className="font-bold text-black">Finish And Color</span> Alubond U.S.A, are four color types,
    Solid Colors, Metallic Colors, Sparkling Colors and Stone-wood Metal Series. All colors are fluorocarbon
    coating produced in our continuous coil coating line. Custom colors are also available for all finishes
    upon request subject to minimum quantity. Refer more details to our Color Chart.
  </>
);

const ProductDetailA1 = () => {
  return (
    <ProductDetailTemplate
      productName="Alubond A1"
      mainTitle="ALUBOND A1 - YOUR FIRE VACCINE"
      mainDescriptions={mainDescriptions}
      dimensionText={dimensionText}
      mainImageLeft={IMAGES.mainLeft}
      mainImageRight={IMAGES.mainRight}
      toleranceText={toleranceText}
      advantagesText={advantagesText}
      finishColorText={finishColorText}
      featuresTitle="ALUBOND A1 - Features"
      featuresText={featuresText}
      featuresImage={IMAGES.featuresImg}
      advantagesTabTitle="ALUBOND A1 - Advantages"
      technicalDataImages={IMAGES.technicalData}
    />
  );
};

export default ProductDetailA1;
