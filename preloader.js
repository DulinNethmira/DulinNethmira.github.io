// ===== PREMIUM PRELOADER V2 =====
// Kinetic digit-flip counter, real load tracking, circular mask reveal
// Session-aware: only plays once per browser session
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // --- Session guard: skip on repeat visits within same session ---
  const SK = 'dulin_preloader_v2';
  if (sessionStorage.getItem(SK)) {
    preloader.remove();
    document.body.classList.add('preloader-done');
    // Fire event so hero timeline starts immediately
    window.dispatchEvent(new CustomEvent('preloaderDone'));
    return;
  }
  sessionStorage.setItem(SK, '1');

  // --- Config ---
  const MIN_TIME = 2000;
  const start = Date.now();
  let realProg = 0;
  let dispProg = 0;
  let done = false;

  // --- DOM refs ---
  const counterEl = preloader.querySelector('.preloader-counter');
  const brandEl = preloader.querySelector('.preloader-brand');
  const progLine = preloader.querySelector('.preloader-progress-line');
  const shapes = preloader.querySelectorAll('.preloader-shape');
  const waveEl = preloader.querySelector('.preloader-wave');

  // --- Build digit-flip slots ---
  const slots = [];

  function buildCounter() {
    if (!counterEl) return;
    counterEl.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const wrap = document.createElement('div');
      wrap.className = 'counter-digit-wrapper';
      const inner = document.createElement('div');
      inner.className = 'counter-digit-inner';
      for (let d = 0; d <= 9; d++) {
        const s = document.createElement('span');
        s.textContent = d;
        inner.appendChild(s);
      }
      wrap.appendChild(inner);
      counterEl.appendChild(wrap);
      slots.push(inner);
    }
    const pct = document.createElement('span');
    pct.className = 'counter-percent';
    pct.textContent = '%';
    counterEl.appendChild(pct);
  }

  function setDigits(val) {
    const v = Math.min(100, Math.max(0, Math.round(val)));
    const str = String(v).padStart(3, '0');
    slots.forEach((inner, i) => {
      const d = parseInt(str[i]);
      // Use GSAP for smooth digit flip if available
      if (typeof gsap !== 'undefined' && !REDUCED) {
        gsap.to(inner, {
          y: -(d * inner.children[0].offsetHeight),
          duration: 0.45,
          ease: 'power2.out',
          overwrite: true
        });
      } else {
        inner.style.transform = `translateY(${-(d * 100 / 10)}%)`;
      }
    });
  }

  // --- Track real loading ---
  function trackLoading() {
    const items = [];
    let loaded = 0;
    const update = () => { realProg = items.length ? (loaded / items.length) * 100 : 100; };

    // Images
    document.querySelectorAll('img[src]').forEach(img => {
      items.push(img);
      if (img.complete && img.naturalWidth > 0) { loaded++; return; }
      img.addEventListener('load', () => { loaded++; update(); }, { once: true });
      img.addEventListener('error', () => { loaded++; update(); }, { once: true });
    });

    // Fonts
    if (document.fonts && document.fonts.ready) {
      items.push('fonts');
      document.fonts.ready.then(() => { loaded++; update(); });
    }

    // Window load as final guarantee
    window.addEventListener('load', () => { realProg = 100; }, { once: true });

    update();
    if (items.length === 0) realProg = 100;
  }

  // --- Counter animation loop ---
  function tick() {
    if (done) return;
    const elapsed = Date.now() - start;
    const timeProg = Math.min(100, (elapsed / MIN_TIME) * 80 + 20 * (realProg / 100));
    const target = Math.min(realProg, timeProg);

    dispProg += (target - dispProg) * 0.06;
    setDigits(dispProg);
    if (progLine) progLine.style.width = dispProg + '%';

    if (dispProg >= 99.3 && realProg >= 100 && elapsed >= MIN_TIME) {
      done = true;
      dispProg = 100;
      setDigits(100);
      if (progLine) progLine.style.width = '100%';
      setTimeout(exit, 350);
      return;
    }
    requestAnimationFrame(tick);
  }

  // --- Exit with circular mask reveal ---
  function exit() {
    preloader.classList.add('is-done');

    if (REDUCED) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.3s ease';
      setTimeout(cleanup, 300);
      return;
    }

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ onComplete: cleanup });

      tl.to(counterEl, { y: -80, opacity: 0, scale: 0.7, duration: 0.5, ease: 'power3.in' })
        .to(brandEl, { y: -40, opacity: 0, duration: 0.35, ease: 'power3.in' }, '-=0.4')
        .to(shapes, { scale: 2.5, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power2.in' }, '-=0.35')
        .to(waveEl, { opacity: 0, duration: 0.3 }, '-=0.4')
        .to(preloader, {
          clipPath: 'circle(0% at 50% 50%)',
          duration: 0.9,
          ease: 'power4.inOut'
        }, '-=0.25');
    } else {
      preloader.style.clipPath = 'circle(0% at 50% 50%)';
      preloader.style.transition = 'clip-path 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
      setTimeout(cleanup, 800);
    }
  }

  function cleanup() {
    preloader.remove();
    document.body.classList.add('preloader-done');
    window.dispatchEvent(new CustomEvent('preloaderDone'));
  }

  // --- Animate floating shapes ---
  function animShapes() {
    if (REDUCED || typeof gsap === 'undefined') {
      shapes.forEach(s => { s.style.opacity = '0.5'; });
      return;
    }
    shapes.forEach((sh, i) => {
      gsap.to(sh, { opacity: 0.8, duration: 0.8, delay: i * 0.12, ease: 'power2.out' });
      gsap.to(sh, {
        x: 'random(-25, 25)', y: 'random(-25, 25)', rotation: 'random(-20, 20)',
        duration: 'random(3, 5)', repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.15
      });
    });
  }

  // --- Animate wave SVG ---
  function animWave() {
    if (!waveEl || REDUCED || typeof gsap === 'undefined') return;
    const path = waveEl.querySelector('path');
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut' });
  }

  // --- Init ---
  function init() {
    buildCounter();
    preloader.style.clipPath = 'circle(150% at 50% 50%)';

    // Brand fade-in
    if (brandEl) {
      if (typeof gsap !== 'undefined' && !REDUCED) {
        gsap.fromTo(brandEl, { opacity: 0, y: 15 }, { opacity: 0.5, y: 0, duration: 0.7, delay: 0.4, ease: 'power2.out' });
      } else {
        brandEl.style.opacity = '0.5';
      }
    }

    animShapes();
    animWave();
    trackLoading();
    tick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
