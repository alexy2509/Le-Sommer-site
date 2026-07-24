// Icônes SVG inline (originales, tracés géométriques simples — style schéma technique).
// Aucune police d'icônes, aucun CDN : conforme CSP script-src/style-src 'self'.

const wrap = (inner, viewBox = '0 0 24 24') =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

export const icons = {
  phone: wrap('<path d="M5 4h3.2l1.6 4.4-2 1.6a12 12 0 0 0 6.2 6.2l1.6-2 4.4 1.6V19a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z"/>'),
  mail: wrap('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'),
  pin: wrap('<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>'),
  clock: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
  chevronDown: wrap('<path d="m6 9 6 6 6-6"/>'),
  chevronRight: wrap('<path d="m9 6 6 6-6 6"/>'),
  chevronLeft: wrap('<path d="m15 6-6 6 6 6"/>'),
  menu: wrap('<path d="M4 6h16M4 12h16M4 18h16"/>'),
  close: wrap('<path d="m6 6 12 12M18 6 6 18"/>'),
  check: wrap('<path d="m5 13 4 4 10-10"/>'),
  arrowRight: wrap('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  facebook: wrap('<path d="M15 8.5h2V5.3h-2.3C12.4 5.3 11 6.8 11 9.1V11H9v3h2v6h3v-6h2.2l.5-3H14V9.3c0-.5.3-.8.8-.8Z" fill="currentColor" stroke="none"/>'),
  linkedin: wrap('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v6.5M7.5 7.2v.1M11.5 16.5V13c0-1.4 1-2.3 2.2-2.3s2 .8 2 2.3v3.5" stroke-linecap="round"/>'),
  bolt: wrap('<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" stroke="none"/>'),
  panel: wrap('<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 8h3M8 12h8M8 16h5" /><circle cx="16.5" cy="8" r="1"/>'),
  wrench: wrap('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.7 2.7-2-2 2.7-2.7Z"/>'),
  silo: wrap('<path d="M8 21V9a4 4 0 0 1 8 0v12"/><path d="M8 21h8M8 12h8" /><path d="M12 3v2"/>'),
  briefcase: wrap('<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>'),
  euro: wrap('<path d="M17 6.5a6 6 0 1 0 0 11" /><path d="M6 10h9M6 14h7"/>'),
  car: wrap('<path d="M4 16V12l2-4h12l2 4v4"/><path d="M4 16h16M7 16v2M17 16v2"/><circle cx="7.5" cy="16" r="1.2" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="1.2" fill="currentColor" stroke="none"/>'),
  maximize: wrap('<path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"/>'),
  droplet: wrap('<path d="M12 3.5c3.2 3.4 5.5 6.2 5.5 9a5.5 5.5 0 0 1-11 0c0-2.8 2.3-5.6 5.5-9Z"/><path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5"/>'),
  filter: wrap('<path d="M4 5h16l-6 7v6l-4 2v-8L4 5Z"/>'),
};

export function icon(name, extraClass = 'icon') {
  const svg = icons[name];
  if (!svg) throw new Error(`Icône inconnue: ${name}`);
  return svg.replace('<svg ', `<svg class="${extraClass}" `);
}
