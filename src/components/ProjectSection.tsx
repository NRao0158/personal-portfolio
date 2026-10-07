import type { Project } from "@/data/projects";
import { ArrowRight, ExternalLink, Github } from "@/components/Icons";
import { ProjectVisual } from "@/components/TechnicalVisuals";
import { Reveal } from "@/components/Reveal";

export function ProjectSection({ project, reversed = false }: { project: Project; reversed?: boolean }) {
  return (
    <article className="project-section">
      <div className={`grid items-start gap-10 lg:grid-cols-12 lg:gap-12 ${reversed ? "" : ""}`}>
        <Reveal className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
          <div className="section-kicker">
            <span>PROJECT {project.index}</span>
            <span className="section-kicker-line" />
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]">{project.category}</p>
          <h3 className="mt-3 text-[clamp(2.25rem,4vw,3.25rem)] font-semibold tracking-[-0.045em] text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="mt-2 text-xl tracking-[-0.02em] text-[var(--text-secondary)]">{project.descriptor}</p>
          <p className="mt-6 max-w-xl text-[15px] leading-7 text-[var(--text-secondary)] md:text-base">
            {project.summary}
          </p>

          <div className={`mt-8 grid gap-2 ${project.metrics.length >= 5 ? "grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5" : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"}`}>
            {project.metrics.map((metric) => (
              <div className="metric-block" key={`${project.slug}-${metric.label}`}>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                {metric.detail ? <div className="mt-1 font-mono text-[9px] text-[var(--text-muted)]">{metric.detail}</div> : null}
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
            {project.proofLine.map((item) => (
              <span key={item} className="proof-item">{item}</span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
            {project.stack.map((item) => <span className="stack-label" key={item}>{item}</span>)}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`/projects/${project.slug}/`} className="button-primary focus-ring">
              View case study <ArrowRight className="size-4" />
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="button-secondary focus-ring">
              <Github className="size-4" /> GitHub <ExternalLink className="size-3.5" />
            </a>
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noreferrer" className="button-tertiary focus-ring">
                Live demo <ExternalLink className="size-3.5" />
              </a>
            ) : null}
          </div>

          <p className="mt-7 border-l border-[var(--border-strong)] pl-4 font-mono text-[10px] leading-5 text-[var(--text-muted)]">
            {project.disclaimer}
          </p>
        </Reveal>

        <Reveal className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
          <ProjectVisual slug={project.slug} />
        </Reveal>
      </div>
    </article>
  );
}
