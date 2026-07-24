import { site } from '../partials/site-data.mjs';

export const meta = {
  title: 'Mentions légales | LE SOMMER',
  description: "Mentions légales du site LE SOMMER : éditeur, directeur de publication, hébergeur et informations sur l'entreprise (Ergué-Gabéric, 29).",
  path: '/mentions-legales/',
};

export function content() {
  return `
<section class="section--tight">
  <div class="container container--narrow legal-content">
    <h1>Mentions légales</h1>

    <h2>Éditeur du site</h2>
    <address>
      <strong>${site.legalName}</strong>, ${site.legalForm} au capital de ${site.shareCapital}<br />
      ${site.address.street}, ${site.address.postalCode} ${site.address.locality}<br />
      SIREN : ${site.siren}<br />
      SIRET : ${site.siret}<br />
      Téléphone : <a href="${site.phoneHref}">${site.phoneDisplay}</a><br />
      Email : <a href="mailto:${site.email}">${site.email}</a>
    </address>
    <p>Numéro de TVA intracommunautaire : FR38893501379.</p>

    <h2>Directeur de la publication</h2>
    <p>${site.founder}, gérant de ${site.legalName}.</p>

    <h2>Hébergeur</h2>
    <address>
      ${site.hostingProvider.name}<br />
      ${site.hostingProvider.address}
    </address>

    <h2>Propriété intellectuelle</h2>
    <p>L'ensemble des contenus de ce site (textes, images, logo, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable écrite de ${site.legalName}, est interdite. Les marques et logos des fabricants partenaires restent la propriété de leurs titulaires respectifs.</p>

    <h2>Responsabilité</h2>
    <p>${site.legalName} s'efforce d'assurer l'exactitude des informations publiées sur ce site, sans pouvoir en garantir l'exhaustivité. Les informations sont fournies à titre indicatif et peuvent évoluer. ${site.legalName} ne saurait être tenue responsable d'une utilisation faite de ces informations.</p>

    <h2>Données personnelles</h2>
    <p>Le traitement des données transmises via le formulaire de contact est décrit dans notre <a href="/politique-confidentialite/">politique de confidentialité</a>.</p>

    <h2>Crédits</h2>
    <p>Conception et réalisation du site : ${site.agency.name} (${site.agency.city}).</p>
  </div>
</section>`;
}
