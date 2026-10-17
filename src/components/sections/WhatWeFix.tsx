import { whatWeFix } from "@/content/home";

/* Small looping illustrations (CSS only, paused under reduced motion via .loop).
   In each, the orange element is your brand finally showing up. */

function Reviews() {
  const rows = [0, 1, 2];
  return (
    <div className="loop flex flex-col gap-2.5">
      {rows.map((i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 [animation:rise_4.8s_cubic-bezier(.25,1,.5,1)_infinite]"
          style={{ animationDelay: `${i * 0.35}s` }}
        >
          <span className={`size-5 shrink-0 rounded-full ${i === 2 ? "bg-you" : "bg-rival-soft"}`} />
          <span className="h-2 rounded-full bg-rival-soft" style={{ width: `${[78, 62, 70][i]}%` }} />
        </div>
      ))}
    </div>
  );
}

function Answer() {
  return (
    <div className="loop flex flex-col gap-3">
      <div className="ml-auto h-5 w-[62%] rounded-[10px] rounded-br-[3px] bg-rival-soft" />
      <div className="flex flex-col gap-2">
        <span className="h-2 w-[86%] origin-left rounded-full bg-rival-soft [animation:sweep_4.8s_cubic-bezier(.25,1,.5,1)_infinite]" />
        <span className="flex items-center gap-2">
          <span className="h-2 w-[30%] origin-left rounded-full bg-rival-soft [animation:sweep_4.8s_cubic-bezier(.25,1,.5,1)_infinite_.2s]" />
          <span className="h-3.5 w-[28%] origin-left rounded-[3px] bg-you [animation:sweep_4.8s_cubic-bezier(.25,1,.5,1)_infinite_.4s]" />
        </span>
      </div>
    </div>
  );
}

function Hindi() {
  return (
    <div className="loop flex h-full items-center">
      <p lang="hi" className="font-deva text-[1.5rem] leading-none">
        <span className="text-muted">सबसे अच्छा: </span>
        <span className="text-you">आपका ब्रांड</span>
        <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[3px] bg-ink [animation:caret_1s_steps(1)_infinite]" />
      </p>
    </div>
  );
}

const ART = [Reviews, Answer, Hindi];

export function WhatWeFix() {
  return (
    <section aria-labelledby="fix-h" className="section rule-top">
      <div className="wrap">
        <h2 id="fix-h" className="t-h2 max-w-[14ch]">
          {whatWeFix.heading}
        </h2>
        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {whatWeFix.cards.map((c, i) => {
            const Art = ART[i]!;
            return (
              <li key={c.title} className="flex flex-col gap-5 border-t border-ink pt-6">
                <div aria-hidden className="h-28 rounded-[4px] border border-rule bg-surface p-4">
                  <Art />
                </div>
                <h3 className="t-h3">{c.title}</h3>
                <p className="text-muted">{c.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
