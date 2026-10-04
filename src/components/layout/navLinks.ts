export interface NavLink {
  id: string;
  label: string;
}

// Section anchors in page order (DESIGN.md §6.1).
export const navLinks: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

// Every section the scroll spy tracks, in page order. GitHub has no nav link, but tracking it
// stops "Experience" staying highlighted while the visitor reads the GitHub section.
export const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'github',
  'contact',
];

// Active link: text colour plus a 2px primary underline, so colour is not the only cue.
export function navLinkStateClass(active: boolean) {
  return active
    ? "text-text after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-primary after:content-['']"
    : 'text-muted hover:text-text';
}
