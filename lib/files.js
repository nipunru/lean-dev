import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const TEMPLATES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'templates');

export function readTemplate(relativePath) {
  return readFileSync(join(TEMPLATES_DIR, relativePath), 'utf8');
}

export function writeFile(targetDir, relativePath, content) {
  const fullPath = join(targetDir, relativePath);
  const dir = dirname(fullPath);

  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  if (existsSync(fullPath)) {
    console.log(`  ⚠  Skipping ${relativePath} (already exists)`);
    return false;
  }

  writeFileSync(fullPath, content, 'utf8');
  console.log(`  ✔  Created ${relativePath}`);
  return true;
}
