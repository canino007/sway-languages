# Sway Languages — website

A static, dependency-free website (HTML/CSS/vanilla JS). No build step —
open `index.html` in a browser, or upload the whole folder to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, or plain shared hosting).

## Structure

```
index.html        Homepage — hero, problem, method, why, about, lessons,
                   pricing, referral, how-it-works, booking, FAQ, resources teaser
resources.html     "Sway Notes" — coming-soon content library
legal.html         Legal notice (placeholders)
privacy.html       Privacy policy (placeholders)
cookies.html       Cookie policy
terms.html         Terms & booking policy (placeholders)
assets/styles.css  Design system (tokens, type scale, components)
assets/main.js     Nav, hero intro animation, scroll reveals, FAQ accordion,
                   cookie consent, Cal.com booking modal
robots.txt
sitemap.xml
```

## Before you publish — replace these

**Booking:** the Cal.com URL is already wired in
(`https://cal.com/alvaro-munoz-invcm6/20min`), used both as a fallback link
and embedded in the in-page booking modal. No changes needed unless the URL changes.

**Contact:** `hello@swaylanguages.com` and the Instagram link in the footers
are placeholders — replace with real ones.

**Legal pages** (`legal.html`, `privacy.html`, `terms.html`) contain fields
like `[LEGAL_NAME]`, `[TAX_ID]`, `[ADDRESS]`, `[HOSTING_PROVIDER]`,
`[ANALYTICS_PROVIDER]`, `[PAYMENT_PROVIDER]`, `[BOOKING_PROVIDER]`,
`[DATA_PROTECTION_CONTACT]`, and cancellation/payment terms — search for
`config-flag` in the HTML to find every instance. Have a legal advisor review
before publishing, since Sway operates from Spain.

**FAQ:** two answers ("What platform are lessons held on?" and "How do I
pay?") are marked "to be confirmed" — fill these in once decided.

**About section:** the portrait is a placeholder pattern — swap in a real
photo of Álvaro by replacing `.about__portrait` in `index.html`.

**Testimonials:** intentionally left as "coming soon" — nothing was
fabricated. Replace the placeholder panel in `index.html` once real
testimonials exist.

**Canonical URLs / Open Graph / sitemap.xml / robots.txt** all assume the
domain `https://www.swaylanguages.com/` — update if the real domain differs.

## v2 — visual redesign

The visual system was rebuilt for real art direction instead of a plain
document-with-sections look:

- **Color rhythm** — each section is deliberately themed (`.t-ink`,
  `.t-paper`, `.t-paper-2`, `.t-olive`, `.t-terracotta` in `styles.css`) so
  the page alternates dark/light/accent as you scroll, instead of staying
  white throughout.
- **Oversized editorial type** — the hero sets `SWAY` / `Languages` at
  `clamp(3.6rem, 4vw + 3rem, 8.5rem)` (see `--step-mega`), with a
  line-mask reveal animation on load.
- **Method section** is a sticky-scroll story: the number and title on the
  left stay pinned while the four principles scroll past on the right
  (`initMethodStory` in `main.js` swaps the pinned number/label via
  `IntersectionObserver`).
- **Why Sway** is an editorial list (lettered rows) instead of a card grid.
- **About** breaks the grid: the portrait placeholder overlaps the text
  column and carries a rotated name tag, ready for a real photo.
- **Pricing** is a dark, borderless list of rows with right-aligned serif
  numerals — no SaaS-style pricing cards.
- **Nav** switches between light/dark automatically as it crosses light and
  dark sections (`initNavTheme`), and underlines the active section link
  (`initScrollSpy`).
- **Mobile menu** is a full-screen dark editorial takeover with numbered,
  oversized links.

## Notes on implementation choices

- **No build tooling**, so it runs anywhere instantly and stays easy to hand-edit.
- **Cookie consent** uses `localStorage` and blocks nothing by default —
  there's no analytics script wired in yet, so there's nothing to gate. When
  you add an analytics tag, load it only after checking
  `localStorage.getItem('sway-cookie-consent')` has `analytics: true` (see
  the `sway:consent` custom event dispatched in `main.js`).
- **Booking modal** lazy-loads the Cal.com iframe only when opened, so it
  never costs load time or sets cookies before someone actually books.
- **Motion** respects `prefers-reduced-motion`: the hero intro animation is
  skipped entirely, and all scroll reveals show content immediately.
- Fonts (Fraunces + Work Sans) load from Google Fonts via `styles.css`.
