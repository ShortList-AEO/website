/**
 * The h1, revealed sentence by sentence on load: each rises out of a mask.
 * Pure CSS, so it starts at first paint without waiting for JavaScript (keeps LCP fast).
 * Reduced motion: no animation.
 */
export function HeroHeadline({ text }: { text: string }) {
  const parts = text.split(/(?<=\.)\s+/);
  return (
    <h1 className="t-hero max-w-[13ch] sm:max-w-[14ch]">
      {parts.map((part, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span className="reveal-up block" style={{ animationDelay: `${120 + i * 140}ms` }}>
            {part}
          </span>
        </span>
      ))}
    </h1>
  );
}
