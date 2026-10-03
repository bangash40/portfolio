import { content } from '../../data/content';
import { handleAnchorClick } from '../../hooks/useLenis';
import { reelItemsFromProjects } from '../../lib/reel';
import { Container } from '../layout/Container';
import { ScreenReel } from '../phone/ScreenReel';
import { Button } from '../ui/Button';

const { person, projects } = content;
const heroReel = reelItemsFromProjects(projects);

// "Farhan" / "Ali Haider": first name on its own line (DESIGN.md §8).
const [firstName, ...otherNames] = person.fullName.split(' ');
const nameLines = [firstName, otherNames.join(' ')];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="pt-[calc(72px+48px)] pb-20 lg:flex lg:min-h-svh lg:items-center lg:pt-[calc(72px+32px)] lg:pb-16"
    >
      <Container className="flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-7">
          <h1 id="hero-name" className="font-display text-hero font-extrabold text-graphite">
            {nameLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-[36ch] text-lead text-slate">{person.heroSentence}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#projects" onClick={(event) => handleAnchorClick(event, 'projects')}>
              See my projects
            </Button>
            <Button variant="secondary" href={person.resumeUrl} download>
              Download résumé
            </Button>
          </div>

          <p className="mt-8 flex items-center gap-3 text-small text-slate">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-saffron" />
            {person.availability}
          </p>
        </div>

        <ScreenReel items={heroReel} priority className="lg:col-span-5 lg:justify-self-center" />
      </Container>
    </section>
  );
}
