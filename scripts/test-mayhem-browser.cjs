// Optional browser verification; see docs/recruitment/MAYHEM_REVIEW.md. No mail is sent.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.MAYHEM_TEST_URL || "http://127.0.0.1:8770";
const report = process.env.MAYHEM_AXE_REPORT || "/tmp/mayhem-axe.json";
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  let checks = 0;
  const ok = (value, message) => {
    assert(value, message);
    checks++;
  };
  const ctx = await browser.newContext({
    acceptDownloads: true,
    reducedMotion: "reduce",
  });
  const p = await ctx.newPage();
  let errors = [];
  let external = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("request", (r) => {
    if (!r.url().startsWith(base)) external.push(r.url());
  });
  await p.goto(base + "/mayhem/");
  await p.keyboard.press("Tab");
  ok(
    await p.locator(".skip-link").evaluate((e) => e === document.activeElement),
    "keyboard skip link",
  );
  await p.keyboard.press("Enter");
  await p.locator("button[type=submit]").click();
  ok(
    (await p.locator("#application-errors a").count()) === 4,
    "required validation",
  );
  ok(
    await p
      .locator("#application-errors")
      .evaluate((e) => e === document.activeElement),
    "error focus",
  );
  for (const d of ["strategy", "production", "operations", "community"]) {
    await p.locator(`[data-department=${d}]`).click();
    ok(
      (await p.locator("#department").inputValue()) === d,
      "department route " + d,
    );
  }
  await p
    .locator("#proposal")
    .fill(
      "I can document accessible playtests and provide a bounded handoff. <script>window.injected=true</script>",
    );
  await p.locator("#availability").selectOption("one bounded task");
  await p.locator("#acknowledge").check();
  for (const url of [
    "javascript:alert(1)",
    "http://example.com",
    "https://user:pass@example.com",
  ]) {
    await p.locator("#work").fill(url);
    await p.locator("button[type=submit]").click();
    ok(
      (await p.locator("#work").getAttribute("aria-invalid")) === "true",
      "unsafe URL rejected " + url,
    );
  }
  await p.locator("#work").fill("https://example.com/portfolio");
  await p.locator("button[type=submit]").click();
  ok(await p.locator("#draft-review").isVisible(), "review shown");
  ok(
    await p
      .locator("#draft-title")
      .evaluate((e) => e === document.activeElement),
    "review focus",
  );
  const draft = await p.locator("#draft-text").inputValue();
  ok(draft.includes("<script>"), "literal text retained");
  ok(!(await p.evaluate(() => window.injected)), "no injected script");
  const mail = new URL(await p.locator("#email-draft").getAttribute("href"));
  ok(
    mail.pathname === "questions@loptrlab.com" &&
      mail.searchParams.get("body") === draft,
    "mail handoff exact",
  );
  const dl = await Promise.all([
    p.waitForEvent("download"),
    p.locator("#download-draft").click(),
  ]);
  ok(fs.readFileSync(await dl[0].path(), "utf8") === draft, "download exact");
  await p
    .locator("#proposal")
    .fill("I can help organize one accessible rules review.");
  ok(
    !(await p.locator("#draft-review").isVisible()) &&
      !(await p.locator("#email-draft").getAttribute("href")),
    "editing invalidates old draft",
  );
  await p.locator("button[type=reset]").click();
  ok((await p.locator("#proposal").inputValue()) === "", "reset clears");
  await p.locator("summary").click();
  await p.locator("[name=training-theme]").selectOption("light");
  await p.locator("[name=training-text-size]").selectOption("largest");
  await p.reload();
  ok(
    (await p.locator("html").getAttribute("data-theme")) === "light" &&
      (await p.locator("html").getAttribute("data-text-size")) === "largest",
    "preferences persist",
  );
  ok(
    (await p.evaluate(() => Object.keys(localStorage))).join() ===
      "loptr-training-display",
    "only reading prefs stored",
  );
  const axe = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
  let scans = [];
  for (const theme of ["dark", "light"])
    for (const width of [320, 375, 768, 1024, 1440]) {
      await p.setViewportSize({ width, height: 900 });
      await p.evaluate(
        (t) => (document.documentElement.dataset.theme = t),
        theme,
      );
      ok(
        await p.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        "no overflow " + theme + width,
      );
      await p.addScriptTag({ content: axe });
      const r = await p.evaluate(
        async () =>
          await axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          }),
      );
      scans.push({
        theme,
        width,
        violations: r.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
    }
  fs.writeFileSync(report, JSON.stringify(scans, null, 2));
  ok(
    scans.every((s) => s.violations.length === 0),
    "axe zero violations: " +
      JSON.stringify(scans.filter((s) => s.violations.length)),
  );
  ok(errors.length === 0, "no JS errors");
  ok(external.length === 0, "no external applicant requests");
  ok(
    await p
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.every((i) => i.complete && i.naturalWidth > 0),
      ),
    "assets decode",
  );
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const n = await nojs.newPage();
  await n.goto(base + "/mayhem/");
  ok(await n.locator("noscript a").isVisible(), "no JS direct contact");
  await n.goto(base + "/");
  ok(
    (await n.locator('a[href="mayhem/"]').count()) > 0,
    "root navigation integrated",
  );
  await browser.close();
  console.log(
    JSON.stringify(
      { passed: checks, axeScans: scans.length, errors, external },
      null,
      2,
    ),
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
