import { existsSync } from 'fs';
import { join } from 'path';

export function detectProjectType(cwd = process.cwd()) {
  const has = (file) => existsSync(join(cwd, file));

  if (has('package.json')) return 'node';
  if (has('requirements.txt') || has('pyproject.toml') || has('setup.py')) return 'python';
  if (has('go.mod')) return 'go';
  if (has('Cargo.toml')) return 'rust';
  if (has('pom.xml') || has('build.gradle') || has('build.gradle.kts')) return 'java';
  if (has('composer.json')) return 'php';
  if (has('Gemfile')) return 'ruby';

  return 'generic';
}

const TYPE_PATTERNS = {
  node: [
    'node_modules/',
    'dist/',
    'build/',
    '.next/',
    '.nuxt/',
    '.svelte-kit/',
    '.turbo/',
    'coverage/',
    '.nyc_output/',
    '*.lock',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'bun.lockb',
    '*.min.js',
    '*.min.css',
    '*.map',
  ],
  python: [
    '__pycache__/',
    '*.pyc',
    '*.pyo',
    '.venv/',
    'venv/',
    'env/',
    'dist/',
    'build/',
    '*.egg-info/',
    '.pytest_cache/',
    '.mypy_cache/',
    '.ruff_cache/',
    '*.lock',
  ],
  go: [
    'vendor/',
    'bin/',
    '*.test',
    '*.out',
    '*.sum',
  ],
  rust: [
    'target/',
    'Cargo.lock',
  ],
  java: [
    'target/',
    'build/',
    '.gradle/',
    '*.class',
    '*.jar',
    '*.war',
  ],
  php: [
    'vendor/',
    'storage/',
    'bootstrap/cache/',
    'public/hot',
    'composer.lock',
  ],
  ruby: [
    'vendor/bundle/',
    '.bundle/',
    'tmp/',
    'log/',
    '*.lock',
  ],
  generic: [],
};

const COMMON_PATTERNS = [
  '.git/',
  '.DS_Store',
  'Thumbs.db',
  '*.log',
  '*.db',
  '*.sqlite',
  '*.sqlite3',
  '.env',
  '.env.local',
  '.env.*.local',
  '!.env.example',
  '*.png',
  '*.jpg',
  '*.jpeg',
  '*.gif',
  '*.webp',
  '*.ico',
  '*.mp4',
  '*.mp3',
  '*.wav',
  '*.pdf',
  '*.zip',
  '*.tar.gz',
  '*.woff',
  '*.woff2',
  '*.ttf',
  '*.eot',
  '*.csv',
  '*.parquet',
  '*.bin',
];

export function generateClaudeignore(projectType) {
  const specific = TYPE_PATTERNS[projectType] ?? [];
  return [...specific, '', '# common', ...COMMON_PATTERNS].join('\n') + '\n';
}
