"use client";

import { useState } from "react";
import * as m from "motion/react-m";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { site } from "@/content/site";
import { CtaLink } from "@/components/ui/CtaLink";
import { scrollToHash, scrollToTop } from "@/lib/scroll";
import { ThemeToggle } from "./ThemeToggle";

/** Sticky nav: gains a backdrop and tightens once scrolled; hides on scroll down, returns on scroll up. */
export function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > prev && y > 240);
  });

  return (
    <>
      <m.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-you"
        style={{ scaleX: scrollYProgress }}
      />
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        animate={{ y: hidden && !reduce ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
        onFocusCapture={() => setHidden(false)}
      >
        <m.div
          aria-hidden
          className="absolute inset-0 border-b border-rule bg-bg/85 backdrop-blur-md"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <nav aria-label="Main" className="wrap relative flex h-[var(--nav-h)] items-center gap-6">
          <m.a
            href="#top"
            className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em]"
            style={{ transformOrigin: "left center" }}
            animate={{ scale: scrolled ? 0.92 : 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            {site.name}
          </m.a>
          <ul className="ml-auto hidden items-center gap-7 md:flex">
            {site.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[0.95rem] text-muted hover:text-ink"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(l.href);
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <ThemeToggle />
            <CtaLink cta={site.nav.cta} className="!hidden !px-3.5 !py-2 !text-[0.9rem] sm:!inline-flex" />
            <CtaLink cta={{ ...site.nav.cta, label: site.nav.ctaShort }} className="!px-3.5 !py-2 !text-[0.9rem] sm:!hidden" />
          </div>
        </nav>
      </m.header>
    </>
  );
}
