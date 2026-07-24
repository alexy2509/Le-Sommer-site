# Étape 1 — Héberger le site gratuitement : les options

## La contrainte à connaître avant de choisir

Le site est **statique** (HTML/CSS/JS), sauf **un point** : le formulaire de contact, qui
envoie vers `/api/contact.php`.

Or **aucun hébergeur gratuit moderne n'exécute PHP.** Cloudflare, Netlify, Vercel et GitHub
servent des fichiers statiques, pas du PHP. Et `api/contact.php` n'a de toute façon jamais
été écrit (le dossier `api/` est vide) : le formulaire ne fonctionne donc nulle part
aujourd'hui.

Il faut trancher ce point ; les solutions sont en fin de document (§ Le formulaire).

---

## Les 5 façons d'héberger gratuitement

### 1. Cloudflare Pages — **recommandé**

| | |
|---|---|
| Bande passante | **illimitée** |
| Stockage / fichiers | 20 000 fichiers max, 25 Mo par fichier (le site : 439 fichiers, 31 Mo → large) |
| Builds | 500 par mois |
| Domaine perso + HTTPS | inclus, gratuit, automatique |
| En-têtes de sécurité | fichier `_headers` (équivalent du `.htaccess`) |
| Redirections 301 Wix | fichier `_redirects` |
| Publicité imposée | aucune |

**Pourquoi c'est le meilleur choix ici :** c'est le seul à offrir la bande passante
illimitée, ce qui compte pour un site à 31 Mo d'images. Il gère nativement les en-têtes de
sécurité et les redirections dont on a besoin. Et si on veut un vrai formulaire plus tard,
Cloudflare Workers (100 000 requêtes/jour gratuites) peut faire l'endpoint, avec possibilité
de rester en Europe pour le RGPD.

**Inconvénient :** interface un peu technique, et l'écosystème Workers a ses spécificités
(ce n'est pas du Node.js standard).

---

### 2. Netlify

| | |
|---|---|
| Bande passante | 100 Go/mois |
| Builds | 300 minutes/mois |
| Formulaire | **Netlify Forms inclus : 100 envois/mois** |
| Domaine perso + HTTPS | inclus, gratuit |

**Avantage :** le formulaire de contact fonctionne sans rien coder — on ajoute un attribut
au `<form>` et Netlify collecte les envois. C'est le chemin le plus court pour un site
complet et fonctionnel.

**Inconvénients :** si le quota est dépassé, **Netlify met le site en pause** jusqu'au mois
suivant (Cloudflare, lui, continue de servir). La facturation est passée à un système de
crédits en septembre 2025, remanié en avril 2026, ce qui rend les coûts moins prévisibles si
on dépasse un jour. 100 Go/mois reste très confortable pour un site vitrine local.

---

### 3. Vercel

Très proche de Netlify (100 Go/mois, domaine et HTTPS gratuits, fonctions serverless).

**Le point bloquant :** la licence gratuite de Vercel est réservée à un usage **non
commercial**. Un site d'entreprise qui génère des demandes de devis entre dans le
commercial. Je le déconseille ici pour éviter une régularisation payante plus tard.

---

### 4. GitHub Pages

Gratuit, simple, adossé au dépôt GitHub qui existe déjà.

**Limites :** 1 Go de site max et ~100 Go/mois de trafic, **aucun contrôle des en-têtes HTTP**
(donc pas de CSP ni de HSTS — c'est contraire aux exigences de sécurité du cahier des
charges §12), et pas de redirections serveur pour les anciennes URLs Wix. À réserver à une
démonstration rapide, pas à un site d'entreprise.

---

### 5. Hostinger (l'option du cahier des charges) — **payant**

C'est ce que prévoit `CLAUDE.md` : Apache, PHP 8.2+, `.htaccess`, SMTP. C'est la seule
option qui fait tourner `api/contact.php` tel qu'il a été conçu (formulaire auto-hébergé,
emails envoyés depuis notre propre domaine, RGPD entièrement maîtrisé).

**Ce n'est pas gratuit** (environ 3 à 5 €/mois en première souscription). Je le mentionne
parce que c'est la cible finale prévue : l'hébergement gratuit est parfait pour **valider**
le site, mais tu voudras peut-être basculer sur Hostinger le jour de la mise en production
définitive.

---

## Le formulaire de contact : trois chemins possibles

| Option | Fonctionne ? | RGPD | Effort |
|---|---|---|---|
| **A. Netlify Forms** | oui, 100 envois/mois | correct, mais serveurs hors UE | très faible |
| **B. Service tiers** (Web3Forms 250/mois, Formspree 50/mois) | oui | **point de vigilance** : Web3Forms héberge aux États-Unis, sans DPA ni option de résidence UE — à mentionner dans la politique de confidentialité | faible |
| **C. Cloudflare Worker** (endpoint maison) | oui | **le meilleur** : on maîtrise tout, hébergement UE possible | moyen (à coder) |
| **D. On désactive le formulaire pour la V1** | non — on garde téléphone + email cliquables | parfait | nul |

Pour une **première mise en ligne de validation**, l'option D est tout à fait acceptable :
le téléphone et l'email sont déjà présents partout sur le site, et ce sont les canaux que
les clients de LE SOMMER utilisent en pratique (une panne, on appelle). On branchera un
vrai formulaire à l'étape 4 ou 5.

---

## Ma recommandation

**Cloudflare Pages + option D** (téléphone/email seuls) pour cette première mise en ligne,
puis un Cloudflare Worker pour le formulaire quand le site sera validé.

Raisons : bande passante illimitée pour nos images, en-têtes de sécurité et redirections 301
gérés proprement (indispensables pour la migration depuis Wix sans perdre le référencement),
aucune publicité, et pas de risque de mise en pause du site.

**Si tu préfères que le formulaire marche dès le premier jour :** prends **Netlify**. C'est
un choix parfaitement défendable, plus simple, et la différence de bande passante n'aura
aucune importance concrète pour un site vitrine local.

---

## Sources

- [Vercel vs Netlify vs Cloudflare Pages, comparatif 2026](https://blog.vibecoder.me/vercel-vs-netlify-vs-cloudflare-pages)
- [Vercel vs Netlify vs Cloudflare Pages : comparatif tarifaire 2026](https://www.devtoolreviews.com/reviews/vercel-vs-netlify-vs-cloudflare-pages-pricing-comparison-2026)
- [Hébergement statique gratuit : 8 options comparées (2026)](https://htmlpub.com/blog/static-site-hosting-comparison-2026)
- [Meilleurs services de formulaire gratuits en 2026](https://splitforms.com/blog/best-free-form-backend-services-2026)
- [Alternatives à Formspree : 6 backends comparés (2026)](https://un-static.com/alternative/formspree/)
