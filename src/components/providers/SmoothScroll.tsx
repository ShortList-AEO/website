"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap, MQ, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

/** Ref to the Lenis instance; `.current` is null when smooth scroll is off (reduced motion, before mount). */
export const useLenis = () => useContext(LenisContext);

/** Height of the sticky nav plus breathing room, in px. */
function navSpace(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return (Number.parseFloat(raw) || 64) + 16;
}

/**
 * Lenis smooth scroll driven by GSAP's ticker, so Lenis and ScrollTrigger share one RAF loop.
 * Off entirely under prefers-reduced-motion (native scroll + CSS scroll-padding instead).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia(MQ.reduced).matches) return;
    const instance = new Lenis({ autoRaf: false });
    instance.on("scroll", ScrollTrigger.update);
    const update = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis.current = instance;
    // Pinned sections add height after load. Once fonts settle, recompute triggers and, if the
    // page was opened at a section (e.g. /#audit), land on it again below the nav.
    void document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      const el = location.hash.length > 1 ? document.querySelector<HTMLElement>(location.hash) : null;
      if (el) instance.scrollTo(Math.max(0, window.scrollY + el.getBoundingClientRect().top - navSpace()), { immediate: true });
    });
    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroll to an in-page anchor, smoothly when Lenis is on, with the sticky-nav offset. */
export function scrollToHash(lenis: Lenis | null, hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  const y = Math.max(0, window.scrollY + el.getBoundingClientRect().top - navSpace());
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y });
  history.replaceState(null, "", hash);
}
