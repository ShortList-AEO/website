/**
 * All scroll-driven motion, loaded after first paint (dynamic import from MotionBoot), so the
 * hero renders without waiting for GSAP, ScrollTrigger or Lenis.
 *
 * Every section is server-rendered in its final state. This module only animates *from* that
 * state, using data-* hooks in the markup. Under prefers-reduced-motion it does nothing.
 *
 * Desktop pinned sections switch layout via the `motion-ready` class on <html> (see globals.css),
 * so without JavaScript, or with reduced motion, the stacked version shows.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setScroller, targetY } from "./scroll";

const PINNED = "(min-width: 768px)";
const PHONE = "(max-width: 767px)";

function shiftPinned() {
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: { trigger: "[data-shift]", start: "top top+=72", end: "+=900", scrub: 0.6, pin: true },
  });
  tl.to("[data-stage] [data-result]", { autoAlpha: 0, y: -24, stagger: 0.05, duration: 0.5 })
    .to("[data-stage] [data-search]", { scale: 0.92, autoAlpha: 0, duration: 0.5 }, "-=0.25")
    .fromTo(
      "[data-stage] [data-answer-card]",
      { autoAlpha: 0, y: 40, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
      "-=0.35",
    )
    .from("[data-stage] [data-pick]", { autoAlpha: 0, y: 12, stagger: 0.12, duration: 0.4 }, "-=0.2")
    .from("[data-stage] [data-line]", { autoAlpha: 0, y: 16, duration: 0.4 });
}

function lossPinned() {
  const beats = gsap.utils.toArray<HTMLElement>("[data-pin] [data-beat]");
  if (!beats.length) return;
  gsap.set(beats, { autoAlpha: 0, y: 40 });
  const tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 1 },
    scrollTrigger: { trigger: "[data-pin]", start: "top top", end: `+=${beats.length * 650}`, scrub: 0.6, pin: true },
  });
  beats.forEach((beat, i) => {
    tl.to(beat, { autoAlpha: 1, y: 0 });
    if (i < beats.length - 1) tl.to(beat, { autoAlpha: 0, y: -40 }, "+=0.6");
    else tl.to({}, { duration: 0.6 });
  });
}

/** Plays once on enter. (Not `once: true`: those triggers delete themselves mid-refresh.) */
const onEnter = (trigger: Element, start = "top 80%") => ({
  trigger,
  start,
  toggleActions: "play none none none",
});

function shiftPhone() {
  gsap.utils.toArray<HTMLElement>("[data-stacked] [data-answer-card]").forEach((card) =>
    gsap.from(card, { autoAlpha: 0, y: 32, duration: 0.7, ease: "power2.out", scrollTrigger: onEnter(card, "top 85%") }),
  );
}

/** Bars grow, range whiskers draw, numbers count up. */
function charts() {
  gsap.utils.toArray<HTMLElement>("[data-chart]").forEach((chart) => {
    const bars = chart.querySelectorAll("[data-bar]");
    const whiskers = chart.querySelectorAll("[data-whisker]");
    const counts = chart.querySelectorAll<HTMLElement>("[data-count]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: onEnter(chart) });
    if (bars.length) tl.from(bars, { scaleX: 0, duration: 0.8, stagger: 0.08 });
    if (whiskers.length) tl.from(whiskers, { scaleX: 0, autoAlpha: 0, duration: 0.45, stagger: 0.06 }, "-=0.35");
    counts.forEach((el) => {
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix ?? "%";
      const box = { v: 0 };
      tl.to(box, { v: end, duration: 0.9, ease: "power2.out", onUpdate: () => void (el.textContent = `${Math.round(box.v)}${suffix}`) }, 0);
    });
  });
}

function timeline() {
  const steps = document.querySelector("[data-steps]");
  if (!steps) return;
  gsap.fromTo(
    "[data-steps] [data-line]",
    { scaleY: 0 },
    { scaleY: 1, ease: "none", scrollTrigger: { trigger: steps, start: "top 70%", end: "bottom 60%", scrub: 0.5 } },
  );
  gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) =>
    gsap.from(step, { autoAlpha: 0, y: 24, duration: 0.7, ease: "power2.out", scrollTrigger: onEnter(step, "top 78%") }),
  );
}

export function startMotion(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  gsap.registerPlugin(ScrollTrigger);
  const root = document.documentElement;
  root.classList.add("motion-ready");

  // Lenis smooth scroll on GSAP's ticker: one RAF loop for both.
  const lenis = new Lenis({ autoRaf: false });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  // Pinned sections change the page height after Lenis measures it: re-measure on every
  // ScrollTrigger refresh and before each programmatic scroll, or targets near the end get clamped.
  const remeasure = () => lenis.resize();
  ScrollTrigger.addEventListener("refresh", remeasure);
  setScroller({
    scrollTo: (y, opts) => {
      lenis.resize();
      lenis.scrollTo(y, { immediate: opts?.immediate });
    },
  });

  const mm = gsap.matchMedia();
  mm.add(PINNED, () => {
    shiftPinned();
    lossPinned();
  });
  mm.add(PHONE, shiftPhone);
  mm.add("all", () => {
    charts();
    timeline();
  });

  // Pinned sections add height. Once fonts settle, recompute and, if the page was opened at a
  // section (e.g. /#audit), land on it again below the nav.
  void document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
    const el = location.hash.length > 1 ? document.querySelector(location.hash) : null;
    lenis.resize();
    if (el) lenis.scrollTo(targetY(el), { immediate: true });
  });

  return () => {
    mm.revert();
    ScrollTrigger.removeEventListener("refresh", remeasure);
    gsap.ticker.remove(tick);
    lenis.destroy();
    setScroller(null);
    root.classList.remove("motion-ready");
  };
}
