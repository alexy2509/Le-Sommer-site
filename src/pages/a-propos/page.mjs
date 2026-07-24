import { icon } from '../partials/icons.mjs';
import { contactBand } from '../partials/blocks/index.mjs';

export const meta = {
  title: 'Qui sommes-nous ? | LE SOMMER, Ergué-Gabéric (29)',
  description: "LE SOMMER, dirigée par Vivien Le Sommer à Ergué-Gabéric : électricité industrielle, matériel d'élevage, ventilation, FAF et services para-agricoles, du conseil au SAV 24h/24.",
  path: '/a-propos/',
};

export function content() {
  return `
<section class="section--tight">
  <div class="container">
    <div class="about-hero">
      <div class="about-hero__text js-anim" data-reveal>
        <p class="eyebrow">L'entreprise</p>
        <h1>Qui sommes-nous ?</h1>
        <p class="about-hero__lead">Le mot de Vivien Le Sommer, gérant.</p>

        <div class="founder-note">
          <p>Vous êtes éleveur, industriel, ou vous préparez un projet de bâtiment : bienvenue.</p>
          <p>J'ai fondé LE SOMMER à Ergué-Gabéric avec une conviction simple : nos clients méritent un interlocuteur qui connaît vraiment le terrain, qui répond quand quelque chose ne va pas, et qui s'engage sur ce qu'il installe. Une panne de ventilation ou d'alimentation ne choisit pas son heure ; c'est pour cela que nous restons joignables 24h/24, 7j/7, et que nous dépannons tout ce que nous mettons en place.</p>
          <p>Aujourd'hui, nous sommes une équipe de quatre. Assez petits pour que vous parliez toujours à quelqu'un qui connaît votre installation, assez équipés pour mener vos projets de bout en bout : électricité, ventilation, alimentation, fabrique d'aliment à la ferme, plomberie. Chaque chantier présenté sur ce site, nous qui l'avons réalisé.</p>
          <p>Merci de votre confiance.</p>
          <p class="founder-note__signature"><strong>Vivien Le Sommer</strong><span>Gérant, LE SOMMER</span></p>
        </div>
      </div>
      <figure class="about-hero__media js-anim" data-reveal>
        <picture>
          <source type="image/avif" srcset="/assets/img/team-480.avif 480w, /assets/img/team-768.avif 768w" sizes="(min-width: 1024px) 420px, 90vw" />
          <source type="image/webp" srcset="/assets/img/team-480.webp 480w, /assets/img/team-768.webp 768w" sizes="(min-width: 1024px) 420px, 90vw" />
          <img src="/assets/img/team-480.jpg" alt="Camion LE SOMMER sur un chantier de levage de silo" width="480" height="640" loading="lazy" decoding="async" />
        </picture>
      </figure>
    </div>
  </div>
</section>

<section class="section--tight section--alt" aria-labelledby="methode">
  <div class="container">
    <div class="section-head section-head--center"><h2 id="methode">Notre méthode, du projet au SAV</h2></div>
    <ol class="method-steps">
      <li class="js-anim" data-reveal><strong>Fourniture</strong><p class="card__text">Matériel électrique ou d'élevage préparé en amont, issu de fabricants reconnus.</p></li>
      <li class="js-anim" data-reveal><strong>Installation</strong><p class="card__text">Assemblage, raccordement et mise en service par nos équipes.</p></li>
      <li class="js-anim" data-reveal><strong>SAV 24h/24 et 7j/7</strong><p class="card__text">Assistance et dépannage par des techniciens spécialisés.</p></li>
    </ol>
    <p class="method-steps__more"><a class="card__link" href="/recrutement/">L'équipe grandit : découvrir nos offres d'emploi ${icon('arrowRight', 'icon')}</a></p>
  </div>
</section>

<section class="section-contact">
  <div class="container">${contactBand()}</div>
</section>`;
}
