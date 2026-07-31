/* Exécuté de façon SYNCHRONE dans le <head>, avant tout rendu.
   Seul moyen de désactiver la restauration de défilement assez tôt : un module (defer)
   s'exécute après que le navigateur a déjà décidé de restaurer la position, ce qui donnait
   un comportement aléatoire au rechargement. Fichier classique et non bundlé — conforme à
   la CSP (script-src 'self'), aucun inline. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
