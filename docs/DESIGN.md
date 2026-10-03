# DESIGN — Bangash Portfolio Website

This document is binding. Build exactly what it describes. When something is not covered, choose the quieter option.

---

## 1. Concept: "The Workbench"

Farhan builds mobile apps. So the site is arranged around **the device**. A single, carefully made phone is the hero object of the whole site: it powers on when you arrive, shows his real work, follows you through the projects, and even shows the 404 state.

Everything around the phone stays calm, light and precise — like a clean workbench with one device on it.

**Spend boldness in one place: the phone.** Everything else is quiet, typographic and disciplined.

### Design principles

1. **The phone is the storyteller.** Work is shown on a screen, not in a grid of cards.
2. **Type does the talking.** Big, confident headings; generous space; no decorative fluff.
3. **One orchestrated moment.** The phone boot on page load is the only non-user-triggered animation of note. Everything else moves only in response to the visitor (scroll, hover, click).
4. **Honest content.** Real projects, real stack, clear placeholders where content is missing.
5. **Fast and accessible first.** If an effect hurts speed or accessibility, it goes.

---

## 2. Color tokens

Cool, clear, technical — a workbench under daylight. One strong interactive color (Signal) and one rare highlight (Saffron) used only for "live" and "on" states.

### Light theme (default when system is light)

| Token | Hex | Use |
|---|---|---|
| `--color-fog` | `#EDEFF2` | Page background |
| `--color-paper` | `#FFFFFF` | Raised surfaces (form, timeline panel) |
| `--color-graphite` | `#1D2330` | Primary text, phone body |
| `--color-slate` | `#5B6475` | Secondary text, meta |
| `--color-line` | `#D5D9E0` | Borders, dividers |
| `--color-signal` | `#2B59FF` | Links, primary buttons, focus ring, active nav |
| `--color-saffron` | `#F0A202` | Only: availability dot, phone power LED, "live" badge |

### Dark theme

| Token | Hex |
|---|---|
| `--color-fog` | `#141821` |
| `--color-paper` | `#1B2130` |
| `--color-graphite` | `#E7EAF0` |
| `--color-slate` | `#9AA3B5` |
| `--color-line` | `#2C3445` |
| `--color-signal` | `#7390FF` |
| `--color-saffron` | `#F5B731` |

The phone body stays dark graphite (`#1D2330`) in both themes, with a subtle lighter rim in dark mode (`#3A4356`) so it doesn't disappear.

Rules:
- Signal on Fog and white text on Signal must pass WCAG AA (they do at these values — verify after building).
- **No gradients as decoration.** The only gradient allowed is the soft light reflection on the phone glass.
- Shadows: only the phone casts a real shadow (a soft, long, cool shadow). Other surfaces use a 1 px `--color-line` border instead of shadows.

---

## 3. Typography

| Role | Typeface | Weights | Source |
|---|---|---|---|
| Display (name, section headings) | **Bricolage Grotesque** | 600, 800 | Google Fonts (variable, use `opsz` axis) |
| Body, UI | **Instrument Sans** | 400, 500, 600 | Google Fonts |

Load with `display=swap`, preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`. Fallback stacks:
- Display: `"Bricolage Grotesque", "Segoe UI", system-ui, sans-serif`
- Body: `"Instrument Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`

### Type scale (ratio 1.25, base 17 px)

| Token | Size | Line height | Use |
|---|---|---|---|
| `text-hero` | `clamp(3rem, 8.5vw, 7rem)` | 0.95 | Name in hero |
| `text-h2` | `clamp(2.25rem, 5vw, 3.8rem)` | 1.0 | Section headings |
| `text-h3` | `1.95rem` | 1.15 | Project names |
| `text-lead` | `1.25rem` | 1.5 | Hero sentence, section intros |
| `text-body` | `1.0625rem` (17 px) | 1.6 | Paragraphs |
| `text-small` | `0.875rem` | 1.5 | Meta, tags, dates |

Rules:
- Display headings: weight 800, letter-spacing `-0.03em` at hero size, `-0.02em` at h2.
- Body line length: max `68ch`.
- **Sentence case everywhere.** No ALL-CAPS labels, no tracked-out eyebrow text above headings.
- **Do not** color or italicize a single word inside a headline for emphasis.
- Section headings are plain statements, e.g. "Things I've built", not "MY WORK — PROJECTS".
- Buttons and links never get a trailing "→".

---

## 4. Spacing, grid, shape

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Section vertical padding: 128 px desktop, 80 px mobile.
- Container: max-width 1200 px, side padding 24 px (mobile) / 48 px (desktop).
- 12-column grid on desktop, gap 24 px.
- **Text is left-aligned** everywhere, including the hero. Nothing is center-aligned except the 404 message.
- Radius hierarchy (not one radius for everything):
  - Phone body: 52 px; phone screen: 42 px
  - Buttons: 999 px (pill)
  - Form fields, tags: 10 px
  - Panels (timeline, form container): 20 px

---

## 5. Layout (wireframes)

### 5.1 Desktop

```
┌──────────────────────────────────────────────────────────────┐
│ Bangash          About  Projects  Journey  GitHub  [Contact] ◐│  ← sticky nav
├──────────────────────────────────────────────────────────────┤
│                                              ┌─────────┐      │
│  Farhan                                      │ ▂▂▂▂▂▂▂ │      │
│  Ali Haider                                  │         │      │
│                                              │  app    │      │  HERO
│  I build mobile apps with Flutter and        │ screens │      │  name: cols 1–7
│  Firebase — and ship them one commit         │  loop   │      │  phone: cols 8–12
│  at a time.                                  │         │      │
│                                              │    ▬    │      │
│  (See my projects)  (Download résumé)        └─────────┘      │
│  ● Available for internships and freelance work               │
├──────────────────────────────────────────────────────────────┤
│  A little about me                                            │  ABOUT
│  ┌─────────────────────────┐   Mobile        Backend & cloud │  bio: cols 1–6
│  │ bio paragraphs          │   Flutter       Firebase Auth   │  skills: cols 8–12
│  │                         │   Dart          Cloud Firestore │
│  └─────────────────────────┘   Android       Tools …          │
├──────────────────────────────────────────────────────────────┤
│  Things I've built                                            │  PROJECTS
│                                         ┌─────────┐          │  text scrolls (cols 1–6)
│  Intern Management System               │ pinned  │          │  phone pinned (cols 8–12)
│  problem / what I built / stack tags    │ phone   │          │  screen swaps per project
│  [GitHub] [Live demo]                   │ changes │          │
│                                         │ screens │          │
│  Kheench                                └─────────┘          │
│  …                                                            │
├──────────────────────────────────────────────────────────────┤
│  How I got here                                               │  JOURNEY
│  ● a3f9c21  2026-09  Started internship at Internee.pk        │  git-log timeline
│  │                                                            │
│  ● 7be1d04  2026-08  Began building Kheench                   │
│  │                                                            │
│  ● …                                                          │
├──────────────────────────────────────────────────────────────┤
│  What I'm pushing to GitHub                                   │  GITHUB
│  23 repos · 4 languages bar ▇▇▇▅▂                             │
│  ┌ repo ┐ ┌ repo ┐ ┌ repo ┐                                   │
│  └──────┘ └──────┘ └──────┘                                   │
├──────────────────────────────────────────────────────────────┤
│  Let's build something                                        │  CONTACT
│  short line              ┌ form: name / email / message ┐    │
│  email · GitHub · LinkedIn│                  (Send message)│    │
│  (Download résumé)        └──────────────────────────────┘    │
├──────────────────────────────────────────────────────────────┤
│ © 2026 Farhan Ali Haider   Source code   Back to top          │  FOOTER
└──────────────────────────────────────────────────────────────┘
```

Note on the GitHub stats line: render the stats as separate labelled items (e.g. "23 public repos", "41 followers"), not a string joined with middle dots. The wireframe above is shorthand.

### 5.2 Mobile (< 768 px)

```
┌────────────────────┐
│ Bangash      ◐  ☰  │
├────────────────────┤
│ Farhan             │
│ Ali Haider         │
│ sentence           │
│ (See my projects)  │
│ (Download résumé)  │
│   ┌──────────┐     │  phone below text, ~70% width
│   │  phone   │     │
│   └──────────┘     │
├────────────────────┤
│ About …            │
├────────────────────┤
│ Project 1          │  no pinning; each project
│ ┌──────┐ text      │  has its own small phone
│ └──────┘           │
│ Project 2 …        │
└────────────────────┘
```

---

## 6. Components

### 6.1 PhoneFrame (the signature component)
- Pure CSS/SVG device: graphite body, 52 px radius, thin lighter rim, dynamic-island pill at the top, three subtle side buttons, a tiny saffron power LED near the top that glows when "on".
- Screen area 9:19.5 aspect ratio with 42 px radius; children render inside.
- Soft glass reflection: one diagonal linear gradient at 6% white opacity.
- Shadow: `0 40px 80px -20px rgb(29 35 48 / 0.35)`.
- Props: `size` (`lg` hero/pinned, `sm` mobile projects/404), `state` (`off` | `booting` | `on`), `children`.
- Accessible: wrapper has `role="img"` and an `aria-label` describing what the screen currently shows.

### 6.2 ScreenReel
- Shows a list of screens (real screenshots or placeholder screens) inside PhoneFrame.
- Crossfade + 12 px upward slide between screens, 600 ms, every 3.5 s in the hero.
- Pauses on hover/focus and when the tab is hidden. No auto-cycling when reduced motion is on (shows the first screen only).

### 6.3 PlaceholderScreen
- Used until real screenshots exist. Built in CSS: status bar (time "9:41", battery), app title bar with the project name, and 3–5 neutral blocks suggesting that app's UI (list rows for IMS, a link field + quality chips for Kheench, a floating mini player for the extension, this site's hero for the portfolio). Each project gets its own accent tint at low opacity so screens are distinguishable.

### 6.4 Buttons
- Primary: Signal background, white text, pill, 48 px tall, 24 px horizontal padding.
- Secondary: transparent, 1.5 px Graphite border, Graphite text.
- Hover: primary darkens 8%; secondary fills Graphite with Fog text. 150 ms.
- Primary hero button has a subtle magnetic pull toward the cursor (max 6 px) on pointer devices only.
- Labels say what happens: "See my projects", "Download résumé", "Send message", "Back to top".

### 6.5 Tag (tech stack)
- `text-small`, 10 px radius, 1 px `--color-line` border, Slate text. No fill colors per technology.

### 6.6 Nav
- Height 72 px → 60 px after 40 px scroll, background becomes Fog at 85% with `backdrop-filter: blur(12px)` and a bottom `--color-line` border.
- Active section link gets Signal color and a 2 px underline (scroll-spy).
- Theme toggle: icon button (sun/moon), `aria-label="Switch to dark theme"` / "Switch to light theme".

### 6.7 Timeline (Journey)
- Vertical line in `--color-line`; each entry has a dot (Signal for the newest, Slate for others), a 7-character mono-free short id in Slate (use Instrument Sans tabular numerals, not a monospace font), date, and message in Graphite.
- Entries are a real sequence, so vertical order (newest first) carries the meaning; no extra numbering.

### 6.8 GitHub panel
- Stats as labelled figures (number in Bricolage 600, label beneath in Slate).
- Language bar: one horizontal stacked bar, segments in shades of Signal (100%, 70%, 45%, 25%), legend below.
- Repo items: name (Graphite, 600), description (Slate, 2 lines max), language + stars + "Updated 3 days ago".
- Loading: skeleton blocks in `--color-line`, no spinners.

### 6.9 Contact form
- Labels above fields (never placeholder-only). Fields 48 px tall, 10 px radius, Paper background, `--color-line` border, Signal border + focus ring on focus.
- Error text in a red that passes AA on Paper (`#C62828` light / `#FF8A80` dark), placed under the field.
- States: idle → "Sending…" (button disabled) → "Message sent. I'll reply within two days." or "Couldn't send your message. Check your connection and try again, or email me directly at …".

---

## 7. Motion

Library: GSAP (+ ScrollTrigger) for timelines and scroll; Lenis for smooth scrolling. Easing default: `power3.out`. Durations: 150 ms (hover), 300–600 ms (UI), up to 1.6 s total (boot sequence).

### 7.1 The one orchestrated moment — Phone boot (page load)
1. 0 ms: phone visible, screen black, LED off.
2. 200 ms: LED fades to saffron (200 ms).
3. 450 ms: a small "B" monogram fades in at screen center, scales 0.9 → 1 (400 ms).
4. 1000 ms: monogram fades out; first app screen fades in (400 ms); ScreenReel begins.
5. In parallel from 100 ms: name lines reveal with a clip-path wipe from bottom (each line 600 ms, 120 ms stagger), and the sentence, buttons and availability line fade in at the same time (300 ms). (Changed in step 10.3: they previously waited for the wipe to finish, which delayed LCP by ~0.8 s.)

Total ≤ 1.6 s. Content is readable even before animation completes (no blank page, no layout shift). Plays once per session.

### 7.2 Projects pinned scroll (desktop ≥ 1024 px only)
- ScrollTrigger pins the phone column while project blocks scroll.
- When a project block crosses the middle of the viewport, the phone crossfades to that project's screens and its `aria-label` updates.
- A thin progress indicator on the phone's side shows which project is active.
- Below 1024 px: no pinning; static stacked layout.

### 7.3 Allowed small interactions
- Nav shrink on scroll.
- Button hover; magnetic hero CTA.
- Theme switch: colors transition 250 ms.
- Timeline dots fill with Signal as each entry scrolls into view (scrubbed, subtle).

### 7.4 Not allowed
- Fade-and-slide-up on every section or card.
- Custom cursors, particles, parallax backgrounds, auto-playing marquees.
- Animations that delay reading content.

### 7.5 Reduced motion
When `prefers-reduced-motion: reduce`:
- Lenis disabled (native scroll).
- Boot sequence skipped; phone shows first screen immediately.
- ScreenReel does not auto-cycle.
- Pinning disabled; stacked layout.
- Transitions shortened to ≤ 100 ms opacity only.

---

## 8. Copy (use as written; owner may edit later)

- Hero name: "Farhan Ali Haider" (split over two lines: "Farhan" / "Ali Haider")
- Hero sentence: "I build mobile apps with Flutter and Firebase — and ship them one commit at a time."
- Availability: "Available for internships and freelance work" `TODO(bangash)`
- About heading: "A little about me"
- Projects heading: "Things I've built"
- Journey heading: "How I got here"
- GitHub heading: "What I'm pushing to GitHub"
- GitHub fallback: "GitHub isn't responding right now. See all my work on github.com/bangash40."
- Contact heading: "Let's build something"
- Contact line: "Have an app idea, an internship opening, or a question? Send a message and I'll get back to you."
- 404 heading: "This screen doesn't exist"; button: "Go to the home page"
- Footer: "© {year} Farhan Ali Haider. Built with React and deployed on Vercel."

---

## 9. Imagery and icons

- Icons: `lucide-react`, 20 px, 1.75 stroke, inherit text color.
- App screenshots: WebP, 1080 × 2340 source, displayed with `loading="lazy"` except the first hero screen.
- Avatar (optional): WebP, circular crop is **not** required — use a 20 px radius rectangle, grayscale-to-color on hover is not allowed (keep it simple).
- Favicon: "B" monogram in Bricolage 800, white on Signal, rounded square.
- OG image (1200 × 630): Fog background, name in Bricolage 800 at left, phone silhouette at right, URL beneath the name.

---

## 10. Accessibility checklist

- Skip-to-content link as the first focusable element.
- Visible focus: 2 px Signal outline with 3 px offset on every interactive element.
- All images have meaningful `alt`; decorative ones `alt=""`.
- Headings in order (one `h1` = the name).
- Color is never the only signal (form errors have text, active nav has underline).
- Hit targets ≥ 44 × 44 px.
- Phone `aria-label` describes the current screen; ScreenReel has a pause control reachable by keyboard.
