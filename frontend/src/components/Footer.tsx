import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="site-container flex flex-col gap-4 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Nihal Rao</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <span>College Park, Maryland</span>
          <a href={site.github} target="_blank" rel="noreferrer" className="focus-ring footer-link">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="focus-ring footer-link">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
