import { useParams } from "react-router-dom";
import ProductDetailTemplate from "@/components/sections/ProductDetailTemplate";

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE PATHS — change only the value on the right to swap an image.
// All files live in /public/products/
// ─────────────────────────────────────────────────────────────────────────────

// ── EXOTIC FINISHES ──────────────────────────────────────────────────────────
// To swap a main image change the `main` / `mainRight` value.
// To add / remove Technical Data images, edit the `technicalData` array for that card.
const IMAGES_EXOTIC_FINISHES = {
  card1: {
    main:          "/products/ALUBOND SOLID2.webp",   // left hero image
    mainRight:     "/products/ALUBOND SOLID.webp",    // right hero image
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
  card2: {
    main:          "/products/EXOTIC FINISHES 2.jpg", // Alubond Stainless Steel
    technicalData: [
      "/products/stainless.webp",
    ],
  },
  card3: {
    main:          "/products/EXOTIC FINISHES 3.jpg", // Alubond Solar
    technicalData: [
      "/products/cert1.webp",
    ],
  },
  card4: {
    main:          "/products/EXOTIC FINISHES 4.jpg", // Alubond Anodized Finish
    technicalData: [
      "/products/cert1.webp",
    ],
  },
  card5: {
    main:          "/products/EXOTIC FINISHES 5.jpg", // Alubond Mirror
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
      
    ],
  },
  card6: {
    main:          "/products/EXOTIC FINISHES 6.jpg", // Alubond Stone & Wood Finish
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
  card7: {
    main:          "/products/EXOTIC FINISHES 7.jpg", // Alubond Zinc
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
  card8: {
    main:          "/products/EXOTIC FINISHES 8.jpg", // Alubond Prismatic Colours
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
};

// ── CORPORATE IDENTITY ────────────────────────────────────────────────────────
const IMAGES_CORPORATE_IDENTITY = {
  card1: {
    main:          "/products/CORPORATE IDENTITY 1.jpg", // Signage And Lighting
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
  card2: {
    main:          "/products/CORPORATE IDENTITY 2.jpg", // Facade Lighting
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
};

// ── FACADE SYSTEMS ────────────────────────────────────────────────────────────
const IMAGES_FACADE_SYSTEMS = {
  card1: {
    main:          "/products/FACADE SYSTEMS 1.jpg", // Rainscreen System
    technicalData: [
     "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
  card2: {
    main:          "/products/FACADE SYSTEMS 2.jpg", // Silicon Free Open Groove NFPA285
    technicalData: [
     "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
  card3: {
    main:          "/products/FACADE SYSTEMS 3.jpg", // 120mins Rated Fire Wall
    technicalData: [
      "/products/cert1.webp",
      "/products/cert2.webp",
      "/products/cert3.webp",
      "/products/cert5.webp",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT / SHARED CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const defaultFeaturesText = [
  <h2 key="h" className="text-xl md:text-2xl font-bold text-gray-500 mb-4">Creating A Sustainable Future</h2>,
  <p key="p1">
    Alubond U.S.A is a metal composite panel consisting of two layers of a metallic skin like Aluminum, Stainless Steel, Copper, Zinc, Titanium etc., sandwiching a fire rated core in a continuous co-extrusion process.
  </p>,
  <p key="p2">
    Alubond U.S.A is a registered brand of American Building Technologies located in Rockford Illinois with production bases in Europe, Middle East and India. Alubond U.S.A is committed to a sustainable future and is now available in three fire rated cores and an innovative eco friendly green core.
  </p>,
  <p key="p3">
    Alubond U.S.A has emerged as The World's Largest ACP Brand with new expansions under progress in Russia, Saudi Arabia and Sri Lanka. The installed production capacity by June 2011 will be over 11,000,000m² with 10 production lines and two coil coating lines.
  </p>
];

const defaultMainDescriptions = [
  <p key="d1">
    Alubond U.S.A is a metal composite panel consisting of two layers of a metallic skin like Aluminum, Stainless Steel, Copper, Zinc, Titanium etc., sandwiching a fire rated core in a continuous co-extrusion process. Alubond U.S.A is a registered brand of American Building Technologies located in Rockford Illinois with production bases in Europe, Middle East and India. Alubond U.S.A is committed to a sustainable future and is now available in three fire rated cores and an innovative eco friendly green core. Alubond U.S.A has emerged as The World's Largest ACP Brand with new expansions under progress in Russia, Saudi Arabia and Sri Lanka. The installed production capacity by June 2011 will be over 11,000,000m² with 10 production lines and two coil coating lines.
  </p>
];

const defaultDimensionText = (
  <>
    <span className="font-bold text-black">Panel Dimension</span> STANDARD WIDTH: 1250mm AVAILABLE WIDTH: 1000mm, 1250mm, 1500mm STANDARD LENGTH: 3200mm, 4000mm AVAILABLE LENGTH: Custom order upto 11000mm AVAILABLE THICKNESS: 3mm, 4mm, 5mm, 6mm AVAILABLE SKIN THICKNES: 0.3mm - 0.5mm
    <br/>
    <span className="text-xs">*Note: FR A1 Max Width 1500mm</span>
  </>
);

const defaultToleranceText = (
  <>
    <span className="font-bold text-black">Panel Tolerance</span> LENGTH: + 4mm WIDTH: + 2mm THICKNESS: ± 0.2mm upto 4mm, ± 0.3mm upto 6mm BOW: (LENGTH AND OR WIDTH) Maximum 0.8% SQUARENESS: Maximum 5mm SKIN THICKNESS: As per International Standards
  </>
);

const defaultAdvantagesText = (
  <>
    <span className="font-bold text-black">Alubond U.S.A Product Advantages</span>
    <br />
    LIGHTWEIGHT, yet extremely rigid and flat resulting in an economical option for high quality building facades and interior cladding. WEATHER RESISTANCE combined with high acoustics, Thermal and Fire Rated values. EXTENSIVE CHOICE of finishes including Solid, Metallic, Granite, Veneer, and Chameleon Colors. HIGHLY MALLEABLE gives flexibility of shapes making it a versatile panel to achieve complex design solutions.
  </>
);

const defaultFinishColorText = (
  <>
    <span className="font-bold text-black">Finish And Color</span> Alubond U.S.A, are four color types, Solid Colors, Metallic Colors, Sparkling Colors and Stone-wood Metal Series. All colors are fluorocarbon coating produced in our continuous coil coating line. Custom colors are also available for all finishes upon request subject to minimum quantity. Refer more details to our Color Chart.
  </>
);

// technicalDataImages is now set per-card inside the component below.

// ─────────────────────────────────────────────────────────────────────────────

const GenericProductDetail = () => {
  const { categorySlug, id } = useParams();

  let productName = "";
  let mainTitle = "";
  let mainDescriptions = defaultMainDescriptions;
  let dimensionText = defaultDimensionText;
  let toleranceText = defaultToleranceText;
  let advantagesText = defaultAdvantagesText;
  let finishColorText = defaultFinishColorText;
  let mainImageLeft = "/products/Product2.webp";
  let mainImageRight: string | undefined = "/products/Products1.webp";
  let featuresText = defaultFeaturesText;
  let featuresImage = "/products/Products1.webp";
  let mainGalleryImages: string[] | undefined = undefined;
  let technicalDataImages: string[] = []; // populated per-card below
  // true for Exotic Finishes cards 2-8: full-width text + larger centred image
  let singleColumnLayout = false;

  // ── FACADE SYSTEMS ──────────────────────────────────────────────────────────
  if (categorySlug === "facade-systems") {
    if      (id === "1") productName = "Rainscreen System";
    else if (id === "2") productName = "Silicon Free Open Groove NFPA285";
    else if (id === "3") productName = "120mins Rated Fire Wall";
    else                 productName = `Facade Systems - Item ${id}`;

    mainTitle = productName.toUpperCase();

    if (id === "1") {
      mainImageLeft       = "/products/Product2.webp";
      technicalDataImages = IMAGES_FACADE_SYSTEMS.card1.technicalData;
    } else if (id === "2") {
      mainImageLeft       = "/products/Product2.webp";
      technicalDataImages = IMAGES_FACADE_SYSTEMS.card2.technicalData;
    } else if (id === "3") {
      mainImageLeft       = "/products/Product2.webp";
      technicalDataImages = IMAGES_FACADE_SYSTEMS.card3.technicalData;
    }
  }

  // ── CORPORATE IDENTITY ──────────────────────────────────────────────────────
  else if (categorySlug === "corporate-identity") {
    if      (id === "1") productName = "Signage And Lighting";
    else if (id === "2") productName = "Facade Lighting";
    else                 productName = `Corporate Identity - Item ${id}`;

    mainTitle = productName.toUpperCase();

    if (id === "1") {
      mainImageLeft       = "/products/Product2.webp";
      technicalDataImages = IMAGES_CORPORATE_IDENTITY.card1.technicalData;
    } else if (id === "2") {
      mainImageLeft       = "/products/Product2.webp";
      technicalDataImages = IMAGES_CORPORATE_IDENTITY.card2.technicalData;
    }
  }

  // ── EXOTIC FINISHES ─────────────────────────────────────────────────────────
  else if (categorySlug === "exotic-finishes") {

    // Card 1 – Alubond Solid
    if (id === "1") {
      productName   = "Alubond Solid";
      mainTitle     = "ALUBOND SOLID";
      mainImageLeft       = IMAGES_EXOTIC_FINISHES.card1.main;
      mainImageRight      = IMAGES_EXOTIC_FINISHES.card1.mainRight;
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card1.technicalData;
      mainDescriptions = [
        <p key="solid-1">
          Alubond U.S.A SOLID is the latest offering in high performance solid aluminum panel technology set to cater to the designer requirements of modern architectural façades. Alubond U.S.A SOLID is a Class A1 Non Combustible material and hence suitable in all Fire Rated Applications. Alubond's unique continuous coil coating process and choice of high strength alloys like 3003 and 5005 series has given a new performance dimension to the use of solid aluminum in Architectural Façades and Solid Metal Applications.
        </p>,
        <p key="solid-2">
          With a wide range of selection in PVDF coatings and Innovative Thermal Reflective Solar Cool Coatings, Alubond U.S.A SOLID offers aluminum panels of thickness 2mm &amp; 3mm with the following attributes:
          <br/>- Economical as compared to previous coated solid aluminum panels
          <br/>- Perfectly flat façade panel
          <br/>- Available in 3000 &amp; 5000 alloy series
          <br/>- PVDF/PUPA/Solar Cool Coating applied in 2, 3 or 4 coats
          <br/>- In line with Alubond U.S.A world class quality standards
          <br/>- 100% Recyclable and qualifies for LEED certified green buildings.
        </p>
      ];
      dimensionText = (
        <>
          <span className="font-bold text-black">Applications</span>
          <br/>Alubond U.S.A SOLID's array of colors and finishes combined with the inherent capability of forming different shapes and contours combined with durability and weather resistance makes Alubond U.S.A SOLID an Architect's Dream! Major Corporations and Multinational Companies have a definitive desire to make their structures an expression of a Personal Designer Statement. Alubond U.S.A becomes a natural choice to achieve this objective. The possible applications are limited only to the Architect's imagination...
          <br/>Common applications of Alubond U.S.A SOLID are:
          <br/>- Circular Columns
          <br/>- Building Façades
          <br/>- Wall Paneling Concepts
          <br/>- Soffits and Beams
          <br/>- Metal Ceilings and Partitions.
        </>
      );
      toleranceText = (
        <>
          <span className="font-bold text-black">Advantages</span>
          <br/>LIGHT WEIGHT: yet extremely rigid and flat resulting in an economical option for high quality building façades and interior cladding.
          <br/>WEATHER RESISTANCE: Combined with high Acoustics and thermal values
          <br/>NON COMBUSTIBLE: High fire rating value, Class A1
          <br/>EXTENSIVE CHOICE: of finishes including Metallic, Granite &amp; Veneer
          <br/>HIGHLY MALLEABLE: High product flexibility, The panel can be fabricated into complex shapes and designs allowing the panel to have versatile applications.
          <br/>100% RECYCLABLE: Giving the building a high post usage value
          <br/>ALUBOND U.S.A SOLID GREEN: Made using 75% Post Consumer Recycled content.
        </>
      );
      advantagesText    = undefined;
      finishColorText   = undefined;
    }

    // Card 2 – Alubond Stainless Steel
    else if (id === "2") {
      singleColumnLayout = true;
      productName    = "Alubond Stainless Steel";
      mainTitle      = "STAINLESS STEEL COMPOSITE PANELS";
      mainImageLeft       = "/products/STAINLESS STEEL.webp";
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card2.technicalData;
      mainImageRight = undefined;
      mainDescriptions = [
        <p key="ss-1">
          Alubond U.S.A offers an option for stainless steel Composite Panels (SCP) using three type of coil finishes: Brushed Hairline, Dull and High Mirror. They are designed to provide sophisticated look to exterior and interior cladding, accenting natural beauty and metal shade of stainless steel. This composite also maintains flatness, rigidity combined with light weight and easy fabrication which are necessary features for advanced architectural and technical designs.

         <br />Material Composites

       Alubond U.S.A Stainless Steel Composite Panel is made of fire rated core, sandwiched between stainless steel sheets in grade 304 or 316 in thickness 0.3 mm. For exterior usage, top and bottom coils are both in stainlesssteel. For interior applications, economical options of aluminum, Aluzinc, Galvanized Steel as bottom skin in combination of stainless steel on the top is available.

<br />Material Specifications <br />

Core: Fire Rated<br />
Steel Aloy: 304, optional 316<br />
Skin Finishes: High Mirror, Brushed Hairline, Dull Finish<br />

Panel Dimension <br />
Widths: 980mm, 1200mm <br />
Lengths: Any length upto 6000mm<br />
Skin Thickness: 0.3 mm and 0.4mm
        </p>,
      ];
      mainGalleryImages =undefined;
      dimensionText   = undefined;
      toleranceText   = undefined;
      advantagesText  = undefined;
      finishColorText = undefined;
    }

    // Card 3 – Alubond Solar
    else if (id === "3") {
      singleColumnLayout = true;
      productName    = "Alubond Solar";
      mainTitle      = "ALUBOND SOLAR COLLECTOR MIRROR";
      mainImageLeft       = "/products/Solar Mirror.webp";
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card3.technicalData;
      mainImageRight = undefined;
      mainDescriptions = [
        <p key="solar-1">
          Alubond Solar Collector Mirror (ASCM) is a result of pioneering research in metal composite technology. Alubond U.S.A brings this innovation to CSP and CPV systems that is superior to the conventional glass mirror technology being currently used which is heavy, expensive and highly breakable. The ASCM is a unique worldwide patented composite panel, sandwiching a high durable exterior grade core between two layers of metal skin. The ASCM is light weight, features phenomenal flatness which retains its shape and comes with low maintenance. This translates into easier handling, packaging, and shipping. The ASCM requires minimum support structure assembly thereby maximizing ease of installation and fabrication. This results in cost saving in assembly of solar units. ASCM is designed to provide high reflectivity along with rigidity to take and retain parabolic shapes. ASCM's have high reflectance ranging from 91% to 95%, strong weather and corrosion resistance, longevity and adhesion properties that provide an advanced alternative to the glass mirror technology.
        </p>
      ];
      // mainGalleryImages = Array.from({ length: 5 }).map((_, idx) => `https://picsum.photos/seed/solar${idx}/400/300`);
      dimensionText   = undefined;
      toleranceText   = undefined;
      advantagesText  = undefined;
      finishColorText = undefined;
    }

    // Card 4 – Alubond Anodized Finish
    else if (id === "4") {
      singleColumnLayout = true;
      productName    = "Alubond Anodized Finish";
      mainTitle      = "ALUBOND ANODIZED FINISH";
      mainImageLeft       = "/products/Solar Mirror.webp";
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card4.technicalData;
      mainImageRight = undefined;
      dimensionText   = undefined;
      toleranceText   = undefined;
      advantagesText  = undefined;
      finishColorText = undefined;
    }

    // Card 5 – Alubond Mirror
    else if (id === "5") {
      singleColumnLayout = true;
      productName    = "Alubond Mirror";
      mainTitle      = "ALUBOND MIRROR";
      mainImageLeft       = "/products/Solar Mirror.webp";
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card5.technicalData;
      mainImageRight = undefined;
  
      dimensionText   = undefined;
      toleranceText   = undefined;
      advantagesText  = undefined;
      finishColorText = undefined;
    }

    // Card 6 – Alubond Stone & Wood Finish
    else if (id === "6") {
      singleColumnLayout = true;
      productName    = "Alubond Stone & Wood Finish";
      mainTitle      = "ALUBOND STONE & WOOD FINISH";
      mainImageLeft       = "/products/Solar Mirror.webp";
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card6.technicalData;
      mainImageRight = undefined;
      dimensionText   = undefined;
      toleranceText   = undefined;
      advantagesText  = undefined;
      finishColorText = undefined;
    }

    // Card 7 – Alubond Zinc
    else if (id === "7") {
      singleColumnLayout = true;
      productName    = "Alubond Zinc";
      mainTitle      = "ALUBOND ZINC";
      mainImageLeft       = "/products/AlubondZinc.webp";
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card7.technicalData;
      mainImageRight = undefined;
      mainDescriptions = [
        <p key="zinc-1">
          Alubond Zinc sheets provide a premium and natural metallic aesthetic. Here is the technical sheet view:
        </p>
      ];
      dimensionText   = undefined;
      toleranceText   = undefined;
      advantagesText  = undefined;
      finishColorText = undefined;
    }

    // Card 8 – Alubond Prismatic Colours
    else if (id === "8") {
      singleColumnLayout = true;
      productName    = "Alubond Prismatic Colours";
      mainTitle      = "ALUBOND PRISMATIC COLOURS";
      mainImageLeft       = "/products/Solar Mirror.webp";
      technicalDataImages = IMAGES_EXOTIC_FINISHES.card8.technicalData;
      mainImageRight = undefined;
      dimensionText   = undefined;
      toleranceText   = undefined;
      advantagesText  = undefined;
      finishColorText = undefined;
    }
  }

  // ── FALLBACK ────────────────────────────────────────────────────────────────
  else {
    const categoryName = categorySlug
      ?.split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || "Product";
    productName = `${categoryName} - Item ${id}`;
    mainTitle   = productName.toUpperCase();
  }

  return (
    <ProductDetailTemplate
      productName={productName}
      mainTitle={mainTitle}
      mainDescriptions={mainDescriptions}
      dimensionText={dimensionText}
      mainImageLeft={mainImageLeft}
      mainImageRight={mainImageRight}
      toleranceText={toleranceText}
      advantagesText={advantagesText}
      finishColorText={finishColorText}
      featuresTitle={`${productName} - Features`}
      featuresText={featuresText}
      featuresImage={featuresImage}
      advantagesTabTitle={`${productName} - Advantages`}
      technicalDataImages={technicalDataImages}
      mainGalleryImages={mainGalleryImages}
      singleColumnLayout={singleColumnLayout}
    />
  );
};

export default GenericProductDetail;
