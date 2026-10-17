"use client";

import { useRef } from "react";
import { invisibleLoss } from "@/content/home";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Pinned three-beat statements on desktop; a stacked list on phones and with reduced motion. */
export function InvisibleLoss() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.pinned, () => {
        const beats = gsap.utils.toArray<HTMLElement>("[data-beat]");
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
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="loss-h" className="rule-top">
      <div className="wrap grid-12 pt-[clamp(80px,12vw,168px)]">
        <div className="col-span-12 md:col-span-8">
          <h2 id="loss-h" className="t-h2">
            {invisibleLoss.heading}
          </h2>
          <p className="t-lede mt-6 max-w-[36rem] text-muted">{invisibleLoss.intro}</p>
        </div>
      </div>

      {/* Desktop with motion: one beat at a time, pinned. */}
      <div data-pin className="relative hidden h-[100svh] md:motion-safe:block">
        <div className="wrap relative flex h-full items-center">
          {invisibleLoss.beats.map((b, i) => (
            <p
              key={b}
              data-beat
              className={`t-h2 absolute max-w-[20ch] ${i === invisibleLoss.beats.length - 1 ? "text-ink" : "text-ink/90"}`}
            >
              {b}
            </p>
          ))}
        </div>
      </div>

      {/* Phones and reduced motion: stacked. */}
      <ol className="wrap flex flex-col gap-10 pb-[clamp(80px,12vw,168px)] pt-14 md:motion-safe:hidden">
        {invisibleLoss.beats.map((b) => (
          <li key={b} className="t-h2 max-w-[20ch] !text-[clamp(1.7rem,1.2rem+2.4vw,2.6rem)]">
            {b}
          </li>
        ))}
      </ol>
    </section>
  );
}
