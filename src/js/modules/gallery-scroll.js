// Flèches du carrousel « nos réalisations » : défilement d'une page de vignettes à la fois.
// Le défilement lui-même est natif (overflow + scroll-snap) : au tactile comme à la molette,
// aucune ligne de JS n'intervient — les flèches ne sont qu'un raccourci de confort.
export function initGalleryScroll() {
  for (const gallery of document.querySelectorAll('[data-gallery]')) {
    const track = gallery.querySelector('[data-scroll-track]');
    const prev = gallery.querySelector('[data-scroll-prev]');
    const next = gallery.querySelector('[data-scroll-next]');
    if (!track || !prev || !next) continue;

    const page = () => Math.max(track.clientWidth * 0.85, 200);
    prev.addEventListener('click', () => track.scrollBy({ left: -page() }));
    next.addEventListener('click', () => track.scrollBy({ left: page() }));

    // Flèches estompées en butée : l'utilisateur voit qu'il est au début ou à la fin.
    const update = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    };
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }
}
