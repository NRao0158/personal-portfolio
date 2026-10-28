/** Prefix internal links with the same base that Vite uses for built assets. */
export function withBase(path: string, base = import.meta.env?.BASE_URL ?? "/") {
  const prefix = `/${base.replace(/^\/+|\/+$/g, "")}`.replace(/\/$/, "");
  return `${prefix}/${path.replace(/^\/+/, "")}`;
}

/** Treat directory URLs and their physical index.html files as the same page. */
export function portfolioPath(pathname: string, base = import.meta.env?.BASE_URL ?? "/") {
  const prefix = withBase("", base).replace(/\/$/, "");
  if (prefix && pathname !== prefix && !pathname.startsWith(`${prefix}/`)) {
    return null;
  }
  const path = pathname.slice(prefix.length) || "/";
  return path.replace(/\/index\.html$/, "/");
}
