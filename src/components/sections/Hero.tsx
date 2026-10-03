import { useRef, useState } from 'react';
import { content } from '../../data/content';
import { handleAnchorClick } from '../../hooks/useLenis';
import { useMagnetic } from '../../hooks/useMagnetic';
import { gsap, useGSAP } from '../../lib/gsap';
import { reelItemsFromProjects } from '../../lib/reel';
import { Container } from '../layout/Container';
import type { PhoneState } from '../phone/PhoneFrame';
import { ScreenReel } from '../phone/ScreenReel';
import { Button } from '../ui/Button';

const { person, projects } = content;
const heroReel = reelItemsFromProjects(projects);

// "Farhan" / "Ali Haider": first name on its own line (DESIGN.md §8).
const [firstName, ...otherNames] = person.fullName.split(' ');
const nameLines = [firstName, otherNames.join(' ')];

const BOOTED_KEY = 'booted';

// The boot sequence plays once per session and never with reduced motion (TRD.md §5).
function shouldBoot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(BOOTED_KEY) === null;
  } catch {
    return true;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(BOOTED_KEY, '1');
  } catch {
    // Storage unavailable; the sequence may replay on the next visit, which is harmless.
  }
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const [phoneState, setPhoneState] = useState<PhoneState>(() => (shouldBoot() ? 'booting' : 'on'));

  // The one orchestrated moment (DESIGN.md §7.1), total 1.4s. Runs in a layout effect, so the
  // starting state is set before the first paint and nothing shifts.
  useGSAP(
    () => {
      if (phoneState !== 'booting') return;
      markBooted();

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setPhoneState('on'),
      });

      timeline
        .fromTo('[data-phone-led]', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.2)
        .fromTo(
          '[data-phone-monogram]',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.4 },
          0.45,
        )
        .to('[data-phone-monogram]', { opacity: 0, duration: 0.25 }, 1)
        .fromTo('[data-phone-power]', { opacity: 1 }, { opacity: 0, duration: 0.4 }, 1)
        .fromTo(
          '[data-boot-line]',
          { clipPath: 'inset(100% -10% -25% -10%)' },
          { clipPath: 'inset(-25% -10% -25% -10%)', duration: 0.6, stagger: 0.12 },
          0.1,
        )
        .fromTo('[data-boot-fade]', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.82)
        // Text returns to its static styles. The phone keeps its end values, which match the
        // 'on' classes, so there is no flicker before React re-renders with the new state.
        .set('[data-boot-line], [data-boot-fade]', { clearProps: 'opacity,clipPath' });
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-name"
      className="pt-[calc(72px+48px)] pb-20 lg:flex lg:min-h-svh lg:items-center lg:pt-[calc(72px+32px)] lg:pb-16"
    >
      <Container className="flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="lg:col-span-7">
          <h1 id="hero-name" className="font-display text-hero font-extrabold text-graphite">
            {nameLines.map((line) => (
              <span key={line} data-boot-line className="block">
                {line}
              </span>
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
          state={phoneState}
          monogram={person.shortName.charAt(0)}
          priority
          className="lg:col-span-5 lg:justify-self-center"
        />
      </Container>
    </section>
  );
}
