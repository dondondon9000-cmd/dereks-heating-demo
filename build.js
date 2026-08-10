/**
 * Dev-only static site generator for the Derek's Heating demo.
 * Not shipped to the browser -- run `node build.js` to (re)generate the
 * flat .html files from the shared header/footer/icon templates below.
 * Output is plain HTML/CSS/vanilla JS with no runtime framework.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const OUT_DIR = __dirname;

const SITE = {
  name: "Derek's Heating, Cooling & Electrical LLC",
  shortName: "Derek's Heating, Cooling & Electrical",
  phoneDisplay: "636-744-4646",
  phoneHref: "tel:+16367444646",
  email: "dmheatingandcooling31@gmail.com",
  addressLine1: "205 Vondera Avenue",
  addressLine2: "Union, Missouri 63084",
  fullAddress: "205 Vondera Avenue, Union, MO 63084",
  facebook: "https://facebook.com/hvacfranklincounty",
  serviceArea: "Franklin County & Gasconade County, MO",
  serviceCities: "Union, New Haven & Hermann, MO",
  metaDescription:
    "Derek's Heating, Cooling & Electrical LLC is a full-service HVAC company serving Union, MO and the surrounding area. AC, furnace, heat pump and ductless mini-split repair, installation, and financing.",
};

// ---------------------------------------------------------------------
// Icons. Content/brand icons render from the real transparent-PNG set
// (assets/img/icons/) supplied by Derek's team; generic interface chrome
// (menu, chevron, arrow, checkmarks, Facebook glyph) stays inline SVG.
// ---------------------------------------------------------------------

const PNG_ICONS = {
  snowflake: "snowflake.png",
  flame: "flame.png",
  wind: "fan.png",
  droplet: "droplet.png",
  wrench: "wrench.png",
  clipboard: "clipboard.png",
  dollar: "dollar.png",
  phone: "phone.png",
  mail: "mail.png",
  pin: "pin.png",
  shield: "shield.png",
  checkCircle: "check-circle.png",
  clock: "clock.png",
};

const ICONS = {
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail:
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
  pin:
    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  facebook:
    '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  menu:
    '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
  close:
    '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  checkCircle:
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  wind:
    '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>',
  droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  dollar:
    '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  clock:
    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  arrowRight:
    '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  flame:
    '<path d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.5-2-1-3 2 1 3 4 3 6a6 6 0 0 1-12 0c0-4 3-6 4-10z"/>',
  snowflake:
    '<g stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"/></g>',
  star:
    '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  clipboard:
    '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
};

function icon(name, opts) {
  opts = opts || {};
  const cls = ["icon", opts.cls].filter(Boolean).join(" ");
  if (PNG_ICONS[name] && !opts.forceSvg) {
    return `<img class="${cls}" src="assets/img/icons/${PNG_ICONS[name]}" width="24" height="24" alt="" aria-hidden="true">`;
  }
  const filled = opts.filled;
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="${
    filled ? "currentColor" : "none"
  }" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}

// ---------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------

const SERVICE_LINKS = [
  { label: "AC Repair & Installation", href: "ac-repair-installation.html" },
  {
    label: "Furnace Repair & Installation",
    href: "furnace-repair-installation.html",
  },
  {
    label: "Heat Pump Repair & Installation",
    href: "heat-pump-repair-installation.html",
  },
  { label: "Indoor Air Quality", href: "indoor-air-quality.html" },
];

const NAV = [
  { label: "Home", href: "index.html" },
  { label: "About Us", href: "about.html" },
  { label: "Services", href: "services.html", dropdown: SERVICE_LINKS },
  { label: "Financing", href: "financing.html" },
  { label: "Contact Us", href: "contact.html" },
  { label: "Reviews", href: "reviews.html" },
];

function topbar() {
  return `
  <div class="topbar">
    <div class="container">
      <a class="topbar-call" href="${SITE.phoneHref}">
        ${icon("phone")}
        ${SITE.phoneDisplay}
      </a>
      <span class="topbar-area">Serving ${SITE.serviceArea}</span>
    </div>
  </div>`;
}

function brandMark() {
  return `
      <a class="brand" href="index.html">
        <span class="brand-mark">${icon("snowflake")}</span>
        <span class="brand-name">
          Derek's Heating, Cooling &amp; Electrical
          <small>Union, MO &middot; Licensed &amp; Insured</small>
        </span>
      </a>`;
}

function desktopNav(activeHref) {
  const items = NAV.map((item) => {
    const current = item.href === activeHref ? ' aria-current="page"' : "";
    if (item.dropdown) {
      const sub = item.dropdown
        .map((d) => `<li><a href="${d.href}">${d.label}</a></li>`)
        .join("");
      return `
        <li class="has-dropdown">
          <a class="nav-link" href="${item.href}"${current}>
            ${item.label} ${icon("chevronDown", { cls: "caret" })}
          </a>
          <ul class="dropdown">${sub}</ul>
        </li>`;
    }
    return `<li><a class="nav-link" href="${item.href}"${current}>${item.label}</a></li>`;
  }).join("");

  return `
      <nav class="primary-nav" aria-label="Primary">
        <ul class="nav-list">${items}</ul>
      </nav>`;
}

function mobileNav(activeHref) {
  const items = NAV.map((item) => {
    if (item.dropdown) {
      const sub = item.dropdown
        .map((d) => `<a href="${d.href}">${d.label}</a>`)
        .join("");
      const current = item.href === activeHref ? ' aria-current="page"' : "";
      return `
        <button
          type="button"
          class="mobile-nav-toggle-btn"
          data-mobile-sub-toggle
          aria-expanded="false"
          aria-controls="mobile-services-sub"${current}
        >
          Services ${icon("chevronDown", { cls: "caret" })}
        </button>
        <div class="mobile-sub" id="mobile-services-sub" data-mobile-sub>
          <a href="services.html">All Services</a>
          ${sub}
        </div>`;
    }
    const current = item.href === activeHref ? ' aria-current="page"' : "";
    return `<a class="mobile-nav-link" href="${item.href}"${current}>${item.label}</a>`;
  }).join("");

  return `
    <div class="mobile-nav" data-mobile-nav>
      <div class="container">
        ${items}
        <a class="btn btn-primary btn-block mobile-cta" href="${SITE.phoneHref}">
          ${icon("phone")} Call ${SITE.phoneDisplay}
        </a>
      </div>
    </div>`;
}

function header(activeHref) {
  return `
  ${topbar()}
  <header class="site-header">
    <div class="container header-inner">
      ${brandMark()}
      ${desktopNav(activeHref)}
      <a class="btn btn-primary header-cta" href="${SITE.phoneHref}">
        ${icon("phone")} Call Now
      </a>
      <button
        type="button"
        class="nav-toggle"
        data-nav-toggle
        aria-expanded="false"
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
      >
        ${icon("menu")}
      </button>
    </div>
    ${mobileNav(activeHref)}
  </header>`;
}

function footer() {
  const links = NAV.flatMap((item) =>
    item.dropdown
      ? [{ label: item.label, href: item.href }]
      : [{ label: item.label, href: item.href }]
  );

  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <span class="brand-mark">${icon("snowflake")}</span>
            <span class="brand-name">Derek's Heating, Cooling &amp; Electrical</span>
          </a>
          <p>Full-service heating, cooling and electrical for Union, MO and
            the surrounding area. Honest estimates, trusted technicians.</p>
          <div class="footer-social">
            <a href="${SITE.facebook}" aria-label="Derek's Heating on Facebook" target="_blank" rel="noopener noreferrer">
              ${icon("facebook")}
            </a>
          </div>
        </div>

        <div>
          <div class="footer-heading">Site</div>
          <ul class="footer-links">
            ${links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}
          </ul>
        </div>

        <div>
          <div class="footer-heading">Services</div>
          <ul class="footer-links">
            ${SERVICE_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}
          </ul>
        </div>

        <div>
          <div class="footer-heading">Contact</div>
          <ul class="footer-contact">
            <li>${icon("phone")}<a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a></li>
            <li>${icon("mail")}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li>${icon("pin")}<span>${SITE.addressLine1}<br>${SITE.addressLine2}</span></li>
          </ul>
          <div class="footer-certs">
            <span class="footer-cert-badge">${icon("shield")} Energy Star</span>
            <span class="footer-cert-badge">${icon("checkCircle")} NATE Certified</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; <span data-year>2026</span> ${SITE.name}. All rights reserved.</span>
        <span>Site design demo &mdash; not yet live to the public.</span>
      </div>
    </div>
  </footer>`;
}

// ---------------------------------------------------------------------
// Structured data
// ---------------------------------------------------------------------

function hvacBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: SITE.name,
    telephone: "+1-636-744-4646",
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressLine1,
      addressLocality: "Union",
      addressRegion: "MO",
      postalCode: "63084",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Franklin County, MO" },
      { "@type": "AdministrativeArea", name: "Gasconade County, MO" },
      { "@type": "City", name: "Union, MO" },
      { "@type": "City", name: "New Haven, MO" },
      { "@type": "City", name: "Hermann, MO" },
    ],
    sameAs: [SITE.facebook],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(
    data,
    null,
    2
  )}</script>`;
}

// ---------------------------------------------------------------------
// Page shell
// ---------------------------------------------------------------------

function page({ title, description, activeHref, path: pagePath, body, extraSchema }) {
  const canonical = `https://derekshvac-demo.example/${pagePath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0a2338">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">

<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:site_name" content="${SITE.name}">

<link rel="stylesheet" href="assets/css/style.css">
${hvacBusinessSchema()}
${extraSchema || ""}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header(activeHref)}
<main id="main">
${body}
</main>
${footer()}
<script src="assets/js/main.js"></script>
<script>document.querySelector('[data-year]').textContent = new Date().getFullYear();</script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------
// Shared page fragments
// ---------------------------------------------------------------------

function breadcrumb(label) {
  return `<p class="breadcrumb"><a href="index.html">Home</a> / ${label}</p>`;
}

function bookApptCta() {
  return `
  <section class="section">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>Book Your Appointment</h2>
          <p>Call now or send a quick message and Derek's team will get back to you to schedule a visit.</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-primary" href="${SITE.phoneHref}">${icon("phone")} Call ${SITE.phoneDisplay}</a>
          <a class="btn btn-on-dark" href="contact.html">Request Appointment</a>
        </div>
      </div>
    </div>
  </section>`;
}

function certStrip() {
  return `
      <div class="cert-strip">
        <span class="cert-badge">${icon("shield")} Energy Star Partner</span>
        <span class="cert-badge">${icon("checkCircle")} NATE Certified Technicians</span>
        <span class="cert-badge">${icon("clock")} Licensed &amp; Insured</span>
      </div>`;
}

const WHAT_WE_DO = [
  {
    icon: "snowflake",
    title: "AC Repair",
    text: "Fast, honest diagnostics and repair for every make and model of central air and cooling system.",
    href: "ac-repair-installation.html",
  },
  {
    icon: "wrench",
    title: "AC Installation",
    text: "Help finding and installing the right-sized cooling system for your home and budget.",
    href: "ac-repair-installation.html",
  },
  {
    icon: "flame",
    title: "Furnace Repair",
    text: "Reliable furnace repair with honest estimates from a team you can trust in the middle of winter.",
    href: "furnace-repair-installation.html",
  },
  {
    icon: "clipboard",
    title: "Furnace Installation",
    text: "Professional furnace installation done right the first time, backed by our workmanship.",
    href: "furnace-repair-installation.html",
  },
  {
    icon: "droplet",
    title: "Indoor Air Quality",
    text: "Solutions to keep the air in your home healthier and more comfortable year-round.",
    href: "indoor-air-quality.html",
  },
  {
    icon: "wind",
    title: "Heat Pumps",
    text: "Efficient heat pump repair and installation that combines heating and cooling in one system.",
    href: "heat-pump-repair-installation.html",
  },
  {
    icon: "dollar",
    title: "Financing Options",
    text: "Competitive financing so a new system fits your budget, not just your home.",
    href: "financing.html",
  },
  {
    icon: "mail",
    title: "Contact Us",
    text: "Have a question or need a repair? Reach out and our team will get right back to you.",
    href: "contact.html",
  },
];

function whatWeDoGrid() {
  return `
      <div class="card-grid">
        ${WHAT_WE_DO.map(
          (item) => `
        <div class="card">
          <div class="feature-icon">${icon(item.icon)}</div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <a class="card-link" href="${item.href}">Learn more ${icon("arrowRight")}</a>
        </div>`
        ).join("")}
      </div>`;
}

module.exports = {
  OUT_DIR,
  SITE,
  icon,
  page,
  breadcrumb,
  bookApptCta,
  certStrip,
  whatWeDoGrid,
  SERVICE_LINKS,
};
