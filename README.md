# Derek's Heating, Cooling & Electrical LLC — Demo Rebuild

Static, custom-coded rebuild of the Derek's Heating, Cooling & Electrical
LLC website. Built to show the difference before Derek commits to
anything — **this is a demo, not yet under contract, and not live to the
public.**

See `BUILD_SPEC.md` for the full brief this was built against.

## Status

- 10 pages, all built: Home, About, Services (hub), AC / Furnace / Heat
  Pump / Indoor Air Quality (service detail), Financing, Contact, Reviews.
- Zero runtime dependencies: no framework, no CSS/JS libraries, no web
  fonts (system font stack), no images yet (icons are inline SVG
  placeholders — see "Placeholders to swap" below).
- Home page fully loads in **4 requests / ~50KB** (html + css + js +
  favicon) with no render-blocking third-party requests.
- Schema.org `HVACBusiness` structured data on every page.
- Every page has a real, visible, descriptive `<h1>` (fixing the old
  site's empty-H1 issue).

## Tech

Plain HTML/CSS/vanilla JS. No build step is required to *serve* the site —
the `.html` files in the repo root are the final, deployable output.

A small **dev-only** generator (`build.js` + `pages.js`, Node built-ins
only, no npm dependencies) produces those `.html` files from shared
header/footer/icon templates so the 10 pages stay consistent. If you need
to change the nav, footer, or any shared component, edit `build.js` /
`pages.js` and regenerate:

```
node pages.js
```

Do not hand-edit the generated `.html` files for anything structural
(nav, footer, icons) — those edits will be lost on the next regenerate.
Editing page-specific copy directly in the generated HTML is fine for
quick tweaks, but for anything meant to stick, edit it in `pages.js`.

## Local preview

No server-side code, so any static file server works:

```
npx http-server .
# or
python3 -m http.server 8000
```

## Placeholders to swap before this goes live

- **Icons**: inline SVG line-icon placeholders (snowflake, flame, wind,
  droplet, etc. in `build.js`'s `ICONS` object). Swap for the supplied
  transparent-background PNG icon set once Derek provides it.
- **Logo**: header/footer currently render a dark rounded square with the
  snowflake glyph as the brand mark (`brandMark()` in `build.js`). Swap
  for the real logo image once the cleaned-up vector version is ready.
- **Photos**: none used yet — hero and section backgrounds are pure CSS
  gradients so there's nothing to optimize/lazy-load until real photos
  are supplied. Add them as WebP/AVIF, sized and lazy-loaded below the
  fold, per the build spec.
- **Reviews**: `reviews.html` currently shows clearly-labeled sample/
  placeholder cards, not real testimonials. Replace with real reviews
  from Derek or the Google Business Profile.
- **Contact form**: `assets/js/main.js`'s `initContactForm()` shows a
  success message on submit but does not send anything anywhere yet —
  there's no backend. Wire it to a real endpoint (Formspree, Netlify
  Forms, or a custom API route) before launch.
- **Financing details**: `financing.html` is generic ("competitive
  financing") since the old site didn't name a specific provider/terms.
  Update once Derek confirms a financing partner.
- **Social links**: only Facebook is live
  (facebook.com/hvacfranklincounty) and linked in the footer. Instagram/
  LinkedIn were dropped rather than carrying forward the old site's dead
  placeholder links — add them back once Derek confirms real accounts.
- **Domain / canonical URLs**: `<link rel="canonical">` on every page
  currently points at a placeholder `derekshvac-demo.example` domain
  (see `page()` in `build.js`). Update once real hosting/domain is
  settled — the build spec explicitly says not to wire up final DNS
  until domain ownership is resolved with the current vendor.
- **Map embed**: `contact.html` uses a keyless Google Maps embed URL
  (`google.com/maps?q=...&output=embed`) pointed at 205 Vondera Avenue,
  Union, MO. Works with no API key, but swap for whatever mapping
  approach the final host prefers if needed.

## Performance

No Lighthouse run was available in this environment, but the page-weight
and request-count numbers above (4 requests, ~50KB, no web fonts, no
images, one small stylesheet, one ~2KB JS file) are structurally aligned
with the spec's mobile targets (Performance 90+, LCP < 2.5s, TBT < 200ms,
CLS < 0.1). Run a real mobile Lighthouse/PageSpeed pass once this is
deployed somewhere reachable, and re-check after real photos/icons/logo
are dropped in — those are the parts most likely to move the numbers.
