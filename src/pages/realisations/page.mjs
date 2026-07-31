import { escapeHtml } from '../partials/escape.mjs';
import { contactBand } from '../partials/blocks/index.mjs';
import { workGallery, PHOTO_CREDIT } from '../partials/blocks/work-gallery.data.mjs';

const BASE = '/assets/img/work/gallery';

export const meta = {
  title: 'Nos réalisations | LE SOMMER, Ergué-Gabéric (29)',
  description:
    "Photos de chantiers LE SOMMER : armoires électriques, automatismes, éclairage, ventilation, alimentation, silos et FAF, dans le Finistère et les communes limitrophes.",
  path: '/realisations/',
};

/**
 * Grille complète d'un pôle. Chaque photo ouvre la visionneuse plein écran
 * (src/js/modules/lightbox.js) : même mécanique que sur les pages pôle.
 */
function grille(pole, photos) {
  const payload = photos.map((p) => ({ base: `${BASE}/${p.slug}`, alt: p.alt }));

  const items = photos
    .map((p, i) => {
      const brand = p.brand
        ? `<span class="work-gallery__brand"><img src="/assets/partners/${p.brand}.png" alt="" width="120" height="40" loading="lazy" /></span>`
        : '';
      return `<figure class="realisations__item">
      <button type="button" class="work-gallery__media" data-photo-index="${i}" aria-label="Agrandir la photo : ${escapeHtml(p.alt)}">
        <picture>
          <source type="image/avif" srcset="${BASE}/${p.slug}-420.avif 420w, ${BASE}/${p.slug}-840.avif 840w" sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw" />
          <source type="image/webp" srcset="${BASE}/${p.slug}-420.webp 420w, ${BASE}/${p.slug}-840.webp 840w" sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw" />
          <img src="${BASE}/${p.slug}-420.jpg" alt="${escapeHtml(p.alt)}" width="420" height="315" loading="lazy" decoding="async" />
        </picture>
        ${brand}
      </button>
    </figure>`;
    })
    .join('');

  return `<div class="realisations__grid" data-gallery="${escapeHtml(JSON.stringify(payload))}" data-credit="${escapeHtml(PHOTO_CREDIT)}">${items}</div>`;
}

export function content() {
  const elec = workGallery.electricite;
  const elev = workGallery.elevage;

  return `
<section class="section--tight">
  <div class="container container--narrow">
    <p class="eyebrow">Nos réalisations</p>
    <h1>${elec.length + elev.length} chantiers en images</h1>
    <p style="font-size:var(--fs-body-lg)">Armoires électriques, automatismes, éclairage, ventilation, alimentation, silos et fabrique d'aliment à la ferme : toutes ces installations ont été réalisées par nos équipes. Cliquez sur une photo pour l'agrandir.</p>
    <nav class="realisations__jump" aria-label="Aller à un pôle">
      <a href="#electricite">Électricité industrielle</a>
      <a href="#elevage">Matériel d'élevage</a>
    </nav>
  </div>
</section>

<section id="electricite" class="section--tight" aria-labelledby="titre-electricite">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Pôle 1</p>
      <h2 id="titre-electricite">Électricité industrielle <span class="realisations__count">${elec.length} photos</span></h2>
      <p>Armoires sur-mesure, raccordement d'automatismes, éclairage de bâtiment et groupes électrogènes.</p>
    </div>
    ${grille('electricite', elec)}
    <p class="realisations__more"><a class="btn btn--secondary" href="/electricite-industrielle/">Découvrir le pôle électricité industrielle</a></p>
  </div>
</section>

<section id="elevage" class="section--tight section--alt" aria-labelledby="titre-elevage">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Pôle 2</p>
      <h2 id="titre-elevage">Matériel d'élevage <span class="realisations__count">${elev.length} photos</span></h2>
      <p>Ventilation, alimentation, abreuvement, volières équipées, silos et fabrique d'aliment à la ferme.</p>
    </div>
    ${grille('elevage', elev)}
    <p class="realisations__more"><a class="btn btn--secondary" href="/materiel-elevage/">Découvrir le pôle matériel d'élevage</a></p>
  </div>
</section>

<section class="section-contact">
  <div class="container">${contactBand()}</div>
</section>`;
}
