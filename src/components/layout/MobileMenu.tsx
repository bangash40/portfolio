import { X } from 'lucide-react';
import { useEffect, useRef, type MouseEvent } from 'react';
import { content } from '../../data/content';
import { isModifiedClick, setScrollLocked } from '../../hooks/useLenis';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Container } from './Container';
import { contactLink, navLinkStateClass, navLinks } from './navLinks';

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  activeId: string | null;
}

// Full-screen menu for < 768px: traps focus, closes on Esc, locks page scroll while open.
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
      className="fixed inset-0 z-50 overflow-y-auto bg-fog md:hidden"
    >
      <Container className="flex h-[72px] items-center justify-between">
        <a
          href="#top"
          onClick={(event) => navigate(event, 'top')}
          className="inline-flex h-11 items-center font-display text-xl font-extrabold tracking-[-0.02em] text-graphite"
        >
          {content.person.shortName}
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-graphite transition-colors duration-150 hover:bg-line motion-reduce:transition-none"
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </Container>

      <Container className="pt-8 pb-12">
        <nav aria-label="Sections">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => navigate(event, link.id)}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={`inline-flex min-h-11 items-center py-1 font-display text-h3 font-extrabold transition-colors duration-150 motion-reduce:transition-none ${navLinkStateClass(activeId === link.id)}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href={`#${contactLink.id}`}
            onClick={(event) => navigate(event, contactLink.id)}
            className="mt-10"
          >
            {contactLink.label}
          </Button>
        </nav>
      </Container>
    </div>
  );
}
