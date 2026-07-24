import { icon } from '../icons.mjs';
import { escapeHtml } from '../escape.mjs';
import { site } from '../site-data.mjs';
import { bretagneZone } from './bretagne-zone.mjs';

/**
 * Bloc de contact final — remplace les deux anciens bandeaux « zone d'intervention » et
 * « demande de devis », qui se suivaient et faisaient doublon visuel.
 *
 * Un seul panneau : l'appel à l'action à gauche, la carte de Bretagne à droite quand la page
 * la demande (accueil uniquement — ailleurs elle ferait doublon). Même langage visuel que les
 * autres panneaux du site (bleu nuit, halo pétrole, coins arrondis).
 *
 * @param {object} [cfg]
 * @param {boolean} [cfg.withMap]  - affiche la colonne carte + zone d'intervention
 * @param {string}  [cfg.title]
 * @param {string}  [cfg.text]
 * @param {string}  [cfg.primaryLabel]
 * @param {string}  [cfg.primaryHref]
 * @param {string}  [cfg.zoneText]
 * @param {string}  [cfg.id] - id du titre (cible de aria-labelledby)
 */
export function contactBand({
  withMap = false,
  title = 'Un projet, une panne, une question ?',
  text = 'Notre équipe vous répond rapidement pour étudier votre besoin.',
  primaryLabel = 'Demander un devis',
  primaryHref = '/contact/',
  zoneText = "Basés à Ergué-Gabéric, aux portes de Quimper, nous intervenons dans tout le Finistère et les communes limitrophes, pour l'électricité industrielle comme pour le matériel d'élevage.",
  id = 'contact-title',
} = {}) {
  const map = withMap
    ? `<div class="contact-band__zone">
      <p class="contact-band__zone-title">${icon('pin', 'icon')}<span>Zone d'intervention</span></p>
      <p class="contact-band__zone-text">${escapeHtml(zoneText)}</p>
      ${bretagneZone()}
    </div>`
    : '';

  return `<div class="contact-band${withMap ? ' contact-band--with-map' : ''} js-anim" data-reveal>
  <div class="contact-band__body">
    <p class="eyebrow eyebrow--on-dark">Parlons de votre projet</p>
    <h2 id="${id}" class="contact-band__title">${escapeHtml(title)}</h2>
    <p class="contact-band__text">${escapeHtml(text)}</p>
    <div class="contact-band__actions">
      <a class="btn btn--primary" href="${primaryHref}">${escapeHtml(primaryLabel)} ${icon('arrowRight', 'icon')}</a>
      <a class="btn btn--on-dark" href="${site.phoneHref}">${icon('phone', 'icon')} ${site.phoneDisplay}</a>
    </div>
  </div>
  ${map}
</div>`;
}
