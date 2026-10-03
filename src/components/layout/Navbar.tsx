import { useEffect, useState } from 'react';
import { content } from '../../data/content';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Container } from './Container';
import { contactLink, navLinks } from './navLinks';

const SHRINK_AFTER_PX = 40;

// The header is fixed and 72px tall. After 40px of scroll it reads as 60px: the background
// scales down and the row moves up 6px. Only transform and opacity animate (TRD.md §5).
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHRINK_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const motion = 'transition duration-300 ease-out motion-reduce:transition-none';

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[72px]">
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[72px] origin-top bg-fog/85 backdrop-blur-[12px] ${motion} ${
          scrolled ? 'scale-y-[0.8334] opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-[71px] h-px bg-line ${motion} ${
          scrolled ? '-translate-y-3 opacity-100' : 'opacity-0'
        }`}
      />

      <Container
        className={`relative flex h-[72px] items-center justify-between gap-6 ${motion} ${
          scrolled ? '-translate-y-1.5' : ''
        }`}
      >
        <a
          href="#top"
          className="pointer-events-auto inline-flex h-11 items-center font-display text-xl font-extrabold tracking-[-0.02em] text-graphite"
        >
          {content.person.shortName}
        </a>

        <nav aria-label="Main" className="pointer-events-auto flex items-center gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="inline-flex h-11 items-center px-3 font-medium text-graphite transition-colors duration-150 hover:text-signal motion-reduce:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={`#${contactLink.id}`} className="ml-2 max-md:hidden">
            {contactLink.label}
          </Button>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
