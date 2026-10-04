import { content } from '../../data/content';
import type { ExperienceEntry } from '../../types/content';
import { Container } from '../layout/Container';
import { Chip } from '../ui/Chip';
import { SectionHeader } from '../ui/SectionHeader';

const { experience, sections } = content;

// Commit node colour: primary for HEAD, cyan for work, neutral for education (DESIGN.md §6.8).
const rings: Record<ExperienceEntry['kind'], { ring: string; dot: string }> = {
  head: { ring: 'border-primary', dot: 'bg-primary' },
  work: { ring: 'border-cyan', dot: 'bg-cyan' },
  education: { ring: 'border-border-2', dot: 'bg-border-2' },
};

// A vertical git log, newest first.
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="defer-render border-y border-border bg-bg-2 py-20 lg:py-32"
    >
      <Container>
        <SectionHeader file="experience" id="experience-heading" copy={sections.experience} />

        <div className="relative mt-12">
          <span
            aria-hidden="true"
            className="absolute top-[38px] bottom-[18px] left-[15px] w-0.5 bg-linear-to-b from-primary via-border-2 via-40% to-border"
          />
          <ol className="relative flex flex-col gap-[22px]">
            {experience.map((entry) => (
              <li
                key={entry.hash}
                className="scroll-rise group grid grid-cols-[32px_minmax(0,1fr)] gap-4 sm:gap-[22px]"
              >
                <span
                  aria-hidden="true"
                  className={`relative mt-[22px] flex size-8 items-center justify-center rounded-full border-2 bg-bg-2 ${rings[entry.kind].ring}`}
                >
                  <span className={`size-2.5 rounded-full ${rings[entry.kind].dot}`} />
                </span>
                <div className="rounded-card border border-border bg-surface px-5 py-6 transition-[border-color,translate] duration-300 ease-out-soft group-hover:border-primary-line motion-safe:group-hover:translate-x-1 sm:px-[26px]">
                  <div className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                    <span className="text-primary">{entry.hash}</span>
                    <span className="text-muted">{entry.branch}</span>
                    <span className="ml-auto text-muted">{entry.duration}</span>
                  </div>
                  <h3 className="text-[21px] font-semibold tracking-[-0.02em]">
                    {entry.role}{' '}
                    <span className="font-medium text-muted">· {entry.organisation}</span>
                  </h3>
                  <p className="mt-2 text-[15.5px] text-muted">{entry.description}</p>
                  {entry.tech.length > 0 && (
                    <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {entry.tech.map((item) => (
                        <li key={item}>
                          <Chip>{item}</Chip>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
