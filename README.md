# Farhan Ali Haider — Portfolio

The personal portfolio of Farhan Ali Haider ("Bangash"), a mobile app developer working with Flutter and Firebase.

Live site: coming soon

## Tech stack

- Vite
- React 19 + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger, Lenis
- lucide-react icons
- Web3Forms (contact form)
- GitHub REST API (live activity)
- Vercel (hosting and analytics)

## Commit rules

- One build-plan step = one commit = one push (see `docs/BUILD_PLAN.md`).
- Conventional Commits in lowercase, imperative mood, no trailing period: `type(scope): short description`.
- The repository owner is the only author. No `Co-Authored-By`, AI attribution or session trailers.
- The `commit-msg` hook in `.githooks/` strips attribution trailers. Enable it once per clone with `git config core.hooksPath .githooks`, and never commit with `--no-verify`.
- Run `npm run build` (and `npm run lint`) before every commit. Never commit a broken build.
