import { icon } from '../icons.mjs';
import { escapeHtml } from '../escape.mjs';

/**
 * Bandeau « Au-delà de l'élevage » : aplat pétrole, seul bloc de couleur pleine du site.
 * Rendu à l'identique sur l'accueil (sous les deux pôles) et sur la page matériel d'élevage.
 *
 * @param {object} [cfg]
 * @param {string} [cfg.text]     - accroche, adaptable selon la page
 * @param {string} [cfg.ctaLabel]
 */
export function beyondBand({
  text = "Votre exploitation ne se limite pas à ses bâtiments d'élevage. Nous réalisons aussi les travaux para-agricoles qui vont avec, selon votre projet.",
  ctaLabel = 'Parler de mon projet',
} = {}) {
  const items = [
    { icon: 'droplet', title: 'Plomberie', text: 'Réseaux et raccordements sur votre exploitation.' },
    { icon: 'filter', title: 'Traitement des eaux', text: 'Installation, entretien et dépannage des équipements.' },
    { icon: 'bolt', title: 'Éclairage', text: 'Fourniture et pose en bâtiment neuf ou en rénovation.' },
    { icon: 'wrench', title: 'Travaux divers', text: 'Étudiés au cas par cas, selon votre besoin.' },
  ];
  return `<div class="beyond-band js-anim" data-reveal>
  <div class="beyond-band__body">
    <p class="eyebrow eyebrow--on-dark">Au-delà de l'élevage</p>
    <h2 id="para-agricole" class="beyond-band__title">Services para-agricoles à la demande</h2>
    <p class="beyond-band__text">${escapeHtml(text)}</p>
    <a class="btn btn--on-accent" href="/contact/">${escapeHtml(ctaLabel)} ${icon('arrowRight', 'icon')}</a>
  </div>
  <ul class="beyond-band__list">
    ${items
      .map(
        // La description est dans son propre élément : elle est masquée sur mobile
        // (voir styles/pages/beyond-band.css) pour condenser le bandeau.
        (it) => `<li class="beyond-band__item">
      <span class="beyond-band__icon">${icon(it.icon)}</span>
      <span><strong>${escapeHtml(it.title)}</strong><span class="beyond-band__desc">${escapeHtml(it.text)}</span></span>
    </li>`,
      )
      .join('')}
  </ul>
</div>`;
}
