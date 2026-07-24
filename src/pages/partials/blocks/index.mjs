/*
  Briques de contenu réutilisables par les pages.
  Point d'entrée unique : les pages importent depuis '.../partials/blocks/index.mjs',
  jamais depuis un fichier de bloc directement — un bloc peut ainsi être déplacé ou
  renommé sans toucher aux pages.
*/
export { faqBlock } from './faq.mjs';
export { contactBand } from './contact-band.mjs';
export { partnersCarousel } from './partners-carousel.mjs';
export { photoCarousel } from './photo-carousel.mjs';
export { beyondBand } from './beyond-band.mjs';
export { bretagneZone } from './bretagne-zone.mjs';
export { workGalleryBand } from './work-gallery.mjs';
export { serviceJsonLd } from './json-ld.mjs';
