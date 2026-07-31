// Flèches du carrousel « nos réalisations » : défilement photo par photo, animé.
//
// Le défilement tactile et à la molette reste entièrement natif (overflow + scroll-snap) :
// aucune ligne de JS n'intervient. Les flèches sont un raccourci de confort et avancent
// d'UNE vignette à la fois.
//
// L'animation est faite ici plutôt que via `scroll-behavior: smooth` : cette propriété CSS
// empêche, sur plusieurs moteurs, toute écriture programmée de `scrollLeft` (le défilement
// reste alors bloqué à zéro). En animant nous-mêmes, le comportement est identique partout
// et la courbe d'accélération est maîtrisée.

const DUREE = 420; // ms — assez court pour rester vif, assez long pour rester lisible

// Adoucissement classique : départ franc, arrivée en douceur.
const adoucir = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function initGalleryScroll() {
  const animations = new WeakMap();

  for (const gallery of document.querySelectorAll('[data-gallery]')) {
    const track = gallery.querySelector('[data-scroll-track]');
    const prev = gallery.querySelector('[data-scroll-prev]');
    const next = gallery.querySelector('[data-scroll-next]');
    if (!track || !prev || !next) continue;

    // Pas d'une vignette = sa largeur + l'espace qui la sépare de la suivante. Mesuré sur les
    // deux premiers éléments plutôt que codé en dur : le CSS peut changer librement.
    const pas = () => {
      const items = track.children;
      if (items.length < 2) return track.clientWidth;
      const ecart = items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
      return Math.round(ecart) || track.clientWidth;
    };

    const majFleches = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    };

    const allerA = (cible) => {
      const depart = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      const fin = Math.max(0, Math.min(cible, max));
      const distance = fin - depart;
      if (Math.abs(distance) < 1) return;

      // Une animation en cours est abandonnée : les clics rapides restent réactifs.
      cancelAnimationFrame(animations.get(track));

      // L'accroche (scroll-snap) recale la position à chaque image de l'animation et la
      // ramène à son point de départ : on la suspend le temps du mouvement, puis on la
      // rétablit pour que le défilement au doigt garde son confort.
      track.style.scrollSnapType = 'none';
      const rétablirAccroche = () => {
        track.style.scrollSnapType = '';
      };

      // Respecte le réglage système « réduire les animations ».
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        track.scrollLeft = fin;
        rétablirAccroche();
        majFleches();
        return;
      }

      const debut = performance.now();
      const etape = (maintenant) => {
        const avancement = Math.min((maintenant - debut) / DUREE, 1);
        track.scrollLeft = depart + distance * adoucir(avancement);
        if (avancement < 1) {
          animations.set(track, requestAnimationFrame(etape));
        } else {
          rétablirAccroche();
          majFleches();
        }
      };
      animations.set(track, requestAnimationFrame(etape));
    };

    prev.addEventListener('click', () => allerA(track.scrollLeft - pas()));
    next.addEventListener('click', () => allerA(track.scrollLeft + pas()));

    track.addEventListener('scroll', majFleches, { passive: true });
    window.addEventListener('resize', majFleches, { passive: true });
    majFleches();
  }
}
