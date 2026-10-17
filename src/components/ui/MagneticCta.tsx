"use client";

import * as m from "motion/react-m";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { Cta } from "@/content/types";
import { CtaLink } from "./CtaLink";

/** Primary CTA that leans a few pixels toward the pointer. Off for touch and reduced motion. */
export function MagneticCta({ cta }: { cta: Cta }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <m.div
      className="inline-block"
      style={reduce ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 8);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <CtaLink cta={cta} />
    </m.div>
  );
}
