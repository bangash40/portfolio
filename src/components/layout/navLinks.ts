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
