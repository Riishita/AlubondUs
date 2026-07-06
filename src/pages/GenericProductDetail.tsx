import { useParams } from "react-router-dom";
import ProductDetailTemplate from "@/components/sections/ProductDetailTemplate";

// A1 / Default Features & Advantages
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

const technicalDataImages = Array.from({ length: 5 }).map((_, idx) => `https://picsum.photos/seed/techdata${idx}/500/700`);

const GenericProductDetail = () => {
  const { categorySlug, id } = useParams();

  let productName = "";
  let mainTitle = "";
  let mainDescriptions = defaultMainDescriptions;
  let dimensionText = defaultDimensionText;
  let toleranceText = defaultToleranceText;
  let advantagesText = defaultAdvantagesText;
  let finishColorText = defaultFinishColorText;
  let mainImageLeft = "https://picsum.photos/seed/a1diagram1/800/600";
  let mainImageRight: string | undefined = "https://picsum.photos/seed/a1diagram2/600/400";
  let featuresText = defaultFeaturesText;
  let featuresImage = "https://picsum.photos/seed/a1diagram2/600/400";

  let mainGalleryImages: string[] | undefined = undefined;

  // Category: FACADE SYSTEMS
  if (categorySlug === 'facade-systems') {
    if (id === '1') productName = "Rainscreen System";
    else if (id === '2') productName = "Silicon Free Open Groove NFPA285";
    else if (id === '3') productName = "120mins Rated Fire Wall";
    else productName = `Facade Systems - Item ${id}`;
    
    mainTitle = productName.toUpperCase();
    mainImageLeft = `/products/FACADE SYSTEMS ${id}.jpg`;
  } 
  // Category: CORPORATE IDENTITY
  else if (categorySlug === 'corporate-identity') {
    if (id === '1') productName = "Signage And Lighting";
    else if (id === '2') productName = "Facade Lighting";
    else productName = `Corporate Identity - Item ${id}`;
    
    mainTitle = productName.toUpperCase();
    mainImageLeft = `/products/CORPORATE IDENTITY ${id}.jpg`;
  } 
  // Category: EXOTIC FINISHES
  else if (categorySlug === 'exotic-finishes') {
    if (id === '1') {
      productName = "Alubond Solid";
      mainTitle = "ALUBOND SOLID";
      mainDescriptions = [
        <p key="solid-1">
          Alubond U.S.A SOLID is the latest offering in high performance solid aluminum panel technology set to cater to the designer requirements of modern architectural façades. Alubond U.S.A SOLID is a Class A1 Non Combustible material and hence suitable in all Fire Rated Applications. Alubond's unique continuous coil coating process and choice of high strength alloys like 3003 and 5005 series has given a new performance dimension to the use of solid aluminum in Architectural Façades and Solid Metal Applications.
        </p>,
        <p key="solid-2">
          With a wide range of selection in PVDF coatings and Innovative Thermal Reflective Solar Cool Coatings, Alubond U.S.A SOLID offers aluminum panels of thickness 2mm & 3mm with the following attributes:
          <br/>- Economical as compared to previous coated solid aluminum panels
          <br/>- Perfectly flat façade panel
          <br/>- Available in 3000 & 5000 alloy series
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
          <br/>EXTENSIVE CHOICE: of finishes including Metallic, Granite & Veneer
          <br/>HIGHLY MALLEABLE: High product flexibility, The panel can be fabricated into complex shapes and designs allowing the panel to have versatile applications.
          <br/>100% RECYCLABLE: Giving the building a high post usage value
          <br/>ALUBOND U.S.A SOLID GREEN: Made using 75% Post Consumer Recycled content.
        </>
      );
      advantagesText = undefined;
      finishColorText = undefined;
      mainImageLeft = `/products/EXOTIC FINISHES ${id}.jpg`;
      mainImageRight = "https://picsum.photos/seed/solidright/600/400";
    } 
    else if (id === '3') {
      productName = "Alubond Solar";
      mainTitle = "ALUBOND SOLAR COLLECTOR MIRROR";
      mainDescriptions = [
        <p key="solar-1">
          Alubond Solar Collector Mirror (ASCM) is a result of pioneering research in metal composite technology. Alubond U.S.A brings this innovation to CSP and CPV systems that is superior to the conventional glass mirror technology being currently used which is heavy, expensive and highly breakable. The ASCM is a unique worldwide patented composite panel, sandwiching a high durable exterior grade core between two layers of metal skin. The ASCM is light weight, features phenomenal flatness which retains its shape and comes with low maintenance. This translates into easier handling, packaging, and shipping. The ASCM requires minimum support structure assembly thereby maximizing ease of installation and fabrication. This results in cost saving in assembly of solar units. ASCM is designed to provide high reflectivity along with rigidity to take and retain parabolic shapes. ASCM's have high reflectance ranging from 91% to 95%, strong weather and corrosion resistance, longevity and adhesion properties that provide an advanced alternative to the glass mirror technology.
        </p>
      ];
      mainGalleryImages = Array.from({ length: 5 }).map((_, idx) => `https://picsum.photos/seed/solar${idx}/400/300`);
      mainImageLeft = `/products/EXOTIC FINISHES ${id}.jpg`;
      mainImageRight = undefined;
      dimensionText = undefined;
      toleranceText = undefined;
      advantagesText = undefined;
      finishColorText = undefined;
    } 
    else if (id === '7') {
      productName = "Alubond Zinc";
      mainTitle = "ALUBOND ZINC";
      mainDescriptions = [
        <p key="zinc-1">
          Alubond Zinc sheets provide a premium and natural metallic aesthetic. Here is the technical sheet view:
        </p>
      ];
      // Zinc needs a single large A5 sheet image layout on the main page.
      mainImageLeft = `/products/EXOTIC FINISHES ${id}.jpg`;
      mainImageRight = undefined;
      dimensionText = undefined;
      toleranceText = undefined;
      advantagesText = undefined;
      finishColorText = undefined;
    } 
    else {
      // Items 2, 4, 5, 6, 8 share the Stainless Steel layout (4 gallery images)
      if (id === '2') {
        productName = "Alubond Stainless Steel";
        mainTitle = "STAINLESS STEEL COMPOSITE PANELS";
      } else if (id === '4') {
        productName = "Alubond Anodized Finish";
        mainTitle = "ALUBOND ANODIZED FINISH";
      } else if (id === '5') {
        productName = "Alubond Mirror";
        mainTitle = "ALUBOND MIRROR";
      } else if (id === '6') {
        productName = "Alubond Stone & Wood Finish";
        mainTitle = "ALUBOND STONE & WOOD FINISH";
      } else if (id === '8') {
        productName = "Alubond Prismatic Colours";
        mainTitle = "ALUBOND PRISMATIC COLOURS";
      }

      mainDescriptions = [
        <p key="ss-1">
        Alubond Solar Collector Mirror (ASCM) is a result of pioneering research in metal composite technology. 
        Alubond USA brings this innovation to CSP and CPV systems that is superior to the conventional glass mirror 
        technology being currently used which is heavy, expensive and highly breakable. 
        The ASCM is a unique worldwide patented composite panel, sandwiching a high durable exterior grade 
        core between two layers of metal skin. the ASCM is light weight, features phenomenal flatness which
         retains its shape and comes with low maintenance. This translates in to easier handling, packaging 
         and shipping The ASCM requires minimum support structure assembly thereby maximizing ease of installation and fabrication. 
         This results in cost saving in assembly of solar units. ASCM is designed to provide high reflectivity 
         along with rigidity to take and retain parabolic shapes. ASCM’s have high reflectance ranging from 91% to
          95%, strong weather and corrosion resistance, longevity and adhesion properties that provide an advanced 
          alternative to the glass mirror technology.
                </p>,
      ];
      mainGalleryImages = Array.from({ length: 4 }).map((_, idx) => `https://picsum.photos/seed/ssgallery${id}${idx}/400/400`);
      dimensionText = undefined;
      toleranceText = undefined;
      advantagesText = undefined;
      finishColorText = undefined;
      mainImageLeft = `/products/EXOTIC FINISHES ${id}.jpg`;
      mainImageRight = undefined;
    }
  } 
  // Fallback
  else {
    const categoryName = categorySlug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Product';
    productName = `${categoryName} - Item ${id}`;
    mainTitle = productName.toUpperCase();
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
    />
  );
};

export default GenericProductDetail;
