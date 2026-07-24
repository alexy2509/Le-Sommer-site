import { bretagneMap } from './bretagne-map.data.mjs';
import { escapeHtml } from '../escape.mjs';

/**
 * Plan de la Bretagne : les 4 départements délimités, le Finistère mis en avant.
 * Une aura en dégradé rayonne depuis le Finistère vers les départements limitrophes
 * (elle est découpée sur la masse continentale : elle ne déborde jamais dans l'océan).
 * Les îles (Ouessant, Sein, Groix, Belle-Île…) restent neutres : hors zone d'intervention.
 *
 * Interaction : seule la surface du Finistère réagit au survol (et non le bloc entier).
 * SVG inline, aucune carte tierce, aucun cookie.
 *
 * @param {object} [opts]
 * @param {string} [opts.id]      - préfixe des identifiants SVG (unique si la carte est rendue 2 fois)
 * @param {string} [opts.caption] - légende sous la carte (vide = pas de légende)
 */
export function bretagneZone({ id = 'bz', caption = '' } = {}) {
  const { viewBox, aura, siege, depts } = bretagneMap;
  const [, , w, h] = viewBox.split(' ');
  const finistere = depts.find((d) => d.code === '29');
  const others = depts.filter((d) => d.code !== '29');
  const islands = depts.filter((d) => d.islands).map((d) => d.islands).join('');

  return `<figure class="bretagne-zone">
  <svg class="bretagne-zone__svg" viewBox="${viewBox}" role="img" aria-label="Carte de la Bretagne : le Finistère, notre zone d'intervention, et les départements limitrophes">
    <defs>
      <radialGradient id="${id}-aura" gradientUnits="userSpaceOnUse" cx="${aura.cx}" cy="${aura.cy}" r="${aura.r}">
        <stop class="bretagne-zone__aura-in" offset="0" />
        <stop class="bretagne-zone__aura-mid" offset="0.42" />
        <stop class="bretagne-zone__aura-out" offset="1" />
      </radialGradient>
      <linearGradient id="${id}-fin" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0.9" y2="1">
        <stop class="bretagne-zone__fin-0" offset="0" />
        <stop class="bretagne-zone__fin-1" offset="1" />
      </linearGradient>
      <clipPath id="${id}-land">
        ${depts.map((d) => `<path d="${d.d}" />`).join('')}
      </clipPath>
    </defs>

    <g class="bretagne-zone__base">
      ${others.map((d) => `<path class="bretagne-zone__dept" d="${d.d}"><title>${escapeHtml(d.nom)}</title></path>`).join('')}
    </g>

    <rect class="bretagne-zone__aura" clip-path="url(#${id}-land)" x="0" y="0" width="${w}" height="${h}" fill="url(#${id}-aura)" />

    <g class="bretagne-zone__outline" aria-hidden="true">
      ${others.map((d) => `<path d="${d.d}" />`).join('')}
    </g>

    <g class="bretagne-zone__finistere">
      <path class="bretagne-zone__dept--finistere" d="${finistere.d}" fill="url(#${id}-fin)"><title>${escapeHtml(finistere.nom)} : notre zone d'intervention</title></path>
    </g>

    <path class="bretagne-zone__island" d="${islands}" aria-hidden="true" />

    <g class="bretagne-zone__pin" aria-hidden="true">
      <circle class="bretagne-zone__pin-halo" cx="${siege.x}" cy="${siege.y}" r="26" />
      <circle class="bretagne-zone__pin-ring" cx="${siege.x}" cy="${siege.y}" r="13" />
      <circle class="bretagne-zone__pin-dot" cx="${siege.x}" cy="${siege.y}" r="6.5" />
    </g>
    <text class="bretagne-zone__label" x="${siege.x + 26}" y="${siege.y + 6}">Ergué-Gabéric</text>
  </svg>
  ${caption ? `<figcaption class="bretagne-zone__caption">${caption}</figcaption>` : ''}
</figure>`;
}
