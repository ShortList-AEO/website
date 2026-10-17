import Link from "next/link";
import { site } from "@/content/site";
import { sources } from "@/content/sources";
import { SOURCE_ORDER } from "@/components/ui/Cite";

export function Footer() {
  return (
    <footer className="border-t border-rule py-14">
      <div className="wrap grid-12 gap-y-10">
        <div className="col-span-12 flex flex-col gap-3 md:col-span-4">
          <p className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em]">{site.name}</p>
          <p className="text-muted">{site.footer.contact}</p>
          <Link href={site.footer.methodLink.href} className="w-fit underline decoration-rule underline-offset-4 hover:decoration-ink">
            {site.footer.methodLink.label}
          </Link>
          <p className="max-w-[22rem] text-[0.88rem] text-muted">{site.footer.privacy}</p>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <h2 className="t-label mb-3 !text-[0.85rem]">Sources</h2>
          <ol className="flex flex-col gap-3 text-[0.88rem] text-muted">
            {SOURCE_ORDER.map((id, i) => {
              const s = sources[id];
              return (
                <li key={id} id={`src-${id}`} className="grid scroll-mt-24 grid-cols-[1.5rem_minmax(0,1fr)]">
                  <span className="t-data">{i + 1}</span>
                  <span>
                    {s.claim}{" "}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-rule underline-offset-2 hover:decoration-ink">
                      {s.sourceName}
                    </a>
                    , {s.date}. {s.note}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </footer>
  );
}
