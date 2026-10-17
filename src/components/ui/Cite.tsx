import { hero, shift } from "@/content/home";
import { sources } from "@/content/sources";
import type { Line, SourceId } from "@/content/types";

/** Sources cited on the page, numbered in reading order. Add new cited lines here. */
const CITED_LINES: Line[] = [...hero.sub, shift.support];
export const SOURCE_ORDER: SourceId[] = [
  ...new Set(CITED_LINES.flatMap((l) => (l.sourceId ? [l.sourceId] : []))),
];

/** Footnote marker linking to the numbered source list in the footer. */
export function Cite({ id }: { id: SourceId }) {
  const n = SOURCE_ORDER.indexOf(id) + 1;
  if (n === 0) throw new Error(`Source "${id}" is cited but missing from CITED_LINES in Cite.tsx`);
  const s = sources[id];
  return (
    <sup className="ml-0.5 align-super text-[0.65em] leading-none">
      <a
        href={`#src-${id}`}
        className="t-data text-muted underline decoration-rule underline-offset-2 hover:text-ink"
        aria-label={`Source ${n}: ${s.sourceName}, ${s.date}`}
      >
        {n}
      </a>
    </sup>
  );
}
