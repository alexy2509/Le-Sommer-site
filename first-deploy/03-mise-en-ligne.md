# Étape 3 & 4 — Mise en ligne sur Vercel

Décisions retenues : **Vercel**, **sans formulaire de contact** (téléphone et email uniquement),
adresse temporaire `le-sommer.vercel.app`.

---

## ⚠️ Un point à connaître : la licence Vercel

Le plan gratuit de Vercel (**Hobby**) est réservé à un usage **personnel et non commercial**.
Les conditions d'utilisation excluent explicitement les sites qui « servent des fins
commerciales », et Vercel applique cette règle. Un site vitrine d'entreprise qui génère des
appels et des demandes de devis entre dans cette catégorie.

**Concrètement, deux issues possibles :**
- rien ne se passe pendant longtemps (c'est le cas le plus fréquent pour un petit site) ;
- ou Vercel demande un passage au plan **Pro à 20 $/mois**, voire suspend le projet.

**Alternatives sans cette restriction, à effort identique** — le site est désormais 100 %
statique, il se déploie de la même façon partout :

| Hébergeur | Usage commercial | Ce qu'il faut changer |
|---|---|---|
| **Netlify** | ✅ autorisé | remplacer `vercel.json` par un `netlify.toml` (5 min) |
| **Cloudflare Pages** | ✅ autorisé | remettre `public/_headers` + `_redirects` (déjà écrits, dans l'historique Git) |

Tu décides — je le signale une fois, et on avance avec Vercel comme demandé.

---

## Ce qui a changé : plus de formulaire

Le formulaire de demande de devis est **retiré**. La page `/contact/` présente désormais un
bloc d'appel direct : téléphone en gros bouton, email en secours, horaires, adresse.

**Supprimé du projet :** `functions/api/contact.js`, `src/js/modules/form.js`,
`src/styles/components/form.css`, la liste des sujets et le `<form>` complet.

**Conséquence agréable :** le site n'a plus aucune partie serveur. Ni compte Brevo, ni clé
API, ni variable d'environnement, ni fonction serverless. C'est du statique pur — plus simple,
plus rapide, et plus rien qui puisse tomber en panne côté formulaire.

Les boutons « Demander un devis » du site restent en place et mènent à `/contact/` : demander
un devis reste possible, par téléphone ou par email. Dis-moi si tu préfères les renommer
« Nous contacter ».

---

## Ce que tu dois faire — 5 minutes

### 1. Créer le projet Vercel

1. Connecte-toi sur [vercel.com](https://vercel.com) (tu as déjà un compte).
2. **Add New… → Project** → importe le dépôt **`alexy2509/Le-Sommer-site`**.
   Le dépôt est privé : autorise Vercel à y accéder dans l'écran GitHub.
3. Vercel lit `vercel.json` à la racine et applique tout seul :

   | Réglage | Valeur (déjà dans `vercel.json`) |
   |---|---|
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Framework preset | *Other* |
   | URLs avec `/` final | activé (cohérent avec les liens internes du site) |

   **Une seule chose à saisir à la main** — dans *Settings → Environment Variables* :

   | Nom | Valeur |
   |---|---|
   | `NODE_VERSION` | `22` |

   Sans elle, Vercel peut utiliser un Node trop ancien et la génération d'images échoue.

4. **Deploy**. Compte **3 à 5 minutes** : la préparation des images prend à elle seule ~1 min 30.

### 2. Préviens-moi avec l'URL

Je vérifierai les 8 pages, les images, le responsive, **les en-têtes de sécurité réellement
servis**, le `robots.txt`, le `sitemap.xml`, et je lancerai un **audit Lighthouse**.

---

## Rappel : le site n'est pas indexable pour l'instant

`public/robots.txt` bloque volontairement les moteurs de recherche tant qu'on est sur
l'adresse temporaire — sinon le nouveau site ferait doublon avec le site Wix encore en ligne
et se pénaliserait lui-même. On l'ouvrira à l'étape 5, au moment de la bascule du domaine.

Les redirections 301 depuis les anciennes URLs Wix sont déjà écrites dans `vercel.json` :
elles s'activeront d'elles-mêmes le jour où `le-sommer.com` pointera ici.
