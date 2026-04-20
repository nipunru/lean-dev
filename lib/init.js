import inquirer from 'inquirer';
import { detectProjectType, generateClaudeignore } from './detect.js';
import { readTemplate, writeFile } from './files.js';

export const TOOLS = ['claude-code', 'cursor', 'copilot', 'codex'];

export const TOOL_FILES = {
  'claude-code': [
    { label: '.claudeignore', path: '.claudeignore' },
    { label: 'CLAUDE.md', path: 'CLAUDE.md' },
    { label: '.claude/commands/lean-dev.md', path: '.claude/commands/lean-dev.md' },
    { label: '.claude/docs/STACK.md', path: '.claude/docs/STACK.md' },
    { label: '.claude/docs/ARCHITECTURE.md', path: '.claude/docs/ARCHITECTURE.md' },
  ],
  cursor: [
    { label: '.cursorrules', path: '.cursorrules' },
    { label: '.cursor/rules/lean-dev.mdc', path: '.cursor/rules/lean-dev.mdc' },
  ],
  copilot: [
    { label: '.github/copilot-instructions.md', path: '.github/copilot-instructions.md' },
  ],
  codex: [
    { label: 'AGENTS.md', path: 'AGENTS.md' },
  ],
};

export async function runInit(options) {
  const cwd = process.cwd();
  const force = !!options.force;
  let tools = [];

  if (options.all) {
    tools = TOOLS;
  } else if (options.tool) {
    if (!TOOLS.includes(options.tool)) {
      console.error(`Unknown tool: ${options.tool}`);
      console.error(`Choose from: ${TOOLS.join(', ')}`);
      process.exit(1);
    }
    tools = [options.tool];
  } else {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Which AI tool are you using?',
        choices: [
          { name: 'Claude Code', value: 'claude-code' },
          { name: 'Cursor', value: 'cursor' },
          { name: 'GitHub Copilot', value: 'copilot' },
          { name: 'Codex', value: 'codex' },
          { name: 'All of the above', value: 'all' },
        ],
      },
    ]);
    tools = choice === 'all' ? TOOLS : [choice];
  }

  const projectType = detectProjectType(cwd);
  console.log(`\n✔  Detected project type: ${projectType}\n`);

  for (const tool of tools) {
    await setupTool(tool, cwd, projectType, force);
  }

  console.log('\nDone.');

  if (tools.includes('claude-code')) {
    console.log(`
Next steps:
  1. Open Claude Code in this project
  2. Run: /lean-dev → ST
     This scans your project and generates STACK.md + ARCHITECTURE.md.
     Recommended: switch to Haiku first (low-cost scan).
  3. Run: /lean-dev → IG  to generate your ignore file
  4. Run: /lean-dev → LD  to start a focused session

The agent will load your stack context automatically on every session start.
`);
  }
}

export async function setupTool(tool, cwd, projectType, force = false) {
  switch (tool) {
    case 'claude-code':
      writeFile(cwd, '.claudeignore', generateClaudeignore(projectType), force);
      writeFile(cwd, 'CLAUDE.md', readTemplate('claude-code/CLAUDE.template.md'), force);
      writeFile(cwd, '.claude/commands/lean-dev.md', readTemplate('claude-code/commands/lean-dev.md'), force);
      writeFile(cwd, '.claude/docs/STACK.md', readTemplate('universal/STACK.template.md'), force);
      writeFile(cwd, '.claude/docs/ARCHITECTURE.md', readTemplate('universal/ARCHITECTURE.template.md'), force);
      break;

    case 'cursor':
      writeFile(cwd, '.cursorrules', readTemplate('cursor/cursorrules.template'), force);
      writeFile(cwd, '.cursor/rules/lean-dev.mdc', readTemplate('cursor/lean-dev.mdc'), force);
      break;

    case 'copilot':
      writeFile(cwd, '.github/copilot-instructions.md', readTemplate('copilot/copilot-instructions.template.md'), force);
      break;

    case 'codex':
      writeFile(cwd, 'AGENTS.md', readTemplate('codex/AGENTS.template.md'), force);
      break;
  }
}
