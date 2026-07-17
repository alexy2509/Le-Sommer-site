import { consolidatedContent } from '../partials/page-helpers.mjs';
import { serviceJsonLd } from '../partials/blocks.mjs';

const built = consolidatedContent({
  eyebrow: "Pôle matériel d'élevage",
  h1: "Matériel d'élevage en Finistère et en Bretagne",
  intro: `<p style="font-size:var(--fs-body-lg)">LE SOMMER fournit, installe et dépanne le matériel d'élevage des exploitations avicoles, porcines et bovines. Nous travaillons avec des fabricants reconnus comme Landmeco, Skiold et CBM, et accompagnons chaque projet du conseil jusqu'au service après-vente.</p>`,
  sections: [
    {
      id: 'aviculture',
      title: 'Aviculture',
      lead: "De la poulette à la pondeuse jusqu'à la volaille de chair.",
      body: `<p>Nous équipons les bâtiments avicoles du conseil à l'installation jusqu'au dépannage. Alimentation, abreuvement, chauffage et ventilation : chaque équipement est adapté à votre élevage.</p>`,
      points: ['Systèmes pour pondeuse et poulette', "Systèmes d'alimentation", "Systèmes d'abreuvement", 'Chauffage et ventilation', 'Équipements divers (relevage)'],
    },
    {
      id: 'porcin',
      title: 'Porcin',
      lead: 'Des équipements fiables pour la porcherie.',
      body: `<p>Nous fournissons et installons des équipements d'alimentation et de ventilation pour les élevages porcins, avec le dépannage associé.</p>`,
      points: ["Systèmes d'alimentation", 'Ventilation des bâtiments porcins', 'Équipements adaptés à votre exploitation', 'Installation et dépannage sur site'],
    },
    {
      id: 'bovin',
      title: 'Bovin',
      lead: 'Des équipements adaptés à votre bâtiment bovin.',
      body: `<p>Nous accompagnons les éleveurs bovins dans l'équipement de leurs bâtiments, du conseil à l'installation. <span class="badge">À compléter</span> Le détail des gammes bovines et des exemples de réalisations seront ajoutés prochainement.<!-- [À FOURNIR : détail des équipements bovins et marques, exemples de réalisations] --></p>`,
      points: ['Équipements de bâtiment bovin', 'Conseil et étude de projet', 'Installation sur site', 'Assistance et dépannage'],
    },
    {
      id: 'faf-stockage',
      title: "Fabrique d'aliment à la ferme & stockage",
      lead: "Maîtrisez la composition et le coût de l'alimentation de vos animaux.",
      body: `<p>La fabrique d'aliment à la ferme (FAF) vous permet de produire votre propre aliment. Nous étudions votre projet, fournissons le matériel et l'installons, en lien avec l'électricité et l'automatisme du bâtiment.</p>`,
      points: ["Solutions de fabrique d'aliment à la ferme", 'Systèmes de stockage adaptés', "Transfert et distribution de l'aliment", "Intégration avec l'armoire électrique et l'automatisme"],
    },
  ],
  zoneText: "Nous fournissons, installons et dépannons le matériel d'élevage dans le Finistère et en Bretagne.",
  faq: [
    { q: 'Avec quels fabricants travaillez-vous ?', a: 'Nous installons notamment les solutions de nos partenaires Landmeco, Skiold et CBM, ainsi que du matériel pour la ventilation, le chauffage et le stockage.' },
    { q: 'Assurez-vous le dépannage du matériel installé ?', a: "Oui. Nous assurons l'assistance et le dépannage sur les installations d'élevage : ventilation, alimentation, abreuvement, automatismes." },
    { q: 'Sur quel secteur intervenez-vous ?', a: "Nous intervenons dans le Finistère et en Bretagne pour la fourniture, l'installation et le dépannage du matériel d'élevage." },
  ],
});

export const meta = {
  title: "Matériel d'élevage en Finistère & Bretagne | LE SOMMER",
  description: "Matériel d'élevage : aviculture, porcin, bovin, FAF & stockage. Fourniture, installation et dépannage avec Landmeco, Skiold et CBM dans le Finistère et en Bretagne.",
  path: '/materiel-elevage/',
  breadcrumb: [
    { label: 'Accueil', path: '/' },
    { label: "Matériel d'élevage", path: '/materiel-elevage/' },
  ],
  jsonLd: [
    serviceJsonLd({
      name: "Matériel d'élevage",
      description: "Fourniture, installation et dépannage de matériel d'élevage : aviculture, porcin, bovin, FAF et stockage.",
      path: '/materiel-elevage/',
    }),
    ...built.jsonLd,
  ],
};

export function content() {
  return built.html;
}
