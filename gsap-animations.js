// ===== GSAP ANIMATION ENGINE =====
// Replaces basic IntersectionObserver animations with GSAP + ScrollTrigger
// for premium, cinematic scroll-driven animations.

(function() {
  'use strict';

  // Wait for GSAP to be available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Falling back to CSS animations.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ===== GLOBAL DEFAULTS =====
  gsap.defaults({
    ease: 'power3.out',
    duration: 1
  });

  // ===== DISABLE OLD IntersectionObserver ANIMATIONS =====
  // Remove the CSS-driven .animate-on-scroll initial state so GSAP takes control
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.remove('animate-on-scroll');
    el.classList.add('visible'); 
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    el.style.transition = 'none'; // Kill CSS transitions so GSAP has full control
  });

  // ===== 1. HERO ENTRANCE TIMELINE =====
  function animateHero() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const tl = gsap.timeline({
      delay: 1.8 // Wait for preloader to finish
    });

    // Badge slides in from top
    tl.from('.hero-badge', {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    // Title lines stagger in
    .from('.hero-title', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    }, '-=0.4')
    // Subtitle fades up
    .from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    // Action buttons stagger in
    .from('.hero-actions .btn', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.4)'
    }, '-=0.4')
    // Stats slide in from bottom
    .from('.hero-stats .stat, .hero-stats .stat-divider', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    }, '-=0.3')
    // Scroll indicator pulses in
    .from('.hero-scroll-indicator', {
      opacity: 0,
      y: -10,
      duration: 0.8
    }, '-=0.2');
  }

  // ===== 2. SECTION HEADERS - SPLIT TEXT REVEAL =====
  function animateSectionHeaders() {
    document.querySelectorAll('.section-header').forEach(header => {
      const tag = header.querySelector('.section-tag');
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none'
        }
      });

      if (tag) {
        tl.from(tag, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
      if (title) {
        tl.from(title, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.3');
      }
      if (subtitle) {
        tl.from(subtitle, {
          y: 20,
          opacity: 0,
          duration: 0.7
        }, '-=0.4');
      }
    });
  }

  // ===== 3. SERVICE CARDS - STAGGER REVEAL =====
  function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  // ===== 4. PORTFOLIO / PROJECT CARDS =====
  function animateProjectCards() {
    document.querySelectorAll('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out'
      });
    });
  }

  // ===== 5. TESTIMONIAL CARDS =====
  function animateTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (!cards.length) return;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  // ===== 6. PROCESS STEPS - SEQUENTIAL REVEAL =====
  function animateProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    steps.forEach((step, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      tl.from(step, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate the step number with a scale bounce
      const stepNumber = step.querySelector('.step-number');
      if (stepNumber) {
        tl.from(stepNumber, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)'
        }, '-=0.5');
      }
    });
  }

  // ===== 7. PRICING CARDS - FAN OUT =====
  function animatePricingCards() {
    document.querySelectorAll('.pricing-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.pricing-card');
      if (!cards.length) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    });
  }

  // ===== 8. TRUST SIGNAL CARDS =====
  function animateTrustCards() {
    const cards = document.querySelectorAll('.trust-card');
    if (!cards.length) return;

    gsap.from(cards, {
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  // ===== 9. FAQ ITEMS =====
  function animateFAQ() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    gsap.from(items, {
      scrollTrigger: {
        trigger: items[0].parentElement,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  // ===== 10. CONTACT SECTION =====
  function animateContact() {
    const section = document.querySelector('#contact');
    if (!section) return;

    const elements = section.querySelectorAll('.inquiry-form, .contact-divider, .contact-actions');

    gsap.from(elements, {
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }

  // ===== 11. TOOLS MARQUEE - PARALLAX SPEED =====
  function animateToolsSection() {
    const section = document.querySelector('.tools-section');
    if (!section) return;

    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }

  // ===== 12. ABOUT SECTION =====
  function animateAbout() {
    const section = document.querySelector('#about');
    if (!section) return;

    const image = section.querySelector('.about-image-wrapper');
    const content = section.querySelector('.about-content');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    if (image) {
      tl.from(image, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    if (content) {
      tl.from(content.children, {
        x: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
      }, '-=0.6');
    }
  }

  // ===== 13. PRICING ADD-ON =====
  function animatePricingAddon() {
    const addon = document.querySelector('.pricing-addon');
    if (!addon) return;

    gsap.from(addon, {
      scrollTrigger: {
        trigger: addon,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // ===== 14. PRICING CATEGORY TITLES =====
  function animatePricingCategories() {
    document.querySelectorAll('.pricing-category').forEach(cat => {
      gsap.from(cat, {
        scrollTrigger: {
          trigger: cat,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out'
      });
    });
  }

  // ===== 15. FOOTER REVEAL =====
  function animateFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    gsap.from(footer.children, {
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out'
    });
  }

  // ===== 16. PARALLAX FLOATING EFFECTS =====
  function initParallaxEffects() {
    // Ambient orbs parallax
    document.querySelectorAll('.ambient-orb').forEach((orb, i) => {
      gsap.to(orb, {
        y: () => (i + 1) * -80,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5
        }
      });
    });

    // Hero grid background parallax
    const heroGrid = document.querySelector('.hero-bg-grid');
    if (heroGrid) {
      gsap.to(heroGrid, {
        y: 150,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // ===== 17. MAGNETIC BUTTON UPGRADE =====
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-ghost, .pricing-btn');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.2;

        gsap.to(btn, {
          x: x,
          y: y,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  // ===== 18. SMOOTH COUNTER ANIMATION =====
  function animateCounters() {
    const totalViews = document.getElementById('total-views');
    if (!totalViews) return;

    // Observe for when the count gets updated by the API
    const observer = new MutationObserver(() => {
      const targetValue = parseInt(totalViews.textContent.replace(/,/g, ''));
      if (isNaN(targetValue) || targetValue === 0) return;

      // Animate from 0 to the target
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          totalViews.textContent = Math.floor(obj.val).toLocaleString();
        },
        scrollTrigger: {
          trigger: totalViews,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });

      observer.disconnect();
    });

    observer.observe(totalViews, { childList: true, characterData: true, subtree: true });
  }

  // ===== 19. NAVBAR SCROLL ENHANCEMENTS =====
  function enhanceNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Smarter hide/show on scroll
    let lastScrollY = 0;

    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        const direction = self.direction;
        if (direction === 1 && self.scroll() > 300) {
          // Scrolling down - hide navbar
          gsap.to(navbar, {
            y: -100,
            duration: 0.3,
            ease: 'power2.in'
          });
        } else {
          // Scrolling up - show navbar
          gsap.to(navbar, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    });
  }

  // ===== 20. CARD HOVER 3D TILT =====
  function initCardTilt() {
    const tiltCards = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .trust-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * 8; // degrees
        const tiltY = (x - 0.5) * -8;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // ===== INITIALIZE ALL ANIMATIONS =====
  function init() {
    // Core scroll animations
    animateHero();
    animateSectionHeaders();
    animateServiceCards();
    animateProjectCards();
    animateTestimonials();
    animateProcessSteps();
    animatePricingCategories();
    animatePricingCards();
    animatePricingAddon();
    animateTrustCards();
    animateFAQ();
    animateContact();
    animateToolsSection();
    animateAbout();
    animateFooter();

    // Interactive effects
    initParallaxEffects();
    initMagneticButtons();
    animateCounters();
    enhanceNavbar();
    initCardTilt();

    // Refresh ScrollTrigger after everything is set up
    ScrollTrigger.refresh();
  }

  // Run after DOM is ready and preloader has finished
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
