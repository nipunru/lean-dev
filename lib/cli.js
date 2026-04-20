import { Command } from 'commander';
import { runInit } from './init.js';
import { runUpdate } from './update.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

const program = new Command();

program
  .name('lean-dev')
  .description('Universal AI dev efficiency toolkit')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize lean-dev for your project')
  .option('-t, --tool <name>', 'Specific tool: claude-code, cursor, copilot, codex')
  .option('-a, --all', 'Setup for all tools')
  .option('-f, --force', 'Overwrite existing files')
  .action(runInit);

program
  .command('update')
  .description('Update lean-dev files — choose which to overwrite')
  .option('-t, --tool <name>', 'Specific tool: claude-code, cursor, copilot, codex')
  .option('-a, --all', 'Update all tools')
  .action(runUpdate);

program.parse();
