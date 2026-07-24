import { consolidatedContent } from '../partials/page-helpers.mjs';
import { serviceJsonLd } from '../partials/blocks/index.mjs';

const built = consolidatedContent({
  eyebrow: 'Pôle électricité industrielle',
  h1: 'Électricité industrielle dans le Finistère',
  intro: `<p style="font-size:var(--fs-body-lg)">Nous concevons, installons, raccordons et dépannons les installations électriques des industriels et des éleveurs : armoires sur-mesure, automatismes, éclairage et mise en conformité. Le SAV est assuré 24h/24 et 7j/7 sur l'ensemble de nos services, dans le Finistère et les communes limitrophes.</p>`,
  sections: [
    {
      id: 'armoires',
      title: 'Armoires électriques sur-mesure',
      lead: 'Dimensionnées pour votre installation, jamais un modèle standard.',
      body: `<p>Chaque armoire est étudiée avec un bureau d'étude indépendant, puis assemblée par nos équipes. La préparation en atelier réduit le temps d'intervention sur site.</p>`,
      points: ['Étude et schéma adaptés à votre installation', 'Armoires de commande et de puissance', "Intégration d'automatismes et de régulations", 'Préparation en atelier, raccordement et mise en service'],
    },
    {
      id: 'raccordement',
      title: "Raccordement d'armoires et d'automatismes",
      lead: 'Un raccordement propre et rapide, préparé en amont.',
      body: `<p>Installations neuves, extensions ou modifications d'existant : le matériel est préparé avant l'intervention pour raccorder vite sur site.</p>`,
      points: ["Raccordement d'armoires de commande et de puissance", "Raccordement et mise en service d'automatismes", 'Câblage adapté à votre installation', "Délais d'intervention réduits"],
    },
    {
      id: 'eclairage',
      title: 'Éclairage de bâtiment',
      lead: 'Un éclairage adapté à l’usage du bâtiment et à sa consommation.',
      body: `<p>Nous fournissons et posons l'éclairage des bâtiments industriels comme des bâtiments d'élevage, y compris les systèmes pilotés (variation, programmation) qui suivent les cycles des animaux.</p>`,
      points: ['Étude et fourniture du matériel d’éclairage', 'Installation complète en bâtiment neuf ou en rénovation', 'Éclairage piloté et variation pour l’élevage', 'Remplacement et dépannage des installations existantes'],
    },
    {
      id: 'depannage',
      title: 'Dépannage & SAV 24h/24',
      highlight: 'Disponible 24h/24, 7j/7',
      lead: "Une panne ou un automatisme à l'arrêt met votre activité en difficulté. Nous intervenons vite.",
      body: `<p>Nos techniciens, spécialisés en matériel électrique et en automatisme, diagnostiquent la panne et interviennent rapidement. Le SAV couvre <strong>tous nos services</strong> : électricité, automatisme, ventilation, alimentation, abreuvement, FAF, plomberie et traitement des eaux.</p>`,
      points: ["Diagnostic et dépannage d'installations défectueuses", 'Intervention sur automatismes en panne', 'SAV sur l’ensemble du matériel que nous installons', 'Disponibilité 24h/24 et 7j/7'],
    },
  ],
  gallery: 'electricite',
  faq: [
    { q: 'Réalisez-vous des armoires pour l\'industrie et l\'agriculture ?', a: "Oui. Nos armoires sur-mesure équipent aussi bien des sites industriels que des bâtiments d'élevage (ventilation, alimentation, abreuvement, FAF), avec l'automatisme adapté." },
    { q: 'Intervenez-vous en urgence sur une panne électrique ?', a: 'Oui. Notre service de dépannage est disponible 24h/24 et 7j/7. Un appel suffit pour organiser une intervention rapide sur votre installation.' },
    { q: 'Le SAV couvre-t-il tous les matériels que vous installez ?', a: "Oui. Le service après-vente couvre l'ensemble de nos prestations : électricité et automatisme, ventilation, alimentation, abreuvement, chauffage, FAF, éclairage, plomberie et traitement des eaux." },
    { q: 'Dans quel secteur intervenez-vous ?', a: "Nous intervenons pour l'électricité industrielle dans le Finistère et les communes limitrophes, au départ d'Ergué-Gabéric." },
  ],
});

export const meta = {
  title: 'Électricité industrielle en Finistère | LE SOMMER',
  description: "Électricité industrielle à Ergué-Gabéric (29) : armoires sur-mesure, raccordement d'automatismes, éclairage et dépannage 24h/24. Techniciens spécialisés dans le Finistère.",
  path: '/electricite-industrielle/',
  jsonLd: [
    serviceJsonLd({
      name: 'Électricité industrielle',
      description: "Armoires électriques sur-mesure, raccordement d'automatismes, éclairage de bâtiment et dépannage électrique industriel 24h/24.",
      path: '/electricite-industrielle/',
    }),
    ...built.jsonLd,
  ],
};

export function content() {
  return built.html;
}
