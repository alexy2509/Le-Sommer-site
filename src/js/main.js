import { initHeader, initMobileNav } from './modules/nav.js';
import { initFaq } from './modules/faq.js';
import { initCarousels } from './modules/carousel.js';
import { initReveals } from './animations/reveals.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Scroll natif : pas de smooth scroll JS (choix produit). GSAP ScrollTrigger fonctionne
// directement sur le scroll natif du navigateur.
initHeader();
initMobileNav();
initFaq();
initCarousels();
initReveals();

if (document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
