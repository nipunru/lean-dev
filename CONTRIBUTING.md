# Contributing to lean-dev

## What to contribute

- New templates for tools not yet supported
- Improvements to existing templates (tighter, more effective rules)
- Better project type detection (new languages/frameworks)
- Bug fixes in the CLI

## Adding a new tool

1. Create a template folder under `templates/<tool-name>/`
2. Add a case to `lib/init.js` → `setupTool()`
3. Add the tool to the `TOOLS` array in `lib/init.js`
4. Update the `--tool` description in `lib/cli.js`
5. Add a row to the "What it does" table in `README.md`

## Improving a template

Edit the file directly under `templates/`. Templates are plain markdown — no build step.

Keep templates minimal. The goal is lean context, not comprehensive docs.

## Pull requests

- One change per PR
- Test with `node bin/lean-dev.js init --all` in a temp directory
- No new dependencies without discussion

## Issues

Open an issue before starting significant work.
