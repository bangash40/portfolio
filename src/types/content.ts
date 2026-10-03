export type Screen =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'placeholder'; variant: 'ims' | 'kheench' | 'miniplayer' | 'portfolio'; alt: string };

export type ProjectStatus = 'live' | 'completed' | 'in-progress' | 'planned';

export interface Project {
  slug: string;
  name: string;
  summary: string; // one line
  problem: string;
  built: string; // what was built
  role: string;
  stack: string[];
  status: ProjectStatus;
  links: { github?: string; demo?: string };
  screens: Screen[]; // 1–4
  tint: string; // low-opacity accent for placeholder screens
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

export interface SiteContent {
  person: {
    fullName: string;
    shortName: string; // 'Bangash'
    role: string;
    heroSentence: string;
    availability: string;
    bio: string[];
    avatar?: string;
    resumeUrl: string;
  };
  links: { email: string; github: string; linkedin?: string; whatsapp?: string };
  githubUsername: string; // 'bangash40'
  skills: SkillGroup[];
  projects: Project[];
  timeline: TimelineEntry[];
  site: { url: string; title: string; description: string };
}
