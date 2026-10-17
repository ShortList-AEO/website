// Renders the Open Graph / WhatsApp preview image (public/og.png, 1200x630)
// and the Apple touch icon (src/app/apple-icon.png) with Playwright. Run: npm run og
import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@800&family=IBM+Plex+Sans:wght@500&family=IBM+Plex+Mono:wght@500&display=block";

const bars = [
  { name: "Competitor", w: 78 },
  { name: "Competitor", w: 55 },
  { name: "Competitor", w: 35 },
  { name: "Your brand", w: 22, you: true },
];

const og = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #f6f7f7; color: #111a21; font-family: "IBM Plex Sans", sans-serif;
         display: grid; grid-template-columns: 1fr 380px; gap: 64px; padding: 64px 72px; }
  .brand { font-family: "Schibsted Grotesk"; font-weight: 800; font-size: 34px; letter-spacing: -0.03em; }
  h1 { font-family: "Schibsted Grotesk"; font-weight: 800; font-size: 66px; line-height: 1.0; letter-spacing: -0.035em; margin-top: 54px; }
  .cta { margin-top: 36px; font-size: 26px; color: #56636e; }
  .chart { align-self: center; display: flex; flex-direction: column; gap: 22px; }
  .label { font-family: "IBM Plex Mono"; font-size: 20px; color: #56636e; margin-bottom: 8px; }
  .label.you { color: #b93d0c; }
  .track { height: 34px; background: #e3e8eb; border-radius: 3px; }
  .bar { height: 100%; background: #8c98a3; border-radius: 3px; }
  .bar.you { background: #b93d0c; }
  .note { font-family: "IBM Plex Mono"; font-size: 17px; color: #56636e; margin-top: 6px; }
</style></head><body>
  <div><p class="brand">ShortList</p>
    <h1>AI is shortlisting products for your customers. You're not on the list.</h1>
    <p class="cta">See what AI tells your customers. Free audit.</p></div>
  <div class="chart">
    ${bars.map((b) => `<div><p class="label${b.you ? " you" : ""}">${b.name}</p><div class="track"><div class="bar${b.you ? " you" : ""}" style="width:${b.w}%"></div></div></div>`).join("")}
    <p class="note">Share of AI answers, illustration</p>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.png" });

const svg = await readFile("src/app/icon.svg", "utf8");
const icon = await browser.newPage({ viewport: { width: 180, height: 180 }, colorScheme: "light" });
await icon.setContent(`<html><body style="margin:0">${svg.replace("<svg ", '<svg width="180" height="180" ')}</body></html>`);
await icon.screenshot({ path: "src/app/apple-icon.png", omitBackground: true });
await browser.close();
console.log("wrote public/og.png and src/app/apple-icon.png");
