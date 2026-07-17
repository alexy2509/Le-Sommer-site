// Accordéon FAQ accessible (aria-expanded + hauteur animée en CSS).

export function initFaq() {
  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const btn = item.querySelector('.faq-item__q');
    btn?.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';
      item.dataset.open = isOpen ? 'false' : 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}
