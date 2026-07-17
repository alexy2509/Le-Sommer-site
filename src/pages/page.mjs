import { faqBlock, ctaBand, partnersGrid } from './partials/blocks.mjs';
import { icon } from './partials/icons.mjs';
import { site } from './partials/site-data.mjs';

const faq = faqBlock([
  {
    q: 'Intervenez-vous en urgence sur une panne électrique industrielle ?',
    a: 'Oui. Notre service de dépannage est disponible 24h/24 et 7j/7 pour les pannes électriques et les automatismes industriels. Un appel suffit pour déclencher une intervention rapide.',
  },
  {
    q: "Sur quel secteur intervenez-vous pour le matériel d'élevage ?",
    a: "Nous fournissons, installons et dépannons le matériel d'élevage (aviculture, porcin, bovin, FAF et stockage) dans le Finistère et en Bretagne.",
  },
  {
    q: 'Concevez-vous des armoires électriques sur-mesure ?',
    a: "Oui. Chaque armoire est conçue avec un bureau d'étude indépendant, puis assemblée par nos équipes selon les contraintes précises de votre projet industriel ou agricole.",
  },
]);

export const meta = {
  title: 'LE SOMMER · Électricité industrielle & matériel d’élevage · Finistère',
  description: "LE SOMMER, électricien industriel à Ergué-Gabéric (29) : armoires sur-mesure, raccordement, dépannage 24h/24 et matériel d'élevage (Landmeco, Skiold, CBM) en Finistère et Bretagne.",
  path: '/',
  navActive: '/',
  breadcrumb: null,
  jsonLd: [faq.jsonLd],
  preloads: [
    '<link rel="preload" as="image" imagesrcset="/assets/img/hero-stand-768.avif 768w, /assets/img/hero-stand-1280.avif 1280w, /assets/img/hero-stand-1920.avif 1920w" imagesizes="100vw" type="image/avif" fetchpriority="high" />',
  ],
};

export function content() {
  return `
<section class="hero">
  <div class="hero__bg">
    <picture>
      <source
        type="image/avif"
        srcset="/assets/img/hero-stand-768.avif 768w, /assets/img/hero-stand-1280.avif 1280w, /assets/img/hero-stand-1920.avif 1920w"
        sizes="100vw" />
      <source
        type="image/webp"
        srcset="/assets/img/hero-stand-768.webp 768w, /assets/img/hero-stand-1280.webp 1280w, /assets/img/hero-stand-1920.webp 1920w"
        sizes="100vw" />
      <img src="/assets/img/hero-stand-1280.jpg" alt="Stand LE SOMMER, matériel d'élevage et solutions Landmeco et Skiold" width="1280" height="1016" fetchpriority="high" decoding="async" />
    </picture>
  </div>
  <div class="container hero__inner">
    <p class="eyebrow hero__eyebrow">Finistère</p>
    <h1 class="hero__title">LE SOMMER</h1>
    <p class="hero__tagline">Dépannage électricité industrielle &amp; installation de matériel d'élevage.</p>
    <div class="hero__emergency">
      <span class="hero__emergency-dot"></span>
      <strong>Dépannage 24h/24, 7j/7</strong>
    </div>
    <div class="hero__actions">
      <a class="btn btn--primary" href="/contact/">Demander un devis ${icon('arrowRight')}</a>
      <a class="btn btn--secondary" href="${site.phoneHref}">${icon('phone')} ${site.phoneDisplay}</a>
    </div>
  </div>
</section>

<section class="emergency-band section--tight">
  <div class="container emergency-band__inner">
    <div class="emergency-band__text">
      <span class="emergency-band__icon">${icon('clock')}</span>
      <div>
        <h2>Une panne ne prévient jamais.</h2>
        <p>Dépannage électrique disponible 24h/24 et 7j/7 dans le Finistère sud.</p>
      </div>
    </div>
    <a class="emergency-band__phone" href="${site.phoneHref}">${icon('phone')} ${site.phoneDisplay}</a>
  </div>
</section>

<section aria-labelledby="metiers-title">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Nos deux métiers</p>
      <h2 id="metiers-title">Un savoir-faire double, une seule entreprise</h2>
    </div>
    <div class="poles-grid">
      <article class="pole-card js-anim" data-reveal>
        <span class="card__icon">${icon('panel')}</span>
        <h3 class="card__title">Électricité industrielle</h3>
        <p class="card__text">Armoires sur-mesure, raccordement d'automatismes et dépannage pour vos installations.</p>
        <ul class="pole-card__list">
          <li><a href="/electricite-industrielle/#armoires">Armoires électriques sur-mesure</a></li>
          <li><a href="/electricite-industrielle/#raccordement">Raccordement</a></li>
          <li><a href="/electricite-industrielle/#depannage">Dépannage électrique &amp; SAV</a></li>
        </ul>
        <a class="btn btn--secondary btn--sm" href="/electricite-industrielle/">Découvrir le pôle électricité ${icon('arrowRight', 'icon')}</a>
      </article>
      <article class="pole-card js-anim" data-reveal>
        <span class="card__icon">${icon('silo')}</span>
        <h3 class="card__title">Matériel d'élevage</h3>
        <p class="card__text">Aviculture, porcin, bovin, FAF et stockage : fourniture, installation et dépannage.</p>
        <ul class="pole-card__list">
          <li><a href="/materiel-elevage/#aviculture">Aviculture</a></li>
          <li><a href="/materiel-elevage/#porcin">Porcin</a></li>
          <li><a href="/materiel-elevage/#bovin">Bovin</a></li>
          <li><a href="/materiel-elevage/#faf-stockage">FAF &amp; stockage</a></li>
        </ul>
        <a class="btn btn--secondary btn--sm" href="/materiel-elevage/">Découvrir le pôle élevage ${icon('arrowRight', 'icon')}</a>
      </article>
    </div>
  </div>
</section>

<section class="section--alt" aria-labelledby="partners-title">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Nos partenaires fabricants</p>
      <h2 id="partners-title">Des marques reconnues</h2>
      <p>Nous installons le matériel de fabricants spécialisés. Cliquez sur un logo pour visiter leur site.</p>
    </div>
    ${partnersGrid()}
  </div>
</section>

<section aria-labelledby="reassurance-title">
  <div class="container">
    <h2 id="reassurance-title" class="visually-hidden">Nos engagements</h2>
    <ul class="trust-bar js-anim" data-reveal>
      <li class="trust-bar__item">${icon('check')}<span><strong>Conseil &amp; étude de projet</strong> avant chaque intervention.</span></li>
      <li class="trust-bar__item">${icon('check')}<span><strong>Techniciens spécialisés</strong> en électricité.</span></li>
      <li class="trust-bar__item">${icon('check')}<span><strong>Dépannage réactif</strong> 24h/24 et 7j/7 sur vos installations.</span></li>
    </ul>
  </div>
</section>

<section class="section--alt" aria-labelledby="zone-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Zone d'intervention</p>
      <h2 id="zone-title">Le Finistère et toute la Bretagne</h2>
      <p>Basés à Ergué-Gabéric, aux portes de Quimper, nous intervenons dans tout le Finistère et en Bretagne pour l'électricité industrielle comme pour le matériel d'élevage.</p>
      <a class="card__link" href="/zone-intervention/">Voir notre zone d'intervention ${icon('arrowRight')}</a>
    </div>
  </div>
</section>

<section aria-labelledby="faq-title">
  <div class="container container--narrow">
    <div class="section-head section-head--center">
      <h2 id="faq-title">Questions fréquentes</h2>
    </div>
    ${faq.html}
  </div>
</section>

<section class="section--tight" aria-labelledby="recrutement-title">
  <div class="container">
    <div class="recruit-band js-anim" data-reveal>
      <div class="recruit-band__body">
        <span class="badge badge--recruit">${icon('briefcase', 'icon')} Nous recrutons</span>
        <h2 id="recrutement-title">Technicien Monteur Dépanneur H/F, CDI</h2>
        <p>Entreprise en développement : rejoignez une équipe à taille humaine. Véhicule de fonction, travail en journée, opportunités d'évolution.</p>
        <ul class="recruit-band__meta">
          <li>${icon('check', 'icon')} CDI temps plein</li>
          <li>${icon('check', 'icon')} Véhicule de fonction</li>
          <li>${icon('check', 'icon')} À partir de 13 €/h</li>
        </ul>
      </div>
      <a class="btn btn--primary" href="/recrutement/">Voir l'offre &amp; postuler ${icon('arrowRight')}</a>
    </div>
  </div>
</section>

<section>
  <div class="container">
    ${ctaBand()}
  </div>
</section>
`;
}
