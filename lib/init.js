import inquirer from 'inquirer';
import { detectProjectType, generateClaudeignore } from './detect.js';
import { readTemplate, writeFile } from './files.js';

const TOOLS = ['claude-code', 'cursor', 'copilot', 'codex'];

export async function runInit(options) {
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
    await setupTool(tool, cwd, projectType);
  }

  console.log('\nDone.');
  if (tools.includes('claude-code')) {
    console.log('Run /lean-dev in Claude Code to start a token-efficient session.');
  }
}

async function setupTool(tool, cwd, projectType) {
  switch (tool) {
    case 'claude-code':
      writeFile(cwd, '.claudeignore', generateClaudeignore(projectType));
      writeFile(cwd, 'CLAUDE.md', readTemplate('claude-code/CLAUDE.template.md'));
      writeFile(cwd, '.claude/commands/lean-dev.md', readTemplate('claude-code/commands/lean-dev.md'));
      writeFile(cwd, '.claude/docs/STACK.md', readTemplate('universal/STACK.template.md'));
      writeFile(cwd, '.claude/docs/ARCHITECTURE.md', readTemplate('universal/ARCHITECTURE.template.md'));
      break;

    case 'cursor':
      writeFile(cwd, '.cursorrules', readTemplate('cursor/cursorrules.template'));
      writeFile(cwd, '.cursor/rules/lean-dev.mdc', readTemplate('cursor/lean-dev.mdc'));
      break;

    case 'copilot':
      writeFile(cwd, '.github/copilot-instructions.md', readTemplate('copilot/copilot-instructions.template.md'));
      break;

    case 'codex':
      writeFile(cwd, 'AGENTS.md', readTemplate('codex/AGENTS.template.md'));
      break;
  }
}
