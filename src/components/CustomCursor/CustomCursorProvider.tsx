"use client";

import { createContext, useContext, useMemo } from "react";

const CustomCursorContext = createContext<null>(null);

export function CustomCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

/* ================= HOOK ================= */
export function useCustomCursorBindings(useBrand = false) {
  return useMemo(() => {
    return {
      cursorSectionProps: {},
      cursorSectionClassName: "",
    };
  }, []);
}