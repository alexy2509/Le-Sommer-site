import { icon } from '../partials/icons.mjs';
import { site } from '../partials/site-data.mjs';

export const meta = {
  title: 'Contact | LE SOMMER, Ergué-Gabéric (29)',
  description: "Contactez LE SOMMER à Ergué-Gabéric (29) : devis ou dépannage en électricité, ventilation, alimentation, FAF, plomberie et traitement des eaux. SAV 24h/24, 7j/7.",
  path: '/contact/',
};

export function content() {
  return `
<section class="section--tight contact-lead">
  <div class="container container--narrow">
    <p class="eyebrow">Contact</p>
    <h1>Parlons de votre projet ou de votre dépannage</h1>
    <p style="font-size:var(--fs-body-lg)">Un devis, une panne, une question sur du matériel ? Appelez-nous directement : c'est le plus rapide, et vous parlez tout de suite à quelqu'un qui connaît le terrain.</p>
  </div>
</section>

<section class="section--tight contact-body">
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
        <div class="contact-info__card">
          <span class="contact-info__icon">${icon('pin', 'icon')}</span>
          <span>
            <span class="contact-info__label">Adresse</span>
            <span class="contact-info__value">${site.address.street}<br />${site.address.postalCode} ${site.address.locality}</span>
          </span>
        </div>
      </div>

      <div class="contact-direct js-anim" data-reveal>
        <p class="eyebrow">Le plus efficace</p>
        <h2>Appelez-nous</h2>
        <p>Pour un devis comme pour une panne, le téléphone reste le moyen le plus rapide d'obtenir une réponse. Notre service de dépannage répond <strong>24h/24 et 7j/7</strong>.</p>
        <a class="btn btn--primary btn--lg" href="${site.phoneHref}">${icon('phone', 'icon')} ${site.phoneDisplay}</a>
        <p class="contact-direct__alt">Vous préférez écrire ? <a href="mailto:${site.email}">${site.email}</a><br />
        Décrivez votre besoin (type d'installation, matériel, délais) et nous vous rappelons.</p>
        <p class="contact-direct__note">${icon('pin', 'icon')} <span>Nous intervenons dans le Finistère et les communes limitrophes.</span></p>
      </div>
    </div>
  </div>
</section>`;
}
