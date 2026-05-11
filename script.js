/* =========================================
   RAMPRATAP JANGID — PORTFOLIO SCRIPTS
   ========================================= */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
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
} else {
  cursor?.remove();
  follower?.remove();
}

// ===== NAV =====
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }

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

  const scrollBtn = document.getElementById('scroll-top');
  if (window.scrollY > 400) {
    scrollBtn?.classList.add('visible');
  } else {
    scrollBtn?.classList.remove('visible');
  }
});

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

// ===== CONTACT FORM =====
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('name')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
  const message = document.getElementById('message')?.value || '';

  const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href = `mailto:rp.automationqa@gmail.com?subject=${mailSubject}&body=${body}`;
}

// ===== SCROLL TO TOP =====
document.getElementById('scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});