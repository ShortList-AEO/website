"use client";

import { useEffect } from "react";

/** Loads the scroll-motion runtime (GSAP, ScrollTrigger, Lenis) once the browser is idle. */
export function MotionBoot() {
  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    const load = () =>
      import("@/lib/motion-runtime").then(({ startMotion }) => {
        if (!cancelled) stop = startMotion();
      });
    const idle = "requestIdleCallback" in window;
    const handle = idle ? window.requestIdleCallback(() => void load(), { timeout: 2000 }) : window.setTimeout(() => void load(), 600);
    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      stop?.();
    };
  }, []);
  return null;
}
