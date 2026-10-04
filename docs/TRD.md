# TRD — Bangash Portfolio Website

Technical requirements for the product described in `PRD.md` and the design in `DESIGN.md`.

---

## 1. Tech stack (all free)

| Layer | Choice | Why |
|---|---|---|
| Build tool | **Vite** (latest) | Fast dev server, tiny production builds |
| UI | **React 19 + TypeScript** (strict) | Component model, type safety |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | Design tokens with `@theme`, no config file needed |
| Animation | **GSAP** + `@gsap/react` (`useGSAP`), **ScrollTrigger** | Free incl. all plugins; best timeline + scroll control |
| Smooth scroll | **Lenis** (`lenis` package) | Lightweight, works with ScrollTrigger |
| Icons | **lucide-react** | Tree-shakeable SVG icons |
| Fonts | Google Fonts (Bricolage Grotesque, Instrument Sans) | Free |
| Contact form | **Web3Forms** (free tier) | No backend; delivers to email |
| GitHub data | **GitHub REST API** (unauthenticated) | Free; 60 requests/hour/IP, we cache |
| Analytics | **Vercel Web Analytics** (`@vercel/analytics`) | Free on Hobby, cookie-free |
| Lint/format | ESLint (Vite template config) + Prettier | Consistent code |
| Hosting | **Vercel Hobby** | Free HTTPS, CDN, auto-deploy on push, `*.vercel.app` URL |
| Repo | **GitHub** public repo `bangash40/portfolio` | Free; shows work history |

Node.js ≥ 20 LTS. Package manager: npm.

Do not add a UI kit (MUI, Chakra, shadcn), state library, router or CSS-in-JS. The site is one page plus a 404 handled without a router (see §6).

---

## 2. Project structure

```
portfolio/
├── CLAUDE.md
├── README.md
├── .claude/settings.json          # disables AI attribution
├── .githooks/commit-msg           # strips attribution trailers (safety net)
├── docs/
│   ├── PRD.md
│   ├── TRD.md
│   ├── DESIGN.md
│   └── BUILD_PLAN.md
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── resume/Farhan-Ali-Haider-Resume.pdf   # TODO(bangash)
│   ├── images/avatar.webp                     # TODO(bangash), optional
│   └── screens/<project-slug>/1.webp …        # TODO(bangash), optional
├── scripts/
│   ├── prerender.mjs              # injects the prerendered home page into dist/index.html
│   └── render-images.mjs          # regenerates og-image.png and apple-touch-icon.png
├── src/
│   ├── entry.ts                   # page entry: CSS now, app after the first paint
│   ├── main.tsx
│   ├── entry-server.tsx           # build-time prerender of the home page
│   ├── App.tsx
│   ├── index.css                  # Tailwind import + @theme tokens + base styles
│   ├── data/
│   │   └── content.ts             # ALL personal content (single source)
│   ├── types/
│   │   └── content.ts             # TypeScript types for content
│   ├── lib/
│   │   ├── gsap.ts                # registers plugins once
│   │   ├── github.ts              # GitHub API client + cache
│   │   └── contact.ts             # Web3Forms submit
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   ├── useTheme.ts
│   │   ├── useLenis.ts
│   │   ├── useScrollSpy.ts
│   │   └── useMediaQuery.ts
│   ├── components/
│   │   ├── layout/   Navbar.tsx, MobileMenu.tsx, Footer.tsx, SkipLink.tsx, Container.tsx
│   │   ├── ui/       Button.tsx, Tag.tsx, ThemeToggle.tsx, SectionHeading.tsx, Skeleton.tsx
│   │   ├── phone/    PhoneFrame.tsx, ScreenReel.tsx, PlaceholderScreen.tsx
│   │   └── sections/ Hero.tsx, About.tsx, Projects.tsx, ProjectBlock.tsx,
│   │                 Journey.tsx, GitHubActivity.tsx, Contact.tsx, ContactForm.tsx
│   └── pages/
│       └── NotFound.tsx
├── index.html
├── vercel.json
├── .env.example
├── vite.config.ts
├── tsconfig*.json
├── eslint.config.js
└── .prettierrc
```

---

## 3. Content model (`src/types/content.ts`)

`src/data/content.ts` exports one `content: SiteContent` object; it is the single source for every personal fact. The types file is the reference; the v2 shape:

- `person`: name, short name, role; hero copy (`badge`, `headline`, `headlineAccent`, `intro`); `availability`; About facts (`bio`, `location`, `yearsExperience`, `openTo`, optional `avatar`); terminal lines (`focus`, `enjoys`, `mindset`); `resumeUrl`.
- `links`: `email`, `github`, optional `linkedin` and `whatsapp`.
- `skillTree`: `root` (Flutter) and `children`, each a `Skill` — `id`, `name`, `tier` (`primary` | `secondary`), `use`, `usedIn`, `level`.
- `projects`: `Project` — slug, name, summary, problem, built, role, stack, status, `kind` (`mobile` | `web`), `featured`, `keyFeature`, `architecture` (flow labels), links, `screens` (image or designed placeholder; featured cards show the first two), `tint`.
- `experience`: `ExperienceEntry` — hash, branch, role, organisation, duration, description, tech, `kind` (`head` | `work` | `education`), newest first.
- `githubUsername`, `site` (url, title, description).

Placeholder values start with `TODO:` and carry a `// TODO(bangash):` comment. Placeholder text shows as written; placeholder links are hidden. Components never contain personal text.

---

## 4. Theming

- Tokens defined in `src/index.css` with Tailwind v4 `@theme` using the exact values in `DESIGN.md` v2 §2. The `@theme` values are the **dark** theme (the default); light values override the same variables under `:root[data-theme="light"]`.
- Components use the semantic tokens (`bg`, `surface`, `text`, `muted`, `primary`, …), never raw hex.
- `useTheme`:
  1. Read `localStorage.getItem('theme')` inside try/catch.
  2. If none, use dark (the primary experience).
  3. Set `document.documentElement.dataset.theme`; colours cross-fade for 450 ms on a switch.
- An inline script in `index.html` `<head>` applies the theme **before** first paint to avoid a flash.
- Fonts: `--font-sans` (Geist) and `--font-mono` (JetBrains Mono), each with a metric-matched local fallback.

---

## 5. Animation architecture

- `src/lib/gsap.ts`: `gsap.registerPlugin(ScrollTrigger, useGSAP)`; export `gsap`, `ScrollTrigger`. Import from here only.
- All GSAP animations use `useGSAP(() => {...}, { scope: ref })` so they auto-clean on unmount.
- `useReducedMotion()` returns a boolean from `matchMedia('(prefers-reduced-motion: reduce)')`, reactive to change. Every animated component checks it first.
- `useLenis()` (called once in `App`):
  - Skip entirely if reduced motion.
  - Lenis and GSAP are dynamically imported after the first render, keeping them off the critical path; scrolling is native until they arrive.
  - `const lenis = new Lenis()`; `lenis.on('scroll', ScrollTrigger.update)`; `gsap.ticker.add(t => lenis.raf(t * 1000))`; `gsap.ticker.lagSmoothing(0)`.
  - Expose `scrollTo(target)` for nav links (falls back to `element.scrollIntoView` when Lenis is off).
- Projects pinning uses `ScrollTrigger.matchMedia` / `gsap.matchMedia()` with `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`.
- Boot sequence (DESIGN §7.1) is CSS keyframes in `index.css`, not a GSAP timeline (changed in step 10.3 for performance). An inline script in `index.html` adds `.booting` to `<html>` before the first paint, once per session (`sessionStorage.getItem('booted')`, try/catch), on the home page only and never with reduced motion. The animation therefore starts with the page instead of waiting for JavaScript; `Hero` only waits for it to finish before starting the screen reel.
- Avoid GSAP tweens that read computed transforms during page load (they force layout); create them after the first paint or on first interaction.
- Animate only `transform`, `opacity`, `clip-path`. Never animate layout properties.

---

## 6. Routing and 404

No router library.
- `App.tsx` renders the single page.
- `vercel.json`:
  ```json
  {
    "cleanUrls": true,
    "rewrites": [{ "source": "/((?!assets/|.*\\..*).*)", "destination": "/" }]
  }
  ```
- In `main.tsx`: if `window.location.pathname` is not `/` (ignoring hash), render `NotFound` and set `document.title` accordingly; otherwise hydrate the prerendered `App` (see §10). Unknown paths receive the prerendered home HTML through the rewrite, so `index.html` hides it (`.not-found`) until the 404 page replaces it.

---

## 7. GitHub integration (`src/lib/github.ts`)

Endpoints (unauthenticated):
- `GET https://api.github.com/users/{username}` → `public_repos`, `followers`
- `GET https://api.github.com/users/{username}/repos?sort=updated&per_page=30` → filter out forks, take 6 most recently pushed; compute language totals by counting each repo's `language`.

Rules:
- Single function `getGitHubSummary(username)` returns `{ publicRepos, followers, languages: {name, share}[], repos: RepoItem[] }`.
- Cache result in `sessionStorage` key `gh:{username}` with a timestamp; reuse for 30 minutes.
- Use `AbortController` with an 8 s timeout.
- On any error (network, 403 rate limit, timeout): component shows the fallback message from `DESIGN.md §8`. Never throw to the UI.
- Fetch only when the section is near the viewport (`IntersectionObserver`, rootMargin `400px`).
- Relative dates via `Intl.RelativeTimeFormat`.

---

## 8. Contact form (`src/lib/contact.ts`)

- Web3Forms endpoint: `POST https://api.web3forms.com/submit` with JSON body `{ access_key, name, email, message, subject: 'New message from portfolio', botcheck }`.
- Access key from `import.meta.env.VITE_WEB3FORMS_KEY` (Web3Forms keys are designed to be public; still keep it in env for easy rotation).
- `.env.example` contains `VITE_WEB3FORMS_KEY=your-access-key-here`. Real `.env` is git-ignored.
- On Vercel, the owner adds the same variable in Project → Settings → Environment Variables.
- Client validation: name 2–80 chars; valid email; message 10–2000 chars. Errors shown inline on blur and on submit.
- Honeypot: hidden `botcheck` checkbox; if checked, silently pretend success.
- If the key is missing, the form shows the email link instead of failing silently.

---

## 9. SEO and sharing

`index.html` must include:
- `<html lang="en">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<title>Farhan Ali Haider — Mobile App Developer</title>`
- meta description (≤ 155 chars)
- canonical link (site URL from content once known; placeholder until deploy)
- Open Graph: `og:title`, `og:description`, `og:type=website`, `og:url`, `og:image` (absolute URL to `/og-image.png`)
- Twitter: `summary_large_image`
- `theme-color` for light and dark
- favicon SVG + apple-touch-icon
- JSON-LD `Person` schema (name, url, sameAs: GitHub/LinkedIn)

`public/robots.txt` allows all and points to the sitemap. `public/sitemap.xml` lists the home URL.

---

## 10. Performance budget

- Total JS ≤ 250 KB gzipped (check with `npm run build` output).
- Hero LCP element is the name text (not an image) → fast LCP.
- First hero screenshot `fetchpriority="high"`; all others lazy.
- Images WebP, explicit `width`/`height` to prevent layout shift (CLS < 0.1).
- The home page is prerendered at build time: `src/entry-server.tsx` renders `App` with `react-dom/static` and `scripts/prerender.mjs` injects the HTML into `dist/index.html`; `main.tsx` hydrates it. Content paints before any JavaScript runs: the HTML entry is `src/entry.ts`, which loads the stylesheets and imports `main.tsx` only after the first paint.
- Everything below the hero (and the footer) is one `React.lazy` chunk, so the first render and hydration only cover the navbar and hero.
- Google Fonts load without blocking render (`media="print"` swap); metric-matched `@font-face` fallbacks (Arial with `size-adjust` and ascent/descent overrides measured from the font files) keep CLS at 0 when they swap in.
- Fonts: only the weights listed in DESIGN.md.

---

## 11. Quality gates (every commit)

1. `npm run build` succeeds (includes `tsc -b`).
2. `npm run lint` passes (from Phase 0.4 onward).
3. No `console.log` left in committed code.
4. No TypeScript `any` unless justified with a comment.

Final phase gates: Lighthouse mobile ≥ 90 ×4, keyboard-only walkthrough, reduced-motion walkthrough, widths 320/375/768/1024/1440/1920 checked.

---

## 12. Git and deployment

- Remote: `https://github.com/bangash40/portfolio` (owner creates it if it doesn't exist, or Claude Code uses `gh repo create` if the GitHub CLI is installed and authenticated).
- Branch: `main`. Every push auto-deploys to Vercel production.
- Commit hooks: `git config core.hooksPath .githooks` (set in Step 0.2).
- Attribution disabled via `.claude/settings.json` → `{"attribution": {"commit": "", "pr": ""}}`.
- Commit format: Conventional Commits (`feat`, `fix`, `style`, `chore`, `docs`, `refactor`, `perf`, `a11y` is written as `fix(a11y)`).

### Vercel setup (owner does this once, in Phase 1)
1. Go to vercel.com → sign up with GitHub (Hobby plan, free).
2. Add New → Project → import `bangash40/portfolio`.
3. Framework preset: Vite (auto-detected). Build: `npm run build`. Output: `dist`.
4. Deploy. Optionally rename the project to `bangash` in Settings → General so the URL becomes `bangash.vercel.app` (if available).
5. Later (Phase 8): add `VITE_WEB3FORMS_KEY` in Settings → Environment Variables and redeploy.
6. Later (Phase 9): enable Analytics in the project's Analytics tab.

### Web3Forms setup (owner, Phase 8)
1. Go to web3forms.com → enter the email address where messages should arrive → receive the access key by email.
2. Put it in local `.env` and in Vercel environment variables.
