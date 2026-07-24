// Position de défilement à l'ouverture d'une page.
//
// Comportement : on arrive TOUJOURS en haut de la page demandée. Aucune redirection n'est
// faite — un rechargement, un lien partagé ou un favori ouvrent bien la page demandée, et
// pas l'accueil.
//
// Deux exceptions volontaires :
//  - une URL avec ancre (#armoires, #aviculture…) doit sauter à l'ancre, sinon les liens du
//    sommaire des pages pôle seraient cassés ;
//  - un retour arrière depuis le cache du navigateur (bfcache) garde la position : c'est ce
//    que le visiteur attend quand il appuie sur « précédent ».
export function initScrollReset() {
  // Empêche le navigateur de restaurer la position de défilement au rechargement.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  if (location.hash) return;

  const toTop = () => window.scrollTo(0, 0);

  toTop();

  // Certains navigateurs restaurent la position APRÈS l'exécution des modules : on repasse
  // au chargement complet, puis à la frame suivante, pour reprendre la main dans tous les cas.
  window.addEventListener(
    'load',
    () => {
      toTop();
      requestAnimationFrame(toTop);
    },
    { once: true },
  );
}
