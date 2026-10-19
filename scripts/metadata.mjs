export function deploymentSettings(env) {
  const base = env.VITE_BASE_PATH || "/";
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base)) {
    throw new Error("VITE_BASE_PATH must be / or a path such as /personal-portfolio/");
  }
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  const raw = (env.VITE_SITE_URL || (vercelHost ? `https://${vercelHost}` : "")).trim();
  if (!raw) return { site: "", base };
  const url = new URL(raw);
  if (url.protocol !== "https:" || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash ||
      url.hostname === "localhost" || url.hostname.endsWith(".example")) {
    throw new Error("VITE_SITE_URL must be a public HTTPS origin without a path, credentials, query, or fragment");
  }
  return { site: url.origin, base };
}

export function escapeMarkup(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[character]);
}

export function metadataTags(site, base, path) {
  if (!site) return "";
  const canonical = escapeMarkup(`${site}${base}${path}`);
  const image = escapeMarkup(`${site}${base}og-cover.png`);
  return `\n  <link rel="canonical" href="${canonical}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:image" content="${image}" />`;
}
