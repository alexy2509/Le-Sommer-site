// Au rafraîchissement (F5 / recharge) : on renvoie vers l'accueil, en haut de page.
// La navigation normale (clic sur un lien, ouverture d'un lien partagé) n'est PAS affectée :
// seul le rechargement déclenche le retour à l'accueil.
export function initScrollReset() {
  // Empêche le navigateur de restaurer la position de défilement précédente.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const navEntries = performance.getEntriesByType('navigation');
  const isReload = navEntries && navEntries.length ? navEntries[0].type === 'reload' : performance.navigation && performance.navigation.type === 1;

  if (isReload && location.pathname !== '/') {
    location.replace('/');
    return;
  }

  window.scrollTo(0, 0);
}
