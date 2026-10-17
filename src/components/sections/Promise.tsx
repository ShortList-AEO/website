import { promise } from "@/content/home";

export function Promise() {
  return (
    <section aria-labelledby="promise-h" className="section rule-top">
      <div className="wrap grid-12 gap-y-10">
        <h2 id="promise-h" className="t-label col-span-12 !text-[0.95rem] md:col-span-3">
          {promise.heading}
        </h2>
        <div className="col-span-12 flex flex-col gap-10 md:col-span-9">
          {promise.lines.map((line, i) => (
            <p
              key={line}
              className={`font-display font-bold tracking-[-0.025em] ${
                i === 0
                  ? "text-[clamp(2rem,1.2rem+3.6vw,4rem)] leading-[1.02]"
                  : "max-w-[32ch] text-[clamp(1.3rem,1rem+1.2vw,1.9rem)] leading-[1.2] text-muted"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
