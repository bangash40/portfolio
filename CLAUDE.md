# CLAUDE.md — Project rules for Claude Code

This repository is the personal portfolio website of **Farhan Ali Haider ("Bangash")**, GitHub: `bangash40`.

Before writing any code, read these files in order:

1. `docs/PRD.md` — what we are building and why
2. `docs/DESIGN.md` — how it must look, feel and move
3. `docs/TRD.md` — the tech stack, architecture and rules
4. `docs/BUILD_PLAN.md` — the exact step-by-step order of work

`docs/BUILD_PLAN.md` is the source of truth for sequencing. Never skip ahead, never merge several steps into one.

## Git rules (strict)

1. **One step or sub-step = one commit = one push.** After every sub-step in `BUILD_PLAN.md` is finished and verified, commit it and push it immediately. Do not batch work.
2. **No co-authors, no AI attribution.** The repository owner is the only author.
   - Never add `Co-Authored-By:` lines.
   - Never add `Generated with Claude Code` or any similar footer.
   - Never add `Claude-Session:` or any other trailer.
   - `.claude/settings.json` disables attribution and `.githooks/commit-msg` strips it as a safety net. Do not remove or bypass either one, and never use `--no-verify`.
3. Use the commit message given in `BUILD_PLAN.md` for each step. Format is Conventional Commits: `type(scope): short description` in lowercase, imperative mood, no trailing period.
4. Before every commit run `npm run build` (and `npm run lint` once linting exists). Never commit a broken build. If it fails, fix it first.
5. Commit with the owner's existing git identity. Never change `user.name` or `user.email`.
6. Work on `main`. No force pushes.
7. After pushing, tick the step's checkbox in `docs/BUILD_PLAN.md` inside the same commit (tick it just before committing), and update `README.md` when the step says so.

## Working rules

- Follow `docs/DESIGN.md` exactly for colors, fonts, spacing and motion. Do not invent a different visual style.
- All personal content lives in `src/data/content.ts`. Components never hard-code personal text.
- Where real content is missing (bio, email, résumé, screenshots), use the clearly marked placeholders from the PRD and leave a `// TODO(bangash):` comment. Never invent facts about the owner — no fake employers, degrees, numbers or testimonials.
- Only free tools and free tiers. Never add a paid service or a dependency that needs a paid key.
- Respect `prefers-reduced-motion` in every animation.
- If a step needs the owner to act (create a GitHub repo, connect Vercel, add a key), stop, explain exactly what to click, and wait for confirmation before continuing.
- At the end of each phase, give the owner a short summary: what was built, the commits pushed, and what is next.
