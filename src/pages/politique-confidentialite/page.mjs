import { site } from '../partials/site-data.mjs';

export const meta = {
  title: 'Politique de confidentialité | LE SOMMER',
  description: "Politique de confidentialité de LE SOMMER : quelles données sont collectées via le formulaire de contact, pour quelle finalité, combien de temps et quels sont vos droits.",
  path: '/politique-confidentialite/',
};

export function content() {
  return `
<section class="section--tight">
  <div class="container container--narrow legal-content">
    <h1>Politique de confidentialité</h1>
    <p>Cette politique explique comment ${site.legalName} traite les données personnelles collectées sur ce site, dans le respect du Règlement général sur la protection des données (RGPD).</p>

    <h2>Responsable du traitement</h2>
    <p>${site.legalName}, ${site.address.street}, ${site.address.postalCode} ${site.address.locality}. Contact : <a href="mailto:${site.email}">${site.email}</a> ou <a href="${site.phoneHref}">${site.phoneDisplay}</a>.</p>

    <h2>Données collectées via le formulaire de contact</h2>
    <p>Lorsque vous utilisez le formulaire de contact, nous collectons les données que vous renseignez : nom, email, téléphone, entreprise (facultatif), sujet et message.</p>
    <ul>
      <li><strong>Finalité :</strong> répondre à votre demande (devis, dépannage, information, candidature).</li>
      <li><strong>Base légale :</strong> votre consentement, recueilli via la case à cocher du formulaire.</li>
      <li><strong>Destinataire :</strong> uniquement ${site.legalName}. Les messages sont reçus par email ; aucune base de données de contacts n'est constituée.</li>
      <li><strong>Durée de conservation :</strong> le temps nécessaire au traitement de votre demande, puis archivage ou suppression. <!-- [À FOURNIR : durée de conservation précise à valider avec le client] --></li>
    </ul>

    <h2>Mesure d'audience</h2>
    <p>Si une mesure d'audience est activée, elle utilise une solution respectueuse de la vie privée (Matomo en configuration exemptée de consentement : sans cookie de suivi, avec anonymisation de l'adresse IP), n'entraînant pas d'obligation de bannière. En l'absence d'un tel outil, aucune donnée de navigation n'est collectée à des fins statistiques. <!-- [À CONFIRMER : Matomo exempté activé ou non] --></p>

    <h2>Journaux serveur</h2>
    <p>L'hébergeur conserve des journaux de connexion techniques (adresse IP, horodatage) à des fins de sécurité et de bon fonctionnement, conformément à ses obligations légales.</p>

    <h2>Cookies</h2>
    <p>Le site ne dépose pas de cookie publicitaire ou de suivi tiers. Un cookie de session technique peut être utilisé uniquement lors de l'envoi du formulaire de contact, pour des raisons de sécurité (protection anti-abus). Les cartes affichées sont des images statiques, sans cookie tiers.</p>

    <h2>Vos droits</h2>
    <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation sur vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:${site.email}">${site.email}</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>
  </div>
</section>`;
}
