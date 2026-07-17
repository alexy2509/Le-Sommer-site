// Source de vérité unique pour les données NAP / organisation.
// Toute donnée absente ici doit être un [À FOURNIR] documenté dans TODO-CLIENT.md — jamais inventée.

export const site = {
  name: 'LE SOMMER',
  legalName: 'LE SOMMER',
  legalForm: 'SARL',
  founder: 'Vivien Le Sommer',
  siret: '893 501 379 00018',
  siren: '893 501 379',
  shareCapital: '8 000 €',
  domain: 'https://www.le-sommer.com',
  phoneDisplay: '06 61 04 89 26',
  phoneHref: 'tel:+33661048926',
  email: 'v.lesommer@outlook.fr',
  address: {
    street: 'Rond-point de Kerourvois',
    postalCode: '29500',
    locality: 'Ergué-Gabéric',
    region: 'Bretagne',
    country: 'FR',
  },
  // Coordonnées vérifiées via OpenStreetMap Nominatim (Rond-Point de Kerourvois).
  geo: { latitude: 48.0014699, longitude: -4.0460625 },
  hoursDisplay: '24h/24, 7j/7',
  mapUrl: 'https://www.openstreetmap.org/?mlat=48.0014699&mlon=-4.0460625#map=17/48.00147/-4.04606',
  areaServed: ['Ergué-Gabéric', 'Quimper', 'Finistère', 'Bretagne'],
  sameAs: ['https://www.facebook.com/profile.php?id=61565894530617', 'https://www.linkedin.com/company/le-sommer/'],
  hostingProvider: {
    name: 'Hostinger International Ltd',
    address: '61 Lordou Vironos Street, 6023 Larnaca, Chypre',
  },
  agency: { name: 'CapWeb', city: 'Quimper' },
};

// Silos consolidés : chaque « sous-thème » est désormais une section (ancre) de la page hub,
// pas une page distincte. Les liens pointent vers hub#ancre pour garder le maillage interne.
export const nav = {
  electricite: {
    label: 'Électricité industrielle',
    path: '/electricite-industrielle/',
    children: [
      { label: 'Armoires électriques sur-mesure', path: '/electricite-industrielle/#armoires' },
      { label: 'Raccordement', path: '/electricite-industrielle/#raccordement' },
      { label: 'Dépannage électrique', path: '/electricite-industrielle/#depannage' },
    ],
  },
  elevage: {
    label: "Matériel d'élevage",
    path: '/materiel-elevage/',
    children: [
      { label: 'Aviculture', path: '/materiel-elevage/#aviculture' },
      { label: 'Porcin', path: '/materiel-elevage/#porcin' },
      { label: 'Bovin', path: '/materiel-elevage/#bovin' },
      { label: 'FAF & stockage', path: '/materiel-elevage/#faf-stockage' },
    ],
  },
  simple: [
    { label: 'À propos', path: '/a-propos/' },
    { label: 'Recrutement', path: '/recrutement/' },
    { label: 'Contact', path: '/contact/' },
  ],
};

// Partenaires fabricants affichés avec logo + lien vers leur site.
// N'inclure que ceux dont nous avons le logo ET une URL vérifiée.
export const partners = [
  { name: 'Landmeco', slug: 'landmeco', url: 'https://landmeco.com', logo: '/assets/partners/landmeco' },
  { name: 'Skiold', slug: 'skiold', url: 'https://skiold.com/fr', logo: '/assets/partners/skiold' },
  { name: 'CBM', slug: 'cbm', url: 'https://eu.cbmlighting.com/fr/', logo: '/assets/partners/cbm' },
];

export const footerSitemap = [
  { label: 'Accueil', path: '/' },
  { label: 'Électricité industrielle', path: '/electricite-industrielle/' },
  { label: 'Armoires électriques sur-mesure', path: '/electricite-industrielle/#armoires' },
  { label: 'Raccordement', path: '/electricite-industrielle/#raccordement' },
  { label: 'Dépannage électrique', path: '/electricite-industrielle/#depannage' },
  { label: "Matériel d'élevage", path: '/materiel-elevage/' },
  { label: 'Aviculture', path: '/materiel-elevage/#aviculture' },
  { label: 'Porcin', path: '/materiel-elevage/#porcin' },
  { label: 'Bovin', path: '/materiel-elevage/#bovin' },
  { label: 'FAF & stockage', path: '/materiel-elevage/#faf-stockage' },
  { label: 'À propos', path: '/a-propos/' },
  { label: "Zone d'intervention", path: '/zone-intervention/' },
  { label: 'Recrutement', path: '/recrutement/' },
  { label: 'Contact', path: '/contact/' },
  { label: 'Mentions légales', path: '/mentions-legales/' },
  { label: 'Politique de confidentialité', path: '/politique-confidentialite/' },
];
