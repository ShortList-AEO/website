import type { Metadata } from "next";
import Link from "next/link";
import { method, site } from "@/content/site";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: `${method.title}: ${site.name}`,
  description: "How ShortList measures what AI assistants recommend: fixed questions, repeated asks, ranges on every number.",
  alternates: { canonical: "/how-we-measure" },
};

export default function HowWeMeasure() {
  return (
    <>
      <header className="wrap flex h-[var(--nav-h)] items-center">
        <Link href="/" className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em]">
          {site.name}
        </Link>
      </header>
      <main id="main" className="wrap pb-24 pt-12 md:pt-20">
        <h1 className="t-h2 max-w-[14ch]">{method.title}</h1>
        <div className="mt-12 flex max-w-[44rem] flex-col gap-10">
          {method.sections.map((s) => (
            <section key={s.heading} className="border-t border-rule pt-6">
              <h2 className="t-h3">{s.heading}</h2>
              <p className="mt-3 text-muted">{s.body}</p>
            </section>
          ))}
        </div>
        <Link href="/#audit" className="mt-14 inline-flex rounded-[3px] bg-ink px-5 py-3.5 font-semibold text-bg hover:opacity-90">
          {site.nav.cta.label}
        </Link>
      </main>
      <Footer />
    </>
  );
}
