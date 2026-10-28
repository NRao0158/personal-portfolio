import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadEnv } from "vite";
import { deploymentSettings, escapeMarkup, metadataTags } from "./metadata.mjs";

const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const { site, base } = deploymentSettings(env);
const pages = ["", "projects/sentinel/", "projects/interceptiq/", "projects/focusmate/"];
const dest = join(process.cwd(), "dist");

for (const path of pages) {
  const htmlFile = join(dest, path, "index.html");
  const html = await readFile(htmlFile, "utf8");
  if (site) {
    await writeFile(htmlFile, html.replace("</head>", `${metadataTags(site, base, path)}\n</head>`));
  }
}

let robots = "User-agent: *\nAllow: /\n";
if (site) {
  const urls = pages.map((path) => `${site}${base}${path}`);
  robots += `Sitemap: ${site}${base}sitemap.xml\n`;
  await writeFile(join(dest, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((loc) => `  <url><loc>${escapeMarkup(loc)}</loc></url>`).join("\n")}\n</urlset>\n`);
}
await writeFile(join(dest, "robots.txt"), robots);
console.log(site ? `SEO metadata generated for ${site}${base}` : "Set VITE_SITE_URL on non-Vercel hosts to enable absolute social metadata and sitemap.");
