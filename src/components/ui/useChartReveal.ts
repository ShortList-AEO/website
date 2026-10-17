"use client";

import type { RefObject } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Inside `scope`: bars ([data-bar]) grow from zero, range whiskers ([data-whisker]) draw after,
 * and numbers ([data-count]) count up, once, when the chart enters the viewport.
 * Reduced motion: nothing animates; the final state is already in the markup.
 */
export function useChartReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const charts = gsap.utils.toArray<HTMLElement>("[data-chart]");
        charts.forEach((chart) => {
          const bars = chart.querySelectorAll("[data-bar]");
          const whiskers = chart.querySelectorAll("[data-whisker]");
          const counts = chart.querySelectorAll<HTMLElement>("[data-count]");
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: chart, start: "top 80%", toggleActions: "play none none none" },
          });
          if (bars.length) tl.from(bars, { scaleX: 0, duration: 0.8, stagger: 0.08 });
          if (whiskers.length) tl.from(whiskers, { scaleX: 0, autoAlpha: 0, duration: 0.45, stagger: 0.06 }, "-=0.35");
          counts.forEach((el) => {
            const end = Number(el.dataset.count);
            const suffix = el.dataset.suffix ?? "%";
            const box = { v: 0 };
            tl.to(
              box,
              {
                v: end,
                duration: 0.9,
                ease: "power2.out",
                onUpdate: () => {
                  el.textContent = `${Math.round(box.v)}${suffix}`;
                },
              },
              0,
            );
          });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
