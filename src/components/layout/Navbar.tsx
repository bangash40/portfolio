import { Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { content } from '../../data/content';
import { handleAnchorClick, scrollToSection } from '../../hooks/useLenis';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { contactLink, navLinkStateClass, navLinks, sectionIds } from './navLinks';

const SHRINK_AFTER_PX = 40;
const MENU_ID = 'mobile-menu';

// The header is fixed and 72px tall. After 40px of scroll it reads as 60px: the background
// scales down and the row moves up 6px. Only transform and opacity animate (TRD.md §5).
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const activeId = useScrollSpy(sectionIds);

  // Close first so the menu releases scroll and focus, then scroll on the next frame.
  const navigateFromMenu = useCallback((id: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => scrollToSection(id));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHRINK_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The full-screen menu only exists below 768px; close it if the window grows past that.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  const motion = 'transition duration-300 ease-out motion-reduce:transition-none';

  return (
    <>
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
            onClick={(event) => handleAnchorClick(event, 'top')}
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
                    onClick={(event) => handleAnchorClick(event, link.id)}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    className={`inline-flex h-11 items-center px-3 font-medium transition-colors duration-150 motion-reduce:transition-none ${navLinkStateClass(activeId === link.id)}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              href={`#${contactLink.id}`}
              onClick={(event) => handleAnchorClick(event, contactLink.id)}
              aria-current={activeId === contactLink.id ? 'true' : undefined}
              className="ml-2 max-md:hidden"
            >
              {contactLink.label}
            </Button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-graphite transition-colors duration-150 hover:bg-line motion-reduce:transition-none md:hidden"
            >
              <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </nav>
        </Container>
      </header>
      <MobileMenu
        id={MENU_ID}
        open={menuOpen}
        onClose={closeMenu}
        onNavigate={navigateFromMenu}
        activeId={activeId}
      />
    </>
  );
}
