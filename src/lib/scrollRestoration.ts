/**
 * SCROLL RESTORATION — clean rewrite
 *
 * One rule: when the user presses browser Back, the page opens at the
 * exact pixel (window.scrollY) they were at before navigating away.
 * No offset, no header adjustment, no smooth animation.
 */

const KEY = (path: string) => `__scroll__${path}`;

/** Save current scroll position for this pathname. */
export function saveScroll(path: string) {
  sessionStorage.setItem(KEY(path), String(window.scrollY));
}

/** Get saved scroll position, or null. */
export function readScroll(path: string): number | null {
  const raw = sessionStorage.getItem(KEY(path));
  if (raw === null) return null;
  const n = parseInt(raw, 10);
  return isFinite(n) ? n : null;
}

/** Clear all saved positions (called on hard reload). */
export function clearAllScrolls() {
  Object.keys(sessionStorage)
    .filter((k) => k.startsWith("__scroll__"))
    .forEach((k) => sessionStorage.removeItem(k));
}

/**
 * Apply scroll position immediately and keep re-applying it on every
 * animation frame until the page height has been stable for HOLD_MS ms.
 *
 * This handles React.lazy / Suspense pages where lazy sections mount one
 * by one, changing scrollHeight each time.  We simply jump back to the
 * target on every frame where the height changed, and stop once it has
 * been the same height for HOLD_MS consecutive milliseconds.
 *
 * Returns a cancel function (used by React useEffect cleanup).
 */
export function holdScroll(target: number): () => void {
  const HOLD_MS = 500; // how long the height must be stable before we stop

  let done = false;
  let rafId = 0;
  let lastHeight = -1;
  let stableSince = 0; // timestamp when current height was first seen

  const step = (now: number) => {
    if (done) return;

    const h = document.documentElement.scrollHeight;

    if (h !== lastHeight) {
      // Height changed — re-apply target and reset the stability timer.
      lastHeight = h;
      stableSince = now;
      applyScroll(target);
    } else if (now - stableSince >= HOLD_MS) {
      // Height stable for HOLD_MS ms — do one final jump and stop.
      applyScroll(target);
      cancel();
      return;
    }

    rafId = requestAnimationFrame(step);
  };

  rafId = requestAnimationFrame(step);

  // Hard cap: stop after 5 s no matter what.
  const timer = window.setTimeout(() => {
    applyScroll(target);
    cancel();
  }, 5000);

  function cancel() {
    done = true;
    cancelAnimationFrame(rafId);
    clearTimeout(timer);
  }

  return cancel;
}

/** Instant scroll — overrides any CSS scroll-behavior: smooth. */
function applyScroll(y: number) {
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  // Restore after a tick so we don't permanently break smooth anchors.
  requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = "";
    document.body.style.scrollBehavior = "";
  });
}
