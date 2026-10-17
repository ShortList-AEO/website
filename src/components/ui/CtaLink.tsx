"use client";

import type { Cta } from "@/content/types";
import { scrollToHash, useLenis } from "@/components/providers/SmoothScroll";

const styles = {
  primary:
    "bg-ink text-bg hover:opacity-90 px-5 py-3.5 text-[1rem] font-semibold rounded-[3px] inline-flex items-center justify-center",
  secondary:
    "text-ink underline decoration-rule decoration-2 underline-offset-[6px] hover:decoration-ink px-1 py-3.5 text-[1rem] font-medium inline-flex items-center",
} as const;

/** In-page call to action. Smooth-scrolls with the nav offset; plain anchor without JS. */
export function CtaLink({
  cta,
  variant = "primary",
  className = "",
}: {
  cta: Cta;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const lenis = useLenis();
  return (
    <a
      href={cta.href}
      className={`${styles[variant]} transition-opacity ${className}`}
      onClick={(e) => {
        if (!cta.href.startsWith("#")) return;
        e.preventDefault();
        scrollToHash(lenis.current, cta.href);
      }}
    >
      {cta.label}
    </a>
  );
}
