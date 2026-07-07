import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import { CustomCursorProvider } from "@/components/CustomCursor/CustomCursorProvider";
import { useEffect } from "react";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {

  useEffect(() => {
    // 🔥 disable browser scroll restore
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 🔥 always go to top on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CustomCursorProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
