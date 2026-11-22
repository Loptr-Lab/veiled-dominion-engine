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
  ok(await p.locator('form').count() === 0, 'no application or disability collection form');
  ok(await p.locator('#adaptive-participation').isVisible(), 'existing laboratory extended');
  ok(await p.locator('a[href="#adaptive-participation"]').count() > 0, 'laboratory discovery');
  const guide=p.locator('.mayhem-pixie summary');
  await guide.focus(); await p.keyboard.press('Enter');
  ok(await p.locator('.mayhem-pixie-panel').isVisible(), 'keyboard opens contextual PIXIE');
  ok(await guide.locator('img').count() === 1, 'approved sigil reused');
  await p.keyboard.press('Enter');
  ok(await p.locator('a[href="https://github.com/Loptr-Lab/veiled-dominion-engine/issues"]').count()>0,'existing public contribution route');
  ok(await p.locator('#site-breadcrumbs').count() === 1, 'Mayhem breadcrumb JSON-LD');
  ok(await p.locator('#community-funding').isVisible(), 'open organizational support section');
  ok(/Open participation paths, not paid tiers/i.test(await p.locator('#play').innerText()), 'play paths are not sponsorship tiers');
  for (const href of [
    'https://buymeacoffee.com/loptrlab',
    'https://www.patreon.com/LoptrLab/',
    'https://github.com/sponsors/ibloud',
    'https://paypal.me/ibloud',
  ]) ok(await p.locator('#community-funding a[href="' + href + '"]').count() === 1, 'support route ' + href);
  ok(/without paying/i.test(await p.locator('#community-funding').innerText()), 'participation is not paywalled');
  ok(/not establish the legal recipient/i.test(await p.locator('#community-funding').innerText()), 'financial status caveat visible');
  await p.getByText("Reading settings",{exact:true}).click();
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
  ok(await n.locator('a[href="https://github.com/Loptr-Lab/veiled-dominion-engine/issues"]').count()>0, "no-JS public contribution route");
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
