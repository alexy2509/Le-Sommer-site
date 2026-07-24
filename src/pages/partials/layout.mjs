import { head } from './head.mjs';
import { header } from './header.mjs';
import { footer } from './footer.mjs';

/**
 * Compose le document HTML complet d'une page. Chaque page est autonome
 * (pas de fil d'Ariane) : header, contenu, footer.
 * @param {object} meta - voir head.mjs (title, description, path, jsonLd, navActive)
 * @param {string} mainHtml - contenu de <main> (sans balise <main> englobante)
 */
export function layout(meta, mainHtml) {
  return `<!doctype html>
<html lang="fr">
${head(meta)}
<body>
  <div id="circuit-container" data-circuit aria-hidden="true"></div>
  <div class="page">
    ${header(meta.navActive ?? meta.path)}
    <main id="contenu">
      ${mainHtml}
    </main>
    ${footer()}
  </div>
  <script type="module" src="/js/main.js"></script>
</body>
</html>`;
}
