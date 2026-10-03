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

## Contact form setup

The contact form sends messages to your inbox through [Web3Forms](https://web3forms.com) (free tier, no backend needed).

1. Go to web3forms.com, enter the email address that should receive messages, and copy the access key they email you. The key is designed to be public.
2. **Local development:** create a `.env` file in the project root (it is git-ignored) with:

   ```bash
   VITE_WEB3FORMS_KEY=your-access-key
   ```

   Restart `npm run dev` after changing it.

3. **Vercel:** Project → Settings → Environment Variables → add `VITE_WEB3FORMS_KEY` with the same value for all environments, then redeploy (Deployments → ⋯ → Redeploy). Vite bakes the key in at build time, so a redeploy is required.
4. Send yourself a test message from the live site and check your inbox (and spam) for "New message from portfolio".

Without a key the form is replaced by a short note pointing visitors to your email (or GitHub, if no email is set in `src/data/content.ts`). To rotate the key, generate a new one on Web3Forms and repeat steps 2–3.

## Commit rules

- One build-plan step = one commit = one push (see `docs/BUILD_PLAN.md`).
- Conventional Commits in lowercase, imperative mood, no trailing period: `type(scope): short description`.
- The repository owner is the only author. No `Co-Authored-By`, AI attribution or session trailers.
- The `commit-msg` hook in `.githooks/` strips attribution trailers. Enable it once per clone with `git config core.hooksPath .githooks`, and never commit with `--no-verify`.
- Run `npm run build` (and `npm run lint`) before every commit. Never commit a broken build.
