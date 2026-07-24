// Formulaire de contact : validation côté client puis envoi en arrière-plan.
//
// Sans JavaScript, le formulaire reste fonctionnel : il s'envoie nativement vers
// /api/contact, qui répond en JSON. Le JS n'apporte que le confort (messages d'erreur à
// côté des champs, pas de rechargement de page).
//
// Aucun contenu saisi par le visiteur n'est réinjecté dans la page : les messages affichés
// sont écrits en dur ici, et posés via textContent (CLAUDE.md §12.2).

const MESSAGES = {
  sending: 'Envoi en cours…',
  success: 'Merci, votre demande est bien partie. Nous vous répondons rapidement.',
  invalid: 'Certains champs sont incomplets ou incorrects. Merci de vérifier.',
  limit: 'Trop de demandes envoyées depuis cet appareil. Merci de réessayer plus tard, ou de nous appeler.',
  error: 'L’envoi a échoué. Merci de nous appeler au 06 61 04 89 26.',
};

function fieldIsValid(field) {
  if (field.type === 'checkbox') return field.checked || !field.required;
  if (!field.required && !field.value.trim()) return true;
  return field.checkValidity() && field.value.trim() !== '';
}

function setFieldState(field, valid) {
  const wrap = field.closest('.form-field');
  if (wrap) wrap.classList.toggle('has-error', !valid);
  field.setAttribute('aria-invalid', valid ? 'false' : 'true');
}

export function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[data-submit]');
  const timeField = form.querySelector('[data-form-time]');

  // Temporisation anti-robot : durée réellement passée sur le formulaire.
  const openedAt = Date.now();

  const fields = [...form.querySelectorAll('input, select, textarea')].filter((f) => f.name && f.name !== 'website' && f.type !== 'hidden');

  // Le message d'erreur n'apparaît qu'une fois le champ quitté, jamais pendant la frappe.
  for (const field of fields) {
    field.addEventListener('blur', () => setFieldState(field, fieldIsValid(field)));
    field.addEventListener('input', () => {
      if (field.closest('.form-field')?.classList.contains('has-error')) {
        setFieldState(field, fieldIsValid(field));
      }
    });
  }

  const setStatus = (text, type) => {
    if (!status) return;
    status.textContent = text;
    status.dataset.state = type;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let firstInvalid = null;
    for (const field of fields) {
      const valid = fieldIsValid(field);
      setFieldState(field, valid);
      if (!valid && !firstInvalid) firstInvalid = field;
    }
    if (firstInvalid) {
      setStatus(MESSAGES.invalid, 'error');
      firstInvalid.focus();
      return;
    }

    if (timeField) timeField.value = String(Date.now() - openedAt);

    submit.disabled = true;
    setStatus(MESSAGES.sending, 'pending');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        setStatus(MESSAGES.success, 'success');
        // Le bouton reste désactivé : la demande est partie, inutile de la renvoyer.
        return;
      }
      setStatus(res.status === 429 ? MESSAGES.limit : res.status === 422 ? MESSAGES.invalid : MESSAGES.error, 'error');
    } catch {
      setStatus(MESSAGES.error, 'error');
    }
    submit.disabled = false;
  });
}
