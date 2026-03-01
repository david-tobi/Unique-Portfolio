// ─── SCROLL ANIMATIONS ────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


// ─── NAV SCROLL EFFECT ────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = '#1e1e1e';
  }
});


// ─── CONTACT FORM HANDLER ─────────────────────────────
const form = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.submit-btn');

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const name = document.querySelector('input[type="text"]').value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const message = document.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
      submitBtn.textContent = 'Please fill all fields ✗';
      submitBtn.style.background = '#ff6b35';
      setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
      }, 2000);
      return;
    }

    // Send to Formspree — replace the URL with your own Formspree endpoint
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
    .then(res => {
      if (res.ok) {
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.background = '#a8f050';
        document.querySelector('input[type="text"]').value = '';
        document.querySelector('input[type="email"]').value = '';
        document.querySelector('textarea').value = '';
      } else {
        submitBtn.textContent = 'Failed. Try again ✗';
        submitBtn.style.background = '#ff6b35';
      }
    })
    .catch(() => {
      submitBtn.textContent = 'Failed. Try again ✗';
      submitBtn.style.background = '#ff6b35';
    })
    .finally(() => {
      setTimeout(() => {
        submitBtn.textContent = 'Send Message →';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    });
  });
}


// ─── SMOOTH ACTIVE NAV LINKS ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#b9ff66';
    }
  });
});
