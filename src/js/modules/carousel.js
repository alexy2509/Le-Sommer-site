// Carrousel photo compact et accessible : navigation MANUELLE uniquement (boutons préc./suiv.,
// pastilles, flèches clavier). Pas de défilement automatique. La légende sous l'image est
// mise à jour depuis le slide actif.

export function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('[data-carousel-track]');
    const slides = Array.from(root.querySelectorAll('.carousel__slide'));
    const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const capTitle = root.querySelector('.carousel__caption-title');
    const capText = root.querySelector('.carousel__caption-text');
    if (!track || slides.length === 0) return;

    let index = 0;

    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((s, i) => s.setAttribute('aria-hidden', String(i !== index)));
      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === index);
        d.setAttribute('aria-selected', String(i === index));
      });
      const active = slides[index];
      if (capTitle) capTitle.textContent = active.dataset.title || '';
      if (capText) capText.textContent = active.dataset.text || '';
    };

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      render();
    };

    prevBtn?.addEventListener('click', () => goTo(index - 1));
    nextBtn?.addEventListener('click', () => goTo(index + 1));
    dots.forEach((d) => d.addEventListener('click', () => goTo(Number(d.dataset.index))));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      else if (e.key === 'ArrowRight') goTo(index + 1);
    });

    render();
  });
}
