import { escapeHtml } from '../escape.mjs';
import { partners } from '../site-data.mjs';

/**
 * Bandeau défilant de logos partenaires (clic = site du partenaire). Défilement horizontal
 * continu, compact. Le 2e jeu (aria-hidden) ne sert qu'à la boucle visuelle. Pause au
 * survol/focus, désactivé en reduced-motion.
 * @param {object} [opts]
 * @param {boolean} [opts.reverse]   - défile dans l'autre sens
 * @param {number}  [opts.offset]    - décale l'ordre des logos (pour désynchroniser deux rangées)
 * @param {boolean} [opts.mobileOnly]- rangée visible uniquement sur mobile (2e rangée)
 */
export function partnersCarousel(opts = {}) {
  const { reverse = false, offset = 0, mobileOnly = false } = opts;
  const list = offset ? [...partners.slice(offset), ...partners.slice(0, offset)] : partners;
  // La 2e rangée (mobileOnly) est décorative : masquée aux lecteurs d'écran (les logos accessibles
  // sont dans la 1re rangée), les liens restent cliquables au toucher.
  const logoItem = (p, dup = false) =>
    `<li class="partners-carousel__item"${dup || mobileOnly ? ' aria-hidden="true"' : ''}>
      <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer"${dup || mobileOnly ? ' tabindex="-1"' : ''} class="partners-carousel__link" aria-label="${escapeHtml(p.name)}, site officiel (nouvel onglet)">
        <picture>
          <source srcset="${p.logo}.webp" type="image/webp" />
          <img src="${p.logo}.png" alt="Logo ${escapeHtml(p.name)}" loading="lazy" />
        </picture>
      </a>
    </li>`;
  const set = list.map((p) => logoItem(p)).join('');
  const dup = list.map((p) => logoItem(p, true)).join('');
  const cls = ['partners-carousel', reverse ? 'partners-carousel--reverse' : '', mobileOnly ? 'partners-carousel--mobile' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}"${mobileOnly ? ' aria-hidden="true"' : ' aria-label="Nos partenaires fabricants"'}>
  <ul class="partners-carousel__track" data-partners-track>
    ${set}${dup}
  </ul>
</div>`;
}
