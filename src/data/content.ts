import type { SiteContent } from '../types/content';

// Every personal fact on the site lives here. Values starting with 'TODO:' are placeholders
// for the owner to replace. Placeholder text shows as written; placeholder links are hidden.
export const content: SiteContent = {
  person: {
    fullName: 'Farhan Ali Haider',
    shortName: 'Bangash',
    role: 'Mobile app developer working with Flutter and Firebase',
    title: 'Flutter developer · Mobile engineer',
    whoami: 'Flutter developer · mobile application engineer',
    badge: 'FLUTTER DEVELOPER • MOBILE ENGINEER',
    headline: 'Mobile apps, engineered to',
    headlineAccent: 'feel effortless.',
    intro:
      "I'm Farhan Ali Haider, a Flutter developer building cross-platform apps with Dart, Firebase and clean APIs — and the occasional website.",
    // TODO(bangash): confirm availability text
    availability: 'Available for opportunities',
    // From the CV profile; edit freely.
    bio: [
      'A motivated, quick-learning developer with a strong foundation in modern tools and frameworks. I enjoy contributing to real-world applications, learning from experienced teams and exploring tools that make apps smarter, cleaner and faster.',
    ],
    // TODO(bangash): add photo at public/images/avatar.webp, then set avatar: '/images/avatar.webp'
    resumeUrl: '/resume/Farhan-Ali-Haider-Resume.pdf',
    location: 'Peshawar, Pakistan',
    // First professional role (Diginatives) started in January 2025.
    yearsExperience: 'Since 2025',
    openTo: 'Internships · freelance',
    focus: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Automation'],
    // TODO(bangash): confirm what you enjoy building
    enjoys: 'Apps with clean, fast interfaces and real-time data — the kind people open every day.',
    mindset: ['build', 'test', 'improve', 'ship'],
  },

  sections: {
    about: {
      title: 'A developer who ships the whole app.',
      lead: 'Interface, state, backend and release — I care about every layer a user touches.',
    },
    skills: {
      title: 'Flutter at the center. The rest in orbit.',
      lead: 'Hover or select a technology to see what I use it for.',
    },
    projects: {
      title: 'Products, not exercises.',
      lead: 'Mobile first. Each one built end to end — interface, data and release.',
    },
    experience: {
      title: 'The commit history so far.',
      lead: 'Newest first, like git log.',
    },
    github: {
      title: 'Shipping in public.',
      lead: 'Pulled from the GitHub API on every visit.',
    },
    contact: {
      eyebrow: 'Have an idea for an app?',
      title: "Let's build it.",
      lead: 'Internships, freelance projects or a quick question — I usually reply within two days.',
    },
  },
  footer: {
    role: 'Flutter developer / mobile app developer',
    tagline: 'Designed with curiosity, built with code — and a lot of hot reloads.',
  },
  links: {
    email: 'farhanbangash40@gmail.com',
    github: 'https://github.com/bangash40',
    linkedin: 'https://www.linkedin.com/in/farhan-ali-haider-632044220',
    // TODO(bangash): optional WhatsApp link, e.g. whatsapp: 'https://wa.me/<number>'
  },

  githubUsername: 'bangash40',

  // Flutter is the root; primary skills sit on the inner ring, secondary ones on the outer ring.
  // Levels: Proficient > Comfortable > Familiar.
  skillTree: {
    root: {
      id: 'flutter',
      name: 'Flutter',
      tier: 'primary',
      use: 'My main framework — cross-platform mobile apps from one codebase.',
      usedIn: 'Intern Management System, Kheench',
      level: 'Proficient',
    },
    children: [
      {
        id: 'dart',
        name: 'Dart',
        tier: 'primary',
        use: 'The language behind every Flutter app I write.',
        usedIn: 'Every Flutter project',
        level: 'Proficient',
      },
      {
        id: 'firebase',
        name: 'Firebase',
        tier: 'primary',
        use: 'Authentication and Cloud Firestore for sign-in and real-time data.',
        usedIn: 'Intern Management System',
        level: 'Comfortable',
      },
      {
        id: 'rest',
        name: 'REST APIs',
        tier: 'primary',
        use: 'Connecting apps to backend services and third-party data.',
        usedIn: 'Flutter apps that talk to backend services',
        level: 'Comfortable',
      },
      {
        id: 'git',
        name: 'Git',
        tier: 'primary',
        use: 'Version control with small, clean commits on every project.',
        usedIn: 'All projects',
        level: 'Proficient',
      },
      {
        id: 'github',
        name: 'GitHub',
        tier: 'primary',
        use: 'Hosting and shipping code in public.',
        usedIn: 'Every public project',
        level: 'Proficient',
      },
      {
        id: 'python',
        name: 'Python',
        tier: 'secondary',
        use: 'Scripting and automation.',
        usedIn: 'Small scripts and tools',
        level: 'Familiar',
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        tier: 'secondary',
        use: 'Relational databases and the queries behind reports.',
        usedIn: 'Tryton ERP reporting at Diginatives',
        level: 'Comfortable',
      },
      {
        id: 'docker',
        name: 'Docker',
        tier: 'secondary',
        use: 'Containerised services and local environments.',
        usedIn: 'Local development setups',
        level: 'Familiar',
      },
      {
        id: 'n8n',
        name: 'n8n',
        tier: 'secondary',
        use: 'Workflow automation connecting apps and APIs.',
        usedIn: 'Automation workflows',
        level: 'Familiar',
      },
      {
        id: 'wordpress',
        name: 'WordPress',
        tier: 'secondary',
        use: 'Content-managed websites and landing pages.',
        usedIn: 'A landing page for a mobile app at Diginatives',
        level: 'Comfortable',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        tier: 'secondary',
        use: 'Web projects, including the Chrome mini-player extension.',
        usedIn: 'Arc-style mini player',
        level: 'Comfortable',
      },
      {
        id: 'htmlcss',
        name: 'HTML/CSS',
        tier: 'secondary',
        use: 'Accessible layouts for the web — including this portfolio.',
        usedIn: 'This portfolio',
        level: 'Comfortable',
      },
      {
        id: 'tryton',
        name: 'Tryton',
        tier: 'secondary',
        use: 'ERP reports, deployments and day-to-day support.',
        usedIn: 'Diginatives, including a hospital deployment',
        level: 'Comfortable',
      },
    ],
  },

  projects: [
    {
      slug: 'intern-management-system',
      name: 'Intern Management System',
      summary: 'Mobile app with separate intern and admin sides, built with Flutter and Firebase.',
      problem:
        'Tracking interns, their tasks and progress by hand is slow; this gives interns and admins one place to manage it.',
      built:
        'A Flutter app with separate intern and admin sides, using Firebase Auth for sign-in and Cloud Firestore for data.',
      role: 'Developer — designed and built the intern and admin sides',
      stack: ['Flutter', 'Firebase Auth', 'Cloud Firestore'],
      status: 'in-progress',
      kind: 'mobile',
      featured: true,
      keyFeature: 'Separate intern and admin experiences in one app',
      architecture: ['Flutter UI', 'Firebase Auth', 'Cloud Firestore'],
      links: { github: 'https://github.com/bangash40/intern-management-system' },
      screens: [
        { kind: 'placeholder', variant: 'ims', alt: 'Intern view of the Intern Management System' },
        {
          kind: 'placeholder',
          variant: 'ims-admin',
          alt: 'Admin view of the Intern Management System',
        },
      ],
    },
    {
      slug: 'kheench',
      name: 'Kheench',
      summary: 'Android video downloader that fetches available qualities and formats from a link.',
      problem:
        'Downloading a video in the right quality usually means guessing; Kheench shows every available format first.',
      built:
        'A Flutter Android app that takes a video link and uses yt-dlp to list the qualities and formats available to download.',
      role: 'Solo developer — design, app and integration',
      stack: ['Flutter', 'yt-dlp'],
      status: 'in-progress',
      kind: 'mobile',
      featured: true,
      keyFeature: 'Lists every available quality and format before you download',
      architecture: ['Flutter UI', 'yt-dlp'],
      links: { github: 'https://github.com/bangash40/kheench' },
      screens: [{ kind: 'placeholder', variant: 'kheench', alt: 'Kheench app screen' }],
    },
    {
      slug: 'grocery-app',
      name: 'Grocery App with Web Admin',
      tag: 'Final year project',
      summary: 'Online grocery delivery for customers and sellers, with a web admin panel.',
      problem:
        'Grocery shopping is moving online; this makes ordering easy for customers and sellers while cutting operational costs.',
      built:
        'A grocery delivery app with a web admin, with real-time updates on products and prices.',
      role: 'Developer — the customer app and the web admin',
      stack: [],
      status: 'completed',
      kind: 'mobile',
      featured: true,
      keyFeature: 'Real-time updates on products and prices',
      architecture: [],
      // TODO(bangash): add the repository link if it is public
      links: {},
      screens: [{ kind: 'placeholder', variant: 'grocery', alt: 'Grocery app product list' }],
    },
    {
      slug: 'arc-mini-player',
      name: 'Arc-style mini player for Chrome',
      summary:
        'Chrome extension that keeps a video playing in a floating mini player when you switch tabs.',
      problem:
        'Switching tabs means losing sight of the video you are watching; the mini player keeps it in view.',
      built:
        'A Chrome extension that keeps a video playing in a floating mini player when you switch tabs.',
      role: 'Solo developer',
      stack: ['JavaScript', 'Chrome Extensions API'],
      status: 'in-progress',
      kind: 'web',
      featured: false,
      keyFeature: 'Keeps the video playing in a floating window when you switch tabs',
      architecture: [],
      links: { github: 'https://github.com/bangash40/ArcPiP' },
      screens: [
        {
          kind: 'placeholder',
          variant: 'miniplayer',
          alt: 'Floating mini player extension screen',
        },
      ],
    },
    {
      slug: 'portfolio',
      name: 'This portfolio',
      summary: 'The site you are on, built step by step in public.',
      problem:
        'A GitHub profile alone does not tell a story, show app screens, or make it easy to get in touch.',
      built:
        'A single-page site with an animated phone, project case studies, a live GitHub section and a contact form.',
      role: 'Designer and developer',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      status: 'live',
      kind: 'web',
      featured: false,
      keyFeature: 'Prerendered, accessible and fast, with a live GitHub section',
      architecture: [],
      links: {
        github: 'https://github.com/bangash40/portfolio',
        demo: 'https://farhan-bangash.vercel.app',
      },
      screens: [
        { kind: 'placeholder', variant: 'portfolio', alt: 'This portfolio site on a phone' },
      ],
    },
  ],

  // A git log, newest first (DESIGN.md §6.8).
  // TODO(bangash): institution name for the degree
  experience: [
    {
      hash: 'HEAD',
      branch: 'main',
      role: 'Flutter developer',
      organisation: 'Personal projects',
      duration: '2026 — now',
      description:
        'Building Flutter apps such as Kheench and the Intern Management System, this portfolio, and a Chrome mini-player extension.',
      tech: ['Flutter', 'Dart', 'Firebase', 'TypeScript'],
      kind: 'head',
    },
    {
      hash: 'e81b07d',
      branch: 'diginatives',
      role: 'Associate Software Engineer',
      organisation: 'Diginatives',
      duration: 'Apr 2025 — Oct 2025',
      description:
        'Built and customised Tryton ERP reports with senior developers, ran PostgreSQL queries for reporting, wrote installation and deployment documentation, and built a WordPress landing page for a mobile app.',
      tech: ['Tryton', 'PostgreSQL', 'WordPress'],
      kind: 'work',
    },
    {
      hash: '6c2d4fa',
      branch: 'diginatives',
      role: 'Intern',
      organisation: 'Diginatives',
      duration: 'Jan 2025 — Mar 2025',
      description:
        'Deployed Tryton ERP in a hospital and handled day-to-day software issues and user support.',
      tech: ['Tryton'],
      kind: 'work',
    },
    {
      hash: '19d04ce',
      branch: 'education',
      role: 'Bachelor in Computer Science',
      organisation: 'Peshawar',
      duration: '2018 — 2022',
      description: 'Final year project: a grocery delivery app with a web admin panel.',
      tech: [],
      kind: 'education',
    },
  ],

  site: {
    url: 'https://farhan-bangash.vercel.app',
    title: 'Farhan Ali Haider — Mobile App Developer',
    description:
      'Farhan Ali Haider (Bangash) builds mobile apps with Flutter and Firebase. See his projects, experience and live GitHub activity.',
  },
};
