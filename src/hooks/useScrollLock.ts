import { useEffect, useLayoutEffect } from "react";
import {
  resetSmoothScroll,
  startSmoothScroll,
  stopSmoothScroll,
} from "./useSmoothScroll";

/** Block page scroll (Lenis + native) while preloader / overlays are active. */
export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (locked) {
      stopSmoothScroll();
      resetSmoothScroll();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return;
    }

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    resetSmoothScroll();
    startSmoothScroll();
  }, [locked]);

  useEffect(() => {
    if (!locked) return;

    const blockScroll = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [locked]);
}
