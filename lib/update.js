import { existsSync } from 'fs';
import { join } from 'path';
import inquirer from 'inquirer';
import { detectProjectType, generateClaudeignore } from './detect.js';
import { readTemplate, writeFile } from './files.js';
import { TOOLS, TOOL_FILES } from './init.js';

export async function runUpdate(options) {
  const cwd = process.cwd();

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
        message: 'Which tool to update?',
        choices: [
          { name: 'Claude Code', value: 'claude-code' },
          { name: 'Cursor', value: 'cursor' },
          { name: 'GitHub Copilot', value: 'copilot' },
          { name: 'Codex', value: 'codex' },
          { name: 'All', value: 'all' },
        ],
      },
    ]);
    tools = choice === 'all' ? TOOLS : [choice];
  }

  const projectType = detectProjectType(cwd);

  for (const tool of tools) {
    const files = TOOL_FILES[tool];
    const existing = files.filter((f) => existsSync(join(cwd, f.path)));
    const missing = files.filter((f) => !existsSync(join(cwd, f.path)));

    if (existing.length === 0) {
      console.log(`\nNo ${tool} files found — run init first.`);
      continue;
    }

    console.log('');
    const { selected } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selected',
        message: `Select files to update (${tool}):`,
        choices: [
          ...existing.map((f) => ({ name: f.label, value: f.path, checked: false })),
          ...(missing.length > 0
            ? [new inquirer.Separator(`── not yet created ──`),
               ...missing.map((f) => ({ name: f.label, value: f.path, checked: false }))]
            : []),
        ],
      },
    ]);

    if (selected.length === 0) {
      console.log('  Nothing selected.');
      continue;
    }

    for (const filePath of selected) {
      await writeSelectedFile(tool, filePath, cwd, projectType);
    }
  }

  console.log('\nDone.');
}

async function writeSelectedFile(tool, filePath, cwd, projectType) {
  const content = getContent(tool, filePath, projectType);
  if (content === null) {
    console.log(`  ✗  No template found for ${filePath}`);
    return;
  }
  writeFile(cwd, filePath, content, true);
}

function getContent(tool, filePath, projectType) {
  const map = {
    'claude-code': {
      '.claudeignore': () => generateClaudeignore(projectType),
      'CLAUDE.md': () => readTemplate('claude-code/CLAUDE.template.md'),
      '.claude/commands/lean-dev.md': () => readTemplate('claude-code/commands/lean-dev.md'),
      '.claude/docs/STACK.md': () => readTemplate('universal/STACK.template.md'),
      '.claude/docs/ARCHITECTURE.md': () => readTemplate('universal/ARCHITECTURE.template.md'),
    },
    cursor: {
      '.cursorrules': () => readTemplate('cursor/cursorrules.template'),
      '.cursor/rules/lean-dev.mdc': () => readTemplate('cursor/lean-dev.mdc'),
    },
    copilot: {
      '.github/copilot-instructions.md': () => readTemplate('copilot/copilot-instructions.template.md'),
    },
    codex: {
      'AGENTS.md': () => readTemplate('codex/AGENTS.template.md'),
    },
  };

  return map[tool]?.[filePath]?.() ?? null;
}
