import { icon } from '../icons.mjs';
import { escapeHtml } from '../escape.mjs';

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
