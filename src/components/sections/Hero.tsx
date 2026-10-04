import { ArrowRight, Mail, Smartphone } from 'lucide-react';
import { useEffect, type CSSProperties } from 'react';
import { content } from '../../data/content';
import { handleAnchorClick } from '../../hooks/useLenis';
import { isFilled } from '../../lib/placeholders';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { GitHubIcon, LinkedInIcon } from '../ui/icons';
import { IconLink } from '../ui/IconLink';
import { HeroVisual } from './HeroVisual';

const { person, links, skillTree } = content;

// Credibility strip: Flutter and the first primary skills, then the technical ones (DESIGN.md §6.3).
const primarySkills = [skillTree.root, ...skillTree.children.filter((s) => s.tier === 'primary')];
const strip = [
  ...primarySkills.slice(0, 3).map((s) => ({ name: s.name, dot: 'bg-primary', strong: true })),
  ...primarySkills.slice(3, 5).map((s) => ({ name: s.name, dot: 'bg-cyan', strong: false })),
];

const jumpLinks = ['about', 'skills', 'projects'];

const reveal = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

// The page-load reveal is CSS (index.css): the inline script in index.html adds `booting` to
// <html> once per session before the first paint. Remove it once those animations finish.
function useBootComplete() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('booting')) return;
    let cancelled = false;
    const running = document
      .getAnimations()
      .filter((animation) => (animation as CSSAnimation).animationName?.startsWith('boot-'));
    Promise.all(running.map((animation) => animation.finished.catch(() => undefined))).then(() => {
      if (!cancelled) root.classList.remove('booting');
    });
    return () => {
      cancelled = true;
    };
  }, []);
}

export function Hero() {
  useBootComplete();

  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Background system (DESIGN.md §5) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -top-80 -right-52 size-[900px] rounded-full bg-[radial-gradient(circle,var(--color-primary-soft)_0%,transparent_65%)]" />
        <div className="max-[979px]:hidden">
          <span className="absolute top-[140px] left-[8%] h-px w-[180px] bg-primary-soft" />
          <span className="absolute top-[140px] left-[calc(8%+180px)] h-[90px] w-px bg-primary-soft" />
          <span className="hero-node absolute top-[226px] left-[calc(8%+178px)]" />
          <span className="absolute bottom-[160px] left-[3%] h-[120px] w-px bg-primary-soft" />
          <span className="absolute bottom-[160px] left-[3%] h-px w-[140px] bg-primary-soft" />
          <span className="hero-node absolute bottom-[158px] left-[calc(3%+138px)] [animation-delay:-2s]" />
          <span className="hero-node absolute top-[92px] left-[46%] [animation-delay:-3s]" />
          <span className="hero-particle absolute bottom-[120px] left-[52%]" />
          <span className="hero-particle absolute bottom-[80px] left-[70%] [animation-delay:-5s]" />
          <span className="hero-particle absolute bottom-[140px] left-[88%] [animation-delay:-9s]" />
          <span className="hero-particle absolute bottom-[200px] left-[62%] [animation-delay:-12s]" />
        </div>
      </div>

      <Container className="relative grid items-center gap-12 pt-[calc(68px+56px)] pb-20 min-[980px]:grid-cols-2 min-[980px]:pt-[calc(68px+80px)] min-[980px]:pb-28">
        <div>
          <p
            data-reveal
            style={reveal(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-lg border border-primary-line bg-primary-soft px-3 py-[7px] font-mono text-xs tracking-[0.08em] text-primary"
          >
            <Smartphone size={13} strokeWidth={2.2} aria-hidden="true" />
            {person.badge}
          </p>
          <h1 id="hero-title" data-reveal style={reveal(60)} className="text-display font-semibold">
            {person.headline} <span className="text-primary">{person.headlineAccent}</span>
          </h1>
          <p data-reveal style={reveal(140)} className="mt-6 max-w-[50ch] text-lead text-muted">
            {person.intro}
          </p>
          <div data-reveal style={reveal(220)} className="mt-9 flex flex-wrap gap-3">
            <Button href="#projects" onClick={(event) => handleAnchorClick(event, 'projects')}>
              View projects
              <ArrowRight
                size={17}
                strokeWidth={2.2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
              />
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              onClick={(event) => handleAnchorClick(event, 'contact')}
            >
              Contact me
            </Button>
          </div>

          <div
            data-reveal
            style={reveal(300)}
            className="mt-9 flex flex-wrap items-center gap-x-[18px] gap-y-2 border-t border-border pt-6"
          >
            <span className="inline-flex items-center gap-2.5 font-mono text-[12.5px] text-text">
              <span aria-hidden="true" className="ping relative size-2 rounded-full bg-ok" />
              {person.availability}
            </span>
            {isFilled(person.location) && (
              <span className="font-mono text-[12.5px] text-muted">{person.location}</span>
            )}
            <span className="ml-auto flex">
              <IconLink href={links.github} label="GitHub profile">
                <GitHubIcon size={17} />
              </IconLink>
              {isFilled(links.linkedin) && (
                <IconLink href={links.linkedin} label="LinkedIn profile">
                  <LinkedInIcon size={17} />
                </IconLink>
              )}
              {isFilled(links.email) && (
                <IconLink href={`mailto:${links.email}`} label="Email">
                  <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
                </IconLink>
              )}
            </span>
          </div>

          <nav
            aria-label="Jump to section"
            className="mt-6 flex flex-wrap gap-2 min-[980px]:hidden"
          >
            {jumpLinks.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(event) => handleAnchorClick(event, id)}
                className="inline-flex min-h-11 items-center rounded-[10px] border border-border bg-surface px-3.5 font-mono text-xs text-text"
              >
                {id}.dart
              </a>
            ))}
          </nav>
        </div>

        <div data-reveal style={reveal(380)}>
          <HeroVisual />
        </div>
      </Container>

      {/* Credibility strip */}
      <div className="relative border-y border-border bg-bg-2">
        <Container className="flex flex-wrap items-center gap-x-7 gap-y-2 py-[18px] text-[15px]">
          <span className="font-mono text-xs text-muted">{'// builds with'}</span>
          {strip.map((item) => (
            <span
              key={item.name}
              className={`inline-flex items-center gap-2 ${item.strong ? 'font-semibold' : 'text-muted'}`}
            >
              <span aria-hidden="true" className={`size-2 rounded-[2px] ${item.dot}`} />
              {item.name}
            </span>
          ))}
          <span className="inline-flex items-center gap-2 text-muted">
            <span aria-hidden="true" className="size-2 rounded-[2px] bg-border-2" />
            Web · automation
          </span>
        </Container>
      </div>
    </section>
  );
}
