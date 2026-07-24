import { icon } from './icons.mjs';
import { escapeHtml } from './escape.mjs';
import { faqBlock, contactBand, workGalleryBand } from './blocks/index.mjs';
import { site } from './site-data.mjs';

/**
 * Page silo consolidée : une intro, puis chaque sous-thème en SECTION avec ancre
 * (plus de sous-pages séparées), une bande de réalisations, une FAQ et un CTA.
 *
 * Pas de bandeau « zone d'intervention » ici : il ferait doublon avec l'accueil. La couverture
 * géographique reste portée par l'intro et par la FAQ de chaque page.
 *
 * @param {object} cfg
 * @param {string} cfg.eyebrow
 * @param {string} cfg.h1
 * @param {string} cfg.intro - HTML (paragraphes)
 * @param {Array}  cfg.sections - [{ id, title, lead, body?, points?[], highlight? }]
 * @param {Array}  cfg.faq - [{q,a}]
 * @param {string} [cfg.extra] - HTML additionnel inséré après les réalisations (avant la FAQ)
 * @param {'electricite'|'elevage'} [cfg.gallery] - pôle dont on affiche les photos de réalisations
 */
export function consolidatedContent({ eyebrow, h1, intro, sections, faq, extra = '', gallery }) {
  const faqRes = faq ? faqBlock(faq) : null;

  const nav = `<nav class="silo-jump" aria-label="Sommaire du pôle">
    <ul>
      ${sections.map((s) => `<li><a href="#${s.id}">${escapeHtml(s.title)}</a></li>`).join('')}
    </ul>
  </nav>`;

  const sectionHtml = sections
    .map(
      (s, i) => `<section id="${s.id}" class="silo-section ${i % 2 === 1 ? 'section--alt' : ''}" aria-labelledby="${s.id}-title">
    <div class="container">
      <div class="silo-section__grid js-anim" data-reveal>
        <div class="silo-section__head">
          <span class="silo-section__num">${String(i + 1).padStart(2, '0')}</span>
          <h2 id="${s.id}-title">${escapeHtml(s.title)}</h2>
          ${s.highlight ? `<p class="badge badge--success badge--dot">${escapeHtml(s.highlight)}</p>` : ''}
        </div>
        <div class="silo-section__body">
          ${s.lead ? `<p class="silo-section__lead">${s.lead}</p>` : ''}
          ${s.body ?? ''}
          ${
            s.points && s.points.length
              ? `<ul class="check-list">${s.points.map((p) => `<li>${icon('check', 'icon')}<span>${p}</span></li>`).join('')}</ul>`
              : ''
          }
        </div>
      </div>
    </div>
  </section>`,
    )
    .join('');

  const html = `
<section class="section--tight">
  <div class="container container--narrow">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h1>${escapeHtml(h1)}</h1>
    ${intro}
    ${nav}
  </div>
</section>

${sectionHtml}

${
  gallery
    ? `<section class="section--tight" aria-labelledby="realisations-title">
  <div class="container">
    <h2 id="realisations-title" class="visually-hidden">Nos réalisations</h2>
    ${workGalleryBand(gallery)}
  </div>
</section>`
    : ''
}

${extra}

${
  faqRes
    ? `<section class="section--alt" aria-labelledby="faq-title">
  <div class="container container--narrow">
    <div class="section-head section-head--center"><h2 id="faq-title">Questions fréquentes</h2></div>
    ${faqRes.html}
  </div>
</section>`
    : ''
}

<section class="section-contact" aria-labelledby="contact-title">
  <div class="container">${contactBand()}</div>
</section>`;

  return { html, jsonLd: faqRes ? [faqRes.jsonLd] : [] };
}

export { site };
