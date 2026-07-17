import { icon } from './icons.mjs';
import { escapeHtml } from './escape.mjs';
import { faqBlock, ctaBand } from './blocks.mjs';
import { site } from './site-data.mjs';

/**
 * Page silo consolidée : une intro, puis chaque sous-thème en SECTION avec ancre
 * (plus de sous-pages séparées), une zone d'intervention, une FAQ et un CTA.
 *
 * @param {object} cfg
 * @param {string} cfg.eyebrow
 * @param {string} cfg.h1
 * @param {string} cfg.intro - HTML (paragraphes)
 * @param {Array}  cfg.sections - [{ id, title, lead, body?, points?[], highlight? }]
 * @param {string} cfg.zoneText
 * @param {Array}  cfg.faq - [{q,a}]
 */
export function consolidatedContent({ eyebrow, h1, intro, sections, zoneText, faq }) {
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

<section class="silo-section" aria-labelledby="zone-title">
  <div class="container container--narrow">
    <h2 id="zone-title">Zone d'intervention</h2>
    <p>${zoneText}</p>
    <a class="card__link" href="/zone-intervention/">Découvrir notre zone d'intervention ${icon('arrowRight', 'icon')}</a>
  </div>
</section>

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

<section>
  <div class="container">${ctaBand()}</div>
</section>`;

  return { html, jsonLd: faqRes ? [faqRes.jsonLd] : [] };
}

export { site };
