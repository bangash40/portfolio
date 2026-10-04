# DESIGN — Bangash Portfolio Website (v2: "Widget Tree")

This document is binding. Build exactly what it describes. When something is not covered, choose the quieter option.

v2 replaces the v1 "Workbench" design (Phase 11 of `BUILD_PLAN.md`). The approved concept lives in the design canvas "Portfolio Widget Tree Concept".

---

## 1. Concept: "Widget Tree"

Farhan is a **Flutter developer first**. In Flutter everything is a widget, composed into a tree. The site reads like a well-built Flutter project: section labels are Dart file tabs (`lib/projects.dart`), the hero shows the app *and* the engineering around it, experience is a commit history.

It must communicate, in this order, within seconds:

1. I am a developer.
2. Flutter / mobile development is my primary specialty.
3. I build real applications and products.
4. I also understand web, backend and automation.
5. I care about design and user experience.

Weighting across the page: **70–80 % mobile/Flutter**, 10–15 % web, the rest backend, APIs, automation and tools.

### Design principles

1. **The app is the hero.** Phones and app UI carry the story; code, API and git elements support it, never compete.
2. **One system, everywhere.** Every section uses the same tokens, cards, chips and labels. No section gets its own style.
3. **Engineered details, used sparingly.** Terminal cursors, file tabs, status dots and connection lines are Easter eggs, not decoration on every element.
4. **Honest content.** Real projects and real numbers; clearly marked placeholders where facts are missing. No invented metrics or activity.
5. **Fast and accessible first.** If an effect hurts speed or accessibility, it goes.

Do not copy Flutter's branding (logo, official colours, the "Flutter" wordmark styling).

---

## 2. Color tokens

Dark is the primary experience and the default. Light is a genuine light theme, not an inversion. Every value is a CSS variable; components never use raw hex.

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--color-bg` | `#0E1013` | `#F5F6F8` | Page background |
| `--color-bg-2` | `#121418` | `#EEF0F3` | Alternate sections, app screens |
| `--color-surface` | `#16191E` | `#FFFFFF` | Cards |
| `--color-surface-2` | `#1C2027` | `#F7F8FA` | Panels inside cards, chips |
| `--color-border` | `#262A33` | `#E3E5EA` | Card and divider borders |
| `--color-border-2` | `#363B46` | `#CDD1D9` | Stronger borders, inactive bars |
| `--color-text` | `#EDEEF0` | `#111318` | Primary text |
| `--color-muted` | `#9BA1AD` | `#5B616E` | Secondary text, labels |
| `--color-faint` | `#6B7280` | `#8A909C` | Decoration only (separators, icons) — **never text** |
| `--color-primary` | `#7C8BFF` | `#3F4FE0` | Buttons, links, active and focus states, key metrics |
| `--color-primary-ink` | `#0E1013` | `#FFFFFF` | Text on primary |
| `--color-primary-soft` | `rgba(124,139,255,.13)` | `rgba(63,79,224,.08)` | Tinted chip/badge fills |
| `--color-primary-line` | `rgba(124,139,255,.45)` | `rgba(63,79,224,.35)` | Tinted borders, connection lines |
| `--color-cyan` | `#4FD8F0` | `#0E7490` | Technical accents: HTTP verbs, secondary skills, code types |
| `--color-ok` | `#4ADE80` | `#15803D` | "Available" and "200" status dots only |
| `--color-error` | `#FF8A80` | `#C62828` | Form errors |
| `--color-code-keyword` | `#C4A7FF` | `#6D28D9` | Dart keywords in code cards |
| `--color-device` | `#060709` | `#111318` | Phone body |

Rules:
- Text pairs pass WCAG AA in both themes (muted on bg ≥ 5.9:1; primary on bg ≥ 6:1; primary-ink on primary ≥ 6:1).
- Accent is used strategically: buttons, links, hover/active, code highlights, key metrics, small glowing elements. The page is never neon.
- Gradients: only the soft radial spotlight behind the hero and the fade on the experience line. No gradient headings, no glowing blobs.
- Glow (`--glow`: 1 px primary ring + soft primary under-shadow) only marks *active or selected* things: the selected skill, the inspector panel, the contact card, primary-button hover.

---

## 3. Typography

| Role | Typeface | Weights | Source |
|---|---|---|---|
| Interface and headings | **Geist** | 400, 500, 600, 700 | Google Fonts |
| Code and technical metadata | **JetBrains Mono** | 400, 500 | Google Fonts |

Fallbacks are metric-matched local fonts (`size-adjust` + ascent/descent overrides measured from the font files) so nothing shifts when the web fonts swap in. Fonts load without blocking render.

### Scale (base 16 px, ratio ~1.25)

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `text-display` | `clamp(2.4rem, 5.2vw, 3.65rem)` | 1.04 | −0.04em | Hero headline (the page's `h1`) |
| `text-h2` | `clamp(2rem, 4vw, 2.75rem)` | 1.08 | −0.03em | Section headings |
| `text-h3` | `1.875rem` | 1.15 | −0.03em | Featured project names |
| `text-lead` | `1.125rem` | 1.6 | 0 | Section intros, hero sentence |
| `text-body` | `1rem` | 1.6 | 0 | Paragraphs |
| `text-small` | `0.875rem` | 1.5 | 0 | Meta |
| `text-mono` | `0.78rem` | 1.6 | 0 | Labels, chips, code |

Rules:
- Headings Geist 600, never 800+. Strong hierarchy through size and colour, not weight.
- Monospace only for: code, file-tab labels, technology chips, hashes, dates, HTTP lines, status lines.
- The hero badge is the only uppercase text (`FLUTTER DEVELOPER • MOBILE ENGINEER`, tracked +0.08em). Everything else is sentence case.
- Highlight at most the last phrase of the hero headline in `--color-primary`. No gradient text.
- Body line length max 60–68ch.

---

## 4. Spacing, grid, shape, elevation

- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Section padding: 128 px desktop, 80 px mobile. Container max-width 1200 px, side padding 24 px.
- 12-column grid on desktop, 24 px gap.
- Radius: chips 7 px · fields 10 px · buttons 12 px · panels 14 px · cards 18 px · phone body 46 px (screen 38 px).
- Elevation: cards use a 1 px `--color-border` and no shadow at rest. The phone casts the long soft shadow, **pre-rendered as an image** (live blurs this large are too slow to paint without a GPU). Floating hero cards may use a small shadow (≤ 24 px blur).
- Text is left-aligned everywhere except the 404 page.

---

## 5. Background system

A quiet digital workspace, never a gaming site:
- **Grid**: 64 px lines in a ~5 % text colour, radially masked so it fades out.
- **Spotlight**: one soft radial of `--color-primary` at ~12 % behind the hero visual.
- **Circuit traces**: a few 1 px right-angled lines ending in small pulsing nodes (hero only).
- **Particles**: four or five 3 px dots drifting slowly upward (hero only).

All background layers are `aria-hidden`, pointer-transparent and hidden or reduced below 980 px.

---

## 6. Page structure and components

Order: Navbar → Hero → credibility strip → About → Skills → Projects → Experience → GitHub → Contact → Footer.

### 6.1 Navbar
- Sticky, 68 px. Logo: 32 px primary square with a small widget-tree glyph + "Farhan Ali Haider" + `@bangash40` (mono, hidden on small screens).
- Links: Home, About, Skills, Projects, Experience, Contact. Active link: text colour + 2 px primary underline (scroll-spy).
- Right side: GitHub and LinkedIn icon buttons (LinkedIn only once set), "Résumé" secondary button, theme toggle.
- At the top the bar is transparent; after scrolling it gains a translucent background, blur and bottom border.
- Below 980 px: logo, theme toggle and a menu button opening a full-screen menu — numbered links (`01 Home` …), résumé button, availability and socials at the bottom.

### 6.2 Theme toggle
A 62×34 pill with a sliding knob (overshoot easing) holding a sun or moon that rotate and cross-fade. `aria-label` "Switch to light theme" / "Switch to dark theme". Default dark; the choice is remembered.

### 6.3 Hero
Left (≈ 6/12):
- Badge (mono, primary-tinted, phone icon): `FLUTTER DEVELOPER • MOBILE ENGINEER`.
- `h1`: "Mobile apps, engineered to **feel effortless.**"
- Sentence: "I'm Farhan Ali Haider, a Flutter developer building cross-platform apps with Dart, Firebase and clean APIs — and the occasional website."
- Buttons: "View projects" (primary, arrow) and "Contact me" (secondary).
- Meta row above a divider: availability status dot, location (once set), social icon buttons.
- Below 980 px: three "jump" chips styled as file tabs (`about.dart`, `skills.dart`, `projects.dart`).

Right (≈ 6/12), the hero visual:
- A floating phone running a polished task app (intern task dashboard).
- Around it: a Dart code card (`task_tile.dart`, lines appear one by one, blinking cursor), an API card (`GET /tasks` · `200` · "firestore · realtime stream"), a git card (branch merged into main), a widget breadcrumb (`Scaffold › Column › TaskList`).
- Dashed connection lines from cards to the phone, flowing slowly.
- Below 980 px the cards are hidden; the phone stays, smaller.

Below the hero: a credibility strip — "builds with" Flutter, Dart, Firebase (primary squares), REST APIs, Git (cyan), Web · automation (muted).

### 6.4 Section label
Every section starts with a file-tab label: mono, 1 px border, surface fill — `lib/<name>.dart` with the name in primary. Then the `h2` and a one-line lead.

### 6.5 About — `lib/about.dart`
Heading "A developer who ships the whole app." Two cards:
- **Profile card**: initials (or photo), name, role; short intro; a 2×2 grid of facts — experience, based in, projects, open to.
- **Terminal card**: window chrome + `zsh — farhan@dev`; commands `whoami`, `current_focus --list` (chips), `cat enjoy_building.txt`, `mindset` (build → test → improve → **ship** + blinking cursor).

### 6.6 Skills — `lib/skills.dart`
Heading "Flutter at the center. The rest in orbit."
- Desktop: an orbit. Flutter is the large primary node at the centre; Dart, Firebase, REST APIs, Git, GitHub sit on the inner ring joined by spokes; Python, PostgreSQL, Docker, n8n, WordPress, JavaScript, HTML/CSS sit on a dashed outer ring with dashed borders and cyan dots.
- Hover, focus or click a node → the **inspector panel** (glowing card, `aria-live`) shows tier, name, what I use it for, level, used in, weight.
- Below 1100 px (where the column is too narrow for the full orbit): nodes become a wrapping grid of buttons (primary first), the inspector below.
- Nothing spins.

### 6.7 Projects — `lib/projects.dart`
Heading "Products, not exercises."
- **Featured** (mobile projects): large two-column cards — a stage with phone frames (real screenshots when available, otherwise designed screens) and a content column: platform chip, status, name, summary, "problem solved" and "key feature" panels, an architecture flow (`Flutter UI → Firebase Auth → Cloud Firestore`), GitHub / demo links and a "Details" toggle revealing role and what was built. Stages alternate sides.
- **Supporting** (web projects): smaller cards with a browser-frame thumbnail.
- Hover: card border strengthens; phones tilt in 3D (≤ 8°) and lift; screenshots scale ≤ 1.03.

### 6.8 Experience — `lib/experience.dart`
Heading "The commit history so far." A vertical git log, newest first: a commit node (primary for HEAD, cyan for work, neutral for education) on a line that fades down; each card shows hash, branch, duration, role · organisation, description, tech chips. Hover nudges the card 4 px right.

### 6.9 GitHub — `lib/activity.dart`
Heading "Shipping in public." Profile card (public repos, followers, language bar) and recent repositories, live from the GitHub API with skeletons and a fallback. No contribution graph until real data can be shown.

### 6.10 Contact — `lib/contact.dart`
A glowing card: "Have an idea for an app?" / **"Let's build it."**, a line, and contact rows (`email`, `github`, `linkedin`, `whatsapp` — only the ones set). The form sits in a panel headed `POST /message` with a "ready" status dot; mono labels; states as before (sending, success, error).

### 6.11 Footer
"Farhan Ali Haider — Flutter developer / mobile app developer", the line "Designed with curiosity, built with code — and a lot of hot reloads.", copyright, GitHub, LinkedIn, back to top.

### 6.12 Buttons, chips, cards
- Primary button: primary fill, primary-ink text, 48 px, radius 12; hover lifts 2 px and adds glow; the arrow nudges 3 px.
- Secondary button: surface fill, `--color-border-2` border; hover lifts and tints the border.
- Chip: 28 px, radius 7, mono 12 px, surface-2 fill, muted text. "Hot" chip (primary skills): primary text, primary-line border, primary-soft fill.
- Icon button: 44 × 44, muted; hover shows a border and surface fill.
- Card: surface, 1 px border, radius 18. Panel (inside cards): surface-2, radius 14.

### 6.13 404
Centred: phone showing "404 / Screen not found", label `lib/404.dart`, heading "This screen doesn't exist", button "Go to the home page".

---

## 7. Motion

Durations: hover 150–250 ms · theme 450 ms · UI 300–600 ms · hero reveal 800 ms with 120 ms stagger · ambient loops 7–16 s. Easing `cubic-bezier(.2,.7,.2,1)`.

- **Page load (once per session)**: badge, headline, sentence, buttons and meta rise 16 px and fade in, staggered; the hero visual follows; code lines appear one by one. Reveals start within 100 ms so the main text is visible early (LCP).
- **Ambient (hero only)**: phone and cards float ±8–12 px at different speeds; connection lines flow; nodes pulse; particles drift.
- **Scroll**: sections rise once as they enter (CSS scroll-driven animation; no JavaScript; absent where unsupported).
- **Hover**: soft glow, border tint, 2–4 px elevation, icon nudge, device tilt.
- **Navigation**: smooth scrolling; active-section underline.
- **Theme**: every token cross-fades in 450 ms.
- **Avoid**: spinning objects, bouncing, animating every element, anything that delays reading.
- **Performance**: animate only `transform`, `opacity` and SVG dash offsets. No large live blurs or backdrop filters at first paint.
- **Reduced motion**: all loops and reveals off; everything visible immediately; theme switch instant.

---

## 8. Copy (owner may edit)

- Badge: "FLUTTER DEVELOPER • MOBILE ENGINEER"
- Hero headline: "Mobile apps, engineered to feel effortless."
- Hero sentence: see §6.3.
- Availability: "Available for opportunities"
- About: "A developer who ships the whole app." / "Interface, state, backend and release — I care about every layer a user touches."
- Skills: "Flutter at the center. The rest in orbit." / "Hover or select a technology to see what I use it for."
- Projects: "Products, not exercises." / "Mobile first. Each one built end to end — interface, data and release."
- Experience: "The commit history so far." / "Newest first, like git log."
- GitHub: "Shipping in public." / "Pulled from the GitHub API on every visit."; fallback: "GitHub isn't responding right now. See all my work on github.com/bangash40."
- Contact: "Have an idea for an app?" / "Let's build it." / "Internships, freelance projects or a quick question — I usually reply within two days."
- Form success: "Message sent. I'll reply within two days."
- 404: "This screen doesn't exist" / "Go to the home page"

---

## 9. Imagery and icons

- Icons: inline stroke SVG (lucide style), 17–20 px, 1.8 stroke, `currentColor`.
- App screenshots: WebP 1080 × 2340, lazy except in the hero. Until they exist, designed screens built in CSS.
- Logo / favicon: primary rounded square with a white widget-tree glyph.
- OG image (1200 × 630): dark background with the grid, badge, headline, name and URL on the left, phone on the right.

---

## 10. Accessibility checklist

- Skip link first; one `h1` (the hero headline); headings in order.
- Visible focus: 2 px primary outline, 3 px offset, everywhere.
- Hit targets ≥ 44 × 44 px; real buttons and links only.
- Colour is never the only signal (active nav has an underline, errors have text, status dots have labels).
- Phone mockups are `role="img"` with an `aria-label` describing the screen; decorative cards and lines are `aria-hidden`.
- The skills inspector is `aria-live="polite"`; skill nodes expose `aria-pressed`.
- `prefers-reduced-motion` honoured everywhere.
