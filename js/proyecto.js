/* ================================================
   proyecto.js — Paula Pachón · Página de proyecto
   ================================================ */

/* ─── BARRA DE PROGRESO DE LECTURA ─── */
document.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  document.querySelector('nav').style.setProperty(
    '--scroll-progress', progress + '%'
  );
});

/* ─── VIDEO PLACEHOLDER ─── */
document.querySelectorAll('.video-placeholder').forEach(placeholder => {
  // aplicar imagen de fondo si existe
  const thumb = placeholder.dataset.thumb;
  if (thumb) {
    placeholder.style.backgroundImage = `url(${thumb})`;
    placeholder.style.backgroundSize = 'cover';
    placeholder.style.backgroundPosition = 'center';
  }

  placeholder.addEventListener('click', () => {
    const url = placeholder.dataset.video + '?autoplay=1';
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'width:100%; height:100%; min-height:340px;';
    placeholder.replaceWith(iframe);
  });
});

/* ─── ANIMACIÓN AL HACER SCROLL ─── */
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(`
  .insight-card,
  .artefacto-card,
  .proceso-desc h3,
  .proceso-desc p,
  .proceso-desc ul,
  .extra-img,
  .resultado-card,
  .section-header h2,
  .section-header p
`).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  scrollObserver.observe(el);
});


/* ─── BOTÓN FLOTANTE (FAB) ─── */
// Se oculta suavemente cuando el footer es visible,
// para no chocar con los links de contacto

const fab    = document.getElementById('fab');
const footer = document.querySelector('#contacto');

fab.style.transition = 'opacity 0.3s, transform 0.2s, box-shadow 0.2s';

const footerObserver = new IntersectionObserver((entries) => {
  const visible = entries[0].isIntersecting;
  fab.style.opacity       = visible ? '0' : '1';
  fab.style.pointerEvents = visible ? 'none' : 'auto';
}, { threshold: 0.2 });

footerObserver.observe(footer);

/* ─── LIGHTBOX ─── */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.artefacto-img img, .extra-img img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

document.querySelector('.resultado-media')?.addEventListener('click', () => {
  const img = document.querySelector('.resultado-media img');
  if (!img) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('active');
});

lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) lightbox.classList.remove('active');
});

// cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

