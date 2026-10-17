// Screenshot the page in both themes at several widths.
// Usage: node scripts/screens.mjs [baseUrl] [outDir] [--motion]
// Default is reduced motion (final states, i.e. the static layout). --motion captures scroll positions.
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "screenshots";
const motion = process.argv.includes("--motion");
const widths = (process.env.WIDTHS ?? "375,768,1440").split(",").map(Number);
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
for (const theme of ["light", "dark"]) {
  for (const width of widths) {
    const ctx = await browser.newContext({
      viewport: { width, height: width < 768 ? 812 : 900 },
      colorScheme: theme,
      reducedMotion: motion ? "no-preference" : "reduce",
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (!motion) {
      await page.screenshot({ path: `${out}/full-${theme}-${width}.png`, fullPage: true });
    } else {
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = Math.round((width < 768 ? 812 : 900) * 0.9);
      let i = 0;
      for (let y = 0; y < total; y += step) {
        await page.mouse.wheel(0, i === 0 ? 0 : step);
        await page.waitForTimeout(900);
        await page.screenshot({ path: `${out}/motion-${theme}-${width}-${String(i).padStart(2, "0")}.png` });
        i++;
      }
    }
    console.log(`${theme} ${width}px: horizontal overflow ${overflow}px`);
    await ctx.close();
  }
}
await browser.close();
