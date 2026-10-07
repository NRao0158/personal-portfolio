import {
  ArrowRight,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "@/components/Icons";

import { HeroEvidenceVisual } from "@/components/TechnicalVisuals";
import { ProjectSection } from "@/components/ProjectSection";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";
import { site, skills } from "@/data/site";

const experiences = [
  {
    role: "Technical Coordinator & Web Manager",
    organization: "Indian Association of Memphis",
    dates: "Aug 2024 – May 2026",
    location: "Memphis, Tennessee",
    description:
      "Directed IT operations and digital infrastructure for a nonprofit supporting more than 40 annual cultural events. Built promotional web experiences and supported AV, networking, and technical event operations.",
    metrics: [
      ["40+", "annual events"],
      ["5,000+", "attendees"],
      ["1,200+", "online registrations"],
    ],
  },
  {
    role: "Computational Physics Researcher",
    organization: "Tennessee Governor’s School for Computational Physics",
    dates: "June 2025 – July 2025",
    location: "Clarksville, Tennessee",
    description:
      "Selected from approximately the top 5% of state applicants for a 140-hour collegiate computational physics program. Developed more than 10 simulations in Python and Fortran and trained three deep-learning models for nonlinear physical-system behavior.",
    metrics: [
      ["Top 5%", "state applicants"],
      ["140", "program hours"],
      ["10+", "simulations"],
      ["92%", "validation accuracy"],
    ],
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero page-grid">
        <div className="site-container grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--accent)] sm:text-[14px]">
              Computer Science @ University of Maryland
            </p>

            <h1 className="mt-6 text-[clamp(4rem,8vw,7.25rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[var(--text-primary)]">
              Nihal Rao
            </h1>

            <p className="mt-8 max-w-3xl text-[clamp(1.7rem,3vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.035em] text-[var(--text-primary)]">
              Software engineering, machine learning,
              <span className="text-[var(--text-secondary)]">
                {" "}
                and intelligent systems.
              </span>
            </p>

            <p className="mt-7 max-w-2xl text-[18px] leading-8 text-[var(--text-secondary)] md:text-[20px] md:leading-9">
              I build reliable software across predictive ML, computer vision,
              and backend systems, with an emphasis on evaluation,
              reproducibility, and thoughtful engineering.
            </p>

            <div className="mt-7">
              <span className="availability text-[15px]">
                <span className="availability-dot" />
                Seeking Summer 2027 internships
              </span>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#work"
                className="button-primary focus-ring text-[15px]"
              >
                View selected work
                <ArrowRight className="size-4" />
              </a>

              <a
                href={site.resume}
                download="Nihal_Rao_Resume.pdf"
                className="button-secondary focus-ring text-[15px]"
              >
                <FileText className="size-4" />
                Resume
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px] text-[var(--text-secondary)]">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
              >
                <Github className="size-[18px]" />
                GitHub
              </a>

              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
              >
                <Linkedin className="size-[18px]" />
                LinkedIn
              </a>

              <a
                href={`mailto:${site.email}`}
                className="focus-ring inline-flex min-h-11 items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
              >
                <Mail className="size-[18px]" />
                Email
              </a>
            </div>

            <div className="mt-12 grid gap-5 border-t border-[var(--border)] pt-7 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  GPA
                </p>
                <p className="mt-2 text-[17px] font-medium text-[var(--text-primary)]">
                  4.0 / 4.0
                </p>
              </div>

              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Degree
                </p>
                <p className="mt-2 text-[17px] font-medium text-[var(--text-primary)]">
                  B.S. Computer Science
                </p>
              </div>

              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Minor
                </p>
                <p className="mt-2 text-[17px] font-medium leading-6 text-[var(--text-primary)]">
                  Robotics & Autonomous Systems
                </p>
              </div>

              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Location
                </p>
                <p className="mt-2 text-[17px] font-medium text-[var(--text-primary)]">
                  College Park, MD
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="hidden lg:col-span-4 lg:block">
            <HeroEvidenceVisual />
          </Reveal>
        </div>
      </section>

      <section id="work" className="site-container py-24 md:py-32">
        <SectionHeading
          index="01 / SELECTED WORK"
          title="Selected work"
          description="Machine learning systems, backend infrastructure, and computer vision—built with an emphasis on evaluation and reliability."
        />

        {projects.map((project, index) => (
          <ProjectSection
            key={project.slug}
            project={project}
            reversed={index === 1}
          />
        ))}
      </section>

      <section
        id="experience"
        className="border-y border-[var(--border)] bg-[var(--bg-secondary)] py-24 md:py-32"
      >
        <div className="site-container">
          <SectionHeading index="02 / EXPERIENCE" title="Experience" />

          <div>
            {experiences.map((experience) => (
              <Reveal className="experience-row" key={experience.role}>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                    {experience.role}
                  </h3>

                  <p className="mt-1 text-[16px] text-[var(--text-secondary)]">
                    {experience.organization}
                  </p>

                  <p className="mt-3 font-mono text-[12px] leading-6 text-[var(--text-muted)]">
                    {experience.dates}
                    <br />
                    {experience.location}
                  </p>
                </div>

                <p className="max-w-2xl text-[17px] leading-8 text-[var(--text-secondary)]">
                  {experience.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {experience.metrics.map(([value, label]) => (
                    <div
                      className="experience-metric"
                      key={`${value}-${label}`}
                    >
                      <div className="font-mono text-xl tracking-[-0.03em] text-[var(--accent)]">
                        {value}
                      </div>

                      <div className="mt-1 text-[12px] leading-5 text-[var(--text-muted)]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-24 md:py-32">
        <SectionHeading
          index="03 / TECHNICAL FOUNDATION"
          title="Technical foundation"
        />

        <div>
          {skills.map((group) => (
            <Reveal className="skill-row" key={group.label}>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-primary)]">
                {group.label}
              </h3>

              <p className="text-[17px] leading-8 text-[var(--text-secondary)]">
                {group.items.join(" · ")}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)] py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            index="04 / RECOGNITION"
            title="Selected recognition"
          />

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal className="recognition-card">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--accent)]">
                1st Place
              </p>

              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                FBLA Coding & Programming
              </h3>
            </Reveal>

            <Reveal className="recognition-card">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--accent)]">
                Top 24 Internationally
              </p>

              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                TSA Data Science & Analytics
              </h3>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="about" className="site-container py-24 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading index="05 / ABOUT" title="About" />

          <Reveal className="max-w-3xl lg:col-span-7 lg:col-start-5 lg:-mt-36">
            <div className="grid gap-6 text-[17px] leading-8 text-[var(--text-secondary)]">
              <p>
                I’m a computer science student at the University of Maryland,
                College Park, with a minor in Robotics and Autonomous Systems.
              </p>

              <p>
                I’m most interested in engineering problems where machine
                learning has to coexist with good software: correct evaluation,
                reliable data flow, understandable failure modes, reproducible
                results, and systems that can actually be used.
              </p>

              <p className="text-[16px] text-[var(--text-muted)]">
                Outside engineering, I’ve played violin for roughly twelve
                years and competed in varsity tennis.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-[var(--border)] py-24 md:py-32"
      >
        <div className="site-container">
          <Reveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--accent)]">
              06 / CONTACT
            </p>

            <h2 className="mt-5 max-w-4xl text-[clamp(2.6rem,5.5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.052em] text-[var(--text-primary)]">
              Interested in building reliable intelligent systems.
            </h2>

            <p className="mt-6 max-w-2xl text-[18px] leading-8 text-[var(--text-secondary)]">
              I’m currently seeking Summer 2027 internships in software
              engineering, AI/ML, robotics, autonomous systems, and related
              technical roles.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="button-primary focus-ring text-[15px]"
              >
                <Mail className="size-4" />
                Email me
                <ArrowRight className="size-4" />
              </a>

              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="button-secondary focus-ring text-[15px]"
              >
                <Linkedin className="size-4" />
                LinkedIn
                <ExternalLink className="size-3.5" />
              </a>

              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="button-tertiary focus-ring text-[15px]"
              >
                <Github className="size-4" />
                GitHub
              </a>

              <a
                href={site.resume}
                download="Nihal_Rao_Resume.pdf"
                className="button-tertiary focus-ring text-[15px]"
              >
                <FileText className="size-4" />
                Resume
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}