import { icon } from '../partials/icons.mjs';
import { site } from '../partials/site-data.mjs';
import { contactBand, photoCarousel } from '../partials/blocks/index.mjs';
// Slides et photos décrits une seule fois dans blocks/work-gallery.data.mjs, avec les sources
// que le script de préparation des assets transforme en images responsives.
import { carouselPhotos as realisations } from '../partials/blocks/work-gallery.data.mjs';

const jobTitle = 'Technicien Monteur Dépanneur H/F';
const mailtoSubject = encodeURIComponent('Candidature Technicien Monteur Dépanneur H/F');
const mailtoBody = encodeURIComponent("Bonjour,\n\nJe souhaite postuler à l'offre de Technicien Monteur Dépanneur H/F.\nVous trouverez mon CV en pièce jointe.\n\nNom :\nTéléphone :\nDisponibilité :\n\nCordialement,");
const mailto = `mailto:${site.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

const jobPosting = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: jobTitle,
  description:
    "Technicien Monteur Dépanneur H/F en CDI temps plein chez LE SOMMER (Ergué-Gabéric). Montage, installation et dépannage de matériel électrique et d'élevage. Véhicule de fonction, travail en journée. Une expérience ou un diplôme dans le photovoltaïque (panneaux solaires) est particulièrement apprécié. Entreprise en développement offrant des opportunités d'évolution.",
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
        <p style="font-size:var(--fs-body-lg)">LE SOMMER, entreprise en développement spécialisée en électricité industrielle, matériel d'élevage, ventilation et fabrique d'aliment à la ferme, recherche un Technicien Monteur Dépanneur pour renforcer ses équipes.</p>

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
            <li><strong>Une expérience ou un diplôme dans le photovoltaïque (panneaux solaires) est particulièrement recherché</strong></li>
            <li>Une sensibilité au monde agricole et de l'élevage est un plus</li>
          </ul>
        </div>
      </div>
      <div class="recruit-hero__media">
        <p class="eyebrow">Le métier au quotidien</p>
        ${photoCarousel(realisations)}
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
      <li>Un poste ouvert sur le photovoltaïque, activité que nous développons</li>
    </ul>
    <div class="card" style="margin-top:var(--space-md)">
      <h3 class="card__title">Comment postuler</h3>
      <p class="card__text">Envoyez votre CV et quelques mots sur votre motivation par email. Aucun dépôt de fichier n'est nécessaire sur le site : votre candidature se fait directement par messagerie, avec votre CV en pièce jointe.</p>
      <a class="btn btn--primary" style="margin-top:var(--space-sm); align-self:flex-start;" href="${mailto}">${icon('mail', 'icon')} Postuler par email</a>
      <p class="card__text" style="margin-top:var(--space-2xs)">Ou par téléphone : <a href="${site.phoneHref}">${site.phoneDisplay}</a></p>
    </div>
  </div>
</section>

<section class="section-contact">
  <div class="container">${contactBand({ title: 'Une question sur le poste ?', text: 'Appelez-nous, nous vous répondrons directement.', primaryLabel: 'Nous contacter' })}</div>
</section>`;
}
