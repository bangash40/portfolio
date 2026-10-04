import { Fragment, type ReactNode } from 'react';
import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { Chip } from '../ui/Chip';
import { SectionHeader } from '../ui/SectionHeader';

const { person, projects, sections } = content;

const initials = person.fullName
  .split(' ')
  .slice(0, 2)
  .map((word) => word[0])
  .join('');

const facts = [
  { label: 'experience', value: person.yearsExperience },
  { label: 'based in', value: person.location },
  { label: 'projects', value: `${projects.length} projects` },
  { label: 'open to', value: person.openTo },
];

function Command({ name, flag, children }: { name: string; flag?: string; children: ReactNode }) {
  return (
    <>
      <p>
        <span aria-hidden="true" className="text-primary">
          ❯
        </span>{' '}
        {name}
        {flag && <span className="text-faint"> {flag}</span>}
      </p>
      <div className="mb-3.5 last:mb-0">{children}</div>
    </>
  );
}

// Profile card and a terminal that answers a few questions about me (DESIGN.md §6.5).
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-32">
      <Container>
        <SectionHeader file="about" id="about-heading" copy={sections.about} />

        <div className="scroll-rise mt-12 grid gap-6 min-[980px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex flex-col gap-[22px] rounded-card border border-border bg-surface p-6 sm:p-7">
            <div className="flex items-center gap-4">
              {person.avatar ? (
                <img
                  src={person.avatar}
                  alt={`Photo of ${person.fullName}`}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="size-16 rounded-card object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="inline-flex size-16 shrink-0 items-center justify-center rounded-card border border-primary-line bg-primary-soft text-[22px] font-bold text-primary"
                >
                  {initials}
                </span>
              )}
              <div>
                <h3 className="text-[19px] font-semibold">{person.fullName}</h3>
                <p className="mt-0.5 font-mono text-[12.5px] text-muted">{person.title}</p>
              </div>
            </div>

            {person.bio.map((paragraph) => (
              <p key={paragraph} className="text-muted">
                {paragraph}
              </p>
            ))}

            <dl className="grid grid-cols-2 gap-3.5">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-panel border border-border bg-surface-2 p-3.5"
                >
                  <dt className="font-mono text-[11px] text-faint">{fact.label}</dt>
                  <dd className="mt-1 font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden rounded-card border border-border bg-surface">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-border-2" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-border-2" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-border-2" />
              <span className="ml-2">zsh — farhan@dev</span>
            </div>
            <div className="px-5 py-[22px] font-mono text-[13px] leading-[1.85] sm:px-6 sm:text-[13.5px]">
              <Command name="whoami">
                <p>{person.whoami}</p>
              </Command>
              <Command name="current_focus" flag="--list">
                <ul className="flex flex-wrap gap-2 pt-1">
                  {person.focus.map((item, index) => (
                    <li key={item}>
                      <Chip hot={index < 3}>{item}</Chip>
                    </li>
                  ))}
                </ul>
              </Command>
              <Command name="cat enjoy_building.txt">
                <p className="text-muted">{person.enjoys}</p>
              </Command>
              <Command name="mindset">
                <p className="flex flex-wrap items-center gap-2.5">
                  {person.mindset.map((step, index) => {
                    const last = index === person.mindset.length - 1;
                    return (
                      <Fragment key={step}>
                        <span className={last ? 'text-primary' : ''}>{step}</span>
                        {last ? (
                          <span aria-hidden="true" className="caret" />
                        ) : (
                          <span aria-hidden="true" className="text-faint">
                            →
                          </span>
                        )}
                      </Fragment>
                    );
                  })}
                </p>
              </Command>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
