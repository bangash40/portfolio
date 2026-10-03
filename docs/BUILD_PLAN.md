# BUILD PLAN — Bangash Portfolio Website

Follow in order. **Each checkbox = one commit = one push.**

For every step:
1. Do only what the step says.
2. Run `npm run build` (and `npm run lint` from step 0.4 on). Fix anything that fails.
3. Tick the checkbox in this file.
4. `git add -A && git commit -m "<message shown>" && git push`
5. Move to the next step.

No co-authors, no AI trailers, no `--no-verify` (see `CLAUDE.md`).
Steps 0.1 and 0.2 are committed locally; they are pushed together in step 0.3 once the GitHub remote exists. From 0.3 onward every commit is pushed immediately.
🛑 = stop and wait for the owner.

---

## Phase 0 — Project setup

- [x] **0.1 Scaffold the project**
  Create a Vite React + TypeScript app in the current folder (keep existing `docs/`, `CLAUDE.md`, `.claude/`, `.githooks/`). `git init -b main` if not already a repo. Clean out Vite demo content (counter, logos, App.css). `App.tsx` renders just "Farhan Ali Haider". Make sure `.gitignore` includes `node_modules`, `dist`, `.env`, `.env.local`, `.DS_Store`, `.vercel`.
  Commit: `chore: scaffold vite react typescript project`

- [x] **0.2 Enable the commit hook**
  Run `git config core.hooksPath .githooks` and make sure `.githooks/commit-msg` is executable (`git update-index --chmod=+x .githooks/commit-msg`). Add a short "Commit rules" note to README.
  Commit: `chore: add commit-msg hook and project rules`

- [x] **0.3 Connect GitHub and push** 🛑
  If no remote exists: if `gh` CLI is installed and logged in, run `gh repo create bangash40/portfolio --public --source=. --remote=origin`; otherwise stop and ask the owner to create an empty public repo named `portfolio` on GitHub (no README) and paste the URL. Add remote, push `main`. Confirm the first commit on GitHub shows only the owner as author.
  Commit (after remote is connected): `docs: add initial readme`
  README: project title, one-line description, tech stack list, "Live site: coming soon".

- [x] **0.4 Lint and format**
  Add Prettier (`.prettierrc`: singleQuote, semi, printWidth 100, trailingComma all) and `eslint-config-prettier`. Add scripts `lint`, `format`. Format the codebase.
  Commit: `chore: configure eslint and prettier`

- [x] **0.5 Folder structure and types**
  Create the folder structure from `TRD.md §2` (empty folders get an `index.ts` or are created when first used — do not commit `.gitkeep` spam). Add `src/types/content.ts` exactly as `TRD.md §3`.
  Commit: `chore: add folder structure and content types`

## Phase 1 — Go live early

- [x] **1.1 Tailwind and design tokens**
  Install `tailwindcss @tailwindcss/vite`, add the plugin to `vite.config.ts`. In `src/index.css`: `@import "tailwindcss";`, `@theme` with all light tokens, fonts, type scale from `DESIGN.md`; dark overrides under `:root[data-theme="dark"]`; base styles (body bg Fog, text Graphite, font body, focus-visible ring).
  Commit: `style: add tailwind and design tokens`

- [x] **1.2 Fonts and base HTML**
  Add Google Fonts links with preconnect in `index.html`, `lang="en"`, title and meta description from `TRD.md §9`, inline no-flash theme script, temporary `favicon.svg` (B monogram).
  Commit: `feat: add fonts, meta tags and favicon`

- [x] **1.3 Vercel config and deploy** 🛑
  Add `vercel.json` from `TRD.md §6`. Push, then stop and walk the owner through the Vercel steps in `TRD.md §12`. When the owner shares the live URL, put it in README ("Live site: <url>").
  Commit: `chore: add vercel config and live link`

## Phase 2 — Content and layout foundation

- [x] **2.1 Content data file**
  Create `src/data/content.ts` with all data from `PRD.md` (4 projects, skills, timeline placeholders, links). Placeholders start with `TODO:` and have `// TODO(bangash):` comments. GitHub link `https://github.com/bangash40`.
  Commit: `feat: add site content data`

- [x] **2.2 Base UI components**
  `Container`, `Button` (primary/secondary, renders `<a>` or `<button>`), `Tag`, `SectionHeading`, `Skeleton`, `SkipLink`.
  Commit: `feat: add base ui components`

- [x] **2.3 Theme hook and toggle**
  `useTheme` + `ThemeToggle` per `TRD.md §4`, with accessible labels and a 250 ms color transition.
  Commit: `feat: add light and dark theme toggle`

- [x] **2.4 Navbar**
  Sticky nav with logo text "Bangash", section links, Contact primary button, theme toggle, shrink-on-scroll behavior from `DESIGN.md §6.6`. Sections exist as empty anchored `<section id>` placeholders in `App.tsx`.
  Commit: `feat: add sticky navbar`

- [x] **2.5 Mobile menu**
  Hamburger (< 768 px) opening a full-screen menu; focus trap, `Esc` closes, body scroll locked, `aria-expanded`.
  Commit: `feat: add mobile navigation menu`

- [x] **2.6 Footer**
  Footer per `DESIGN.md §8`, source-code link, back-to-top.
  Commit: `feat: add footer`

- [x] **2.7 Motion foundation**
  Install `gsap @gsap/react lenis`. Add `src/lib/gsap.ts`, `useReducedMotion`, `useMediaQuery`, `useLenis` per `TRD.md §5`. Nav links use `scrollTo`.
  Commit: `feat: add gsap, lenis and reduced motion support`

- [x] **2.8 Scroll spy**
  `useScrollSpy` highlights the active nav link (Signal color + underline).
  Commit: `feat: highlight active section in navbar`

## Phase 3 — Hero and the phone

- [x] **3.1 PhoneFrame**
  Build the device per `DESIGN.md §6.1` with `size` and `state` props. Show it alone in the hero area to review.
  Commit: `feat: add phone frame component`

- [x] **3.2 Placeholder screens**
  `PlaceholderScreen` with the four variants from `DESIGN.md §6.3`.
  Commit: `feat: add placeholder app screens`

- [x] **3.3 ScreenReel**
  Crossfade reel per `DESIGN.md §6.2` with pause on hover/focus/hidden tab, keyboard pause button, reduced-motion behavior, live-updating `aria-label`.
  Commit: `feat: add screen reel for phone`

- [x] **3.4 Hero layout and copy**
  Hero section layout (desktop grid + mobile stack), name as the only `h1`, sentence, both buttons (résumé link points to `content.person.resumeUrl`), availability dot in Saffron.
  Commit: `feat: build hero section`

- [x] **3.5 Boot sequence**
  GSAP timeline per `DESIGN.md §7.1`, once per session, skipped on reduced motion, no layout shift.
  Commit: `feat: add phone boot animation on page load`

- [x] **3.6 Magnetic primary button**
  Max 6 px pull, pointer-fine devices only, off on reduced motion.
  Commit: `feat: add magnetic hover to hero button`

## Phase 4 — About

- [x] **4.1 About section**
  Bio paragraphs, optional avatar (renders only if `content.person.avatar` exists), skill groups in a clean typographic list (no cards).
  Commit: `feat: build about section`

## Phase 5 — Projects

- [x] **5.1 Project blocks (static)**
  `ProjectBlock` showing name, summary, problem, built, role, status, stack tags, links. Mobile/tablet layout with a small phone per project.
  Commit: `feat: add project case study blocks`

- [x] **5.2 Pinned phone on desktop**
  Two-column layout ≥ 1024 px; phone pinned with ScrollTrigger via `gsap.matchMedia`; screen swaps to the project in view; side progress indicator. Reduced motion → stacked layout.
  Commit: `feat: pin phone and swap screens while scrolling projects`

- [x] **5.3 Real screenshot support**
  If `public/screens/<slug>/` images are listed in content as `kind: 'image'`, render them with width/height, lazy loading, and `alt`. Document in README how to add screenshots.
  Commit: `feat: support real app screenshots in projects`

## Phase 6 — Journey

- [x] **6.1 Git-log timeline**
  Timeline per `DESIGN.md §6.7`, newest first, from `content.timeline`.
  Commit: `feat: add journey timeline`

- [x] **6.2 Timeline scroll fill**
  Dots fill with Signal as entries enter view (scrubbed, subtle). Off on reduced motion.
  Commit: `feat: animate timeline progress on scroll`

## Phase 7 — Live GitHub

- [x] **7.1 GitHub client**
  `src/lib/github.ts` per `TRD.md §7` with caching, timeout and safe errors.
  Commit: `feat: add github api client with session cache`

- [x] **7.2 GitHub section UI**
  Stats, language bar, recent repos, skeleton loading, fallback message. Fetch when near viewport.
  Commit: `feat: build live github activity section`

## Phase 8 — Contact

- [x] **8.1 Contact section and links**
  Heading, line, direct links (email, GitHub, LinkedIn, WhatsApp if set), résumé button.
  Commit: `feat: add contact section`

- [x] **8.2 Contact form**
  `ContactForm` + `src/lib/contact.ts` per `TRD.md §8` with validation, honeypot and all states. Add `.env.example`.
  Commit: `feat: add contact form with web3forms`

- [x] **8.3 Form key setup** 🛑
  Walk the owner through Web3Forms and Vercel env setup (`TRD.md §12`). After the owner confirms a test message arrived, update README with a "Contact form setup" section.
  Commit: `docs: add contact form setup guide`

## Phase 9 — Polish, SEO and 404

- [x] **9.1 404 page**
  `NotFound` with small phone showing "screen not found", per `DESIGN.md §8`; wire in `main.tsx`.
  Commit: `feat: add 404 page`

- [x] **9.2 SEO and sharing**
  Canonical URL (live URL), Open Graph/Twitter tags, JSON-LD Person, `robots.txt`, `sitemap.xml`, `og-image.png` (1200×630, per `DESIGN.md §9`; generate from an SVG with a small node script if needed), apple-touch-icon.
  Commit: `feat: add seo metadata, sitemap and og image`

- [x] **9.3 Analytics** 🛑
  Install `@vercel/analytics`, add `<Analytics />` in `App`. Ask the owner to enable Analytics in the Vercel dashboard.
  Commit: `feat: add vercel web analytics`

## Phase 10 — Quality pass

- [x] **10.1 Accessibility pass**
  Run through `DESIGN.md §10`; keyboard-only walkthrough; fix issues.
  Commit: `fix(a11y): improve keyboard and screen reader support`

- [ ] **10.2 Responsive pass**
  Check 320/375/768/1024/1440/1920; fix overflow, spacing, type sizes.
  Commit: `fix: polish responsive layout`

- [ ] **10.3 Performance pass**
  Check bundle size vs budget, image sizes, CLS, font loading; ask the owner to run Lighthouse (mobile) on the live URL and share scores; fix until ≥ 90 ×4.
  Commit: `perf: optimize bundle, images and loading`

- [ ] **10.4 Final README**
  README: live link, screenshot of the site, features, tech stack, local setup (`npm install`, `npm run dev`), how to edit content (`src/data/content.ts`), how to add a project, add screenshots, replace résumé, deployment notes, list of remaining `TODO(bangash)` items.
  Commit: `docs: complete readme`

- [ ] **10.5 Release v1.0.0**
  Bump `package.json` version to `1.0.0`, create tag `v1.0.0` and push tags (`git push --follow-tags`).
  Commit: `chore: release v1.0.0`

---

## After v1 — owner's to-do list

Replace every `TODO(bangash)` in `src/data/content.ts`: bio, email, LinkedIn, WhatsApp, timeline dates, availability, résumé PDF, avatar, app screenshots. Each replacement is its own small commit, e.g. `chore(content): add real bio`.
