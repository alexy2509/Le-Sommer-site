# Site vitrine LE SOMMER

Électricité industrielle & matériel d'élevage — Ergué-Gabéric (29).
Site **statique** généré par Vite (multi-pages), sans framework. Le brief complet et les
règles du projet sont dans [CLAUDE.md](CLAUDE.md) : ce README ne décrit que l'organisation
du dépôt et les commandes.

## Démarrer

```bash
npm install
npm run dev       # prépare les assets, génère les pages, lance Vite
npm run build     # idem + build de production dans dist/
npm run preview   # sert dist/ localement
```

| Script | Effet |
|---|---|
| `npm run dev` / `build` | enchaîne automatiquement `assets` puis `pages` (hooks `predev` / `prebuild`) |
| `npm run assets` | régénère logos, favicons, images et polices dans `public/assets/` |
| `npm run pages` | régénère le HTML de `.pages/` depuis `src/pages/` |
| `npm run map` | régénère la carte de Bretagne (nécessite un GeoJSON, voir le script) |

## Arborescence

```
.
├── CLAUDE.md              Brief projet — source de vérité (contenu, SEO, sécurité, DA)
├── README.md              Ce fichier
├── package.json
├── vite.config.js         Config MPA : une entrée HTML par page
│
├── src/                   ← TOUT le code source vit ici
│   ├── assets/            Sources HAUTE DÉFINITION fournies par le client (versionnées)
│   │   ├── brand/         logos, favicon, charte graphique
│   │   └── img/           photos : hero, work/ (réalisations), partners/ (logos)
│   ├── styles/            CSS découpé, voir « Styles » plus bas
│   ├── js/                JavaScript du site
│   │   ├── main.js        point d'entrée : appelle chaque module
│   │   ├── modules/       nav, faq, carousel, scroll-reset
│   │   └── animations/    reveals (GSAP ScrollTrigger)
│   └── pages/             Génération du HTML (modules Node, jamais envoyés au navigateur)
│       ├── page.mjs       accueil
│       ├── <url>/page.mjs une page par URL du site
│       └── partials/      briques communes
│           ├── layout.mjs   squelette <html>
│           ├── head.mjs     métadonnées, SEO, JSON-LD
│           ├── header.mjs / footer.mjs
│           ├── page-helpers.mjs  gabarit des pages « pôle »
│           ├── site-data.mjs     coordonnées, navigation, partenaires
│           ├── icons.mjs         icônes SVG inline
│           ├── escape.mjs        échappement HTML
│           └── blocks/           blocs de contenu réutilisables (voir plus bas)
│
├── scripts/               Outils de build (Node, hors bundle)
│   ├── prepare-assets.mjs   src/assets/ → public/assets/ (AVIF/WebP, favicons, polices)
│   ├── generate-pages.mjs   src/pages/  → .pages/*.html
│   └── build-bretagne-map.mjs  GeoJSON → tracés SVG de la carte
│
├── public/                Servi tel quel. `public/assets/` est GÉNÉRÉ : ne rien y éditer.
├── docs/                  Documents client (devis…) — hors site
├── api/                   Prévu pour `contact.php` (voir « Reste à faire »)
│
├── .pages/                ⚙️ généré — HTML intermédiaire (non versionné)
└── dist/                  ⚙️ généré — build de production à déployer (non versionné)
```

### Images : où mettre quoi

Une seule règle : **la source va dans `src/assets/`, jamais dans `public/`.**
`npm run assets` produit les déclinaisons (AVIF, WebP, tailles multiples, favicons) dans
`public/assets/`, qui est ignoré par Git et reconstruit à chaque build.

| Type d'image | Source à déposer dans | Généré dans |
|---|---|---|
| Logo, favicon, charte | `src/assets/brand/` | `public/assets/brand/`, `public/favicon*` |
| Photo d'en-tête | `src/assets/img/hero-stand-source.jpg` | `public/assets/img/hero-stand-*` |
| Réalisations | `src/assets/img/work/<nom>-source.png` | `public/assets/img/work/` |
| Logos partenaires | `src/assets/img/partners/<nom>-source.png` | `public/assets/partners/` |

### Styles

`src/styles/main.css` est le seul point d'entrée : il importe tout le reste **dans un ordre
qui fait la cascade** (fondations → composants → pages). Ne pas réordonner sans vérifier.

```
styles/
├── main.css        index des imports (commenté)
├── tokens.css      variables de la charte — couleurs, typo, espacements
├── fonts.css  base.css  layout.css
├── components/     briques réutilisées : buttons, cards, header, mobile-nav, faq,
│                   badges, partners-carousel, form, footer, cta-band, placeholder,
│                   hero, emergency-band, trust-bar
└── pages/          styles d'une page ou d'un bloc : home-poles, zone-band, bretagne-map,
                    beyond-band, silo, contact, recruitment*, photo-carousel, legal,
                    error-404, about…
```

### Blocs de contenu

`src/pages/partials/blocks/` regroupe les briques HTML réutilisables (FAQ, bandeau CTA,
zone d'intervention, carte de Bretagne, carrousels…). Les pages importent **toujours**
depuis `blocks/index.mjs`, jamais depuis un fichier de bloc : un bloc peut ainsi être
renommé sans toucher aux pages.

`bretagne-map.data.mjs` est **généré** par `npm run map` — ne pas l'éditer à la main.

## Reste à faire

Éléments prévus par [CLAUDE.md](CLAUDE.md) mais pas encore écrits. Ils étaient référencés
dans `package.json` alors que les fichiers n'existaient pas (`npm run build` échouait) ; les
entrées ont été retirées en attendant que l'outillage soit réellement développé.

- `scripts/generate-sitemap.mjs` — `sitemap.xml` (section 10.7 du brief)
- `scripts/check-links.mjs` — vérification du maillage interne (section 10.4)
- `scripts/audit-lighthouse.mjs` + `scripts/audit-grep.mjs` — audits perf et sécurité (11 et 12.7)
- `public/robots.txt`, `public/.htaccess` — sécurité, cache, redirections 301 depuis Wix (12.1)
- `api/contact.php` + `api/config.php` — traitement du formulaire (12.4). Le dossier `api/`
  est volontairement conservé, vide, pour marquer l'emplacement.
- `TODO-CLIENT.md`, `SECURITY-AUDIT.md` — livrables de fin de projet (sections 4 et 12.8)
- Le conteneur `#circuit-container` est injecté sur chaque page par `layout.mjs` et son CSS
  existe (`styles/pages/circuit-signature.css`), mais aucun script ne le remplit encore :
  l'élément signature du brief (section 5) reste à implémenter.
