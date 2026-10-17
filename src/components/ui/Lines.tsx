import type { Line } from "@/content/types";
import { Cite } from "./Cite";

/** Renders copy lines with optional source footnotes. */
export function Lines({ lines, className }: { lines: Line[]; className?: string }) {
  return (
    <p className={className}>
      {lines.map((l, i) => (
        <span key={i}>
          {l.text}
          {l.sourceId ? <Cite id={l.sourceId} /> : null}
          {i < lines.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
