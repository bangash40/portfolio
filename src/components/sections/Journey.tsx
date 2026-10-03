import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';

const isMonth = (value: string) => /^\d{4}-\d{2}$/.test(value);

// A git log of milestones, newest first: dot, short id, date, message (DESIGN.md §6.7).
export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-heading" className="py-20 lg:py-32">
      <Container>
        <SectionHeading id="journey-heading">How I got here</SectionHeading>

        <div className="rounded-panel border border-line bg-paper p-6 md:p-10 lg:max-w-[880px]">
          <div className="relative">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
            <ol className="relative flex flex-col gap-8">
              {content.timeline.map((entry, index) => (
                <li
                  key={entry.id}
                  className="relative grid grid-cols-[12px_1fr] gap-x-5 md:grid-cols-[12px_4.5rem_7.5rem_1fr] md:items-center"
                >
                  <span
                    aria-hidden="true"
                    className={`relative top-[0.45em] size-3 self-start rounded-full ring-4 ring-paper md:top-0 md:self-auto ${
                      index === 0 ? 'bg-signal' : 'bg-slate'
                    }`}
                  />
                  <div className="flex gap-4 text-small text-slate tabular-nums md:contents">
                    <span>{entry.id}</span>
                    {isMonth(entry.date) ? (
                      <time dateTime={entry.date}>{entry.date}</time>
                    ) : (
                      <span>{entry.date}</span>
                    )}
                  </div>
                  <p className="col-start-2 mt-1 text-graphite md:col-start-auto md:mt-0">
                    {entry.message}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
