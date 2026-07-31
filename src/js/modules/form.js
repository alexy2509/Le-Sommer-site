// Formulaire de devis : jeton CSRF, validation à la volée, envoi sans rechargement.
//
// Sans JavaScript le formulaire reste utilisable : il s'envoie nativement vers
// /api/contact.php. Le JS n'apporte que le confort — erreurs à côté des champs, pas de
// rechargement de page, bouton verrouillé pendant l'envoi.
//
// Aucun contenu saisi par le visiteur n'est réinjecté dans la page : tous les messages
// affichés sont écrits en dur ici et posés via textContent (cahier des charges §12.2).
// C'est ce qui rend une attaque XSS impossible par ce chemin.

const MESSAGES = {
  envoi: 'Envoi en cours…',
  succes: 'Merci, votre demande est bien partie. Nous vous répondons rapidement.',
  invalide: 'Certains champs sont incomplets ou incorrects. Merci de vérifier.',
  quota: 'Trop de demandes envoyées depuis cet appareil. Réessayez plus tard, ou appelez-nous.',
  expire: 'Votre session a expiré. Rechargez la page et renvoyez votre demande.',
  erreur: 'L’envoi a échoué. Merci de nous appeler au 06 61 04 89 26.',
};

function champValide(champ) {
  if (champ.type === 'checkbox') return champ.checked || !champ.required;
  if (!champ.required && !champ.value.trim()) return true;
  return champ.checkValidity() && champ.value.trim() !== '';
}

function marquer(champ, valide) {
  champ.closest('.form-field')?.classList.toggle('has-error', !valide);
  champ.setAttribute('aria-invalid', valide ? 'false' : 'true');
}

export function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const statut = form.querySelector('[data-form-status]');
  const bouton = form.querySelector('[data-submit]');
  const champJeton = form.querySelector('[data-csrf]');

  const champs = [...form.querySelectorAll('input, select, textarea')].filter(
    (c) => c.name && c.name !== 'website' && c.type !== 'hidden',
  );

  const dire = (texte, etat) => {
    if (!statut) return;
    statut.textContent = texte;
    statut.dataset.state = etat;
  };

  // Jeton CSRF : demandé au serveur au chargement. Il est lié à la session et à usage unique.
  let jetonPret = fetch('/api/contact.php', { credentials: 'same-origin', headers: { accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (d?.token && champJeton) champJeton.value = d.token;
      return Boolean(d?.token);
    })
    .catch(() => false);

  // L'erreur n'apparaît qu'une fois le champ quitté, jamais pendant la frappe.
  for (const champ of champs) {
    champ.addEventListener('blur', () => marquer(champ, champValide(champ)));
    champ.addEventListener('input', () => {
      if (champ.closest('.form-field')?.classList.contains('has-error')) {
        marquer(champ, champValide(champ));
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let premierFautif = null;
    for (const champ of champs) {
      const valide = champValide(champ);
      marquer(champ, valide);
      if (!valide && !premierFautif) premierFautif = champ;
    }
    if (premierFautif) {
      dire(MESSAGES.invalide, 'error');
      premierFautif.focus();
      return;
    }

    bouton.disabled = true;
    dire(MESSAGES.envoi, 'pending');

    // Si le jeton n'était pas encore arrivé, on l'attend avant d'envoyer.
    if (!(await jetonPret) && champJeton && !champJeton.value) {
      dire(MESSAGES.expire, 'error');
      bouton.disabled = false;
      return;
    }

    try {
      const reponse = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        credentials: 'same-origin',
        headers: { accept: 'application/json' },
      });

      if (reponse.ok) {
        form.reset();
        dire(MESSAGES.succes, 'success');
        return; // bouton laissé désactivé : la demande est partie
      }

      if (reponse.status === 403) {
        dire(MESSAGES.expire, 'error');
        // Jeton consommé ou invalide : on en redemande un pour permettre un nouvel essai.
        jetonPret = fetch('/api/contact.php', { credentials: 'same-origin' })
          .then((r) => r.json())
          .then((d) => {
            if (d?.token && champJeton) champJeton.value = d.token;
            return Boolean(d?.token);
          })
          .catch(() => false);
      } else {
        dire(reponse.status === 429 ? MESSAGES.quota : reponse.status === 422 ? MESSAGES.invalide : MESSAGES.erreur, 'error');
      }
    } catch {
      dire(MESSAGES.erreur, 'error');
    }
    bouton.disabled = false;
  });
}
