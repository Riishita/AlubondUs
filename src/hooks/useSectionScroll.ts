import { useScroll, useSpring, UseScrollOptions } from "framer-motion";
import { TRANSITIONS } from "../lib/transitions";
import { RefObject } from "react";

/**
 * useSectionScroll
 * A unified hook that wraps Framer Motion's useScroll and useSpring to ensure
 * scroll-based animations feel identical (same interpolation physics) across every section.
 */
export function useSectionScroll(
  target: RefObject<HTMLElement>,
  offset: UseScrollOptions["offset"] = ["start start", "end end"]
) {
  const { scrollYProgress } = useScroll({
    target,
    offset,
  });

  // Automatically applies the standardized spring to smooth out janky wheel/touch scrolling consistently
  const smoothProgress = useSpring(scrollYProgress, TRANSITIONS.spring);

  return { scrollYProgress, smoothProgress };
}
