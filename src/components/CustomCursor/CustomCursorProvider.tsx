"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type CustomCursorContextValue = {
  beginSectionHover: (
    clientX: number,
    clientY: number,
    useBrand?: boolean
  ) => void;
  endSectionHover: (e: React.PointerEvent<Element>) => void;
};

const CustomCursorContext = createContext<CustomCursorContextValue | null>(null);

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerFinePointerSnapshot() {
  return false;
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerFinePointerSnapshot
  );
}

export function CustomCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const finePointer = useFinePointer();
  const [active, setActive] = useState(false);
  const [isBrand, setIsBrand] = useState(false); // 🔥 NEW

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const dotEl = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // 🔥 UPDATED
  const beginSectionHover = useCallback(
    (clientX: number, clientY: number, useBrand = false) => {
      if (!finePointer) return;
      mouseRef.current = { x: clientX, y: clientY };
      ringRef.current = { x: clientX, y: clientY };
      setIsBrand(useBrand); // 🔥 control color
      setActive(true);
    },
    [finePointer]
  );

  const endSectionHover = useCallback(
    (e: React.PointerEvent<Element>) => {
      const t = e.relatedTarget as HTMLElement | null;
      if (t?.closest?.("[data-cursor-scope]")) return;
      setActive(false);
    },
    []
  );

  useEffect(() => {
    if (!active || !finePointer) return;

    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, finePointer]);

  useLayoutEffect(() => {
    if (!active || !finePointer) return;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    ringRef.current = { x: mx, y: my };

    if (dotEl.current) {
      dotEl.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    }

    if (ringEl.current) {
      ringEl.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    }
  }, [active, finePointer]);

  useEffect(() => {
    if (!active || !finePointer) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const lerp = 0.14;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      const { x: mx, y: my } = mouseRef.current;
      const ring = ringRef.current;

      ring.x += (mx - ring.x) * lerp;
      ring.y += (my - ring.y) * lerp;

      if (dotEl.current) {
        dotEl.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }

      if (ringEl.current) {
        ringEl.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [active, finePointer]);

  // 🔥 COLOR SWITCH
  const color = isBrand ? "#0d2855" : "#ffffff";

  const value = useMemo(
    () => ({ beginSectionHover, endSectionHover }),
    [beginSectionHover, endSectionHover]
  );

  return (
    <CustomCursorContext.Provider value={value}>
      {children}

      {finePointer && active && (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          {/* DOT */}
          <div
            ref={dotEl}
            className="fixed h-1.5 w-1.5 rounded-full will-change-transform"
            style={{
              backgroundColor: color,
              transform: "translate3d(0,0,0) translate(-50%, -50%)",
              transition: "background-color 0.25s ease",
            }}
          />

          {/* RING */}
          <div
            ref={ringEl}
            className="fixed h-9 w-9 rounded-full border will-change-transform"
            style={{
              borderColor: color,
              transform: "translate3d(0,0,0) translate(-50%, -50%)",
              transition: "border-color 0.25s ease",
            }}
          />
        </div>
      )}
    </CustomCursorContext.Provider>
  );
}

/* ================= HOOK ================= */
export function useCustomCursorBindings(useBrand = false) {
  const ctx = useContext(CustomCursorContext);
  const finePointer = useFinePointer();

  return useMemo(() => {
    if (!ctx || !finePointer) {
      return {
        cursorSectionProps: {},
        cursorSectionClassName: "",
      };
    }

    return {
      cursorSectionProps: {
        "data-cursor-scope": true as const,
        onPointerEnter: (e: React.PointerEvent<Element>) => {
          ctx.beginSectionHover(e.clientX, e.clientY, useBrand); // 🔥 key
        },
        onPointerLeave: (e: React.PointerEvent<Element>) => {
          ctx.endSectionHover(e);
        },
      },
      cursorSectionClassName: "[&_*]:!cursor-none",
    };
  }, [ctx, finePointer, useBrand]);
}