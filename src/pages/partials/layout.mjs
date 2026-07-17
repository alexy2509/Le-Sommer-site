import { head } from './head.mjs';
import { header } from './header.mjs';
import { footer } from './footer.mjs';
import { breadcrumb } from './breadcrumb.mjs';

/**
 * Compose le document HTML complet d'une page.
 * @param {object} meta - voir head.mjs (title, description, path, breadcrumb, jsonLd, navActive)
 * @param {string} mainHtml - contenu de <main> (sans balise <main> englobante)
 */
export function layout(meta, mainHtml) {
  return `<!doctype html>
<html lang="fr">
${head(meta)}
<body class="has-mobile-actionbar">
  <div id="circuit-container" data-circuit aria-hidden="true"></div>
  <div class="page">
    ${header(meta.navActive ?? meta.path)}
    ${breadcrumb(meta.breadcrumb)}
    <main id="contenu">
      ${mainHtml}
    </main>
    ${footer()}
  </div>
  <script type="module" src="/js/main.js"></script>
</body>
</html>`;
}
