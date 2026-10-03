import type { SiteContent } from '../types/content';

// Every personal fact on the site lives here. Values starting with 'TODO:' are placeholders
// for the owner to replace. Placeholder text shows as written; placeholder links are hidden.
export const content: SiteContent = {
  person: {
    fullName: 'Farhan Ali Haider',
    shortName: 'Bangash',
    role: 'Mobile app developer working with Flutter and Firebase',
    heroSentence:
      'I build mobile apps with Flutter and Firebase — and ship them one commit at a time.',
    // TODO(bangash): confirm availability text
    availability: 'Available for internships and freelance work',
    // TODO(bangash): write real bio (2–3 short paragraphs)
    bio: [
      'TODO: Bio paragraph one. Who you are and what you build.',
      'TODO: Bio paragraph two. How you got into mobile development and what you are learning now.',
      'TODO: Bio paragraph three (optional). What kind of work or internship you are looking for.',
    ],
    // TODO(bangash): add photo at public/images/avatar.webp, then set avatar: '/images/avatar.webp'
    // TODO(bangash): add résumé PDF at public/resume/Farhan-Ali-Haider-Resume.pdf
    resumeUrl: '/resume/Farhan-Ali-Haider-Resume.pdf',
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

  // TODO(bangash): adjust skills list
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
      // TODO(bangash): add GitHub and demo links if public
      links: {},
      screens: [
        { kind: 'placeholder', variant: 'ims', alt: 'Intern Management System app screen' },
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
      // TODO(bangash): add GitHub link if public
      links: {},
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
      // TODO(bangash): add GitHub link if public
      links: {},
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

  // Newest first.
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
