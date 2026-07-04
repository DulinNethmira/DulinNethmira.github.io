// ===== LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER SYNC =====
// Provides inertia-based smooth scrolling and keeps ScrollTrigger in sync.
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Skip entirely if reduced motion or Lenis not loaded
  if (REDUCED || typeof Lenis === 'undefined') {
    console.log('[smooth-scroll] Disabled — reduced motion or Lenis missing.');
    return;
  }

  // Disable native smooth-scroll (Lenis handles it)
  document.documentElement.style.scrollBehavior = 'auto';

  const lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false
  });

  // Expose for other scripts
  window.__lenis = lenis;

  // --- Sync with GSAP ticker ---
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    (function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    })(performance.now());
  }

  // --- Keep ScrollTrigger in sync ---
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  // --- Override anchor-link clicks to use Lenis ---
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var href = this.getAttribute('href');
      if (href === '#' || href === '#home') {
        lenis.scrollTo(0, { duration: 1.4 });
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      }
    });
  });

  // --- Pause Lenis when mobile menu is open ---
  var navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    var observer = new MutationObserver(function () {
      if (navToggle.classList.contains('active')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });
    observer.observe(navToggle, { attributes: true, attributeFilter: ['class'] });
  }

  // --- Refresh on resize + font/image load ---
  var refreshTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(function () {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 200);
  });

  window.addEventListener('load', function () {
    setTimeout(function () {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 300);
  });

  // --- Custom thin scrollbar ---
  var style = document.createElement('style');
  style.textContent =
    '::-webkit-scrollbar{width:6px}' +
    '::-webkit-scrollbar-track{background:transparent}' +
    '::-webkit-scrollbar-thumb{background:rgba(129,140,248,0.25);border-radius:3px}' +
    '::-webkit-scrollbar-thumb:hover{background:rgba(129,140,248,0.45)}' +
    'html{scrollbar-width:thin;scrollbar-color:rgba(129,140,248,0.25) transparent}';
  document.head.appendChild(style);

})();
