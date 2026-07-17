import { icon } from '../partials/icons.mjs';
import { site } from '../partials/site-data.mjs';

const subjects = ['Électricité industrielle', "Matériel d'élevage", 'Dépannage', 'Recrutement', 'Autre'];

export const meta = {
  title: 'Contact | LE SOMMER, Ergué-Gabéric (29)',
  description: "Contactez LE SOMMER à Ergué-Gabéric (29) : téléphone, email et formulaire pour un devis ou un dépannage en électricité industrielle et matériel d'élevage.",
  path: '/contact/',
  breadcrumb: [
    { label: 'Accueil', path: '/' },
    { label: 'Contact', path: '/contact/' },
  ],
};

export function content() {
  return `
<section class="section--tight">
  <div class="container container--narrow">
    <p class="eyebrow">Contact</p>
    <h1>Parlons de votre projet ou de votre dépannage</h1>
    <p style="font-size:var(--fs-body-lg)">Un devis, une panne, une question sur du matériel ? Appelez-nous directement ou remplissez le formulaire : nous vous répondons rapidement.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info js-anim" data-reveal>
        <a class="contact-info__card contact-info__card--phone" href="${site.phoneHref}">
          <span class="contact-info__icon">${icon('phone', 'icon')}</span>
          <span>
            <span class="contact-info__label">Téléphone</span>
            <span class="contact-info__value">${site.phoneDisplay}</span>
          </span>
        </a>
        <a class="contact-info__card" href="mailto:${site.email}">
          <span class="contact-info__icon">${icon('mail', 'icon')}</span>
          <span>
            <span class="contact-info__label">Email</span>
            <span class="contact-info__value">${site.email}</span>
          </span>
        </a>
        <div class="contact-info__card contact-info__card--hours">
          <span class="contact-info__icon">${icon('clock', 'icon')}</span>
          <span>
            <span class="contact-info__label">Horaires d'ouverture</span>
            <span class="contact-info__value">${site.hoursDisplay}</span>
          </span>
        </div>
        <div class="contact-map">
          <a href="${site.mapUrl}" target="_blank" rel="noopener noreferrer" class="contact-map__frame" aria-label="Voir le siège de LE SOMMER sur OpenStreetMap (nouvel onglet)">
            <picture>
              <source srcset="/assets/img/carte-localisation.webp" type="image/webp" />
              <img src="/assets/img/carte-localisation.png" alt="Carte : siège de LE SOMMER au rond-point de Kerourvois à Ergué-Gabéric" width="760" height="460" loading="lazy" />
            </picture>
          </a>
          <div class="contact-map__foot">
            <span class="contact-map__addr">${icon('pin', 'icon')} ${site.address.street}, ${site.address.postalCode} ${site.address.locality}</span>
            <a class="contact-map__link" href="${site.mapUrl}" target="_blank" rel="noopener noreferrer">Itinéraire ${icon('arrowRight', 'icon')}</a>
          </div>
          <p class="contact-map__attr">© OpenStreetMap contributors</p>
        </div>
      </div>

      <div class="contact-form-wrap js-anim" data-reveal>
        <form id="contact-form" class="contact-form" method="post" action="/api/contact.php" novalidate>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>

          <!-- Honeypot anti-spam : ne pas remplir. Masqué + hors flux clavier/lecteur d'écran. -->
          <div class="form-honeypot" aria-hidden="true">
            <label for="website">Ne pas remplir ce champ</label>
            <input type="text" id="website" name="website" tabindex="-1" autocomplete="off" />
          </div>
          <input type="hidden" name="csrf_token" value="" data-csrf />
          <input type="hidden" name="form_time" value="" data-form-time />

          <div class="form-row">
            <div class="form-field">
              <label for="name">Nom et prénom *</label>
              <input type="text" id="name" name="name" required autocomplete="name" maxlength="80" aria-describedby="err-name" />
              <span class="form-field__error" id="err-name">Merci d'indiquer votre nom.</span>
            </div>
            <div class="form-field">
              <label for="company">Entreprise / exploitation</label>
              <input type="text" id="company" name="company" autocomplete="organization" maxlength="80" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required autocomplete="email" maxlength="120" aria-describedby="err-email" />
              <span class="form-field__error" id="err-email">Merci d'indiquer un email valide.</span>
            </div>
            <div class="form-field">
              <label for="phone">Téléphone *</label>
              <input type="tel" id="phone" name="phone" required autocomplete="tel" maxlength="20" aria-describedby="err-phone" />
              <span class="form-field__error" id="err-phone">Merci d'indiquer un téléphone valide.</span>
            </div>
          </div>

          <div class="form-field">
            <label for="subject">Sujet *</label>
            <div class="select-wrap">
              <select id="subject" name="subject" required aria-describedby="err-subject">
                <option value="" selected disabled>Choisir un sujet…</option>
                ${subjects.map((s) => `<option value="${s}">${s}</option>`).join('')}
              </select>
              ${icon('chevronDown', 'select-wrap__chevron')}
            </div>
            <span class="form-field__error" id="err-subject">Merci de choisir un sujet.</span>
          </div>

          <div class="form-field">
            <label for="message">Votre message *</label>
            <textarea id="message" name="message" required maxlength="3000" aria-describedby="err-message" placeholder="Décrivez votre besoin : type d'installation, panne, matériel recherché, délais…"></textarea>
            <span class="form-field__error" id="err-message">Merci de détailler votre demande.</span>
          </div>

          <div class="form-field form-field--consent">
            <label class="form-checkbox">
              <input type="checkbox" id="consent" name="consent" required aria-describedby="err-consent" />
              <span>J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la <a href="/politique-confidentialite/">politique de confidentialité</a>. *</span>
            </label>
            <span class="form-field__error" id="err-consent">Votre accord est nécessaire pour traiter la demande.</span>
          </div>

          <button type="submit" class="btn btn--primary btn--block" data-submit>Envoyer ma demande ${icon('arrowRight', 'icon')}</button>
          <p class="form-note">* Champs obligatoires. Vos données ne sont utilisées que pour répondre à votre demande.</p>
        </form>
      </div>
    </div>
  </div>
</section>`;
}
