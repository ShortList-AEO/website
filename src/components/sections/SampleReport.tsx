"use client";

import { useRef } from "react";
import { sampleReport as copy } from "@/content/home";
import {
  CLIENT,
  LEADER,
  lostQuestions,
  namedVsPicked,
  shareOfVoice,
  sourceGaps,
  type Range,
} from "@/content/sample-report";
import { RangeBar, RangeValue } from "@/components/ui/RangeBar";
import { useChartReveal } from "@/components/ui/useChartReveal";

const SOV_MAX = 40;

function Block({ title, definition, children }: { title: string; definition: string; children: React.ReactNode }) {
  return (
    <figure data-chart className="grid-12 gap-y-6 border-t border-rule pt-10">
      <figcaption className="col-span-12 md:col-span-4">
        <h3 className="t-h3">{title}</h3>
        <p className="mt-2 max-w-[22rem] text-[0.95rem] text-muted">{definition}</p>
      </figcaption>
      <div className="col-span-12 min-w-0 md:col-span-8">{children}</div>
    </figure>
  );
}

function ShareOfVoice() {
  return (
    <Block title={copy.sov.title} definition={copy.sov.definition}>
      <div aria-hidden className="flex flex-col gap-3.5">
        {shareOfVoice.map((row) => (
          <div
            key={row.brand}
            className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1 sm:grid-cols-[9rem_minmax(0,1fr)_6.5rem]"
          >
            <span className={`text-[0.95rem] font-semibold ${row.isYou ? "text-you" : ""}`}>{row.brand}</span>
            <RangeBar range={row.sov} max={SOV_MAX} isYou={row.isYou} />
            <RangeValue range={row.sov} className={`col-start-2 sm:col-start-auto ${row.isYou ? "text-you" : ""}`} />
          </div>
        ))}
        <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[9rem_minmax(0,1fr)_6.5rem]">
          <span />
          <div className="t-label relative h-4 !text-[0.72rem]">
            {[0, 10, 20, 30, 40].map((t) => (
              <span
                key={t}
                className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full"
                style={{ left: `${(t / SOV_MAX) * 100}%` }}
              >
                {t}%
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="t-label mt-5">{copy.sov.rangeNote}</p>
      <div className="sr-only">
          <table>
        <caption>Share of voice with 95% range, sample report with fictional brands</caption>
        <tbody>
          {shareOfVoice.map((r) => (
            <tr key={r.brand}>
              <th scope="row">{r.brand}</th>
              <td>
                {r.sov.value}% (range {r.sov.low} to {r.sov.high})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </Block>
  );
}

function Stat({ label, range, isYou }: { label: string; range: Range; isYou: boolean }) {
  return (
    <div className="flex flex-col gap-1 bg-surface p-4 sm:p-5">
      <span className="text-[0.85rem] text-muted">{label}</span>
      <span className={`t-data text-[2rem] font-medium leading-none sm:text-[2.4rem] ${isYou ? "text-you" : ""}`}>
        <span data-count={range.value}>{range.value}%</span>
      </span>
      <span className="t-label">
        of answers, range {range.low}–{range.high}
      </span>
    </div>
  );
}

function NamedVsPicked() {
  const { you, leader } = namedVsPicked;
  return (
    <Block title={copy.namedPicked.title} definition={`${copy.namedPicked.namedDefinition} ${copy.namedPicked.pickedDefinition}`}>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-rule bg-rule">
        <Stat label={`${CLIENT} is named in`} range={you.named} isYou />
        <Stat label={`${LEADER} is named in`} range={leader.named} isYou={false} />
        <Stat label={`${CLIENT} is the pick in`} range={you.picked} isYou />
        <Stat label={`${LEADER} is the pick in`} range={leader.picked} isYou={false} />
      </div>
      <p className="mt-5 max-w-[40rem] text-[0.98rem]">{copy.namedPicked.takeaway}</p>
    </Block>
  );
}

function Lost() {
  return (
    <Block title={copy.lost.title} definition={copy.lost.definition}>
      <ul className="flex flex-col">
        {lostQuestions.map((q) => (
          <li key={q.question} className="grid gap-x-6 gap-y-3 border-b border-rule py-5 first:pt-0 sm:grid-cols-[minmax(0,1fr)_9rem]">
            <div className="min-w-0">
              <p className="t-label mb-1.5">{q.langLabel}</p>
              <p lang={q.lang === "hi" ? "hi" : undefined} className="text-[1.08rem] font-semibold leading-snug">
                {q.question}
              </p>
              <blockquote
                lang={q.lang === "hi" ? "hi" : undefined}
                className="mt-2.5 border-l-2 border-rival pl-3 text-[0.95rem] text-muted"
              >
                “{q.quote}”
              </blockquote>
            </div>
            <div className="flex flex-col gap-2 sm:items-end sm:text-right">
              <p className="font-semibold">{q.winner}</p>
              <p className="t-label">
                won {q.won} of {q.of}
              </p>
              <div aria-hidden className="flex gap-1">
                {Array.from({ length: q.of }, (_, i) => (
                  <span key={i} className={`size-2 rounded-full ${i < q.won ? "bg-rival" : "border border-rival"}`} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function Gaps() {
  const max = Math.max(...sourceGaps.sites.map((s) => s.answers));
  return (
    <Block title={copy.gaps.title} definition={copy.gaps.definition}>
      <div aria-hidden className="flex flex-col gap-3">
        {sourceGaps.sites.map((s) => (
          <div key={s.domain} className="grid grid-cols-[7.5rem_minmax(0,1fr)_2.5rem] items-center gap-3 sm:grid-cols-[9rem_minmax(0,1fr)_3rem]">
            <span className="t-data text-[0.9rem]">{s.domain}</span>
            <div className="h-2.5 rounded-[2px] bg-rival-soft/60">
              <div data-bar className="h-full origin-left rounded-[2px] bg-ink/80" style={{ width: `${(s.answers / max) * 100}%` }} />
            </div>
            <span className="t-data text-right">
              <span data-count={s.answers} data-suffix="">
                {s.answers}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="sr-only">
          <table>
        <caption>Websites cited in the {sourceGaps.lostAnswers} answers where a competitor was picked</caption>
        <tbody>
          {sourceGaps.sites.map((s) => (
            <tr key={s.domain}>
              <th scope="row">{s.domain}</th>
              <td>{s.answers} answers</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </Block>
  );
}

export function SampleReport() {
  const root = useRef<HTMLElement>(null);
  useChartReveal(root);

  return (
    <section ref={root} id={copy.id} aria-labelledby="report-h" className="section rule-top">
      <div className="wrap">
        <div className="mb-10 flex flex-col gap-3 rounded-[4px] border border-rule bg-surface px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="t-label shrink-0 rounded-[3px] bg-ink px-2 py-0.5 !text-bg">Sample</span>
          <p className="text-[0.95rem]">{copy.banner}</p>
        </div>
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8">
            <h2 id="report-h" className="t-h2">
              {copy.heading}
            </h2>
            <p className="t-lede mt-6 max-w-[38rem] text-muted">{copy.intro}</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-16">
          <ShareOfVoice />
          <NamedVsPicked />
          <Lost />
          <Gaps />
        </div>
      </div>
    </section>
  );
}
