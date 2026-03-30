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
    { label: 'Figma',        src: '../Iconos/figma.svg' },
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