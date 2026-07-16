import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";
/* ─────────────────────────────────────────
   SECTION 1 — HERO
───────────────────────────────────────── */
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // 1. Define your array of image paths
  const images = [
    '/AboutImages/1.avif',
    '/AboutImages/2.avif',
    '/AboutImages/3.avif',
    '/AboutImages/4.avif',
  ];

  return (
    <section ref={ref} className="pt-36 pb-20 px-8 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-6 max-w-3xl">
            <span className="font-medium text-black">Innovating for People, </span>
            <span className="font-medium text-[#0a4b7c]">Building </span>
            <br className="hidden sm:block" />
            <span className="font-medium text-[#0a4b7c]">for the Future, </span>
            <span className="font-medium text-black">Since 1982</span>
          </h1>

          <p className="font-medium text-gray-600 md:text-base max-w-3xl leading-relaxed">
            ALUBOND is an Aluminum Composite Panels (ACP) and Metal Composite Material (MCM) brand owned by Mulk Holdings International. The company has emerged as the world’s largest ACP and MCM Brand with a 25 Million m2.. of manufacturing and processing capacity from its various facilities in UAE, Oman, Serbia, India and Turkey.
            <br /><br />
            Alubond offers a full range of Fire Rated Metal Panels including Solid Aluminum, FR-A1 Mineral Core, FR-A2 Mineral Core, FR Euroclass B and various other panels like Exotic Metal Panels in a choice of metal skins like Galvanized Steel, Stainless Steel, Copper, Bronze and Titanium.
          </p>
        </div>

        {/* 2. Map through the image array */}
        <motion.div style={{ x }} className="flex gap-4 md:gap-6 w-max">
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 rounded-2xl overflow-hidden bg-gray-200 w-[70vw] md:w-[35vw] lg:w-[400px]"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={src}
                alt={`Hero visual ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   SECTION 2 — ABOUT US + AWARDS
───────────────────────────────────────── */
const AboutSection = () => (
  <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
      
      {/* Left — text block */}
      <div className="flex-1 max-w-lg">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
          About Us
        </h2>
        <p className="font-medium text-gray-600 md:text-m max-w-lg leading-relaxed mb-14">
          <span className="font-bold text-black">Founded in 1982 by Nawab Shaji Ul Mulk</span>
          {". "} WE ARE THE LARGEST ACP BAND IN THE WORLD, WHY? Technically the most superior Fire Rated Aluminium
           Composite Panel with World's Highest Rating in Deflection to Heat, Fire Penetration of a Wall Assembly 
           and Delamination Strength. World's First Green Composite Panel with over 90% Recycled Content making 
           it eligible for Leeds Certified Buildings. World's First Solar Grade 
           Composite Metal Mirror replacing Glass at a commercial Level in various Soalr Projects.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 pl-5 pr-2 py-2 rounded-full border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            Our Team
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-base leading-none group-hover:bg-white group-hover:text-black transition-all duration-300">
              ›
            </span>
          </button>
        </div>
      </div>

      {/* Right — Awards cluster */}
      <div className="w-full flex-1 flex items-center justify-center lg:justify-end">
        {/* Adjusted container size to fit the cluster without overflowing mobile screens */}
        <div className="relative w-full max-w-[340px] h-[320px] sm:h-[340px]">

          {/* Forbes Top Indian Leaders Card */}
          <div
            className="absolute top-0 right-0 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl z-20"
            style={{ transform: "rotate(10deg)" }}
          >
            <img 
              src="/AboutImages/23.avif" 
              alt="Forbes Top Indian Leaders" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* See All Awards Circle */}
          <div className="absolute top-32 left-0 w-28 h-28 rounded-full bg-black text-white flex flex-col items-center justify-center text-center text-sm font-semibold leading-tight cursor-pointer hover:bg-gray-800 transition-colors z-30 shadow-lg">
            See All<br />Awards
          </div>

          {/* Forbes 2019 Gold Badge */}
          <div
            className="absolute bottom-0 right-10 w-44 h-44 rounded-full overflow-hidden shadow-2xl border-[6px] border-white z-10"
            style={{ transform: "rotate(-5deg)" }}
          >
            <img 
              src="/AboutImages/24.avif" 
              alt="Forbes 2019 Rank 58" 
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   SECTION 3 — VISION / MISSION / IMPACT
   Sticky left panel + scrolling cards right
───────────────────────────────────────── */
const vmiCards = [
  {
    id: "vision",
    label: "Vision",
    dark: true,
    text: "To build enterprises that innovate, inspire, and impact, creating lasting value for industries and communities worldwide.",
  },
  {
    id: "mission",
    label: "Mission",
    dark: false,
    text: "To harness innovation to build stronger, healthier, and more connected societies through sustainable manufacturing, modular infrastructure, global sports, and accessible virtual healthcare.",
  },
  {
    id: "impact",
    label: "Impact",
    dark: true,
    text: "Building Alubond into the world's largest ACP brand, pioneering A1 fire-rated façade panels for global fire safety, creating the T10 Cricket League with over 500 million viewers, launching the $500 million Zim Cyber City smart city project, and expanding into virtual healthcare with Alubond.",
  },
];

const VisionSection = () => {
  return (
    <section className="relative bg-white py-32">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start relative">
        
        {/* Left — sticky text */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-40 pb-12 lg:pb-[120px]">


<h2 className="text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-6 max-w-lg">
          <span className="font-medium text-black">Innovating for a </span> <br />
          <span className="font-medium text-[#0a4b7c]">Better Tomorrow </span>
         
        </h2>

        
          <p className="font-medium text-gray-600 md:text-m max-w-lg leading-relaxed mb-14">
          We harness the power of innovation to improve lives—creating
            sustainable solutions, empowering communities, and shaping a more
            connected world.
        </p>
        </div>

        {/* Right — stacking cards via CSS sticky */}
        <div className="w-full lg:w-1/2 flex flex-col gap-16 lg:gap-40 pb-[10vh] lg:pb-[25vh]">
          {vmiCards.map((card, index) => (
            <div 
              key={card.id}
              className={`sticky rounded-[2rem] p-10 md:p-14 flex flex-col justify-center h-fit shadow-2xl transition-all ${
                card.dark ? "bg-[#0a4b7c] text-white border border-white/10" : "bg-[#eef1f5] text-black border border-black/5"
              }`}
              style={{ top: `calc(10rem + ${index * 2}rem)` }}
            >
              <h3 className={`text-3xl md:text-4xl font-bold mb-8 md:mb-10 tracking-tight ${card.dark ? "text-white" : "text-black"}`}>
                {card.label}
              </h3>
              <p className={`text-[13px] md:text-sm leading-[1.8] font-medium max-w-lg ${card.dark ? "text-gray-300" : "text-gray-700"}`}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   SECTION 4 — KEY MILESTONES
   Sticky centered title + normally scrolling cards
───────────────────────────────────────── */


const milestones7 = [
  {
    year: "2007",
    title: "Ajman Industrial Excellence Award",
    desc: "Eurocon Building Industries was honored with the Ajman Industrial Excellence Gold Award for Best Foreign Factory, presented by the Crown Prince of Ajman.",
    img: "AboutImages/5.avif",
    align: "right",
  },
  {
    year: "2009",
    title: "MRM Business Excellence Award",
    desc: "Alubond Holdings received the MRM Business Excellence Award for Best Foreign Manufacturer from HH Sheikh Mohammed Bin Rashid Al Maktoum.",
    img: "AboutImages/1.avif",
    align: "left",
  },
  {
    year: "2012",
    title: "Forbes & Industry Recognition",
    desc: "Chairman Shaji Ul Mulk was named among Forbes Top 100 Indian Leaders in the Middle East and listed among the 50 most influential construction leaders.",
    img: "AboutImages/6.avif",
    align: "right",
  },
  {
    year: "2012 – 2014",
    title: "Architectural Sponsorship",
    desc: "Alubond was the Platinum Sponsor of the Middle East Architects Awards for three consecutive years.",
    img: "AboutImages/7.avif",
    align: "left",
  },
  {
    year: "2019",
    title: "Forbes Middle East Ranking",
    desc: "Shaji Ul Mulk ranked No. 9 in Forbes Middle East’s list of Top 100 Indian Leaders making an impact in the region.",
    img: "AboutImages/8.avif",
    align: "right",
  },
  // {
  //   year: "2023",
  //   title: "Zim Cyber City – Zimbabwe",
  //   desc: "Alubond launched the $500M Zim Cyber City smart development in Harare, inaugurated by President Emmerson Mnangagwa.",
  //   img: "AboutImages/9.avif",
  //   align: "left",
  // },
  // {
  //   year: "2025",
  //   title: "Pillars of Real Estate Award",
  //   desc: "LX by Alubond was awarded “UAE’s Best Commercial Project” at the Pillars of Real Estate Awards 2025.",
  //   img: "AboutImages/10.avif",
  //   align: "right",
  // },
];

const MilestoneCard = ({ m, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  

  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [m.align === 'right' ? 5 : -5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <div 
      ref={ref}
      className={`flex w-full ${m.align === 'right' ? 'justify-end' : 'justify-start'}`}
      style={{ marginBottom: "80px" }}
    >
      <motion.div 
        style={{ scale, rotate, opacity }}
        className="bg-white/90 backdrop-blur-2xl rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full md:w-[45%] min-h-[300px] relative group overflow-hidden cursor-pointer flex flex-col justify-center"
      >
        {/* Mobile Image (Visible only on mobile) */}
        <div className="w-full h-56 md:hidden p-3 pb-0 pointer-events-none">
          <div className="w-full h-full rounded-[1.25rem] overflow-hidden">
            <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text Content */}
        <div className="p-6 md:p-10 relative z-10 transition-opacity duration-300 md:group-hover:opacity-0">
          <p className="text-black text-2xl md:text-3xl font-medium mb-2 md:mb-3">{m.year}</p>
          <h3 className="text-black text-xl md:text-2xl font-bold leading-snug mb-3 md:mb-4">{m.title}</h3>
          <p className="text-gray-900 text-sm md:text-base leading-relaxed font-medium">{m.desc}</p>
        </div>

        {/* Hover Image (Desktop only) */}
        <div className="hidden md:block absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 p-3 pointer-events-none">
          <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
            <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MilestonesSection = () => {
  return (
    <section className="relative bg-white pb-32">
      
      {/* 1. Sticky Background Text */}
      <div className="sticky top-32 w-full flex justify-center pointer-events-none z-0 h-0 overflow-visible">
        <h2 className="text-4xl md:text-5xl lg:text-[6rem] font-semibold text-black/20 tracking-tight select-none text-center">
          Key Milestones
        </h2>
      </div>

      {/* 2. Cards Container scrolling over */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 pt-48 md:pt-64">
        {milestones7.map((m, i) => (
          <MilestoneCard key={i} m={m} index={i} />
        ))}
      </div>
    </section>
  );
};





/* ─────────────────────────────────────────
   SECTION 5 — OUR VALUES
───────────────────────────────────────── */
const ValuesSection = () => (
  <section className="bg-black px-8 md:px-16 lg:px-24 min-h-[60vh] flex flex-col justify-center py-16">
    <div className="max-w-7xl mx-auto w-full">
      <h2 className="text-4xl md:text-5xl lg:text-5xl text-white mb-32 tracking-wide">
        <span className="text-whiye font-medium">Our Values</span>
   
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mt-12 md:mt-0">
        {/* Left Column */}
        <div className="flex flex-col gap-16 md:gap-48">
          <div className="max-w-xs">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-wide">Innovation</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Driving breakthroughs in technology, ideas, and experiences.
            </p>
          </div>
          <div className="max-w-xs">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-wide">People's Welfare</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Placing human well-being at the center of every decision.
            </p>
          </div>
        </div>

        {/* Center Column */}
        <div className="flex flex-col justify-center md:mt-[8.5rem]">
          <div className="max-w-xs">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-wide">Empowerment</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Enabling individuals, communities, and partners to achieve more.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-16 md:gap-48">
          <div className="max-w-xs">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-wide">Integrity</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Acting with transparency, trust, and responsibility.
            </p>
          </div>
          <div className="max-w-xs">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-wide">Sustainability</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Protecting the environment through conscious practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   SECTION 6 — LEADERSHIP
───────────────────────────────────────── */
const LeadershipSection = () => (
  <section id="leadership" className="bg-white py-32 px-8 md:px-16 lg:px-24">
    <div className="max-w-7xl mx-auto flex flex-col gap-32">
      
      {/* The Founder */}
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* Image Component */}
        <div className="w-full md:w-1/2">
          <img 
            src="/AboutImages/11.avif" 
            alt="Nawab Shaji Ul Mulk" 
            className="w-full h-auto aspect-[4/4] object-cover rounded-3xl shadow-sm"
          />
        </div>
        
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
          
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-6 max-w-lg">
          <span className="font-medium text-black">The </span> 
          <span className="font-medium text-[#0a4b7c]">Founder </span>
         
        </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black mb-4">
            Nawab Shaji Ul Mulk
          </h3>
          <p className="text-gray-500 text-lg mb-8 font-medium">Founder & Chairman</p>
          <p className="text-black text-sm md:text-base font-medium leading-loose max-w-xl">
            An Indian-born entrepreneur from Andhra Pradesh, Shaji Ul Mulk founded Mulk International in 1982 and built it into a globally respected conglomerate. He is the only Indian member of the Emirates Cricket Board and the visionary creator of the T10 Cricket format, revolutionising the modern game. His leadership and influence earned him recognition among the Top 100 Most Inspiring Leaders in the Middle East by Arabian Business in 2023.
          </p>
        </div>
      </div>

      {/* The Visionary Heir */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
        {/* Image Component */}
        <div className="w-full md:w-1/2">
          <img 
            src="/AboutImages/12.avif"  
            alt="Nawab Adnan Ul Mulk" 
            className="w-full h-auto aspect-[4/4] object-cover rounded-3xl shadow-sm"
          />
        </div>
        
        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
          
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] leading-tight mb-6 max-w-lg">
          <span className="font-medium text-black">The </span> 
          <span className="font-medium text-[#0a4b7c]">Visionary Heir </span>
         
        </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black mb-4">
            Nawab Adnan Ul Mulk
          </h3>
          <p className="text-gray-500 text-lg mb-8 font-medium">Vice Chairman</p>
          <p className="text-black text-sm md:text-base font-medium leading-loose max-w-xl">
Adnan Ul Mulk formally entered the leadership ranks after the success of Metal Plast, his independent venture that became the region’s largest plastic recycling facility and fire-rated core manufacturer for façades. His entrepreneurial achievements and contributions elevated him to Vice Chairman of Mulk International and a member of the Board of Directors, marking the rise of the next generation of leadership.          </p>
        </div>
      </div>

    </div>
  </section>
);

/* ─────────────────────────────────────────
   SECTION 7 — MEET THE TEAM
───────────────────────────────────────── */
const teamMembers = [
  {
    name: "Sania Mulk",
    role: "Board Member",
    desc: "Sania Mulk is an architect and development strategist with academic credentials from Virginia Tech and Harvard. As Group Director for Development and Corporate Strategy, she leads major international real estate projects, driving innovation, planning excellence, and long-term portfolio growth",
    image: "/AboutImages/13.avif"  // Add your path here
  },
  {
    name: "Nida Mulk",
    role: "Board Member",
    desc: "Nida Mulk holds a Master’s degree in Digital Marketing from UT and serves as Head of Marketing. She leads global branding and digital strategy initiatives, strengthening market presence, brand positioning, and audience engagement across the group’s international platforms.",
    image: "/AboutImages/14.avif" 
  },
  {
    name: "Arbab Ahmed Khan",
    role: "Group CEO",
    desc: "Arbab Ahmed Khan is the Group CEO of Mulk International, a global conglomerate active in building materials, real estate, modular construction, sports, healthcare, and technology. With over 20 years of international management experience, he leads the group’s expansion, innovation, and operational excellence across the Middle East, Europe, Africa, and the U.S., driving flagship brands like Alubond and UniQube.",
    image: "/AboutImages/15.avif" 
  },
  {
    name: "Chandrakanth",
    role: "CFO",
    desc: "Chandrakant Pawar is Chief Financial Officer at Mulk Holdings, specializing in financial governance, compliance, and strategic fiscal leadership. Rising from Financial Controller to CFO, he oversees financial operations and ensures strong regulatory and operational discipline across the group.",
    image: "/AboutImages/16.avif" 
  },
  {
    name: "Esmaeil Hassan Rahideh",
    role: "Head of Legal Affairs",
    desc: "Esmaeil Hassan Rahideh is Group Director of Mulk International, with over 25 years of experience in legal affairs, government relations, real estate, and business development. A member of the Emirates Association for Lawyers, he plays a key role in regulatory engagement and strategic expansion.",
    image: "/AboutImages/17.avif" 
  },
  {
    name: "Jaya Joseph",
    role: "Head of Administration & Corporate Affairs",
    desc: "Jaya Joseph brings over 20 years of experience across administration, human resources, and corporate affairs. With an MBA in Human Resources and a background in banking and IT, she provides strategic leadership that strengthens organizational efficiency, governance, and long-term growth.",
    image: "/AboutImages/18.avif" 
  },
  {
    name: "Saadullah Khan",
    role: "Head of Business development",
    desc: "Mr. Saadullah Khan brings more than 40 years of executive leadership across manufacturing and services in the GCC and MENA regions. He has led multinational portfolios, scaled startups, and driven sustained commercial growth through strategic business development and operations leadership.",
    image: "/AboutImages/19.avif" 
  },
];

const TeamSection = () => (
  <section className="bg-[#f5f5f5] py-32 px-8 md:px-16 lg:px-24">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl lg:text-6xl text-center text-black mb-24 tracking-tight">
         <span className="font-medium text-black">Meet </span> 
          <span className="font-medium text-[#0a4b7c]">The Team </span>
      </h2>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {teamMembers.map((member, i) => (
          <div key={i} className={`flex flex-col items-center ${member.name ? 'group cursor-pointer' : ''}`}>
            {/* Updated: Changed md:aspect-square to md:aspect-[3/4] 
               This maintains the taller portrait look on all screen sizes.
            */}
            <div className={`w-full aspect-[3/4] md:aspect-[3/4] ${member.name ? 'bg-gray-200 shadow-sm' : 'bg-transparent'} rounded-3xl overflow-hidden relative mb-6`}>
              
              {member.name ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-3xl flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
              
              {/* Hover Overlay */}
              {member.desc && (
                <div className="absolute inset-0 bg-[#f5f5f5]/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex items-center justify-center">
                  <p className="text-black text-[13px] md:text-sm font-medium leading-relaxed text-left">
                    {member.desc}
                  </p>
                </div>
              )}
            </div>
            
            {/* Text Below */}
            {member.name && (
              <>
                <h3 className="text-lg font-bold text-black mb-1 text-center">{member.name}</h3>
                <p className="text-gray-500 text-sm font-medium text-center">{member.role}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────
   SECTION 8 — AWARDS
───────────────────────────────────────── */
const awardsList = [
  { id: 1, src: "/Awards/0RqsDx0g.avif"  },
  { id: 2, src: '/Awards/7Igh96FA.avif' },
  { id: 3, src: '/Awards/aqqFVTbQ.avif' },
  { id: 4, src: '/Awards/award1.avif' },
  { id: 5, src: '/Awards/CmMxSmXQ.avif' },
  { id: 6, src: '/Awards/E5NMB83A.avif' },
  { id: 7, src: '/Awards/Fgm0G4TQ.avif' },

    { id: 8, src: "/Awards/fOJY8sPA.avif"  },
  { id: 9, src: '/Awards/hRs_g-OQ.avif' },
  { id: 10, src: '/Awards/jTIoEEyX.avif' },
  { id: 11, src: '/Awards/jxB7GZqQ.avif' },
  { id: 12, src: '/Awards/k9RlvreQ.avif' },
  { id: 13, src: '/Awards/kheIhEXg.avif' },
  { id: 14, src: '/Awards/Kic0PVoR.avif' },

    { id: 15, src: '/Awards/qOB2I-yq.avif' },
  { id: 16, src: '/Awards/X8NsAgbw.avif' },
  { id: 17, src: '/Awards/XLG-ZKRA.avif' },
  { id: 18, src: '/Awards/XUhTVVUQ.avif' },
  { id: 19, src: '/Awards/ZUr7hD_g.avif' },
];

const AwardsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black rounded-t-[3rem] -mt-12 relative z-20 pt-24 pb-32">
      <div className="max-w-[90rem] mx-auto px-8 md:px-16 lg:px-24">
        <h2 className="text-4xl md:text-5xl font-semi-bold text-white mb-12">Awards</h2>
        
        <div className="relative">
          {/* Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {awardsList.map((award) => (
              <div 
                key={award.id} 
                className="snap-start shrink-0 w-64 md:w-72 aspect-[3/4] bg-[#0a0a0c] rounded-[1.5rem] flex items-center justify-center p-6 relative overflow-hidden border border-white/5"
              >
                 <img 
                   src={award.src} 
                   alt={`Award ${award.id}`} 
                   className="w-full h-full object-contain"
                 />
              </div>
            ))}
          </div>
          
          {/* Scroll Button */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform z-10 hidden md:flex"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-black ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};


/* ─────────────────────────────────────────
   SECTION 9 — FUTURE GOALS
───────────────────────────────────────── */


// 1. Define your data with paths
const goalCards = [
  { id: 1, img: "/AboutImages/20.avif"  },
  { id: 2, img: "/AboutImages/21.avif"  },
  { id: 3, img: "/AboutImages/22.avif"  },
 
];

const FutureGoalsSection = () => {
  return (
    <section className="bg-black py-16 pb-40 overflow-hidden relative">
      
      {/* Moving Background Cards */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <motion.div 
          className="flex gap-4 md:gap-8 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {/* 2. Map through the data */}
          {[...goalCards, ...goalCards].map((item, index) => (
            <div 
              key={index} 
              className="w-[75vw] md:w-[45vw] lg:w-[65vw] h-[60vh] lg:h-[70vh] rounded-[2rem] bg-[#0f0f11] shrink-0 relative overflow-hidden shadow-xl border border-white/5"
            >
              {/* 3. Added Image tag */}
              <img 
                src={item.img} 
                alt={`Goal ${item.id}`} 
                className="w-full h-full object-cover opacity-60" 
              />
              {/* Optional: Dark overlay to ensure text stays readable */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Static Center Overlay (Gradient + Text) */}
      <div className="w-full h-[60vh] lg:h-[70vh] flex flex-col items-center justify-center relative z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/20 to-black/20"></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-8 md:px-16 lg:px-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semi-bold text-white mb-8 tracking-tight">Future Goals</h2>
          <p className="text-gray-300 text-[15px] md:text-base lg:text-[1.1rem] leading-[1.8] md:leading-[2] max-w-4xl font-medium">
            Our future goals focus on global impact and sustainable growth. We aim to deliver smart city 
            developments in emerging markets, lead the industry in sustainable and fire-safe building 
            technologies, scale our virtual healthcare platforms across MENA, Africa, and Asia, and expand 
            the T10 Cricket format into one of the world's premier sports leagues.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
const AboutUs = () => (
  <div className="bg-white min-h-screen">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <VisionSection />
    <MilestonesSection />
    <ValuesSection />
    <LeadershipSection />
    <TeamSection />
    <AwardsSection />
    <FutureGoalsSection />
    <FooterSection />
  </div>
);

export default AboutUs;
