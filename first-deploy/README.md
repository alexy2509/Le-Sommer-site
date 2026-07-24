# Première mise en ligne — LE SOMMER

Dossier de travail pour le déploiement. On avance **étape par étape** ; ce fichier dit où on en est.

| Étape | Document | État |
|---|---|---|
| 1. Choisir l'hébergeur | [01-options-hebergement.md](01-options-hebergement.md) | ✅ **Cloudflare Pages** retenu |
| 2. Rassembler les informations | [02-informations-requises.md](02-informations-requises.md) | ✅ décisions prises |
| 3. Préparer le site | [03-mise-en-ligne.md](03-mise-en-ligne.md) | ✅ **fait** — formulaire, en-têtes, redirections, robots, sitemap, commit |
| 4. Déployer | [03-mise-en-ligne.md](03-mise-en-ligne.md) | ⏳ **à toi** : push GitHub, compte Brevo, projet Cloudflare |
| 5. Basculer le domaine `le-sommer.com` | à rédiger après validation | ⬜ |

## Où en est le site

**Prêt :** les 8 pages, le contenu, les images, le design responsive, la galerie et la
visionneuse. Le **formulaire de contact fonctionne** (endpoint Cloudflare + Brevo, 11 tests
de sécurité passés). Les en-têtes de sécurité, les redirections Wix, le `robots.txt` et le
`sitemap.xml` sont en place. Le build tourne sans erreur.

**Reste à faire, après la première mise en ligne :**

| Point | Quand |
|---|---|
| Authentifier le domaine dans Brevo (SPF/DKIM) | à la bascule du domaine — améliore la délivrabilité |
| Limite de débit du formulaire (base KV) | facultatif, quand tu veux |
| Ouvrir l'indexation Google (`robots.txt`) | à la bascule du domaine |
| Audit Lighthouse sur le site en ligne | dès qu'il est déployé — je m'en charge |

## Principe retenu

La première mise en ligne se fait sur une **adresse temporaire** fournie par l'hébergeur
(par exemple `le-sommer.pages.dev`), pas sur `le-sommer.com`.

Raison : le site Wix actuel reste en ligne et visible pendant qu'on valide le nouveau. La
bascule du vrai domaine n'intervient qu'à l'étape 5, quand tout est vérifié. Aucun risque
de coupure pour l'entreprise.
