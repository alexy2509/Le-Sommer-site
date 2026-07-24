import { initScrollReset } from './modules/scroll-reset.js';
import { initHeader, initMobileNav } from './modules/nav.js';
import { initFaq } from './modules/faq.js';
import { initCarousels } from './modules/carousel.js';
import { initLightbox } from './modules/lightbox.js';
import { initGalleryScroll } from './modules/gallery-scroll.js';
import { initReveals } from './animations/reveals.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Au rechargement : retour à l'accueil, en haut de page (avant tout le reste).
initScrollReset();

// Scroll natif : pas de smooth scroll JS (choix produit). GSAP ScrollTrigger fonctionne
// directement sur le scroll natif du navigateur.
initHeader();
initMobileNav();
initFaq();
initCarousels();
initLightbox();
initGalleryScroll();
initReveals();

if (document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
