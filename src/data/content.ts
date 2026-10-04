import type { SiteContent } from '../types/content';

// Every personal fact on the site lives here. Values starting with 'TODO:' are placeholders
// for the owner to replace. Placeholder text shows as written; placeholder links are hidden.
export const content: SiteContent = {
  person: {
    fullName: 'Farhan Ali Haider',
    shortName: 'Bangash',
    role: 'Mobile app developer working with Flutter and Firebase',
    badge: 'FLUTTER DEVELOPER • MOBILE ENGINEER',
    headline: 'Mobile apps, engineered to',
    headlineAccent: 'feel effortless.',
    intro:
      "I'm Farhan Ali Haider, a Flutter developer building cross-platform apps with Dart, Firebase and clean APIs — and the occasional website.",
    heroSentence:
      'I build mobile apps with Flutter and Firebase — and ship them one commit at a time.',
    // TODO(bangash): confirm availability text
    availability: 'Available for opportunities',
    // TODO(bangash): write real bio (2–3 short paragraphs)
    bio: [
      'TODO: Bio paragraph one. Who you are and what you build.',
      'TODO: Bio paragraph two. How you got into mobile development and what you are learning now.',
      'TODO: Bio paragraph three (optional). What kind of work or internship you are looking for.',
    ],
    // TODO(bangash): add photo at public/images/avatar.webp, then set avatar: '/images/avatar.webp'
    // TODO(bangash): add résumé PDF at public/resume/Farhan-Ali-Haider-Resume.pdf
    resumeUrl: '/resume/Farhan-Ali-Haider-Resume.pdf',
    // TODO(bangash): your city and country
    location: 'TODO: your city',
    // TODO(bangash): years of experience, e.g. '1+ years'
    yearsExperience: 'TODO: years',
    openTo: 'Internships · freelance',
    focus: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'Automation'],
    // TODO(bangash): confirm what you enjoy building
    enjoys: 'Apps with clean, fast interfaces and real-time data — the kind people open every day.',
    mindset: ['build', 'test', 'improve', 'ship'],
  },

  links: {
    // TODO(bangash): real email address
    email: 'TODO: your email address',
    github: 'https://github.com/bangash40',
    // TODO(bangash): real LinkedIn URL
    linkedin: 'TODO: your LinkedIn profile URL',
    // TODO(bangash): optional WhatsApp link, e.g. whatsapp: 'https://wa.me/<number>'
  },

  githubUsername: 'bangash40',

  // Flutter is the root; primary skills sit on the inner ring, secondary ones on the outer ring.
  // TODO(bangash): set each "level" and confirm the "use" and "usedIn" lines
  skillTree: {
    root: {
      id: 'flutter',
      name: 'Flutter',
      tier: 'primary',
      use: 'My main framework — cross-platform mobile apps from one codebase.',
      usedIn: 'Intern Management System, Kheench',
      level: 'TODO: level',
    },
    children: [
      {
        id: 'dart',
        name: 'Dart',
        tier: 'primary',
        use: 'The language behind every Flutter app I write.',
        usedIn: 'Every Flutter project',
        level: 'TODO: level',
      },
      {
        id: 'firebase',
        name: 'Firebase',
        tier: 'primary',
        use: 'Authentication and Cloud Firestore for sign-in and real-time data.',
        usedIn: 'Intern Management System',
        level: 'TODO: level',
      },
      {
        id: 'rest',
        name: 'REST APIs',
        tier: 'primary',
        use: 'Connecting apps to backend services and third-party data.',
        usedIn: 'TODO: project',
        level: 'TODO: level',
      },
      {
        id: 'git',
        name: 'Git',
        tier: 'primary',
        use: 'Version control with small, clean commits on every project.',
        usedIn: 'All projects',
        level: 'TODO: level',
      },
      {
        id: 'github',
        name: 'GitHub',
        tier: 'primary',
        use: 'Hosting and shipping code in public.',
        usedIn: 'Every public project',
        level: 'TODO: level',
      },
      {
        id: 'python',
        name: 'Python',
        tier: 'secondary',
        use: 'Scripting and automation.',
        usedIn: 'TODO: project',
        level: 'TODO: level',
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        tier: 'secondary',
        use: 'Relational databases for backend work.',
        usedIn: 'TODO: project',
        level: 'TODO: level',
      },
      {
        id: 'docker',
        name: 'Docker',
        tier: 'secondary',
        use: 'Containerised services and local environments.',
        usedIn: 'TODO: project',
        level: 'TODO: level',
      },
      {
        id: 'n8n',
        name: 'n8n',
        tier: 'secondary',
        use: 'Workflow automation connecting apps and APIs.',
        usedIn: 'TODO: project',
        level: 'TODO: level',
      },
      {
        id: 'wordpress',
        name: 'WordPress',
        tier: 'secondary',
        use: 'Content-managed websites.',
        usedIn: 'TODO: project',
        level: 'TODO: level',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        tier: 'secondary',
        use: 'Web projects, including the Chrome mini-player extension.',
        usedIn: 'Arc-style mini player',
        level: 'TODO: level',
      },
      {
        id: 'htmlcss',
        name: 'HTML/CSS',
        tier: 'secondary',
        use: 'Accessible layouts for the web — including this portfolio.',
        usedIn: 'This portfolio',
        level: 'TODO: level',
      },
    ],
  },

  // v1 skill groups; removed once the skills orbit replaces the About list (Phase 11).
  skills: [
    { title: 'Mobile', items: ['Flutter', 'Dart', 'Android'] },
    { title: 'Backend & cloud', items: ['Firebase Auth', 'Cloud Firestore'] },
    { title: 'Tools', items: ['Git', 'GitHub', 'VS Code / Android Studio'] },
    { title: 'Web', items: ['React', 'TypeScript', 'Tailwind CSS'] },
  ],

  projects: [
    {
      slug: 'intern-management-system',
      name: 'Intern Management System',
      summary:
        'Mobile app with separate intern and admin sides, built as an internship task for Internee.pk.',
      // TODO(bangash): describe the problem this app solves
      problem: 'TODO: What problem does this app solve, and for whom?',
      built:
        'A Flutter app with separate intern and admin sides, using Firebase Auth for sign-in and Cloud Firestore for data.',
      // TODO(bangash): your role on this project
      role: 'TODO: Your role',
      stack: ['Flutter', 'Firebase Auth', 'Cloud Firestore'],
      // TODO(bangash): confirm status (completed or in progress)
      status: 'in-progress',
      kind: 'mobile',
      featured: true,
      keyFeature: 'Separate intern and admin experiences in one app',
      architecture: ['Flutter UI', 'Firebase Auth', 'Cloud Firestore'],
      // TODO(bangash): confirm the repository and add a demo link if public
      links: { github: 'https://github.com/bangash40/intern-management-system' },
      screens: [
        { kind: 'placeholder', variant: 'ims', alt: 'Intern view of the Intern Management System' },
        {
          kind: 'placeholder',
          variant: 'ims-admin',
          alt: 'Admin view of the Intern Management System',
        },
      ],
      tint: '#2b59ff',
    },
    {
      slug: 'kheench',
      name: 'Kheench',
      summary: 'Android video downloader that fetches available qualities and formats from a link.',
      // TODO(bangash): describe the problem this app solves
      problem: 'TODO: What problem does Kheench solve, and for whom?',
      built:
        'A Flutter Android app that takes a video link and uses yt-dlp to list the qualities and formats available to download.',
      // TODO(bangash): your role on this project
      role: 'TODO: Your role',
      stack: ['Flutter', 'yt-dlp'],
      status: 'in-progress',
      kind: 'mobile',
      featured: true,
      keyFeature: 'Lists every available quality and format before you download',
      architecture: ['Flutter UI', 'yt-dlp'],
      // TODO(bangash): confirm the repository
      links: { github: 'https://github.com/bangash40/kheench' },
      screens: [{ kind: 'placeholder', variant: 'kheench', alt: 'Kheench app screen' }],
      tint: '#12a594',
    },
    {
      slug: 'arc-mini-player',
      name: 'Arc-style mini player for Chrome',
      summary:
        'Chrome extension that keeps a video playing in a floating mini player when you switch tabs.',
      // TODO(bangash): describe the problem this extension solves
      problem: 'TODO: What problem does this extension solve, and for whom?',
      built:
        'A Chrome extension that keeps a video playing in a floating mini player when you switch tabs.',
      // TODO(bangash): your role on this project
      role: 'TODO: Your role',
      stack: ['JavaScript', 'Chrome Extensions API'],
      // TODO(bangash): confirm status (planned or in progress)
      status: 'planned',
      kind: 'web',
      featured: false,
      keyFeature: 'Keeps the video playing in a floating window when you switch tabs',
      architecture: [],
      // TODO(bangash): confirm ArcPiP is this project's repository
      links: { github: 'https://github.com/bangash40/ArcPiP' },
      screens: [
        {
          kind: 'placeholder',
          variant: 'miniplayer',
          alt: 'Floating mini player extension screen',
        },
      ],
      tint: '#8e4ec6',
    },
    {
      slug: 'portfolio',
      name: 'This portfolio',
      summary: 'The site you are on, built step by step in public.',
      problem:
        'A GitHub profile alone does not tell a story, show app screens, or make it easy to get in touch.',
      built:
        'A single-page site with an animated phone, project case studies, a live GitHub section and a contact form.',
      // TODO(bangash): your role on this project
      role: 'TODO: Your role',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP'],
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
      tint: '#e5484d',
    },
  ],

  // A git log, newest first (DESIGN.md §6.8).
  // TODO(bangash): fill in roles, dates and education
  experience: [
    {
      hash: 'HEAD',
      branch: 'main',
      role: 'Flutter developer',
      organisation: 'Personal projects',
      duration: 'TODO: start year — now',
      description:
        'Building Kheench and this portfolio, and planning a Chrome mini-player extension.',
      tech: ['Flutter', 'Dart', 'React', 'TypeScript'],
      kind: 'head',
    },
    {
      hash: 'a3f9c21',
      branch: 'internship',
      role: 'TODO: your role',
      organisation: 'Internee.pk',
      duration: 'TODO: start — end',
      description:
        'Built the Intern Management System as an internship task: separate intern and admin sides on Firebase.',
      tech: ['Flutter', 'Firebase Auth', 'Cloud Firestore'],
      kind: 'work',
    },
    {
      hash: '19d04ce',
      branch: 'education',
      role: 'TODO: degree',
      organisation: 'TODO: institution',
      duration: 'TODO: years',
      description: 'TODO: what you studied and key achievements',
      tech: [],
      kind: 'education',
    },
  ],

  // v1 journey timeline; removed once the experience section replaces it (Phase 11).
  // TODO(bangash): real dates and education details; confirm each message and the order
  timeline: [
    { id: 'f4e028f', date: '2026-10', message: 'Launched this portfolio' },
    {
      id: 'c81d3a7',
      date: 'TODO: YYYY-MM',
      message: 'Started the Arc-style mini player for Chrome',
    },
    { id: '7be1d04', date: 'TODO: YYYY-MM', message: 'Began building Kheench' },
    {
      id: '5e2a9b0',
      date: 'TODO: YYYY-MM',
      message: 'Started building the Intern Management System',
    },
    { id: 'a3f9c21', date: 'TODO: YYYY-MM', message: 'Started internship at Internee.pk' },
    { id: '19d04ce', date: 'TODO: YYYY-MM', message: 'TODO: Education (degree and institution)' },
  ],

  site: {
    url: 'https://farhan-bangash.vercel.app',
    title: 'Farhan Ali Haider — Mobile App Developer',
    description:
      'Farhan Ali Haider (Bangash) builds mobile apps with Flutter and Firebase. See his projects, journey and live GitHub activity.',
  },
};
