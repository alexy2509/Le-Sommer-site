# Étape 2 — Ce dont j'ai besoin pour déployer

Deux catégories : ce que **tu dois faire toi-même** (je ne peux pas, et je ne dois pas), et
ce que tu dois **me dire**.

---

## A. Ce que tu fais toi-même — je ne peux pas le faire à ta place

### 1. Créer le compte chez l'hébergeur

Je ne crée jamais de compte et je ne saisis jamais de mot de passe : c'est une règle stricte
de mon fonctionnement, et c'est aussi la bonne pratique (le compte doit être à ton nom, avec
ton mot de passe, dans ton gestionnaire).

**À faire :**
1. Créer le compte sur l'hébergeur retenu (Cloudflare ou Netlify).
2. **Activer la double authentification (2FA)** — c'est exigé par le cahier des charges §12.6.
3. Enregistrer le mot de passe dans un gestionnaire (Bitwarden, KeePass…).

### 2. Pousser le code sur GitHub

Le dépôt existe déjà : `github.com/alexy2509/Le-Sommer-site`. Mais il ne contient **qu'un
seul commit**, et **104 fichiers ne sont pas encore envoyés** — c'est-à-dire tout le travail
récent.

Je peux préparer le commit, mais **je ne pousse rien sans ton feu vert** (c'est une action
qui publie du contenu). Dis-moi quand tu veux que je le fasse.

### 3. Accès au domaine `le-sommer.com` — pour l'étape 5 seulement

Pas besoin tout de suite. Le jour de la bascule, il faudra modifier les DNS chez le
registrar du domaine. À voir : **qui gère le domaine aujourd'hui ?** (Wix directement, ou un
registrar séparé type OVH/Gandi ?) La réponse change la procédure.

---

## B. Ce que tu dois me dire

### Décisions

| # | Question | Options |
|---|---|---|
| 1 | **Quel hébergeur ?** | Cloudflare Pages (recommandé) / Netlify / autre |
| 2 | **Le formulaire de contact ?** | Désactivé pour la V1 (recommandé) / Netlify Forms / service tiers / Worker maison |
| 3 | **Nom de l'adresse temporaire** | ex. `le-sommer` → donnera `le-sommer.pages.dev` |
| 4 | **Le site doit-il être indexé par Google dès maintenant ?** | Non recommandé : tant que le site est sur une adresse temporaire, il vaut mieux bloquer l'indexation pour ne pas créer de doublon avec le site Wix. On l'ouvrira à l'étape 5. |

### Informations encore manquantes dans le site

Ces éléments sont **obligatoires légalement** et ne sont pas encore renseignés. Ils peuvent
attendre l'étape 5 (mise en production réelle), mais pas au-delà :

| Donnée | Où c'est utilisé | Statut |
|---|---|---|
| Adresse email de réception des demandes | formulaire de contact | ❓ `v.lesommer@outlook.fr` convient-il, ou une adresse dédiée ? |
| Année de création de l'entreprise | page « Qui sommes-nous » | ❓ manquant |
| Fiche Google Business Profile | référencement local (levier n°1) | ❓ créée ? |

Les mentions légales sont déjà renseignées (SIRET 89350137900018, SARL, capital 8 000 €,
gérant Vivien Le Sommer) — rien à faire de ce côté.

---

## C. Ce que je fais, moi, une fois que tu as répondu

1. **Préparer les fichiers manquants** au format de l'hébergeur choisi :
   - `robots.txt` (avec blocage d'indexation tant qu'on est sur l'adresse temporaire)
   - `sitemap.xml` généré automatiquement au build
   - en-têtes de sécurité (CSP, HSTS, X-Frame-Options… — cahier des charges §12.1)
   - fichier de redirections, prêt pour les anciennes URLs Wix
2. **Adapter le formulaire** selon ta décision.
3. **Vérifier le build complet** et le poids final.
4. **Commiter proprement** le travail (et pousser, si tu me le demandes).
5. **Te guider pas à pas** pour la connexion GitHub → hébergeur (quelques clics dans leur
   interface, que tu feras toi-même).
6. **Contrôler le site en ligne** : les 8 pages, les images, le responsive, les en-têtes de
   sécurité, et un audit Lighthouse réel.

---

## En résumé : tu réponds à ces 4 questions

1. Cloudflare Pages ou Netlify ?
2. Formulaire désactivé pour la V1, ou fonctionnel tout de suite ?
3. Quel nom pour l'adresse temporaire ?
4. Je prépare et je pousse le commit sur GitHub ?

Dès que j'ai ça, je lance l'étape 3.
