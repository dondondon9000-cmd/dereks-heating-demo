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

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initContactForm();
  });
})();
