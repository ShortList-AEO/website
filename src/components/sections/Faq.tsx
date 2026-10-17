"use client";

import { useId, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { faq } from "@/content/faq";

/** Accessible accordion: buttons with aria-expanded/aria-controls; panels fade in. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" aria-labelledby="faq-h" className="section rule-top">
      <div className="wrap grid-12 gap-y-10">
        <h2 id="faq-h" className="t-h2 col-span-12 md:col-span-4">
          {faq.heading}
        </h2>
        <ul className="col-span-12 md:col-span-8">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const btn = `${base}-q${i}`;
            const panel = `${base}-a${i}`;
            return (
              <li key={item.q} className="border-b border-rule first:border-t">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[1.15rem] font-bold tracking-[-0.01em] sm:text-[1.25rem]"
                  >
                    {item.q}
                    <span aria-hidden className="relative size-4 shrink-0">
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-ink" />
                      <span
                        className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-ink transition-transform duration-300 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <m.div
                      id={panel}
                      role="region"
                      aria-labelledby={btn}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <p className="max-w-[44rem] pb-6 text-muted">{item.a}</p>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
