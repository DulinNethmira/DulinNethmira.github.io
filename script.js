// ===== TYPING EFFECT =====
const typedEl = document.getElementById('hero-typed');
const words = ['websites.', 'videos.', 'brands.', 'content.', 'experiences.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typedEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typedEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 600);
});


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ===== MOBILE MENU =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});


// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  scrollObserver.observe(el);
});


// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


// ===== ACTIVE NAV LINK on scroll =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-link'));
      navLink.classList.add('active-link');
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all open FAQs
    faqItems.forEach(otherItem => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// 5. Email Copy to Clipboard
const emailBtn = document.getElementById('email-btn');
if (emailBtn) {
  emailBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const email = 'dulinethmira08@gmail.com';
    const originalText = this.innerHTML;

    const showSuccess = () => {
      this.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Email Copied!
      `;
      this.style.backgroundColor = 'var(--accent)';
      this.style.color = 'white';

      setTimeout(() => {
        window.location.href = `mailto:${email}`;
      }, 500);

      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.backgroundColor = '';
        this.style.color = '';
      }, 2500);
    };

    // Modern API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(showSuccess).catch(() => {
        // Fallback if modern API fails
        copyFallback(email, showSuccess);
      });
    } else {
      // Direct fallback
      copyFallback(email, showSuccess);
    }
  });
}

function copyFallback(text, callback) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    callback();
  } catch (err) {
    console.error('Fallback copy failed', err);
    window.location.href = `mailto:dulinethmira08@gmail.com`;
  }
  document.body.removeChild(textArea);
}

// 6. Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
  }, 1500); // Give users time to see the animation
});

// 7. Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  const scrollValue = (window.scrollY / scrollTotal) * 100;
  if (scrollProgress) scrollProgress.style.width = scrollValue + '%';
});

// 9. Visitor Counter (Total Views - Unique)
async function updateVisitorCount() {
  const totalViewsEl = document.getElementById('total-views');
  if (!totalViewsEl) return;

  const storageKey = 'dulin_visited_unique';
  const hasVisited = localStorage.getItem(storageKey);

  try {
    let url = 'https://api.counterapi.dev/v1/dulindesigns/visits/up';
    
    // If they already visited, just GET the count without increasing it
    if (hasVisited) {
      url = 'https://api.counterapi.dev/v1/dulindesigns/visits';
    }

    const response = await fetch(url);
    const data = await response.json();
    totalViewsEl.textContent = data.count.toLocaleString();

    // Mark as visited so refresh doesn't increase it
    if (!hasVisited) {
      localStorage.setItem(storageKey, 'true');
    }
  } catch (error) {
    console.error('CounterAPI Error:', error);
    totalViewsEl.textContent = '12';
  }
}

// ===== ADVANCED NAVBAR ANIMATIONS =====
function initAdvancedNav() {
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const indicator = document.querySelector('.nav-indicator');

  if (!navMenu || !indicator) return;

  // 1. Sliding Indicator Logic
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const rect = link.getBoundingClientRect();
      const parentRect = navMenu.getBoundingClientRect();
      
      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.opacity = '1';
    });

    // 2. Magnetic Pull Effect
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      link.style.transform = `translate(${x}px, ${y}px)`;
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = `translate(0, 0)`;
    });
  });

  navMenu.addEventListener('mouseleave', () => {
    indicator.style.opacity = '0';
  });

  // 3. Staggered Entrance
  navLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      link.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      link.style.opacity = '1';
      link.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
}

// Call inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  updateVisitorCount();
  initSkillsOrbit();
  initAdvancedNav();
});

// 11. 3D Skills Orbit
function initSkillsOrbit() {
  const container = document.getElementById('skills-orbit');
  if (!container) return;

  const skills = [
    'HTML5', 'CSS3', 'JavaScript', 'Premiere Pro', 'After Effects', 
    'CapCut', 'Photoshop', 'Web Design', 'Video Editing', 'SEO', 
    'UI/UX', 'Responsive', 'Modern Web', 'Animations'
  ];

  const tags = [];
  const radius = container.offsetWidth / 3; // Smaller radius to fit within container

  skills.forEach((skill, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    const el = document.createElement('div');
    el.className = 'skill-tag';
    el.textContent = skill;
    container.appendChild(el);

    tags.push({ el, x, y, z });
  });

  let angleX = 0.001;
  let angleY = 0.001;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    angleX = (e.clientY - rect.top - rect.height / 2) * 0.00005;
    angleY = (e.clientX - rect.left - rect.width / 2) * 0.00005;
  });

  function rotate() {
    tags.forEach(tag => {
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Rotate around X axis
      const y1 = tag.y * cosX - tag.z * sinX;
      const z1 = tag.z * cosX + tag.y * sinX;
      tag.y = y1;
      tag.z = z1;

      // Rotate around Y axis
      const x2 = tag.x * cosY + tag.z * sinY;
      const z2 = tag.z * cosY - tag.x * sinY;
      tag.x = x2;
      tag.z = z2;

      // Perspective
      const scale = 1000 / (1000 + tag.z);
      const alpha = (tag.z + radius) / (2 * radius);

      tag.el.style.transform = `translate3d(${tag.x * scale}px, ${tag.y * scale}px, 0) scale(${scale})`;
      tag.el.style.opacity = alpha + 0.2;
      tag.el.style.zIndex = Math.floor(scale * 100);
    });
    requestAnimationFrame(rotate);
  }
  rotate();
}

// 12. Luxury Smooth Scroll
let currentScroll = 0;
let targetScroll = 0;
const ease = 0.075;

window.addEventListener('scroll', () => {
  targetScroll = window.scrollY;
});

// We only use this for a subtle "heavy" feel if not on mobile
if (window.matchMedia("(pointer: fine)").matches) {
  function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * ease;
    // Note: We don't want to actually move the scroll here as it conflicts with native scroll
    // but we can use this value for parallax effects later if needed.
    // For a true "Lenis" effect, we would need to hijack the wheel event, 
    // but for now, the native scroll behavior is safe and reliable.
    requestAnimationFrame(smoothScroll);
  }
  smoothScroll();
}

// 8. Interactive Services Reveal (Mouse Tracking)
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// 4. Upgraded Scroll Animations
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
});
