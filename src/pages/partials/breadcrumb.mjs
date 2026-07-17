import { escapeHtml } from './escape.mjs';

export function breadcrumb(trail) {
  if (!trail || trail.length < 2) return '';
  return `<nav class="breadcrumb" aria-label="Fil d'Ariane">
  <div class="container">
    <ol>
      ${trail
        .map((item, i) => {
          const isLast = i === trail.length - 1;
          return `<li>${isLast || !item.path ? `<span aria-current="page">${escapeHtml(item.label)}</span>` : `<a href="${item.path}">${escapeHtml(item.label)}</a>`}</li>`;
        })
        .join('')}
    </ol>
  </div>
</nav>`;
}
