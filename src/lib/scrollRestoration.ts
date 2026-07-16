const SCROLL_PREFIX = "scroll:";

export function scrollStorageKey(pathname: string, search = "", hash = "") {
  return `${pathname}${search}${hash}`;
}

export function saveScrollPosition(routeKey: string) {
  sessionStorage.setItem(`${SCROLL_PREFIX}${routeKey}`, String(window.scrollY));
}

export function getSavedScrollPosition(routeKey: string) {
  const raw = sessionStorage.getItem(`${SCROLL_PREFIX}${routeKey}`);
  if (raw === null) return null;
  const value = parseInt(raw, 10);
  return Number.isFinite(value) ? value : null;
}

export function clearAllSavedScrollPositions() {
  Object.keys(sessionStorage).forEach((key) => {
    if (key.startsWith(SCROLL_PREFIX)) sessionStorage.removeItem(key);
  });
}

/** Jump instantly — used while lazy sections are still mounting. */
export function jumpToScroll(target: number) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  // Temporarily disable any CSS smooth scrolling
  html.style.scrollBehavior = "auto";
  
  // Use behavior: 'instant' for explicit instant jump
  window.scrollTo({
    top: target,
    left: 0,
    behavior: "instant",
  });
  
  // Revert back the scroll behavior after jump
  html.style.scrollBehavior = previous;
}

/**
 * Restore scroll and keep re-applying while page height grows
 * (lazy sections, images, etc.) until we land on the target.
 */
export function restoreScrollPosition(
  routeKey: string,
  target: number
): () => void {
  let settled = false;

  const tryJump = () => {
    if (settled) return;
    jumpToScroll(target);
    requestAnimationFrame(() => {
      if (Math.abs(window.scrollY - target) <= 4) {
        settled = true;
        observer.disconnect();
      }
    });
  };

  tryJump();

  const observer = new ResizeObserver(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll >= target) tryJump();
  });

  observer.observe(document.documentElement);
  observer.observe(document.body);

  const timeout = window.setTimeout(() => {
    settled = true;
    observer.disconnect();
  }, 4000);

  return () => {
    settled = true;
    observer.disconnect();
    window.clearTimeout(timeout);
  };
}
