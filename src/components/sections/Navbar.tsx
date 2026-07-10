"use client";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Products dropdown items
const PRODUCTS_DROPDOWN = [
  { label: "Technical Data", href: "/technical-data" },
];

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", dropdown: PRODUCTS_DROPDOWN },
  { label: "Colours & Finishes", href: "/colours" },
  { label: "Project", href: "/project" },
  { label: "News", href: "/news" },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Smart nav behavior removed as per request

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
      setIsOpen(false);
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView();
      setIsOpen(false);
    }
  };

  const openDropdown = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const keepDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
  };

  return (
    <motion.nav
      variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -100, opacity: 0 } }}
      animate="visible"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-16 sm:h-20 w-auto object-contain scale-[1.3] sm:scale-[1.5] origin-left"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              // ── Nav item with dropdown ──
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => openDropdown(link.label)}
                onMouseLeave={closeDropdown}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-700 text-sm font-medium hover:text-black transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {/* Chevron */}
                  <svg
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                      activeDropdown === link.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      key="dropdown"
                      initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{ originY: 0 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-white shadow-lg border border-gray-100 rounded-sm overflow-hidden z-50"
                      onMouseEnter={keepDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.href);
                            setActiveDropdown(null);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#0a4b7c] hover:text-white transition-colors group"
                        >
                          {/* Orange accent bar */}
                          <span className="w-1 h-4 bg-[#e67e22] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // ── Regular nav item ──
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-700 text-sm font-medium hover:text-black transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 relative z-50 flex flex-col items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-6 h-0.5 bg-black my-1.5 ${isOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-black transition-all ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-800 font-medium text-lg"
                  >
                    {link.label}
                  </a>
                  {/* Mobile sub-items */}
                  {link.dropdown && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 border-l-2 border-[#e67e22] pl-3">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.href);
                            setIsOpen(false);
                          }}
                          className="text-gray-600 text-sm font-medium hover:text-[#0a4b7c] transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;