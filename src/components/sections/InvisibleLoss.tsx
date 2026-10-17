import { invisibleLoss } from "@/content/home";

/** Pinned three-beat statements on desktop (motion runtime); a stacked list otherwise. */
export function InvisibleLoss() {
  return (
    <section aria-labelledby="loss-h" className="rule-top">
      <div className="wrap grid-12 pt-[clamp(80px,12vw,168px)]">
        <div className="col-span-12 md:col-span-8">
          <h2 id="loss-h" className="t-h2">
            {invisibleLoss.heading}
          </h2>
          <p className="t-lede mt-6 max-w-[36rem] text-muted">{invisibleLoss.intro}</p>
        </div>
      </div>

      {/* Desktop with motion: one beat at a time, pinned. */}
      <div data-pin aria-hidden className="relative hidden h-[100svh] md:motion-ready:block">
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

      {/* Phones, no JavaScript, and reduced motion: stacked. With desktop motion it stays for screen readers. */}
      <ol className="wrap flex flex-col gap-10 pb-[clamp(80px,12vw,168px)] pt-14 md:motion-ready:sr-only">
        {invisibleLoss.beats.map((b) => (
          <li key={b} className="t-h2 max-w-[20ch] !text-[clamp(1.7rem,1.2rem+2.4vw,2.6rem)]">
            {b}
          </li>
        ))}
      </ol>
    </section>
  );
}
