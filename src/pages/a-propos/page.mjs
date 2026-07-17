import { icon } from '../partials/icons.mjs';
import { ctaBand, placeholder } from '../partials/blocks.mjs';

export const meta = {
  title: 'À propos | LE SOMMER, électricité industrielle & élevage',
  description: "LE SOMMER, dirigée par Vivien Le Sommer à Ergué-Gabéric : électricité industrielle et matériel d'élevage, du conseil à l'installation jusqu'au dépannage.",
  path: '/a-propos/',
  breadcrumb: [
    { label: 'Accueil', path: '/' },
    { label: 'À propos', path: '/a-propos/' },
  ],
};

export function content() {
  return `
<section class="section--tight">
  <div class="container container--narrow">
    <p class="eyebrow">L'entreprise</p>
    <h1>LE SOMMER, électricité industrielle et matériel d'élevage</h1>
    <p style="font-size:var(--fs-body-lg)">Basée à Ergué-Gabéric, dans le Finistère, LE SOMMER accompagne les industriels et les éleveurs sur deux métiers complémentaires : l'électricité industrielle et le matériel d'élevage. De l'étude à l'installation jusqu'au dépannage, l'entreprise assure un suivi complet de vos projets.</p>
    <p>L'entreprise est dirigée par <strong>Vivien Le Sommer</strong>. Son ancrage local et sa connaissance du monde agricole et industriel lui permettent de proposer des installations fiables et adaptées aux contraintes réelles du terrain.</p>
    <p><span class="badge">À compléter</span> L'histoire détaillée de l'entreprise, son année de création et son effectif seront ajoutés prochainement. <!-- [À FOURNIR : année de création, effectif, historique] --></p>
  </div>
</section>

<section class="section--tight section--alt" aria-labelledby="methode">
  <div class="container">
    <div class="section-head"><h2 id="methode">Notre méthode, du projet au SAV</h2></div>
    <ol class="method-steps">
      <li class="js-anim" data-reveal><strong>Fourniture</strong><p class="card__text">Matériel électrique ou d'élevage préparé en amont, issu de fabricants reconnus.</p></li>
      <li class="js-anim" data-reveal><strong>Installation</strong><p class="card__text">Assemblage, raccordement et mise en service par nos équipes.</p></li>
      <li class="js-anim" data-reveal><strong>SAV 24h/24 et 7j/7</strong><p class="card__text">Assistance et dépannage par des techniciens spécialisés.</p></li>
    </ol>
  </div>
</section>

<section class="section--tight" aria-labelledby="partenaires">
  <div class="container">
    <div class="section-head"><h2 id="partenaires">Nos partenariats fabricants</h2>
    <p>Nous installons le matériel de fabricants reconnus, notamment nos partenaires Landmeco, Skiold et CBM. D'autres partenariats viendront compléter cette liste prochainement.</p>
    </div>
  </div>
</section>

<section class="section--tight" aria-labelledby="equipe">
  <div class="container">
    <div class="grid grid--2" style="align-items:center; gap:var(--space-lg);">
      <div class="js-anim" data-reveal>
        <h2 id="equipe">Une équipe à taille humaine</h2>
        <p>LE SOMMER est une entreprise en développement, attachée à la proximité avec ses clients et à la qualité de ses interventions. ${'' /* faits vérifiés uniquement */}</p>
        <p><a class="card__link" href="/recrutement/">Découvrir nos offres d'emploi ${icon('arrowRight', 'icon')}</a></p>
      </div>
      <div class="js-anim" data-reveal>
        ${placeholder('Photo à venir : équipe et atelier LE SOMMER', { iconName: 'team' })}
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">${ctaBand()}</div>
</section>`;
}
