# CLAUDE.md: ShortList website

Public landing page for **ShortList**. It is sent to Indian D2C founders (beauty and personal
care first) on WhatsApp and email after we reach out. One job: in under 30 seconds, make a
founder feel they may be losing sales to a competitor inside AI answers, then get them to
request a free audit. Most visitors open it on a phone from WhatsApp, so mobile is the main
experience.

**Issues are tracked in the product repo, `ShortList-AEO/ShortList`**, not here. Reference them
from PRs as `ShortList-AEO/ShortList#<n>`. The product (the audit engine) lives there too;
never add website code to it.

## Positioning

- Never call us an "AEO agency" or an "SEO agency". Never show the words AEO, GEO or LLMO to
  visitors. Founders buy sales, not acronyms.
- What we sell: "When your customer asks AI what to buy, it names your competitor. We find out
  exactly where, and we fix it."
- The feeling: "Is this happening to my brand? I need to check," followed by relief: "These
  people can show me and fix it."
- The name: AI doesn't show ten links. It shows a short list of 2 or 3 products. If you're not
  on it, the shopper never sees you.

## The fear has to be true (non-negotiable)

1. **No invented statistics.** Every real-world number lives in `src/content/sources.ts`, with
   the claim, the figure, the source, the URL and the date, verified at the publisher. A claim
   without a source becomes a visible `[STAT NEEDED: ...]` placeholder. Never a plausible guess.
2. **No fake social proof.** No logos, testimonials, "trusted by", user counts or case studies
   until they are real. Leave the slot out; don't fake it.
3. **No guarantees.** Never promise "#1 on ChatGPT", placement or a specific result. The promise
   is: we measure honestly, fix what we can, and re-measure monthly.
4. **The sample report is fictional.** Every sample number comes from
   `src/content/sample-report.ts` and is labelled "Sample report: fictional brands" wherever it
   appears. Never imply Nila Naturals, Vedra, GlowLab or Saffra Skin are real.
5. **Metrics are named precisely.** Share of voice (share of all brand mentions), named rate
   (share of answers that mention the brand) and pick rate (share where AI picks it) are
   different numbers. Label each one wherever it appears.
6. **Claims about the product stay true to what it does today.** For example, we measure
   ChatGPT through OpenAI's API now; Gemini and Perplexity are "next", not current.

## Copy

- All words live in `src/content/` as typed data. Components never hard-code copy.
- Direct, short sentences, founder to founder, a bit uncomfortable. Indian context.
- No hype words (revolutionary, supercharge, unlock, leverage, game-changer). No em dashes.
- Hindi text is marked `lang="hi"`; the page is `lang="en-IN"`.

## Design system

Feel: an editorial data story, calm and a little cold. The data is the hero.

- **Orange means "your brand" and nothing else.** Competitors are neutral grey. Text is near-black
  ink. Your bar is always the small orange one.
- **Colour tokens** (CSS variables, defined once; both themes are designed, not inverted;
  all text pairs pass WCAG AA):

  | Token | Light | Dark | Use |
  |---|---|---|---|
  | `--bg` | `#F6F7F7` | `#0D1216` | page |
  | `--surface` | `#FFFFFF` | `#141B21` | raised panels, chat |
  | `--ink` | `#111A21` | `#E6EBEE` | text |
  | `--muted` | `#56636E` | `#98A5AF` | secondary text |
  | `--rule` | `#D9DFE3` | `#26313A` | lines, borders |
  | `--rival` / `--rival-soft` | `#8C98A3` / `#E3E8EB` | `#6F7D89` / `#222C34` | competitor marks and fills |
  | `--you` / `--you-soft` | `#B93D0C` / `#FBE2D5` | `#FF7D45` / `#3A2116` | your brand only |

- **Type** (self-hosted via `next/font`):
  - Display: Schibsted Grotesk, a tight grotesk drawn for a news publisher. Used large and
    heavy for headlines.
  - Body: IBM Plex Sans.
  - Data, labels, numbers: IBM Plex Mono, set in sentence case with tabular figures.
  - Hindi: IBM Plex Sans Devanagari. It's the same family as the body face, so Hindi never
    falls back to a system font.
- **Layout:** a strong 12-column grid, left-aligned and asymmetric, with generous whitespace.
  Charts are drawn by hand for this page.
- **Avoid:**
  - purple or blue gradients, glassmorphism, 3D blobs
  - emoji, stock photos, icon grids, "AI sparkle" icons
  - centred-everything layouts, all-caps eyebrow labels
  - "A · B · C" metadata strings, arrows appended to buttons
- Themes: system default, plus a nav toggle that remembers the choice. No flash on load. The
  switch is a circular reveal (View Transitions API) with a crossfade fallback.

## Motion

- Lenis smooth scroll, synced with GSAP ScrollTrigger in one RAF loop. Anchor links offset for
  the sticky nav.
- GSAP ScrollTrigger for pinned and scrubbed sections; Motion (`motion/react`) for component
  enters, hovers and layout. Never both on the same element.
- Ease-out, 300 to 800 ms, nothing bouncy. Every animation explains something or guides the
  eye; decoration-only motion gets cut. Animate only `transform`, `opacity` and SVG stroke.
- `prefers-reduced-motion`: no Lenis, no pinning or scrubbing, final states shown, simple fades
  only. The page must still read perfectly.
- Under 768 px, pinned sections switch to a simpler stacked version.
- Check every API against current docs (Context7) before writing it.

## Tech

- Next.js App Router, TypeScript strict, Tailwind CSS, GSAP + ScrollTrigger, Lenis, Motion,
  `next-themes`. Pin exact versions.
- The form posts to a route handler that emails the lead via Resend.
  - Validated with `zod`, with a honeypot field for spam.
  - The key lives only in `.env.local` and in Vercel env vars, never in code.
  - `.env.example` lists the variable names.
- No analytics or tracking scripts.
- Budget, mobile Lighthouse:
  - Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
  - LCP under 2.5 s, CLS under 0.05.
  - Report first-load JS size.
- Accessibility:
  - landmarks, one `h1`, visible focus, full keyboard use
  - accessible accordion and form errors
  - charts with a text alternative

## Workflow

- Branch `AEO-<issue>-<slug>` from `main`, where the issue number comes from the product repo.
  Use small conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
- `main` is protected by a ruleset: PR only, squash merge only, no force push, no deletion. CI
  (`ci-ok`) must pass. Never push to `main`, never force-push, and never merge your own PR.
  Merging is a human action.
- Every PR gets a Vercel preview link. Put it in the PR description, so the other founder can
  review on a phone.
- Before saying a UI change is done, screenshot it with Playwright at 375, 768 and 1440 px in
  both themes, and look at the screenshots yourself.

## Before you finish a task

- [ ] Lint, type check and build pass locally.
- [ ] Screenshots reviewed at 375, 768 and 1440 px, in light and dark.
- [ ] Every number on the page is in `sources.ts` or `sample-report.ts`, and sample numbers are
      labelled.
- [ ] No secrets in the diff (`.env*` is ignored except `.env.example`).
- [ ] Reduced-motion mode still reads perfectly.
