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
  initPortfolioTabs();
  initInquiryForm();
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



// 9. Visitor Counter (Total Views - Unique)
async function updateVisitorCount() {
  const totalViewsEl = document.getElementById('total-views');
  if (!totalViewsEl) return;

  const storageKey = 'dulin_visited_unique';
  const hasVisited = localStorage.getItem(storageKey);

  try {
    let url = 'https://api.counterapi.dev/v1/dulindesigns/unique_visits/up';
    
    // If they already visited, just GET the count without increasing it
    if (hasVisited) {
      url = 'https://api.counterapi.dev/v1/dulindesigns/unique_visits';
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

// ===== PORTFOLIO TABS =====
function initPortfolioTabs() {
  const tabs = document.querySelectorAll('.portfolio-tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active to clicked tab
      tab.classList.add('active');
      const targetId = `tab-${tab.dataset.tab}`;
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// ===== INQUIRY FORM =====
function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  const errorEl = document.getElementById('form-error');
  const nameInput = document.getElementById('inquiry-name');
  const contactInput = document.getElementById('inquiry-contact');
  const businessInput = document.getElementById('inquiry-business');
  const serviceSelect = document.getElementById('inquiry-service');
  const budgetSelect = document.getElementById('inquiry-budget');
  const deadlineInput = document.getElementById('inquiry-deadline');
  const messageInput = document.getElementById('inquiry-message');

  // Clear error styling on input
  [nameInput, contactInput, serviceSelect, messageInput].forEach(el => {
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('form-input--error');
        if (errorEl) errorEl.textContent = '';
      });
      el.addEventListener('change', () => {
        el.classList.remove('form-input--error');
        if (errorEl) errorEl.textContent = '';
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    [nameInput, contactInput, serviceSelect, messageInput].forEach(el => {
      if (el) el.classList.remove('form-input--error');
    });
    if (errorEl) errorEl.textContent = '';

    // Validate required fields
    const errors = [];
    if (!nameInput.value.trim()) {
      nameInput.classList.add('form-input--error');
      errors.push('Name');
    }
    if (!contactInput.value.trim()) {
      contactInput.classList.add('form-input--error');
      errors.push('Contact info');
    }
    if (!serviceSelect.value) {
      serviceSelect.classList.add('form-input--error');
      errors.push('Service needed');
    }
    if (!messageInput.value.trim()) {
      messageInput.classList.add('form-input--error');
      errors.push('Message');
    }

    if (errors.length > 0) {
      if (errorEl) errorEl.textContent = `Please fill in: ${errors.join(', ')}`;
      return;
    }

    // Build the Discord webhook payload
    const webhookUrl = 'https://discord.com/api/webhooks/1520320753122152500/7ogNoQwyvP8rcMjMCqxIuKPjqx2aOEyDjAIke3BqyKaLKBM3HFpsOWzeWXvCZ5rxMV6f';

    const embed = {
      title: "New Project Inquiry",
      color: 0x818cf8, // matching your accent color
      fields: [
        { name: "Name", value: nameInput.value.trim(), inline: true },
        { name: "Contact", value: contactInput.value.trim(), inline: true },
        { name: "Service", value: serviceSelect.value, inline: true },
      ],
      timestamp: new Date().toISOString()
    };

    if (businessInput.value.trim()) {
      embed.fields.push({ name: "Business/Channel", value: businessInput.value.trim(), inline: false });
    }
    if (budgetSelect.value) {
      embed.fields.push({ name: "Budget", value: budgetSelect.value, inline: true });
    }
    if (deadlineInput.value.trim()) {
      embed.fields.push({ name: "Deadline", value: deadlineInput.value.trim(), inline: true });
    }
    embed.fields.push({ name: "Message", value: messageInput.value.trim(), inline: false });

    const payload = {
      content: "<@963617561226924133> You have a new inquiry from your website!", // Pings your Discord ID
      embeds: [embed]
    };

    // Change button state
    const submitBtn = document.getElementById('form-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        // Show success feedback
        submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Inquiry Sent!`;
        submitBtn.style.background = '#25d366'; // Green success color
        form.reset(); // clear the form
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }, 4000);
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      console.error('Error sending webhook:', error);
      if (errorEl) errorEl.textContent = 'Failed to send inquiry. Please try contacting via WhatsApp or Email instead.';
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    });
  });
}

// Call inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  updateVisitorCount();
});



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


