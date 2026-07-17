import { icon } from './icons.mjs';
import { escapeHtml } from './escape.mjs';
import { site, partners } from './site-data.mjs';

export function serviceCard({ iconName, title, text, href }) {
  return `<a class="card" href="${href}">
  <span class="card__icon">${icon(iconName)}</span>
  <h3 class="card__title">${escapeHtml(title)}</h3>
  <p class="card__text">${text}</p>
  <span class="card__link">En savoir plus ${icon('arrowRight', 'icon')}</span>
</a>`;
}

export function poleCard({ iconName, title, text, href }) {
  return `<a class="card card--pole" href="${href}">
  <span class="card__icon">${icon(iconName)}</span>
  <h3 class="card__title">${escapeHtml(title)}</h3>
  <p class="card__text">${text}</p>
  <span class="card__link">Découvrir ${escapeHtml(title).toLowerCase()} ${icon('arrowRight', 'icon')}</span>
</a>`;
}

export function trustBar(items) {
  return `<ul class="trust-bar">
  ${items.map((it) => `<li class="trust-bar__item">${icon('check')}<span><strong>${escapeHtml(it.title)}</strong>${it.text ? escapeHtml(it.text) : ''}</span></li>`).join('')}
</ul>`;
}

/**
 * Rend un bloc FAQ accessible et retourne le JSON-LD FAQPage associé.
 * @param {{q:string, a:string}[]} items
 */
export function faqBlock(items) {
  const html = `<div class="faq">
  ${items
    .map(
      (it, i) => `<div class="faq-item" data-faq-item>
    <button type="button" class="faq-item__q" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">
      <span>${escapeHtml(it.q)}</span>
      ${icon('chevronDown')}
    </button>
    <div class="faq-item__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
      <p>${it.a}</p>
    </div>
  </div>`,
    )
    .join('')}
</div>`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a.replace(/<[^>]+>/g, '') },
    })),
  };

  return { html, jsonLd };
}

export function placeholder(text, { iconName = 'imageOff' } = {}) {
  return `<div class="placeholder-block">
  ${icon(iconName)}
  <span>${text}</span>
</div>`;
}

export function ctaBand({ title = 'Un projet, une panne, une question ?', text = 'Notre équipe vous répond rapidement pour étudier votre besoin.', primaryLabel = 'Demander un devis', primaryHref = '/contact/' } = {}) {
  return `<div class="cta-band js-anim" data-reveal>
  <div>
    <h2>${escapeHtml(title)}</h2>
    <p>${escapeHtml(text)}</p>
  </div>
  <div class="cta-band__actions">
    <a class="btn btn--primary" href="${primaryHref}">${escapeHtml(primaryLabel)} ${icon('arrowRight', 'icon')}</a>
    <a class="btn btn--on-dark" href="${site.phoneHref}">${icon('phone', 'icon')} ${site.phoneDisplay}</a>
  </div>
</div>`;
}

export function partnersGrid() {
  return `<ul class="partners-grid">
  ${partners
    .map(
      (p) => `<li class="partners-grid__item">
    <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="partners-grid__link partners-grid__link--${p.slug}" aria-label="${escapeHtml(p.name)}, site officiel (nouvel onglet)">
      <span class="partners-grid__logo">
        <picture>
          <source srcset="${p.logo}.webp" type="image/webp" />
          <img src="${p.logo}.png" alt="Logo ${escapeHtml(p.name)}" loading="lazy" />
        </picture>
      </span>
      <span class="partners-grid__meta">${escapeHtml(p.name)} ${icon('arrowRight', 'icon')}</span>
    </a>
  </li>`,
    )
    .join('')}
</ul>`;
}

/**
 * Carrousel de photos avec légende (photo + titre + texte).
 * @param {{slug:string, title:string, text:string, alt:string}[]} slides
 * @param {string} basePath - dossier des images, ex. '/assets/img/work'
 */
/**
 * Carrousel photo compact : petite image + légende (titre + texte) en clair SOUS l'image,
 * navigation manuelle uniquement (pas de défilement automatique). La légende est un élément
 * unique mis à jour en JS depuis le slide actif (pas de saut de hauteur, texte bien lisible).
 * @param {{slug:string, title:string, text:string, alt:string}[]} slides
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

export function serviceJsonLd({ name, description, path, areaServed = site.areaServed }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: { '@id': `${site.domain}/#organisation` },
    areaServed,
    url: `${site.domain}${path}`,
  };
}
