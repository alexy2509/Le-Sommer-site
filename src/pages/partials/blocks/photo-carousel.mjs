import { icon } from '../icons.mjs';
import { escapeHtml } from '../escape.mjs';

/**
 * Carrousel photo compact : petite image + légende (titre + texte) en clair SOUS l'image,
 * navigation manuelle uniquement (pas de défilement automatique). La légende est un élément
 * unique mis à jour en JS depuis le slide actif (pas de saut de hauteur, texte bien lisible).
 * @param {{slug:string, title:string, text:string, alt:string}[]} slides
 * @param {string} basePath - dossier des images, ex. '/assets/img/work'
 */
export function photoCarousel(slides, basePath = '/assets/img/work') {
  const n = slides.length;
  return `<div class="carousel" data-carousel aria-roledescription="carrousel" aria-label="Photos de nos réalisations">
  <div class="carousel__viewport">
    <ul class="carousel__track" data-carousel-track>
      ${slides
        .map(
          (s, i) => `<li class="carousel__slide" role="group" aria-roledescription="diapositive" aria-label="${i + 1} sur ${n} : ${escapeHtml(s.title)}" data-title="${escapeHtml(s.title)}" data-text="${escapeHtml(s.text)}"${i === 0 ? '' : ' aria-hidden="true"'}>
        <div class="carousel__media">
          <picture>
            <source type="image/avif" srcset="${basePath}/${s.slug}-768.avif 768w, ${basePath}/${s.slug}-1200.avif 1200w" sizes="(min-width: 1024px) 420px, 100vw" />
            <source type="image/webp" srcset="${basePath}/${s.slug}-768.webp 768w, ${basePath}/${s.slug}-1200.webp 1200w" sizes="(min-width: 1024px) 420px, 100vw" />
            <img src="${basePath}/${s.slug}-768.jpg" alt="${escapeHtml(s.alt)}" width="768" height="512" loading="lazy" />
          </picture>
        </div>
      </li>`,
        )
        .join('')}
    </ul>
    <button type="button" class="carousel__btn carousel__btn--prev" data-carousel-prev aria-label="Photo précédente">${icon('chevronLeft', 'icon')}</button>
    <button type="button" class="carousel__btn carousel__btn--next" data-carousel-next aria-label="Photo suivante">${icon('chevronRight', 'icon')}</button>
    <div class="carousel__dots" data-carousel-dots role="tablist" aria-label="Choisir une photo">
      ${slides.map((s, i) => `<button type="button" class="carousel__dot${i === 0 ? ' is-active' : ''}" data-carousel-dot data-index="${i}" role="tab" aria-selected="${i === 0}" aria-label="Photo ${i + 1} : ${escapeHtml(s.title)}"></button>`).join('')}
    </div>
  </div>
  <div class="carousel__caption" data-carousel-caption aria-live="polite">
    <span class="carousel__caption-title">${escapeHtml(slides[0].title)}</span>
    <p class="carousel__caption-text">${escapeHtml(slides[0].text)}</p>
  </div>
</div>`;
}
