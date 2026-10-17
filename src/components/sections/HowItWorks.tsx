import { howItWorks } from "@/content/home";

/** Three steps on a vertical line that draws itself as you scroll. */
export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-h" className="section rule-top">
      <div className="wrap grid-12 gap-y-12">
        <h2 id="how-h" className="t-h2 col-span-12 md:col-span-4">
          {howItWorks.heading}
        </h2>
        <ol data-steps className="relative col-span-12 flex flex-col gap-14 md:col-span-7 md:col-start-6">
          <span aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-rule" />
          <span data-line aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px origin-top bg-ink" />
          {howItWorks.steps.map((s, i) => (
            <li key={s.title} data-step className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-5">
              <span className="t-data relative z-10 grid size-8 place-items-center rounded-full border-[1.5px] border-ink bg-bg text-[0.85rem] font-medium">
                {i + 1}
              </span>
              <div>
                <h3 className="t-h3 text-[1.45rem]">{s.title}</h3>
                <p className="mt-3 max-w-[36rem] text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
