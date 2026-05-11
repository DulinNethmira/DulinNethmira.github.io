// ===== NAVBAR SCROLL & MOBILE MENU =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Change navbar background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80; // Adjust for navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve if you only want it to animate once
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-up').forEach(el => {
  observer.observe(el);
});

// ===== ADVANCED FEATURES =====

// 1. Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

if (cursor && cursorFollower && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    cursorFollower.style.left = `${mouseX}px`;
    cursorFollower.style.top = `${mouseY}px`;
  });

  // Hover states for links and buttons
  const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .collection-card, .review-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    });
  });
}

// 2. Magnetic Buttons
const magneticButtons = document.querySelectorAll('.magnetic-btn, .logo');
magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = `translate(0px, 0px)`;
    this.style.transition = 'transform 0.3s ease';
  });
  
  btn.addEventListener('mouseenter', function() {
    this.style.transition = 'none';
  });
});

// 3. 3D Tilt Effect on Cards
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'none';
    card.style.zIndex = '10';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease';
    card.style.zIndex = '1';
  });
});

// 4. Upgraded Scroll Animations
document.querySelectorAll('.animate-up').forEach(el => {
  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
});
