import { icon } from '../icons.mjs';
import { escapeHtml } from '../escape.mjs';
import { workGallery } from './work-gallery.data.mjs';

const BASE = '/assets/img/work/gallery';

/**
 * Bande de 4 photos en mosaïque, pour donner à voir le travail réel ailleurs que sur les
 * pages pôle (accueil, « qui sommes-nous »…). Purement illustratif : pas de visionneuse ici,
 * un lien mène à la galerie complète du pôle concerné.
 *
 * Les photos sont choisies par slug dans work-gallery.data — jamais dupliquées : on réutilise
 * les mêmes fichiers déjà générés, aucun poids supplémentaire au build.
 *
 * @param {string[]} slugs - 4 slugs, dans l'ordre d'affichage
 * @param {object} [opts]
 * @param {string} [opts.eyebrow]
 * @param {string} [opts.title]
 * @param {string} [opts.text]
 * @param {{href:string,label:string}} [opts.link]
 */
export function photoStrip(slugs, { eyebrow = 'Nos réalisations', title, text, link } = {}) {
  const toutes = [...workGallery.electricite, ...workGallery.elevage];
  const photos = slugs.map((s) => toutes.find((p) => p.slug === s)).filter(Boolean);
  if (photos.length < 2) return '';

  const items = photos
    .map(
      (p, i) => `<figure class="photo-strip__item">
      <picture>
        <source type="image/avif" srcset="${BASE}/${p.slug}-420.avif 420w, ${BASE}/${p.slug}-840.avif 840w" sizes="(min-width: 768px) 25vw, 50vw" />
        <source type="image/webp" srcset="${BASE}/${p.slug}-420.webp 420w, ${BASE}/${p.slug}-840.webp 840w" sizes="(min-width: 768px) 25vw, 50vw" />
        <img src="${BASE}/${p.slug}-420.jpg" alt="${escapeHtml(p.alt)}" width="420" height="315" loading="lazy" decoding="async" />
      </picture>
    </figure>`,
    )
    .join('');

  return `<div class="photo-strip js-anim" data-reveal>
    <div class="photo-strip__head">
      <p class="eyebrow">${escapeHtml(eyebrow)}</p>
      ${title ? `<h2 class="photo-strip__title">${escapeHtml(title)}</h2>` : ''}
      ${text ? `<p class="photo-strip__text">${escapeHtml(text)}</p>` : ''}
    </div>
    <div class="photo-strip__grid">${items}</div>
    ${link ? `<p class="photo-strip__link"><a class="btn btn--secondary" href="${link.href}">${escapeHtml(link.label)} ${icon('arrowRight', 'icon')}</a></p>` : ''}
  </div>`;
}
