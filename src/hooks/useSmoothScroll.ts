import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

export const stopSmoothScroll = () => {
  lenisInstance?.stop();
};

export const startSmoothScroll = () => {
  lenisInstance?.start();
};

export const resetSmoothScroll = () => {
  lenisInstance?.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
};

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
      syncTouch: false,
    });

    lenisInstance = lenis;

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);
};
