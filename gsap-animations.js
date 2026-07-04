// ===== GSAP ANIMATION ENGINE V2 =====
// Award-tier motion design: text splitting, scroll-scrubbed parallax,
// horizontal project gallery, custom cursor, magnetic hover, and more.
// Syncs with Lenis smooth scroll and the new preloader.

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[gsap-v2] GSAP/ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches;
  const IS_MOBILE = window.innerWidth < 768;
  const IS_TABLET = window.innerWidth < 1024;

  // ===== UTILITY: Lightweight Text Splitter (free SplitText alternative) =====
  function splitText(el, type) {
    // type: 'chars' | 'words' | 'lines'
    if (!el) return [];
    const text = el.textContent;
    el.setAttribute('aria-label', text);
    el.innerHTML = '';

    if (type === 'chars') {
      var chars = [];
      // Split by words first, then chars, preserving spaces
      text.split(/(\s+)/).forEach(function (segment) {
        if (/^\s+$/.test(segment)) {
          var sp = document.createElement('span');
          sp.innerHTML = '&nbsp;';
          sp.style.display = 'inline-block';
          el.appendChild(sp);
        } else {
          var wordWrap = document.createElement('span');
          wordWrap.style.display = 'inline-block';
          wordWrap.style.whiteSpace = 'nowrap';
          segment.split('').forEach(function (c) {
            var span = document.createElement('span');
            span.textContent = c;
            span.style.display = 'inline-block';
            span.className = 'split-char';
            wordWrap.appendChild(span);
            chars.push(span);
          });
          el.appendChild(wordWrap);
        }
      });
      return chars;
    }

    if (type === 'words') {
      var words = [];
      text.split(/(\s+)/).forEach(function (w) {
        if (/^\s+$/.test(w)) {
          var sp = document.createElement('span');
          sp.innerHTML = '&nbsp;';
          sp.style.display = 'inline-block';
          el.appendChild(sp);
        } else {
          var span = document.createElement('span');
          span.textContent = w;
          span.style.display = 'inline-block';
          span.className = 'split-word';
          el.appendChild(span);
          words.push(span);
        }
      });
      return words;
    }

    return [];
  }

  // ===== GLOBAL DEFAULTS =====
  gsap.defaults({ ease: 'power3.out', duration: 1 });

  // ===== DISABLE OLD IntersectionObserver ANIMATIONS =====
  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    el.classList.remove('animate-on-scroll');
    el.classList.add('visible');
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.style.transition = 'none';
  });

  // Strip CSS transitions from cards to avoid fighting GSAP
  document.querySelectorAll('.service-card, .pricing-card, .project-card, .testimonial-card, .trust-card').forEach(function (c) {
    c.style.transition = 'none';
  });

  // ===== 1. HERO ENTRANCE (synced with preloader exit) =====
  function animateHero() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var tl = gsap.timeline({ paused: true });

    tl.fromTo('.hero-badge',
      { y: -40, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, 0
    )
    .fromTo('.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 0.15
    )
    .fromTo('.hero-subtitle',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }, 0.4
    )
    .fromTo('.hero-actions .btn',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)', clearProps: 'all' }, 0.55
    )
    .fromTo('.hero-stats .stat, .hero-stats .stat-divider',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.7
    )
    .fromTo('.hero-scroll-indicator',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8 }, 0.9
    );

    // Sync with preloader exit
    function playHero() { tl.play(); }

    if (document.body.classList.contains('preloader-done')) {
      // Preloader already gone (session revisit)
      tl.delay(0.2).play();
    } else {
      window.addEventListener('preloaderDone', playHero, { once: true });
      // Safety fallback
      setTimeout(function () {
        if (tl.paused()) tl.play();
      }, 5000);
    }
  }

  // ===== 2. SCROLL-SCRUBBED HERO PARALLAX =====
  function heroParallax() {
    if (REDUCED || IS_MOBILE) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;

    gsap.to('.hero-container', {
      y: 120, scale: 0.92, opacity: 0.3, filter: 'blur(4px)',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 }
    });

    gsap.to('.hero-bg-grid', {
      y: 200,
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 }
    });

    // Parallax ambient orbs
    document.querySelectorAll('.ambient-orb').forEach(function (orb, i) {
      gsap.to(orb, {
        y: function () { return (i + 1) * -100; },
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
      });
    });
  }

  // ===== 3. SECTION HEADERS =====
  function animateSectionHeaders() {
    document.querySelectorAll('.section-header').forEach(function (header) {
      var tag = header.querySelector('.section-tag');
      var title = header.querySelector('.section-title');
      var subtitle = header.querySelector('.section-subtitle');

      var tl = gsap.timeline({
        scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' }
      });

      if (tag) tl.fromTo(tag, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
      if (title) tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, tag ? '-=0.3' : 0);
      if (subtitle) tl.fromTo(subtitle, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.35');
    });
  }

  // ===== 4. SERVICE CARDS — 3D perspective tilt on scroll =====
  function animateServiceCards() {
    var cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    gsap.fromTo(cards,
      { y: 60, opacity: 0 },
      {
        scrollTrigger: { trigger: cards[0].parentElement, start: 'top 80%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        clearProps: 'transition',
        onComplete: function () {
          // Re-enable hover transitions after entrance
          cards.forEach(function (c) { c.style.transition = ''; });
        }
      }
    );

    // Subtle scroll-driven 3D perspective shift per card
    if (!REDUCED && !IS_MOBILE) {
      cards.forEach(function (card) {
        gsap.to(card, {
          rotateY: 3, rotateX: -2, transformPerspective: 800,
          scrollTrigger: {
            trigger: card, start: 'top 90%', end: 'top 30%', scrub: 1.5,
            onLeave: function () { gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6 }); }
          }
        });
      });
    }
  }

  // ===== 5. PROJECTS GALLERY =====
  function animateProjects() {
    var cards = document.querySelectorAll('.project-card');
    if (!cards.length) return;

    // Standard card entrance for all viewports
    cards.forEach(function (card, i) {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          y: 0, opacity: 1, duration: 0.8, delay: (i % 2) * 0.1, ease: 'power3.out', clearProps: 'transition'
        }
      );
    });
  }

  // ===== 6. PROCESS STEPS — SVG line draw =====
  function animateProcessSteps() {
    var steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    steps.forEach(function (step, i) {
      var tl = gsap.timeline({
        scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' }
      });

      tl.fromTo(step,
        { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      var num = step.querySelector('.step-number');
      if (num) {
        tl.fromTo(num,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.5'
        );
      }
    });

    // SVG connecting line draw (scrubbed to scroll)
    var processGrid = document.querySelector('.process-grid');
    if (processGrid && !REDUCED && !IS_MOBILE) {
      var line = processGrid.querySelector('::before');
      // Animate the pseudo-element via scaleX
      gsap.fromTo(processGrid,
        { '--line-scale': 0 },
        {
          '--line-scale': 1,
          scrollTrigger: { trigger: processGrid, start: 'top 70%', end: 'bottom 50%', scrub: 1 }
        }
      );
    }
  }

  // ===== 7. TESTIMONIALS =====
  function animateTestimonials() {
    var cards = document.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: { trigger: cards[0].parentElement, start: 'top 80%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'transition'
      }
    );
  }

  // ===== 8. PRICING =====
  function animatePricing() {
    document.querySelectorAll('.pricing-category').forEach(function (cat) {
      gsap.fromTo(cat, { y: 20, opacity: 0 }, {
        scrollTrigger: { trigger: cat, start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.7
      });
    });

    document.querySelectorAll('.pricing-grid').forEach(function (grid) {
      var cards = grid.querySelectorAll('.pricing-card');
      if (!cards.length) return;
      gsap.fromTo(cards,
        { y: 60, opacity: 0, scale: 0.92 },
        {
          scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none none' },
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', clearProps: 'transition,transform'
        }
      );
    });

    var addon = document.querySelector('.pricing-addon');
    if (addon) {
      gsap.fromTo(addon, { y: 30, opacity: 0 }, {
        scrollTrigger: { trigger: addon, start: 'top 85%', toggleActions: 'play none none none' },
        y: 0, opacity: 1, duration: 0.8, clearProps: 'transition'
      });
    }
  }

  // ===== 9. TRUST CARDS =====
  function animateTrust() {
    var cards = document.querySelectorAll('.trust-card');
    if (!cards.length) return;
    gsap.fromTo(cards, { y: 40, opacity: 0 }, {
      scrollTrigger: { trigger: cards[0].parentElement, start: 'top 80%', toggleActions: 'play none none none' },
      y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out', clearProps: 'transition'
    });
  }

  // ===== 10. FAQ =====
  function animateFAQ() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    gsap.fromTo(items, { y: 30, opacity: 0 }, {
      scrollTrigger: { trigger: items[0].parentElement, start: 'top 80%', toggleActions: 'play none none none' },
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1
    });
  }

  // ===== 11. ABOUT =====
  function animateAbout() {
    var section = document.querySelector('#about');
    if (!section) return;
    var image = section.querySelector('.about-image-wrapper');
    var content = section.querySelector('.about-content');

    var tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
    });

    if (image) tl.fromTo(image, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    if (content) tl.fromTo(content.children, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, '-=0.6');
  }

  // ===== 12. CONTACT =====
  function animateContact() {
    var section = document.querySelector('#contact');
    if (!section) return;
    var els = section.querySelectorAll('.inquiry-form, .contact-divider, .contact-actions');
    gsap.fromTo(els, { y: 40, opacity: 0 }, {
      scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15
    });
  }

  // ===== 13. TOOLS MARQUEE =====
  function animateTools() {
    var section = document.querySelector('.tools-section');
    if (!section) return;
    gsap.fromTo(section, { opacity: 0 }, {
      scrollTrigger: { trigger: section, start: 'top 90%', toggleActions: 'play none none none' },
      opacity: 1, duration: 1
    });
  }

  // ===== 14. FOOTER =====
  function animateFooter() {
    var footer = document.querySelector('.footer');
    if (!footer) return;
    gsap.fromTo(footer.children, { y: 30, opacity: 0 }, {
      scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none none' },
      y: 0, opacity: 1, duration: 0.8, stagger: 0.12
    });
  }

  // ===== 15. MAGNETIC HOVER (gsap.quickTo) =====
  function initMagneticHover() {
    if (REDUCED || IS_TOUCH) return;

    var targets = document.querySelectorAll('.btn-primary, .btn-ghost, .btn-whatsapp, .pricing-btn, .nav-link');

    targets.forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = (e.clientX - rect.left - rect.width / 2) * 0.25;
        var dy = (e.clientY - rect.top - rect.height / 2) * 0.25;
        xTo(dx);
        yTo(dy);
      });

      el.addEventListener('mouseleave', function () {
        xTo(0);
        yTo(0);
      });
    });
  }

  // ===== 16. CUSTOM CURSOR =====
  function initCustomCursor() {
    if (REDUCED || IS_TOUCH) return;

    // Create cursor elements
    var dot = document.createElement('div');
    dot.className = 'cursor-dot';
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var dotX = gsap.quickTo(dot, 'left', { duration: 0.1, ease: 'power2.out' });
    var dotY = gsap.quickTo(dot, 'top', { duration: 0.1, ease: 'power2.out' });
    var ringX = gsap.quickTo(ring, 'left', { duration: 0.35, ease: 'power2.out' });
    var ringY = gsap.quickTo(ring, 'top', { duration: 0.35, ease: 'power2.out' });

    document.addEventListener('mousemove', function (e) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    });

    // Scale/invert on interactive elements
    var interactives = 'a, button, .project-card, .pricing-card, .service-card, .trust-card, .testimonial-card, input, select, textarea';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactives)) {
        dot.classList.add('cursor-active');
        ring.classList.add('cursor-active');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactives)) {
        dot.classList.remove('cursor-active');
        ring.classList.remove('cursor-active');
      }
    });

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

  // ===== 17. SCROLL PROGRESS BAR (GSAP-driven) =====
  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;

    gsap.to(bar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  }

  // ===== 18. CARD 3D TILT (hover) =====
  function initCardTilt() {
    if (REDUCED || IS_TOUCH) return;

    var cards = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .trust-card, .project-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        gsap.to(card, {
          rotateX: (y - 0.5) * 10,
          rotateY: (x - 0.5) * -10,
          transformPerspective: 800,
          duration: 0.4, ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', function () {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  // ===== 19. NAVBAR ENHANCEMENTS =====
  function enhanceNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: function (self) {
        if (self.direction === 1 && self.scroll() > 300) {
          gsap.to(navbar, { y: -100, duration: 0.3, ease: 'power2.in' });
        } else {
          gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power2.out' });
        }
      }
    });
  }

  // ===== 20. COUNTER ANIMATION =====
  function animateCounters() {
    var el = document.getElementById('total-views');
    if (!el) return;

    var obs = new MutationObserver(function () {
      var target = parseInt(el.textContent.replace(/,/g, ''));
      if (isNaN(target) || target === 0) return;
      var obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 2, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.floor(obj.val).toLocaleString(); },
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
      });
      obs.disconnect();
    });
    obs.observe(el, { childList: true, characterData: true, subtree: true });
  }

  // ===== INIT =====
  function init() {
    if (REDUCED) {
      // Reduced-motion mode: simple opacity fades only
      document.querySelectorAll('.section-header, .service-card, .project-card, .pricing-card, .testimonial-card, .trust-card, .process-step, .faq-item, .about-image-wrapper, .about-content').forEach(function (el) {
        gsap.fromTo(el, { opacity: 0 }, {
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          opacity: 1, duration: 0.6
        });
      });
      animateHero();
      initScrollProgress();
      enhanceNavbar();
      animateCounters();
    } else {
      animateHero();
      heroParallax();
      animateSectionHeaders();
      animateServiceCards();
      animateProjects();
      animateProcessSteps();
      animateTestimonials();
      animatePricing();
      animateTrust();
      animateFAQ();
      animateAbout();
      animateContact();
      animateTools();
      animateFooter();

      initMagneticHover();
      initCustomCursor();
      initScrollProgress();
      initCardTilt();
      enhanceNavbar();
      animateCounters();
    }

    // Refresh after layout settles
    setTimeout(function () { ScrollTrigger.refresh(); }, 200);
    window.addEventListener('load', function () {
      setTimeout(function () { ScrollTrigger.refresh(); }, 500);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
