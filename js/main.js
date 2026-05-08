/* ══════════════════════════════════════
   ACTIVE LINK EN NAVBAR
══════════════════════════════════════ */
(function () {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
 
  function setActive(id) {
    navLinks.forEach(link => {
      const match = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', match);
    });
  }
 
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px', // activa cuando la sección ocupa el centro de la pantalla
    threshold: 0
  });
 
  sections.forEach(sec => observer.observe(sec));
})();

/* ════════════════════════════
   MENÚ HAMBURGUESA
════════════════════════════ */
(function () {
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navbar   = document.getElementById('navbar');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cerrar al hacer clic en un link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-label', 'Abrir menú');
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-label', 'Abrir menú');
    }
  });
})();
 

/* ══════════════════════════════════════
   CARRUSEL DE TRABAJOS
══════════════════════════════════════ */
(function () {
  const carousel  = document.getElementById('carousel');
  const dotsEl    = document.getElementById('dots');
  if (!carousel || !dotsEl) return;
 
  const cards = Array.from(carousel.querySelectorAll('.card'));
  const GAP   = 22; // px — coincide con gap del CSS (1.4rem)
 
  const inner = document.createElement('div');
  inner.className = 'carousel-dots-inner';
  dotsEl.appendChild(inner);

const thumb = document.createElement('div');
thumb.className = 'carousel-thumb';
inner.appendChild(thumb);

  const thumbWidth = 100 / cards.length;
  thumb.style.width = thumbWidth + '%';
 
  /* ── Mueve el thumb según la posición del scroll ── */
  function updateBar() {
    const maxScroll  = carousel.scrollWidth - carousel.clientWidth;
    const progress   = maxScroll > 0 ? carousel.scrollLeft / maxScroll : 0;
    const maxLeft    = 100 - thumbWidth;
    thumb.style.left = (progress * maxLeft) + '%';
  }
 
  /* ── Ir a una card específica ── */
  function goTo(i) {
    const clamped = Math.max(0, Math.min(i, cards.length - 1));
    const offset  = cards[clamped].offsetLeft - carousel.offsetLeft;
    carousel.scrollTo({ left: offset, behavior: 'smooth' });
  }
 
  /* ── Flechas ── */
  let current = 0;
 
  document.getElementById('prevBtn')?.addEventListener('click', () => {
    current = Math.max(0, current - 1);
    goTo(current);
  });
 
  document.getElementById('nextBtn')?.addEventListener('click', () => {
    current = Math.min(cards.length - 1, current + 1);
    goTo(current);
  });
 
  carousel.addEventListener('scroll', () => {
    updateBar();
    const cardWidth = cards[0].offsetWidth + GAP;
    current = Math.round(carousel.scrollLeft / cardWidth);
  });
 
  /* ── Estado inicial ── */
  updateBar();
})();

/* ══════════════════════════════════════
   TOOLS TICKER
══════════════════════════════════════ */
(function () {
  const tools = [
    { label: 'Figma',        src: '../Iconos/Figma.svg' },
    { label: 'Illustrator',  src: '../Iconos/Ai.svg' },
    { label: 'Unity',        src: '../Iconos/unity.svg' },
    { label: 'Zoho Sprints', src: '../Iconos/Zoho.svg' },
    { label: 'Jira',         src: '../Iconos/Jira.svg' },
    { label: 'Photoshop',    src: '../Iconos/Ps.svg' },
    { label: 'Canva',        src: '../Iconos/canva.svg' },
    { label: 'CSS',          src: '../Iconos/css.svg' },
    { label: 'HTML',         src: '../Iconos/html.svg' },
    { label: 'C#',           src: '../Iconos/C.svg' },
    { label: 'C++',          src: '../Iconos/C++.svg' },
  ];
 
  const track = document.getElementById('ticker');
  if (!track) return;
 
  const allTools = [...tools, ...tools];
 
  allTools.forEach((t, i) => {
    /* Separador visual entre items */
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'tool-sep';
      track.appendChild(sep);
    }
 
    const item = document.createElement('div');
    item.className = 'tool-item';
    item.innerHTML = `<img src="${t.src}" alt="${t.label}" /><span>${t.label}</span>`;
    track.appendChild(item);
  });
})();

/* ════════════════════════════
   TILT 3D EN CARDS
════════════════════════════ */
(function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    /* Agregar el elemento de brillo */
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    card.appendChild(shine);

    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left; // posición X del mouse dentro de la card
      const y      = e.clientY - rect.top;  // posición Y del mouse dentro de la card
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;

      // Ángulo de inclinación — máximo 12 grados
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) *  8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      card.style.boxShadow = `${-rotateY}px ${rotateX}px 32px rgba(107, 78, 255, 0.18)`;

      // Mover el brillo siguiendo el mouse
      const px = (x / rect.width)  * 100;
      const py = (y / rect.height) * 100;
      shine.style.setProperty('--x', px + '%');
      shine.style.setProperty('--y', py + '%');
    });

    /* Volver al estado normal al salir */
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.boxShadow = '0 3px 5.5px 0 #BCB6CD';
    });

    /* Suavizar el regreso */
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
    });
  });
})();