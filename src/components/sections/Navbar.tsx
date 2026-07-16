"use client";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Smart nav: hide on scroll-down, show on scroll-up — home page only
  useEffect(() => {
    if (!isHome) {
      setHidden(false);
      return;
    }
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (diff > 8 && currentY > 80) {
        setHidden(true);
      } else if (diff < -8) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    const check = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
      setIsOpen(false);
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const openDropdown = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 140);
  };

  const keepDropdown = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, delay: hidden ? 0 : 0.05 }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(240,246,255,0.78) 50%, rgba(255,255,255,0.82) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.9) inset, 0 8px 32px -4px rgba(10,75,124,0.10), 0 1.5px 8px 0 rgba(10,75,124,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.55)",
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      {/* Gloss sheen overlay */}
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0) 100%)",
          borderRadius: "inherit",
        }}
      />

      <div className="relative w-full px-6 md:px-12 lg:px-16 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center shrink-0">
          <img
            src="/Logo.png"
            alt="Alubond Logo"
            className="h-14 sm:h-16 w-auto object-contain scale-[1.25] sm:scale-[1.4] origin-left"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
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
                  className="group relative flex items-center gap-1.5 text-[15px] font-semibold tracking-wide text-gray-700 hover:text-[#0a4b7c] transition-colors duration-200"
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full rounded-full transition-all duration-300"
                    style={{ background: "linear-gradient(90deg, #0a4b7c, #e67e22)" }}
                  />
                  {/* Chevron */}
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 group-hover:text-[#0a4b7c] transition-all duration-200 ${
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

                {/* Glossy Dropdown panel */}
                <AnimatePresence>
                  {activeDropdown === link.label && (
                    <motion.div
                      key="dropdown"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(240,246,255,0.88) 100%)",
                        backdropFilter: "blur(20px) saturate(160%)",
                        WebkitBackdropFilter: "blur(20px) saturate(160%)",
                        boxShadow:
                          "0 1px 0 rgba(255,255,255,0.85) inset, 0 12px 40px -6px rgba(10,75,124,0.18), 0 2px 10px rgba(10,75,124,0.08)",
                        border: "1px solid rgba(255,255,255,0.6)",
                      }}
                      className="absolute top-full left-0 mt-3 w-52 rounded-xl overflow-hidden z-50"
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
                          className="flex items-center gap-3 px-4 py-3.5 text-[14px] font-semibold text-gray-700 hover:bg-[#0a4b7c] hover:text-white transition-all duration-200 group"
                        >
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
                className="group relative text-[15px] font-semibold tracking-wide text-gray-700 hover:text-[#0a4b7c] transition-colors duration-200"
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full rounded-full transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #0a4b7c, #e67e22)" }}
                />
              </a>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 relative z-50 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block w-6 h-0.5 rounded-full bg-gray-700 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 rounded-full bg-gray-700 transition-all duration-300 ${
              isOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 rounded-full bg-gray-700 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,246,255,0.93) 100%)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              borderTop: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 12px 32px -4px rgba(10,75,124,0.12)",
            }}
            className="lg:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-5">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-800 font-semibold text-[17px] tracking-wide hover:text-[#0a4b7c] transition-colors"
                  >
                    {link.label}
                  </a>
                  {/* Mobile sub-items */}
                  {link.dropdown && (
                    <div className="ml-4 mt-2.5 flex flex-col gap-2 border-l-2 border-[#e67e22] pl-3">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(item.href);
                            setIsOpen(false);
                          }}
                          className="text-gray-500 text-[14px] font-medium hover:text-[#0a4b7c] transition-colors"
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