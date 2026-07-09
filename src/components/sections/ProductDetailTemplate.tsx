import { useEffect, useState, ReactNode } from "react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
import { Link } from "react-router-dom";

export interface ProductDetailTemplateProps {
  productName: string;
  mainTitle: string;
  mainDescriptions: ReactNode[];
  dimensionText?: ReactNode;
  mainGalleryImages?: string[];
  mainImageLeft: string;
  mainImageRight?: string;
  toleranceText?: ReactNode;
  advantagesText?: ReactNode;
  finishColorText?: ReactNode;
  featuresTitle: string;
  featuresText: ReactNode[];
  featuresImage: string;
  advantagesTabTitle: string;
  technicalDataImages: string[];
  /** When true: text is full-width and image is larger, centred below the text */
  singleColumnLayout?: boolean;
}

const ProductDetailTemplate = (props: ProductDetailTemplateProps) => {
  const tabs = [props.productName, "Features", "Technical Data", "Advantages"];
  const [activeTab, setActiveTab] = useState(props.productName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link to="/products" className="text-gray-500 hover:text-black transition-colors text-sm font-medium flex items-center gap-2 w-fit">
              <span>←</span> Back to Products
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-12 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[150px] py-4 text-center font-medium text-sm transition-colors border-b-2 whitespace-nowrap px-4 ${
                  activeTab === tab
                    ? "border-[#0a4b7c] text-[#0a4b7c]"
                    : "border-transparent text-gray-500 hover:text-black hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="min-h-[50vh]">
            {activeTab === props.productName && (
              <div className="flex flex-col gap-16 animate-in fade-in duration-500">
                {/* Optional Gallery */}
                {props.mainGalleryImages && props.mainGalleryImages.length > 0 && (
                  <div className="flex flex-row overflow-x-auto gap-4 hide-scrollbar">
                    {props.mainGalleryImages.map((imgSrc, idx) => (
                      <div key={idx} className="flex-1 min-w-[200px]">
                        <img
                          src={imgSrc}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-auto object-cover aspect-video"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Single-column layout (Exotic Finishes cards 2-8) ── */}
                {props.singleColumnLayout ? (
                  <div className="flex flex-col gap-10">
                    {/* Title */}
                    <div>
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semi-bold tracking-tight text-[#1a1a1a] mb-2 uppercase">
                        {props.mainTitle}
                      </h1>
                      <div className="w-32 h-1 bg-[#0a4b7c]"></div>
                    </div>

                    {/* Full-width text */}
                    <div className="w-full text-gray-600 font-medium text-sm md:text-base leading-relaxed space-y-4">
                      {props.mainDescriptions.map((desc, idx) => (
                        <div key={idx}>{desc}</div>
                      ))}
                      {props.dimensionText && <p>{props.dimensionText}</p>}
                      {props.toleranceText  && <p>{props.toleranceText}</p>}
                      {props.advantagesText && <p>{props.advantagesText}</p>}
                      {props.finishColorText && <p>{props.finishColorText}</p>}
                    </div>

                    {/* Image — larger and centred below */}
                    <div className="w-full flex justify-center mt-6">
                      <img
                        src={props.mainImageLeft}
                        alt={`${props.productName} Diagram`}
                        className="w-full max-w-3xl h-auto object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  /* ── Default two-column layout ── */
                  <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-8">
                      <div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semi-bold tracking-tight text-[#1a1a1a] mb-2 uppercase">
                          {props.mainTitle}
                        </h1>
                        <div className="w-32 h-1 bg-[#0a4b7c]"></div>
                      </div>

                      <div className="text-gray-600 font-medium text-sm md:text-base leading-relaxed space-y-4">
                        {props.mainDescriptions.map((desc, idx) => (
                          <div key={idx}>{desc}</div>
                        ))}
                        {props.dimensionText && (
                          <p>{props.dimensionText}</p>
                        )}
                      </div>

                      <div className="w-full mt-4 flex items-center justify-center p-4">
                        <img
                          src={props.mainImageLeft}
                          alt={`${props.productName} Diagram`}
                          className="w-full h-auto object-contain max-w-lg"
                        />
                      </div>
                    </div>

                    {/* Right Column (Optional based on data) */}
                    <div className="flex-1 flex flex-col gap-12 pt-8 lg:pt-32">
                      {props.mainImageRight && (
                        <div className="w-full flex justify-center lg:justify-start">
                          <img
                            src={props.mainImageRight}
                            alt={`${props.productName} Core Types`}
                            className="w-full h-auto object-contain max-w-sm"
                          />
                        </div>
                      )}

                      <div className="text-gray-600 font-medium text-sm md:text-base leading-relaxed space-y-8">
                        {props.toleranceText  && <p>{props.toleranceText}</p>}
                        {props.advantagesText && <p>{props.advantagesText}</p>}
                        {props.finishColorText && <p>{props.finishColorText}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Features" && (
              <div className="flex flex-col gap-12 animate-in fade-in duration-500">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semi-bold tracking-tight text-[#1a1a1a] mb-2">
                    {props.featuresTitle}
                  </h1>
                  <div className="w-32 h-1 bg-[#0a4b7c]"></div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 flex justify-center lg:justify-start">
                    <img 
                      src={props.featuresImage} 
                      alt="Features Diagram" 
                      className="w-full h-auto object-contain max-w-md"
                    />
                  </div>
                  <div className="flex-1 text-gray-600 font-medium text-sm md:text-base leading-relaxed space-y-4">
                    {props.featuresText.map((text, idx) => (
                      <div key={idx}>{text}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Technical Data" && (
              <div className="flex flex-col gap-12 animate-in fade-in duration-500">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semi-bold tracking-tight text-[#1a1a1a] mb-2">
                    Technical Data
                  </h1>
                  <div className="w-32 h-1 bg-[#0a4b7c]"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {props.technicalDataImages.map((src, idx) => (
                    <div key={idx} className="w-full bg-white  overflow-hidden shadow-sm border border-gray-100">
                      <img 
                        src={src}
                        alt={`Technical Data ${idx + 1}`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Advantages" && (
              <div className="flex flex-col gap-12 animate-in fade-in duration-500">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semi-bold tracking-tight text-[#1a1a1a] mb-2">
                    {props.advantagesTabTitle}
                  </h1>
                  <div className="w-32 h-1 bg-[#0a4b7c]"></div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="flex-1 flex justify-center lg:justify-start">
                    <img 
                      src={props.featuresImage} 
                      alt="Advantages Diagram" 
                      className="w-full h-auto object-contain max-w-md"
                    />
                  </div>
                  <div className="flex-1 text-gray-600 font-medium text-sm md:text-base leading-relaxed space-y-4">
                    {props.featuresText.map((text, idx) => (
                      <div key={idx}>{text}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ProductDetailTemplate;
