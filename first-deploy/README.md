# Première mise en ligne — LE SOMMER

Dossier de travail pour le déploiement. On avance **étape par étape** ; ce fichier dit où on en est.

| Étape | Document | État |
|---|---|---|
| 1. Choisir l'hébergeur | [01-options-hebergement.md](01-options-hebergement.md) | ✅ **Hostinger** retenu (le domaine le-sommer.fr y est déjà) |
| 2. Informations requises | [02-informations-requises.md](02-informations-requises.md) | ✅ décisions prises |
| 3. Préparer le site | [04-hostinger.md](04-hostinger.md) | ✅ **fait** — .htaccess, robots, sitemap, workflow de build |
| 4. Déployer | [04-hostinger.md](04-hostinger.md) | ⏳ **à toi** : push GitHub → brancher Hostinger sur `deploy` |
| 5. Référencement | [04-hostinger.md](04-hostinger.md) | ⬜ Search Console + sort de l'ancien site Wix |

## Où en est le site

**Prêt :** les 8 pages, le contenu, 41 photos de chantier, le design responsive, la galerie
et la visionneuse. Domaine réglé sur `https://le-sommer.fr`. Le build tourne sans erreur.

**Points d'attention :**

| Point | État |
|---|---|
| Formulaire de contact | Retiré à ta demande — la page contact renvoie vers téléphone et email |
| Ancien site Wix `le-sommer.com` | À rediriger ou fermer, sinon doublon dans Google |
| Google Search Console | À déclarer après la mise en ligne |
| Audit Lighthouse | À lancer sur le site en ligne — je m'en charge |

## Principe retenu

La première mise en ligne se fait sur une **adresse temporaire** fournie par l'hébergeur
(par exemple `le-sommer.pages.dev`), pas sur `le-sommer.com`.

Raison : le site Wix actuel reste en ligne et visible pendant qu'on valide le nouveau. La
bascule du vrai domaine n'intervient qu'à l'étape 5, quand tout est vérifié. Aucun risque
de coupure pour l'entreprise.
