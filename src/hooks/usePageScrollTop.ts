import { useEffect } from "react";
import { useNavigationType } from "react-router-dom";

/** Scroll to top on fresh forward navigation only — not on browser back/forward. */
export function usePageScrollTop() {
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [navigationType]);
}
