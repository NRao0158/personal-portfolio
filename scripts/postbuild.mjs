import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadEnv } from "vite";

// Vite multi-page build already emits /projects/{slug}/index.html.
// At build time, add absolute canonical/Open Graph URLs only when the real domain is known.
const env = loadEnv("production", process.cwd(), "");
const raw = process.env.VITE_SITE_URL || env.VITE_SITE_URL || "";
const site = raw.trim().replace(/\/+$/, "");
const pages = ["", "projects/sentinel/", "projects/interceptiq/", "projects/focusmate/"];
const dest = join(process.cwd(), "dist");

if (site && (!/^https:\/\//i.test(site) || /localhost|\.example(?:\/|$)/i.test(site))) {
  throw new Error("VITE_SITE_URL must be an actual public https:// origin (without a path)");
}
if (site && new URL(site).pathname !== "/") {
  throw new Error("VITE_SITE_URL must be a domain origin, e.g. https://yourdomain.com");
}

for (const path of pages) {
  const pathname = path ? `/${path}` : "/";
  const htmlFile = join(dest, path, "index.html");
  let html = await readFile(htmlFile, "utf8");
  if (site) {
    const canonical = `${site}${pathname}`;
    const socialImage = `${site}/og-cover.png`;
    const extra = `\n  <link rel="canonical" href="${canonical}" />\n  <meta property="og:url" content="${canonical}" />\n  <meta property="og:image" content="${socialImage}" />\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n  <meta name="twitter:image" content="${socialImage}" />`;
    html = html.replace("</head>", `${extra}\n</head>`);
    await writeFile(htmlFile, html);
  }
}

let robots = "User-agent: *\nAllow: /\n";
if (site) {
  const urls = pages.map((path) => `${site}/${path}`);
  robots += `Sitemap: ${site}/sitemap.xml\n`;
  await writeFile(join(dest, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}\n</urlset>\n`);
}
await writeFile(join(dest, "robots.txt"), robots);
console.log(site ? `SEO metadata generated for ${site}` : "SEO domain unset: canonical URLs and sitemap deferred until VITE_SITE_URL is configured.");
