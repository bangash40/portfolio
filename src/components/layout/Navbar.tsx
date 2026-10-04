import { Menu } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { content } from '../../data/content';
import { handleAnchorClick, scrollToSection } from '../../hooks/useLenis';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { isFilled } from '../../lib/placeholders';
import { Button } from '../ui/Button';
import { GitHubIcon, LinkedInIcon } from '../ui/icons';
import { IconLink } from '../ui/IconLink';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Container } from './Container';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { navLinkStateClass, navLinks, sectionIds } from './navLinks';

const ELEVATE_AFTER_PX = 24;
const MENU_ID = 'mobile-menu';
const { links, person } = content;

// Fixed 68px bar: transparent at the top, translucent with a border once the page scrolls
// (DESIGN.md §6.1). The blur is only applied when visible; backdrop filters are slow to paint.
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
    const onScroll = () => setScrolled(window.scrollY > ELEVATE_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The full-screen menu only exists below 980px; close it if the window grows past that.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const onChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 h-[68px]">
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b transition-opacity duration-300 motion-reduce:transition-none ${
            scrolled
              ? 'border-border bg-bg/75 opacity-100 backdrop-blur-[14px] backdrop-saturate-150'
              : 'border-transparent opacity-0'
          }`}
        />
        <Container className="relative flex h-full items-center justify-between gap-5">
          <Logo onClick={(event) => handleAnchorClick(event, 'home')} />

          <nav aria-label="Main" className="hidden min-[980px]:block">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => handleAnchorClick(event, link.id)}
                    aria-current={activeId === link.id ? 'true' : undefined}
                    className={`relative inline-flex min-h-11 items-center px-0.5 text-[14.5px] font-medium transition-colors duration-200 motion-reduce:transition-none ${navLinkStateClass(activeId === link.id)}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-1 min-[980px]:flex">
              <IconLink href={links.github} label="GitHub">
                <GitHubIcon size={19} />
              </IconLink>
              {isFilled(links.linkedin) && (
                <IconLink href={links.linkedin} label="LinkedIn">
                  <LinkedInIcon size={19} />
                </IconLink>
              )}
              <Button
                href={person.resumeUrl}
                download
                variant="secondary"
                size="sm"
                className="mx-1.5"
              >
                Résumé
              </Button>
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              className="inline-flex size-11 items-center justify-center rounded-[11px] text-text min-[980px]:hidden"
            >
              <Menu size={20} strokeWidth={1.9} aria-hidden="true" />
            </button>
          </div>
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
