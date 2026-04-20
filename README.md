# lean-dev

Universal AI dev efficiency toolkit for Claude Code, Cursor, GitHub Copilot, and Codex.

Reduces token usage via smart context management, model switching, and session discipline.

## Install

```bash
npx lean-dev init
```

### Options

```bash
npx lean-dev init --tool claude-code
npx lean-dev init --tool cursor
npx lean-dev init --tool copilot
npx lean-dev init --tool codex
npx lean-dev init --all
```

## What it does

Copies lean configuration templates into your project:

| Tool | Files Created |
|------|---------------|
| Claude Code | `CLAUDE.md`, `.claudeignore`, `.claude/commands/lean-dev.md`, `.claude/docs/STACK.md`, `.claude/docs/ARCHITECTURE.md` |
| Cursor | `.cursorrules`, `.cursor/rules/lean-dev.mdc` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Codex | `AGENTS.md` |

Files that already exist are never overwritten.

## Claude Code — `/lean-dev` command

After `npx lean-dev init --tool claude-code`, type `/lean-dev` in Claude Code.

```
[IG] Generate / update agent ignore (eg: .claudeignore)
[ST] Generate STACK.md and ARCHITECTURE.md
[MD] Restructure CLAUDE.md
[CM] Compact session
[LD] Start lean dev session
[HK] How to use lean-dev
```

### Recommended setup order

```
/lean-dev → IG   generate ignore file
/lean-dev → ST   scan project and generate STACK.md + ARCHITECTURE.md
/lean-dev → MD   tighten CLAUDE.md
/lean-dev → LD   start working
```

### During a session

| Command | Action |
|---------|--------|
| `LD` | Start a focused task — one task per session |
| `CM` | Compact when context gets large |
| `/clear` | Start fresh for a new task |

### How it works

**IG** — Scans the project using Haiku. Adds obvious artifacts silently (node_modules, dist, .git). Asks before adding anything uncertain ("Ignore Docker files?").

**ST** — Uses Haiku to read dependency manifests (package.json, go.mod, Cargo.toml, etc.) and scan directory structure. Generates STACK.md and ARCHITECTURE.md from what it finds — no placeholders. You choose which to update.

**MD** — Reads CLAUDE.md and proposes a leaner version. Shows the diff, asks before writing.

**LD** — Asks for one task, loads only relevant files, states the model tier for each step.

## Model Switching

| Task | Model |
|------|-------|
| File search, grep, read | Haiku / small model |
| Planning, analysis | Sonnet / mid model |
| Writing / editing code | Sonnet / mid model |
| Complex refactor, architecture | Opus / large model |

Baked into each tool's config as behavioral guidance.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Copyright 2025 Nipun R

Licensed under the [Apache License, Version 2.0](LICENSE). You may use, distribute, and modify this software freely. Derivative works must carry the same license and attribution notices.
