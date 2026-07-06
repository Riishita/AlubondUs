import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Printer } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import FooterSection from "@/components/sections/FooterSection";

const globalOffices = [
  {
    region: "Europe",
    offices: [
      {
        country: "SERBIA",
        company: "ALUBOND EUROPE, doo",
        address: "Nemanjina 130\n26320 Banatski Karlovac, Serbia",
        phone: "+381 13 652 852",
        email: "info@alubondeurope.com",
        web: "alubondeurope.com",
      },
      {
        country: "UK",
        company: "ALUBOND UK",
        address: "8 Rutland Street, Knightsbridge,\nLondon SW7 1EH United Kingdom",
        phone: "0207 581 0157",
        email: "info@globeclad.co.uk",
      },
    ],
  },
  {
    region: "America",
    offices: [
      {
        country: "USA",
        address: "3630 commercial ave\nNorth brook\nIL-60062",
        phone: "+1 (281) 690-7984",
        fax: "815 977 9672",
        email: "sales@alubond.com",
      },
      {
        country: "CANADA",
        company: "ALUBOND CANADA INC",
        address: "3600A Laird Road Unit #15\nMississauga, ON L5L 0A3",
        phone: "+1 800 956 8118",
        email: "canada@alubond.com",
        web: "alubond.com/canada",
      },
    ],
  },
  {
    region: "Africa",
    offices: [
      {
        country: "WEST AFRICA",
        company: "Alubond West Africa",
        address: "26 Tema Motorway, Spintex Road,\nAccra, Ghana",
        phone: "+233 24 1114222",
        email: "sales@alubond.com",
      },
      {
        country: "SOUTH AFRICA",
        company: "Façade Architectural Systems",
        address: "5 Border Lane, Benrose, Johannesburg",
        phone: "+27 11 2517000",
        email: "sales@fasystems.co.za",
        web: "www.fasystems.co.za",
      },
    ],
  },
  {
    region: "Middle East",
    offices: [
      {
        country: "UNITED ARAB EMIRATES",
        company: "MULK HOLDINGS F.Z.C\nEUROCON BUILDING INDUSTRIES F.Z.C",
        address: "P.O. Box 42642\nHamriyah Free Zone, Sharjah, U.A.E",
        phone: "+971-6-5262202",
        fax: "+971-6-5262203",
        email: "sales@alubond.com",
      },
      {
        country: "TURKEY",
        company: "GLOBECLAD TURKEY",
        address: "Altunizade Mahallesi Kisikli Caddesi\nTekin-Ak Is Merkezi No:3/9 Uskudar\nIstanbul, Turkey",
        phone: "+90 216 562 12 13 | M: +90 534 789 31 16",
        email: "adminturkey@globeclad.com",
      },
      {
        country: "QATAR",
        company: "TECHNOCLAD",
        address: "Abdulkader Aklim Gul\nGeneral Manager",
        phone: "+974 7760 7339",
        email: "abdulkader@alubondqatar.com",
      },
    ],
  },
  {
    region: "Asia",
    offices: [
      {
        country: "INDIA",
        company: "MULK COMPOSITES Pvt Ltd",
        address: "Building No./Flat No.7, Pali Village, 16th Road, Nearby Romp Pictures\nBandra West, Mumbai, Mumbai Suburburn, Maharashtra, PIN Code: 400050",
        phone: "+919819892142",
        email: "mumbaioffice@mulkholdings.com",
      },
      {
        country: "CHINA",
        company: "ALUBOND SHANGHAI METAL COMPOSITES CO., LTD",
        address: "2902 Room, No.88 South Zunyi Road,\nShanghai, China 200051",
        phone: "86 21 6295 2861",
        fax: "86 21 6209 7899",
        email: "linda@mulkholdings.com",
      },
      {
        country: "PAKISTAN",
        company: "Alubond Pakistan One stop Building Materials",
        address: "Street 05\nOpposite IMARAT Builders Mall, G.T Road Islamabad Pakistan",
        phone: "+92 322 6115933 | +92 51 6040363",
        email: "info@osbm.pk | Sajjad@osbm.pk",
      },
    ],
  },
];

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#0a4b7c] selection:text-white">
      <Navbar />

      <main className="pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 md:mb-24"
          >
            <p className="text-[#0a4b7c] font-bold tracking-[0.2em] uppercase text-sm mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-black mb-8 leading-[1.1]">
              LET'S BUILD <span className="font-medium text-[#0a4b7c]">TOGETHER.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl leading-relaxed">
              We are constantly evolving in order to become more flexible in our operations, more creative in our commercial offerings, more sustainable in our use of resources, more innovative in conducting our global business, and more efficient in our customer relation.
            </p>
          </motion.div>

          {/* Contact Layout: Info + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
            {/* Left: Headquarters Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col"
            >
              <h2 className="text-3xl font-medium mb-8 text-black">Headquarters</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0a4b7c]/5 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-[#0a4b7c]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-gray-600">Hamriyah Free Zone | Phase 1 | Sharjah</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0a4b7c]/5 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-[#0a4b7c]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-gray-600 mb-1">+971 (6) 526 2202</p>
                    <p className="text-gray-600">
                      <span className="font-medium">Toll Free:</span> 800 258 2663
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0a4b7c]/5 rounded-full flex items-center justify-center shrink-0">
                    <Printer className="text-[#0a4b7c]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Fax</p>
                    <p className="text-gray-600">+971 (6) 526 2203</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0a4b7c]/5 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-[#0a4b7c]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:sales@alubond.com" className="text-gray-600 hover:text-[#0a4b7c] transition-colors">
                      sales@alubond.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-7 bg-gray-50 rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-medium mb-2 text-black">Drop us a line!</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              <form action="mailto:sales@alubond.com" method="POST" encType="text/plain" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="First Name" 
                      required
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a4b7c]/20 focus:border-[#0a4b7c] transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="Last Name" 
                      required
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a4b7c]/20 focus:border-[#0a4b7c] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="Email" 
                      required
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a4b7c]/20 focus:border-[#0a4b7c] transition-all"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <input 
                      type="tel" 
                      name="Contact number" 
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a4b7c]/20 focus:border-[#0a4b7c] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="Subject" 
                    required
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a4b7c]/20 focus:border-[#0a4b7c] transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="Message" 
                    rows={5}
                    required
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a4b7c]/20 focus:border-[#0a4b7c] transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#0a4b7c] hover:bg-[#083a61] text-white font-bold text-sm tracking-wider uppercase py-4 rounded-xl transition-colors shadow-lg shadow-[#0a4b7c]/20"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Global Presence Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black mb-12 text-center">
              Our <span className="font-medium text-[#0a4b7c]">Global Presence</span>
            </h2>
            
            <div className="space-y-16">
              {globalOffices.map((regionData, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-8">
                    {regionData.region}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regionData.offices.map((office, idx) => (
                      <div key={idx} className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-8 flex flex-col h-full">
                        <div className="mb-4">
                          <p className="text-xs font-bold text-[#0a4b7c] tracking-widest uppercase mb-1">
                            {office.country}
                          </p>
                          {office.company && (
                            <h4 className="text-lg font-bold text-gray-900 whitespace-pre-line">
                              {office.company}
                            </h4>
                          )}
                        </div>
                        
                        <div className="flex-grow space-y-4">
                          <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-gray-400 mt-0.5 shrink-0" />
                            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                              {office.address}
                            </p>
                          </div>
                          
                          {office.phone && (
                            <div className="flex items-start gap-3">
                              <Phone size={18} className="text-gray-400 mt-0.5 shrink-0" />
                              <p className="text-sm text-gray-600">{office.phone}</p>
                            </div>
                          )}
                          
                          {office.fax && (
                            <div className="flex items-start gap-3">
                              <Printer size={18} className="text-gray-400 mt-0.5 shrink-0" />
                              <p className="text-sm text-gray-600">{office.fax}</p>
                            </div>
                          )}
                          
                          {office.email && (
                            <div className="flex items-start gap-3">
                              <Mail size={18} className="text-gray-400 mt-0.5 shrink-0" />
                              <a href={`mailto:${office.email}`} className="text-sm text-[#0a4b7c] hover:underline break-all">
                                {office.email}
                              </a>
                            </div>
                          )}
                          
                          {office.web && (
                            <div className="flex items-start gap-3">
                              <div className="w-[18px] flex justify-center mt-0.5 shrink-0">
                                <span className="text-gray-400 text-sm">🌐</span>
                              </div>
                              <a href={`https://${office.web.replace('https://', '').replace('http://', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[#0a4b7c] hover:underline break-all">
                                {office.web}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ContactUs;
