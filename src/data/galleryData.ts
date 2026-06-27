// ─── GALLERY DATA ──────────────────────────────────────────────────────────────
// Source: https://alubond-web-design.vercel.app/gallery.html
// Image paths use /Gallery/ prefix — replace with final images later.

export interface Project {
  id: number;
  name: string;
  location: string;
  region: string;
  type: string;
  finish: string;
  fireRated: boolean;
  featured: boolean;
  img: string;
  desc: string;
  tags: string[];
}

export interface GalleryCategory {
  id: string;
  name: string;
  img: string;
  count: number;
  filterKey: { field: "type" | "region" | "finish" | "featured"; value: string | boolean };
}

// ─── ALL PROJECTS (30 total) ──────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  { id: 1,  name: "JW Marriott Marina",         location: "Dubai, UAE",                region: "UAE",          type: "Hospitality",  finish: "Custom PVDF",   fireRated: true,  featured: true,  img: "/Gallery/Buildingtype2.avif",    desc: "A landmark hospitality tower on Dubai Marina clad in precision-engineered Alubond panels delivering fire-rated performance and visual impact across the full facade envelope.",    tags: ["Fire Rated", "High-Rise", "PVDF Coating"] },
  { id: 2,  name: "Hotel W Barcelona",           location: "Barcelona, Spain",          region: "Europe",       type: "Hospitality",  finish: "Custom Finish",  fireRated: true,  featured: true,  img: "/Gallery/Region3.avif",           desc: "The iconic sail-shaped Hotel W on the Barcelona waterfront — one of Alubond's most architecturally complex curved facade systems delivered to the global hospitality market.",      tags: ["Fire Rated", "Curved Facade", "Coastal", "Iconic"] },
  { id: 3,  name: "QIPCO Tower",                 location: "Doha, Qatar",               region: "GCC",          type: "Corporate",    finish: "Metallic",       fireRated: true,  featured: true,  img: "/Gallery/Region2.avif",           desc: "A prestige corporate tower in Doha's financial district featuring Alubond metallic panels delivering a reflective, premium facade aligned with the project's architectural language.", tags: ["Fire Rated", "Metallic", "High-Rise"] },
  { id: 4,  name: "NAC Municipal Building",      location: "Houthalen-Helchteren, BE",  region: "Europe",       type: "Public",       finish: "Solid",          fireRated: true,  featured: true,  img: "/Gallery/Buildingtype3.avif",     desc: "A civic landmark in Belgium where fire compliance, durability, and design integrity are equally non-negotiable — demonstrating Alubond's European public sector capability.",        tags: ["Fire Rated", "Public Sector", "Civic", "Belgium"] },
  { id: 5,  name: "Yas Marina Circuit",          location: "Abu Dhabi, UAE",            region: "UAE",          type: "Public",       finish: "Custom Finish",  fireRated: false, featured: true,  img: "/Gallery/Region1.avif",           desc: "Alubond panels form part of the spectacular facade envelope of the Yas Marina Circuit, one of Formula 1's most architecturally distinctive venues.",                               tags: ["Iconic Venue", "UAE", "Sports Infrastructure"] },
  { id: 6,  name: "Ferrari World Abu Dhabi",     location: "Abu Dhabi, UAE",            region: "UAE",          type: "Public",       finish: "Custom Finish",  fireRated: true,  featured: true,  img: "/Gallery/Buildingtype9.avif",     desc: "The world's largest indoor theme park — a vast red canopy where Alubond panels deliver the visual and structural performance demanded by this globally iconic project.",             tags: ["Fire Rated", "Landmark", "Custom Red PVDF", "UAE"] },
  { id: 7,  name: "Eindhoven Airport",           location: "Eindhoven, Netherlands",    region: "Europe",       type: "Transport",    finish: "Solid",          fireRated: true,  featured: false, img: "/Gallery/Buildingtype7.avif",     desc: "Terminal expansion featuring Alubond fire-rated panels meeting European aviation compliance standards while maintaining a clean, modern architectural expression.",                  tags: ["Fire Rated", "Aviation", "Transport"] },
  { id: 8,  name: "Tiara Tower",                 location: "Dubai, UAE",                region: "UAE",          type: "Residential",  finish: "Metallic",       fireRated: true,  featured: false, img: "/Gallery/BuildingType1.avif",     desc: "A residential high-rise on Sheikh Zayed Road clad with Alubond metallic panels delivering aesthetic sophistication and fire-rated facade performance for the luxury market.",       tags: ["Fire Rated", "Residential", "Metallic", "High-Rise"] },
  { id: 9,  name: "Aloft City Centre Deira",     location: "Dubai, UAE",                region: "UAE",          type: "Hospitality",  finish: "Custom Finish",  fireRated: true,  featured: false, img: "/Gallery/Buildingtype2-3.avif",     desc: "A contemporary hotel facade combining bold graphic color treatment with the fire-rated performance required for Dubai's hospitality sector.",                                         tags: ["Fire Rated", "Hotel", "Contemporary", "Color PVDF"] },
  { id: 10, name: "Elite Residences",            location: "Dubai Sports City, UAE",    region: "UAE",          type: "Residential",  finish: "Solid",          fireRated: true,  featured: false, img: "/Gallery/Buildingtype8.avif",     desc: "A residential development where Alubond-clad facades deliver a clean, crisp exterior with long-term durability and full fire rating compliance.",                                   tags: ["Fire Rated", "Residential", "UAE"] },
  { id: 11, name: "Hotel Holiday Inn Abu Dhabi", location: "Abu Dhabi, UAE",            region: "UAE",          type: "Hospitality",  finish: "Solid",          fireRated: true,  featured: false, img: "/Gallery/Buildingtype2-4.avif",     desc: "Holiday Inn Abu Dhabi's facade system supports the brand's global safety and design consistency requirements with Alubond fire-rated panels.",                                       tags: ["Fire Rated", "Hotel", "Abu Dhabi"] },
  { id: 12, name: "Zira Hotel Belgrade",         location: "Belgrade, Serbia",          region: "Europe",       type: "Hospitality",  finish: "Custom Finish",  fireRated: false, featured: false, img: "/Gallery/Buildingtype2-5.avif",     desc: "Zira Hotel in Belgrade's city centre — a premium hotel facade that anchors the building's contemporary identity in Serbia's capital.",                                              tags: ["Hospitality", "Belgrade", "Contemporary"] },
  { id: 13, name: "IN Hotel Belgrade",           location: "Belgrade, Serbia",          region: "Europe",       type: "Hospitality",  finish: "Metallic",       fireRated: false, featured: false, img: "/Gallery/Buildingtype2-6.avif",     desc: "A contemporary Belgrade hotel featuring Alubond metallic-series panels delivering a dynamic, light-reflective facade suited to its urban commercial context.",                      tags: ["Hotel", "Metallic Finish", "Serbia"] },
  { id: 14, name: "Porsche Building Belgrade",   location: "Belgrade, Serbia",          region: "Europe",       type: "Commercial",   finish: "Solid",          fireRated: false, featured: false, img: "/Gallery/Buildingtype4-13.avif",     desc: "Architect Goran Vojvodic's commercial facade where Alubond panels complement the building's precision-engineering brand identity in Belgrade.",                                      tags: ["Commercial", "Architectural", "Brand Identity"] },
  { id: 15, name: "Hotel Well Terme Tuhelj",     location: "Tuhelj, Croatia",           region: "Europe",       type: "Hospitality",  finish: "Custom Finish",  fireRated: false, featured: false, img: "/Gallery/Buildingtype2-7.avif",     desc: "A wellness and spa resort where Alubond panels provide a clean, organic material language consistent with the project's health and wellbeing positioning.",                         tags: ["Hospitality", "Wellness Resort", "Croatia"] },
  { id: 16, name: "King Cross Zagreb",           location: "Zagreb, Croatia",           region: "Europe",       type: "Commercial",   finish: "Metallic",       fireRated: false, featured: false, img: "/Gallery/Buildingtype5.avif",     desc: "Large-format retail and commercial development delivering visual consistency and material quality at significant scale in Croatia's capital.",                                        tags: ["Commercial", "Retail", "Large Format"] },
  { id: 17, name: "BAUHAUS Istanbul",            location: "Istanbul, Turkey",          region: "Europe",       type: "Commercial",   finish: "Solid",          fireRated: false, featured: false, img: "/Gallery/Buildingtype4-17.avif",     desc: "BAUHAUS Istanbul's large retail facility uses Alubond panels for durable, weather-resistant facade performance in Istanbul's demanding climate.",                                   tags: ["Commercial", "Retail", "Large Format", "Turkey"] },
  { id: 18, name: "ITU TEKNOKENT",               location: "Istanbul, Turkey",          region: "Europe",       type: "Education",    finish: "Solid",          fireRated: false, featured: false, img: "/Gallery/Buildingtype6.avif",     desc: "Istanbul Technical University's TEKNOKENT innovation campus — a world-class research environment with a contemporary, precision-engineered building envelope.",                    tags: ["Education", "Technology Campus", "Turkey"] },
  { id: 19, name: "BEA Cultural Centre",         location: "Olomouc, Czech Republic",   region: "Europe",       type: "Cultural",     finish: "Custom Finish",  fireRated: true,  featured: false, img: "/Gallery/Buildingtype3-4.avif",     desc: "A cultural and events facility where Alubond panels balance civic presence with material refinement meeting Czech Republic building regulation requirements.",                       tags: ["Cultural", "Events", "Fire Rated", "Czech Republic"] },
  { id: 20, name: "Franchi Marmi Offices",       location: "Carrara, Italy",            region: "Europe",       type: "Corporate",    finish: "Stone Series",   fireRated: false, featured: false, img: "/Gallery/colorsurface3.avif",     desc: "Stone-series panels complement Carrara's world-famous marble heritage, delivering material-appropriate facade aesthetics with aluminium composite performance.",                    tags: ["Corporate", "Stone Series", "Italy", "Marble Region"] },
  { id: 21, name: "MINEC Office Building",       location: "Vimodrone, Italy",          region: "Europe",       type: "Corporate",    finish: "Solid",          fireRated: false, featured: false, img: "/Gallery/Buildingtype1-3.avif",     desc: "A clean, contemporary corporate envelope in the demanding Italian architectural market delivering high finish quality near Milan.",                                                  tags: ["Corporate", "Milan Region", "Italy"] },
  { id: 22, name: "Sipam Autotorino",            location: "Italy",                     region: "Europe",       type: "Industrial",   finish: "Solid",          fireRated: false, featured: false, img: "/Gallery/Buildingtype10.avif",    desc: "A precision-detailed automotive commercial facility where Alubond panels reflect the brand identity of the automotive sector with a technically resolved facade system.",          tags: ["Industrial", "Automotive", "Italy"] },
  { id: 23, name: "Ijburg College",              location: "Amsterdam, Netherlands",    region: "Europe",       type: "Education",    finish: "Solid",          fireRated: true,  featured: false, img: "/Gallery/Buildingtype4-24.avif",     desc: "A bold, colourful educational facility facade meeting Dutch building regulations — demonstrating Alubond's capability in European education sector projects.",                     tags: ["Education", "Fire Rated", "Netherlands"] },
  { id: 24, name: "Kineum Building",             location: "Gothenburg, Sweden",        region: "Europe",       type: "Corporate",    finish: "Metallic",       fireRated: true,  featured: false, img: "/Gallery/Buildingtype1-4.avif",     desc: "Metallic-series panels delivering a sophisticated, light-responsive facade system in Scandinavia's premium corporate architecture sector.",                                         tags: ["Corporate", "Fire Rated", "Metallic", "Scandinavia"] },
  { id: 25, name: "MD Entertainment HQ",         location: "Jakarta, Indonesia",        region: "Asia",         type: "Commercial",   finish: "Custom Finish",  fireRated: false, featured: false, img: "/Gallery/Region4.avif",           desc: "A distinctive, brand-aligned corporate facade in Indonesia's competitive commercial development market.",                                                                           tags: ["Commercial", "HQ Building", "Indonesia"] },
  { id: 26, name: "Belvedere BC",                location: "British Columbia, Canada",  region: "North America", type: "Residential", finish: "Solid",          fireRated: true,  featured: false, img: "/Gallery/Region5.avif",           desc: "Fire-rated panels delivering durable, weather-resistant facade performance suited to Canada's challenging climate conditions.",                                                      tags: ["Residential", "Fire Rated", "Canada"] },
  { id: 27, name: "Delta City",                  location: "Eastern Europe",            region: "Europe",       type: "Commercial",   finish: "Metallic",       fireRated: false, featured: false, img: "/Gallery/Buildingtype4-28.avif",     desc: "Large-format shopping and commercial complex demonstrating Alubond's cladding capability across major retail destinations in Eastern European markets.",                             tags: ["Commercial", "Retail", "Large Format"] },
  { id: 28, name: "Red Stripe Building",         location: "Belgrade, Serbia",          region: "Europe",       type: "Commercial",   finish: "Custom Finish",  fireRated: false, featured: false, img: "/Gallery/Buildingtype4-29.avif",     desc: "An architecturally distinctive banded facade composition creating immediate visual identity in its Belgrade urban context.",                                                         tags: ["Commercial", "Custom Design", "Visual Identity"] },
  { id: 29, name: "Vietnam Commercial",          location: "Vietnam",                   region: "Asia",         type: "Commercial",   finish: "Solid",          fireRated: false, featured: false, img: "/Gallery/Buildingtype4-30.avif",           desc: "A commercial development representing Alubond's growing presence across Southeast Asia's expanding architectural and construction sector.",                                          tags: ["Commercial", "Southeast Asia", "Vietnam"] },
  { id: 30, name: "Hungary Development",         location: "Hungary",                   region: "Europe",       type: "Commercial",   finish: "Solid",          fireRated: false, featured: false, img: "/Gallery/Buildingtype4-31.avif",     desc: "A commercial building project showcasing Alubond's reach across Central European markets with consistent quality and technical performance.",                                       tags: ["Commercial", "Central Europe", "Hungary"] },
];

// ─── BUILDING TYPES (10 subcategories) ───────────────────────────────────────

export const BUILDING_TYPES: GalleryCategory[] = [
  { id: "corporate",    name: "Corporate HQ & Offices",      img: "/Gallery/BuildingType1.avif",  count: 5,  filterKey: { field: "type", value: "Corporate" } },
  { id: "hospitality",  name: "Hotels & Hospitality",         img: "/Gallery/Buildingtype2.avif",  count: 8,  filterKey: { field: "type", value: "Hospitality" } },
  { id: "cultural",     name: "Cultural & Civic",             img: "/Gallery/Buildingtype3.avif",  count: 3,  filterKey: { field: "type", value: "Cultural" } },
  { id: "healthcare",   name: "Healthcare",                   img: "/Gallery/Buildingtype4.avif",  count: 2,  filterKey: { field: "type", value: "Healthcare" } },
  { id: "retail",       name: "Retail & Commercial",          img: "/Gallery/Buildingtype5.avif",  count: 7,  filterKey: { field: "type", value: "Commercial" } },
  { id: "education",    name: "Education & Research",         img: "/Gallery/Buildingtype8.avif",  count: 3,  filterKey: { field: "type", value: "Education" } },
  { id: "transport",    name: "Transport & Airports",         img: "/Gallery/Buildingtype7.avif",  count: 2,  filterKey: { field: "type", value: "Transport" } },
  { id: "residential",  name: "Residential",                  img: "/Gallery/Buildingtype6.avif",  count: 3,  filterKey: { field: "type", value: "Residential" } },
  { id: "leisure",      name: "Leisure & Entertainment",      img: "/Gallery/Buildingtype9.avif",  count: 4,  filterKey: { field: "type", value: "Public" } },
  { id: "industrial",   name: "Industrial & Automotive",      img: "/Gallery/Buildingtype10.avif", count: 3,  filterKey: { field: "type", value: "Industrial" } },
];

// ─── REGIONS (5 subcategories) ────────────────────────────────────────────────

export const REGIONS: GalleryCategory[] = [
  { id: "uae",       name: "UAE",           img: "/Gallery/Region1.avif",  count: 8,  filterKey: { field: "region", value: "UAE" } },
  { id: "gcc",       name: "GCC",           img: "/Gallery/Region2.avif",  count: 4,  filterKey: { field: "region", value: "GCC" } },
  { id: "europe",    name: "Europe",        img: "/Gallery/Region3.avif",  count: 17, filterKey: { field: "region", value: "Europe" } },
  { id: "asia",      name: "Asia",          img: "/Gallery/Region4.avif",  count: 3,  filterKey: { field: "region", value: "Asia" } },
  { id: "namerica",  name: "North America", img: "/Gallery/Region5.avif",  count: 1,  filterKey: { field: "region", value: "North America" } },
];

// ─── COLOUR SURFACES / FINISHES (4 subcategories) ─────────────────────────────

export const FINISHES: GalleryCategory[] = [
  { id: "solid",    name: "Solid & Painted",  img: "/Gallery/coloursurface1.avif",  count: 12, filterKey: { field: "finish", value: "Solid" } },
  { id: "metallic", name: "Metallic Series",  img: "/Gallery/BuildingType1.avif",   count: 7,  filterKey: { field: "finish", value: "Metallic" } },
  { id: "stone",    name: "Stone Series",     img: "/Gallery/colorsurface3.avif",   count: 3,  filterKey: { field: "finish", value: "Stone Series" } },
  { id: "custom",   name: "Custom PVDF",      img: "/Gallery/Buildingtype9.avif",   count: 8,  filterKey: { field: "finish", value: "Custom PVDF" } },
];

// ─── FEATURED PROJECTS ────────────────────────────────────────────────────────

export const FEATURED_PROJECTS: Project[] = PROJECTS.filter((p) => p.featured);

// ─── MAIN TABS ───────────────────────────────────────────────────────────────

export type MainTab = "Building Type" | "Region" | "Colour Surface" | "Featured";

export const MAIN_TABS: MainTab[] = [
  "Building Type",
  "Region",
  "Colour Surface",
  "Featured",
];

// ─── HELPER: Map tab → category list ─────────────────────────────────────────

export const getCategoriesForTab = (tab: MainTab): GalleryCategory[] => {
  switch (tab) {
    case "Building Type":  return BUILDING_TYPES;
    case "Region":         return REGIONS;
    case "Colour Surface": return FINISHES;
    default:               return [];
  }
};

// ─── HELPER: Get category info by ID ──────────────────────────────────────────

export const getCategoryInfo = (categoryId: string): { cat: GalleryCategory | null, tab: MainTab, name: string } => {
  if (categoryId === "featured") {
    return { cat: null, tab: "Featured", name: "Featured Projects" };
  }
  let cat = BUILDING_TYPES.find(c => c.id === categoryId);
  if (cat) return { cat, tab: "Building Type", name: cat.name };

  cat = REGIONS.find(c => c.id === categoryId);
  if (cat) return { cat, tab: "Region", name: cat.name };

  cat = FINISHES.find(c => c.id === categoryId);
  if (cat) return { cat, tab: "Colour Surface", name: cat.name };

  return { cat: null, tab: "Building Type", name: decodeURIComponent(categoryId) }; // fallback
};

// ─── HELPER: Filter projects for a subcategory ───────────────────────────────
// "Cultural & Civic" maps to both Cultural + Public types (same as original site)

export const getProjectsForSubcategory = (
  categoryId: string
): Project[] => {
  if (categoryId === "featured") return FEATURED_PROJECTS;

  const info = getCategoryInfo(categoryId);
  const cat = info.cat;
  if (!cat) return PROJECTS.slice(0, 4);

  const { field, value } = cat.filterKey;

  let filtered: Project[];

  if (categoryId === "cultural") {
    // Cultural & Civic = Cultural OR Public types (matches original site logic)
    filtered = PROJECTS.filter((p) => p.type === "Cultural" || p.type === "Public");
  } else if (categoryId === "leisure") {
    // Leisure & Entertainment = Public type (Yas Marina, Ferrari World)
    filtered = PROJECTS.filter((p) => p.type === "Public");
  } else if (categoryId === "custom") {
    // Custom PVDF = Custom PVDF OR Custom Finish finishes
    filtered = PROJECTS.filter((p) => p.finish === "Custom PVDF" || p.finish === "Custom Finish");
  } else {
    filtered = PROJECTS.filter((p) => (p as unknown as Record<string, unknown>)[field] === value);
  }

  return filtered;
};

// ─── INIT: Dynamically calculate exact counts ──────────────────────────────────
[...BUILDING_TYPES, ...REGIONS, ...FINISHES].forEach(cat => {
  cat.count = getProjectsForSubcategory(cat.id).length;
});
