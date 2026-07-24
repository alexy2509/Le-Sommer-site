// Génère dist/sitemap.xml à partir des pages réellement construites.
// Lancé après `vite build` (voir package.json). Aucune liste d'URLs à maintenir à la main :
// on lit dist/, donc le sitemap ne peut pas se désynchroniser du site.
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/pages/partials/site-data.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

// Pages exclues du sitemap : la 404 n'a rien à y faire.
const EXCLUDE = new Set(['404.html']);

// Priorités : l'accueil d'abord, puis les pages métier, puis le reste.
const priorityOf = (url) => {
  if (url === '/') return '1.0';
  if (url === '/electricite-industrielle/' || url === '/materiel-elevage/') return '0.9';
  if (url === '/contact/' || url === '/recrutement/') return '0.8';
  if (url === '/a-propos/') return '0.7';
  return '0.3'; // mentions légales, politique de confidentialité
};

function collect(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== 'assets') collect(full, out);
    } else if (entry.endsWith('.html') && !EXCLUDE.has(relative(dist, full))) {
      out.push(full);
    }
  }
  return out;
}

const pages = collect(dist)
  .map((file) => {
    const rel = relative(dist, file).replaceAll('\\', '/');
    const url = rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`;
    return { url, lastmod: statSync(file).mtime.toISOString().slice(0, 10) };
  })
  .sort((a, b) => Number(priorityOf(b.url)) - Number(priorityOf(a.url)) || a.url.localeCompare(b.url));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${site.domain}${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <priority>${priorityOf(p.url)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(dist, 'sitemap.xml'), xml);
console.log(`[sitemap] ${pages.length} page(s) — ${site.domain}/sitemap.xml`);
