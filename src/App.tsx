import { useEffect, useLayoutEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "./pages/NotFound.tsx";
import Index from "./pages/Index.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Project from "./pages/Project.tsx";
import ProjectCategory from "./pages/ProjectCategory.tsx";
import News from "./pages/News.tsx";
import NewsDetail from "./pages/NewsDetail.tsx";
import Products from "./pages/Products.tsx";
import ProductDetailA1 from "./pages/ProductDetailA1.tsx";
import ProductDetailA2 from "./pages/ProductDetailA2.tsx";
import ProductDetailEuroclassB from "./pages/ProductDetailEuroclassB.tsx";
import GenericProductDetail from "./pages/GenericProductDetail.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import Downloads from "./pages/Downloads.tsx";
import ColoursFinishes from "./pages/ColoursFinishes.tsx";
import ColourStudio from "./pages/ColourStudio.tsx";
import TechnicalData from "./pages/TechnicalData.tsx";
import Applications from "./pages/Applications.tsx";
import { CustomCursorProvider } from "@/components/CustomCursor/CustomCursorProvider";
import { saveScroll, readScroll, clearAllScrolls, holdScroll } from "./lib/scrollRestoration";

const queryClient = new QueryClient();

/**
 * ScrollManager — mounted once inside BrowserRouter.
 *
 * ON EVERY SCROLL:   save window.scrollY for the current pathname.
 * ON PUSH navigate:  scroll to top (user clicked a link to a new page).
 * ON POP  navigate:  restore the exact saved scrollY for that pathname.
 */
function ScrollManager() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const cancelRestore = useRef<(() => void) | null>(null);
  const prevPath = useRef(pathname);
  const isFirstRender = useRef(true);

  // Save the scroll position before the DOM mutates for the new route
  if (pathname !== prevPath.current) {
    saveScroll(prevPath.current);
    prevPath.current = pathname;
  }

  // ── 1. Save scroll while the user scrolls on the current page ──────────
  useEffect(() => {
    // We only rely on scroll events to save the position if the user reloads or navigates externally
    // But saving during render handles React Router transitions perfectly.
    let debounce: any;
    const onScroll = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        if (prevPath.current === pathname) {
          saveScroll(pathname);
        }
      }, 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(debounce);
      cancelRestore.current?.();
      cancelRestore.current = null;
    };
  }, [pathname]);

  // ── 2. Restore or reset scroll when the route changes ──────────────────
  useLayoutEffect(() => {
    // Cancel any previous restoration loop still running.
    cancelRestore.current?.();
    cancelRestore.current = null;

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = isFirstRender.current && nav?.type === "reload";
    isFirstRender.current = false;

    if (isReload) {
      cancelRestore.current = holdScroll(0);
    } else if (navType === "POP") {
      // Browser Back / Forward — restore the exact saved position.
      const saved = readScroll(pathname);
      if (saved !== null) {
        cancelRestore.current = holdScroll(saved);
      }
    } else {
      // PUSH or REPLACE — user clicked a link; start from the top.
      cancelRestore.current = holdScroll(0);
    }
  }, [pathname, navType]);

  return null;
}

const App = () => {
  useEffect(() => {
    // Tell the browser not to auto-restore scroll — we handle it ourselves.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force scroll to top before the page unloads/refreshes.
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };

    // Hard refresh → clear saved positions and start from top.
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") {
      clearAllScrolls();
      window.scrollTo(0, 0);
    }
    
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollManager />
          <CustomCursorProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/project" element={<Project />} />
              <Route path="/project/:categoryId" element={<ProjectCategory />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/fire-rated-a1" element={<ProductDetailA1 />} />
              <Route path="/products/fire-rated-a2" element={<ProductDetailA2 />} />
              <Route path="/products/euroclass-b" element={<ProductDetailEuroclassB />} />
              <Route path="/products/:categorySlug/:id" element={<GenericProductDetail />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/colours" element={<ColoursFinishes />} />
              <Route path="/colour-studio" element={<ColourStudio />} />
              <Route path="/technical-data" element={<TechnicalData />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CustomCursorProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
