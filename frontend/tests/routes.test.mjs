import assert from "node:assert/strict";
import test from "node:test";
import { withBase, portfolioPath } from "../src/lib/paths.ts";
import { deploymentSettings, metadataTags } from "../scripts/metadata.mjs";

for (const base of ["/", "/personal-portfolio/"]) {
  test(`routes and public assets under ${base}`, () => {
    assert.equal(withBase("/resume.pdf", base), `${base}resume.pdf`);
    assert.equal(withBase("/#work", base), `${base}#work`);
    assert.equal(portfolioPath(base, base), "/");
    assert.equal(portfolioPath(`${base}index.html`, base), "/");
    for (const slug of ["sentinel", "interceptiq", "focusmate"]) {
      assert.equal(portfolioPath(`${base}projects/${slug}/`, base), `/projects/${slug}/`);
      assert.equal(portfolioPath(`${base}projects/${slug}/index.html`, base), `/projects/${slug}/`);
      assert.equal(portfolioPath(`${base}projects/${slug}`, base), `/projects/${slug}`);
    }
    assert.equal(portfolioPath(`${base}projects/missing/`, base), "/projects/missing/");
  });
}

test("a subpath must match a complete path segment", () => {
  assert.equal(portfolioPath("/personal-portfolio-extra/", "/personal-portfolio/"), null);
  assert.equal(portfolioPath("/projects/sentinel/", "/personal-portfolio/"), null);
  assert.equal(portfolioPath("/personal-portfolio", "/personal-portfolio/"), "/");
});

test("metadata uses the explicit origin or Vercel's production origin", () => {
  assert.deepEqual(deploymentSettings({}), { site: "", base: "/" });
  assert.equal(deploymentSettings({ VERCEL_PROJECT_PRODUCTION_URL: "portfolio.vercel.app", VERCEL_URL: "preview.vercel.app" }).site, "https://portfolio.vercel.app");
  assert.equal(deploymentSettings({ VITE_SITE_URL: "https://nihal.dev/", VERCEL_URL: "preview.vercel.app" }).site, "https://nihal.dev");
  assert.equal(deploymentSettings({ VERCEL_URL: "preview.vercel.app" }).site, "https://preview.vercel.app");
  for (const origin of ["http://nihal.dev", "https://nihal.dev/path", "https://user:pass@nihal.dev", "https://nihal.dev/?q=x", "https://nihal.dev/#x"]) {
    assert.throws(() => deploymentSettings({ VITE_SITE_URL: origin }));
  }
  assert.throws(() => deploymentSettings({ VITE_BASE_PATH: "https://other.dev/" }));
});

test("canonical and share images retain the deployment subpath", () => {
  const tags = metadataTags("https://nrao0158.github.io", "/personal-portfolio/", "projects/sentinel/");
  assert.match(tags, /https:\/\/nrao0158.github.io\/personal-portfolio\/projects\/sentinel\//);
  assert.match(tags, /https:\/\/nrao0158.github.io\/personal-portfolio\/og-cover.png/);
  assert.equal(metadataTags("", "/", ""), "");
});
