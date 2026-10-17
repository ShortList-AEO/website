import { expect, test } from "@playwright/test";

test.describe("page basics", () => {
  test("one h1, landmarks, and every sample section labelled", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en-IN");
    await expect(page.getByText("Sample report: fictional brands, made-up numbers.")).toBeVisible();
    await expect(page.getByText("Sample report: fictional brands").first()).toBeVisible();
  });

  test("no visitor-facing acronyms or guarantees", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\b(AEO|GEO|LLMO)\b/);
    expect(text).not.toMatch(/SEO agency|guarantee/i);
    expect(text).not.toContain("—");
  });

  for (const width of [320, 375, 768]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("theme", () => {
  test("toggle switches theme and persists across reload", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: /switch to dark theme/i }).click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");
  });

  test("no flash: stored theme is applied before first paint", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));
    await page.emulateMedia({ colorScheme: "light" });
    const seen: string[] = [];
    await page.exposeFunction("report", (v: string) => seen.push(v));
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        (window as unknown as { report: (v: string) => void }).report(document.documentElement.dataset.theme ?? "none");
      });
    });
    await page.goto("/");
    await expect.poll(() => seen[0]).toBe("dark");
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe("rgb(13, 18, 22)");
  });
});

test.describe("navigation", () => {
  test("'See a sample report' lands on the report below the sticky nav", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "See a sample report" }).click();
    const top = () => page.locator("#sample-report").evaluate((el) => Math.round(el.getBoundingClientRect().top));
    await expect.poll(top, { timeout: 8000 }).toBeLessThan(140);
    expect(await top()).toBeGreaterThanOrEqual(40);
  });

  test("opening a link to a section lands on it without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/#audit");
    await expect(page.locator("#brand")).toBeInViewport({ timeout: 8000 });
    expect(errors).toEqual([]);
  });

  test("primary CTA lands on the audit form", async ({ page }) => {
    await page.goto("/");
    await page.locator("#top").getByRole("link", { name: "Get your free AI audit" }).click();
    await expect(page.locator("#brand")).toBeInViewport({ timeout: 5000 });
  });
});

test.describe("audit form", () => {
  test("validates, submits, and shows the success state", async ({ page }) => {
    let posted: Record<string, string> | null = null;
    await page.route("**/api/audit", async (route) => {
      posted = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.goto("/#audit");
    const submit = page.locator("#audit").getByRole("button", { name: "Get your free AI audit" });
    await submit.click();
    await expect(page.getByText("Enter your brand name.")).toBeVisible();
    await expect(page.locator("#brand")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#brand")).toBeFocused();

    await page.locator("#brand").fill("Test Brand");
    await page.locator("#website").fill("testbrand.in");
    await page.locator("#category").selectOption("Skincare");
    await page.locator("#founder").fill("A Founder");
    await page.locator("#email").fill("founder@testbrand.in");
    await submit.click();
    await expect(page.getByText("We'll send your audit within 5 working days.")).toBeVisible();
    expect(posted).toMatchObject({ brand: "Test Brand", category: "Skincare", email: "founder@testbrand.in" });
  });

  test("server rejects invalid input and treats a filled honeypot as spam", async ({ request }) => {
    const bad = await request.post("/api/audit", { data: { brand: "" } });
    expect(bad.status()).toBe(422);
    const bot = await request.post("/api/audit", {
      data: { brand: "x", website: "x.in", category: "Skincare", founder: "x", email: "x@x.in", company_url: "spam" },
    });
    expect(bot.status()).toBe(200);
  });
});

test.describe("resilience", () => {
  test("reads fine with JavaScript off", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("Your brand isn't in this answer.")).toBeVisible();
    await expect(page.locator("#sample-report")).toBeAttached();
    await expect(page.locator("form[action='/api/audit']")).toBeAttached();
    await ctx.close();
  });

  test("content is readable while JavaScript is slow", async ({ page }) => {
    await page.route("**/_next/static/chunks/**", async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.continue();
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: "See a sample report" })).toBeVisible();
    await expect(page.getByText("It doesn't show up in Google Analytics.").last()).toBeAttached();
  });

  test("reduced motion shows final states", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByText("Your brand isn't in this answer.")).toBeVisible();
    await page.locator("#sample-report").scrollIntoViewIfNeeded();
    await expect(page.locator("#sample-report [data-count='9']").first()).toHaveText("9%");
  });
});
