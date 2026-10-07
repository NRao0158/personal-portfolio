import Home from "@/pages/Home";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { getProject, projects } from "@/data/projects";

export default function App() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  const slug = match?.[1];
  const project = slug ? getProject(slug) : undefined;

  const index = project
    ? projects.findIndex((candidate) => candidate.slug === project.slug)
    : -1;

  const next =
    index >= 0 ? projects[(index + 1) % projects.length] : undefined;

  const isHome =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";

  return (
    <>
      <a href="#main-content" className="skip-link focus-ring">
        Skip to content
      </a>

      <Navbar />

      {isHome ? (
        <Home />
      ) : project && next ? (
        <ProjectCaseStudy project={project} nextProject={next} />
      ) : (
        <main
          id="main-content"
          className="site-container min-h-[65vh] py-40"
        >
          <p className="section-kicker">404 / NOT FOUND</p>

          <h1 className="mt-6 text-5xl font-semibold">
            Page not found.
          </h1>

          <p className="mt-6 text-[var(--text-secondary)]">
            This page isn’t part of the portfolio.
          </p>

          <a href="/" className="button-primary focus-ring mt-9">
            Back to homepage →
          </a>
        </main>
      )}

      <Footer />
    </>
  );
}