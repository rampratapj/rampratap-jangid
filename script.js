/* =========================================
   RAMPRATAP JANGID — PORTFOLIO SCRIPTS
   ========================================= */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (follower) {
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand cursor on hover
document.querySelectorAll('a, button, .project-card, .tool-item, .award-card, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor?.classList.add('expanded');
    follower?.classList.add('expanded');
  });
  el.addEventListener('mouseleave', () => {
    cursor?.classList.remove('expanded');
    follower?.classList.remove('expanded');
  });
});

// ===== NAV: SCROLL EFFECT + ACTIVE LINK =====
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Sticky nav
  if (window.scrollY > 60) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Scroll-to-top visibility
  const scrollBtn = document.getElementById('scroll-top');
  if (window.scrollY > 400) {
    scrollBtn?.classList.add('visible');
  } else {
    scrollBtn?.classList.remove('visible');
  }
});

// ===== NAV MOBILE TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.getElementById('nav-links');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksContainer?.classList.toggle('open');
});

// Close mobile nav on link click
navLinksContainer?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinksContainer?.classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.style.animationDelay || '0s';
      const ms = parseFloat(delay) * 1000;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, ms);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar').forEach(bar => {
        bar.classList.add('animated');
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-group').forEach(group => {
  barObserver.observe(group);
});

// ===== HERO STAT COUNTER =====
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      if (nums[0]) animateCount(nums[0], 6, '+');
      if (nums[1]) animateCount(nums[1], 30, '+');
      if (nums[2]) animateCount(nums[2], 25, '%');
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// Fix stat spans after counter animation
document.querySelectorAll('.stat-num').forEach(el => {
  const accent = el.querySelector('.accent');
  if (accent) {
    el.dataset.accent = accent.textContent;
  }
});

// ===== SCROLL TO TOP =====
document.getElementById('scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM (Simulated) =====
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const note = document.getElementById('form-note');

  btn.disabled = true;
  btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

  // Simulate async send
  setTimeout(() => {
    btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
    btn.style.background = '#00c9a7';
    if (note) {
      note.textContent = "Thanks! I'll get back to you within 24 hours.";
      note.style.color = 'var(--teal)';
    }
    document.getElementById('contact-form')?.reset();

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.style.background = '';
      if (note) note.textContent = '';
    }, 4000);
  }, 1800);
}

// ===== TYPEWRITER EFFECT IN HERO =====
const subtitle = document.querySelector('.hero-title');
if (subtitle) {
  const text = 'Senior QA Automation Engineer';
  let i = 0;
  subtitle.textContent = '';
  const type = () => {
    if (i < text.length) {
      subtitle.textContent += text[i++];
      setTimeout(type, 60);
    }
  };
  // Delay until page load
  setTimeout(type, 500);
}

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PAGE LOAD ENTRANCE =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);

  // Trigger hero animations
  document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 100 + i * 120);
  });
});

// ===== TILT EFFECT on code card =====
const codeCard = document.querySelector('.code-card');
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual && codeCard) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    codeCard.style.transform = `
      perspective(600px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 8}deg)
      translateZ(0)
    `;
  });
  heroVisual.addEventListener('mouseleave', () => {
    codeCard.style.transform = 'perspective(600px) rotateY(0) rotateX(0)';
    codeCard.style.transition = 'transform 0.5s ease';
  });
}
