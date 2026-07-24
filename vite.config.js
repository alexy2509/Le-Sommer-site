import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { globSync, existsSync } from 'node:fs';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const pagesRoot = resolve(projectRoot, '.pages');
const srcDir = resolve(projectRoot, 'src');

function collectInputs() {
  if (!existsSync(pagesRoot)) return {};
  return Object.fromEntries(
    globSync('**/*.html', { cwd: pagesRoot }).map((file) => {
      const name =
        file
          .replace(/index\.html$/, '')
          .replace(/\.html$/, '')
          .replace(/\/$/, '') || 'accueil';
      return [name.replaceAll('/', '_'), resolve(pagesRoot, file)];
    }),
  );
}

export default defineConfig({
  root: pagesRoot,
  publicDir: resolve(projectRoot, 'public'),
  resolve: {
    // '/js' et '/styles' résolvent via le graphe de modules Vite (bundlé, minifié, hashé).
    // Les binaires statiques (logo, favicons, polices) vivent dans public/assets/ et sont
    // servis tels quels quel que soit `root` — voir scripts/prepare-assets.mjs.
    alias: {
      '/js': resolve(srcDir, 'js'),
      '/styles': resolve(srcDir, 'styles'),
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: collectInputs(),
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    // Écoute aussi sur l'IP locale : permet d'ouvrir le site de développement depuis un
    // téléphone connecté au même Wi-Fi. Serveur de dev uniquement, jamais exposé en production.
    host: true,
  },
});
