/* =========================================
   RAMPRATAP JANGID — PORTFOLIO SCRIPTS
   Optimized for smoother scrolling and lower paint cost
   ========================================= */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
let cursorRaf = null;

if (!isTouchDevice && !prefersReducedMotion && cursor && follower) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
    cursorRaf = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .project-card, .tool-item, .award-card, .contact-link, .impact-card, .model-step').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expanded');
      follower.classList.add('expanded');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expanded');
      follower.classList.remove('expanded');
    });
  });
} else {
  cursor?.remove();
  follower?.remove();
}

// ===== NAV: RAF-THROTTLED SCROLL HANDLER =====
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const scrollBtn = document.getElementById('scroll-top');
let scrollTicking = false;

function updateOnScroll() {
  const y = window.scrollY;
  nav?.classList.toggle('scrolled', y > 60);
  scrollBtn?.classList.toggle('visible', y > 400);

  let current = '';
  sections.forEach(section => {
    if (y >= section.offsetTop - 140) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateOnScroll);
    scrollTicking = true;
  }
}, { passive: true });

updateOnScroll();

// ===== MOBILE NAV =====
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.getElementById('nav-links');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksContainer?.classList.toggle('open');
});

navLinksContainer?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinksContainer?.classList.remove('open');
  });
});

// ===== REVEAL =====
if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => el.classList.add('revealed'));
}

// ===== HERO STAT COUNTERS =====
function animateCounter(el) {
  const target = Number(el.dataset.count || 0);
  const suffix = el.dataset.suffix || '';
  const duration = 1300;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const heroStats = document.querySelector('.hero-stats');
const statNumbers = document.querySelectorAll('.stat-num[data-count]');

if (prefersReducedMotion) {
  statNumbers.forEach(el => {
    el.textContent = `${el.dataset.count}${el.dataset.suffix || ''}`;
  });
} else if (heroStats && statNumbers.length) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.6 });

  statsObserver.observe(heroStats);
}

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
  const message = document.getElementById('message')?.value || '';

  const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:rp.automationqa@gmail.com?subject=${mailSubject}&body=${body}`;
}

// ===== SCROLL TO TOP =====
document.getElementById('scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

window.addEventListener('beforeunload', () => {
  if (cursorRaf) cancelAnimationFrame(cursorRaf);
});
