import { faqBlock, contactBand, partnersCarousel, beyondBand, photoStrip } from './partials/blocks/index.mjs';
import { icon } from './partials/icons.mjs';
import { site } from './partials/site-data.mjs';

const faq = faqBlock([
  {
    q: 'Intervenez-vous en urgence sur une panne électrique industrielle ?',
    a: 'Oui. Notre service de dépannage est disponible 24h/24 et 7j/7 pour les pannes électriques et les automatismes industriels. Un appel suffit pour déclencher une intervention rapide.',
  },
  {
    q: "Sur quel secteur intervenez-vous pour le matériel d'élevage ?",
    a: "Nous fournissons, installons et dépannons le matériel d'élevage (aviculture, porcin, bovin, FAF et stockage) dans le Finistère et les communes limitrophes, avec un dépannage disponible 24h/24 et 7j/7.",
  },
  {
    q: 'Concevez-vous des armoires électriques sur-mesure ?',
    a: "Oui. Chaque armoire est conçue avec un bureau d'étude indépendant, puis assemblée par nos équipes selon les contraintes précises de votre projet industriel ou agricole.",
  },
  {
    q: "Proposez-vous la vente et l'installation de systèmes de ventilation ?",
    a: "Oui. Nous vendons, installons et entretenons la ventilation des bâtiments d'élevage : turbines, extracteurs, trappes, brasseurs d'air pour stabulations bovines, avec la régulation et l'automatisme associés.",
  },
  {
    q: "Équipez-vous les fabriques d'aliment à la ferme (FAF) ?",
    a: "Oui. Nous installons la chaîne complète : broyeurs, mélangeurs, vis de transfert, silos de stockage, ainsi que l'armoire électrique et l'automatisme qui pilotent l'installation.",
  },
]);

export const meta = {
  title: 'LE SOMMER · Électricité industrielle & matériel d’élevage · Finistère',
  description: "LE SOMMER, Ergué-Gabéric (29) : électricité industrielle, ventilation, alimentation, abreuvement, FAF, éclairage, plomberie et traitement des eaux. SAV et dépannage 24h/24, 7j/7 dans le Finistère.",
  path: '/',
  navActive: '/',
  jsonLd: [faq.jsonLd],
  preloads: [
    // Deux préchargements ciblés par media : le navigateur n'en télécharge qu'un seul.
    '<link rel="preload" as="image" media="(max-width: 767px)" imagesrcset="/assets/img/hero-home-mobile-480.avif 480w, /assets/img/hero-home-mobile-720.avif 720w, /assets/img/hero-home-mobile-960.avif 960w" imagesizes="100vw" type="image/avif" fetchpriority="high" />',
    '<link rel="preload" as="image" media="(min-width: 768px)" imagesrcset="/assets/img/hero-home-1024.avif 1024w, /assets/img/hero-home-1440.avif 1440w, /assets/img/hero-home-1920.avif 1920w" imagesizes="100vw" type="image/avif" fetchpriority="high" />',
  ],
};

export function content() {
  return `
<section class="hero">
  <div class="hero__bg">
    <picture>
      <source media="(max-width: 767px)" type="image/avif" srcset="/assets/img/hero-home-mobile-480.avif 480w, /assets/img/hero-home-mobile-720.avif 720w, /assets/img/hero-home-mobile-960.avif 960w" sizes="100vw" />
      <source media="(max-width: 767px)" type="image/webp" srcset="/assets/img/hero-home-mobile-480.webp 480w, /assets/img/hero-home-mobile-720.webp 720w, /assets/img/hero-home-mobile-960.webp 960w" sizes="100vw" />
      <source media="(max-width: 767px)" srcset="/assets/img/hero-home-mobile-480.jpg 480w, /assets/img/hero-home-mobile-720.jpg 720w, /assets/img/hero-home-mobile-960.jpg 960w" sizes="100vw" />
      <source type="image/avif" srcset="/assets/img/hero-home-1024.avif 1024w, /assets/img/hero-home-1440.avif 1440w, /assets/img/hero-home-1920.avif 1920w" sizes="100vw" />
      <source type="image/webp" srcset="/assets/img/hero-home-1024.webp 1024w, /assets/img/hero-home-1440.webp 1440w, /assets/img/hero-home-1920.webp 1920w" sizes="100vw" />
      <img src="/assets/img/hero-home-1440.jpg" alt="Réalisations LE SOMMER : armoires électriques, ventilation de bâtiments, silos et volières équipées" width="1613" height="975" fetchpriority="high" decoding="async" />
    </picture>
  </div>
  <div class="container">
   <div class="hero__inner">
    <p class="eyebrow hero__eyebrow">Finistère</p>
    <h1 class="hero__title">LE SOMMER</h1>
    <p class="hero__tagline">Électricité, ventilation, alimentation, FAF, plomberie : nous équipons et dépannons vos bâtiments industriels et d'élevage.</p>
    <div class="hero__emergency">
      <span class="hero__emergency-dot"></span>
      <strong>Dépannage 24h/24, 7j/7</strong>
    </div>
    <div class="hero__actions">
      <a class="btn btn--primary" href="/contact/">Demander un devis ${icon('arrowRight')}</a>
      <a class="btn btn--secondary" href="${site.phoneHref}">${icon('phone')} ${site.phoneDisplay}</a>
    </div>
   </div>
  </div>
</section>

<section class="emergency-band section--tight">
  <div class="container emergency-band__inner">
    <div class="emergency-band__text">
      <span class="emergency-band__icon">${icon('clock')}</span>
      <div>
        <h2>Une panne ne prévient jamais.</h2>
        <p>Électricité, ventilation, alimentation, abreuvement, automatisme : notre SAV couvre l'ensemble de nos services, 24h/24 et 7j/7 dans le Finistère et les communes limitrophes.</p>
      </div>
    </div>
    <a class="emergency-band__phone" href="${site.phoneHref}">${icon('phone')} ${site.phoneDisplay}</a>
  </div>
</section>

<section class="section--tight" aria-labelledby="metiers-title">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Nos deux métiers</p>
      <h2 id="metiers-title">Un savoir-faire double, une seule entreprise</h2>
    </div>
    <div class="poles-grid">
      <article class="pole-card js-anim" data-reveal>
        <span class="card__icon">${icon('panel')}</span>
        <h3 class="card__title">Électricité industrielle</h3>
        <p class="card__text">Armoires sur-mesure, raccordement d'automatismes, éclairage et dépannage de vos installations.</p>
        <ul class="pole-card__list">
          <li><a href="/electricite-industrielle/#armoires">Armoires électriques sur-mesure</a></li>
          <li><a href="/electricite-industrielle/#raccordement">Raccordement</a></li>
          <li><a href="/electricite-industrielle/#eclairage">Éclairage</a></li>
          <li><a href="/electricite-industrielle/#depannage">Dépannage &amp; SAV 24h/24</a></li>
        </ul>
        <a class="btn btn--secondary btn--sm" href="/electricite-industrielle/">Découvrir le pôle électricité ${icon('arrowRight', 'icon')}</a>
      </article>
      <article class="pole-card js-anim" data-reveal>
        <span class="card__icon">${icon('silo')}</span>
        <h3 class="card__title">Matériel d'élevage</h3>
        <p class="card__text">Ventilation, alimentation, abreuvement, chauffage, FAF et stockage : vente, installation et dépannage.</p>
        <ul class="pole-card__list">
          <li><a href="/materiel-elevage/#aviculture">Aviculture</a></li>
          <li><a href="/materiel-elevage/#porcin">Porcin</a></li>
          <li><a href="/materiel-elevage/#bovin">Bovin</a></li>
          <li><a href="/materiel-elevage/#ventilation">Ventilation</a></li>
          <li><a href="/materiel-elevage/#faf-stockage">FAF &amp; stockage</a></li>
        </ul>
        <a class="btn btn--secondary btn--sm" href="/materiel-elevage/">Découvrir le pôle élevage ${icon('arrowRight', 'icon')}</a>
      </article>
    </div>
  </div>
</section>

<section class="section--tight" aria-labelledby="para-agricole">
  <div class="container">
    ${beyondBand({
      text: "Au-delà de nos deux métiers, nous réalisons les travaux para-agricoles qui accompagnent votre exploitation, selon votre projet.",
    })}
  </div>
</section>

<section class="section--alt" aria-labelledby="partners-title">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Nos partenaires fabricants</p>
      <h2 id="partners-title">Des marques reconnues</h2>
      <p>Nous installons le matériel de fabricants spécialisés.</p>
    </div>
    ${partnersCarousel()}
  </div>
</section>

<section class="section--tight" aria-labelledby="realisations-accueil">
  <div class="container">
    <h2 id="realisations-accueil" class="visually-hidden">Nos réalisations</h2>
    ${photoStrip(['armoire-montage', 'poulailler-equipe', 'bovin-brasseur-air', 'silo-levage'], {
      eyebrow: 'Sur le terrain',
      title: 'Nos réalisations',
      text: "Armoires montées en atelier, bâtiments équipés, ventilation, silos : quelques chantiers menés par nos équipes dans le Finistère.",
      link: { href: '/materiel-elevage/', label: 'Voir toutes nos réalisations' },
    })}
  </div>
</section>

<section aria-labelledby="reassurance-title">
  <div class="container">
    <h2 id="reassurance-title" class="visually-hidden">Nos engagements</h2>
    <ul class="trust-bar js-anim" data-reveal>
      <li class="trust-bar__item">${icon('check')}<span><strong>Conseil &amp; étude de projet</strong> avant chaque intervention.</span></li>
      <li class="trust-bar__item">${icon('check')}<span><strong>Techniciens spécialisés</strong> en électricité, automatisme et matériel d'élevage.</span></li>
      <li class="trust-bar__item">${icon('check')}<span><strong>SAV 24h/24, 7j/7</strong> sur l'ensemble de nos services.</span></li>
    </ul>
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

<section class="section-contact" aria-labelledby="contact-title">
  <div class="container">
    ${contactBand({ withMap: true })}
  </div>
</section>
`;
}
