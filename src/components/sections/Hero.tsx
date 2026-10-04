import { Fragment, useEffect, useState, type CSSProperties } from 'react';
import { content } from '../../data/content';
import { handleAnchorClick } from '../../hooks/useLenis';
import { useMagnetic } from '../../hooks/useMagnetic';
import { reelItemsFromProjects } from '../../lib/reel';
import { Container } from '../layout/Container';
import { ScreenReel } from '../phone/ScreenReel';
import { Button } from '../ui/Button';

const { person, projects } = content;
const heroReel = reelItemsFromProjects(projects);

// "Farhan" / "Ali Haider": first name on its own line (DESIGN.md §8).
const [firstName, ...otherNames] = person.fullName.split(' ');
const nameLines = [firstName, otherNames.join(' ')];

// The boot sequence (DESIGN.md §7.1) is CSS keyframes in index.css, started by the
// `booting` class that the inline script in index.html adds before the first paint (once per
// session, never with reduced motion). It runs as soon as the page appears, without waiting
// for JavaScript. Here we only wait for it to finish, then let the screen reel start.
function isBooting() {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('booting');
}

export function Hero() {
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const [booting, setBooting] = useState(isBooting);

  useEffect(() => {
    if (!booting) return;
    let cancelled = false;
    const running = document
      .getAnimations()
      .filter((animation) => (animation as CSSAnimation).animationName?.startsWith('boot-'));
    Promise.all(running.map((animation) => animation.finished.catch(() => undefined))).then(() => {
      if (cancelled) return;
      // The end state of every boot animation equals the static styles, so this is seamless.
      document.documentElement.classList.remove('booting');
      setBooting(false);
    });
    return () => {
      cancelled = true;
    };
  }, [booting]);

  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="pt-[calc(72px+48px)] pb-20 lg:flex lg:min-h-svh lg:items-center lg:pt-[calc(72px+32px)] lg:pb-16"
    >
      <Container className="flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-7">
          <h1 id="hero-name" className="font-display text-hero font-extrabold text-graphite">
            {nameLines.map((line, index) => (
              <Fragment key={line}>
                {/* A real space keeps the accessible name "Farhan Ali Haider", not "FarhanAli" */}
                {index > 0 && ' '}
                <span
                  data-boot-line
                  className="block"
                  style={{ '--boot-delay': `${100 + index * 120}ms` } as CSSProperties}
                >
                  {line}
                </span>
              </Fragment>
            ))}
          </h1>

          <p data-boot-fade className="mt-8 max-w-[36ch] text-lead text-slate">
            {person.heroSentence}
          </p>

          <div data-boot-fade className="mt-10 flex flex-wrap gap-4">
            <Button
              ref={primaryRef}
              href="#projects"
              onClick={(event) => handleAnchorClick(event, 'projects')}
            >
              See my projects
            </Button>
            <Button variant="secondary" href={person.resumeUrl} download>
              Download résumé
            </Button>
          </div>

          <p data-boot-fade className="mt-8 flex items-center gap-3 text-small text-slate">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-saffron" />
            {person.availability}
          </p>
        </div>

        <ScreenReel
          items={heroReel}
          hold={booting}
          monogram={person.shortName.charAt(0)}
          priority
          className="lg:col-span-5 lg:justify-self-center"
        />
      </Container>
    </section>
  );
}
