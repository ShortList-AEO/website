"use client";

import { useRef } from "react";
import { hindi } from "@/content/home";
import { byLanguage, CLIENT, LEADER } from "@/content/sample-report";
import { RangeBar, RangeValue } from "@/components/ui/RangeBar";
import { SampleTag } from "@/components/ui/SampleTag";
import { useChartReveal } from "@/components/ui/useChartReveal";

const SCRIPT: Record<string, string> = { en: "English", hinglish: "Hinglish", hi: "हिंदी" };

export function Hindi() {
  const root = useRef<HTMLElement>(null);
  useChartReveal(root);

  return (
    <section ref={root} aria-labelledby="hindi-h" className="section rule-top">
      <div className="wrap grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <h2 id="hindi-h" className="t-h2">
            {hindi.heading}
          </h2>
          <p className="t-lede mt-6 max-w-[30rem]">{hindi.summary}</p>
          <p className="mt-5 max-w-[30rem] text-muted">{hindi.point}</p>
        </div>

        <figure data-chart className="col-span-12 lg:col-span-6 lg:col-start-7">
          <SampleTag>{hindi.label}</SampleTag>
          <figcaption className="t-label mt-4 max-w-[34rem]">{hindi.metricNote}</figcaption>
          <div aria-hidden className="mt-8 flex flex-col gap-9">
            {byLanguage.map((row) => (
              <div key={row.lang} className="grid grid-cols-[minmax(0,1fr)] gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-[1.35rem] font-bold" lang={row.lang === "hi" ? "hi" : undefined}>
                    {SCRIPT[row.lang]}
                  </p>
                  <p className="t-label">{row.questions} questions</p>
                </div>
                <div className="grid grid-cols-[6.5rem_minmax(0,1fr)_5.5rem] items-center gap-3 sm:grid-cols-[8rem_minmax(0,1fr)_6rem]">
                  <span className="truncate text-[0.9rem] font-medium text-you">{CLIENT}</span>
                  <RangeBar range={row.you} max={50} isYou height="h-5" />
                  <RangeValue range={row.you} className="text-you" />
                  <span className="truncate text-[0.9rem] text-muted">{LEADER}</span>
                  <RangeBar range={row.leader} max={50} isYou={false} height="h-5" />
                  <RangeValue range={row.leader} />
                </div>
              </div>
            ))}
          </div>
          <div className="sr-only">
          <table>
            <caption>Share of voice by question language, sample report with fictional brands</caption>
            <thead>
              <tr>
                <th scope="col">Language</th>
                <th scope="col">{CLIENT}</th>
                <th scope="col">{LEADER}</th>
              </tr>
            </thead>
            <tbody>
              {byLanguage.map((r) => (
                <tr key={r.lang}>
                  <th scope="row">{r.label}</th>
                  <td>
                    {r.you.value}% (range {r.you.low} to {r.you.high})
                  </td>
                  <td>
                    {r.leader.value}% (range {r.leader.low} to {r.leader.high})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </figure>
      </div>
    </section>
  );
}
