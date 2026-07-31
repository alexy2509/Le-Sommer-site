/*
  Amélioration ponctuelle de photos sources trop petites ou trop douces.

  Ce que fait ce script — et ce qu'il ne fait pas :
    - Agrandissement Lanczos3 (le meilleur noyau de sharp) jusqu'à une largeur cible, puis
      masque de netteté calibré. Le rendu à l'écran est nettement plus propre, parce que le
      site affiche ces photos jusqu'à 1400 px : sans cela, le navigateur étirait une source
      de 517 px, ce qui donne un flou franc.
    - Il ne s'agit PAS d'un upscale par IA : aucun détail n'est inventé. Une photo prise
      floue restera floue, simplement mieux mise à l'échelle et mieux contrastée.

  Les originaux ne sont jamais perdus : ils sont déplacés dans `_originaux/` avant
  remplacement. Sortie en PNG (sans perte) pour ne pas empiler d'artefacts JPEG, la
  compression finale étant faite par prepare-assets.

  Lancer :  node scripts/enhance-photos.mjs
*/
import { readdirSync, mkdirSync, renameSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const workDir = join(root, 'src/assets/img/work');
const backupDir = join(workDir, '_originaux');

// Largeur cible : le site sert au maximum 1400 px (visionneuse plein écran).
const TARGET_WIDTH = 1600;

// Préfixes des fichiers à traiter (noms client, comparés en Unicode normalisé).
const CIBLES = [
  'elevage installation machine de la marque skiold',
  'electrité indus et elevage interieur de batiment et camion LS',
  'electrité indus automatisme sodalec 2',
  'electrité indus armoire electri.',
  'electrité indus raccordement electriaue de la marque skiold',
  'electrité indus armoire elctrique',
];

const index = readdirSync(workDir)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .map((f) => [f.normalize('NFC'), f]);

mkdirSync(backupDir, { recursive: true });

let traites = 0;
for (const cible of CIBLES) {
  const hit = index.find(([norm]) => norm.startsWith(cible.normalize('NFC')));
  if (!hit) {
    console.warn(`[photos] Introuvable : ${cible}`);
    continue;
  }

  const nom = hit[1];
  const source = join(workDir, nom);
  const sauvegarde = join(backupDir, nom);

  // Déjà traité lors d'un passage précédent : on repart TOUJOURS de l'original.
  const entree = existsSync(sauvegarde) ? sauvegarde : source;
  const meta = await sharp(entree).rotate().metadata();

  // On n'agrandit jamais au-delà de 2x : au-delà, le lissage devient visible et le
  // résultat paraît artificiel.
  const facteur = Math.min(2, Math.max(1, TARGET_WIDTH / meta.width));
  const largeur = Math.round(meta.width * facteur);

  // Netteté proportionnelle à l'agrandissement : plus on étire, plus il faut compenser.
  const sigma = facteur > 1.6 ? 1.3 : facteur > 1.2 ? 1 : 0.7;

  const buffer = await sharp(entree)
    .rotate()
    .resize({ width: largeur, kernel: 'lanczos3', withoutEnlargement: false })
    .sharpen({ sigma, m1: 0.5, m2: 2.5 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  if (entree !== sauvegarde) renameSync(source, sauvegarde);

  // La sortie est toujours un PNG : on écrit sous le nom d'origine (l'extension .JPG
  // devient trompeuse), donc on normalise vers .png et on retire l'ancien fichier.
  const cibleNom = nom.replace(/\.(jpe?g|png)$/i, '.png');
  await sharp(buffer).toFile(join(workDir, cibleNom));

  console.log(`[photos] ${meta.width}x${meta.height} → ${largeur}px (x${facteur.toFixed(2)}, netteté ${sigma})  ${cibleNom}`);
  traites++;
}

console.log(`[photos] ${traites} photo(s) améliorée(s). Originaux conservés dans src/assets/img/work/_originaux/.`);
