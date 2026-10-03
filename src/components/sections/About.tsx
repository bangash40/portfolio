import { content } from '../../data/content';
import { Container } from '../layout/Container';
import { SectionHeading } from '../ui/SectionHeading';

const { person, skills } = content;

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-32">
      <Container>
        <SectionHeading id="about-heading">A little about me</SectionHeading>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            {person.avatar && (
              <img
                src={person.avatar}
                alt={`Photo of ${person.fullName}`}
                width={160}
                height={160}
                loading="lazy"
                className="mb-8 size-40 rounded-panel object-cover"
              />
            )}
            <div className="flex max-w-[68ch] flex-col gap-5">
              {person.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            {skills.map((group) => (
              <li key={group.title}>
                <h3 className="font-body text-body font-semibold text-graphite">{group.title}</h3>
                <ul className="mt-3 flex flex-col gap-1.5 text-slate">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
