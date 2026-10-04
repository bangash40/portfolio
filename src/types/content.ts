export type Screen =
  | { kind: 'image'; src: string; alt: string }
  | {
      kind: 'placeholder';
      variant: 'ims' | 'ims-admin' | 'kheench' | 'miniplayer' | 'portfolio';
      alt: string;
    };

export type ProjectStatus = 'live' | 'completed' | 'in-progress' | 'planned';

/** Mobile projects lead the page; web projects are the smaller supporting cards. */
export type ProjectKind = 'mobile' | 'web';

export interface Project {
  slug: string;
  name: string;
  summary: string; // one line
  problem: string;
  built: string; // what was built
  role: string;
  stack: string[];
  status: ProjectStatus;
  kind: ProjectKind;
  featured: boolean; // large card with phone frames
  keyFeature: string;
  architecture: string[]; // flow shown on featured cards, e.g. ['Flutter UI', 'Firebase Auth']
  links: { github?: string; demo?: string };
  screens: Screen[]; // 1–4; featured cards show the first two
  tint: string; // low-opacity accent for placeholder screens
}

export type SkillTier = 'primary' | 'secondary';

export interface Skill {
  id: string;
  name: string;
  tier: SkillTier;
  use: string; // what I use it for
  usedIn: string;
  level: string;
}

export interface ExperienceEntry {
  hash: string; // 'HEAD' or a 7-char hash-like id
  branch: string;
  role: string;
  organisation: string;
  duration: string;
  description: string;
  tech: string[];
  kind: 'head' | 'work' | 'education';
}

export interface TimelineEntry {
  id: string; // 7-char hash-like id, e.g. 'a3f9c21'
  date: string; // 'YYYY-MM'
  message: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

/** A section's h2 and one-line lead (DESIGN.md §8). */
export interface SectionCopy {
  title: string;
  lead: string;
}

export interface SiteContent {
  person: {
    fullName: string;
    shortName: string; // 'Bangash'
    role: string;
    title: string; // profile card, under the name
    whoami: string; // terminal: whoami
    badge: string; // hero badge, e.g. 'FLUTTER DEVELOPER • MOBILE ENGINEER'
    headline: string; // hero h1, before the highlighted phrase
    headlineAccent: string; // highlighted end of the h1
    intro: string; // hero sentence
    heroSentence: string;
    availability: string;
    bio: string[];
    avatar?: string;
    resumeUrl: string;
    location: string;
    yearsExperience: string;
    openTo: string;
    focus: string[]; // terminal: current_focus
    enjoys: string; // terminal: enjoy_building.txt
    mindset: string[]; // terminal: mindset steps
  };
  sections: {
    about: SectionCopy;
    skills: SectionCopy;
    projects: SectionCopy;
    experience: SectionCopy;
  };
  links: { email: string; github: string; linkedin?: string; whatsapp?: string };
  githubUsername: string; // 'bangash40'
  /** Flutter at the root, everything else as its children (DESIGN.md §6.6). */
  skillTree: { root: Skill; children: Skill[] };
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[]; // newest first
  timeline: TimelineEntry[];
  site: { url: string; title: string; description: string };
}
