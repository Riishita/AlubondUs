"use client";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About Us", href: "/about" },
   { label: "Products", href: "#certificates" },
  { label: "Technology", href: "#sheet-detail" },
  { label: "Colours & Finishes", href: "/Alubond Color Chart A3 .pdf" },
  { label: "Projects", href: "#Gallery" },
  { label: "News", href: "/news" },
  { label: "Downloads", href: "#applications" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (location.pathname === "/about" || location.pathname === "/gallery") {
      setHidden(false);
      return;
    }
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
      setIsOpen(false);
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView();
      }
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: -100, opacity: 0 } }}
      animate={(hidden && !isMobile && !isOpen) ? "hidden" : "visible"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      // Changed to top-0 for attachment, removed inset-x-0 for full width container
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50"
    >
      <div className="w-full px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img src="/Logo.png" alt="Logo" className="h-16 sm:h-20 w-auto object-contain scale-[1.3] sm:scale-[1.5] origin-left" />
        </a>

        {/* Desktop Navigation - Clean, minimalist style */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-gray-700 text-sm font-medium hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2 z-50" onClick={() => setIsOpen(!isOpen)}>
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
                <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-800 font-medium text-lg">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;