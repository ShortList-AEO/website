/**
 * Tiny scroll helper with no dependencies, so CTAs and the nav can use it before the motion
 * runtime (GSAP + Lenis) has loaded. The runtime registers its smooth scroller here.
 */
export interface Scroller {
  scrollTo(y: number, opts?: { immediate?: boolean }): void;
}

let current: Scroller | null = null;

export function setScroller(s: Scroller | null) {
  current = s;
}

/** Height of the sticky nav plus breathing room, in px. */
export function navSpace(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--nav-h");
  return (Number.parseFloat(raw) || 64) + 16;
}

export function targetY(el: Element): number {
  return Math.max(0, window.scrollY + el.getBoundingClientRect().top - navSpace());
}

/** Scroll to an in-page anchor below the sticky nav: smooth with Lenis, native otherwise. */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const y = targetY(el);
  if (current) current.scrollTo(y);
  else window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", hash);
}

export function scrollToTop() {
  if (current) current.scrollTo(0);
  else window.scrollTo({ top: 0 });
  history.replaceState(null, "", " ");
}
