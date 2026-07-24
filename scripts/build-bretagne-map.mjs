// Génère (UNE FOIS) les tracés SVG des 4 départements bretons, à partir d'un GeoJSON simplifié.
// Résultat écrit en module versionné (src/pages/partials/blocks/bretagne-map.data.mjs) : aucune requête au runtime.
// Relancer si besoin :  node scripts/build-bretagne-map.mjs
//
// Deux différences avec la première version :
//  - simplification Douglas-Peucker (au lieu d'une décimation « 1 point sur 2 » qui déformait les côtes) ;
//  - les îles sont séparées du continent : elles ne doivent jamais être mises en lumière
//    (Ouessant/Molène, à l'ouest du Finistère, ne fait pas partie de la zone d'intervention).
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const geo = JSON.parse(readFileSync('/tmp/depts.geojson', 'utf8'));

// Bretagne administrative : Côtes-d'Armor (22), Finistère (29), Ille-et-Vilaine (35), Morbihan (56).
const CODES = ['22', '29', '35', '56'];
const depts = CODES.map((code) => geo.features.find((f) => f.properties.code === code));

const ringsOf = (geom) => (geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates);
const MEAN_LAT = 48.2; // latitude moyenne de la Bretagne
const COS = Math.cos((MEAN_LAT * Math.PI) / 180);
const project = ([lon, lat]) => [lon * COS, -lat];

// ---- Cadrage : bbox de l'ensemble (îles comprises, pour ne rien tronquer) ----
let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
for (const f of depts) for (const poly of ringsOf(f.geometry)) for (const ring of poly) for (const c of ring) {
  const [x, y] = project(c);
  if (x < minx) minx = x;
  if (y < miny) miny = y;
  if (x > maxx) maxx = x;
  if (y > maxy) maxy = y;
}

const PAD = 12;
const TARGET = 1000;
const scale = (TARGET - 2 * PAD) / (maxx - minx);
const H = Math.round((maxy - miny) * scale + 2 * PAD);
const toPx = (c) => {
  const [x, y] = project(c);
  return [(x - minx) * scale + PAD, (y - miny) * scale + PAD];
};

// ---- Simplification Douglas-Peucker (en pixels : la tolérance est directement lisible) ----
const TOLERANCE = 1.1;

function perpDist(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  let idx = 0;
  let max = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > max) {
      max = d;
      idx = i;
    }
  }
  if (max > tol) {
    return simplify(pts.slice(0, idx + 1), tol).slice(0, -1).concat(simplify(pts.slice(idx), tol));
  }
  return [pts[0], pts[pts.length - 1]];
}

const areaOf = (pts) => {
  let a = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) a += pts[j][0] * pts[i][1] - pts[i][0] * pts[j][1];
  return Math.abs(a) / 2;
};

const r1 = (n) => Math.round(n * 10) / 10;
const toPath = (rings) =>
  rings.map((pts) => pts.map((p, i) => (i === 0 ? 'M' : 'L') + r1(p[0]) + ' ' + r1(p[1])).join('') + 'Z').join('');

// Un anneau est « continental » s'il pèse au moins 8 % du plus grand anneau du département.
// En dessous : c'est une île (Ouessant, Sein, Groix, Belle-Île, Bréhat…).
const ISLAND_RATIO = 0.08;

const data = depts.map((f) => {
  const rings = [];
  for (const poly of ringsOf(f.geometry)) {
    for (const ring of poly) {
      if (ring.length < 4) continue;
      const pts = simplify(ring.map(toPx), TOLERANCE);
      if (pts.length < 4) continue;
      rings.push({ pts, area: areaOf(pts) });
    }
  }
  const maxArea = Math.max(...rings.map((r) => r.area));
  const main = rings.filter((r) => r.area >= maxArea * ISLAND_RATIO);
  const isles = rings.filter((r) => r.area < maxArea * ISLAND_RATIO);
  return {
    code: f.properties.code,
    nom: f.properties.nom,
    d: toPath(main.map((r) => r.pts)),
    islands: toPath(isles.map((r) => r.pts)),
    points: main.reduce((n, r) => n + r.pts.length, 0),
  };
});

// Centre de l'aura : barycentre de la bbox du continent finistérien, décalé vers l'est
// (l'aura doit rayonner vers les départements limitrophes, pas vers l'océan).
const fin = depts.find((f) => f.properties.code === '29');
let fx0 = Infinity, fy0 = Infinity, fx1 = -Infinity, fy1 = -Infinity;
for (const poly of ringsOf(fin.geometry)) for (const ring of poly) {
  if (ring.length < 50) continue; // continent uniquement
  for (const c of ring) {
    const [x, y] = toPx(c);
    if (x < fx0) fx0 = x;
    if (y < fy0) fy0 = y;
    if (x > fx1) fx1 = x;
    if (y > fy1) fy1 = y;
  }
}
const aura = {
  cx: r1(fx0 + (fx1 - fx0) * 0.62),
  cy: r1(fy0 + (fy1 - fy0) * 0.5),
  r: r1((fx1 - fx0) * 1.5),
};

// Siège : Rond-Point de Kerourvois, Ergué-Gabéric (coordonnées OpenStreetMap Nominatim).
const [sx, sy] = toPx([-4.0460625, 48.0014699]);
const siege = { x: r1(sx), y: r1(sy) };

const out = `// GÉNÉRÉ par scripts/build-bretagne-map.mjs — ne pas éditer à la main.
// Tracés SVG des 4 départements bretons (Finistère = code 29), pour l'illustration de la zone.
// \`d\` = masse continentale, \`islands\` = îles (jamais mises en avant : hors zone d'intervention).
// \`aura\` = centre/rayon du dégradé rayonnant depuis le Finistère vers les départements limitrophes.
// \`siege\` = position du siège (Ergué-Gabéric) dans le repère du viewBox.
export const bretagneMap = {
  viewBox: '0 0 ${TARGET} ${H}',
  aura: ${JSON.stringify(aura)},
  siege: ${JSON.stringify(siege)},
  depts: [
${data.map((d) => `    ${JSON.stringify({ code: d.code, nom: d.nom, d: d.d, islands: d.islands })},`).join('\n')}
  ],
};
`;
writeFileSync(join(root, 'src/pages/partials/blocks/bretagne-map.data.mjs'), out);
console.log(
  `[bretagne-map] viewBox 0 0 ${TARGET} ${H} · ${data.map((d) => `${d.code}:${d.points}pts${d.islands ? '+îles' : ''}`).join(' ')} · ${(out.length / 1024).toFixed(1)} Ko`,
);
