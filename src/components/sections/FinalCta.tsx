import { finalCta } from "@/content/home";
import { AuditForm } from "./AuditForm";

/** Inverted band: ink background with page-coloured text, in either theme. */
export function FinalCta() {
  return (
    <section id={finalCta.id} aria-labelledby="cta-h" className="bg-ink py-[clamp(72px,10vw,140px)] text-bg">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-5">
          <h2 id="cta-h" className="t-h2">
            {finalCta.heading}
          </h2>
          <p className="t-lede mt-6 max-w-[28rem] opacity-80">{finalCta.body}</p>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <AuditForm />
        </div>
      </div>
    </section>
  );
}
