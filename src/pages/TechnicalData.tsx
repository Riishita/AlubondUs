import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";

// ─── Tab definitions ────────────────────────────────────────────────────────
const TABS = ["Technical Data", "Maintenance", "Specifications", "Quality", "Finishes"] as const;
type Tab = (typeof TABS)[number];

// ─── Technical-Data table ────────────────────────────────────────────────────
const tableRows = [
  {
    property: "Coefficient of linear Thermal Expansion",
    standard: "ASTM D 696",
    unit: "mm/mm/100° c",
    stdCore: "2.4×10⁶min",
    frB: "2.4×10⁶min",
    frA2: "2.4×10⁶min",
    highlight: true,
  },
  {
    property: "Impact resistance",
    standard: "ASTM D 732",
    unit: "psi",
    stdCore: "4092 psi (28.2 Mpa)",
    frB: "4092 psi (28.2 Mpa)",
    frA2: "4092 psi (28.2 Mpa)",
    highlight: false,
  },
  {
    property: "Toxicity",
    standard: "TCLP",
    unit: "with in Acceptable limits",
    stdCore: "TCLP",
    frB: "TCLP",
    frA2: "TCLP",
    highlight: true,
  },
  {
    property: "Color Change at -20°C",
    standard: "ATI,YORK USA",
    unit: "No visible change",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: false,
  },
  {
    property: "Color Change at 80°C",
    standard: "ATI,YORK USA",
    unit: "No visible change",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: true,
  },
  {
    property: "Delaminting at -20°C",
    standard: "ATI,YORK USA",
    unit: "No Delamination",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: false,
  },
  {
    property: "Delaminting at 80°C",
    standard: "ATI,YORK USA",
    unit: "No Delamination",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: true,
  },
  {
    property: "Weight",
    standard: "ASTM D 792",
    unit: "kg/m²",
    stdCore: "5.5",
    frB: "7.5",
    frA2: "8",
    highlight: false,
  },
  {
    property: "Deflection Temperature",
    standard: "ASTM D 648",
    unit: "°C",
    stdCore: "116 min",
    frB: "117 min",
    frA2: "119 min",
    highlight: true,
  },
  {
    property: "Color Retention",
    standard: "ASTM D 2244-89",
    unit: "Max Rating 5 Units after 4000 Hours",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: false,
  },
  {
    property: "Gloss Retention",
    standard: "ASTM D 523-89",
    unit: "80% after 4000 Hours",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: true,
  },
  {
    property: "Chalk Resistance",
    standard: "ASTM D 4214-89",
    unit: "Max Rating 8 Units after 4000 Hours",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: false,
  },
  {
    property: "Pencil Hardness",
    standard: "ASTM D 3363-92",
    unit: "HB min",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: true,
  },
  {
    property: "Flexural Elasticity of the aluminum skin",
    standard: "ASTM C 393",
    unit: "kg/mm²",
    stdCore: "7000",
    frB: "7000",
    frA2: "7000",
    highlight: false,
  },
  {
    property: "Sound Transmission class",
    standard: "ASTM E 413",
    unit: "db",
    stdCore: "26",
    frB: "26",
    frA2: "26",
    highlight: true,
  },
  {
    property: "Fire Rating",
    standard: "EN-13501-1 & DIN 4102-98",
    unit: "class 0",
    stdCore: "Fire rated mineral filled core DIN 4102 - B2 class 0",
    frB: "Fire rated mineral filled core EN-13501-1 B class 0",
    frA2: "Fire rated mineral filled core EN-13501-1 A2 class 0",
    highlight: false,
  },
  {
    property: "Adhesive Dry",
    standard: "ASTM D 3359",
    unit: "No change",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: true,
  },
  {
    property: "Adhesive wet",
    standard: "ASTM D 3359",
    unit: "No change 37.8°C 24 hrs",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: false,
  },
  {
    property: "Boiling Water (method 8)",
    standard: "ASTM D 3359",
    unit: "No change 100°C 60 min",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: true,
  },
  {
    property: "Abrasive Resistance",
    standard: "ASTM D 968-81",
    unit: "> 50 Ltr/mils",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: false,
  },
  {
    property: "salt spray Resistance",
    standard: "ASTM B 117-85",
    unit: "UPTO 3000 HOURS",
    stdCore: "PASSED",
    frB: "PASSED",
    frA2: "PASSED",
    highlight: true,
  },
  {
    property: "Flexibility",
    standard: "ASTM D 4145",
    unit: "T",
    stdCore: "2T",
    frB: "2T",
    frA2: "2T",
    highlight: false,
  },
];

// ─── Maintenance content ─────────────────────────────────────────────────────
const MaintenanceContent = () => (
  <div className="text-gray-700 text-base leading-relaxed">

    {/* Page heading */}
    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3 uppercase">Cleaning Methods</h1>
    <div className="w-16 h-1 bg-[#e67e22] mb-8" />

    {/* Intro paragraphs */}
    <div className="space-y-4 mb-8">
      <p>
        Routine cleaning of the Alubond U.S.A ACP panel surface is recommended. It may be washed with water and mild detergent followed by a clean water rinse. The frequency of cleaning and the choice of suitable cleaning agent depend largely on the position of the building being cleaned and degree of contamination. Do not clean sun-heated surfaces (above 40°C) to avoid rapid drying which may lead to stain formation.
      </p>
      <p>
        The cleaning operation must be followed by a thorough rinse with clean water to ensure the removal of all remnants of the cleaning agent. A final wipe down by means of a sponge, leather or wiper is necessary to avoid water stains.
      </p>
      <p>
        The Alubond U.S.A ACP panel is resistant to industrial atmospheres and is self-cleaning in most environments. As with all claddings, improvements in durability is achieved by an annual wash-down with warm water so to avoid the buildup of deposits. The Alubond U.S.A ACP panels is anti-static and more self-cleaning than many of the alternatives.
      </p>
    </div>

    {/* Two-column content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* ── Left column ── */}
      <div className="space-y-7">

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Scope</h2>
          <p>
            This manual is applied to the cleaning and maintenance procedures for the external cladding of the Alubond U.S.A ACP panels on which Stone Lacquered – based Fluorocarbon (PVDF), Polyester, and Acrylic paints are coated.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Purposes</h2>
          <p>
            The purpose of this chapter is to assist project people such as architects, contractors, building owners, et al., who are concerned with and / or engaged in the cleaning and maintenance of the external cladding of the Alubond U.S.A ACP panels, especially in establishing safe and sound cleaning procedures.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">General Notes</h2>
          <p>
            Not only Stone Lacquered – based fluorocarbon coating but also preccotor, polyester acrylic resin or normal organic coatings into aluminum will not show an appreciable amount of dirt collection, however the dirt and soil depends largely on the local atmospheric conditions where the building exists. In heavily industrialised area, coastal areas and the areas where construction works are being carried out, it might be necessary to increase the cleaning frequency, not only for the sake of appearance but also for the purpose of removing the dirt and soil likely to be detrimental to the coating surface.
          </p>
          <p className="mt-3">
            Very often, rainfall is effective to remove dirt and to keep the external cladding clean. In areas of low rainfall, this effect may not be expected and accordingly the cleaning frequency might be increased. Even in the same building, portions which are in direct sight at lower levels might be cleaned more frequently, and less obvious portions might be cleaned less frequently or in some instances hardly at all. And in these areas, detrimental components might be deposited on the coated surface. These factors would determine the cleaning schedule.
          </p>
          <p className="mt-3">
            In planning the actual cleaning schedule of the external cladding, the schedule might be adjusted with other cleaning operations for glass and painted aluminum components.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Cleaning Frequency</h2>
          <p>Cleaning is required more often in the following areas in general:</p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Areas Of Low Rainfall</h2>
          <ul className="list-none space-y-1 pl-2">
            <li>– Heavily industrialized areas</li>
            <li>– The areas where construction works are being carried out</li>
            <li>– Foggy coastal regions with frequent cycles of condensation and dryness.</li>
          </ul>
          <p className="mt-3">
            In foggy and coastal regions, frequent cycles of condensation and dryness take place and early components and dirt tends to deposit. Especially, sheltered areas such as overhangs may be soiled easily because of lack of washing by rain.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Machine Cleaning</h2>
          <p>
            Once automatic wall cleaning machine is considered to be used, a pre-test should be done in the early stage of equipment design to confirm that there is no detrimental effect on the coating as well as to clarify the cleaning effect and frequency.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Cleaning Procedures</h2>
          <p>
            After project completion, construction soils including concrete or mortar etc., should be removed as quickly as possible. In most cases, the following suggested frequency would be required to keep the coated surface clean as good as it can remain:
          </p>
        </div>

        {/* Wash frequency table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#e67e22] text-white">
                <th className="border border-orange-400 px-4 py-3 text-left font-semibold">Building Situated</th>
                <th className="border border-orange-400 px-4 py-3 text-left font-semibold">Wash Frequency</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Rural area", "0.5 times / Year"],
                ["Urban area", "0.5 – 1 times / Year"],
                ["Low rainfall and / or coastal area", "1 times / Year"],
                ["Heavily industrialized area", "1 – 2 times / Year"],
              ].map(([area, freq], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-4 py-3">{area}</td>
                  <td className="border border-gray-300 px-4 py-3">{freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Soil Removal</h2>
          <p>
            The simplest procedure would be water rinse with moderate pressure to remove the soil. If this does not remove the soil, then a concurrent water spray with sponge should be tested. If the soil is still adhering after drying, then a mild detergent or 5 – 10% IPA (Isopropyl Alcohol) solution will be necessary.
          </p>
          <p className="mt-3">
            In order to remove light soil, it is recommended to do some tests to determine the degree of cleaning actually necessary to accomplish the task. Prior to any cleaner application, a forceful water rinse from top to down is recommended as an initial step of tests. The lower water volume with moderate pressure is much better than the considerable water volume with little pressure. When cleaner is applied, physical rubbing with soft sponges or soft rags fully dipped into the liquid solution is also helpful.
          </p>
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="space-y-7">

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Clean Detergents / Solutions</h2>
          <p>
            When a mild detergent or 5 – 10% IPA solution is used for removing soil, it should be used with soft sponges and / or soft rags. The washing should be done with uniform pressure, and normally the operation is done with a horizontal motion first and then with a vertical motion. After washing, the surface should be thoroughly rinsed with clean water, and the rinsed surface is air-dried or wiped with chamois, squeegee or lint-free cloth.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Operation Sequence</h2>
          <p>
            Dripping of cleaner to the lower portions of the building should be minimized. When some rundown is unavoidable, the areas should be rinsed as soon as possible, to eliminate streaking. Generally, the clean and rinse operations move from top to bottom of the building.
          </p>
          <p className="mt-3">Avoid drips and splashes during cleaning. Remove dripping as quickly as possible.</p>
          <p className="mt-3 font-medium">
            Note: In case of one storey or low-elevation buildings, it is recommended to CLEAN FROM BOTTOM UP and RINSE FROM TOP DOWN.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Coating Protection</h2>
          <p>
            Always be aware that it is very difficult to remove sealant and machine oils after hardening. During construction, the protective film should be retained as long as possible, to protect the coated surface from stains caused by sealant and machine oils. If adhered, these stains should be removed as early as possible before hardening, with suitable detergents.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Remarks</h2>
          <p className="mb-2">A. Do not use strong organic solvents, such as MEK (Methyl Ethyl Ketone), MBK (Methyl Iso-butyl Ketone), Trichlene and paint thinner.</p>
          <p className="mb-2">B. Do not mix different cleaners. If cleaners needed to be mixed, please follow the manufacturer's instructions. Generally the cleaner containing abrasives cannot be used. Do not mix cleaners. Avoid excessive rubbing, as it may deter the surface gloss.</p>
          <p>C. Avoid extreme temperature to clean the coated surface. Heat may accelerate chemical reactions and may evaporate the water from solution. Extremely low temperature may give poor cleaning effects. On the contrary, cleaning under higher temperature may result in streaking or staining. Ideally, cleaning should be done on the shaded side of the building under moderate temperature.</p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Scratch Prevention</h2>
          <p>Make sure that Cleaning sponges or rags are grit free to prevent the coated surface from scratch. Avoid over cleaning or excessive rubbing.</p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Residue Cleaning</h2>
          <p>In the event adhesive residue is seen on the panels use.</p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Protective Film Removal</h2>
          <p>
            It is recommended to remove protective film within 3 months of installation if the protective film remover is exposed for a longer duration, there is a possibility of the film sticking to panels. In this event remove the film carefully in small steps and clean any residue as per above.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Protective Peel-Off Foil</h2>
          <p>
            Unless otherwise specified, Alubond U.S.A is supplied with a factory applied peel-off foil for protection of the coated surface. Removal of the protective foil is recommended as soon as possible after installation. In hot weather conditions, some residual glue may stick to the stone-lacquered panel's surfaces. Please ask for specific instructions for removal.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Ozone Friendly</h2>
          <p>
            Neither during the production of Alubond U.S.A nor after being applied as a building cladding are volatile propellant agents of type CFC set free. Alubond U.S.A core material does not contain nitrogen, chlorine or sulphur. By means of its positive contribution to the protection of the environment, the choice of Alubond U.S.A for a huge variety of projects is brilliant.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Storage</h2>
          <p>
            Protect pallets during storage against rain, penetration of moisture or condensation. Pile pallets in stacks one on top of the other (do not place the panels in an upright position). Stacks must not comprise of more than 6 pallets of identical size. Avoid storage for a period of more than 6 months.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Directional Color Appearance</h2>
          <p>
            To avoid possible reflection differences, it is recommended that panels be installed in the same direction i.e. with the orientation of the marking chevron on the peel-off foil of the individual panels running parallel to each other. Also for a single project, use as much sheets as possible from one production batch to avoid even slight variations of color. If different batches at different times are to be used care must be taken to match the color of the previous batch before proceeding with the installation. In case of minor color deviation, it is advisable to use the new panels in a different row and / or away from the previous lot.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Recycling</h2>
          <p>
            Alubond U.S.A ACP is fully recyclable, i.e. both the core material and the aluminum cover sheets can be re-melted and used for the production of new material.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Specifications content ──────────────────────────────────────────────────
const SpecificationsContent = () => (
  <div className="text-gray-700 text-base leading-relaxed">

    {/* Page heading */}
    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3 uppercase">Structure:</h1>
    <div className="w-16 h-1 bg-[#e67e22] mb-8" />

    {/* Two-column layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* ── Left column ── */}
      <div className="space-y-6">
        <p>
          Panels shall be exterior grade, 4mm thick composed of a low density Polyethylene Core sandwiched between two sheets of Aluminum of 0.5mm thickness. The outer top skin shall be coated with either PVDF KYNAR 500 (more than 70% PVDF resin) or Fluoropolymer coating. Paint approved suppliers shall be: Akzo Nobel, Australia, Monopol (Switzerland) and PPG, U.S.A. There shall be a protective coating on the back skin.
        </p>

        <div>
          <h2 className="text-base font-bold text-[#1a1a1a] mb-2">Product Warranty And Tests:</h2>
          <p>
            Panels shall be installed as per the fixing details and accessories recommended by the Manufacturer and shall carry a 10 years Warranty on weather durability, UV color fading, corrosion, chalking, fading, weather damage and manufacturing defects. Panels shall be extensively tested in compliance to ASTM, BS standards and ISO 9001 requirements. Copies of test Certificates from recognized International Laboratories like Warrington Fire Research Center U.K, Architectural Testing Incorporation U.S.A, VKF Switzerland and SWRI, U.S.A shall be submitted along with the material submittal.
          </p>
          <p className="mt-3">
            Fire rated grade shall carry minimum 60 minutes ASTM E119 fire rating certificate and ASTM D648 deflection temperature rating of 211°C FR core shall be from Dupont resins containing inorganic mineral core.
          </p>
          <p className="mt-3">
            Alubond U.S.A panels shall be supplied from either one of the Production Plants based in U.S.A, U.A.E, EUROPE &amp; INDIA. All supplied products shall carry authentic Alubond U.S.A Logo and designs, Protective Film of American Building Technologies Inc., U.S.A.
          </p>
          <p className="mt-3">contact</p>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#1a1a1a] mb-2">Deviation Tolerances:</h2>
          <p>Thickness: 0.2mm Width: 2.0mm Length: 3.0mm</p>
          <p>Diagonal: &lt; 3.0mm (length 2500mm) &lt; 5.0mm (length 2500mm)</p>
          <p>Side straightness: &lt; 0.5% of the length</p>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#1a1a1a] mb-2">Fixing Details and Accessories:</h2>
          <p>
            Typical fixing details and accessories shall be as per the Manufacturer's recommendation and as per the enclosed drawings. All shop drawings will need to be endorsed for submission by the Local Supplier before submittal.
          </p>
        </div>

        {/* Wash frequency table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#e67e22] text-white">
                <th className="border border-orange-400 px-4 py-3 text-left font-semibold">Building Situated</th>
                <th className="border border-orange-400 px-4 py-3 text-left font-semibold">Wash Frequency</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Rural area", "0.5 times / Year"],
                ["Urban area", "0.5 – 1 times / Year"],
                ["Low rainfall and / or coastal area", "1 times / Year"],
                ["Heavily industrialized area", "1 – 2 times / Year"],
              ].map(([area, freq], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-4 py-3">{area}</td>
                  <td className="border border-gray-300 px-4 py-3">{freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#1a1a1a] mb-2">Soil Removal</h2>
          <p>
            The simplest procedure would be water rinse with moderate pressure to remove the soil. If this does not remove the soil, then a concurrent water spray with sponge should be tested. If the soil is still adhering after drying, then a mild detergent or 5 – 10% IPA (Isopropyl Alcohol) solution will be necessary.
          </p>
          <p className="mt-3">
            In order to remove light soil, it is recommended to do some tests to determine the degree of cleaning actually necessary to accomplish the task. Prior to any cleaner application, a forceful water rinse from top to down is recommended as an initial step of tests. The lower water volume with moderate pressure is much better than the considerable water volume with little pressure. When cleaner is applied, physical rubbing with soft sponges or soft rags fully dipped into the liquid solution is also helpful.
          </p>
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="space-y-6">

        <div>
          <h2 className="text-base font-bold text-[#1a1a1a] mb-1">Performance</h2>
          <p>Panels shall comply with the following performance standards.</p>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#1a1a1a] mb-1">Color Choice:</h2>
          <p>Color shall be as per the selection of the Client / Architect.</p>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#1a1a1a] mb-1">Product Warranty:</h2>
          <p>
            All panels supplied on the project shall be warranted for a period of 10 years by the parent company American Building Technologies Inc, Denver U.S.A as per their standard Product Warranty. Material submittals shall carry a letter from ABT confirming their willingness to provide the above warranty. The warranty shall be provided directly in the name of The Client from the Manufacturers and endorsed by the local supplier / installer.
          </p>
        </div>

        {/* Properties / Results / Test table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#e67e22] text-white">
                <th className="border border-orange-400 px-3 py-3 text-left font-semibold">Properties</th>
                <th className="border border-orange-400 px-3 py-3 text-left font-semibold">Results</th>
                <th className="border border-orange-400 px-3 py-3 text-left font-semibold">Test</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Tensile Strength", "5408 psi (37.3 Mpa)", "ASTM D638"],
                ["Yield Strength", "3737 psi (25-8Mpa)", "ASTM D639"],
                ["Elongation", "6.10%", "ASTM D638"],
                ["Flexural Elasticity", "4060Kg /mm2", "ASTM E393"],
                ["Thermal Expansion Co-efficient", "2.02 x 10-5 mm/mm°c 1.12 x 10-5 in/in °F", "ASTM D696"],
                ["Apparent Thermal Conductivity", "32.9w/m²°K as per ASTM C518", "ASTM D976"],
                ["Deflection Temperature", "211°C", "ASTM D648"],
                ["Color Retention", "Max. Rating of 5 Unites after 4000 Hrs", "ASTM D2244-89"],
                ["Gloss Retention", "70% after 4000 Hrs", "ASTM D523-89"],
                ["Chalk Resistance", "Max. Rating of 8 Unites after 4000 Hrs", "ASTM D4214-89"],
                ["Pencil hardness", "2H", "ASTM D3363-92"],
                ["Yield Strength of the Aluminium", "17 ksi", "ASTM E8"],
                ["Flexural Elasticity of the Aluminium Skin", "7000 kg/mm²", "ASTM C393"],
                ["Sound Transmission Class", "25Db", "ASTM E413"],
                ["Fire Rating", "1 Hour 42 Minutes ASTEM E119", "ASTM E119"],
                ["Adhesive - Dry", "No Change", "ASTM D3359"],
                ["Adhesive Wet", "No Change after 37.8°C 24 Hrs", "ASTM D3359"],
                ["Boiling Water (Method B)", "No Change after 100°C, 60 Min", "ASTM D3359"],
                ["Impact Resistance (NCCA) 11-5", "4092 psi (28.2 Mpa)", "ASTM D732"],
                ["Abrasive Resistance", "60 Liters /mil Min", "ASTM D968-81"],
                ["Salt Spray Resistance", "Blister - 10 Scribe 8 after 3000 hrs, Salt fod & 30°C", "ASTM B117-85"],
                ["Flexibility", "1T", "ASTM D4145"],
                ["Gloss Retention", "90% after 4000 Hrs", "ASTM D224-89"],
                ["Peel of Strength", "10 to 12 N/mm", "ASTM D903"],
              ].map(([prop, result, test], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#e67e22]/10"}>
                  <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800">{prop}</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-600">{result}</td>
                  <td className="border border-gray-300 px-3 py-2 text-gray-600 whitespace-nowrap">{test}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// ─── Quality content ─────────────────────────────────────────────────────────
const QualityContent = () => (
  <div className="text-gray-700 text-base leading-relaxed">

    {/* Heading */}
    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3 uppercase">
      Alubond U.S.A - Reliable Quality
    </h1>
    <div className="w-16 h-1 bg-[#e67e22] mb-8" />

    {/* Intro text */}
    <p className="max-w-3xl mb-10">
      We produce Alubond U.S.A and its affiliated materials under the proper control based on ISO 9001:2000 and ISO 14001: 2004 quality assurance system from the coil coating lines to the continuous laminating lines. Our mission to deliver high quality products and services on time at the right price makes our products and services the prime choice for our stakeholders worldwide. We will achieve this through constant innovation and commitment to R &amp; D with a highly committed work force.
    </p>

    {/* Certificate images — 2 per row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {[
        { path: "/products/iso-certificate-90012000-tuv.webp", label: "ISO 14001 : 2015 Certificate" },
        { path: "/products/alubond-europe-iso.webp",  label: "ISO 9001 : 2015 Certificate" },
      ].map(({ path, label }, index) => (
        <div key={index} className="flex flex-col items-center gap-3">
          <div className="w-full border border-gray-200 shadow-md overflow-hidden">
            <img
              src={path}
              alt={label}
              className="w-full h-auto object-cover"
            />
          </div>
          <span className="text-sm text-gray-500 text-center">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Finishes content ────────────────────────────────────────────────────────
const FinishesContent = () => (
  <div className="text-gray-700 text-base leading-relaxed">

    {/* Heading */}
    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-3 uppercase">Finishes</h1>
    <div className="w-16 h-1 bg-[#e67e22] mb-8" />

    {/* Two-column layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* ── Left column ── */}
      <div className="space-y-8">
        {/* Intro */}
        <p>
          Alubond U.S.A continues its aggressive expansion program with a high speed ultra modern coating line. The new facility will be located in Hamriya Free Zone, Sharjah, UAE and capable of coating PVDF, FEVE (similar to Lumiflon) Polyester, Dual Color and 5 coat stone series. This High Speed line will be capable of coating upto 1575 mm width.
        </p>

        {/* PVDF coating diagrams */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm text-gray-700 text-center"></p>
            <img
              src="/pvdf-2-3-coat.webp"
              alt="PVDF 2 Coat diagram"
              className="w-full h-auto object-cover border border-gray-200 shadow-sm"
            />
          </div>
    
        </div>

        {/* TÜV Certificate */}
        <div className="border border-gray-200 shadow-sm overflow-hidden">
          <img
            src="/products/alubond-europe-iso.webp"
            alt="TÜV Austria ISO 9001:2015 Certificate"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="space-y-10">

        {/* Dual Color Coating */}
        <div className="space-y-3">
          <h2 className="font-bold text-[#1a1a1a]">Dual Color Coating</h2>
          <p>
            Alubond's Coil coating line has developed a Dual Color Coating technology. Architects and clients now have a choice of having more than one color in the same panel to offer coated coils for composite panels, garage doors and roofing industry amongst other applications. The lines capability includes a wide range of coatings like PVDF, FEVE, Nano Self Cleaning, Ultra Durable Polyester, 5 Coat PVDF natural marble and wood series, Anti scratch and Dual Color Coating Systems.
          </p>
          <img
            src="/products/dualcolorcoating.webp"
            alt="Dual Color Coating process"
            className="w-full h-auto object-cover border border-gray-200 shadow-sm"
          />
        </div>

        {/* 5 Coat Natural Series */}
      
<div className="space-y-3">
  <h2 className="font-bold text-[#1a1a1a]">5 Coat Natural Series.</h2>
  <p>A fully warranted 5 Coat PVDF &amp; Fluoropolymer coated Aluminum Composite Panels is now available in natural stone and wood series.</p>
  <p>Alubond U.S.A range of PVDF &amp; Fluoropolymer (FEVE) paint systems allows a gloss levels from low matt to high gloss upto 90% can be produced.</p>
  <div className="grid grid-cols-3 gap-3">
    {[
      { src: "/materials/Stone7.webp", alt: "Natural stone finish" },
      { src: "/materials/Stone8.webp", alt: "Marble finish" },
      { src: "/materials/Wood8.webp", alt: "Wood finish" },
    ].map((item, index) => (
      <img
        key={index}
        src={item.src}
        alt={item.alt}
        className="w-full h-auto object-cover border border-gray-200 shadow-sm"
      />
    ))}
  </div>
</div>

{/* Stainless Steel Series */}
<div className="space-y-3">
  <h2 className="font-bold text-[#1a1a1a]">Stainless Steel Series</h2>
  <p>
    Alubond U.S.A introduces the new technology composite panels in genuine Stainless Steel finishes of brushed (Satin) and high mirror finishes. The natural beauty, flatness and rigidity of stainless steel is now combined with the lightweight, flexible and ease of fabrication of composites making Alubond's Stainless Steel Composites an architects' dream.
  </p>
  <div className="grid grid-cols-3 gap-3">
    {[
      { src: "/materials/Brush5.webp", alt: "Brushed stainless steel" },
      { src: "/materials/Brush3.webp", alt: "High mirror stainless steel" },
      { src: "/materials/Brush1.webp", alt: "Stainless steel texture" },
    ].map((item, index) => (
      <img
        key={index}
        src={item.src}
        alt={item.alt}
        className="w-full h-auto object-cover border border-gray-200 shadow-sm"
      />
    ))}
  </div>
</div>
      </div>
    </div>
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────
const TechnicalData = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Technical Data");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">

          {/* Back link */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-black transition-colors text-sm font-medium flex items-center gap-2"
            >
              <span>←</span> Back
            </button>
          </div>

          {/* Page Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a] uppercase">
              Technical Data
            </h1>
            <div className="flex justify-center mt-3">
              <div className="w-16 h-1 bg-[#0a4b7c]" />
            </div>
          </div>

          {/* Tab Bar — styled like the reference screenshot */}
          <div className="flex border border-gray-300 overflow-x-auto hide-scrollbar mb-12">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[140px] py-4 px-4 text-center text-sm font-semibold tracking-wide transition-all whitespace-nowrap border-r last:border-r-0 border-gray-300 ${
                  activeTab === tab
                    ? "bg-white text-[#0a4b7c] border-b-2 border-b-[#e67e22]"
                    : "bg-gray-50 text-gray-500 hover:bg-white hover:text-[#0a4b7c]"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* ── TECHNICAL DATA tab ── */}
          {activeTab === "Technical Data" && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {/* Intro */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-3">
                  A Designer Solution for Modern Buildings
                </h2>
                <div className="w-12 h-1 bg-[#0a4b7c] mb-5" />
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-5xl">
                  Alubond U.S.A is the brand name for the new technology Aluminum Composite Building
                  Panel from American Building Technologies, Illinois, U.S.A. The panel is a
                  composite consisting of two layers of aluminum skin sandwiching a fire rated core
                  in a continuous co-extrusion process. This new generation technology of mechanical
                  and chemical bonding gives Alubond Panels an exceptional bond integrity. The outer
                  aluminum skin for exterior grade Alubond U.S.A Panels is coated with PVDF Kynar
                  500 fluorocarbon coatings. The lower aluminum skin is chromate treated and
                  polyester coated.
                </p>
              </div>

              {/* Properties table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  {/* Header */}
                  <thead>
                    <tr className="bg-[#0a4b7c] text-white">
                      <th
                        rowSpan={2}
                        className="border border-[#0a4b7c]/40 px-4 py-3 text-left font-semibold tracking-wide"
                      >
                        PROPERTIES
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-[#0a4b7c]/40 px-4 py-3 text-left font-semibold tracking-wide"
                      >
                        STANDARD
                      </th>
                      <th
                        rowSpan={2}
                        className="border border-[#0a4b7c]/40 px-4 py-3 text-left font-semibold tracking-wide"
                      >
                        UNITS
                      </th>
                      <th
                        colSpan={3}
                        className="border border-[#0a4b7c]/40 px-4 py-3 text-center font-semibold tracking-wide"
                      >
                        RESULT
                      </th>
                    </tr>
                    <tr className="bg-[#0a4b7c]/85 text-white">
                      <th className="border border-[#0a4b7c]/40 px-4 py-2 text-center text-xs font-semibold">
                        Standard core<br />(FR-B2)
                      </th>
                      <th className="border border-[#0a4b7c]/40 px-4 py-2 text-center text-xs font-semibold">
                        FR-B
                      </th>
                      <th className="border border-[#0a4b7c]/40 px-4 py-2 text-center text-xs font-semibold">
                        FR-A2
                      </th>
                    </tr>
                  </thead>

                  {/* Body */}
                  <tbody>
                    {tableRows.map((row, i) => (
                      <tr
                        key={i}
                        className={`${
                          row.highlight ? "bg-[#0a4b7c]/10" : "bg-white"
                        } hover:bg-[#0a4b7c]/5 transition-colors`}
                      >
                        <td className="border border-gray-300 px-4 py-2 font-medium text-gray-800 text-xs">
                          {row.property}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600 text-xs text-center">
                          {row.standard}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600 text-xs text-center">
                          {row.unit}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600 text-xs text-center">
                          {row.stdCore}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600 text-xs text-center">
                          {row.frB}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-600 text-xs text-center">
                          {row.frA2}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── MAINTENANCE tab ── */}
          {activeTab === "Maintenance" && (
            <div className="animate-in fade-in duration-500">
              <MaintenanceContent />
            </div>
          )}

          {/* ── SPECIFICATIONS tab ── */}
          {activeTab === "Specifications" && (
            <div className="animate-in fade-in duration-500">
              <SpecificationsContent />
            </div>
          )}

          {/* ── QUALITY tab ── */}
          {activeTab === "Quality" && (
            <div className="animate-in fade-in duration-500">
              <QualityContent />
            </div>
          )}

          {/* ── FINISHES tab ── */}
          {activeTab === "Finishes" && (
            <div className="animate-in fade-in duration-500">
              <FinishesContent />
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default TechnicalData;
