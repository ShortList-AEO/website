import { hero } from "@/content/home";
import { CtaLink } from "@/components/ui/CtaLink";
import { Lines } from "@/components/ui/Lines";
import { HeroChat } from "./HeroChat";
import { HeroHeadline } from "./HeroHeadline";

export function Hero() {
  return (
    <section id="top" className="relative pb-6 pt-[calc(var(--nav-h)+40px)] md:pb-10 md:pt-[calc(var(--nav-h)+88px)]">
      <div className="wrap grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-7">
          <HeroHeadline text={hero.headline} />
          <Lines lines={hero.sub} className="t-lede mt-7 max-w-[34rem] text-muted" />
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaLink cta={hero.primaryCta} />
            <CtaLink cta={hero.secondaryCta} variant="secondary" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <HeroChat />
        </div>
      </div>
    </section>
  );
}
