import type { Range } from "@/content/sample-report";

/**
 * A horizontal bar with its 95% range whisker, drawn on a 0..max scale.
 * Orange only when the bar is the client's brand. Elements carry data-* hooks for animation.
 */
export function RangeBar({
  range,
  max,
  isYou,
  height = "h-6",
}: {
  range: Range;
  max: number;
  isYou: boolean;
  height?: string;
}) {
  const pct = (v: number) => `${(Math.min(v, max) / max) * 100}%`;
  return (
    <div className={`relative w-full ${height} rounded-[2px] bg-rival-soft/60`} aria-hidden>
      <div
        data-bar
        className={`absolute inset-y-0 left-0 origin-left rounded-[2px] ${isYou ? "bg-you" : "bg-rival"}`}
        style={{ width: pct(range.value) }}
      />
      <div
        data-whisker
        className="absolute top-1/2 h-0 origin-left border-t-[1.5px] border-ink"
        style={{ left: pct(range.low), width: `calc(${pct(range.high)} - ${pct(range.low)})` }}
      >
        <span className="absolute -top-[6px] left-0 h-[11px] border-l-[1.5px] border-ink" />
        <span className="absolute -top-[6px] right-0 h-[11px] border-l-[1.5px] border-ink" />
      </div>
    </div>
  );
}

/** "31%" with its range in smaller type. */
export function RangeValue({ range, className = "" }: { range: Range; className?: string }) {
  return (
    <span className={`t-data whitespace-nowrap ${className}`}>
      <span data-count={range.value} className="text-[1.05rem] font-medium">
        {range.value}%
      </span>{" "}
      <span className="text-[0.8rem] text-muted">
        {range.low}–{range.high}
      </span>
    </span>
  );
}
