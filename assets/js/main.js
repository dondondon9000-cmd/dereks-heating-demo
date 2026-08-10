/* Derek's Heating -- shared site behavior. No dependencies. */
(function () {
  "use strict";

  function initMobileNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var panel = document.querySelector("[data-mobile-nav]");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    var subToggle = panel.querySelector("[data-mobile-sub-toggle]");
    var subPanel = panel.querySelector("[data-mobile-sub]");
    if (subToggle && subPanel) {
      subToggle.addEventListener("click", function () {
        var isOpen = subPanel.classList.toggle("is-open");
        subToggle.setAttribute("aria-expanded", String(isOpen));
      });
    }
  }

  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    var status = form.querySelector("[data-form-status]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Demo build: no backend wired up yet. This shows the intended
      // success state so the flow can be reviewed end to end. Swap in a
      // real endpoint (Formspree, Netlify Forms, or a custom API route)
      // before this site goes live.
      status.textContent =
        "Thanks -- this is a demo build so nothing was actually sent. " +
        "Once live, this form will notify Derek's team directly.";
      status.classList.remove("error");
      status.classList.add("success", "is-visible");
      form.reset();
    });
  }

  function initWeatherHook() {
    var el = document.querySelector("[data-weather]");
    if (!el) return;

    // Union, MO coordinates. Open-Meteo is free, keyless, and CORS-open --
    // no backend/API key needed to keep this a pure static site.
    var url =
      "https://api.open-meteo.com/v1/forecast?latitude=38.4508&longitude=-91.0068" +
      "&current=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FChicago";

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("weather fetch failed");
        return res.json();
      })
      .then(function (data) {
        var temp = data && data.current && data.current.temperature_2m;
        if (typeof temp !== "number") return;
        var rounded = Math.round(temp);
        var iconName, message;
        if (rounded <= 45) {
          iconName = "flame";
          message =
            "It's " + rounded + "°F in Union right now — if your furnace can't keep up, we're a call away.";
        } else if (rounded >= 82) {
          iconName = "snowflake";
          message =
            "It's " + rounded + "°F in Union right now — if your AC can't keep up, we're a call away.";
        } else {
          iconName = "clock";
          message =
            "It's " + rounded + "°F in Union right now — a great day for a maintenance checkup.";
        }
        el.innerHTML =
          '<img class="icon" src="assets/img/icons/' + iconName + '.png" width="24" height="24" alt="">' +
          "<span>" + message + "</span>";
      })
      .catch(function () {
        // Weather is a nice-to-have. Fail silently and leave the reserved
        // space empty rather than showing an error or shifting layout.
      });
  }

  function initQuiz() {
    var root = document.querySelector("[data-quiz]");
    if (!root) return;

    var ISSUES = [
      { key: "ac", label: "AC not cooling", icon: "snowflake" },
      { key: "furnace", label: "No heat / furnace issue", icon: "flame" },
      { key: "heatpump", label: "Heat pump trouble", icon: "fan" },
      { key: "iaq", label: "Air quality / comfort", icon: "droplet" },
      { key: "unsure", label: "Not sure / annual checkup", icon: "clock" },
    ];

    var NEEDS = [
      { key: "repair", label: "Repair it ASAP", icon: "wrench" },
      { key: "install", label: "New installation / replacement", icon: "clipboard" },
      { key: "financing", label: "Just exploring financing", icon: "dollar" },
    ];

    var RESULTS = {
      ac_repair: {
        page: "ac-repair-installation.html",
        headline: "Sounds like an AC repair.",
        blurb: "Here's what to expect and how to get a technician out.",
      },
      ac_install: {
        page: "ac-repair-installation.html",
        headline: "Sounds like a new AC install.",
        blurb: "We'll help you find the right unit for your home.",
      },
      furnace_repair: {
        page: "furnace-repair-installation.html",
        headline: "Sounds like a furnace repair.",
        blurb: "Honest estimates from a team you can trust.",
      },
      furnace_install: {
        page: "furnace-repair-installation.html",
        headline: "Sounds like a new furnace install.",
        blurb: "We'll walk you through your options.",
      },
      heatpump_repair: {
        page: "heat-pump-repair-installation.html",
        headline: "Sounds like a heat pump repair.",
        blurb: "We'll get it diagnosed and fixed.",
      },
      heatpump_install: {
        page: "heat-pump-repair-installation.html",
        headline: "Sounds like a new heat pump install.",
        blurb: "One system for heating and cooling.",
      },
      iaq: {
        page: "indoor-air-quality.html",
        headline: "Sounds like an air quality fix.",
        blurb: "A few solutions can make a big difference.",
      },
      unsure: {
        page: "contact.html",
        headline: "Let's get you scheduled for a checkup.",
        blurb: "We'll take a look and let you know exactly what your system needs.",
      },
      financing: {
        page: "financing.html",
        headline: "Let's talk financing options.",
        blurb: "See what competitive financing looks like for a new system.",
      },
    };

    var state = { issue: null, need: null, step: 1 };

    function iconImg(name) {
      return '<img class="icon" src="assets/img/icons/' + name + '.png" width="24" height="24" alt="">';
    }

    function resultKey() {
      if (state.need === "financing") return "financing";
      if (state.issue === "unsure") return "unsure";
      if (state.issue === "iaq") return "iaq";
      return state.issue + "_" + state.need;
    }

    function renderQuestion(question, options, field, stepNum, totalSteps) {
      var opts = options
        .map(function (o) {
          return (
            '<button type="button" class="quiz-option" data-field="' +
            field +
            '" data-value="' +
            o.key +
            '">' +
            iconImg(o.icon) +
            "<span>" + o.label + "</span></button>"
          );
        })
        .join("");
      return (
        '<div class="quiz-progress">Step ' + stepNum + " of " + totalSteps + "</div>" +
        '<h3 class="quiz-question">' + question + "</h3>" +
        '<div class="quiz-options">' + opts + "</div>"
      );
    }

    function renderResult() {
      var r = RESULTS[resultKey()];
      return (
        '<div class="quiz-result">' +
        "<h3>" + r.headline + "</h3>" +
        "<p>" + r.blurb + "</p>" +
        '<div class="quiz-result-actions">' +
        '<a class="btn btn-primary" href="' + r.page + '">View Details</a>' +
        '<a class="btn btn-secondary" href="tel:+16367444646">Call Now</a>' +
        "</div>" +
        '<button type="button" class="quiz-restart" data-quiz-restart>Start Over</button>' +
        "</div>"
      );
    }

    function render() {
      if (state.step === 1) {
        root.innerHTML = renderQuestion("What's going on with your system?", ISSUES, "issue", 1, 2);
      } else if (state.step === 2 && state.issue !== "unsure") {
        root.innerHTML = renderQuestion("What do you need?", NEEDS, "need", 2, 2);
      } else {
        root.innerHTML = renderResult();
      }
      bindEvents();
    }

    function bindEvents() {
      var options = root.querySelectorAll(".quiz-option");
      for (var i = 0; i < options.length; i++) {
        options[i].addEventListener("click", function (event) {
          var btn = event.currentTarget;
          state[btn.getAttribute("data-field")] = btn.getAttribute("data-value");
          state.step += 1;
          render();
        });
      }
      var restart = root.querySelector("[data-quiz-restart]");
      if (restart) {
        restart.addEventListener("click", function () {
          state = { issue: null, need: null, step: 1 };
          render();
        });
      }
    }

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initContactForm();
    initWeatherHook();
    initQuiz();
  });
})();
