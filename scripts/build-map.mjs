// Génère une carte statique (image) centrée sur le siège LE SOMMER, avec un point GPS.
// Tuiles OpenStreetMap récupérées UNE FOIS au lancement de ce script (pas au build du site) ;
// l'image composée est enregistrée dans src/assets/img/ (source versionnée). Le site ne fait
// donc aucune requête tierce au runtime (conforme CSP img-src 'self' + RGPD).
//
// À relancer manuellement seulement si l'adresse change :  node scripts/build-map.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'src/assets/img');
mkdirSync(outDir, { recursive: true });

// Coordonnées vérifiées via OpenStreetMap Nominatim (Rond-Point de Kerourvois, Ergué-Gabéric).
const LAT = 48.0014699;
const LON = -4.0460625;
const ZOOM = 16;
const W = 760;
const H = 460;
const TILE = 256;
const UA = 'LE-SOMMER-site-build/1.0 (static map, one-off)';

function lonLatToGlobalPixel(lon, lat, z) {
  const n = 2 ** z;
  const x = ((lon + 180) / 360) * n * TILE;
  const latRad = (lat * Math.PI) / 180;
  const y = ((1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2) * n * TILE;
  return { x, y };
}

async function fetchTile(z, x, y) {
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Tuile ${z}/${x}/${y} : HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function pinSvg() {
  // Épingle aux couleurs de la marque (bleu pétrole), pointe en bas.
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="44" height="56" viewBox="0 0 44 56">
    <path d="M22 2C11.5 2 3 10.5 3 21c0 13.5 19 33 19 33s19-19.5 19-33C41 10.5 32.5 2 22 2Z"
      fill="#0097a9" stroke="#ffffff" stroke-width="3"/>
    <circle cx="22" cy="21" r="7.5" fill="#ffffff"/>
  </svg>`);
}

async function main() {
  const g = lonLatToGlobalPixel(LON, LAT, ZOOM);
  const left = Math.round(g.x - W / 2);
  const top = Math.round(g.y - H / 2);

  const minTileX = Math.floor(left / TILE);
  const maxTileX = Math.floor((left + W - 1) / TILE);
  const minTileY = Math.floor(top / TILE);
  const maxTileY = Math.floor((top + H - 1) / TILE);

  const composites = [];
  for (let tx = minTileX; tx <= maxTileX; tx++) {
    for (let ty = minTileY; ty <= maxTileY; ty++) {
      const buf = await fetchTile(ZOOM, tx, ty);
      composites.push({ input: buf, left: tx * TILE - minTileX * TILE, top: ty * TILE - minTileY * TILE });
    }
  }

  const canvasW = (maxTileX - minTileX + 1) * TILE;
  const canvasH = (maxTileY - minTileY + 1) * TILE;

  const stitched = await sharp({ create: { width: canvasW, height: canvasH, channels: 3, background: '#e8e8e8' } })
    .composite(composites)
    .png()
    .toBuffer();

  const cropLeft = left - minTileX * TILE;
  const cropTop = top - minTileY * TILE;

  const cropped = await sharp(stitched).extract({ left: cropLeft, top: cropTop, width: W, height: H }).toBuffer();

  // Épingle : pointe centrée sur la position exacte (centre du cadrage).
  const pin = pinSvg();
  const pinW = 44;
  const pinH = 56;
  const final = await sharp(cropped)
    .composite([{ input: pin, left: Math.round(W / 2 - pinW / 2), top: Math.round(H / 2 - pinH) }])
    .png()
    .toFile(join(outDir, 'carte-localisation-source.png'));

  console.log(`[map] Carte statique générée (${W}x${H}) → src/assets/img/carte-localisation-source.png`, final.width ? '' : '');
}

main().catch((e) => {
  console.error('[map] Échec :', e.message);
  process.exit(1);
});
