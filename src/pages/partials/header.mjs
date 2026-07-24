import { icon } from './icons.mjs';
import { nav, site } from './site-data.mjs';
import { escapeHtml } from './escape.mjs';

function isActive(path, current) {
  if (path === '/') return current === '/';
  return current === path || current.startsWith(path);
}

export function header(current) {
  // Nav plate, sans menu déroulant : chaque silo est un lien direct vers sa page hub.
  const topLinks = [nav.electricite, nav.elevage, ...nav.simple];
  const desktopLinks = topLinks
    .map((item) => `<li><a href="${item.path}" ${isActive(item.path, current) ? 'aria-current="page"' : ''}>${escapeHtml(item.label)}</a></li>`)
    .join('');

  const mobileLinks = [{ label: 'Accueil', path: '/' }, ...topLinks]
    .map(
      (item) =>
        `<li><a href="${item.path}" ${isActive(item.path, current) ? 'aria-current="page"' : ''}><span>${escapeHtml(item.label)}</span>${icon('chevronRight', 'icon')}</a></li>`,
    )
    .join('');

  return `<a class="skip-link" href="#contenu">Aller au contenu</a>
<header class="site-header" data-site-header>
  <div class="container site-header__bar">
    <a href="/" class="site-header__logo" aria-label="LE SOMMER, accueil">
      <picture>
        <source srcset="/assets/brand/logo-header.avif" type="image/avif" />
        <source srcset="/assets/brand/logo-header.webp" type="image/webp" />
        <img src="/assets/brand/logo-header.png" alt="LE SOMMER, électricité industrielle et matériel d'élevage" width="640" height="462" />
      </picture>
    </a>

    <nav class="main-nav" aria-label="Navigation principale">
      <ul>${desktopLinks}</ul>
    </nav>

    <div class="site-header__actions">
      <a class="site-header__phone" href="${site.phoneHref}" aria-label="Appeler LE SOMMER au ${site.phoneDisplay}">
        <span class="site-header__phone-icon">${icon('phone', 'icon')}</span>
        <span class="site-header__phone-text">
          <span class="site-header__phone-label">Dépannage 24h/24, 7j/7</span>
          <span class="site-header__phone-number">${site.phoneDisplay}</span>
        </span>
      </a>
      <a class="btn btn--primary btn--sm hide-mobile" href="/contact/">Demander un devis</a>
      <button type="button" class="burger" data-mobile-nav-open aria-haspopup="dialog" aria-controls="mobile-nav" aria-expanded="false">
        <span class="visually-hidden">Ouvrir le menu</span>
        ${icon('menu', 'icon')}
      </button>
    </div>
  </div>
</header>

<div class="mobile-nav" id="mobile-nav" data-mobile-nav role="dialog" aria-modal="true" aria-label="Menu de navigation">
  <div class="mobile-nav__head">
    <a href="/" class="mobile-nav__logo" aria-label="LE SOMMER, accueil">
      <picture>
        <source srcset="/assets/brand/logo-header.webp" type="image/webp" />
        <img src="/assets/brand/logo-header.png" alt="LE SOMMER" width="640" height="462" />
      </picture>
    </a>
    <button type="button" data-mobile-nav-close aria-label="Fermer le menu" class="mobile-nav__close">${icon('close', 'icon')}</button>
  </div>

  <nav class="mobile-nav__scroll" aria-label="Navigation">
    <ul class="mobile-nav__list">
      ${mobileLinks}
    </ul>
  </nav>

  <div class="mobile-nav__foot">
    <p class="mobile-nav__foot-eyebrow">Une panne ? Un projet ?</p>
    <a class="mobile-nav__phone" href="${site.phoneHref}">
      <span class="mobile-nav__phone-icon">${icon('phone', 'icon')}</span>
      <span class="mobile-nav__phone-text">
        <span class="mobile-nav__phone-number">${site.phoneDisplay}</span>
        <span class="mobile-nav__phone-sub">Dépannage 24h/24, 7j/7</span>
      </span>
    </a>
    <a class="btn btn--primary btn--block" href="/contact/">Demander un devis ${icon('arrowRight', 'icon')}</a>
    <div class="mobile-nav__social">
      <a href="${site.sameAs[0]}" target="_blank" rel="noopener noreferrer" aria-label="LE SOMMER sur Facebook">${icon('facebook', 'icon')}</a>
      <a href="${site.sameAs[1]}" target="_blank" rel="noopener noreferrer" aria-label="LE SOMMER sur LinkedIn">${icon('linkedin', 'icon')}</a>
    </div>
  </div>
</div>`;
}
