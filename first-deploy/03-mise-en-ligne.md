# Étape 3 & 4 — Mise en ligne sur Cloudflare Pages

Décisions retenues : **Cloudflare Pages**, **formulaire fonctionnel** (Pages Function +
Brevo), adresse temporaire **`le-sommer.pages.dev`**.

---

## Ce qui est déjà fait

| Élément | Détail |
|---|---|
| `functions/api/contact.js` | Endpoint du formulaire. 11 tests de sécurité passés (voir plus bas) |
| `src/js/modules/form.js` | Validation à la volée, envoi sans rechargement, messages clairs |
| `public/_headers` | CSP, HSTS, X-Frame-Options… (cahier des charges §12.1) + règles de cache |
| `public/_redirects` | Redirections 301 depuis les URLs Wix, prêtes pour la bascule |
| `public/robots.txt` | **Indexation bloquée** tant qu'on est sur l'adresse temporaire |
| `scripts/generate-sitemap.mjs` | `sitemap.xml` généré automatiquement au build (8 pages) |
| Commit | `fdbd4ab` — 153 fichiers, prêt à être poussé |

### Tests de sécurité du formulaire (tous passés)

| Scénario | Réponse |
|---|---|
| Requête GET | 405 |
| Honeypot rempli (robot) | 200 silencieux, aucun email envoyé |
| Envoi en moins de 3 secondes | 200 silencieux, aucun email envoyé |
| Email / téléphone invalide | 422 |
| Sujet hors de la liste fermée | 422 |
| Injection d'en-tête (`\n Bcc:`) | 422 |
| Message de 5 000 caractères | 422 |
| Consentement RGPD absent | 422 |
| Envoi depuis un autre site | 403 |

L'email part en **texte brut** (aucun HTML), l'expéditeur est **toujours notre domaine**, et
l'adresse du visiteur ne sert qu'en **Reply-To** — jamais en expéditeur, pour éviter
l'usurpation et le classement en spam.

> **Écart assumé avec le cahier des charges §12.4 :** pas de jeton CSRF. Il supposait des
> sessions PHP, qui n'existent pas en serverless. Sans authentification ni cookie, un
> attaquant n'usurpe l'identité de personne — il peut de toute façon appeler l'endpoint
> directement. La protection pertinente ici est le contrôle d'origine, en place.

---

## Ce que tu dois faire — dans l'ordre

### 1. Pousser le code sur GitHub ⚠️ bloqué de mon côté

Le commit est prêt mais **je ne peux pas le pousser** : aucun identifiant GitHub n'est
enregistré sur cette machine, et je ne dois jamais saisir de mot de passe ou de jeton.

**Le plus simple** — ouvre le Terminal et lance :

```bash
cd ~/Documents/LS && git push -u origin main
```

Git te demandera ton nom d'utilisateur GitHub puis un **jeton d'accès personnel** (à créer
sur github.com → Settings → Developer settings → Personal access tokens, avec la portée
`repo`). Le mot de passe GitHub classique ne fonctionne plus depuis 2021.

*Alternative :* pousser depuis GitHub Desktop ou VS Code, qui gèrent la connexion tout seuls.

### 2. Créer le compte Brevo (envoi des emails)

1. Compte gratuit sur [brevo.com](https://www.brevo.com) — 300 emails/jour, serveurs UE.
2. **Vérifier l'adresse d'expédition** : Brevo envoie un lien de confirmation.
   Pour cette phase de validation, l'adresse existante `v.lesommer@outlook.fr` suffit.
3. Récupérer la clé API : *SMTP & API → API Keys → Generate a new API key*.
   **Garde-la de côté, ne me l'envoie pas** — tu la colleras directement dans Cloudflare.

> **À prévoir pour la production :** authentifier le domaine `le-sommer.com` dans Brevo
> (enregistrements SPF et DKIM). Sans cela, les emails partent avec une signature
> « au nom de », ce qui nuit à la délivrabilité. À faire au moment de la bascule du domaine,
> puisque cela demande d'accéder aux DNS.

### 3. Créer le projet Cloudflare Pages

1. Compte gratuit sur [dash.cloudflare.com](https://dash.cloudflare.com) + **activer la 2FA**.
2. *Workers & Pages → Create → Pages → Connect to Git* → autoriser GitHub → choisir le dépôt
   **`alexy2509/Le-Sommer-site`**.
3. Renseigner **exactement** ces réglages de build :

   | Champ | Valeur |
   |---|---|
   | Project name | `le-sommer` |
   | Production branch | `main` |
   | Framework preset | *None* |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. **Variables d'environnement** (section *Environment variables*, production) :

   | Nom | Valeur | Type |
   |---|---|---|
   | `BREVO_API_KEY` | ta clé Brevo | **Secret** (chiffré) |
   | `CONTACT_TO` | `v.lesommer@outlook.fr` | Texte |
   | `CONTACT_FROM` | la même adresse, vérifiée dans Brevo | Texte |
   | `NODE_VERSION` | `22` | Texte |

   `NODE_VERSION` est important : sans lui, Cloudflare utilise une version ancienne de Node
   et la génération d'images échoue.

5. *Save and Deploy*. Le premier build prend **3 à 5 minutes** (la préparation des images
   dure à elle seule environ 1 min 30).

### 4. Préviens-moi

Dès que le site est en ligne, donne-moi l'URL. Je vérifierai :
les 8 pages, les images, le responsive, **les en-têtes de sécurité réellement servis**, le
`robots.txt`, le `sitemap.xml`, un **envoi réel du formulaire**, et un **audit Lighthouse**.

---

## Limite de débit (facultatif, plus tard)

L'endpoint accepte une limite de 5 envois par IP et par heure, active uniquement si une base
KV est liée. Pour l'activer : *Workers & Pages → KV → Create namespace* (`RATE_LIMIT`), puis
dans les réglages du projet Pages, lier ce namespace sous le nom **`RATE_LIMIT`**.

Sans cette liaison, le formulaire fonctionne normalement — il n'a simplement pas de plafond
par IP. Le honeypot, la temporisation et le contrôle d'origine restent actifs.
