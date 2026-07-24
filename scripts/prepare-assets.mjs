// Prépare les assets de marque (logo, favicons) et les polices self-hostées.
// Exécuté avant dev/build (npm run predev / prebuild). Zéro dépendance réseau au runtime.
import { mkdirSync, copyFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { allWorkGalleryPhotos, carouselPhotos } from '../src/pages/partials/blocks/work-gallery.data.mjs';

// Vite ne fait pas passer les attributs HTML bruts (img src, source srcset...) par
// resolve.alias — seuls les <link>/<script type=module> traversent le graphe de modules.
// Les binaires statiques (logo, favicons, polices) sont donc écrits dans public/, servi
// tel quel à la racine du site, quelle que soit la valeur de `root` dans vite.config.js.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const brandSourceDir = join(root, 'src/assets/brand'); // fichiers fournis par Alexy (source de vérité, versionnés)
const imgSourceDir = join(root, 'src/assets/img'); // photos & logos partenaires fournis
const brandDir = join(root, 'public/assets/brand'); // déclinaisons générées, servies telles quelles
const fontsDir = join(root, 'public/assets/fonts');
const imgDir = join(root, 'public/assets/img');
const partnersDir = join(root, 'public/assets/partners');
const publicDir = join(root, 'public');

mkdirSync(brandDir, { recursive: true });
mkdirSync(fontsDir, { recursive: true });
mkdirSync(imgDir, { recursive: true });
mkdirSync(partnersDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });

const logoSource = join(brandSourceDir, 'logo-source.png'); // icône + wordmark + tagline (3 lignes)
const faviconSource = join(brandSourceDir, 'favicon-source.png'); // icône + wordmark (sans tagline)

async function makeVariant(buffer, basename, { width } = {}) {
  const pipeline = sharp(buffer);
  const resized = width ? pipeline.resize({ width, withoutEnlargement: true }) : pipeline;
  const png = await sharp(await resized.png().toBuffer());
  await png.clone().png({ quality: 90 }).toFile(join(brandDir, `${basename}.png`));
  await png.clone().webp({ quality: 90 }).toFile(join(brandDir, `${basename}.webp`));
  await png.clone().avif({ quality: 75 }).toFile(join(brandDir, `${basename}.avif`));
}

async function makeTransparent(buffer, basename) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    if (data[i] > 244 && data[i + 1] > 244 && data[i + 2] > 244) {
      data[i + 3] = 0;
    }
  }
  await sharp(data, { raw: { width, height, channels } }).png({ quality: 90 }).toFile(join(brandDir, `${basename}.png`));
  await sharp(data, { raw: { width, height, channels } }).webp({ quality: 90 }).toFile(join(brandDir, `${basename}.webp`));
}

// ---- 1. Trois déclinaisons du logo : complet (tagline), compact (header), icône seule (favicon) ----
async function buildLogo() {
  if (!existsSync(logoSource) || !existsSync(faviconSource)) {
    console.warn('[assets] Sources logo introuvables — étape logo ignorée.');
    return null;
  }

  // Complet : icône + "LE SOMMER" + tagline 3 lignes — footer / page à-propos.
  const fullTrimmed = await sharp(logoSource).trim({ threshold: 10 }).png().toBuffer();
  await makeVariant(fullTrimmed, 'logo-full', { width: 960 });
  await makeTransparent(fullTrimmed, 'logo-full-transparent');

  // Compact : icône + "LE SOMMER" seul, sans tagline — header, usage courant.
  const compactTrimmed = await sharp(faviconSource).trim({ threshold: 12 }).png().toBuffer();
  await makeVariant(compactTrimmed, 'logo-compact', { width: 640 });
  await makeTransparent(compactTrimmed, 'logo-compact-transparent');

  // Icône seule : détourée depuis favicon-source.png (bounding box du symbole "LS").
  const iconBuffer = await sharp(faviconSource)
    .extract({ left: 399, top: 185, width: 505, height: 532 })
    .trim({ threshold: 12 })
    .png()
    .toBuffer();
  await makeVariant(iconBuffer, 'logo-icon', { width: 512 });
  await makeTransparent(iconBuffer, 'logo-icon-transparent');

  console.log('[assets] Logo généré : logo-full / logo-compact / logo-icon (+ variantes transparentes, webp, avif).');
  return iconBuffer;
}

// ---- 1b. Logo header : détouré depuis favicon-source.png ----
// On n'utilise PAS logo-detoure-source.png : le « R » de SOMMER y touche le bord droit du
// fichier (le tracé est rogné à la source), ce qui se voyait dans le header. favicon-source.png
// contient le même verrouillage icône + wordmark, complet et avec de la marge.
// `sharp.trim()` échoue ici (liseré gris de 1px dans le coin) : on calcule la boîte englobante
// de l'encre nous-mêmes, puis on recadre avec une marge proportionnelle.
async function buildHeaderLogo() {
  if (!existsSync(faviconSource)) {
    console.warn('[assets] favicon-source.png introuvable — logo header inchangé.');
    return;
  }

  const { data, info } = await sharp(faviconSource).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Encre = tout pixel nettement plus sombre que le fond blanc (pétrole max 169, bleu nuit max 38).
  let x0 = width;
  let y0 = height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (Math.max(data[i], data[i + 1], data[i + 2]) < 200 && data[i + 3] > 16) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) {
    console.warn('[assets] Aucune encre détectée dans favicon-source.png — logo header inchangé.');
    return;
  }

  // Blanc -> transparent (le header est translucide : un fond blanc opaque se verrait).
  for (let i = 0; i < data.length; i += channels) {
    if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) data[i + 3] = 0;
  }

  const margin = Math.round((x1 - x0) * 0.05);
  const left = Math.max(0, x0 - margin);
  const top = Math.max(0, y0 - margin);
  const cropped = await sharp(data, { raw: { width, height, channels } })
    .extract({
      left,
      top,
      width: Math.min(width - left, x1 - x0 + 1 + 2 * margin),
      height: Math.min(height - top, y1 - y0 + 1 + 2 * margin),
    })
    .png()
    .toBuffer();

  await makeVariant(cropped, 'logo-header', { width: 640 });
  console.log('[assets] Logo header détouré généré (logo-header.{png,webp,avif}).');
}

// ---- 1c. Logo footer : version inversée détourée fournie (cyan + blanc, fond transparent),
//          conçue pour le fond bleu nuit du footer ----
async function buildFooterLogo() {
  const source = join(brandSourceDir, 'logo-inverse-source.png');
  if (!existsSync(source)) {
    console.warn('[assets] logo-inverse-source.png introuvable — logo footer inchangé.');
    return;
  }
  const trimmed = await sharp(source).trim({ threshold: 10 }).png().toBuffer();
  await sharp(trimmed).resize({ width: 960, withoutEnlargement: true }).png({ quality: 90 }).toFile(join(brandDir, 'logo-footer.png'));
  await sharp(trimmed).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 90 }).toFile(join(brandDir, 'logo-footer.webp'));
  console.log('[assets] Logo footer inversé détouré généré (logo-footer.{png,webp}).');
}

// ---- 2. Favicons multi-tailles + favicon.ico + apple-touch-icon + manifest ----
async function buildFavicons(iconBuffer) {
  const source = iconBuffer ?? (existsSync(faviconSource) ? faviconSource : logoSource);
  if (!source) {
    console.warn('[assets] Aucune source de favicon disponible — étape ignorée.');
    return;
  }

  const sizes = [16, 32, 48, 180, 192, 512];
  const pngBuffers = {};
  for (const size of sizes) {
    const buf = await sharp(source)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toBuffer();
    pngBuffers[size] = buf;
    if (size === 180) {
      writeFileSync(join(publicDir, 'apple-touch-icon.png'), buf);
    } else {
      writeFileSync(join(publicDir, `favicon-${size}x${size}.png`), buf);
    }
  }

  // ICO minimal (conteneur PNG 16/32/48 — supporté par tous les navigateurs modernes).
  const icoBuffer = buildIco([pngBuffers[16], pngBuffers[32], pngBuffers[48]], [16, 32, 48]);
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);

  writeFileSync(
    join(publicDir, 'site.webmanifest'),
    JSON.stringify(
      {
        name: 'LE SOMMER',
        short_name: 'LE SOMMER',
        icons: [
          { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: '#0097a9',
        background_color: '#ffffff',
        display: 'standalone',
      },
      null,
      2,
    ),
  );

  console.log('[assets] Favicons générés (favicon.ico, favicon-*.png, apple-touch-icon.png, site.webmanifest).');
}

function buildIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  const imageBuffers = [];
  for (let i = 0; i < numImages; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // offset
    offset += buf.length;
    dirEntries.push(entry);
    imageBuffers.push(buf);
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

// ---- 3. Visuel hero de l'accueil : deux montages (paysage desktop / portrait mobile) ----
// Le client fournit une mosaïque cadrée pour chaque orientation : on ne recadre donc PAS,
// chaque variante est servie telle quelle via <picture media="...">.
async function buildHeroImage() {
  const variants = [
    { file: 'hero mosaique LS desktop.png', base: 'hero-home', widths: [1024, 1440, 1920] },
    { file: 'hero mosaique LS mobile.png', base: 'hero-home-mobile', widths: [480, 720, 960] },
  ];
  for (const { file, base, widths } of variants) {
    const source = join(imgSourceDir, 'hero', file);
    if (!existsSync(source)) {
      console.warn(`[assets] « ${file} » introuvable — variante hero ignorée.`);
      continue;
    }
    for (const w of widths) {
      const img = sharp(source).rotate().resize({ width: w, withoutEnlargement: true });
      await img.clone().avif({ quality: 62 }).toFile(join(imgDir, `${base}-${w}.avif`));
      await img.clone().webp({ quality: 76 }).toFile(join(imgDir, `${base}-${w}.webp`));
      await img.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(imgDir, `${base}-${w}.jpg`));
    }
    console.log(`[assets] Hero « ${base} » généré (${widths.join(', ')} px).`);
  }
}

// ---- 4. Logos partenaires : bords blancs/transparents rognés (trim), taille homogène ----
async function buildPartnerLogos() {
  const partners = ['landmeco', 'skiold', 'cbm', 'nolting', 'systel', 'lubing', 'sodalec'];
  for (const name of partners) {
    const source = join(imgSourceDir, 'partners', `${name}-source.png`);
    if (!existsSync(source)) {
      console.warn(`[assets] Logo partenaire ${name} introuvable — ignoré.`);
      continue;
    }
    // trim() rogne la bordure uniforme (blanc ou transparent) pour un cadrage serré,
    // de sorte que chaque logo remplisse bien sa boîte d'affichage (taille homogène en CSS).
    const trimmed = await sharp(source).trim({ threshold: 15 }).png().toBuffer();
    await sharp(trimmed).resize({ height: 200, withoutEnlargement: true }).png({ quality: 92 }).toFile(join(partnersDir, `${name}.png`));
    await sharp(trimmed).resize({ height: 200, withoutEnlargement: true }).webp({ quality: 92 }).toFile(join(partnersDir, `${name}.webp`));
  }
  console.log('[assets] Logos partenaires générés (public/assets/partners/).');
}

// Les sources gardent le nom donné par le client (accents, espaces, « + »…). macOS stocke ces
// noms en Unicode NFD alors que le fichier de données est en NFC : d'où la comparaison
// normalisée ci-dessous, sans quoi aucune photo n'est trouvée.
let workDirIndex = null;
function resolveWorkSource(name) {
  const workSrcDir = join(imgSourceDir, 'work');
  if (!existsSync(workSrcDir)) return null;
  workDirIndex ??= readdirSync(workSrcDir).map((f) => [f.normalize('NFC'), f]);
  const hit = workDirIndex.find(([normalized]) => normalized === name.normalize('NFC'));
  return hit ? join(workSrcDir, hit[1]) : null;
}

// ---- 5b. Carrousel « le métier au quotidien » (page recrutement) : 3:2, AVIF/WebP/JPEG ----
async function buildWorkPhotos() {
  const outDir = join(imgDir, 'work');
  mkdirSync(outDir, { recursive: true });
  const widths = [768, 1200];
  let count = 0;
  for (const photo of carouselPhotos) {
    const source = resolveWorkSource(photo.source);
    if (!source) {
      console.warn(`[assets] Carrousel : source introuvable pour « ${photo.slug} » (${photo.source}) — ignorée.`);
      continue;
    }
    for (const w of widths) {
      const base = sharp(source).rotate().resize(w, Math.round((w * 2) / 3), { fit: 'cover', position: photo.crop ?? 'centre' });
      await base.clone().avif({ quality: 60 }).toFile(join(outDir, `${photo.slug}-${w}.avif`));
      await base.clone().webp({ quality: 74 }).toFile(join(outDir, `${photo.slug}-${w}.webp`));
      await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(join(outDir, `${photo.slug}-${w}.jpg`));
    }
    count++;
  }
  console.log(`[assets] Carrousel recrutement : ${count} photo(s) générée(s) (public/assets/img/work/).`);
}

// ---- 5c. Galerie « réalisations » des pages pôle : 4:3, AVIF/WebP/JPEG ----
async function buildGalleryPhotos() {
  const outDir = join(imgDir, 'work', 'gallery');
  mkdirSync(outDir, { recursive: true });

  // Deux jeux par photo :
  //  - vignettes 4:3 recadrées (grille + pellicule de la visionneuse) : grille homogène ;
  //  - une version « full » à 1400px de large qui CONSERVE le cadrage d'origine (fit: inside),
  //    pour l'affichage plein écran — on ne veut pas y montrer une photo tronquée.
  // Cadrage CENTRÉ par défaut : `position: 'attention'` zoomait sur le détail le plus contrasté
  // (une étiquette, une grue) et sortait le sujet du cadre. `crop` permet de forcer au cas par cas.
  const widths = [420, 840];
  let count = 0;
  for (const photo of allWorkGalleryPhotos) {
    const source = resolveWorkSource(photo.source);
    if (!source) {
      console.warn(`[assets] Galerie : source introuvable pour « ${photo.slug} » (${photo.source}) — ignorée.`);
      continue;
    }
    for (const w of widths) {
      const base = sharp(source).rotate().resize(w, Math.round((w * 3) / 4), { fit: 'cover', position: photo.crop ?? 'centre' });
      await base.clone().avif({ quality: 58 }).toFile(join(outDir, `${photo.slug}-${w}.avif`));
      await base.clone().webp({ quality: 72 }).toFile(join(outDir, `${photo.slug}-${w}.webp`));
      await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(join(outDir, `${photo.slug}-${w}.jpg`));
    }
    const full = sharp(source).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true });
    await full.clone().avif({ quality: 60 }).toFile(join(outDir, `${photo.slug}-full.avif`));
    await full.clone().webp({ quality: 76 }).toFile(join(outDir, `${photo.slug}-full.webp`));
    await full.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(outDir, `${photo.slug}-full.jpg`));
    count++;
  }
  console.log(`[assets] Galerie réalisations : ${count} photo(s) générée(s) (public/assets/img/work/gallery/).`);
}

// ---- 5d. Photo d'équipe (page « Qui sommes-nous ? ») : portrait, AVIF/WebP/JPEG ----
// Légère accentuation (sharpen) : la source téléphone est un peu douce une fois réduite.
async function buildTeamPhoto() {
  const sourceDir = join(imgSourceDir, 'team');
  if (!existsSync(sourceDir)) return;
  const file = readdirSync(sourceDir).find((f) => /\.(jpe?g|png)$/i.test(f));
  if (!file) {
    console.warn('[assets] Aucune photo dans src/assets/img/team/ — étape équipe ignorée.');
    return;
  }
  for (const w of [480, 768]) {
    const base = sharp(join(sourceDir, file)).rotate().resize({ width: w, withoutEnlargement: true }).sharpen({ sigma: 0.8 });
    await base.clone().avif({ quality: 60 }).toFile(join(imgDir, `team-${w}.avif`));
    await base.clone().webp({ quality: 76 }).toFile(join(imgDir, `team-${w}.webp`));
    await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(imgDir, `team-${w}.jpg`));
  }
  console.log('[assets] Photo équipe générée (team-{480,768}.{avif,webp,jpg}).');
}

// ---- 6. Polices self-hostées (Manrope / Inter) depuis @fontsource ----
function copyFonts() {
  const sources = [
    { pkg: '@fontsource/manrope', weights: ['700', '800'], family: 'manrope' },
    { pkg: '@fontsource/inter', weights: ['400', '500', '600'], family: 'inter' },
  ];

  for (const { pkg, weights, family } of sources) {
    const pkgDir = join(root, 'node_modules', pkg, 'files');
    if (!existsSync(pkgDir)) {
      console.warn(`[assets] ${pkg} introuvable dans node_modules — lancer npm install.`);
      continue;
    }
    const files = readdirSync(pkgDir);
    for (const weight of weights) {
      const match = files.find((f) => f === `${family}-latin-${weight}-normal.woff2`);
      if (match) {
        copyFileSync(join(pkgDir, match), join(fontsDir, `${family}-${weight}.woff2`));
      }
    }
  }
  console.log('[assets] Polices copiées dans public/assets/fonts/.');
}

const iconBuffer = await buildLogo();
await buildHeaderLogo();
await buildFooterLogo();
await buildFavicons(iconBuffer);
await buildHeroImage();
await buildPartnerLogos();
await buildWorkPhotos();
await buildGalleryPhotos();
await buildTeamPhoto();
copyFonts();
