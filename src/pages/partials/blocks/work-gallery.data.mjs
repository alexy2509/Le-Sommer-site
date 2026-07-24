/*
  Photos de chantier du client — source de vérité unique.

  Les sources gardent le nom d'origine dans src/assets/img/work/ ; `scripts/prepare-assets.mjs`
  lit ce fichier pour produire les déclinaisons responsives dans public/assets/img/work/.

  Chaque pôle liste TOUTES ses photos : la galerie des pages pôle affiche celles marquées
  `featured` en grille, et la visionneuse plein écran permet de parcourir la totalité.

  - `featured` : photo retenue pour la grille « vitrine » (les meilleures)
  - `brand`    : clé d'un logo partenaire (public/assets/partners/<clé>.png), affiché en
                 pastille HTML par-dessus la photo — le fichier image n'est jamais retouché
  - `crop`     : position de recadrage sharp, quand le cadrage centré sort le sujet du cadre
*/

/** Mention affichée sous chaque photo en plein écran. */
export const PHOTO_CREDIT =
  '© LE SOMMER — Photo de chantier réalisée par l’entreprise. Reproduction, diffusion ou réutilisation interdites sans autorisation écrite.';

export const workGallery = {
  electricite: [
    {
      slug: 'armoire-atelier',
      source: 'electrité indus armoire elctrique.JPG',
      caption: 'Armoire en cours d’assemblage',
      alt: "Armoire électrique industrielle en cours d'assemblage en atelier à Ergué-Gabéric",
      featured: true,
    },
    {
      slug: 'armoire-commande',
      source: 'electrité indus automatisme sodalec.JPG',
      caption: 'Armoire de commande et automatisme',
      alt: "Armoire électrique de commande et d'automatisme Sodalec installée sur un site du Finistère",
      brand: 'sodalec',
      featured: true,
    },
    {
      slug: 'tableau-distribution',
      source: 'electrité indus armoire electri.JPG',
      caption: 'Tableau de distribution raccordé',
      alt: 'Tableau de distribution électrique industriel raccordé et repéré',
      featured: true,
    },
    {
      slug: 'armoire-elevage',
      source: 'electrité indus automatisme de la marque sodalec.JPG',
      caption: 'Automatisme de bâtiment d’élevage',
      alt: "Armoire d'automatisme Sodalec pilotant un bâtiment d'élevage dans le Finistère",
      brand: 'sodalec',
      featured: true,
    },
    {
      slug: 'groupe-electrogene',
      source: 'electrité indus raccordement avec groupe electro.JPG',
      caption: 'Raccordement d’un groupe électrogène',
      alt: "Groupe électrogène raccordé au pied d'un bâtiment agricole",
      featured: true,
    },
    {
      slug: 'eclairage-batiment',
      source: 'electrité indus installation de lumière dans un poulailler entier.JPG',
      caption: 'Éclairage complet d’un bâtiment',
      alt: "Installation de l'éclairage complet d'un bâtiment d'élevage dans le Finistère",
      featured: true,
    },
    {
      slug: 'armoire-atelier-2',
      source: 'electrité indus armoire elec.JPG',
      caption: 'Armoire de commande installée',
      alt: 'Armoire électrique de commande installée et raccordée sur site',
    },
    {
      slug: 'automatisme-ecran',
      source: 'electrité indus automatisme sodalec 2.JPG',
      caption: 'Automatisme à écran tactile',
      alt: "Armoire d'automatisme Sodalec à écran tactile pilotant une installation",
      brand: 'sodalec',
    },
    {
      slug: 'coffret-fg-wilson',
      source: 'electrité indus electricité FG WILSON.JPG',
      caption: 'Coffret d’inversion de source',
      alt: "Coffret électrique d'inversion de source pour groupe électrogène",
    },
    {
      slug: 'batiment-camion',
      source: 'electrité indus et elevage interieur de batiment et camion LS.JPG',
      caption: 'Intervention en bâtiment',
      alt: 'Véhicule LE SOMMER en intervention dans un bâtiment agricole',
    },
    {
      slug: 'raccordement-skiold',
      source: 'electrité indus raccordement electriaue de la marque skiold.png',
      caption: 'Raccordement d’une installation Skiold',
      alt: "Raccordement électrique d'une installation Skiold en bâtiment d'élevage",
      brand: 'skiold',
    },
    {
      slug: 'raccordement-armoire',
      source: 'electrité indus raccordement electrique.JPG',
      caption: 'Raccordement électrique',
      alt: "Raccordement électrique d'une armoire sur une installation",
    },
    {
      slug: 'groupe-electrogene-2',
      source: 'electrité indus raccordement groupe electro.JPG',
      caption: 'Groupe électrogène de secours',
      alt: 'Groupe électrogène de secours raccordé dans un local technique',
    },
    {
      slug: 'cheminement-cables',
      source: 'electrité indus raccordement propre.JPG',
      caption: 'Cheminement de câbles',
      alt: 'Cheminement de câbles électriques soigné le long d’une paroi de bâtiment',
    },
  ],

  elevage: [
    {
      slug: 'poulailler-equipe',
      source: "elevage photo d'un poulailler équipé landmeco et ventilation apparente +.JPG",
      caption: 'Poulailler équipé, ventilation apparente',
      alt: 'Poulailler équipé en matériel Landmeco avec ventilation apparente, installé par LE SOMMER',
      brand: 'landmeco',
      featured: true,
    },
    {
      slug: 'bovin-brasseur-air',
      source: 'elevage de vache mise en place de ventilation dans le batiment ++.JPG',
      caption: 'Ventilation de stabulation bovine',
      alt: "Brasseur d'air installé par LE SOMMER dans une stabulation bovine",
      featured: true,
    },
    {
      slug: 'voliere-interieur',
      source: 'elevage interieur de batiment +.JPG',
      caption: 'Volière avant mise en service',
      alt: "Intérieur d'une volière avicole équipée avant la mise en service du bâtiment",
      featured: true,
    },
    {
      slug: 'voliere-en-service',
      source: "elevage intérieur d'une voliere, pleins de poules sur la photo.JPG",
      caption: 'Volière en production',
      alt: 'Volière avicole en production, équipements d’alimentation et d’abreuvement en service',
      featured: true,
    },
    {
      slug: 'ventilation-exterieur',
      source: 'elevage grilles de ventilation vue de dehors du poullailler +.JPG',
      caption: 'Ventilation de bâtiment avicole',
      alt: "Grilles et turbines de ventilation en façade d'un bâtiment avicole en Bretagne",
      featured: true,
    },
    {
      slug: 'silo-levage',
      source: 'elevage installation silot et camion LS ++.JPG',
      caption: 'Chantier de pose de silo',
      alt: 'Camion et grue LE SOMMER sur un chantier de pose de silo à aliment dans le Finistère',
      // Cadrage bas : c'est là que se trouvent le camion LE SOMMER et la grue.
      crop: 'bottom',
      featured: true,
    },
    {
      slug: 'ligne-alimentation',
      source: 'elevage poulailler interieur de la marque  landmeco.JPG',
      caption: 'Ligne d’alimentation',
      alt: "Ligne d'alimentation Landmeco installée dans un poulailler",
      brand: 'landmeco',
    },
    {
      slug: 'silo-exterieur',
      source: 'elevage instalation silot.JPG',
      caption: 'Silo installé en extérieur',
      alt: "Silo à aliment installé en extérieur le long d'un bâtiment d'élevage",
    },
    {
      slug: 'ventilation-poulailler',
      source: 'elevage instalation ventilation dans un poulailler.JPG',
      caption: 'Ventilation intérieure de poulailler',
      alt: "Turbines de ventilation installées à l'intérieur d'un poulailler",
    },
    {
      slug: 'convoyeur-oeufs',
      source: 'elevage installation convoyeur.JPG',
      caption: 'Convoyeur à œufs',
      alt: 'Convoyeur à œufs installé dans un bâtiment de pondeuses',
    },
    {
      slug: 'ventilation-plafond',
      source: 'elevage installation de ventilation dans un pouleiller.JPG',
      caption: 'Ventilation de plafond',
      alt: 'Ventilateurs de plafond installés dans un bâtiment avicole',
    },
    {
      slug: 'machine-skiold',
      source: 'elevage installation machine de la marque skiold.JPG',
      caption: 'Matériel Skiold installé',
      alt: 'Matériel de fabrique d’aliment Skiold installé par LE SOMMER',
      brand: 'skiold',
    },
    {
      slug: 'machine-landmeco',
      source: 'elevage installation machine landmeco dans un elevage de poule.JPG',
      caption: 'Équipement Landmeco en élevage',
      alt: 'Équipement Landmeco installé dans un élevage de poules',
      brand: 'landmeco',
    },
    {
      slug: 'poulailler-interieur',
      source: 'elevage interieur poulailler.JPG',
      caption: 'Intérieur de poulailler équipé',
      alt: 'Intérieur de poulailler équipé en alimentation et abreuvement',
    },
    {
      slug: 'voliere-avant-poules',
      source: "elevage interieur voliere avant l'arrivée des poules.JPG",
      caption: 'Volière prête à recevoir le cheptel',
      alt: 'Volière avicole terminée, prête à recevoir les poules',
    },
    {
      slug: 'materiel-elevage',
      source: 'elevage materiel.JPG',
      caption: 'Matériel d’élevage installé',
      alt: 'Matériel d’élevage installé dans un bâtiment agricole',
    },
    {
      slug: 'silos-interieur',
      source: 'elevage mise en place de silots en intérieur.png',
      caption: 'Silos de stockage en intérieur',
      alt: 'Silos de stockage d’aliment mis en place à l’intérieur d’un bâtiment',
    },
    {
      slug: 'poulailler-neuf',
      source: 'elevage poulailler tout neuf installé.JPG',
      caption: 'Poulailler neuf équipé',
      alt: 'Poulailler neuf entièrement équipé par LE SOMMER',
    },
    {
      slug: 'raccordement-silos',
      source: 'elevage raccordement silots à aliment.JPG',
      caption: 'Raccordement de silos à aliment',
      alt: 'Raccordement de silos à aliment et vis de transfert',
    },
    {
      slug: 'silo-skiold',
      source: "elevage silot d'aliment animaux de la marque skiold.JPG",
      caption: 'Silo à aliment Skiold',
      alt: 'Silo à aliment Skiold installé sur une exploitation',
      brand: 'skiold',
    },
    {
      slug: 'silos-rousseau',
      source: 'elevage silots rousseau.JPG',
      caption: 'Silos de stockage',
      alt: 'Silos de stockage d’aliment installés en extérieur',
    },
    {
      slug: 'convoyeur-exterieur',
      source: "elevage vue de dehor d'un convoyeur d'oeuf pour poulailler.JPG",
      caption: 'Convoyeur extérieur',
      alt: 'Convoyeur extérieur reliant deux bâtiments avicoles',
    },
    {
      slug: 'convoyeur-facade',
      source: 'elevage vue de dehors convoyeur poulailler.JPG',
      caption: 'Convoyeur en façade de bâtiment',
      alt: 'Convoyeur installé en façade d’un bâtiment avicole',
    },
  ],
};

/**
 * Carrousel « le métier au quotidien » de la page recrutement : chaque photo montre une
 * facette du poste et le savoir-faire qu'elle demande (le candidat se projette dans le métier).
 * Les slugs servent de chemin d'image (public/assets/img/work/<slug>-{768,1200}.*).
 */
export const carouselPhotos = [
  {
    slug: 'metier-eclairage',
    source: 'electrité indus installation de lumière dans un poulailler entier.JPG',
    title: 'Éclairage de bâtiment',
    text: "Installer l'éclairage complet d'un bâtiment : lire un plan, tirer les réseaux et câbler proprement sur toute la longueur, en sécurité.",
    alt: "Installation de l'éclairage complet d'un poulailler par LE SOMMER",
  },
  {
    slug: 'metier-automatisme',
    source: 'electrité indus automatisme de la marque sodalec.JPG',
    title: 'Automatisme',
    text: 'Raccorder et paramétrer une armoire d\'automatisme : régulation, mise en service et dépannage demandent de la méthode et de la rigueur.',
    alt: "Armoire d'automatisme Sodalec raccordée par LE SOMMER",
    brand: 'sodalec',
  },
  {
    slug: 'metier-elevage',
    source: "elevage photo d'un poulailler équipé landmeco et ventilation apparente +.JPG",
    title: 'Montage de matériel d’élevage',
    text: "Équiper un bâtiment : monter l'alimentation, l'abreuvement et la ventilation en suivant les notices constructeur, jusqu'à la mise en route.",
    alt: 'Poulailler équipé en matériel Landmeco avec ventilation apparente',
    brand: 'landmeco',
  },
  {
    slug: 'metier-ventilation-bovin',
    source: 'elevage de vache mise en place de ventilation dans le batiment ++.JPG',
    title: 'Ventilation de stabulation',
    text: "Poser et raccorder un brasseur d'air en hauteur, au-dessus des animaux : fixation, sécurité et raccordement électrique soignés.",
    alt: "Brasseur d'air installé par LE SOMMER dans une stabulation bovine",
  },
];

/** Toutes les photos de galerie, tous pôles confondus — pour le script de préparation. */
export const allWorkGalleryPhotos = [...workGallery.electricite, ...workGallery.elevage];
