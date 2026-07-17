import { consolidatedContent } from '../partials/page-helpers.mjs';
import { serviceJsonLd } from '../partials/blocks.mjs';

const built = consolidatedContent({
  eyebrow: 'Pôle électricité industrielle',
  h1: 'Électricité industrielle dans le Finistère et en Bretagne',
  intro: `<p style="font-size:var(--fs-body-lg)">LE SOMMER conçoit, raccorde et dépanne les installations électriques des industriels et des éleveurs. De l'armoire sur-mesure au dépannage d'un automatisme, nos techniciens spécialisés interviennent pour assurer la continuité de votre activité.</p>`,
  sections: [
    {
      id: 'armoires',
      title: 'Armoires électriques sur-mesure',
      lead: "Des armoires dimensionnées précisément pour votre installation, jamais un modèle standard.",
      body: `<p>Chaque armoire est étudiée avec un bureau d'étude indépendant, puis assemblée par nos équipes selon vos besoins de puissance, d'automatisme et d'environnement (industrie, agroalimentaire, bâtiment d'élevage). Nous préparons le matériel en atelier pour réduire le temps d'intervention sur site.</p>`,
      points: ['Étude et schéma adaptés à votre installation', 'Armoires de commande et de puissance', 'Intégration d\'automatismes et de régulations', 'Préparation en atelier, raccordement et mise en service'],
    },
    {
      id: 'raccordement',
      title: "Raccordement d'armoires et d'automatismes",
      lead: 'Un raccordement propre et rapide, préparé en amont.',
      body: `<p>Nous préparons le matériel avant l'intervention afin de raccorder rapidement sur site, sur des installations neuves comme sur des extensions ou des modifications d'installations existantes.</p>`,
      points: ['Raccordement d\'armoires de commande et de puissance', 'Raccordement et mise en service d\'automatismes', 'Câblage adapté à votre installation', 'Délais d\'intervention réduits grâce à la préparation en amont'],
    },
    {
      id: 'depannage',
      title: 'Dépannage électrique & SAV',
      highlight: 'Disponible 24h/24, 7j/7',
      lead: 'Une panne électrique ou un automatisme à l\'arrêt met votre activité en difficulté. Nous intervenons vite.',
      body: `<p>Nos techniciens, spécialisés en matériel électrique et en automatisme, diagnostiquent l'origine de la panne et interviennent rapidement, qu'il s'agisse d'une armoire, d'un automatisme de production ou d'un équipement de bâtiment d'élevage. Le service de dépannage est joignable 24h/24 et 7j/7.</p>`,
      points: ['Diagnostic et dépannage d\'installations défectueuses', 'Intervention sur automatismes en panne', 'SAV sur le matériel installé (industrie et élevage)', 'Disponibilité 24h/24 et 7j/7'],
    },
  ],
  zoneText: "Nous intervenons pour l'électricité industrielle à Ergué-Gabéric, Quimper, dans tout le Finistère et en Bretagne.",
  faq: [
    { q: 'Réalisez-vous des armoires pour l\'industrie et l\'agriculture ?', a: "Oui. Nos armoires sur-mesure équipent aussi bien des sites industriels que des bâtiments d'élevage (ventilation, alimentation, FAF), avec l'automatisme adapté." },
    { q: 'Intervenez-vous en urgence sur une panne électrique ?', a: 'Oui. Notre service de dépannage est disponible 24h/24 et 7j/7. Un appel suffit pour organiser une intervention rapide sur votre installation.' },
    { q: 'Dans quel secteur intervenez-vous ?', a: "Nous intervenons pour l'électricité industrielle dans le Finistère et en Bretagne, au départ d'Ergué-Gabéric." },
  ],
});

export const meta = {
  title: 'Électricité industrielle en Finistère & Bretagne | LE SOMMER',
  description: "Électricité industrielle à Ergué-Gabéric (29) : armoires sur-mesure, raccordement d'automatismes et dépannage 24h/24. Techniciens spécialisés en Finistère et Bretagne.",
  path: '/electricite-industrielle/',
  breadcrumb: [
    { label: 'Accueil', path: '/' },
    { label: 'Électricité industrielle', path: '/electricite-industrielle/' },
  ],
  jsonLd: [
    serviceJsonLd({
      name: 'Électricité industrielle',
      description: "Armoires électriques sur-mesure, raccordement d'automatismes et dépannage électrique industriel 24h/24.",
      path: '/electricite-industrielle/',
    }),
    ...built.jsonLd,
  ],
};

export function content() {
  return built.html;
}
