# ShortList website

Landing page for ShortList. It shows Indian D2C founders where AI assistants recommend their
competitors instead of them, and takes free-audit requests.

- Rules for humans and agents: [CLAUDE.md](CLAUDE.md)
- Issues: tracked in the product repo, [ShortList-AEO/ShortList](https://github.com/ShortList-AEO/ShortList/issues)
- Copy: everything a visitor reads lives in [`src/content/`](src/content/). Every real-world
  number is sourced in [`src/content/sources.ts`](src/content/sources.ts).

## Run

Needs Node 22 or newer.

```
npm ci
npm run dev          # http://localhost:3000
```

## Check before a PR

```
npm run lint
npm run typecheck
npm run build
npx playwright install chromium   # once
npm run test:e2e                  # starts `next start` on port 3200 and runs the browser tests
```

CI runs the same four steps on every PR. The final job, `ci-ok`, is the check `main` requires.

## Other scripts

- `npm run og` regenerates the share image (`public/og.png`) and the Apple touch icon.
- `node scripts/screens.mjs http://localhost:3000 screenshots` saves full-page screenshots in
  both themes at 375, 768 and 1440 px. Add `--motion` to capture scroll positions with
  animation on.

## Environment variables

Copy `.env.example` to `.env.local` for local work. On Vercel, set them under Project
Settings → Environment Variables, for both Production and Preview.

| Variable | Used for |
|---|---|
| `RESEND_API_KEY` | Sending audit requests by email |
| `LEAD_TO_EMAIL` | Where audit requests go |
| `LEAD_FROM_EMAIL` | Verified Resend sender, e.g. `ShortList <audit@yourdomain.in>` |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata and the sitemap (falls back to the Vercel URL) |

Without the email variables, the form behaves differently by environment:
- **Locally:** a submitted lead is printed in the server log.
- **In production:** the API returns an error, so a lead is never silently lost.

## Deploy

Vercel, framework preset Next.js, default settings.
- Every PR gets a preview URL.
- Merging to `main` deploys production.
