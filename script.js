/* ============================================================
   MONTE CARMO CAFÉS ESPECIAIS — SCRIPT.JS
   ============================================================ */

/* ── BARRA DE PROGRESSO DO SCROLL ──────────────────────────── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
}, { passive: true });

/* ── PARTÍCULAS FLUTUANTES NO HERO ─────────────────────────── */
(function createParticles() {
  const hero   = document.querySelector('.hero');
  const colors = [
    'rgba(155,130,70,.4)',
    'rgba(196,169,106,.35)',
    'rgba(245,237,227,.25)',
    'rgba(58,33,16,.3)',
    'rgba(210,185,130,.3)',
  ];

  for (let i = 0; i < 18; i++) {
    const p    = document.createElement('div');
    const size = Math.random() * 7 + 3;
    p.className = 'hero-particle';
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-delay:${(Math.random() * 8).toFixed(2)}s`,
      `animation-duration:${(Math.random() * 7 + 6).toFixed(2)}s`,
    ].join(';');
    hero.appendChild(p);
  }
})();

/* ── HEADER SCROLL ──────────────────────────────────────────── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MENU MOBILE ────────────────────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navClose   = document.getElementById('navClose');

function openMenu() {
  navMenu.classList.add('open');
  navOverlay.classList.add('active');
  menuToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navOverlay.classList.remove('active');
  menuToggle.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () =>
  navMenu.classList.contains('open') ? closeMenu() : openMenu()
);

navClose.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── SMOOTH SCROLL ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

/* ── NAV LINK ATIVO ─────────────────────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      allNavLinks.forEach(l => {
        if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ── CONTADOR ANIMADO NOS BADGES ────────────────────────────── */
(function animateCounters() {
  const badges = document.querySelectorAll('.badge-num');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.trim();

      const match = raw.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
      if (!match) return;
      const [, prefix, numStr, suffix] = match;
      const target  = parseInt(numStr, 10);
      let current   = 0;
      const step    = Math.ceil(target / 40);

      const tick = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = prefix + current + suffix;
        if (current >= target) clearInterval(tick);
      }, 28);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  badges.forEach(b => counterObserver.observe(b));
})();

/* ── RIPPLE NOS BOTÕES ──────────────────────────────────────── */
(function addRipple() {
  const selectors = [
    '.btn-primary', '.btn-outline', '.btn-wpp-grande', '.btn-produto',
  ];
  document.querySelectorAll(selectors.join(',')).forEach(btn => {
    btn.addEventListener('click', e => {
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top  - size / 2}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
})();

/* ── LIGHTBOX (galeria) ─────────────────────────────────────── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxOverlay = document.getElementById('lightboxOverlay');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelector('.galeria-grid').addEventListener('click', e => {
  const item = e.target.closest('.gal-item');
  if (!item) return;
  const img = item.querySelector('img');
  if (img) openLightbox(img.src, img.alt);
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── CARROSSEL NOSSOS PRODUTOS ──────────────────────────────── */
(function() {
  const track = document.getElementById('prodCarouselTrack');
  const dotsEl = document.getElementById('prodCarouselDots');
  if (!track || !dotsEl) return;

  const slides = track.querySelectorAll('.prod-carousel-slide');
  const total = slides.length;
  let cur = 0, timer;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'prod-carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(n) {
    dotsEl.querySelectorAll('.prod-carousel-dot')[cur].classList.remove('active');
    cur = ((n % total) + total) % total;
    track.style.transform = 'translateX(-' + (cur * 100) + '%)';
    dotsEl.querySelectorAll('.prod-carousel-dot')[cur].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(cur + 1), 3000);
  }

  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? cur + 1 : cur - 1);
  }, { passive: true });

  resetTimer();
})();

/* ── MODAL WHATSAPP — definido inline no HTML (ver index.html) ── */
