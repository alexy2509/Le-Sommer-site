import { icon } from '../partials/icons.mjs';

export const meta = {
  title: 'Page introuvable (404) | LE SOMMER',
  description: "La page demandée est introuvable. Retrouvez nos services d'électricité industrielle et de matériel d'élevage.",
  path: '/404.html',
  navActive: '/__none__',
};

export function content() {
  return `
<section class="error-404">
  <div class="container container--narrow">
    <p class="error-404__code">404</p>
    <h1>Cette page est introuvable</h1>
    <p style="font-size:var(--fs-body-lg)">Le lien est peut-être erroné ou la page a été déplacée. Voici quelques pistes pour retrouver ce que vous cherchez.</p>
    <div class="error-404__actions">
      <a class="btn btn--primary" href="/">${icon('arrowRight', 'icon')} Retour à l'accueil</a>
      <a class="btn btn--secondary" href="/electricite-industrielle/">Électricité industrielle</a>
      <a class="btn btn--secondary" href="/materiel-elevage/">Matériel d'élevage</a>
      <a class="btn btn--secondary" href="/contact/">Contact</a>
    </div>
  </div>
</section>`;
}
