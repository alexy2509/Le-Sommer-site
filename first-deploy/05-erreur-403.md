# Erreur 403 sur `le-sommer.fr` — diagnostic et solution

## Ce qui se passe

J'ai interrogé ton dépôt GitHub (il est public, je peux le lire sans identifiants) :

```
$ git ls-remote --heads https://github.com/alexy2509/Le-Sommer-site.git
66091d0    refs/heads/main
```

**Une seule branche existe : `main`.** Deux conséquences directes :

1. **La branche `deploy` n'existe pas.** Hostinger a donc cloné `main`, c'est-à-dire les
   **fichiers sources** : `src/`, `scripts/`, `package.json`… Il n'y a **aucun `index.html`
   à la racine**, donc Apache n'a rien à servir → **403 Forbidden**.

2. **Les 3 derniers commits ne sont pas sur GitHub.** `main` pointe encore sur `66091d0`,
   alors que le travail local va jusqu'à `8c6498f`. Il manque notamment :
   - le workflow `.github/workflows/deploy.yml` (celui qui construit le site),
   - le `.htaccess`,
   - les photos améliorées et les dernières corrections.

C'est le point signalé dans [04-hostinger.md](04-hostinger.md) : *Hostinger ne construit pas
le site, il ne fait que cloner.* Sans branche `deploy`, il ne peut afficher que des sources —
donc rien.

---

## Deux solutions

### Solution A — Upload manuel *(immédiate, ~3 minutes)*

Le site construit est prêt dans une archive sur ton Bureau : **`le-sommer-site.zip`** (32 Mo,
8 pages, `.htaccess` et `sitemap.xml` inclus).

1. hPanel → **Fichiers → Gestionnaire de fichiers**
2. Ouvre le dossier **`public_html`**
3. **Vide-le entièrement** — c'est le clone raté qui s'y trouve (`src`, `scripts`,
   `package.json`… tout doit partir)
4. **Importer** (icône en haut à droite) → envoie `le-sommer-site.zip`
5. Clic droit sur l'archive → **Extraire** dans `public_html`
6. Supprime l'archive une fois extraite

Le site fonctionne immédiatement. Vérifie que `index.html` est bien **à la racine** de
`public_html`, pas dans un sous-dossier.

> ⚠️ Pense à **désactiver le déploiement automatique GIT** dans hPanel (*Avancé → GIT*),
> sinon le prochain déclenchement écrasera ces fichiers par les sources et le 403 reviendra.

### Solution B — Chaîne automatique *(propre, à faire dès que possible)*

C'est la bonne façon sur la durée : tu pousses, le site se met à jour tout seul.

**1. Pousser le code** *(je ne peux pas le faire : aucun identifiant GitHub sur cette machine)*

```bash
cd ~/Documents/LS && git push origin main
```

J'ai aussi préparé une branche **`deploy` locale** contenant déjà le site construit. Si tu
préfères sauter GitHub Actions, pousse-la directement — Hostinger pourra la cloner telle
quelle :

```bash
cd ~/Documents/LS && git push origin deploy
```

**2. Laisser GitHub Actions travailler** (si tu as poussé `main`)

Onglet **Actions** du dépôt → le workflow « Construire et publier le site » démarre seul
(~2 min) et met à jour la branche `deploy`.

> Si Actions refuse d'écrire : *Settings → Actions → General → Workflow permissions* →
> cocher **Read and write permissions**.

**3. Reconfigurer Hostinger**

hPanel → *Avancé → GIT* → supprimer le dépôt actuel, puis le recréer avec :

| Champ | Valeur |
|---|---|
| Repository | `https://github.com/alexy2509/Le-Sommer-site.git` |
| Branch | **`deploy`** ← c'est ici que tout se joue |
| Directory | *(vide)* |

Puis **Deploy**, et vide le cache (*Avancé → Gestionnaire de cache*).

---

## Vérifier que c'est bon

Une fois déployé, `public_html` doit contenir **ceci** :

```
public_html/
├── index.html          ← indispensable, à la racine
├── .htaccess
├── robots.txt
├── sitemap.xml
├── assets/
├── contact/
├── a-propos/
└── …
```

Et **surtout pas** `src/`, `scripts/`, `package.json`, `node_modules/` : leur présence
signifie que Hostinger pointe encore sur `main`.

---

## Si un 403 ou 500 persiste après un déploiement correct

Le `.htaccess` est la seule autre cause plausible. Pour l'écarter, renomme-le en
`.htaccess.bak` via le gestionnaire de fichiers et recharge la page :

- **le site s'affiche** → une directive n'est pas supportée par ton offre Hostinger ;
  préviens-moi, je réduis le fichier au strict minimum ;
- **le 403 persiste** → le problème vient du contenu déployé, pas de la configuration.
