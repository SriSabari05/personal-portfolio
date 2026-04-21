// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width = '52px';
    ring.style.height = '52px';
    ring.style.borderColor = 'var(--accent)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(200,255,0,0.4)';
  });
});

// ── Nav Scroll ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile Menu ──
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function toggleMenu(forceClose = false) {
  const isOpen = forceClose ? false : navLinks.classList.toggle('open');
  if (forceClose) navLinks.classList.remove('open');
  
  menuToggle.textContent = isOpen ? '✕' : '☰';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

menuToggle.addEventListener('click', () => toggleMenu());
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => toggleMenu(true));
});

// ── Reveal on Scroll ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Skill Bars ──
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

// ── Contact Form ──
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMessage');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      msg.textContent = '✓ Message sent successfully!';
      form.reset();
    } else {
      msg.textContent = '✗ Something went wrong. Try again.';
      msg.style.color = '#ff6b35';
    }
  } catch {
    msg.textContent = '✗ Network error. Please try again.';
    msg.style.color = '#ff6b35';
  }
  btn.textContent = 'Send Message';
  btn.disabled = false;
  setTimeout(() => {
    msg.textContent = '';
    msg.style.color = 'var(--accent)';
  }, 5000);
});
