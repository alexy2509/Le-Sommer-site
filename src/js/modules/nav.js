// Navigation : header sticky (scroll state) + menu mobile plein écran.
// Nav desktop = liens directs, sans menu déroulant.

export function initHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  // Header toujours visible (sticky) : il ne se masque jamais au défilement, pour garder
  // un accès constant à la navigation. On ajoute seulement une ombre après le premier scroll.
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

export function initMobileNav() {
  const nav = document.querySelector('[data-mobile-nav]');
  const openBtn = document.querySelector('[data-mobile-nav-open]');
  const closeBtn = document.querySelector('[data-mobile-nav-close]');
  if (!nav || !openBtn || !closeBtn) return;

  const open = () => {
    nav.dataset.open = 'true';
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  const close = () => {
    nav.dataset.open = 'false';
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  nav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}
