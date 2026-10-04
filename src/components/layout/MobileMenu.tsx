import { X } from 'lucide-react';
import { useEffect, useRef, type MouseEvent } from 'react';
import { content } from '../../data/content';
import { isModifiedClick, setScrollLocked } from '../../hooks/useLenis';
import { isFilled } from '../../lib/placeholders';
import { Button } from '../ui/Button';
import { GitHubIcon, LinkedInIcon } from '../ui/icons';
import { IconLink } from '../ui/IconLink';
import { Container } from './Container';
import { navLinks } from './navLinks';

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  activeId: string | null;
}

const { links, person } = content;

// Full-screen menu below 980px (DESIGN.md §6.1): numbered links, résumé, availability and
// socials. Traps focus, closes on Esc, locks page scroll while open.
export function MobileMenu({ id, open, onClose, onNavigate, activeId }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setScrollLocked(true);
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      setScrollLocked(false);
      opener?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const navigate = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    onNavigate(target);
  };

  return (
    <div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg min-[980px]:hidden"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative border-b border-border">
        <Container className="flex h-[68px] items-center justify-between">
          <span className="font-mono text-xs text-muted">
            lib/<span className="text-primary">main</span>.dart
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-[11px] border border-border text-text"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </Container>
      </div>

      <Container className="relative flex flex-1 flex-col pt-7 pb-7">
        <nav aria-label="Sections">
          <ol>
            {navLinks.map((link, index) => {
              const active = activeId === link.id;
              return (
                <li key={link.id} className="border-b border-border">
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => navigate(event, link.id)}
                    aria-current={active ? 'true' : undefined}
                    className={`flex items-baseline gap-4 py-3.5 transition-[transform,color] duration-200 hover:translate-x-1.5 motion-reduce:transition-none ${
                      active ? 'text-text' : 'text-muted hover:text-text'
                    }`}
                  >
                    <span className="w-6 font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[30px] leading-tight font-semibold tracking-[-0.03em]">
                      {link.label}
                    </span>
                    {active && (
                      <span
                        aria-hidden="true"
                        className="ml-auto size-2 self-center rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-auto flex flex-col gap-3.5 pt-10">
          <Button href={person.resumeUrl} download className="w-full">
            Download résumé
          </Button>
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-text">
              <span aria-hidden="true" className="size-[7px] rounded-full bg-ok" />
              {person.availability}
            </span>
            <span className="flex">
              <IconLink href={links.github} label="GitHub">
                <GitHubIcon />
              </IconLink>
              {isFilled(links.linkedin) && (
                <IconLink href={links.linkedin} label="LinkedIn">
                  <LinkedInIcon />
                </IconLink>
              )}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}
