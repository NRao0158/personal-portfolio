import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="section-kicker">
        <span>{index}</span>
        <span className="section-kicker-line" />
      </div>
      <h2 className="mt-5 text-[clamp(2.25rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)] md:text-lg md:leading-8">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
