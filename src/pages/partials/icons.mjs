// Icônes SVG inline (originales, tracés géométriques simples — style schéma technique).
// Aucune police d'icônes, aucun CDN : conforme CSP script-src/style-src 'self'.

const wrap = (inner, viewBox = '0 0 24 24') =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

export const icons = {
  phone: wrap('<path d="M5 4h3.2l1.6 4.4-2 1.6a12 12 0 0 0 6.2 6.2l1.6-2 4.4 1.6V19a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z"/>'),
  mail: wrap('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'),
  pin: wrap('<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.4"/>'),
  clock: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
  shield: wrap('<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/>'),
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
  plug: wrap('<path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8Z"/><path d="M12 16v5"/>'),
  wrench: wrap('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.7 2.7-2-2 2.7-2.7Z"/>'),
  gear: wrap('<circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.2M12 18.8V21M4.9 6.2l1.6 1.6M17.5 16.2l1.6 1.6M3 12h2.2M18.8 12H21M4.9 17.8l1.6-1.6M17.5 7.8l1.6-1.6"/>'),
  bird: wrap('<path d="M4 13c2-4 6-7 12-7 2 0 4 .8 4 .8s-1 2-3 2.7c.6 1 .8 2 .5 3.3-.6 2.6-3 4.2-6 4.2-2 0-3.6-.7-4.8-1.8"/><path d="M6 18c1.5-1 2.5-2.3 3-4" /><circle cx="16.5" cy="8.3" r=".6" fill="currentColor" stroke="none"/>'),
  pig: wrap('<rect x="3.5" y="9" width="15" height="9" rx="4"/><path d="M18.5 12h2v3h-2M8 13h.01M12.5 13h.01" /><path d="M6.5 9V6.5M10 9V7" /><path d="M6 18v1.5M10 18v1.5"/>'),
  cow: wrap('<path d="M5 10c0-2.5 2-4 4-4h6c2 0 4 1.5 4 4v2c0 3.5-2.5 6-7 6s-7-2.5-7-6v-2Z"/><path d="M4 8 2.5 6M20 8l1.5-2M9 14h.01M15 14h.01"/>'),
  silo: wrap('<path d="M8 21V9a4 4 0 0 1 8 0v12"/><path d="M8 21h8M8 12h8" /><path d="M12 3v2"/>'),
  team: wrap('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9.5" r="2.3"/><path d="M15 20c.2-2.6 1.7-4.6 3.8-5.3"/>'),
  briefcase: wrap('<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>'),
  euro: wrap('<path d="M17 6.5a6 6 0 1 0 0 11" /><path d="M6 10h9M6 14h7"/>'),
  car: wrap('<path d="M4 16V12l2-4h12l2 4v4"/><path d="M4 16h16M7 16v2M17 16v2"/><circle cx="7.5" cy="16" r="1.2" fill="currentColor" stroke="none"/><circle cx="16.5" cy="16" r="1.2" fill="currentColor" stroke="none"/>'),
  route: wrap('<path d="M4 20c4-1 3-6 7-6s3 5 7 5"/><circle cx="4" cy="20" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="19" r="1.3" fill="currentColor" stroke="none"/>'),
  compass: wrap('<circle cx="12" cy="12" r="9"/><path d="m14.5 9.5-1.5 5-5 1.5 1.5-5Z"/>'),
  fileText: wrap('<path d="M7 3h7l4 4v14H7z" /><path d="M9 12h6M9 16h6M13 3v5h4"/>'),
  imageOff: wrap('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 20 6-7 3 3 4-5 5 6M3 4l18 16"/>'),
};

export function icon(name, extraClass = 'icon') {
  const svg = icons[name];
  if (!svg) throw new Error(`Icône inconnue: ${name}`);
  return svg.replace('<svg ', `<svg class="${extraClass}" `);
}
