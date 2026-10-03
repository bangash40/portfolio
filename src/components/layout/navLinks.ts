export interface NavLink {
  id: string;
  label: string;
}

// Section anchors in page order. Contact is rendered separately as the primary button.
export const navLinks: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'github', label: 'GitHub' },
];

export const contactLink: NavLink = { id: 'contact', label: 'Contact' };

// Every section the scroll spy tracks, in page order.
export const sectionIds = [...navLinks.map((link) => link.id), contactLink.id];

// Active link: Signal color plus a 2px underline, so color is not the only cue (DESIGN.md §6.6).
export function navLinkStateClass(active: boolean) {
  return active
    ? 'text-signal underline decoration-2 underline-offset-8'
    : 'text-graphite hover:text-signal';
}
