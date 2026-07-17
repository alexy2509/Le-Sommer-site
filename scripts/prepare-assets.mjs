// Prépare les assets de marque (logo, favicons) et les polices self-hostées.
// Exécuté avant dev/build (npm run predev / prebuild). Zéro dépendance réseau au runtime.
import { mkdirSync, copyFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

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

// ---- 1b. Logo header : version détourée fournie (fond transparent, couleurs d'origine) ----
async function buildHeaderLogo() {
  const source = join(brandSourceDir, 'logo-detoure-source.png');
  if (!existsSync(source)) {
    console.warn('[assets] logo-detoure-source.png introuvable — logo header inchangé.');
    return;
  }
  const trimmed = await sharp(source).trim({ threshold: 10 }).png().toBuffer();
  await makeVariant(trimmed, 'logo-header', { width: 640 });
  console.log('[assets] Logo header détouré généré (logo-header.{png,webp,avif}).');
}

// ---- 1c. Logo footer : bi-ton pour fond bleu nuit (bleu marine du logo -> blanc, cyan conservé),
//          sans cartouche blanche, pour se fondre dans le footer ----
async function buildFooterLogo() {
  const source = join(brandDir, 'logo-full-transparent.png'); // logo complet détouré (avec baseline)
  if (!existsSync(source)) {
    console.warn('[assets] logo-full-transparent.png introuvable — logo footer inchangé.');
    return;
  }
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    if (data[i + 3] < 20) continue; // pixel transparent
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    if (lum < 70) {
      // bleu marine (texte "SOMMER" + partie sombre de l'icône) -> blanc, pour rester lisible sur navy
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }
  await sharp(data, { raw: { width, height, channels } }).png({ quality: 90 }).toFile(join(brandDir, 'logo-footer.png'));
  await sharp(data, { raw: { width, height, channels } }).webp({ quality: 90 }).toFile(join(brandDir, 'logo-footer.webp'));
  console.log('[assets] Logo footer bi-ton (navy -> blanc) généré (logo-footer.{png,webp}).');
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

// ---- 3. Photo hero (stand LE SOMMER) : versions responsives AVIF/WebP/JPEG ----
async function buildHeroImage() {
  const source = join(imgSourceDir, 'hero-stand-source.jpg');
  if (!existsSync(source)) {
    console.warn('[assets] hero-stand-source.jpg introuvable — étape hero ignorée.');
    return;
  }
  const widths = [768, 1280, 1920];
  for (const w of widths) {
    await sharp(source).resize({ width: w, withoutEnlargement: true }).avif({ quality: 60 }).toFile(join(imgDir, `hero-stand-${w}.avif`));
    await sharp(source).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(join(imgDir, `hero-stand-${w}.webp`));
    await sharp(source).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(join(imgDir, `hero-stand-${w}.jpg`));
  }
  console.log('[assets] Photo hero générée (hero-stand-{768,1280,1920}.{avif,webp,jpg}).');
}

// ---- 4. Logos partenaires : bords blancs/transparents rognés (trim), taille homogène ----
async function buildPartnerLogos() {
  const partners = ['landmeco', 'skiold', 'cbm'];
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

// ---- 5b. Photos de réalisations (carrousel recrutement) : responsive AVIF/WebP/JPEG ----
async function buildWorkPhotos() {
  const workSrcDir = join(imgSourceDir, 'work');
  const workOutDir = join(imgDir, 'work');
  mkdirSync(workOutDir, { recursive: true });
  const photos = ['armoire', 'raccordement', 'automatisme'];
  const widths = [768, 1200];
  for (const name of photos) {
    const source = join(workSrcDir, `${name}-source.png`);
    if (!existsSync(source)) {
      console.warn(`[assets] Photo réalisation ${name} introuvable — ignorée.`);
      continue;
    }
    for (const w of widths) {
      await sharp(source).resize({ width: w, withoutEnlargement: true }).avif({ quality: 60 }).toFile(join(workOutDir, `${name}-${w}.avif`));
      await sharp(source).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(join(workOutDir, `${name}-${w}.webp`));
      await sharp(source).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(join(workOutDir, `${name}-${w}.jpg`));
    }
  }
  console.log('[assets] Photos de réalisations générées (public/assets/img/work/).');
}

// ---- 5. Carte statique de localisation (source composée par scripts/build-map.mjs) ----
async function buildLocationMap() {
  const source = join(imgSourceDir, 'carte-localisation-source.png');
  if (!existsSync(source)) {
    console.warn('[assets] carte-localisation-source.png introuvable — lancer scripts/build-map.mjs.');
    return;
  }
  await sharp(source).png({ quality: 88 }).toFile(join(imgDir, 'carte-localisation.png'));
  await sharp(source).webp({ quality: 80 }).toFile(join(imgDir, 'carte-localisation.webp'));
  console.log('[assets] Carte de localisation générée (public/assets/img/carte-localisation.{png,webp}).');
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
await buildLocationMap();
copyFonts();
