# Farhan Ali Haider — Portfolio

The personal portfolio of Farhan Ali Haider ("Bangash"), a mobile app developer working with Flutter and Firebase.

Live site: https://farhan-bangash.vercel.app

## Tech stack

- Vite
- React 19 + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger, Lenis
- lucide-react icons
- Web3Forms (contact form)
- GitHub REST API (live activity)
- Vercel (hosting and analytics)

## Adding app screenshots

Until real screenshots exist, each project shows a designed placeholder screen. To show a real one:

1. Take a screenshot of the app and export it as **WebP at 1080 × 2340** (a free converter such as [Squoosh](https://squoosh.app) works).
2. Save it as `public/screens/<project-slug>/1.webp`, then `2.webp` and so on (up to 4 per project). The slug is the project's `slug` in `src/data/content.ts`, for example `kheench`.
3. In `src/data/content.ts`, replace that project's placeholder in `screens` with image entries:

   ```ts
   screens: [
     { kind: 'image', src: '/screens/kheench/1.webp', alt: 'Kheench home screen with a pasted video link' },
     { kind: 'image', src: '/screens/kheench/2.webp', alt: 'Kheench quality picker showing 1080p and 720p' },
   ],
   ```

   Write `alt` text that says what the screen shows. The phone's screen-reader label uses it.

The first hero screen loads with high priority; every other screenshot is lazy-loaded.

## Commit rules

- One build-plan step = one commit = one push (see `docs/BUILD_PLAN.md`).
- Conventional Commits in lowercase, imperative mood, no trailing period: `type(scope): short description`.
- The repository owner is the only author. No `Co-Authored-By`, AI attribution or session trailers.
- The `commit-msg` hook in `.githooks/` strips attribution trailers. Enable it once per clone with `git config core.hooksPath .githooks`, and never commit with `--no-verify`.
- Run `npm run build` (and `npm run lint`) before every commit. Never commit a broken build.
