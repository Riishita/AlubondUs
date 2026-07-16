import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
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
import { CustomCursorProvider } from "@/components/CustomCursor/CustomCursorProvider";
import {
  clearAllSavedScrollPositions,
  getSavedScrollPosition,
  restoreScrollPosition,
  saveScrollPosition,
  scrollStorageKey,
} from "./lib/scrollRestoration";

import { useEffect } from "react";

const queryClient = new QueryClient();

/**
 * Saves scroll per route and restores it on browser back/forward (POP).
 * Fresh link/button navigation (PUSH) always starts at the top.
 */
function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();
  const routeKey = scrollStorageKey(pathname, search, hash);

  // Persist scroll while user is on this route
  useEffect(() => {
    let ticking = false;

    const save = () => saveScrollPosition(routeKey);

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        save();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      save();
    };
  }, [routeKey]);

  // Restore on back/forward, reset on forward navigation
  useEffect(() => {
    if (navigationType === "POP") {
      const saved = getSavedScrollPosition(routeKey);
      if (saved === null) return;
      return restoreScrollPosition(routeKey, saved);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [routeKey, navigationType]);

  return null;
}

const App = () => {

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // On hard refresh → clear all saved scroll positions and start from top
    const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = navEntry?.type === "reload";
    if (isReload) {
      clearAllSavedScrollPositions();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CustomCursorProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
