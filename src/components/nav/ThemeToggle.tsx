"use client";

import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { MQ } from "@/lib/gsap";

/**
 * Light/dark toggle. Remembers the choice (next-themes, localStorage).
 * The switch reveals the new theme as a circle growing from the button (View Transitions API);
 * browsers without it, and reduced motion, switch instantly.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const current = resolvedTheme ?? (root.dataset.theme === "dark" ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      root.style.colorScheme = next;
      setTheme(next);
    };
    if (!document.startViewTransition || window.matchMedia(MQ.reduced).matches) {
      apply();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(apply);
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.25, 1, 0.5, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative grid size-10 place-items-center rounded-full text-ink hover:bg-rival-soft"
    >
      <span className="sr-only dark:hidden">{site.nav.themeToggle.toDark}</span>
      <span className="sr-only hidden dark:inline">{site.nav.themeToggle.toLight}</span>
      {/* Half-filled disc: the filled half flips side with the theme. */}
      <svg viewBox="0 0 20 20" className="size-[18px]" aria-hidden>
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 2a8 8 0 0 0 0 16z" fill="currentColor" className="dark:hidden" />
        <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" className="hidden dark:block" />
      </svg>
    </button>
  );
}
