(function(){
  "use strict";

  var BOOKING_URL = "https://cal.com/alvaro-munoz-invcm6/20min";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initNavTheme();
    initScrollSpy();
    initMobileMenu();
    initHeroIntro();
    initReveal();
    initProblemLines();
    initMethodStory();
    initFaq();
    initCookieConsent();
    initBookingModal();
    initStickyCta();
    initMagnetic();
    initYear();
  });

  /* ---------------- Nav scroll state ---------------- */
  function initNav(){
    var nav = document.querySelector(".nav");
    if (!nav) return;
    function onScroll(){
      if (window.scrollY > 24) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Nav theme (light/dark) per section in view ---------------- */
  function initNavTheme(){
    var nav = document.querySelector("[data-nav]");
    var sections = document.querySelectorAll("[data-theme-section]");
    if (!nav || !sections.length || !("IntersectionObserver" in window)) return;

    function setTheme(theme){
      if (theme === "light"){
        nav.classList.add("theme-light");
        nav.classList.remove("theme-dark");
      } else {
        nav.classList.add("theme-dark");
        nav.classList.remove("theme-light");
      }
    }

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting && entry.intersectionRatio > 0.5){
          setTheme(entry.target.getAttribute("data-theme-section"));
        }
      });
    }, { threshold: [0, 0.5, 1], rootMargin: "-72px 0px -60% 0px" });

    sections.forEach(function(s){ io.observe(s); });
  }

  /* ---------------- Scrollspy: active nav link ---------------- */
  function initScrollSpy(){
    var links = document.querySelectorAll("[data-nav-link]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function(link){
      var id = link.getAttribute("href").replace("#", "");
      var target = document.getElementById(id);
      if (target) map[id] = link;
    });
    var targets = Object.keys(map).map(function(id){ return document.getElementById(id); });
    if (!targets.length) return;

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          links.forEach(function(l){ l.classList.remove("is-active"); });
          map[entry.target.id].classList.add("is-active");
        }
      });
    }, { threshold: 0.4, rootMargin: "-30% 0px -50% 0px" });

    targets.forEach(function(t){ io.observe(t); });
  }

  /* ---------------- Mobile menu ---------------- */
  function initMobileMenu(){
    var openBtn = document.querySelector("[data-menu-open]");
    var closeBtn = document.querySelector("[data-menu-close]");
    var menu = document.querySelector(".mobile-menu");
    if (!openBtn || !menu) return;
    function open(){
      menu.classList.add("is-open");
      document.body.style.overflow = "hidden";
      openBtn.setAttribute("aria-expanded", "true");
    }
    function close(){
      menu.classList.remove("is-open");
      document.body.style.overflow = "";
      openBtn.setAttribute("aria-expanded", "false");
    }
    openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    menu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", close);
    });
  }

  /* ---------------- Hero intro sequence ---------------- */
  function initHeroIntro(){
    var intro = document.querySelector("[data-intro]");
    var hero = document.querySelector(".hero");

    if (prefersReduced || sessionStorage.getItem("sway-intro-seen")) {
      if (intro) intro.remove();
      triggerHeroReveal(hero);
      return;
    }
    if (!intro){
      triggerHeroReveal(hero);
      return;
    }

    var word1 = intro.querySelector(".intro__word--1");
    var word2 = intro.querySelector(".intro__word--2");

    requestAnimationFrame(function(){ word1.classList.add("is-in"); });
    setTimeout(function(){ word1.classList.add("is-out"); }, 750);
    setTimeout(function(){ word1.style.display = "none"; word2.classList.add("is-in"); }, 950);
    setTimeout(function(){ word2.classList.add("is-out"); }, 1700);
    setTimeout(function(){
      intro.classList.add("is-done");
      triggerHeroReveal(hero);
      sessionStorage.setItem("sway-intro-seen", "1");
    }, 2150);
    setTimeout(function(){ intro.remove(); }, 3000);
  }

  function triggerHeroReveal(hero){
    if (hero) hero.classList.add("is-revealed");
    document.querySelectorAll("[data-hero-reveal]").forEach(function(el){
      el.classList.add("reveal-in");
    });
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal(){
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)){
      items.forEach(function(el){ el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function(el){ io.observe(el); });
  }

  /* ---------------- "The Problem" line-by-line lighting ---------------- */
  function initProblemLines(){
    var lines = document.querySelectorAll("[data-problem-line]");
    if (!lines.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)){
      lines.forEach(function(l){ l.classList.add("is-lit"); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          var delay = parseInt(entry.target.getAttribute("data-delay") || "0", 10);
          setTimeout(function(){ entry.target.classList.add("is-lit"); }, delay);
        }
      });
    }, { threshold: 0.6 });
    lines.forEach(function(l){ io.observe(l); });
  }

  /* ---------------- Method — sticky editorial story ---------------- */
  function initMethodStory(){
    var steps = document.querySelectorAll("[data-method-step]");
    var numEl = document.querySelector("[data-method-num]");
    var labelEl = document.querySelector("[data-method-label]");
    if (!steps.length || !numEl || !labelEl) return;

    if (!("IntersectionObserver" in window)){
      steps.forEach(function(s){ s.classList.add("is-active"); });
      return;
    }

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          steps.forEach(function(s){ s.classList.remove("is-active"); });
          entry.target.classList.add("is-active");
          numEl.style.opacity = 0;
          labelEl.style.opacity = 0;
          setTimeout(function(){
            numEl.textContent = entry.target.getAttribute("data-num");
            labelEl.textContent = entry.target.getAttribute("data-label");
            numEl.style.opacity = 1;
            labelEl.style.opacity = 1;
          }, 150);
        }
      });
    }, { threshold: 0.55 });

    steps.forEach(function(s){ io.observe(s); });
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaq(){
    var items = document.querySelectorAll(".faq__item");
    items.forEach(function(item){
      var btn = item.querySelector(".faq__q");
      var panel = item.querySelector(".faq__a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function(){
        var isOpen = item.classList.contains("is-open");
        items.forEach(function(other){
          other.classList.remove("is-open");
          other.querySelector(".faq__a").style.maxHeight = null;
          other.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen){
          item.classList.add("is-open");
          panel.style.maxHeight = panel.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------------- Cookie consent ---------------- */
  function initCookieConsent(){
    var STORAGE_KEY = "sway-cookie-consent";
    var banner = document.querySelector("[data-cookie-banner]");
    var modal = document.querySelector("[data-cookie-modal]");
    if (!banner) return;

    function getConsent(){
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); }
      catch(e){ return null; }
    }
    function setConsent(value){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      document.dispatchEvent(new CustomEvent("sway:consent", { detail: value }));
    }

    var existing = getConsent();
    if (!existing){
      requestAnimationFrame(function(){
        setTimeout(function(){ banner.classList.add("is-shown"); }, 700);
      });
    }

    var acceptAllBtns = document.querySelectorAll("[data-cookie-accept-all]");
    var rejectBtns = document.querySelectorAll("[data-cookie-reject]");
    var openPrefsBtns = document.querySelectorAll("[data-cookie-preferences]");
    var savePrefsBtn = document.querySelector("[data-cookie-save]");
    var analyticsToggle = document.querySelector("[data-cookie-analytics]");

    acceptAllBtns.forEach(function(b){
      b.addEventListener("click", function(){
        setConsent({ necessary: true, analytics: true, date: new Date().toISOString() });
        banner.classList.remove("is-shown");
        if (modal) modal.classList.remove("is-open");
      });
    });
    rejectBtns.forEach(function(b){
      b.addEventListener("click", function(){
        setConsent({ necessary: true, analytics: false, date: new Date().toISOString() });
        banner.classList.remove("is-shown");
        if (modal) modal.classList.remove("is-open");
      });
    });
    openPrefsBtns.forEach(function(b){
      b.addEventListener("click", function(){
        if (!modal) return;
        var current = getConsent() || { analytics: false };
        if (analyticsToggle) analyticsToggle.checked = !!current.analytics;
        modal.classList.add("is-open");
      });
    });
    if (savePrefsBtn){
      savePrefsBtn.addEventListener("click", function(){
        setConsent({
          necessary: true,
          analytics: analyticsToggle ? analyticsToggle.checked : false,
          date: new Date().toISOString()
        });
        banner.classList.remove("is-shown");
        modal.classList.remove("is-open");
      });
    }
    if (modal){
      modal.addEventListener("click", function(e){
        if (e.target === modal) modal.classList.remove("is-open");
      });
      var closeX = modal.querySelector("[data-cookie-modal-close]");
      if (closeX) closeX.addEventListener("click", function(){ modal.classList.remove("is-open"); });
    }
  }

  /* ---------------- Booking modal (Cal.com) ---------------- */
  function initBookingModal(){
    var modal = document.querySelector("[data-booking-modal]");
    if (!modal) return;
    var body = modal.querySelector("[data-booking-body]");
    var openers = document.querySelectorAll("[data-book-trigger]");
    var closeBtn = modal.querySelector("[data-booking-close]");
    var loaded = false;

    function loadEmbed(){
      if (loaded) return;
      loaded = true;
      var iframe = document.createElement("iframe");
      iframe.src = BOOKING_URL + "?embed=true";
      iframe.title = "Book your free trial with Sway Languages";
      iframe.loading = "lazy";
      iframe.allow = "camera; microphone; autoplay";
      body.innerHTML = "";
      body.appendChild(iframe);
    }

    openers.forEach(function(btn){
      btn.addEventListener("click", function(e){
        e.preventDefault();
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
        loadEmbed();
      });
    });

    function close(){
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    if (closeBtn) closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function(e){
      if (e.target === modal) close();
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  }

  /* ---------------- Sticky mobile CTA ---------------- */
  function initStickyCta(){
    var sticky = document.querySelector("[data-sticky-cta]");
    var hero = document.querySelector(".hero");
    if (!sticky || !hero) return;
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) sticky.classList.remove("is-shown");
        else sticky.classList.add("is-shown");
      });
    }, { threshold: 0 });
    io.observe(hero);
  }

  /* ---------------- Magnetic buttons (desktop only, subtle) ---------------- */
  function initMagnetic(){
    if (prefersReduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    var targets = document.querySelectorAll(".magnetic");
    targets.forEach(function(el){
      var strength = 12;
      el.addEventListener("mousemove", function(e){
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = "translate(" + (x / rect.width) * strength + "px," + (y / rect.height) * strength + "px)";
      });
      el.addEventListener("mouseleave", function(){
        el.style.transform = "translate(0,0)";
      });
    });
  }

  function initYear(){
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }
})();
