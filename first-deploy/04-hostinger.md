# Déploiement sur Hostinger — `le-sommer.fr`

## Le point à comprendre avant tout

**Hostinger ne construit pas le site.** Sa fonction GIT *clone* un dépôt dans `public_html`,
rien de plus : elle n'exécute pas `npm run build`.

Si tu connectes directement la branche `main`, Hostinger déploiera les **sources** (`src/`,
`package.json`, `scripts/`…) et le site **ne s'affichera pas** — au mieux une page blanche
ou une liste de fichiers.

**La solution mise en place :** une branche `deploy` qui contient uniquement le site
construit, alimentée automatiquement par GitHub Actions.

```
tu pousses sur main
        ↓
GitHub Actions lance npm run build   (automatique, ~2 min)
        ↓
le résultat (dist/) est publié sur la branche « deploy »
        ↓
Hostinger clone la branche « deploy »  →  le site est en ligne
```

Tu ne t'occupes que du premier maillon : pousser sur `main`.

---

## Ton problème actuel : le bouton GitHub qui tourne en rond

Le bouton *« Connectez votre compte GitHub via OAuth »* reste bloqué sur un chargement
infini. C'est un dysfonctionnement connu, indépendant de ton dépôt (le fait qu'il soit
public ou privé n'y change rien).

### Causes les plus fréquentes, dans l'ordre

1. **La fenêtre OAuth est bloquée.** Hostinger ouvre une popup vers GitHub ; un bloqueur de
   publicité (uBlock, AdGuard), le mode strict de Brave/Firefox ou un bloqueur de popups
   l'empêche de s'ouvrir. Le bouton attend alors une réponse qui n'arrivera jamais.
2. **Les cookies tiers sont refusés.** L'échange OAuth a besoin d'un cookie posé par GitHub
   sur le domaine Hostinger.
3. **Une session GitHub déjà ouverte ailleurs** avec un autre compte crée un conflit.

### Ce que je te propose de tester, dans cet ordre

| # | Action | Pourquoi |
|---|---|---|
| 1 | Ouvrir hPanel dans une **fenêtre de navigation privée** (Chrome de préférence) | Écarte d'un coup extensions, bloqueurs et cookies parasites |
| 2 | Désactiver le bloqueur de pub sur `hpanel.hostinger.com`, puis recharger | Cause n°1 |
| 3 | Autoriser les popups pour `hpanel.hostinger.com` | Cause n°1 bis |
| 4 | Se déconnecter de GitHub, se reconnecter avec le bon compte, puis réessayer | Cause n°3 |

### Si ça bloque toujours : la méthode sans OAuth (recommandée)

Hostinger accepte aussi une **URL de dépôt** directe, sans passer par OAuth. Comme ton dépôt
est public, c'est même plus simple :

1. Dans hPanel → *Avancé → GIT*, cherche le champ **« Repository »** ou **« URL du dépôt »**
   (parfois derrière un lien « Utiliser une URL » / « Manual setup »).
2. Renseigne :

   | Champ | Valeur |
   |---|---|
   | Repository | `https://github.com/alexy2509/Le-Sommer-site.git` |
   | Branch | **`deploy`** ← *pas `main`* |
   | Directory | *(laisser vide = `public_html`)* |

3. Valide, puis clique sur **Deploy**.

C'est la méthode que je te conseille : elle ne dépend d'aucune autorisation OAuth, et pour un
dépôt public elle fonctionne du premier coup.

---

## Étapes complètes, dans l'ordre

### 1. Pousser le code sur GitHub *(à faire par toi)*

```bash
cd ~/Documents/LS && git push origin main
```

Je ne peux pas le faire : aucun identifiant GitHub n'est enregistré sur cette machine, et je
ne dois pas saisir de jeton. Si Git te demande un mot de passe, c'est un **jeton d'accès
personnel** qu'il attend (GitHub → *Settings → Developer settings → Personal access tokens*,
portée `repo`). GitHub Desktop ou VS Code s'en chargent tout seuls.

### 2. Laisser GitHub Actions construire le site

Dès le push, va dans l'onglet **Actions** du dépôt. Le workflow « Construire et publier le
site » se lance seul (~2 min). À la fin, une branche **`deploy`** apparaît, contenant le site
prêt à servir.

> Si l'onglet Actions affiche une erreur de permission, va dans *Settings → Actions → General
> → Workflow permissions* et coche **Read and write permissions**.

### 3. Connecter Hostinger à la branche `deploy`

hPanel → *Sites web → le-sommer.fr → Avancé → GIT* → méthode OAuth ou URL (voir plus haut),
avec **Branch = `deploy`**.

Active aussi le **déploiement automatique** (webhook) si l'option est proposée : le site se
mettra à jour tout seul à chaque push.

### 4. Domaine et HTTPS

1. *Sites web → le-sommer.fr → Domaines* : vérifie que `le-sommer.fr` pointe bien vers
   l'hébergement.
2. *Sécurité → SSL* : active le certificat gratuit (Let's Encrypt), puis **Force HTTPS**.
3. Le fichier `.htaccess` déployé s'occupe du reste : redirection vers `https://le-sommer.fr`
   (sans `www`), en-têtes de sécurité, cache et redirections 301 depuis les anciennes URLs Wix.

### 5. Après la mise en ligne — préviens-moi

Je vérifierai : les 8 pages, les images, le responsive, **les en-têtes de sécurité réellement
servis**, le `robots.txt`, le `sitemap.xml`, et je lancerai un **audit Lighthouse**.

À faire ensuite, côté référencement :
- déclarer le site dans **Google Search Console** et y soumettre `https://le-sommer.fr/sitemap.xml` ;
- décider du sort de l'ancien site Wix `le-sommer.com` (idéalement : le rediriger vers
  `le-sommer.fr`, sinon les deux sites se feront concurrence dans Google).

---

## En cas de souci

| Symptôme | Cause probable | Solution |
|---|---|---|
| Page blanche ou liste de fichiers | Hostinger pointe sur `main` | Repasser sur la branche **`deploy`** |
| Le site s'affiche sans style | Fichiers déployés dans un sous-dossier | Le champ *Directory* doit être vide |
| Modifications invisibles | Cache | *Gestionnaire de cache* → vider, puis Ctrl+Maj+R |
| Erreur 500 | `.htaccess` mal interprété | Me prévenir : je réduis le fichier au minimum |
| La branche `deploy` n'existe pas | Workflow non exécuté | Onglet *Actions* : vérifier les permissions (étape 2) |
