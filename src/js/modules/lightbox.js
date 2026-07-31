// Visionneuse plein écran des photos de réalisations.
//
// Le conteneur `[data-gallery]` porte la liste des photos en JSON (généré au build) : la
// grille n'affiche que les meilleures, la visionneuse permet de parcourir TOUTES les photos
// de la section. Ouverture au clic sur une vignette ou sur le bouton « voir toutes les photos ».
//
// Aucun `innerHTML` avec des données variables : tout le DOM est construit via createElement
// et textContent (conforme à la CSP stricte du projet, cf. CLAUDE.md 12.2).

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function el(tag, className, parent) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (parent) parent.appendChild(node);
  return node;
}

function buildViewer() {
  const root = el('div', 'lightbox');
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Photos de nos réalisations');
  root.hidden = true;

  const backdrop = el('div', 'lightbox__backdrop', root);

  const close = el('button', 'lightbox__close', root);
  close.type = 'button';
  close.setAttribute('aria-label', 'Fermer');
  close.textContent = '✕';

  const prev = el('button', 'lightbox__nav lightbox__nav--prev', root);
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Photo précédente');
  prev.textContent = '‹';

  const next = el('button', 'lightbox__nav lightbox__nav--next', root);
  next.type = 'button';
  next.setAttribute('aria-label', 'Photo suivante');
  next.textContent = '›';

  const figure = el('figure', 'lightbox__figure', root);
  const picture = el('picture', 'lightbox__picture', figure);
  const srcAvif = el('source', null, picture);
  srcAvif.type = 'image/avif';
  const srcWebp = el('source', null, picture);
  srcWebp.type = 'image/webp';
  const img = el('img', 'lightbox__img', picture);
  img.decoding = 'async';

  const caption = el('figcaption', 'lightbox__caption', figure);
  const counter = el('p', 'lightbox__counter', caption);
  counter.setAttribute('aria-live', 'polite');
  const credit = el('p', 'lightbox__credit', caption);

  document.body.appendChild(root);
  return { root, backdrop, close, prev, next, srcAvif, srcWebp, img, counter, credit };
}

export function initLightbox() {
  const galleries = [...document.querySelectorAll('[data-gallery]')];
  if (!galleries.length) return;

  let ui = null;
  let photos = [];
  let index = 0;
  let credit = '';
  let lastFocus = null;

  function show(i) {
    index = (i + photos.length) % photos.length;
    const p = photos[index];
    ui.srcAvif.srcset = `${p.base}-full.avif`;
    ui.srcWebp.srcset = `${p.base}-full.webp`;
    ui.img.src = `${p.base}-full.jpg`;
    ui.img.alt = p.alt;
    ui.counter.textContent = `${index + 1} / ${photos.length}`;
    ui.credit.textContent = credit;
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'Tab') {
      // Piège de focus : la tabulation tourne dans la visionneuse.
      const items = [...ui.root.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function close() {
    ui.root.hidden = true;
    document.body.classList.remove('has-lightbox');
    document.removeEventListener('keydown', onKey);
    if (lastFocus) lastFocus.focus();
  }

  function open(list, start, creditText) {
    if (!ui) {
      ui = buildViewer();
      ui.close.addEventListener('click', close);
      ui.backdrop.addEventListener('click', close);
      ui.prev.addEventListener('click', () => show(index - 1));
      ui.next.addEventListener('click', () => show(index + 1));
    }
    photos = list;
    credit = creditText;
    lastFocus = document.activeElement;
    show(start);
    ui.root.hidden = false;
    document.body.classList.add('has-lightbox');
    document.addEventListener('keydown', onKey);
    ui.close.focus();
  }

  for (const gallery of galleries) {
    let list;
    try {
      list = JSON.parse(gallery.dataset.gallery);
    } catch {
      continue;
    }
    if (!Array.isArray(list) || !list.length) continue;
    const creditText = gallery.dataset.credit ?? '';

    gallery.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-photo-index]');
      if (!trigger || !gallery.contains(trigger)) return;
      e.preventDefault();
      open(list, Number(trigger.dataset.photoIndex) || 0, creditText);
    });
  }
}
