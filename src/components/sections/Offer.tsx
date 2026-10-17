import { offer } from "@/content/home";
import { MagneticCta } from "@/components/ui/MagneticCta";

export function Offer() {
  return (
    <section aria-labelledby="offer-h" className="section rule-top">
      <div className="wrap grid-12 gap-y-10">
        <h2 id="offer-h" className="t-h2 col-span-12 md:col-span-5">
          {offer.heading}
        </h2>
        <div className="col-span-12 grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule sm:grid-cols-2 md:col-span-7">
          <div className="flex flex-col gap-4 bg-surface p-6 sm:p-8">
            <h3 className="t-h3 text-[1.5rem]">{offer.audit.title}</h3>
            <p className="text-muted">{offer.audit.body}</p>
            <div className="mt-auto pt-4">
              <MagneticCta cta={offer.cta} />
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-bg p-6 sm:p-8">
            <h3 className="t-h3 text-[1.5rem]">{offer.monthly.title}</h3>
            <p className="text-muted">{offer.monthly.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
