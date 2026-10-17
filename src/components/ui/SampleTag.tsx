/** The label every fictional sample number carries. */
export function SampleTag({ children }: { children: string }) {
  return (
    <p className="t-label inline-flex items-center gap-2 rounded-sm border border-rule px-2 py-1">
      <span aria-hidden className="inline-block size-1.5 rounded-full bg-rival" />
      {children}
    </p>
  );
}
