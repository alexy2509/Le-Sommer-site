# CLAUDE.md — Site vitrine LE SOMMER

> Brief d'instructions pour Claude Code. Projet : création complète, de zéro, du nouveau site vitrine de l'entreprise **LE SOMMER** (électricité industrielle & matériel d'élevage — Ergué-Gabéric, Finistère). Ce document est la source de vérité unique du projet. Le respecter à la lettre.

---

## 1. Mission

Tu es le développeur principal de **CapWeb** (agence web, Quimper). Tu construis le nouveau site vitrine de LE SOMMER pour remplacer son site Wix actuel (le-sommer.com). Objectifs, par ordre de priorité :

1. **Sécurité irréprochable** — aucun vecteur d'attaque toléré, audit complet exigé avant livraison (section 12).
2. **SEO local dominant** — positionner LE SOMMER en tête des recherches liées à l'électricité industrielle et au matériel d'élevage dans le Finistère et en Bretagne (section 10).
3. **Expérience premium** — site rapide (Lighthouse ≥ 95 partout), animé en GSAP, moderne, mobile-first, accessible.
4. **Contenu de qualité** — rédaction professionnelle, factuelle, orientée conversion (appel / demande de devis).

Le site est **statique** (HTML/CSS/JS) avec un **unique point PHP** : le traitement du formulaire de contact. Hébergement : **Hostinger mutualisé** (Apache, PHP 8.2+, HTTPS Let's Encrypt).

---

## 2. Règles absolues

Ces règles priment sur tout le reste du document.

1. **Ne JAMAIS inventer de données factuelles.** Pas de faux chiffres ("15 ans d'expérience", "500 clients"), pas de fausses certifications, pas de faux avis clients, pas de faux numéro de téléphone. Si une donnée manque, insérer un placeholder visible `[À FOURNIR : description]` et le lister dans `TODO-CLIENT.md` à la racine du projet, ou alors, demande moi l'informations directement. La section 4 liste les données déjà identifiées comme manquantes.
2. **Aucune ressource tierce chargée depuis un CDN.** GSAP, Lenis, polices, icônes : tout est installé via npm, bundlé et servi depuis notre domaine. Zéro requête externe au chargement (hors Matomo si activé, voir section 14).
3. **Aucun upload de fichier via formulaire.** Y compris pour la page recrutement : les CV s'envoient par email (lien `mailto:` avec objet pré-rempli). L'upload sur mutualisé est un risque inacceptable.
4. **Textes UX courts.** Pas de paragraphes marketing creux. Chaque phrase sert la compréhension ou la conversion.
5. **`prefers-reduced-motion` respecté partout** : toutes les animations GSAP sont désactivées ou réduites à de simples fades si l'utilisateur le demande.
6. **Mobile d'abord.** Chaque composant est conçu en 375 px avant d'être élargi. Tester 375 / 768 / 1024 / 1440 / 1920.
7. **Tout commit doit laisser le site fonctionnel.** Pas de code mort, pas de `console.log`, pas de dépendance inutilisée.

---

## 3. Fiche client (données vérifiées depuis le site actuel)

| Champ | Valeur |
|---|---|
| Raison sociale | LE SOMMER |
| Gérant | Vivien LE SOMMER |
| Adresse | Rond-point de Kerourvois, 29500 Ergué-Gabéric |
| Email | v.lesommer@outlook.fr |
| Zone d'ancrage | Ergué-Gabéric / Quimper / Finistère / Bretagne |
| Portée | Livraison & installation sur toute la France |
| Facebook | https://www.facebook.com/profile.php?id=61565894530617 |
| LinkedIn | https://www.linkedin.com/company/le-sommer/ |
| Site actuel | https://www.le-sommer.com (Wix, à remplacer) |

### Les deux pôles d'activité

**Pôle 1 — Électricité industrielle**
- **Armoires électriques sur-mesure** : conception avec un bureau d'étude indépendant, assemblage adapté au projet du client.
- **Raccordement** : raccordement d'armoires et d'automatismes dans des délais brefs, préparation en amont par les équipes.
- **Dépannage électrique & SAV** : techniciens spécialisés en matériel électrique et automatisme, intervention rapide sur installations défectueuses.

**Pôle 2 — Matériel d'élevage** (fourniture + installation + dépannage)
- **Aviculture** (solutions LANDMECO — de la poulette à la pondeuse jusqu'à la volaille de chair) : pondeuse/poulette, systèmes d'alimentation, systèmes d'abreuvement, chauffage, ventilation, divers (relevage…).
- **Porcin** (solutions SKIOLD) : alimentation, ventilation, divers.
- **Bovin**.
- **FAF / Stockage** (fabrique d'aliment à la ferme, stockage).

**Partenaires affichés** : Landmeco, Skiold, S+H Nolting, Gustav Nölting (canons à gaz), Tube Ted, CBM. *(Vérifier la liste exacte et récupérer les logos officiels — voir section 4.)*

**Services transverses** : conseil & étude de projet, livraison/installation France entière, assistance/dépannage.

**Recrutement** (offre active sur le site actuel) : Technicien Monteur Dépanneur H/F — CDI temps plein, à partir de 13 €/h, véhicule de fonction, travail en journée. Profil : Bac+2 souhaité (BTS/DUT), 1 an d'expérience monteur souhaité, compétences électromécanique/maintenance appréciées, sensibilité au monde agricole/élevage est un plus. Entreprise en développement, opportunités d'évolution.

---

## 4. Données à demander à Alexy si besoin AVANT d'écrire le contenu final

Créer `TODO-CLIENT.md` et y consigner (avec placeholders dans le code en attendant) :

- [ ] **Numéro de téléphone est 06 61 04 89 26 (indispensable : CTA principal + JSON-LD + NAP local)
- [ ] **SIRET : 89350137900018 / SIREN : 893501379 + forme juridique : SARL + capital social de 8000 euros (mentions légales obligatoires)
- [ ] **Charte graphique + logo** (fournis par Alexy — voir section 5)
- [ ] Horaires d'ouverture / disponibilité dépannage 24h/24h et 7j/7j
- [ ] Année de création de l'entreprise, effectif en 2021 et compte 3 salariés
- [ ] Certifications / habilitations éventuelles (habilitations électriques, Qualifelec…) — **ne rien afficher sans confirmation**
- [ ] Photos réelles : ateliers, chantiers, armoires réalisées, véhicules, équipe, bâtiments d'élevage équipés qui arrivent bientôt. Mettre l'emplacement vide mais visible en attendant les photos
- [ ] Liste définitive des partenaires/marques + autorisation d'utiliser leurs logos à demander
- [ ] 2-3 exemples de chantiers/références citables (pour le contenu E-E-A-T) Attendre pour ces infos, mettre un emplacement pour. 
- [ ] Adresse email de réception du formulaire + compte SMTP Hostinger (voir 12.4)
- [ ] Fiche Google Business Profile pas encore créée, je te l'enverrais quand elle sera créée.  (URL, à faire créer sinon — levier SEO local n°1)

---

## 5. Charte graphique

**La charte graphique et le logo seront fournis par Alexy** dans `src/assets/brand/` (logo SVG + déclinaisons, palette, typographies). Dès réception : extraire les couleurs exactes et les injecter dans les design tokens ci-dessous. **Ne pas commencer l'intégration visuelle finale sans la charte.**

En attendant, développer avec ce système de tokens par défaut (proposition CapWeb, cohérente avec l'univers du métier — à écraser par la charte) :

```css
:root {
  /* Palette par défaut — univers électrotechnique industriel.
     Le cuivre = LE matériau du métier (câbles, bobinages) : accent signature. */
  --c-bg:            #101418;   /* anthracite profond (fond principal) */
  --c-bg-alt:        #1A2027;   /* panneaux, cartes */
  --c-surface:       #232B34;   /* surfaces élevées */
  --c-copper:        #C97B4A;   /* cuivre — accent principal, CTA, liens actifs */
  --c-copper-bright: #E8965A;   /* cuivre chauffé — hovers, lueurs */
  --c-steel:         #8FA3B0;   /* acier — textes secondaires, bordures */
  --c-text:          #EDF1F4;   /* texte principal sur sombre */
  --c-text-muted:    #A8B4BD;
  --c-success:       #4CAF7D;
  --c-error:         #E05C5C;

  /* Typographies — self-hostées (woff2 dans /src/assets/fonts/), jamais de CDN Google Fonts */
  --font-display: 'Archivo', system-ui, sans-serif;      /* titres — graisse Expanded/Bold, caractère industriel */
  --font-body:    'Inter', system-ui, sans-serif;         /* corps de texte */
  --font-mono:    'JetBrains Mono', ui-monospace, monospace; /* étiquettes techniques, références, chiffres */

  /* Échelle typographique fluide */
  --fs-hero:  clamp(2.4rem, 6vw, 5rem);
  --fs-h2:    clamp(1.8rem, 3.5vw, 3rem);
  --fs-h3:    clamp(1.3rem, 2vw, 1.75rem);
  --fs-body:  clamp(1rem, 1.1vw, 1.125rem);
  --fs-small: 0.875rem;

  /* Rythme */
  --space-section: clamp(5rem, 12vh, 9rem);
  --radius: 10px;
  --transition: 220ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Interdits DA** (pour éviter le rendu "template IA") : pas de fond crème + serif + terracotta générique, pas de dégradés arc-en-ciel, pas de glassmorphism systématique, pas de stock photos génériques d'électriciens souriants. L'imagerie vient du réel : photos client, textures techniques (schémas électriques stylisés, trames de circuit).

**Élément signature du site** : un **tracé de circuit électrique en SVG** (ligne fine cuivre, style schéma unifilaire) qui traverse verticalement les pages et **se dessine au scroll** (DrawSVG / stroke-dashoffset piloté par ScrollTrigger). Il relie visuellement les sections comme un courant qui alimente la page, avec des "nœuds" qui s'allument au passage de chaque section. Discret sur mobile (opacité réduite, simplifié), désactivé en reduced-motion. C'est LA prise de risque esthétique du site : tout le reste demeure sobre et discipliné.

---

## 6. Stack technique

| Brique | Choix | Justification |
|---|---|---|
| Build | **Vite** (multi-page app) | Bundling, minification, hashing des assets, HTML par page |
| Langage | **HTML5 sémantique + CSS moderne + JavaScript vanilla (ES modules)** | Aucun framework : perf maximale, maîtrise totale du code |
| Animations | **GSAP 3.13+** (npm) + plugins **ScrollTrigger**, **SplitText**, **DrawSVGPlugin** (tous gratuits depuis GSAP 3.13) | Cœur de la demande client : site dynamique |
| Scroll | **Lenis** (smooth scroll) synchronisé avec ScrollTrigger | Fluidité premium ; désactivé si reduced-motion |
| Backend | **PHP 8.2+** — un seul endpoint : `api/contact.php` (+ `api/config.php` protégé) | Compatible Hostinger mutualisé |
| Emails | **PHPMailer via SMTP authentifié Hostinger** (jamais `mail()` brut) | Délivrabilité + sécurité |
| Analytics | **Matomo self-hosted en configuration exemptée CNIL** (sinon rien) | RGPD sans bannière intrusive |
| Consentement | **tarteaucitron.js self-hosted** uniquement si un service non exempté est ajouté | RGPD |
| CI locale | Scripts npm : `dev`, `build`, `preview`, `lint`, `audit`, `check:links` | Qualité |
| Audit sécurité | **OWASP ZAP** (scan dynamique), **nmap**, **securityheaders.com**, **SSL Labs**, `npm audit`, grep du bundle | Tests offensifs avant livraison (section 12.7) |

### Arborescence projet

```
LS/
├── CLAUDE.md                  ← ce fichier
├── TODO-CLIENT.md             ← données manquantes (section 4)
├── package.json
├── vite.config.js             ← MPA : une entrée HTML par page
├── public/
│   ├── .htaccess              ← sécurité + HTTPS + cache (section 12.1)
│   ├── robots.txt
│   ├── sitemap.xml            ← généré au build
│   └── favicon.svg / .ico / apple-touch-icon.png / site.webmanifest
├── src/
│   ├── assets/
│   │   ├── brand/             ← charte + logo fournis par Alexy
│   │   ├── fonts/             ← woff2 self-hostés + licences
│   │   └── img/               ← sources images (converties AVIF/WebP au build)
│   ├── styles/                ← CSS découpé (tokens, base, layout, components, pages)
│   ├── js/
│   │   ├── main.js            ← init commune (nav, Lenis, GSAP defaults)
│   │   ├── animations/        ← un module par famille d'animation
│   │   └── modules/           ← form.js, circuit.js (signature), utils.js
│   └── pages/                 ← partiels HTML communs (head, header, footer) injectés au build
├── api/
│   ├── contact.php            ← traitement formulaire (section 12.4)
│   └── config.php             ← secrets SMTP (hors Git, protégé .htaccess)
└── index.html + pages HTML    ← voir arborescence du site (section 7)
```

`.gitignore` : `node_modules/`, `dist/`, `api/config.php`, `.env*`.

---

## 7. Arborescence du site & URLs

URLs courtes, en français, descriptives, sans stop-words inutiles, en minuscules avec tirets. **Deux silos thématiques** clairs (électricité / élevage) pour le maillage interne (section 10.4).

```
/                                        Accueil
/electricite-industrielle/               Hub silo 1
/electricite-industrielle/armoires-electriques/       Armoires sur-mesure
/electricite-industrielle/raccordement/               Raccordement armoires & automatismes
/electricite-industrielle/depannage-electrique/       Dépannage & SAV
/materiel-elevage/                       Hub silo 2
/materiel-elevage/aviculture/            Solutions Landmeco (volaille)
/materiel-elevage/porcin/                Solutions Skiold (porc)
/materiel-elevage/bovin/                 Bovin
/materiel-elevage/faf-stockage/          FAF & stockage
/a-propos/                               L'entreprise, Vivien Le Sommer, la démarche
/zone-intervention/                      Page SEO local (Ergué-Gabéric, Quimper, Finistère, Bretagne, France)
/recrutement/                            Offre(s) d'emploi
/contact/                                Formulaire + coordonnées + accès
/mentions-legales/                       Obligatoire
/politique-confidentialite/              Obligatoire (formulaire + Matomo)
/404.html                                Page 404 personnalisée (ErrorDocument dans .htaccess)
```

Avec Vite MPA : un fichier HTML par page à la racine du build, réécrit en URLs propres par `.htaccess` (ou dossiers + `index.html`, au choix — les URLs finales ci-dessus font foi, **avec trailing slash cohérent partout**).

---

## 8. Contenu page par page

Règles générales : un seul `<h1>` par page ; hiérarchie `h2/h3` stricte ; chaque page se termine par un bloc CTA (téléphone + lien contact) ; breadcrumb visible sur toutes les pages sauf l'accueil ; 300 à 700 mots de contenu réel par page de service (pas de remplissage).

### 8.1 Accueil `/`
1. **Hero** : logo animé, H1 = promesse métier + ancrage local (ex. « Électricité industrielle & matériel d'élevage — Ergué-Gabéric, Finistère »), sous-titre 1 phrase, double CTA (« Demander un devis » / « Nous appeler »), photo réelle plein écran assombrie ou texture circuit.
2. **Les deux pôles** : deux grandes cartes (Électricité industrielle / Matériel d'élevage) → hubs de silo.
3. **Services clés** : 6 vignettes (armoires, raccordement, dépannage, aviculture, porcin, FAF/stockage) → pages dédiées.
4. **Bandeau réassurance** : conseil & étude de projet · installation France entière · assistance/dépannage. (Uniquement des faits vérifiés.)
5. **Zone d'intervention** : carte stylisée Bretagne/France + texte court → `/zone-intervention/`.
6. **Partenaires** : logos (autorisation requise, cf. section 4), défilement discret.
7. **Recrutement teaser** (si offre active) + **CTA final**.

### 8.2 Hubs de silo (`/electricite-industrielle/`, `/materiel-elevage/`)
Intro du pôle (H1 + 150-250 mots avec mots-clés naturels), cartes vers chaque sous-page (liens descendants), lien transversal vers l'autre pôle en fin de page (« Besoin d'une armoire pour votre bâtiment d'élevage ? »), FAQ courte (3-4 questions, balisée FAQPage — section 10.5), CTA.

### 8.3 Pages service (les 7 sous-pages)
Structure type : H1 requête cible → paragraphe d'intro (réponse directe à l'intention de recherche en 2-3 phrases) → H2 « Ce que nous faisons » (détails factuels de la section 3) → H2 bénéfices concrets / méthode (étude en amont, délais brefs, techniciens spécialisés…) → H2 « Zone d'intervention » (2 phrases localisées + lien) → mini-FAQ 2-3 questions → CTA. Photos réelles du client avec `alt` descriptifs localisés.

Liens contextuels obligatoires dans le corps de texte : vers 1-2 pages sœurs du même silo + vers le hub + vers `/contact/`.

### 8.4 `/a-propos/`
Histoire courte et vraie de l'entreprise, présentation de Vivien Le Sommer (photo dispo sur le site actuel — en demander une meilleure), la méthode (étude → fourniture → installation → SAV), les partenariats fabricants. Page clé pour l'E-E-A-T : du concret, zéro superlatif creux.

### 8.5 `/zone-intervention/`
**Une seule page locale riche — PAS de pages par ville** (les doorway pages quasi vides sont pénalisées par Google). Contenu : paragraphe Ergué-Gabéric/Quimper (siège, proximité), paragraphe Finistère & Bretagne (départements 29-56-22-35, typologie clients : industriels, éleveurs), paragraphe France entière (livraison/installation matériel d'élevage), carte OpenStreetMap **statique** (image, pas d'iframe → zéro cookie tiers), villes principales citées naturellement dans le texte : Quimper, Concarneau, Rosporden, Fouesnant, Briec, Châteaulin, Quimperlé, Douarnenez, Pont-l'Abbé, Landerneau, Carhaix. Liens vers les pages services.


### 8.6 `/contact/`
Coordonnées complètes (NAP identique au JSON-LD, au footer et au Google Business Profile — à l'octet près), formulaire (section 12.4), carte statique, horaires `[À FOURNIR]`. Champs : nom, email, téléphone, entreprise (optionnel), sujet (select : Électricité industrielle / Matériel d'élevage / Dépannage / Recrutement / Autre), message, case RGPD obligatoire.

### 8.7 Header / Footer (toutes pages)
- **Header** : logo → accueil ; nav : Électricité industrielle ▾ (3 sous-pages), Matériel d'élevage ▾ (4 sous-pages), À propos, Recrutement, Contact ; CTA téléphone permanent (mobile : barre d'action fixe basse avec « Appeler » + « Devis »). Menus déroulants accessibles clavier.
- **Footer** : NAP complet, plan de site (tous liens internes → maillage), réseaux sociaux, mentions légales, politique de confidentialité, « Site réalisé par CapWeb » (lien — backlink agence, `rel` normal).

---

## 9. Animations GSAP — orchestration

Principe : **une scène d'ouverture orchestrée + des reveals disciplinés**, pas d'effets éparpillés. Tout est piloté par `gsap.matchMedia()` (desktop / mobile / reduced-motion).

1. **Intro accueil (une seule fois, ~1,2 s max)** : timeline — le tracé circuit se dessine (DrawSVG) → un « nœud » s'allume (lueur cuivre) → le H1 apparaît par mots (SplitText, stagger) → sous-titre + CTA en fade-up. Pas d'écran de chargement bloquant.
2. **Signature circuit** (section 5) : `stroke-dashoffset` scrubbé par ScrollTrigger sur la hauteur de page ; nœuds `scale + glow` à l'entrée de chaque section.
3. **Reveals de sections** : fade-up 24 px + stagger léger sur les cartes (`once: true`, `start: 'top 80%'`).
4. **Titres H2** : SplitText par lignes, masque + translateY.
5. **Cartes services** : hover desktop = élévation + trait cuivre qui se dessine sous le titre (200 ms). Mobile : état actif au tap, pas de dépendance au hover.
6. **Bandeau partenaires** : défilement horizontal infini lent (pause au hover/focus).
7. **Header** : compact après 80 px de scroll (fond + blur léger), hide/reveal selon direction du scroll.
8. **Parallax** très léger (≤ 8 %) sur les images de hero uniquement.
9. **Lenis** : `lerp` ~0.1 ; détruit et remplacé par le scroll natif si `prefers-reduced-motion`.

Performance animation : uniquement `transform` et `opacity` (jamais top/left/width), `will-change` posé/retiré proprement, `ScrollTrigger.refresh()` après chargement des fonts, cleanup des triggers, aucun layout shift causé par les états initiaux (les éléments animés sont masqués en CSS via une classe `js-anim`, pas par GSAP.set après coup → pas de FOUC ni de CLS).

---

## 10. Stratégie SEO (priorité absolue avec la sécurité)

Synthèse opérationnelle des fondamentaux (intention de recherche, contenu, balises, technique, maillage, popularité, longue traîne) appliqués au référencement **local** du secteur électricité/élevage.

### 10.1 Ciblage — requêtes par page

| Page | Requête principale | Secondaires / longue traîne |
|---|---|---|
| Accueil | électricité industrielle Ergué-Gabéric | électricien industriel Quimper, matériel d'élevage Finistère |
| Hub électricité | électricité industrielle Finistère | entreprise électricité industrielle Bretagne, automatisme industriel Quimper |
| Armoires | armoire électrique sur mesure Bretagne | fabrication armoire électrique industrielle, tableau électrique industriel Finistère |
| Raccordement | raccordement armoire électrique | raccordement automatisme industriel, câblage armoire Finistère |
| Dépannage | dépannage électrique industriel Quimper | dépannage armoire électrique Finistère, SAV automatisme élevage, panne électrique bâtiment industriel |
| Hub élevage | matériel d'élevage Bretagne | installateur matériel élevage Finistère, équipement bâtiment élevage |
| Aviculture | matériel élevage avicole | équipement poulailler professionnel, matériel Landmeco France, ventilation bâtiment volaille, alimentation abreuvement volaille |
| Porcin | matériel élevage porcin | équipement porcherie Skiold, ventilation porcherie, alimentation porc |
| Bovin | matériel élevage bovin Bretagne | équipement bâtiment bovin |
| FAF/Stockage | fabrique aliment ferme FAF | stockage aliment élevage, vis de transfert aliment |
| Zone | électricien industriel Finistère | + villes citées naturellement |
| Recrutement | emploi technicien monteur dépanneur Finistère | offre emploi électromécanique Quimper |

Chaque page répond d'abord à **l'intention** derrière la requête (devis ? panne urgente ? comparaison de matériel ?) dans ses 2 premières phrases. La longue traîne se travaille dans les H2/H3, les FAQ et le corps de texte — jamais en keyword stuffing : densité naturelle, synonymes, champ lexical métier (automatisme, unifilaire, abreuvement, pondeuse, silo, vis souple…).

### 10.2 Balises on-page (checklist PAR page)

- `<title>` unique, ≤ 60 caractères, format `Requête principale | LE SOMMER` (accueil : `LE SOMMER — Électricité industrielle & matériel d'élevage · Ergué-Gabéric (29)`).
- `<meta name="description">` unique, 140-155 caractères, intention + localisation + CTA (« Devis rapide »).
- **Un** `<h1>` contenant la requête principale formulée naturellement.
- URL propre = section 7 ; `<link rel="canonical">` absolue sur chaque page (autoréférente).
- Open Graph + Twitter Card complets (`og:title`, `og:description`, `og:image` 1200×630 dédiée, `og:url`, `og:type`, `og:locale=fr_FR`).
- `<html lang="fr">`, `<meta name="viewport">`, charset UTF-8, favicon complet, `theme-color`.
- Images : `alt` descriptif et localisé quand pertinent (« Armoire électrique industrielle assemblée en atelier à Ergué-Gabéric »), `width`/`height` posés, `loading="lazy"` hors hero, `fetchpriority="high"` sur l'image LCP.
- Sémantique : `<header> <nav> <main> <section> <article> <footer>`, un seul `<main>`, breadcrumb en `<nav aria-label="Fil d'Ariane">`.

### 10.3 Données structurées JSON-LD (dans le `<head>`, générées par partiel)

1. **Toutes pages — `Electrician`** (sous-type LocalBusiness, plus précis) :
```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": "https://[DOMAINE]/#organisation",
  "name": "LE SOMMER",
  "url": "https://[DOMAINE]/",
  "logo": "https://[DOMAINE]/assets/logo.png",
  "image": "https://[DOMAINE]/assets/facade.jpg",
  "telephone": "[À FOURNIR]",
  "email": "v.lesommer@outlook.fr",
  "founder": { "@type": "Person", "name": "Vivien Le Sommer" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rond-point de Kerourvois",
    "addressLocality": "Ergué-Gabéric",
    "postalCode": "29500",
    "addressRegion": "Bretagne",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "[À FOURNIR]", "longitude": "[À FOURNIR]" },
  "areaServed": ["Ergué-Gabéric", "Quimper", "Finistère", "Bretagne", "France"],
  "openingHoursSpecification": "[À FOURNIR]",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61565894530617",
    "https://www.linkedin.com/company/le-sommer/"
  ]
}
```
2. **Pages service — `Service`** : `serviceType`, `provider` → `@id` de l'organisation, `areaServed`.
3. **Toutes pages internes — `BreadcrumbList`** synchronisé avec le fil d'Ariane visible.
4. **FAQ des hubs/services — `FAQPage`** (uniquement si la FAQ est visible sur la page).
5. **Recrutement — `JobPosting`** complet (titre, salaire, type de contrat, lieu, employeur).

Valider chaque type via le Rich Results Test avant livraison.

### 10.4 Maillage interne (levier SEO majeur — soigner à l'extrême)

- **Architecture en silos** : accueil → hub → sous-pages. Chaque sous-page linke son hub (breadcrumb + lien contextuel) et 1-2 pages sœurs. Les hubs linkent toutes leurs sous-pages. Profondeur max : 2 clics depuis l'accueil pour toute page.
- **Ancres descriptives** : jamais « cliquez ici » / « en savoir plus » seuls. Ancres = requête cible ou variante (« notre service de dépannage électrique industriel », « armoires électriques sur-mesure »). Varier les ancres pointant vers une même page.
- **Liens transversaux stratégiques entre silos** : le pont naturel du métier = *l'électricité des bâtiments d'élevage* (dépannage ↔ aviculture/porcin ; armoires ↔ FAF). Un lien transversal contextuel par page maximum, dans le corps du texte.
- **Footer** : plan de site complet (liens vers les 12 pages publiques) → chaque page reçoit du jus depuis toutes les autres.
- Zéro lien interne cassé, zéro redirection interne, zéro page orpheline. Vérification automatisée au build (script `npm run check:links`).

### 10.5 Contenu & E-E-A-T

- Rédaction par un professionnel pour des professionnels : vocabulaire technique exact, réponses concrètes (délais, méthode, marques installées), aucune phrase générique interchangeable avec un concurrent.
- FAQ courtes par page service, rédigées comme de vraies questions clients (« Intervenez-vous en urgence sur une panne de ventilation ? », « Fournissez-vous le matériel Landmeco partout en France ? ») → capte la longue traîne + featured snippets.
- Signaux de confiance réels uniquement : partenariats fabricants, photos de réalisations, présentation du gérant. **Aucun faux avis.**
- Fraîcheur : structure prête pour ajouter plus tard des pages « réalisations » (recommandation à transmettre au client).

### 10.6 SEO local hors-site (à documenter dans `TODO-CLIENT.md` pour Alexy/le client)

- **Google Business Profile** : créer/optimiser la fiche (catégories : Électricien + Fournisseur de matériel agricole ; NAP strictement identique au site ; lien vers le site ; photos ; posts). C'est le levier n°1 du pack local.
- NAP cohérent sur : PagesJaunes, annuaire CCI/CMA, Kompass, annuaires agricoles bretons.
- Backlinks locaux qualitatifs à viser : pages « revendeurs/installateurs » de Landmeco, Skiold, S+H Nolting (elles existent souvent chez les fabricants) ; presse agricole régionale (Paysan Breton, Terra) ; site CapWeb (réalisation).
- Encourager les avis Google clients réels.

### 10.7 SEO technique

- `sitemap.xml` généré au build (12 pages publiques, `lastmod` réels) + déclaré dans `robots.txt` et Google Search Console.
- `robots.txt` : tout autorisé sauf `/api/` ; référence sitemap.
- Redirections 301 dans `.htaccess` depuis les anciennes URLs Wix (`/s-projects-side-by-side` → `/electricite-industrielle/`, `/aviculture` → `/materiel-elevage/aviculture/`, `/projects-8` → `/materiel-elevage/faf-stockage/`, `/porcin`, `/bovin`, `/contactez-moi` → `/contact/`, `/recrutement` → `/recrutement/`) — **critique pour ne pas perdre l'historique SEO à la migration**.
- 404 personnalisée avec liens vers hubs + contact.
- HTTPS unique, une seule version canonique du domaine (www OU non-www, choisir et 301 l'autre), pas de contenu dupliqué.
- Core Web Vitals verts (voir section 11) — la vitesse est un facteur de classement.

---

## 11. Performance — budget strict

**Objectif : Lighthouse ≥ 95 sur les 4 axes, sur CHAQUE page, en mobile ET desktop.**

- **LCP < 2,0 s** : image hero en AVIF (fallback WebP) via `<picture>`, dimensionnée à l'affichage, `fetchpriority="high"`, préchargée ; fonts `woff2` préchargées avec `font-display: swap` (et métriques ajustées via `size-adjust` pour éviter le CLS de swap).
- **CLS < 0,05** : dimensions réservées pour toute image/embed, pas d'injection de contenu au-dessus du fold, animations n'affectant que transform/opacity.
- **INP < 200 ms** : JS total < 90 Ko gzippé (GSAP + plugins + Lenis + code maison compris), aucun long task > 50 ms à l'init, scripts en `type="module"` (defer implicite).
- Images : conversion AVIF/WebP automatisée au build (script `sharp`), `srcset`/`sizes` sur toutes les images de contenu, lazy loading natif hors viewport initial, poids page d'accueil < 1 Mo transféré.
- CSS : découpé mais bundlé/minifié par Vite en un fichier par page ; critical CSS inline si le score l'exige ; purge des styles morts.
- Cache : voir `.htaccess` (12.1) — assets fingerprints = cache 1 an immutable ; HTML = no-cache revalidation.
- Aucune requête tierce (règle 2.2) : DNS unique, pas de preconnect externe nécessaire.
- Mesure obligatoire : `npm run audit` = build + Lighthouse CI sur les 12 pages, rapport en console. Tout score < 95 = bloquant.

---

## 12. Sécurité — exigences et AUDIT OBLIGATOIRE

Périmètre réel d'attaque : site statique + 1 endpoint PHP + hébergement mutualisé + comptes d'infrastructure (hPanel, registrar, email). Chaque vecteur ci-dessous doit être traité **et** vérifié via les tests offensifs (12.7) puis l'audit final (12.8). Mentalité : tout input est hostile, toute sortie est échappée, tout secret est hors webroot ou protégé — et la sécurité ne s'arrête pas au code : comptes, sauvegardes et surveillance en font partie (12.6).

### 12.0 Cadre de référence — OWASP Top 10 appliqué à CE projet

Chaque risque du Top 10 OWASP (2021) doit avoir une réponse explicite. Ce tableau est le contrat ; l'audit 12.8 en est la preuve.

| Risque OWASP | Traitement dans ce projet |
|---|---|
| **A01 – Broken Access Control** | Aucun espace membre (surface nulle) ; fichiers sensibles et `api/config.php` bloqués par `.htaccess` ; méthodes HTTP limitées à GET/POST/HEAD ; tentatives de traversée de chemin (`../`, `%2e%2e`) → refusées |
| **A02 – Cryptographic Failures** | HTTPS forcé + HSTS 2 ans preload ; TLS ≥ 1.2 (config Hostinger, vérifiée via SSL Labs) ; aucune donnée sensible stockée côté serveur ; secrets SMTP hors Git + accès direct bloqué |
| **A03 – Injection** | Zéro base de données (pas de SQLi possible) ; anti-injection d'en-têtes email (rejet `\r\n`) ; validation liste blanche de chaque champ ; corps de mail texte brut ; CSP stricte sans `unsafe-inline` contre le XSS |
| **A04 – Insecure Design** | Surface minimale par conception : statique + 1 endpoint, pas d'upload, pas d'authentification, défense en profondeur du formulaire (12.3) |
| **A05 – Security Misconfiguration** | `.htaccess` durci (12.1) ; listing off ; `display_errors=Off` ; `expose_php=Off` ; `ServerSignature Off` ; headers complets ; 404/erreurs sans fuite d'information |
| **A06 – Vulnerable & Outdated Components** | 5 dépendances seulement, versions épinglées (lockfile) ; `npm audit` 0 high/critical ; PHPMailer dernière version stable ; consigne client : revue des mises à jour trimestrielle (dans `README.md`) |
| **A07 – Identification & Authentication Failures** | Aucune authentification applicative (pas de login = pas de brute force ni credential stuffing sur le site) ; les comptes d'infrastructure sont protégés en 12.6 (2FA, mots de passe forts) |
| **A08 – Software & Data Integrity Failures** | Zéro script/CDN tiers (règle 2.2) ; build reproductible depuis lockfile ; `build.sourcemap=false` en prod ; empreintes SHA-256 des fichiers déployés archivées pour contrôle d'intégrité |
| **A09 – Security Logging & Monitoring Failures** | Logs d'accès Hostinger conservés ; log applicatif des rejets du formulaire (motif + horodatage, **jamais** de données personnelles) ; surveillance 12.6 (uptime, Search Console, revue mensuelle des logs) |
| **A10 – SSRF** | Le serveur n'effectue aucune requête sortante construite depuis un input utilisateur (aucun fetch d'URL fournie) — vecteur inexistant, à maintenir tel quel |

### 12.1 `.htaccess` racine (production)

```apache
# ---- HTTPS forcé + domaine canonique (choisir www ou non-www, une seule version) ----
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://[DOMAINE]%{REQUEST_URI} [L,R=301]

# ---- En-têtes de sécurité ----
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "DENY"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Cross-Origin-Resource-Policy "same-origin"
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
  Header unset X-Powered-By
  Header unset Server
</IfModule>

# ---- Masquer les infos serveur ----
ServerSignature Off

# ---- Interdire le listing et les fichiers sensibles ----
Options -Indexes
<FilesMatch "^(\.env|\.git|composer\.(json|lock)|package(-lock)?\.json|config\.php|.*\.(md|log|sh|bak|sql))$">
  Require all denied
</FilesMatch>

# ---- Méthodes HTTP : GET/POST/HEAD uniquement ----
<LimitExcept GET POST HEAD>
  Require all denied
</LimitExcept>

# ---- Cache ----
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

ErrorDocument 404 /404.html
# + Redirections 301 des anciennes URLs Wix (section 10.7)
```

**CSP sans `unsafe-inline`** : donc AUCUN `<script>` inline, AUCUN `style=""` inline, AUCUN handler `onclick=""`. Le JSON-LD (`<script type="application/ld+json">`) n'exécute pas de code et n'est pas bloqué par la CSP. Si un style inline s'avère indispensable (critical CSS), utiliser un hash `'sha256-…'` dans `style-src` — jamais `unsafe-inline`.

### 12.2 Front-end
- **Zéro `innerHTML` avec données variables**, zéro `eval`/`new Function`/`document.write`. Manipulation DOM via `textContent`/`createElement`.
- Aucun secret, clé ou email en clair dans le JS livré (l'email affiché sur la page contact est en HTML avec lien `mailto:` — assumé et voulu par le client, il l'affiche déjà).
- Liens externes (Facebook, LinkedIn, fabricants) : `rel="noopener noreferrer"` + `target="_blank"`.
- `autocomplete` correct sur les champs de formulaire, `type="email"`/`type="tel"` natifs.

### 12.3 Anti-spam & anti-abus du formulaire (défense en profondeur, sans CAPTCHA tiers)
1. **Honeypot** : champ `website` masqué en CSS (pas `display:none` seul — aussi `position:absolute; left:-9999px` + `tabindex="-1"` + `autocomplete="off"`). Rempli → rejet silencieux (réponse 200 générique).
2. **Jeton CSRF** : généré côté PHP (`random_bytes(32)`), stocké en session (cookie `Secure; HttpOnly; SameSite=Strict`), injecté en champ caché, vérifié en `hash_equals()`.
3. **Temporisation** : timestamp signé (HMAC) dans un champ caché ; soumission < 3 s ou > 1 h → rejet.
4. **Rate limiting** : max 5 soumissions / IP / heure (compteur fichier verrouillé `flock` dans un dossier non listé, ou SQLite), réponse 429 au-delà.
5. **Limites de taille** : message ≤ 3000 caractères, chaque champ borné, `Content-Length` vérifié.

### 12.4 `api/contact.php` — règles de code
- `declare(strict_types=1);` ; sessions configurées en cookies `Secure`/`HttpOnly`/`SameSite=Strict` ; n'accepte que `POST` avec `Content-Type` attendu ; toute autre méthode → 405.
- **Validation stricte par champ** (liste blanche) : email `filter_var(FILTER_VALIDATE_EMAIL)`, téléphone regex `^[0-9 +().-]{6,20}$`, sujet ∈ liste fermée du `<select>`, nom/entreprise longueur bornée, message borné. Échec → 422 avec message générique.
- **Anti-injection d'en-têtes email** : rejeter toute valeur contenant `\r` ou `\n` dans les champs courts ; l'adresse du visiteur va UNIQUEMENT en `Reply-To` via PHPMailer (jamais en `From`, jamais concaténée dans des headers).
- **Envoi via PHPMailer + SMTP authentifié Hostinger** (`SMTPSecure` TLS, port 465/587). Identifiants dans `api/config.php` : hors Git, permissions 600, ET bloqué par `.htaccess` (12.1) — double protection.
- Corps du mail en **texte brut** (pas de HTML) avec les valeurs échappées ; aucun contenu utilisateur réinjecté dans une page web (pas de page « récap » qui refléterait les inputs → zéro surface XSS réfléchie).
- Erreurs : `display_errors=Off` en prod, log serveur uniquement, messages utilisateur génériques (aucune fuite de stack/chemins).
- Réponse JSON minimale `{ok: true|false}` ; le JS affiche un message de confirmation codé en dur.

### 12.5 Chaîne d'approvisionnement & hébergement
- Dépendances npm épinglées (lockfile commité), `npm audit` sans vulnérabilité high/critical au moment du build ; nombre de dépendances minimal (GSAP, Lenis, Vite, sharp, PHPMailer — c'est tout).
- Aucun code copié de sources non vérifiées ; pas de plugin/thème tiers.
- Hostinger : PHP 8.2+ forcé dans le panel, SSL Let's Encrypt actif + renouvellement auto, `dist/` uniquement dans `public_html/` (jamais les sources, jamais `node_modules`, jamais `.git`).

### 12.6 Gouvernance : comptes, sauvegardes, surveillance (à consigner dans `TODO-CLIENT.md`)

Le code peut être parfait et le site compromis par un mot de passe hPanel faible ou une absence de sauvegarde. Ces points sortent du code mais font partie de la livraison sécurité — les documenter et les transmettre au client.

**Comptes & accès (le maillon humain)**
- **2FA obligatoire** sur : compte Hostinger/hPanel, registrar du domaine, boîte email de contact, comptes Google (Search Console, Business Profile). C'est la mesure au meilleur rapport protection/effort.
- Mots de passe uniques et forts (gestionnaire type Bitwarden/KeePass) — jamais réutilisés entre services.
- **Verrou de transfert de domaine** (registrar lock) activé + coordonnées WHOIS à jour : empêche le vol de nom de domaine.
- Principe du moindre privilège : un accès FTP/SFTP par usage, supprimé dès qu'il ne sert plus ; pas de partage de compte admin.
- Accès SFTP uniquement (jamais FTP en clair) ; si Hostinger propose des clés SSH, les préférer aux mots de passe.

**Sauvegardes (la seule vraie parade au pire)**
- Sauvegardes automatiques Hostinger activées + **une copie hors-plateforme** (le `dist/` est reproductible depuis Git, mais sauvegarder `api/config.php` et la config serveur séparément).
- Règle 3-2-1 dans la mesure du possible ; vérifier qu'une restauration fonctionne réellement (une sauvegarde jamais testée n'est pas une sauvegarde).
- Le dépôt Git (hors `config.php`) est déjà une sauvegarde du code : le pousser sur un remote privé.

**Surveillance & réaction**
- **Monitoring uptime** (UptimeRobot gratuit ou équivalent) : alerte si le site tombe ou si le certificat HTTPS expire.
- Vérifier le renouvellement automatique du certificat Let's Encrypt (alerte calendrier de secours).
- **Google Search Console** : activer les alertes (problèmes de sécurité, malware, action manuelle) — Google prévient souvent avant qu'on ne s'en aperçoive.
- Revue mensuelle : logs d'accès (pics suspects, scans), rejets du formulaire, `npm audit`, mises à jour PHPMailer/dépendances.
- **Plan d'incident minimal** (dans `README.md`) : si compromission → isoler (mettre le site en maintenance), restaurer la dernière sauvegarde saine, changer tous les mots de passe + révoquer les accès, régénérer le token CSRF/secrets, analyser les logs pour la cause, corriger, redéployer.

### 12.7 Tests offensifs à mener soi-même avant livraison

Se mettre dans la peau d'un attaquant : ne pas seulement vérifier que le site marche, mais **essayer de le casser**. Outillage gratuit, à faire tourner contre l'environnement de préproduction (jamais contre un site tiers — uniquement le nôtre).

- **Scan de configuration & headers** : `nmap` (ports ouverts — seuls 80/443 attendus), [securityheaders.com](https://securityheaders.com), [SSL Labs](https://www.ssllabs.com/ssltest/) (viser note A). Objectif : aucune info serveur divulguée, TLS propre, headers complets.
- **Analyse dynamique** : passer le site à **OWASP ZAP** (baseline scan) — proxy qui détecte automatiquement XSS, en-têtes manquants, cookies mal configurés, fuites. Traiter chaque alerte medium+.
- **Fuzzing du formulaire** : envoyer manuellement des payloads hostiles dans chaque champ et vérifier le comportement :
  - XSS : `<script>alert(1)</script>`, `"><img src=x onerror=alert(1)>` → doivent arriver **en texte brut** dans l'email, jamais exécutés, jamais reflétés dans une page.
  - Injection d'en-têtes : `test%0d%0aBcc:attaquant@evil.com`, `nom\r\nContent-Type:...` → **rejetés**.
  - Débordement : message de 100 000 caractères, champs surdimensionnés → **bornés/rejetés** proprement (pas d'erreur 500).
  - Contournement : soumission sans token CSRF, avec token d'une autre session, honeypot rempli, soumission en < 3 s puis en boucle (11 fois) → rejets attendus + **429** au-delà du quota.
  - Mauvaise méthode : `curl -X PUT`/`DELETE`/`GET` sur `api/contact.php` → **405**.
- **Traversée de chemin & fichiers exposés** : tenter d'accéder directement à `/api/config.php`, `/.git/config`, `/package.json`, `/CLAUDE.md`, `/.env`, un dossier sans index, `/..%2f..%2fetc%2fpasswd` → tous **403/404**, aucun contenu.
- **Analyse du bundle livré** (`dist/`) : `grep -rniE "password|smtp|secret|api[_-]?key|innerHTML|eval\(|document\.write" dist/` → **zéro résultat** ; confirmer qu'aucune source map ni commentaire sensible n'est publié.
- **Test HTTPS/redirections** : `curl -I http://[domaine]` et la version non-canonique → **301** vers `https://` canonique ; contenu mixte (mixed content) → **aucun** (console propre).

Chaque test raté = faille → corriger, puis rejouer. Les résultats alimentent l'audit 12.8.

### 12.8 AUDIT DE SÉCURITÉ FINAL (bloquant — à exécuter et documenter dans `SECURITY-AUDIT.md`)

Passer chaque point, noter OK/KO + preuve (commande, capture, extrait de réponse HTTP) :

- [ ] `curl -I` sur http:// → 301 vers https:// ; version non canonique → 301
- [ ] Tous les headers de 12.1 présents sur `/`, une page profonde, `/404.html` et `api/contact.php`
- [ ] CSP : aucune violation en console sur les 12 pages ; test injection `<script>` dans l'URL → inerte
- [ ] Scan https://securityheaders.com simulé mentalement : note A attendue
- [ ] `Options -Indexes` vérifié (requête sur un dossier sans index → 403/404)
- [ ] `api/config.php` inaccessible en direct (403), absent de Git, absent de `dist/` public hors `api/`
- [ ] Formulaire : envoi normal OK ; honeypot rempli → rejet ; sans token CSRF → rejet ; token falsifié → rejet ; 6e envoi dans l'heure → 429 ; payload `%0d%0aBcc:attacker@x.com` dans l'email → rejet ; `<script>alert(1)</script>` dans le message → arrive en texte brut dans le mail, jamais rendu en HTML ; méthode GET sur l'endpoint → 405
- [ ] Aucun `innerHTML`/`eval`/handler inline dans `dist/` (grep automatisé)
- [ ] Aucun secret dans `dist/` ni dans le repo (grep `password|smtp|api_key`)
- [ ] `npm audit` : 0 high/critical
- [ ] Liens externes tous en `noopener noreferrer`
- [ ] Fichiers sensibles (`.md`, `.log`, `.json` racine) → 403 en prod
- [ ] Cookies : uniquement le cookie de session PHP sur `/contact/`, flags `Secure/HttpOnly/SameSite=Strict` vérifiés ; aucune page autre ne pose de cookie
- [ ] Pages d'erreur : aucune divulgation de version PHP/Apache/chemins
- [ ] SSL Labs note A (TLS ≥ 1.2, pas de protocole obsolète) ; securityheaders.com note A
- [ ] OWASP ZAP baseline : 0 alerte high, alertes medium traitées ou justifiées
- [ ] `nmap` : seuls les ports 80/443 exposés
- [ ] Traversée de chemin (`../`, `%2e%2e`, accès direct fichiers sensibles) → 403/404 sur tous les cas testés (12.7)
- [ ] Chaque risque OWASP A01–A10 (tableau 12.0) : réponse vérifiée et cochée
- [ ] Gouvernance transmise au client (12.6) : 2FA, verrou domaine, sauvegardes testées, monitoring uptime, alertes Search Console — consignés dans `TODO-CLIENT.md`
- [ ] Plan d'incident présent dans `README.md`

Toute case KO = corriger puis re-dérouler l'audit complet. `SECURITY-AUDIT.md` doit référencer les 10 risques OWASP (12.0), les résultats des tests offensifs (12.7) et cette checklist (12.8).

---

## 13. Accessibilité — WCAG 2.1 AA

- Contrastes ≥ 4.5:1 (texte) / 3:1 (UI, gros titres) — vérifier les combinaisons cuivre-sur-anthracite, ajuster si besoin.
- Navigation clavier complète : menus déroulants utilisables (Enter/Espace/Échap/flèches), focus visible personnalisé (`:focus-visible`, liseré cuivre 2 px), skip-link « Aller au contenu » en premier élément focusable.
- Landmarks ARIA corrects, `aria-expanded`/`aria-controls` sur le burger et les sous-menus, `aria-current="page"` dans la nav.
- Formulaire : `<label>` explicites liés, erreurs annoncées (`aria-live="polite"`, `aria-invalid`), messages d'erreur textuels précis à côté des champs.
- `alt` pertinents partout (vides `alt=""` pour images décoratives), pas d'information portée par la couleur seule.
- Zone tactile ≥ 44×44 px, texte redimensionnable 200 % sans casse, pas de piège au focus dans le menu mobile.
- `prefers-reduced-motion` (règle 2.5) + `prefers-color-scheme` non requis (thème sombre unique assumé).

---

## 14. RGPD & conformité légale

- **Mesure d'audience** : Matomo self-hosted **en configuration exemptée de consentement CNIL** (pas de cookies, IP anonymisée, finalité stricte, opt-out proposé dans la politique de confidentialité). Dans ce cas : **aucune bannière cookie nécessaire** (aucun autre traceur n'existe sur le site). Si le client exige un jour un service non exempté → tarteaucitron.js self-hosted, bloquant par défaut. Attention CSP : ajouter le sous-domaine Matomo dans `script-src`/`connect-src`/`img-src` uniquement si Matomo est sur un autre hôte.
- **Cartes** : images statiques OpenStreetMap (attribution « © OpenStreetMap contributors » visible) — pas d'iframe Google Maps (cookies tiers).
- **Formulaire** : case à cocher non pré-cochée « J'accepte que mes données soient utilisées pour traiter ma demande » + lien vers la politique de confidentialité ; finalité, durée de conservation et droits décrits dans la politique ; les emails reçus = seul stockage (pas de base de données de contacts).
- **Mentions légales** (page dédiée) : identité complète de l'entreprise `[SIRET À FOURNIR]`, directeur de publication (Vivien Le Sommer), hébergeur (Hostinger International Ltd, 61 Lordou Vironos Street, 6023 Larnaca, Chypre), crédit CapWeb.
- **Politique de confidentialité** : traitements (formulaire, Matomo exempté, logs serveur), bases légales, durées, droits (accès, rectification, effacement, opposition), contact pour exercer les droits.
- Polices self-hostées (aucun appel Google Fonts = conformité + perf).

---

## 15. Déploiement Hostinger

1. `npm run build` → `dist/` propre (HTML pages + assets hashés + `api/` copié SANS `config.php`).
2. Uploader le contenu de `dist/` dans `public_html/` (FTP/SFTP ou File Manager). Créer `api/config.php` directement sur le serveur (jamais transféré via Git).
3. Panel Hostinger : PHP 8.2+, SSL Let's Encrypt actif, forcer HTTPS (redondant avec `.htaccess`, on garde les deux).
4. Créer la boîte email d'envoi SMTP (ex. `contact@[DOMAINE]`) et renseigner `config.php`.
5. Vérifier : les 12 pages en HTTPS, formulaire (email reçu), redirections 301 Wix, 404 custom, headers (`curl -I`).
6. Google Search Console : vérifier la propriété, soumettre `sitemap.xml`, demander l'indexation des pages clés. Documenter dans `TODO-CLIENT.md` : pointer le domaine `le-sommer.com` vers Hostinger le jour J (les 301 prennent alors effet).

---

## 16. Definition of Done — checklist de livraison

- [ ] 12 pages publiques + 404 conformes à la section 8, contenu relu, zéro placeholder oublié hors `TODO-CLIENT.md`
- [ ] Charte graphique client intégrée (ou tokens par défaut si non reçue, signalé)
- [ ] Animations GSAP conformes à la section 9, fluides à 60 fps sur mobile milieu de gamme, reduced-motion vérifié
- [ ] Lighthouse ≥ 95 / 4 axes / 12 pages / mobile + desktop (rapports archivés)
- [ ] Checklist SEO on-page 10.2 validée page par page + JSON-LD validés Rich Results + sitemap/robots OK + 301 Wix testées
- [ ] Maillage interne : script `check:links` vert, profondeur ≤ 2 clics, ancres descriptives
- [ ] `SECURITY-AUDIT.md` complété, 100 % OK : mapping OWASP A01–A10 (12.0), tests offensifs joués (12.7), checklist finale verte (12.8)
- [ ] Gouvernance sécurité transmise au client : 2FA, verrou domaine, sauvegardes testées, monitoring, plan d'incident (12.6)
- [ ] Accessibilité : audit clavier + contrastes + lecteur d'écran (VoiceOver/NVDA) sans blocage
- [ ] RGPD : mentions légales + politique + case formulaire + Matomo exempté (ou absent)
- [ ] `TODO-CLIENT.md` à jour ; `README.md` avec procédure de build/déploiement/modification de contenu
- [ ] Testé sur : Chrome, Firefox, Safari (desktop + iOS), Chrome Android

---

## 17. Ordre de travail attendu

1. **Setup** : scaffold Vite MPA, tokens CSS, partiels head/header/footer, `.htaccess`, pipeline images, fonts self-hostées.
2. **Contenu & structure** : les 12 pages en HTML sémantique complet (avec placeholders `[À FOURNIR]`), maillage interne, balises SEO, JSON-LD, breadcrumbs.
3. **Design & responsive** : intégration de la charte (dès réception), mobile-first, états focus/hover.
4. **Animations** : signature circuit, intro, reveals, matchMedia, reduced-motion.
5. **Formulaire** : front (validation + a11y) puis `contact.php` complet (12.3/12.4).
6. **Durcissement & audits** : sécurité (tests offensifs 12.7 + audit 12.8), performance (11), accessibilité (13), SEO (10). Corriger, re-tester.
7. **Livraison** : build final, `README.md`, `SECURITY-AUDIT.md`, `TODO-CLIENT.md`, rapports Lighthouse.

À chaque étape terminée en cas de doute sur une donnée client : **demander, ne pas inventer** (règle 2.1).
