import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Close, Github, Linkedin, Menu } from "@/components/Icons";

const navItems = [
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#about", label: "About", id: "about" },
  { href: site.resume, label: "Resume", id: "resume" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = ["work", "experience", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header
      className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}
    >
      <div className="site-container flex h-full items-center justify-between gap-5">
        <a
          href="/"
          className="focus-ring text-[18px] font-semibold tracking-[-0.025em] text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
        >
          Nihal Rao
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              download={
                item.id === "resume"
                  ? "Nihal_Rao_Resume.pdf"
                  : undefined
              }
              className={`nav-link focus-ring text-[15px] font-medium ${
                active === item.id ? "nav-link-active" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            className="icon-link focus-ring"
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <Github className="size-5" />
          </a>

          <a
            className="icon-link focus-ring"
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="size-5" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            className="icon-link focus-ring"
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <Github className="size-5" />
          </a>

          <button
            type="button"
            className="icon-link focus-ring"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <Close className="size-[22px]" />
            ) : (
              <Menu className="size-[22px]" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu lg:hidden ${
          open ? "mobile-menu-open" : ""
        }`}
        aria-hidden={!open}
      >
        <nav
          aria-label="Mobile navigation"
          className="site-container grid gap-1 py-5"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              download={
                item.id === "resume"
                  ? "Nihal_Rao_Resume.pdf"
                  : undefined
              }
              className="focus-ring rounded-lg px-3 py-3.5 text-[17px] font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface)]"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </a>
          ))}

          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-lg px-3 py-3.5 text-[17px] font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--surface)]"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            LinkedIn ↗
          </a>
        </nav>
      </div>
    </header>
  );
}