/* =====================================================================
   Sonja Schneider – Systemisches Coaching
   Interaktion: Navigation, Scroll-Spy, Header-State, Reveal, Formular
   ===================================================================== */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Jahr im Footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* =====================================================================
     Intro-Animation: Loader-Reveal + gestaffelte Hero-Reveals
     ===================================================================== */
  var intro = document.getElementById("intro");

  // Headline wortweise in Masken verpacken (für den Reveal von unten)
  function splitHeading() {
    var h = document.querySelector("[data-animate-heading]");
    if (!h || h.dataset.split === "1") return;
    var words = h.textContent.trim().split(/\s+/);
    var frag = document.createDocumentFragment();
    words.forEach(function (word, i) {
      var mask = document.createElement("span");
      mask.className = "w-mask";
      var inner = document.createElement("span");
      inner.className = "w-inner";
      inner.style.setProperty("--wi", i);
      inner.textContent = word;
      mask.appendChild(inner);
      frag.appendChild(mask);
      if (i < words.length - 1) frag.appendChild(document.createTextNode(" "));
    });
    h.textContent = "";
    h.appendChild(frag);
    h.dataset.split = "1";
  }

  function revealHero() {
    docEl.classList.add("reveal-hero");
  }

  function runIntro() {
    if (!intro) { revealHero(); return; }

    splitHeading();

    var seen = false;
    try { seen = sessionStorage.getItem("sonja_intro") === "1"; } catch (e) {}

    // Reduzierte Bewegung oder bereits gesehen: Intro überspringen
    if (prefersReduced || seen) {
      intro.parentNode && intro.parentNode.removeChild(intro);
      revealHero();
      return;
    }

    document.body.style.overflow = "hidden";

    // Sequenz: Wortmarke einlaufen → Overlay hochziehen + Hero enthüllen → aufräumen
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { intro.classList.add("is-in"); });
    });

    window.setTimeout(function () {
      intro.classList.add("is-out");
      revealHero();
    }, 1450);

    window.setTimeout(function () {
      document.body.style.overflow = "";
      intro.parentNode && intro.parentNode.removeChild(intro);
      try { sessionStorage.setItem("sonja_intro", "1"); } catch (e) {}
    }, 2500);
  }

  // Erst nach vollständigem Laden starten (Schriften/Bild), max. kurze Wartezeit
  if (document.readyState === "complete") {
    runIntro();
  } else {
    var started = false;
    var start = function () { if (!started) { started = true; runIntro(); } };
    window.addEventListener("load", start);
    window.setTimeout(start, 900); // Sicherheitsnetz, falls "load" spät kommt
  }

  /* ---------- Mobile-Navigation ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Menü öffnen");
    nav.classList.remove("is-open");
  }
  function openNav() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Menü schließen");
    nav.classList.add("is-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      open ? closeNav() : openNav();
    });
    // Nach Klick auf einen Anker-Link Menü schließen
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    // ESC schließt das Menü
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    // Zurück auf Desktop-Breite: Menü zurücksetzen
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeNav();
    });
  }

  /* ---------- Header-Schatten beim Scrollen ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll-Spy: aktive Navigation ---------- */
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.nav__cta)')) : [];
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + id;
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll-Reveal ---------- */
  // Auf den Rechtsseiten jeden Textblock einzeln einblenden ("fade in bei Absätzen")
  var legalWrap = document.querySelector(".legal .wrap");
  if (legalWrap) {
    Array.prototype.forEach.call(
      legalWrap.querySelectorAll("h1, h2, h3, p, ul, .placeholder-box"),
      function (el) { el.classList.add("reveal"); }
    );
  }

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var reduceMotion = prefersReduced;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    reveals.forEach(function (el) { revObserver.observe(el); });
  }

  /* ---------- Kontaktformular ---------- */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var successPanel = document.getElementById("form-success");
  var errorBox = document.getElementById("form-error");
  var errorText = document.getElementById("form-error-text");
  var submitBtn = document.getElementById("submit-btn");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function fieldWrap(input) { return input.closest(".field"); }

  function showFieldError(input, message) {
    var wrap = fieldWrap(input);
    if (wrap) wrap.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    if (message) {
      var err = wrap && wrap.querySelector(".error");
      if (err) err.textContent = message;
    }
  }
  function clearFieldError(input) {
    var wrap = fieldWrap(input);
    if (wrap) wrap.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
  }

  function validate() {
    var ok = true;
    var name = form.elements["name"];
    var email = form.elements["email"];

    if (!name.value.trim()) { showFieldError(name); ok = false; } else { clearFieldError(name); }
    if (!EMAIL_RE.test(email.value.trim())) { showFieldError(email); ok = false; } else { clearFieldError(email); }
    return ok;
  }

  // Live-Fehler beim Verlassen / Tippen zurücksetzen
  ["name", "email"].forEach(function (n) {
    var el = form.elements[n];
    el.addEventListener("blur", function () {
      if (n === "email" && el.value.trim() && !EMAIL_RE.test(el.value.trim())) showFieldError(el);
      else if (!el.value.trim() && el.required) showFieldError(el);
      else clearFieldError(el);
    });
    el.addEventListener("input", function () {
      if (fieldWrap(el).classList.contains("has-error")) clearFieldError(el);
      hideStatus();
    });
  });

  function hideStatus() {
    if (errorBox) errorBox.classList.remove("is-visible");
  }
  function showError(msg) {
    if (!errorBox) return;
    if (msg && errorText) errorText.textContent = msg;
    errorBox.classList.add("is-visible");
  }

  var MAILTO_FALLBACK = "sonja.schneider.88@gmail.com"; // vorläufig Gmail (siehe README)

  function mailtoFallback() {
    var name = encodeURIComponent(form.elements["name"].value.trim());
    var email = encodeURIComponent(form.elements["email"].value.trim());
    var format = encodeURIComponent((form.querySelector('input[name="format"]:checked') || {}).value || "");
    var message = encodeURIComponent(form.elements["message"].value.trim());
    var body =
      "Name: " + name + "%0D%0A" +
      "E-Mail: " + email + "%0D%0A" +
      "Wunsch-Format: " + format + "%0D%0A%0D%0A" +
      "Nachricht:%0D%0A" + message;
    window.location.href =
      "mailto:" + MAILTO_FALLBACK + "?subject=" + encodeURIComponent("Coaching-Anfrage über die Website") + "&body=" + body;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    hideStatus();

    if (!validate()) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var action = form.getAttribute("action") || "";
    var configured = action.indexOf("your-form-id") === -1 && action.indexOf("formspree.io") !== -1;

    // Solange keine echte Formspree-ID hinterlegt ist: sauberer mailto-Fallback.
    if (!configured) {
      mailtoFallback();
      return;
    }

    var original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet …";

    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (res.ok) {
          form.style.display = "none";
          if (successPanel) {
            successPanel.classList.add("is-visible");
            successPanel.setAttribute("tabindex", "-1");
            successPanel.focus();
          }
        } else {
          return res.json().then(function (data) {
            var msg = data && data.errors && data.errors.length
              ? data.errors.map(function (x) { return x.message; }).join(" ")
              : null;
            showError(msg || undefined);
          });
        }
      })
      .catch(function () {
        showError("Verbindung fehlgeschlagen. Bitte prüfe deine Internetverbindung oder schreib mir direkt eine E-Mail.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
      });
  });
})();
