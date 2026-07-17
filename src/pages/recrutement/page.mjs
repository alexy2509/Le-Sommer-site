import { icon } from '../partials/icons.mjs';
import { site } from '../partials/site-data.mjs';
import { ctaBand, photoCarousel } from '../partials/blocks.mjs';

const realisations = [
  {
    slug: 'armoire',
    title: 'Armoire électrique',
    text: "Nous assemblons votre armoire sur-mesure avec l'aide d'un bureau d'étude indépendant, pour répondre à vos attentes et à votre projet.",
    alt: 'Armoire électrique sur-mesure assemblée en atelier par LE SOMMER',
  },
  {
    slug: 'raccordement',
    title: 'Raccordement',
    text: "Avec l'aide de nos équipes en amont, nous raccordons une armoire ou un automatisme dans des délais très brefs.",
    alt: "Raccordement d'armoires et d'automatismes sur une installation d'élevage",
  },
  {
    slug: 'automatisme',
    title: 'Dépannage électrique',
    text: 'Grâce à nos techniciens spécialisés en matériel électrique et en automatisme, nous assurons un service après-vente et un dépannage dans les meilleurs délais.',
    alt: "Armoire d'automatisme industriel installée par LE SOMMER",
  },
];

const jobTitle = 'Technicien Monteur Dépanneur H/F';
const mailtoSubject = encodeURIComponent('Candidature Technicien Monteur Dépanneur H/F');
const mailtoBody = encodeURIComponent("Bonjour,\n\nJe souhaite postuler à l'offre de Technicien Monteur Dépanneur H/F.\nVous trouverez mon CV en pièce jointe.\n\nNom :\nTéléphone :\nDisponibilité :\n\nCordialement,");
const mailto = `mailto:${site.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

const jobPosting = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: jobTitle,
  description:
    "Technicien Monteur Dépanneur H/F en CDI temps plein chez LE SOMMER (Ergué-Gabéric). Montage, installation et dépannage de matériel électrique et d'élevage. Véhicule de fonction, travail en journée. Entreprise en développement offrant des opportunités d'évolution.",
  employmentType: 'FULL_TIME',
  datePosted: '2026-01-01',
  hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: `${site.domain}/` },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
  },
  baseSalary: {
    '@type': 'MonetaryAmount',
    currency: 'EUR',
    value: { '@type': 'QuantitativeValue', minValue: 13, unitText: 'HOUR' },
  },
};

export const meta = {
  title: 'Emploi Technicien Monteur Dépanneur (F/H) | LE SOMMER',
  description: "LE SOMMER recrute un Technicien Monteur Dépanneur H/F en CDI à Ergué-Gabéric (29) : véhicule de fonction, travail en journée, à partir de 13 €/h. Postulez par email.",
  path: '/recrutement/',
  breadcrumb: [
    { label: 'Accueil', path: '/' },
    { label: 'Recrutement', path: '/recrutement/' },
  ],
  jsonLd: [jobPosting],
};

export function content() {
  return `
<section class="section--tight">
  <div class="container">
    <div class="recruit-hero">
      <div class="recruit-hero__intro">
        <span class="badge badge--success badge--dot">Offre en cours</span>
        <h1 style="margin-top:var(--space-sm)">${jobTitle} en CDI</h1>
        <div class="job-meta">
          <span class="job-meta__item">${icon('briefcase', 'icon')} CDI temps plein</span>
          <span class="job-meta__item">${icon('euro', 'icon')} À partir de 13 €/h</span>
          <span class="job-meta__item">${icon('car', 'icon')} Véhicule de fonction</span>
          <span class="job-meta__item">${icon('clock', 'icon')} Travail en journée</span>
          <span class="job-meta__item">${icon('pin', 'icon')} Ergué-Gabéric (29)</span>
        </div>
        <p style="font-size:var(--fs-body-lg)">LE SOMMER, entreprise en développement spécialisée en électricité industrielle et matériel d'élevage, recherche un Technicien Monteur Dépanneur pour renforcer ses équipes.</p>
        <p>Vous réaliserez des armoires sur-mesure, leur raccordement et leur installation, et interviendrez en dépannage des installations de nos clients.</p>
      </div>
      <div class="recruit-hero__media">
        <p class="eyebrow">Le métier au quotidien</p>
        ${photoCarousel(realisations)}
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="job-columns">
      <div class="js-anim" data-reveal>
        <h2>Vos missions</h2>
        <ul>
          <li>Montage et installation de matériel électrique et d'élevage</li>
          <li>Raccordement d'armoires et d'automatismes</li>
          <li>Dépannage d'installations chez nos clients industriels et éleveurs</li>
          <li>Assistance et service après-vente</li>
        </ul>
      </div>
      <div class="js-anim" data-reveal>
        <h2>Profil recherché</h2>
        <ul>
          <li>Bac+2 souhaité (BTS/DUT)</li>
          <li>1 an d'expérience en montage souhaité</li>
          <li>Compétences en électromécanique / maintenance appréciées</li>
          <li>Une sensibilité au monde agricole et de l'élevage est un plus</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section--tight section--alt">
  <div class="container container--narrow">
    <h2>Ce que nous offrons</h2>
    <ul>
      <li>Un CDI à temps plein dans une entreprise en développement</li>
      <li>Un véhicule de fonction</li>
      <li>Un travail en journée</li>
      <li>Des opportunités d'évolution</li>
    </ul>
    <div class="card" style="margin-top:var(--space-md)">
      <h3 class="card__title">Comment postuler</h3>
      <p class="card__text">Envoyez votre CV et quelques mots sur votre motivation par email. Aucun dépôt de fichier n'est nécessaire sur le site : votre candidature se fait directement par messagerie, avec votre CV en pièce jointe.</p>
      <a class="btn btn--primary" style="margin-top:var(--space-sm); align-self:flex-start;" href="${mailto}">${icon('mail', 'icon')} Postuler par email</a>
      <p class="card__text" style="margin-top:var(--space-2xs)">Ou par téléphone : <a href="${site.phoneHref}">${site.phoneDisplay}</a></p>
    </div>
  </div>
</section>

<section>
  <div class="container">${ctaBand({ title: 'Une question sur le poste ?', text: 'Appelez-nous, nous vous répondrons directement.', primaryLabel: 'Nous contacter' })}</div>
</section>`;
}
