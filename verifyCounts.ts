
import { BUILDING_TYPES, REGIONS, FINISHES, getProjectsForSubcategory, PROJECTS } from "./src/data/galleryData";

console.log("Total Projects:", PROJECTS.length);
console.log("
--- BUILDING TYPES ---");
BUILDING_TYPES.forEach(cat => {
  const actualCount = getProjectsForSubcategory(cat.id).length;
  console.log(`${cat.name}: stated count = ${cat.count}, actual count = ${actualCount}`);
});

console.log("
--- REGIONS ---");
REGIONS.forEach(cat => {
  const actualCount = getProjectsForSubcategory(cat.id).length;
  console.log(`${cat.name}: stated count = ${cat.count}, actual count = ${actualCount}`);
});

console.log("
--- FINISHES ---");
FINISHES.forEach(cat => {
  const actualCount = getProjectsForSubcategory(cat.id).length;
  console.log(`${cat.name}: stated count = ${cat.count}, actual count = ${actualCount}`);
});

