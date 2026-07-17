import { icon } from './icons.mjs';
import { site } from './site-data.mjs';

// Footer volontairement épuré : il ne recopie plus le menu du header (redondant).
// Il ne garde que l'essentiel : identité + coordonnées + réseaux sociaux + liens légaux.
export function footer() {
  return `<footer class="site-footer">
  <div class="container site-footer__main">
    <div class="site-footer__brand">
      <span class="site-footer__logo">
        <picture>
          <source srcset="/assets/brand/logo-footer.webp" type="image/webp" />
          <img src="/assets/brand/logo-footer.png" alt="LE SOMMER, électricité industrielle et matériel d'élevage" width="1470" height="1058" loading="lazy" />
        </picture>
      </span>
      <p class="site-footer__tagline">Dépannage électricité industrielle et installation de matériel d'élevage dans le Finistère et en Bretagne.</p>
      <div class="site-footer__social">
        <a href="${site.sameAs[0]}" target="_blank" rel="noopener noreferrer" aria-label="LE SOMMER sur Facebook">${icon('facebook', 'icon')}</a>
        <a href="${site.sameAs[1]}" target="_blank" rel="noopener noreferrer" aria-label="LE SOMMER sur LinkedIn">${icon('linkedin', 'icon')}</a>
      </div>
    </div>

    <div class="site-footer__contact">
      <h3>Nous contacter</h3>
      <ul>
        <li>
          <a href="${site.phoneHref}">${icon('phone', 'icon')}<span><strong>${site.phoneDisplay}</strong><br />Dépannage 24h/24, 7j/7</span></a>
        </li>
        <li>
          <a href="mailto:${site.email}">${icon('mail', 'icon')}<span>${site.email}</span></a>
        </li>
        <li>
          <a href="${site.mapUrl}" target="_blank" rel="noopener noreferrer">${icon('pin', 'icon')}<span>${site.address.street}<br />${site.address.postalCode} ${site.address.locality}</span></a>
        </li>
      </ul>
    </div>
  </div>

  <div class="container site-footer__bottom">
    <p>© ${new Date().getFullYear()} LE SOMMER. Tous droits réservés.</p>
    <ul>
      <li><a href="/mentions-legales/">Mentions légales</a></li>
      <li><a href="/politique-confidentialite/">Politique de confidentialité</a></li>
      <li class="site-footer__credit">Site réalisé par <a href="https://capweb.pro" target="_blank" rel="noopener noreferrer">CapWeb</a></li>
    </ul>
  </div>
</footer>`;
}
