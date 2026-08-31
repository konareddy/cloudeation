/* Cloudeation Technologies — site scripts */
(function () {
  "use strict";

  /* ---- config ---------------------------------------------------------- */
  // To enable real form delivery, create a free form at https://formspree.io
  // and paste its endpoint here (e.g. "https://formspree.io/f/abcdwxyz").
  // While this is empty, the form falls back to opening the visitor's email client.
  var FORMSPREE_ENDPOINT = "";
  var CONTACT_EMAIL = "Hr@cloudeation.net";

  /* ---- mobile nav ----------------------------------------------------- */
  var nav = document.querySelector(".nav");
  var toggle = document.getElementById("navToggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      nav.dataset.open = nav.dataset.open === "true" ? "false" : "true";
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () { nav.dataset.open = "false"; });
    });
  }

  /* ---- reveal on scroll --------------------------------------------- */
  var reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveal.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- stat count-up ----------------------------------------------- */
  var stats = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && stats.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || "";
        var start = null;
        var dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = Math.floor(p * target);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
        so.unobserve(el);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (el) { so.observe(el); });
  }

  /* ---- contact form ------------------------------------------------ */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = form.querySelector(".form__status");
    function setStatus(msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form__status " + (ok ? "ok" : "err");
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        setStatus("Please fill in your name, email and message.", false);
        return;
      }

      if (FORMSPREE_ENDPOINT) {
        setStatus("Sending…", true);
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data
        }).then(function (r) {
          if (r.ok) {
            form.reset();
            setStatus("Thanks — we’ll be in touch shortly.", true);
          } else {
            setStatus("Something went wrong. Please email " + CONTACT_EMAIL + ".", false);
          }
        }).catch(function () {
          setStatus("Network error. Please email " + CONTACT_EMAIL + ".", false);
        });
      } else {
        var subject = encodeURIComponent("Website enquiry from " + name + (company ? " (" + company + ")" : ""));
        var body = encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\nCompany: " + company + "\n\n" + message
        );
        window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
        setStatus("Opening your email app… if nothing happens, write to " + CONTACT_EMAIL + ".", true);
      }
    });
  }

  /* ---- footer year ------------------------------------------------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
