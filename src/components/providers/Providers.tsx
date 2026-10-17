"use client";

import { ThemeProvider } from "next-themes";
import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";
import { MotionBoot } from "./MotionBoot";

// Motion's animation features load after first paint; components use the tiny `m` elements.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={loadFeatures} strict>
        {children}
        <MotionBoot />
      </LazyMotion>
    </ThemeProvider>
  );
}
