import { consolidatedContent } from '../partials/page-helpers.mjs';
import { serviceJsonLd, beyondBand } from '../partials/blocks/index.mjs';
import { icon } from '../partials/icons.mjs';
import { site } from '../partials/site-data.mjs';

// Sections additionnelles (hors sous-sections élevage) : SAV 24/7 du matériel d'élevage,
// puis services para-agricoles à la demande (plomberie, traitement des eaux…).
const extra = `
<section class="section--tight section--alt" aria-labelledby="sav-elevage">
  <div class="container container--narrow">
    <span class="badge badge--success badge--dot">Disponible 24h/24, 7j/7</span>
    <h2 id="sav-elevage" style="margin-top:var(--space-sm)">Une panne sur votre matériel d'élevage ?</h2>
    <p>Ventilation, alimentation, abreuvement, chauffage, éclairage, FAF, automatisme : notre SAV couvre tout ce que nous installons. Un appel suffit, à toute heure.</p>
    <a class="btn btn--primary" href="${site.phoneHref}">${icon('phone', 'icon')} ${site.phoneDisplay}</a>
  </div>
</section>

<section class="section--tight" aria-labelledby="para-agricole">
  <div class="container">${beyondBand()}</div>
</section>`;

const built = consolidatedContent({
  eyebrow: "Pôle matériel d'élevage",
  h1: "Matériel d'élevage dans le Finistère",
  intro: `<p style="font-size:var(--fs-body-lg)">Nous vendons, installons et dépannons le matériel des exploitations avicoles, porcines et bovines : ventilation, alimentation, abreuvement, chauffage, éclairage, fabrique d'aliment à la ferme et stockage. Le SAV est assuré 24h/24 et 7j/7. Nous travaillons avec Landmeco, Skiold, Lubing, Sodalec ou Systel.</p>`,
  sections: [
    {
      id: 'aviculture',
      title: 'Aviculture',
      lead: "De la poulette à la pondeuse jusqu'à la volaille de chair.",
      body: `<p>Alimentation, abreuvement, chauffage, ventilation et éclairage : chaque équipement est adapté à votre bâtiment, de la vente au dépannage.</p>`,
      points: ['Systèmes pour pondeuse et poulette', "Systèmes d'alimentation", "Systèmes d'abreuvement", 'Chauffage et ventilation', 'Éclairage piloté', 'Équipements divers (relevage)'],
    },
    {
      id: 'porcin',
      title: 'Porcin',
      lead: 'Des équipements fiables pour la porcherie.',
      body: `<p>Alimentation, abreuvement et ventilation des élevages porcins : vente, installation et dépannage par nos équipes.</p>`,
      points: ["Systèmes d'alimentation et d'abreuvement", 'Ventilation des bâtiments porcins', 'Équipements adaptés à votre exploitation', 'Installation et dépannage sur site'],
    },
    {
      id: 'bovin',
      title: 'Bovin',
      lead: 'Ventilation, brassage d’air et équipements de stabulation.',
      body: `<p>Nous équipons les stabulations en brasseurs d'air et en ventilation, avec l'électricité et l'automatisme associés, du conseil au dépannage.<!-- [À FOURNIR : détail des autres équipements bovins et marques] --></p>`,
      points: ['Brasseurs d’air et ventilation de stabulation', 'Alimentation et abreuvement', 'Conseil et étude de projet', 'Installation, assistance et dépannage'],
    },
    {
      id: 'ventilation',
      title: 'Ventilation & traitement de l’air',
      lead: 'Vente, installation et entretien des systèmes de ventilation.',
      body: `<p>La ventilation conditionne les performances du bâtiment. Nous vendons et installons turbines, extracteurs, trappes, brasseurs d'air et régulations, puis en assurons l'entretien et le dépannage.</p>`,
      points: ['Turbines, extracteurs et trappes d’entrée d’air', 'Brasseurs d’air pour bovins', 'Régulation et automatisme de ventilation', 'Entretien, remplacement et dépannage'],
    },
    {
      id: 'faf-stockage',
      title: "Fabrique d'aliment à la ferme & stockage",
      lead: "Maîtrisez la composition et le coût de l'alimentation de vos animaux.",
      body: `<p>Broyeurs, mélangeurs, vis de transfert et silos : nous étudions le projet, fournissons le matériel et l'installons, en lien avec l'électricité et l'automatisme du bâtiment.</p>`,
      points: ['Broyeurs et mélangeurs', 'Silos et systèmes de stockage adaptés', "Vis de transfert et distribution de l'aliment", "Intégration avec l'armoire électrique et l'automatisme"],
    },
  ],
  gallery: 'elevage',
  extra,
  faq: [
    { q: 'Avec quels fabricants travaillez-vous ?', a: 'Nous installons notamment les solutions de nos partenaires Landmeco, Skiold, Lubing (abreuvement), Sodalec (ventilation), Systel et S+H Nolting (chauffage), ainsi que du matériel de stockage.' },
    { q: 'Assurez-vous le dépannage du matériel installé ?', a: "Oui. Nous assurons l'assistance et le dépannage sur les installations d'élevage (ventilation, alimentation, abreuvement, automatismes), 24h/24 et 7j/7." },
    { q: 'Sur quel secteur intervenez-vous ?', a: "Nous intervenons dans le Finistère et les communes limitrophes pour la vente, l'installation et le dépannage du matériel d'élevage." },
    { q: 'Installez-vous une fabrique d’aliment à la ferme complète ?', a: "Oui. Nous fournissons et installons l'ensemble de la chaîne : broyeurs, mélangeurs, vis de transfert, silos de stockage, ainsi que l'armoire électrique et l'automatisme qui la pilotent." },
    { q: 'Réalisez-vous aussi la plomberie et le traitement des eaux ?', a: "Oui. Au-delà du matériel d'élevage, nous réalisons des travaux para-agricoles : plomberie, réseaux, traitement des eaux et divers travaux étudiés au cas par cas." },
  ],
});

export const meta = {
  title: "Matériel d'élevage dans le Finistère | LE SOMMER",
  description: "Matériel d'élevage dans le Finistère : ventilation, alimentation, abreuvement, chauffage, éclairage, FAF (broyeurs, mélangeurs) et stockage. Vente, installation et SAV 24h/24.",
  path: '/materiel-elevage/',
  jsonLd: [
    serviceJsonLd({
      name: "Matériel d'élevage",
      description: "Vente, installation et dépannage de matériel d'élevage : ventilation, alimentation, abreuvement, chauffage, éclairage, FAF (broyeurs, mélangeurs) et stockage.",
      path: '/materiel-elevage/',
    }),
    ...built.jsonLd,
  ],
};

export function content() {
  return built.html;
}
