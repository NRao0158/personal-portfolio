import type { Project } from "@/data/projects";
import { ArrowRight, ExternalLink, Github } from "@/components/Icons";
import { ProjectVisual } from "@/components/TechnicalVisuals";
import { Reveal } from "@/components/Reveal";

export function ProjectCaseStudy({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main id="main-content" className="pt-24 md:pt-28">
      <section className="site-container py-16 md:py-24">
        <Reveal>
          <a href="/#work" className="focus-ring inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)] hover:text-[var(--accent)]">
            ← Selected work
          </a>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]">{project.caseStudy.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3rem,6.5vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--text-primary)]">
            {project.title}
          </h1>
          <h2 className="mt-7 max-w-4xl text-[clamp(1.65rem,3.2vw,2.65rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--text-secondary)]">
            {project.caseStudy.headline}
          </h2>
          <div className="mt-8 grid max-w-4xl gap-4 text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
            {project.caseStudy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={project.github} target="_blank" rel="noreferrer" className="button-primary focus-ring"><Github className="size-4" /> GitHub <ExternalLink className="size-3.5" /></a>
            {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer" className="button-secondary focus-ring">Live demo <ExternalLink className="size-3.5" /></a> : null}
          </div>
        </Reveal>
      </section>

      <section className="site-container pb-20 md:pb-28">
        <Reveal><ProjectVisual slug={project.slug} compact /></Reveal>
      </section>

      <section className="site-container pb-24 md:pb-32">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {project.metrics.map((metric) => (
            <Reveal key={metric.label}>
              <div className="metric-block metric-block-large h-full">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                {metric.detail ? <div className="mt-2 font-mono text-[9px] text-[var(--text-muted)]">{metric.detail}</div> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="site-container pb-24 md:pb-36">
        <div className="mx-auto max-w-5xl divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {project.caseStudy.sections.map((section, index) => (
            <Reveal key={section.title} className="grid gap-7 py-12 md:grid-cols-12 md:py-16">
              <div className="md:col-span-4">
                <p className="font-mono text-[10px] tracking-[0.12em] text-[var(--accent)]">0{index + 1}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">{section.title}</h2>
              </div>
              <div className="md:col-span-8">
                {section.body ? (
                  <div className="grid gap-5 text-base leading-7 text-[var(--text-secondary)]">
                    {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                ) : null}
                {section.items ? (
                  <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div className="bg-[var(--bg-secondary)] p-5 md:p-6" key={item.title}>
                        <h3 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-primary)]">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.body}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--bg-secondary)] py-20 md:py-28">
        <div className="site-container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Next project</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] md:text-5xl">{nextProject.title}</h2>
            <p className="mt-3 text-[var(--text-secondary)]">{nextProject.descriptor}</p>
          </div>
          <a className="button-primary focus-ring" href={`/projects/${nextProject.slug}/`}>View case study <ArrowRight className="size-4" /></a>
        </div>
      </section>
    </main>
  );
}
