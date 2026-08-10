/**
 * Dev-only: defines the body content for each page and writes the final
 * flat .html files using the shared shell/header/footer from build.js.
 * Run with `node pages.js`.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const { OUT_DIR, SITE, icon, page, breadcrumb, bookApptCta, certStrip, whatWeDoGrid, SERVICE_LINKS } =
  require("./build.js");

const CONTACT_FORM = (heading, blurb) => `
      <div class="form-card">
        <h3 class="mt-0">${heading}</h3>
        <p>${blurb}</p>
        <form data-contact-form novalidate>
          <div class="form-grid two-col">
            <div class="field">
              <label for="name">Full name</label>
              <input id="name" name="name" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autocomplete="tel" required>
            </div>
            <div class="field full">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" required>
            </div>
            <div class="field full">
              <label for="message">How can we help?</label>
              <textarea id="message" name="message" required></textarea>
            </div>
          </div>
          <div class="form-status" data-form-status role="status"></div>
          <p class="form-note">We usually respond within one business day. For anything urgent, please call ${SITE.phoneDisplay}.</p>
          <button class="btn btn-primary btn-block" type="submit" style="margin-top:0.75rem;">Send Request</button>
        </form>
      </div>`;

// ---------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------

const home = page({
  title: "Derek's Heating, Cooling & Electrical LLC | Union, MO HVAC Company",
  description: SITE.metaDescription,
  activeHref: "index.html",
  path: "index.html",
  body: `
  <section class="hero">
    <div class="container hero-inner">
      <span class="eyebrow">${icon("pin")} Union, MO &amp; Surrounding Area</span>
      <h1>Fast, Honest Heating &amp; Cooling Repair for Union, MO Homeowners</h1>
      <p class="hero-lede">
        Derek's Heating, Cooling &amp; Electrical LLC repairs and installs AC,
        furnace, and heat pump systems across Franklin and Gasconade County.
        Certified technicians, straight answers, and financing available.
      </p>
      <div class="weather-hook" data-weather aria-live="polite"></div>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${SITE.phoneHref}">${icon("phone")} Call ${SITE.phoneDisplay}</a>
        <a class="btn btn-on-dark" href="contact.html">Request an Appointment</a>
      </div>
      <ul class="hero-trust">
        <li>${icon("shield")} Energy Star Partner</li>
        <li>${icon("checkCircle")} NATE Certified</li>
        <li>${icon("clock")} Licensed &amp; Insured</li>
        <li>${icon("dollar")} Financing Available</li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="feature-row">
        <div class="panel">
          <div class="feature-icon">${icon("snowflake")}</div>
          <h2>AC Repair &amp; Installation</h2>
          <p>We repair and install all types of air conditioning and cooling
            systems, and help you find the right unit for your home if it's
            time to replace one. No guesswork, no upselling &mdash; just a
            straight assessment of what your home needs.</p>
          <a class="btn btn-secondary" href="ac-repair-installation.html">AC Services ${icon("arrowRight")}</a>
        </div>
        <div class="panel">
          <div class="feature-icon">${icon("flame")}</div>
          <h2>Furnace Repair &amp; Installation</h2>
          <p>When the furnace goes out, you need an honest estimate and a
            team you can trust in your home. We handle furnace repair and
            installation for every major brand, done right the first time.</p>
          <a class="btn btn-secondary" href="furnace-repair-installation.html">Furnace Services ${icon("arrowRight")}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Not Sure What You Need?</span>
        <h2>Answer Two Quick Questions</h2>
        <p>Tell us what's going on and we'll point you to the right next step.</p>
      </div>
      <div class="quiz-card">
        <div data-quiz>
          <noscript>
            <p>Enable JavaScript to use this tool, or <a href="services.html">browse our services</a> directly.</p>
          </noscript>
        </div>
      </div>
    </div>
  </section>

  ${bookApptCta()}

  <section class="section section-alt">
    <div class="container">
      <div class="feature-row">
        <div>
          <span class="kicker">Why Homeowners Choose Us</span>
          <h2>HVAC Services You Can Rely On</h2>
          <p>Our team is fully trained and certified, so every install is
            done correctly and every repair is done right &mdash; no
            shortcuts. We stand behind our work because customer
            satisfaction is the only outcome we're willing to accept.</p>
          <a class="btn btn-secondary" href="about.html">More About Us ${icon("arrowRight")}</a>
        </div>
        <div class="panel">
          ${certStrip()}
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="kicker">What We Do</span>
        <h2>Complete Heating, Cooling &amp; Electrical Services</h2>
        <p>From same-day repairs to full system installs, here's how we help
          keep Union-area homes comfortable all year.</p>
      </div>
      ${whatWeDoGrid()}
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Get Started</span>
        <h2>Request an Appointment</h2>
        <p>Tell us what's going on and we'll follow up to get you on the schedule.</p>
      </div>
      <div style="max-width:640px;margin:0 auto;">
        ${CONTACT_FORM("Appointment Request", "Fill out the form below and our team will reach out to confirm a time.")}
      </div>
    </div>
  </section>
  `,
});

// ---------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------

const about = page({
  title: "About Us | Derek's Heating, Cooling & Electrical LLC",
  description:
    "Meet Derek's Heating, Cooling & Electrical LLC — Energy Star and NATE certified HVAC technicians serving Union, MO and Franklin & Gasconade County.",
  activeHref: "about.html",
  path: "about.html",
  body: `
  <section class="page-hero">
    <div class="container">
      ${breadcrumb("About Us")}
      <h1>Trusted, Certified HVAC Technicians in Union, MO</h1>
      <p>Derek's Heating, Cooling &amp; Electrical LLC has built its reputation
        one honest repair and one correct install at a time.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="feature-row">
        <div>
          <span class="kicker">Our Approach</span>
          <h2>Correct Installs. Proper Repairs. Outstanding Service.</h2>
          <p>Every technician on our team is fully trained and certified
            before they set foot in your home. That means installations
            that are done to spec the first time, repairs that actually fix
            the problem instead of masking it, and service that treats your
            time and your home with respect.</p>
          <p>We measure success one way: whether you'd call us again. That
            keeps us honest about what a system actually needs &mdash; not
            what's easiest or most profitable for us to sell.</p>
        </div>
        <div class="panel">
          <h3 class="mt-0">Our Certifications</h3>
          <div class="stack">
            <div class="info-card">
              ${icon("shield")}
              <h3>Energy Star Partner</h3>
              <p style="margin-bottom:0;">Committed to energy-efficient equipment and installation practices that lower your utility bills.</p>
            </div>
            <div class="info-card">
              ${icon("checkCircle")}
              <h3>NATE Certified</h3>
              <p style="margin-bottom:0;">Our technicians hold North American Technician Excellence certification, the industry standard for HVAC competency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Service Area</span>
        <h2>Proudly Serving Franklin &amp; Gasconade County</h2>
        <p>Based in Union, MO, we regularly serve homeowners in Union, New
          Haven, Hermann, and the surrounding communities.</p>
      </div>
      ${certStrip()}
    </div>
  </section>

  ${bookApptCta()}
  `,
});

// ---------------------------------------------------------------------
// SERVICES HUB
// ---------------------------------------------------------------------

const servicesDetail = [
  {
    icon: "snowflake",
    title: "AC Repair & Installation",
    text: "Repair and installation for all types of air conditioning and cooling systems, plus help choosing the right unit for your home.",
    href: "ac-repair-installation.html",
  },
  {
    icon: "flame",
    title: "Furnace Repair & Installation",
    text: "Honest estimates and trusted furnace repair and installation, from minor fixes to full system replacement.",
    href: "furnace-repair-installation.html",
  },
  {
    icon: "wind",
    title: "Heat Pump Repair & Installation",
    text: "Efficient heat pump service that combines heating and cooling into a single, smart solution.",
    href: "heat-pump-repair-installation.html",
  },
  {
    icon: "droplet",
    title: "Indoor Air Quality",
    text: "A range of indoor air quality solutions to keep your home healthier and more comfortable.",
    href: "indoor-air-quality.html",
  },
];

const services = page({
  title: "HVAC Services | Derek's Heating, Cooling & Electrical LLC",
  description:
    "AC repair & installation, furnace service, heat pumps, and indoor air quality solutions from Derek's Heating, Cooling & Electrical LLC in Union, MO.",
  activeHref: "services.html",
  path: "services.html",
  body: `
  <section class="page-hero">
    <div class="container">
      ${breadcrumb("Services")}
      <h1>HVAC Services in Union, MO &amp; the Surrounding Area</h1>
      <p>Repair, installation, and maintenance for every major home comfort
        system &mdash; backed by certified technicians and honest estimates.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="card-grid">
        ${servicesDetail
          .map(
            (s) => `
        <div class="card">
          <div class="feature-icon">${icon(s.icon)}</div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
          <a class="card-link" href="${s.href}">View Service ${icon("arrowRight")}</a>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="cta-band">
        <div>
          <h2>Not Sure What You Need?</h2>
          <p>Give us a call and describe the problem &mdash; we'll point you to the right fix.</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-primary" href="${SITE.phoneHref}">${icon("phone")} Call ${SITE.phoneDisplay}</a>
          <a class="btn btn-on-dark" href="financing.html">See Financing</a>
        </div>
      </div>
    </div>
  </section>
  `,
});

// ---------------------------------------------------------------------
// SERVICE DETAIL PAGE FACTORY
// ---------------------------------------------------------------------

function serviceDetailPage({ slug, title, metaTitle, description, iconName, intro, points, closing }) {
  return page({
    title: metaTitle,
    description,
    activeHref: "services.html",
    path: `${slug}.html`,
    body: `
  <section class="page-hero">
    <div class="container">
      ${breadcrumb(`<a href="services.html">Services</a> / ${title}`)}
      <h1>${title}</h1>
      <p>${intro}</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="feature-row">
        <div>
          <div class="feature-icon">${icon(iconName)}</div>
          <h2>What's Included</h2>
          <div class="steps">
            ${points
              .map(
                (p, i) => `
            <div class="step">
              <span class="step-num">${i + 1}</span>
              <div>
                <h3 class="mt-0">${p.title}</h3>
                <p>${p.text}</p>
              </div>
            </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="panel">
          <h3 class="mt-0">Why Call Derek's Heating</h3>
          ${certStrip()}
          <p style="margin-top:1.25rem;">${closing}</p>
          <a class="btn btn-primary btn-block" href="${SITE.phoneHref}">${icon("phone")} Call ${SITE.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Other Services</span>
        <h2>Explore More of What We Do</h2>
      </div>
      <div class="card-grid">
        ${SERVICE_LINKS.filter((s) => !s.href.startsWith(slug))
          .map(
            (s) => `
        <div class="card">
          <h3>${s.label}</h3>
          <a class="card-link" href="${s.href}">View Service ${icon("arrowRight")}</a>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>

  ${bookApptCta()}
  `,
  });
}

const acPage = serviceDetailPage({
  slug: "ac-repair-installation",
  title: "AC Repair & Installation",
  metaTitle: "AC Repair & Installation in Union, MO | Derek's Heating & Cooling",
  description:
    "Repair and installation for all types of air conditioning and cooling systems in Union, MO. Honest diagnostics and help choosing the right unit.",
  iconName: "snowflake",
  intro:
    "We repair and install all types of air conditioning and cooling systems, and help you find the right unit if it's time to replace one.",
  points: [
    { title: "AC Repair", text: "Diagnostics and repair for central air, ductless mini-splits, and every major cooling system brand." },
    { title: "AC Installation", text: "New system installation sized correctly for your home, with no oversized or undersized guesswork." },
    { title: "System Selection", text: "Straight guidance on efficiency, capacity, and budget so you choose the right unit the first time." },
  ],
  closing:
    "If your AC is struggling to keep up or it's time to replace an aging unit, we'll give you a straight answer about repair versus replacement.",
});

const furnacePage = serviceDetailPage({
  slug: "furnace-repair-installation",
  title: "Furnace Repair & Installation",
  metaTitle: "Furnace Repair & Installation in Union, MO | Derek's Heating & Cooling",
  description:
    "Furnace installation and repair in Union, MO with honest estimates from a trusted local team.",
  iconName: "flame",
  intro:
    "Furnace installation and repair with honest estimates, from a team you can trust in your home.",
  points: [
    { title: "Furnace Repair", text: "Fast diagnostics for no-heat calls, strange noises, short-cycling, and rising energy bills." },
    { title: "Furnace Installation", text: "Professional installation for gas, electric, and dual-fuel systems, done to manufacturer spec." },
    { title: "Honest Estimates", text: "A clear, upfront estimate before any work begins — no surprise charges." },
  ],
  closing:
    "A furnace failure in the middle of winter can't wait. Call us and we'll get a technician out to assess the problem.",
});

const heatPumpPage = serviceDetailPage({
  slug: "heat-pump-repair-installation",
  title: "Heat Pump Repair & Installation",
  metaTitle: "Heat Pump Repair & Installation in Union, MO | Derek's Heating & Cooling",
  description:
    "Efficient heat pump repair and installation in Union, MO — one system for both heating and cooling.",
  iconName: "wind",
  intro:
    "Heat pumps combine heating and cooling into one efficient system. We repair and install them so you get reliable comfort year-round.",
  points: [
    { title: "Heat Pump Repair", text: "Troubleshooting and repair for systems that aren't heating, cooling, or cycling properly." },
    { title: "Heat Pump Installation", text: "Correctly sized installation so your system runs efficiently in both summer and winter." },
    { title: "Efficiency Focus", text: "Guidance on getting the most out of a heat pump versus a traditional furnace/AC setup." },
  ],
  closing:
    "Considering a heat pump instead of separate heating and cooling systems? We'll walk you through whether it makes sense for your home.",
});

const iaqPage = serviceDetailPage({
  slug: "indoor-air-quality",
  title: "Indoor Air Quality",
  metaTitle: "Indoor Air Quality Solutions in Union, MO | Derek's Heating & Cooling",
  description:
    "Indoor air quality solutions in Union, MO for a healthier, more comfortable home.",
  iconName: "droplet",
  intro:
    "A range of indoor air quality solutions to help your home feel healthier and more comfortable, year-round.",
  points: [
    { title: "Air Quality Assessment", text: "We evaluate what's actually affecting the air in your home before recommending a fix." },
    { title: "Filtration & Purification", text: "Solutions to reduce dust, allergens, and airborne particles circulating through your system." },
    { title: "Humidity Control", text: "Options to balance humidity levels for comfort and to protect your home and HVAC equipment." },
  ],
  closing:
    "If allergies, odors, or humidity are a problem in your home, we can help identify a solution that fits your system.",
});

// ---------------------------------------------------------------------
// FINANCING
// ---------------------------------------------------------------------

const financing = page({
  title: "Financing | Derek's Heating, Cooling & Electrical LLC",
  description:
    "Competitive financing options for HVAC repair and installation from Derek's Heating, Cooling & Electrical LLC in Union, MO.",
  activeHref: "financing.html",
  path: "financing.html",
  body: `
  <section class="page-hero">
    <div class="container">
      ${breadcrumb("Financing")}
      <h1>Financing Options for Your New HVAC System</h1>
      <p>A new AC, furnace, or heat pump is a big investment. We offer
        competitive financing so the cost doesn't have to be daunting.</p>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <div class="finance-highlights">
        <div class="finance-highlight">
          <strong>${icon("dollar")}</strong>
          <h3>Competitive Rates</h3>
          <p>Financing designed to make a new system fit your monthly budget.</p>
        </div>
        <div class="finance-highlight">
          <strong>${icon("clock")}</strong>
          <h3>Fast Decisions</h3>
          <p>Quick approvals so a repair or install doesn't have to wait.</p>
        </div>
        <div class="finance-highlight">
          <strong>${icon("checkCircle")}</strong>
          <h3>No Guesswork</h3>
          <p>We'll walk you through the numbers so there are no surprises.</p>
        </div>
      </div>
      <p style="margin-top:2rem;text-align:center;color:var(--ink-500);font-size:0.9rem;">
        Specific financing partners and terms will be added here once confirmed with Derek's team.
      </p>
    </div>
  </section>

  ${bookApptCta()}
  `,
});

// ---------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.fullAddress
)}&output=embed`;

const contact = page({
  title: "Contact Us | Derek's Heating, Cooling & Electrical LLC",
  description:
    "Contact Derek's Heating, Cooling & Electrical LLC in Union, MO. Call 636-744-4646 or send a message to schedule service.",
  activeHref: "contact.html",
  path: "contact.html",
  body: `
  <section class="page-hero">
    <div class="container">
      ${breadcrumb("Contact Us")}
      <h1>Get in Touch with Derek's Heating &amp; Cooling</h1>
      <p>Call, email, or send a message below and our team will get back to you.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="info-grid" style="margin-bottom:var(--space-5);">
        <div class="info-card">
          ${icon("phone")}
          <h3>Call Us</h3>
          <a href="${SITE.phoneHref}">${SITE.phoneDisplay}</a>
        </div>
        <div class="info-card">
          ${icon("mail")}
          <h3>Email Us</h3>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
        </div>
        <div class="info-card">
          ${icon("pin")}
          <h3>Visit Us</h3>
          <a href="${mapSrc.replace("&output=embed", "")}" target="_blank" rel="noopener noreferrer">${SITE.addressLine1}, ${SITE.addressLine2}</a>
        </div>
      </div>

      <div class="feature-row">
        ${CONTACT_FORM("Send Us a Message", "Tell us a bit about what's going on and we'll follow up shortly.")}
        <div class="map-embed">
          <iframe
            src="${mapSrc}"
            title="Map to Derek's Heating, Cooling & Electrical LLC"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
  `,
});

// ---------------------------------------------------------------------
// REVIEWS
// ---------------------------------------------------------------------

const CUSTOMER_REVIEWS = [
  {
    quote:
      "Derek did an amazing job. He was able to come out right away and checked out everything we were worried about. He walked me through and explained everything so I knew what was going on and why. Definitely recommend him and will use him for any future issues!",
    author: "Michelle Johnson",
    date: "December 2025",
  },
  {
    quote:
      "100% recommend!! Derek did an outstanding job on our AC unit. He went out of his way to take care of us and it's evident he cares for his customers. Thank you, Derek!",
    author: "Steph Scroggins",
    date: "June 2025",
  },
  {
    quote: "Competent. Efficient service. Would recommend!",
    author: "Mary Fox",
    date: "June 2025",
  },
  {
    quote:
      "Highly recommended these guys! They were friendly, professional and knowledgeable! They fixed the blowers on our fireplace!",
    author: "Jolie Johnson",
    date: "November 2024",
  },
  {
    quote:
      "Reached out to Derek's Heating and Cooling via text and Derek responded immediately. Within 2 hours Derek stopped by and fixed my GFCI outlet. He is quick, caring, and reasonably priced. Definitely will go to him for any future issues! Thanks again!!",
    author: "Cherie Dukes",
    date: "September 2024",
  },
  {
    quote:
      "Amazing! Derek came out within 12 hours of me contacting him (contacted around 9pm the night before) and had us up and going by 8:45am. Affordable, professional, and will be using him for years to come! Can't thank him enough for his amazing work and getting this taken care of for us. He also has other lines of business we discussed so will be recommending him any chance we can.",
    author: "Ashley Flahardy",
    date: "April 2024",
  },
  {
    quote:
      "He's definitely the best around! We had him do all new mini splits and electrical in our addition. Very easy to work with. Excellent service.",
    author: "Caleb McCord",
    date: "January 2024",
  },
  {
    quote:
      "He showed up same day when others were pushing me off for several days. Courteous and helpful. Highly recommend.",
    author: "Shelly Michelson",
    date: "August 2022",
  },
  {
    quote:
      "Derek is great to work with. He's prompt, courteous, and reasonably-priced. He fixed many issues we were having with a water heater that a Big-Named Company messed up and he was half the price. I have his number stored in my phone and know I can text him anytime we have issues. I highly recommend giving Derek a call.",
    author: "Adrienne Folta Bailey",
    date: "April 2022",
  },
];

const reviews = page({
  title: "Reviews | Derek's Heating, Cooling & Electrical LLC",
  description:
    "100% recommended on Facebook. See what customers say about Derek's Heating, Cooling & Electrical LLC in Union, MO.",
  activeHref: "reviews.html",
  path: "reviews.html",
  body: `
  <section class="page-hero">
    <div class="container">
      ${breadcrumb("Reviews")}
      <h1>What Union-Area Homeowners Say</h1>
      <p>We're proud of the work we do &mdash; here's what customers have
        said about Derek's Heating, Cooling &amp; Electrical on Facebook.</p>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container">
      <p style="text-align:center;color:var(--navy-900);font-weight:700;margin-bottom:var(--space-3);">
        100% Recommend &middot; ${CUSTOMER_REVIEWS.length} Reviews on Facebook
      </p>
      <div class="review-grid">
        ${CUSTOMER_REVIEWS.map(
          (r) => `
        <div class="review-card">
          <div class="stars" aria-label="Recommended">${icon("star", { filled: true })}${icon("star", { filled: true })}${icon("star", { filled: true })}${icon("star", { filled: true })}${icon("star", { filled: true })}</div>
          <p class="review-quote">&ldquo;${r.quote}&rdquo;</p>
          <p class="review-author">${r.author} &middot; ${r.date}</p>
        </div>`
        ).join("")}
      </div>
      <div class="review-cta" style="margin-top:var(--space-5);">
        <a class="btn btn-primary" href="${SITE.facebook}" target="_blank" rel="noopener noreferrer">${icon("facebook")} See All Reviews on Facebook</a>
      </div>
    </div>
  </section>

  ${bookApptCta()}
  `,
});

// ---------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------

const FILES = {
  "index.html": home,
  "about.html": about,
  "services.html": services,
  "ac-repair-installation.html": acPage,
  "furnace-repair-installation.html": furnacePage,
  "heat-pump-repair-installation.html": heatPumpPage,
  "indoor-air-quality.html": iaqPage,
  "financing.html": financing,
  "contact.html": contact,
  "reviews.html": reviews,
};

for (const [filename, html] of Object.entries(FILES)) {
  fs.writeFileSync(path.join(OUT_DIR, filename), html, "utf8");
  console.log("wrote", filename);
}
