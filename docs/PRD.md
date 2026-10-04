# PRD — Bangash Portfolio Website

| | |
|---|---|
| Owner | Farhan Ali Haider ("Bangash") |
| GitHub | `bangash40` |
| Version | 1.0 |
| Status | Ready to build |

---

> **v2 (Phase 11):** the site is redesigned as "Widget Tree" — Flutter-first identity, dark-first theme, sections Home · About · Skills · Projects · Experience · GitHub · Contact. The goals, audience and non-functional requirements below still apply; `DESIGN.md` v2 defines the look and the section details.

## 1. Summary

A fast, professional, animated personal portfolio website that presents Farhan as a mobile app developer (Flutter + Firebase). It is live on the internet with a public, shareable link and costs nothing to build, host or run.

## 2. Problem

Recruiters, internship coordinators and clients judge a developer in under a minute. A GitHub profile alone does not tell a story, show app screens, or make it easy to get in touch. Farhan needs one link he can put on his CV, LinkedIn and messages that shows who he is, what he has built, and how to reach him.

## 3. Goals

1. A visitor understands **who Farhan is and what he builds within 5 seconds** of landing.
2. A visitor can **see real app work** (screens, stack, purpose) without leaving the site.
3. A visitor can **contact Farhan or download his résumé in one click** from anywhere on the page.
4. The site feels **crafted and memorable** — one signature animated moment, not a template.
5. **Zero cost**: free hosting, free domain subdomain, free form handling, free analytics.
6. **Fast**: Lighthouse score ≥ 90 in Performance, Accessibility, Best Practices and SEO on mobile.

## 4. Non-goals (v1)

- No blog or CMS.
- No backend server or database of our own.
- No login or admin panel.
- No paid custom domain (can be added later without code changes).
- No multi-language support.

## 5. Target audience

| Audience | What they want | What the site must do |
|---|---|---|
| Recruiters / HR | Quick skill check, CV | Clear role line, skills, résumé download |
| Internship coordinators | Proof of work and progress | Project case studies, GitHub activity |
| Freelance clients | Can he build my app? | App screens, contact form |
| Fellow developers | Code quality | GitHub links, tech stack per project |

## 6. Sections and features

The site is a single scrolling page plus a 404 page.

### 6.1 Navigation bar
- Sticky at the top; shrinks slightly after scrolling.
- Links: About, Projects, Journey, GitHub, Contact (smooth-scroll to sections).
- Light/dark theme toggle (remembers choice; defaults to system setting).
- "Contact" is styled as the primary button.
- Mobile: hamburger opens a full-screen menu.

### 6.2 Hero (signature section)
- Large name: **Farhan Ali Haider**.
- Role line: mobile app developer working with Flutter and Firebase.
- One short sentence on what he does (see copy in DESIGN.md).
- Two actions: **See my projects** (scrolls to Projects) and **Download résumé** (PDF).
- A realistic **phone mockup** that powers on when the page loads and then plays a slow loop of screens from his apps.
- Small "Available for internships and freelance work" status indicator. `// TODO(bangash): confirm availability text`

### 6.3 About
- Short bio (2–3 short paragraphs). `// TODO(bangash): write real bio` — placeholder must be obviously a placeholder.
- Photo or illustrated avatar (optional). `// TODO(bangash): add photo at public/images/avatar.webp`
- Skills grouped by area:
  - Mobile: Flutter, Dart, Android
  - Backend & cloud: Firebase Auth, Cloud Firestore
  - Tools: Git, GitHub, VS Code / Android Studio
  - Web (from this project): React, TypeScript, Tailwind CSS
  - `// TODO(bangash): adjust skills list`

### 6.4 Projects (case studies)
Each project shows: name, one-line summary, problem, what was built, tech stack tags, role, status, links (GitHub / demo), and 2–4 screens shown inside the phone mockup.

Initial projects:

| # | Project | Summary | Stack | Status |
|---|---|---|---|---|
| 1 | **Intern Management System** | Mobile app with separate intern and admin sides, built with Flutter and Firebase | Flutter, Firebase Auth, Cloud Firestore | Completed / in progress — `TODO(bangash)` |
| 2 | **Kheench** | Android video downloader that fetches available qualities and formats from a link | Flutter, yt-dlp | Personal project, in development |
| 3 | **Arc-style mini player for Chrome** | Chrome extension that keeps a video playing in a floating mini player when you switch tabs | JavaScript, Chrome Extensions API | Planned / in progress |
| 4 | **This portfolio** | The site you are on, built step by step in public | React, TypeScript, Tailwind, GSAP | Live |

Desktop: phone stays pinned while the project text scrolls; the phone screen changes to match the project in view.
Mobile: simple stacked layout, each project with its own small phone and screens.

New projects must be addable by editing only `src/data/content.ts`.

### 6.5 Journey (timeline)
- A vertical timeline styled like a git commit history: each milestone is a "commit" with a short hash-like id, date and message.
- Entries: education, work experience, each project start/launch.
- `// TODO(bangash): real dates and education details`

### 6.6 GitHub (live)
- Pulls public data for `bangash40` from the GitHub REST API at runtime:
  - Public repo count, followers, top languages.
  - 4–6 most recently updated public repos (name, description, language, stars, updated date).
- Caches the response for the browser session to stay inside the free API limit.
- If the API fails, shows a clean fallback with a link to the GitHub profile — never a broken section.

### 6.7 Contact
- Short invitation line.
- Contact form: name, email, message → delivered to Farhan's inbox through Web3Forms (free).
  - Inline validation, sending state, success state ("Message sent"), error state that says what to do.
  - Honeypot field for spam.
- Direct links: email, GitHub, LinkedIn, WhatsApp (optional). `// TODO(bangash): real links`
- Résumé download repeated here.

### 6.8 Footer
- Name, year, "Built with React and deployed on Vercel", link to the site's source code on GitHub, back-to-top.

### 6.9 404 page
- On-brand page with the phone showing a "screen not found" state and a button back home.

## 7. Content placeholders

All of these live in `src/data/content.ts` and are marked `TODO(bangash)` until the owner replaces them:

- Bio paragraphs
- Email address, LinkedIn URL, WhatsApp link
- Résumé PDF at `public/resume/Farhan-Ali-Haider-Resume.pdf`
- Avatar image
- App screenshots at `public/screens/<project-slug>/1.webp …`
  - Until real screenshots exist, the phone shows designed placeholder screens built in CSS (app name + simple UI blocks), not stock images.
- Education and timeline dates
- Availability status

## 8. Non-functional requirements

| Area | Requirement |
|---|---|
| Cost | ₨0 / $0. Free tiers only. |
| Performance | Lighthouse mobile ≥ 90; LCP < 2.5 s; total JS < 250 KB gzipped |
| Accessibility | WCAG 2.1 AA contrast, full keyboard use, visible focus, alt text, `prefers-reduced-motion` honored |
| Responsive | Works from 320 px phones to 1920 px desktops |
| Browsers | Latest Chrome, Edge, Firefox, Safari (desktop and mobile) |
| SEO | Title, description, Open Graph and Twitter cards, sitemap, robots.txt, canonical URL |
| Sharing | Link preview image (OG image) looks good on WhatsApp, LinkedIn and X |
| Privacy | Cookie-free analytics; no tracking cookies; no banner needed |
| Maintainability | All content in one data file; components small and typed |

## 9. Success metrics

- Site is live at a public URL (e.g. `https://bangash.vercel.app` or `https://bangash40.vercel.app`).
- Lighthouse mobile scores ≥ 90 in all four categories.
- Contact form delivers a test message to the owner's inbox.
- Owner can add a new project by editing one file and pushing.
- GitHub history shows clean, step-by-step commits authored only by the owner.

## 10. Release plan

1. Deploy a minimal page early (Phase 1 of the build plan) so the live link exists from day one.
2. Every push to `main` auto-deploys.
3. v1 is "done" when every checkbox in `BUILD_PLAN.md` is ticked and Section 9 is met.

## 11. Future ideas (v2+)

- Custom domain (free `.me` via GitHub Student Developer Pack if eligible).
- Individual case-study pages per project.
- Blog with MDX.
- Urdu language toggle.
- Testimonials (only real ones).
