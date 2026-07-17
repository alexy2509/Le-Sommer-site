// Assemble chaque page (données + contenu dans src/pages/**/page.mjs) avec les partiels
// communs (head/header/footer/breadcrumb) et écrit le HTML final dans .pages/ (généré,
// non versionné). Vite utilise ensuite .pages/ comme root pour le dev server et le build.
import { globSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from '../src/pages/partials/layout.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pagesSrcRoot = join(root, 'src/pages');
const outRoot = join(root, '.pages');

if (existsSync(outRoot)) rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });

const pageFiles = globSync('**/page.mjs', { cwd: pagesSrcRoot }).sort();

if (pageFiles.length === 0) {
  console.error('[pages] Aucun fichier page.mjs trouvé sous src/pages/.');
  process.exit(1);
}

let count = 0;
for (const relFile of pageFiles) {
  const routeDir = dirname(relFile) === '.' ? '' : dirname(relFile);
  const modUrl = pathToFileURL(join(pagesSrcRoot, relFile)).href + `?t=${Date.now()}`;
  const mod = await import(modUrl);

  if (!mod.meta || typeof mod.content !== 'function') {
    console.error(`[pages] ${relFile} doit exporter "meta" (objet) et "content" (fonction).`);
    process.exit(1);
  }

  // La page 404 est un cas particulier : Apache la sert via ErrorDocument 404 /404.html,
  // elle est donc écrite en fichier plat à la racine (jamais en /404/index.html).
  const isFlat = routeDir === '404';
  const expectedPath = isFlat ? '/404.html' : routeDir === '' ? '/' : `/${routeDir}/`;
  if (mod.meta.path !== expectedPath) {
    console.error(`[pages] ${relFile} : meta.path="${mod.meta.path}" ne correspond pas à l'emplacement du fichier ("${expectedPath}" attendu).`);
    process.exit(1);
  }

  const html = layout(mod.meta, mod.content());
  if (isFlat) {
    writeFileSync(join(outRoot, '404.html'), html);
  } else {
    const outDir = join(outRoot, routeDir);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
  }
  count++;
}

console.log(`[pages] ${count} page(s) générée(s) dans .pages/.`);
