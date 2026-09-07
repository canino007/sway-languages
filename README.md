# Sway Languages — website

A static, dependency-free website (HTML/CSS/vanilla JS). No build step —
open `index.html` in a browser, or upload the whole folder to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, or plain shared hosting).

**Brand name:** always "Sway Languages" / "SWAY LANGUAGES" — never translated,
anywhere (title, nav, footer, SEO/OG metadata).

## v3 — platform pivot

The site changed from a 1-to-1 Spanish-tutoring service to **a free,
structured English-learning resource library** (levels, skills, exam boards),
per the latest brief. Concretely:

- Removed: Method, Problem, old About/Lessons/Pricing/Referral, the Cal.com
  booking modal and trigger buttons, and the old lesson-specific FAQ — none
  of it matched the new "resource platform" positioning.
- Added: **Levels** (A1–C2, color-coded), **Exams** (Cambridge, Trinity,
  Aptis, EBAU/PAU, IELTS, TOEFL — all honestly marked "In development"),
  **Library** (9 skill categories: Grammar, Vocabulary, Reading, Listening,
  Writing, Speaking, Pronunciation, Use of English, Exam Preparation),
  **Featured Resources** with a working **search/filter panel**
  (Level → Skill → Exam → Resource type), **Stats** (6 levels / 9 areas / 6
  exam systems — structural counts only, no invented usage numbers), and a
  reframed **About** section (Álvaro as founder/linguist building the
  library, not a personal tutor).
- `resources.html` is now the full library/browse page (same search/filter,
  no result limit).

## Structure

```
index.html               Homepage — hero, levels, exams, library, featured
                          resources + search, why-sway, stats, about, final CTA
resources.html            Full resource library — browse/filter, no limit
legal.html                 Legal notice (placeholders)
privacy.html                Privacy policy (placeholders)
cookies.html                 Cookie policy
terms.html                    Terms & conditions (placeholders)
assets/styles.css      Design system (color tokens, type scale, components)
assets/resources-data.js  Placeholder resource dataset (window.SWAY_RESOURCES)
assets/main.js              Nav theme-switching, scrollspy, hero intro,
                             scroll reveals, cookie consent, resource
                             search/filter rendering
robots.txt
sitemap.xml
```

## The resource dataset

`assets/resources-data.js` holds a small array of **planned** resource
topics (`window.SWAY_RESOURCES`) — every item has `status: "soon"` and
renders with a "Coming soon" tag. This is intentional: no real resources
exist yet, so nothing pretends to be downloadable. As real resources are
published, add real entries here (or replace the array with a fetch from a
real backend/CMS later) — the search/filter UI on both `index.html` and
`resources.html` already reads from this same file, so nothing else needs
to change.

## Color system

Extends the original paper/ink/terracotta/olive palette with two secondary
brand colors for a more dynamic, differentiated feel:

- `--teal` / `--teal-deep` / `--teal-light` — used for reading/listening/use-of-English tags
- `--amber` / `--amber-deep` / `--amber-light` — used for vocabulary/pronunciation tags and the search button gradient
- `--lvl-a1` → `--lvl-c2` — a six-step blue → red progression used only for level badges, so A1–C2 are visually distinguishable at a glance without turning the site into a rainbow

## Before you publish — replace these

**Contact:** `hello@swaylanguages.com` and the Instagram link in the footers
are placeholders — replace with real ones.

**Legal pages** (`legal.html`, `privacy.html`, `terms.html`) contain fields
like `[LEGAL_NAME]`, `[TAX_ID]`, `[ADDRESS]`, `[HOSTING_PROVIDER]`,
`[ANALYTICS_PROVIDER]`, `[DATA_PROTECTION_CONTACT]` — search for
`config-flag` in the HTML to find every instance. These were rewritten to
describe the resource-library model (no more booking/lesson language), but
still deserve a legal advisor's review before publishing, since Sway
operates from Spain.

**About section:** the portrait is a placeholder pattern — swap in a real
photo of Álvaro by replacing `.founder__figure` in `index.html`.

**Exams section:** all six exam boards are marked "In development" — update
each card's status once real preparation material exists for it.

**Canonical URLs / Open Graph / sitemap.xml / robots.txt** all assume the
domain `https://www.swaylanguages.com/` — update if the real domain differs.

## Notes on implementation choices

- **No build tooling**, so it runs anywhere instantly and stays easy to hand-edit.
- **Cookie consent** uses `localStorage` and blocks nothing by default —
  there's no analytics script wired in yet. When you add one, gate it behind
  `localStorage.getItem('sway-cookie-consent')` having `analytics: true`
  (see the `sway:consent` custom event dispatched in `main.js`).
- **Nav** switches light/dark automatically as it crosses themed sections
  (`initNavTheme`) and underlines the active section link (`initScrollSpy`).
- **Motion** respects `prefers-reduced-motion`: the hero intro animation is
  skipped entirely, and all scroll reveals show content immediately.
- Fonts (Fraunces + Work Sans) load from Google Fonts via `styles.css`.
