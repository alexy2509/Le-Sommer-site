import { icon } from '../partials/icons.mjs';
import { ctaBand, placeholder } from '../partials/blocks.mjs';

const villes = ['Quimper', 'Concarneau', 'Rosporden', 'Fouesnant', 'Briec', 'Châteaulin', 'Quimperlé', 'Douarnenez', "Pont-l'Abbé", 'Landerneau', 'Carhaix'];

export const meta = {
  title: "Zone d'intervention : Finistère et Bretagne | LE SOMMER",
  description: "Électricien industriel à Ergué-Gabéric : nous intervenons dans le Finistère et en Bretagne pour l'électricité industrielle et le matériel d'élevage.",
  path: '/zone-intervention/',
  breadcrumb: [
    { label: 'Accueil', path: '/' },
    { label: "Zone d'intervention", path: '/zone-intervention/' },
  ],
};

export function content() {
  return `
<section class="section--tight">
  <div class="container container--narrow">
    <p class="eyebrow">Zone d'intervention</p>
    <h1>Électricien industriel dans le Finistère et en Bretagne</h1>
    <p style="font-size:var(--fs-body-lg)">Basés à Ergué-Gabéric, aux portes de Quimper, nous intervenons dans tout le Finistère et en Bretagne, pour l'électricité industrielle comme pour la vente et l'installation de matériel d'élevage.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="grid grid--2" style="gap:var(--space-lg); align-items:start;">
      <div class="stack js-anim" data-reveal>
        <div>
          <h2>Ergué-Gabéric et Quimper</h2>
          <p>Notre siège se situe au rond-point de Kerourvois à Ergué-Gabéric, à proximité immédiate de Quimper. Cette position centrale dans le Finistère sud nous permet d'intervenir rapidement auprès des industriels et des éleveurs du bassin quimpérois.</p>
        </div>
        <div>
          <h2>Le Finistère</h2>
          <p>Nous couvrons l'ensemble du Finistère (29) pour l'électricité industrielle ainsi que pour la vente et l'installation de matériel d'élevage : armoires, raccordement, dépannage, équipements avicoles, porcins et bovins.</p>
        </div>
        <div>
          <h2>Toute la Bretagne</h2>
          <p>Nous intervenons également dans le Morbihan (56), les Côtes-d'Armor (22) et l'Ille-et-Vilaine (35), au service des exploitations et des sites industriels bretons.</p>
        </div>
      </div>
      <div class="js-anim" data-reveal>
        <div class="zone-map">
          ${placeholder('Carte statique OpenStreetMap à intégrer (image, sans iframe)', { iconName: 'compass' })}
          <p class="zone-map__caption">Carte de la zone d'intervention à intégrer (source OpenStreetMap, image statique sans cookie tiers).</p>
        </div>
        <h3 style="margin-top:var(--space-md)">Principales villes desservies</h3>
        <ul class="zone-list">
          ${villes.map((v) => `<li>${v}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section--tight section--alt">
  <div class="container container--narrow">
    <h2>Un besoin dans votre secteur ?</h2>
    <p>Que vous soyez industriel ou éleveur, contactez-nous pour vérifier notre disponibilité et étudier votre projet.</p>
    <p class="cluster">
      <a class="btn btn--primary" href="/contact/">Nous contacter ${icon('arrowRight', 'icon')}</a>
      <a class="btn btn--secondary" href="/electricite-industrielle/">Nos services électricité</a>
      <a class="btn btn--secondary" href="/materiel-elevage/">Nos services élevage</a>
    </p>
  </div>
</section>

<section>
  <div class="container">${ctaBand()}</div>
</section>`;
}
