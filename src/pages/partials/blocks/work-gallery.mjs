import { icon } from '../icons.mjs';
import { escapeHtml } from '../escape.mjs';
import { workGallery, PHOTO_CREDIT } from './work-gallery.data.mjs';

const BASE = '/assets/img/work/gallery';

/**
 * Bande « nos réalisations » des pages pôle : carrousel horizontal fléché qui parcourt
 * TOUTES les photos du pôle, et visionneuse plein écran au clic sur une vignette
 * (src/js/modules/lightbox.js — flèches, clavier, mention de droits).
 *
 * Les données de la visionneuse voyagent dans `data-gallery` (JSON) : le JS ne fait aucune
 * requête et ne reconstruit aucun chemin d'image côté client.
 *
 * La marque partenaire, quand elle est renseignée, est posée en pastille HTML par-dessus
 * la photo : le fichier image n'est jamais retouché (aucune perte de qualité).
 *
 * @param {'electricite'|'elevage'} pole
 * @param {object} [opts]
 * @param {string} [opts.title]
 */
export function workGalleryBand(pole, { title = 'Nos réalisations' } = {}) {
  const photos = workGallery[pole];
  if (!photos?.length) return '';

  const payload = photos.map((p) => ({ base: `${BASE}/${p.slug}`, alt: p.alt, caption: p.caption }));

  const figures = photos
    .map((p, i) => {
      const brand = p.brand
        ? `<span class="work-gallery__brand"><img src="/assets/partners/${p.brand}.png" alt="" width="120" height="40" loading="lazy" /></span>`
        : '';
      return `<figure class="work-gallery__item">
      <button type="button" class="work-gallery__media" data-photo-index="${i}" aria-label="Agrandir : ${escapeHtml(p.caption)}">
        <picture>
          <source type="image/avif" srcset="${BASE}/${p.slug}-420.avif 420w, ${BASE}/${p.slug}-840.avif 840w" sizes="320px" />
          <source type="image/webp" srcset="${BASE}/${p.slug}-420.webp 420w, ${BASE}/${p.slug}-840.webp 840w" sizes="320px" />
          <img src="${BASE}/${p.slug}-420.jpg" alt="${escapeHtml(p.alt)}" width="420" height="315" loading="lazy" decoding="async" />
        </picture>
        ${brand}
        <span class="work-gallery__zoom" aria-hidden="true">${icon('maximize')}</span>
      </button>
      <figcaption>${escapeHtml(p.caption)}</figcaption>
    </figure>`;
    })
    .join('');

  return `<div class="work-gallery js-anim" data-reveal data-gallery="${escapeHtml(JSON.stringify(payload))}" data-credit="${escapeHtml(PHOTO_CREDIT)}">
    <div class="work-gallery__head">
      <p class="work-gallery__title">${escapeHtml(title)} <span class="work-gallery__count">${photos.length} photos</span></p>
      <div class="work-gallery__nav">
        <button type="button" class="work-gallery__arrow" data-scroll-prev aria-label="Photos précédentes">${icon('chevronLeft', 'icon')}</button>
        <button type="button" class="work-gallery__arrow" data-scroll-next aria-label="Photos suivantes">${icon('chevronRight', 'icon')}</button>
      </div>
    </div>
    <div class="work-gallery__track" data-scroll-track tabindex="0" role="region" aria-label="${escapeHtml(title)} : faire défiler les photos">${figures}</div>
  </div>`;
}
