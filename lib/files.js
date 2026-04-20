import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const TEMPLATES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'templates');

export function readTemplate(relativePath) {
  return readFileSync(join(TEMPLATES_DIR, relativePath), 'utf8');
}

export function writeFile(targetDir, relativePath, content, force = false) {
  const fullPath = join(targetDir, relativePath);
  const dir = dirname(fullPath);

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  if (existsSync(fullPath) && !force) {
    console.log(`  ⚠  Skipping ${relativePath} (already exists)`);
    return false;
  }

  const isUpdate = force && existsSync(fullPath);
  writeFileSync(fullPath, content, 'utf8');
  console.log(isUpdate ? `  ↺  Updated ${relativePath}` : `  ✔  Created ${relativePath}`);
  return true;
}
