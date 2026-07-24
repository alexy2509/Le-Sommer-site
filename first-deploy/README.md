# Première mise en ligne — LE SOMMER

Dossier de travail pour le déploiement. On avance **étape par étape** ; ce fichier dit où on en est.

| Étape | Document | État |
|---|---|---|
| 1. Choisir l'hébergeur | [01-options-hebergement.md](01-options-hebergement.md) | ✅ rédigé — **en attente de ta décision** |
| 2. Rassembler les informations | [02-informations-requises.md](02-informations-requises.md) | ✅ rédigé — **en attente de tes réponses** |
| 3. Préparer le site (fichiers manquants) | à faire après l'étape 1 | ⬜ |
| 4. Déployer | à faire | ⬜ |
| 5. Basculer le domaine `le-sommer.com` | plus tard, après validation | ⬜ |

## Où en est le site aujourd'hui

**Prêt :** les 8 pages, le contenu, les images (générées en AVIF/WebP), le design responsive,
la galerie et la visionneuse. Le build tourne sans erreur (`npm run build`).

**Pas encore prêt pour une vraie mise en ligne :**

| Manque | Conséquence |
|---|---|
| `api/contact.php` n'existe pas (dossier vide) | **Le formulaire de contact ne fonctionne pas.** Voir étape 1 : ce point décide en partie de l'hébergeur. |
| `robots.txt`, `sitemap.xml` | Google indexe moins bien |
| En-têtes de sécurité (CSP, HSTS…) | Prévus dans `CLAUDE.md` §12.1 au format Apache `.htaccess` ; à retranscrire au format de l'hébergeur choisi |
| Redirections 301 depuis les URLs Wix | À faire au moment de la bascule du domaine (étape 5), sinon perte du référencement acquis |

Ces éléments seront traités à l'étape 3, une fois l'hébergeur choisi — leur format dépend de lui.

## Principe retenu

La première mise en ligne se fait sur une **adresse temporaire** fournie par l'hébergeur
(par exemple `le-sommer.pages.dev`), pas sur `le-sommer.com`.

Raison : le site Wix actuel reste en ligne et visible pendant qu'on valide le nouveau. La
bascule du vrai domaine n'intervient qu'à l'étape 5, quand tout est vérifié. Aucun risque
de coupure pour l'entreprise.
