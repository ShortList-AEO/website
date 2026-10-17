"use client";

import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LazyMotion features={domAnimation} strict>
        <SmoothScroll>{children}</SmoothScroll>
      </LazyMotion>
    </ThemeProvider>
  );
}
