# Build Spec — Derek's Heating, Cooling & Electrical LLC

**Purpose:** Rebuild an existing HVAC business site custom-coded, matching the current
site's structure and content closely, but modern, fast, and mobile-optimized.
This is a demo build to show the client the difference before he commits —
not yet under contract.

**Business:** Derek's Heating, Cooling & Electrical LLC
205 Vondera Avenue, Union, Missouri 63084
Phone: 636-744-4646
Service area: Franklin County & Gasconade County, MO (New Haven, Hermann, Union)

---

## 1. Tech direction

- Static/custom-coded build — no CMS platform, no page-builder bloat.
- Zero legacy dependencies. The old site runs jQuery, Bootstrap, Owl Carousel,
  and an animation library, which is the direct cause of its performance
  problems (Mobile PageSpeed Performance: 20/100, LCP 9.0s, TBT 3,310ms).
  None of that should exist in this build.
- Mobile-first. Design and test primarily against a throttled/slow connection,
  not a fast desktop wifi — this is the single biggest differentiator versus
  the current site.
- Target: Lighthouse/PageSpeed mobile Performance 90+, LCP under 2.5s, TBT
  under 200ms, CLS under 0.1.
- Images: modern formats (WebP/AVIF), properly sized and lazy-loaded below the fold.
- Carry forward the schema.org HVACBusiness structured data — it was correctly
  implemented on the old site and is worth preserving/improving.

## 2. Site structure (pages)

Same page count as the current site — no new pages, nothing folded out:

1. **Home**
2. **About Us**
3. **Services** (overview/hub page)
4. **AC Repair & Installation** (service detail)
5. **Furnace Repair & Installation** (service detail)
6. **Heat Pump Repair & Installation** (service detail)
7. **Indoor Air Quality** (service detail)
8. **Financing**
9. **Contact Us**
10. **Reviews**

## 3. Design direction

- Newer, sleeker, more modern than the current site — cleaner typography,
  more breathing room, updated visual hierarchy. Same trustworthy,
  straightforward HVAC tone — not flashy, not corporate.
- Fix the empty H1 issue from the old site: every page needs a real, visible,
  descriptive headline (the current homepage hero has no H1 text at all
  across any slide).
- Icon/graphic assets (snowflake, tools, furnace/heat icon, phone icon, fan
  icon, etc.) will be supplied separately as transparent-background PNGs —
  build the layout to accept these once provided; use simple placeholder
  shapes/icons in the meantime so the structure isn't blocked.
- Logo: current logo is a photographed HVAC business card — a cleaner
  version is being produced separately and will be dropped in once ready.
  Design the header/footer logo placement to be a clean vector/image swap.

## 4. Page-by-page content (source: current live site — carry forward, lightly tightened)

### Home
- Hero: HVAC company serving Union, MO and surrounding area — AC/furnace/heat
  pump repair & installation, financing available. Strong CTA to call or
  contact.
- Section: AC Repair & Installation — repair & install all types of AC/cooling
  systems, help finding the right unit. Link to AC service page.
- Section: Furnace Repair & Installation — honest estimates, trusted team.
  Link to furnace service page.
- Section: Book Your Appointment — call-to-schedule CTA block.
- Section: "HVAC Services You Can Rely On" — trust/credentials paragraph:
  fully trained and certified team, correct installs, proper repairs,
  outstanding service, customer satisfaction as the guarantee. Link to About.
- Section: "What We Do" — 8-item grid: AC Repair, AC Installation, Furnace
  Repair, Furnace Installation, Indoor Air Quality, Heat Pumps, Financing
  Options, Contact Us (each with 1-sentence description, carry from old site).
- Contact form block: simple appointment request form.
- Footer: social links (Facebook is the only genuinely active one — see
  Section 6), certifications (Energy Star, NATE), location, copyright.

### About Us
- Company trust/credentials content (expand slightly from home page teaser).
- Certifications: Energy Star, NATE certified.

### Services (hub)
- Overview linking to the 4 service detail pages below.

### AC Repair & Installation
- Repair and installation of all types of air conditioning and cooling
  systems; help customers find the right system/unit.

### Furnace Repair & Installation
- Furnace installation and repair; honest estimates; trusted team.

### Heat Pump Repair & Installation
- Heat pump repair and installation; efficiency-focused messaging (combining
  heating and cooling into one solution).

### Indoor Air Quality
- Range of indoor air quality solutions for home health and comfort.

### Financing
- Financing options available — HVAC costs can be daunting, competitive
  financing offered. (Pull any specific financing partner/terms from Derek
  if available; old site doesn't specify a provider.)

### Contact Us
- Contact form (name, phone, email, message).
- **Replace the placeholder email** — old site code has `info@hvac.com`,
  which is a non-functional placeholder, not a real address. Use Derek's
  actual contact email once confirmed (submission shows
  dmheatingandcooling31@gmail.com — confirm this is the one he wants public).
- Phone: 636-744-4646 (click-to-call).
- Address: 205 Vondera Avenue, Union, Missouri 63084.

### Reviews
- Testimonials/reviews section or page (old site links to a `/reviews` page —
  content/reviews themselves need to come from Derek or Google Business
  Profile once available).

## 5. Header / footer / global elements

- Top bar: phone number (click-to-call), weather link (optional — old site
  had a "Union WEATHER" link, low priority, can drop or keep).
- Main nav: Home, About Us, Services (dropdown: AC / Furnace / Heat Pump /
  Indoor Air Quality), Financing, Contact Us, Reviews.
- Footer: nav links, real contact email, phone, address, certifications
  (Energy Star, NATE logos), social icons, copyright.

## 6. Social links — fix before launch

Old site has social icons in the code, but most aren't real:
- Facebook: **live** — https://facebook.com/hvacfranklincounty
- Instagram: placeholder link (goes nowhere specific) — confirm with Derek if
  he has a real account or drop the icon
- LinkedIn: placeholder link — same, confirm or drop

Don't carry forward dead/placeholder social links into the new build.

## 7. SEO / technical carryover

- Structured data: schema.org HVACBusiness (carry forward/improve).
- Meta description (adapt from old site): full-service heating and air
  conditioning company serving Union, MO and surrounding area — repair of all
  AC/furnace/heat pump/ductless mini-split brands.
- Proper H1 on every page (fixing the old site's empty homepage H1).
- Google Search Console + sitemap submission once live.

## 8. Explicitly NOT part of this build yet

- No CMS/client-editable backend — not scoped yet, this is a static
  custom-coded rebuild.
- No live payment/e-commerce — not applicable to this business.
- Domain is not yet in Derek's control — this build goes on our own
  hosting/staging for now. Do not wire up final DNS or go live publicly
  until domain ownership is resolved with the current vendor.
- No agreement/deposit collected yet — this is a demo build to show Derek
  the before/after before he signs anything.
