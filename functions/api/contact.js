/*
  Endpoint du formulaire de contact — Cloudflare Pages Function.
  URL publique : POST /api/contact

  Remplace l'`api/contact.php` prévu par CLAUDE.md §12.4 (aucun hébergeur gratuit n'exécute
  PHP). Les règles de sécurité du brief sont reprises telles quelles ; deux s'appliquent
  différemment, c'est documenté plus bas.

  Variables d'environnement à définir dans le tableau de bord Cloudflare Pages :
    BREVO_API_KEY  (secret)  clé API Brevo — service d'envoi, serveurs UE, RGPD
    CONTACT_TO     (texte)   adresse de réception des demandes
    CONTACT_FROM   (texte)   expéditeur technique, sur un domaine que l'on contrôle
  Liaison facultative :
    RATE_LIMIT     (KV)      compteur anti-abus par IP ; sans elle, la limite est inactive
*/

const SUBJECTS = ['Électricité industrielle', "Matériel d'élevage", 'Dépannage', 'Recrutement', 'Demande spéciale'];

const LIMITS = {
  name: 80,
  company: 80,
  email: 120,
  phone: 20,
  message: 3000,
};

// Anti-injection d'en-têtes : aucun retour chariot dans les champs courts (CLAUDE.md §12.4).
const hasNewline = (v) => /[\r\n]/.test(v);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

/** Réponse volontairement identique en cas de rejet : on ne renseigne pas un robot. */
const ok = () => json({ ok: true });
const invalid = () => json({ ok: false }, 422);

export async function onRequest({ request, env }) {
  // ---- Méthode : POST uniquement ----
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { allow: 'POST' } });
  }

  // ---- Origine : rejette les envois croisés depuis un autre site ----
  // Sans session ni cookie, il n'y a pas de jeton CSRF à valider (le brief supposait des
  // sessions PHP) : un attaquant n'usurpe aucune identité ici. Le contrôle d'origine est la
  // protection pertinente contre les envois automatisés depuis une page tierce.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) {
    return json({ ok: false }, 403);
  }

  // ---- Corps de la requête ----
  let form;
  try {
    const type = request.headers.get('content-type') ?? '';
    if (!type.includes('form') && !type.includes('json')) return invalid();
    form = type.includes('json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return invalid();
  }

  const get = (k) => String(form[k] ?? '').trim();

  // ---- Honeypot : rempli = robot. Rejet silencieux, réponse de succès. ----
  if (get('website')) return ok();

  // ---- Temporisation : un humain ne remplit pas ce formulaire en moins de 3 secondes. ----
  const elapsed = Number(get('form_time'));
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 3000) return ok();

  // ---- Validation stricte, champ par champ ----
  const name = get('name');
  const company = get('company');
  const email = get('email');
  const phone = get('phone');
  const subject = get('subject');
  const message = get('message');
  const consent = get('consent');

  if (!name || name.length > LIMITS.name || hasNewline(name)) return invalid();
  if (company.length > LIMITS.company || hasNewline(company)) return invalid();
  if (!email || email.length > LIMITS.email || hasNewline(email)) return invalid();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return invalid();
  if (!/^[0-9 +().-]{6,20}$/.test(phone)) return invalid();
  if (!SUBJECTS.includes(subject)) return invalid();
  if (!message || message.length > LIMITS.message) return invalid();
  if (consent !== 'on' && consent !== 'true' && consent !== '1') return invalid();

  // ---- Limite de débit : 5 envois par IP et par heure (si la liaison KV existe) ----
  const ip = request.headers.get('cf-connecting-ip') ?? '';
  if (env.RATE_LIMIT && ip) {
    const key = `contact:${ip}`;
    const count = Number((await env.RATE_LIMIT.get(key)) ?? 0);
    if (count >= 5) return json({ ok: false }, 429);
    await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 3600 });
  }

  // ---- Configuration serveur ----
  if (!env.BREVO_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('[contact] Variables d’environnement manquantes.');
    return json({ ok: false }, 500);
  }

  // ---- Corps du message : texte brut, aucune donnée réinjectée dans du HTML ----
  const body = [
    `Nom          : ${name}`,
    `Entreprise   : ${company || '—'}`,
    `Email        : ${email}`,
    `Téléphone    : ${phone}`,
    `Sujet        : ${subject}`,
    '',
    'Message :',
    message,
    '',
    '---',
    'Envoyé depuis le formulaire de contact du site le-sommer.com',
  ].join('\n');

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        // L'expéditeur est TOUJOURS notre domaine : l'adresse du visiteur ne sert qu'en
        // réponse, jamais en From (sinon usurpation et rejet par les anti-spam).
        sender: { email: env.CONTACT_FROM, name: 'Site LE SOMMER' },
        to: [{ email: env.CONTACT_TO }],
        replyTo: { email, name },
        subject: `[Site] ${subject} — ${name}`,
        textContent: body,
      }),
    });

    if (!res.ok) {
      // Journalisé côté serveur uniquement : le visiteur ne voit jamais le détail.
      console.error('[contact] Brevo a répondu', res.status, await res.text());
      return json({ ok: false }, 502);
    }
  } catch (err) {
    console.error('[contact] Envoi impossible :', err?.message);
    return json({ ok: false }, 502);
  }

  return ok();
}
