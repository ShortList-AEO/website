"use client";

import { useRef } from "react";
import { shift } from "@/content/home";
import { Cite } from "@/components/ui/Cite";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Illustration only: generic results pages (no real brand names in titles). */
const RESULTS = [
  { site: "nykaa.com", title: "Best sunscreens for oily skin in India" },
  { site: "femina.in", title: "12 sunscreens dermatologists swear by" },
  { site: "reddit.com", title: "Which sunscreen actually works for oily skin?" },
  { site: "youtube.com", title: "I tried 9 budget sunscreens so you don't have to" },
  { site: "amazon.in", title: "Sunscreen for oily skin: bestsellers" },
  { site: "vogue.in", title: "The only sunscreens worth buying this summer" },
  { site: "healthshots.com", title: "How to choose a sunscreen for acne-prone skin" },
  { site: "elle.in", title: "Matte sunscreens that don't leave a white cast" },
  { site: "quora.com", title: "Is a gel sunscreen better for oily skin?" },
  { site: "myntra.com", title: "Sunscreens under ₹500" },
];

const PICKS = [
  { name: "Vedra Matte Gel SPF 50", why: "best overall for oily skin" },
  { name: "GlowLab Aqua Fluid SPF 50", why: "lightest texture" },
  { name: "Saffra Skin Daily Shield", why: "best under ₹400" },
];

function SearchPage() {
  return (
    <div className="rounded-[6px] border border-rule bg-surface p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2 rounded-full border border-rule px-4 py-2">
        <span className="size-3 rounded-full border-[1.5px] border-muted" aria-hidden />
        <span className="text-[0.9rem] text-muted">best sunscreen for oily skin under ₹500</span>
      </div>
      <ol className="flex flex-col gap-3.5">
        {RESULTS.map((r, i) => (
          <li key={r.site} data-result className={i >= 6 ? "hidden md:block" : ""}>
            <p className="t-label !text-[0.75rem]">{r.site}</p>
            <p className="text-[0.95rem] leading-snug text-ink/80">{r.title}</p>
          </li>
        ))}
      </ol>
      <p data-result className="t-label mt-4">Page 1 of 10</p>
    </div>
  );
}

function AnswerCard() {
  return (
    <div className="rounded-[6px] border border-ink/70 bg-surface p-5 shadow-[var(--shadow)] sm:p-6">
      <p className="t-label mb-3">AI answer</p>
      <p className="text-[1rem] leading-relaxed text-muted">For oily skin under ₹500, go with one of these:</p>
      <ol className="mt-4 flex flex-col gap-3">
        {PICKS.map((p, i) => (
          <li key={p.name} data-pick className="flex items-baseline gap-3">
            <span className="t-data text-[0.85rem] text-muted">{i + 1}</span>
            <span>
              <span className="font-semibold">{p.name}</span>
              <span className="text-muted">, {p.why}</span>
            </span>
          </li>
        ))}
      </ol>
      <p data-pick className="mt-5 border-t border-dashed border-rule pt-3 text-[0.92rem] font-medium text-you">
        Your brand isn&apos;t one of them.
      </p>
    </div>
  );
}

export function Shift() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.pinned, () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: "[data-stage]", start: "top top+=96", end: "+=900", scrub: 0.6, pin: true },
        });
        tl.to("[data-result]", { autoAlpha: 0, y: -24, stagger: 0.05, duration: 0.5 })
          .to("[data-search]", { scale: 0.92, autoAlpha: 0, duration: 0.5 }, "-=0.25")
          .fromTo("[data-answer-card]", { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 }, "-=0.35")
          .from("[data-pick]", { autoAlpha: 0, y: 12, stagger: 0.12, duration: 0.4 }, "-=0.2")
          .from("[data-line]", { autoAlpha: 0, y: 16, duration: 0.4 });
      });
      mm.add(`(max-width: 767px) and ${MQ.motion}`, () => {
        gsap.from("[data-answer-card]", {
          autoAlpha: 0,
          y: 32,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-answer-card]", start: "top 85%", toggleActions: "play none none none" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="shift-h" className="section overflow-hidden">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 md:col-span-5">
          <h2 id="shift-h" className="t-h2 max-w-[12ch]">
            {shift.heading}
          </h2>
          <p className="t-lede mt-6 max-w-[30rem] text-muted">
            {shift.support.text}
            <Cite id={shift.support.sourceId!} />
          </p>
        </div>

        {/* Desktop: one stage, search page collapses into the answer as you scroll. */}
        <div data-stage className="relative col-span-12 hidden md:col-span-7 md:col-start-6 md:motion-safe:block">
          <p className="t-label mb-3">Illustration</p>
          <div className="relative">
            <div data-search>
              <SearchPage />
            </div>
            <div data-answer-card className="absolute inset-x-6 top-16 md:invisible">
              <AnswerCard />
            </div>
          </div>
          <p data-line className="t-h3 mt-8 text-[1.6rem]">
            {shift.line}
          </p>
        </div>

        {/* Phones, and desktop with reduced motion: before and after, stacked. */}
        <div className="col-span-12 flex flex-col gap-5 md:col-span-7 md:col-start-6 md:motion-safe:hidden">
          <p className="t-label">{shift.illustrationLabel}</p>
          <SearchPage />
          <div data-answer-card>
            <AnswerCard />
          </div>
          <p className="t-h3 mt-3 text-[1.45rem]">{shift.line}</p>
        </div>
      </div>
    </section>
  );
}
