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

Files that already exist are never overwritten — lean-dev skips them and tells you.

## Model Switching

lean-dev bakes these rules into each tool's config:

| Task | Model |
|------|-------|
| File search, grep, read | Haiku / small model |
| Planning, analysis | Sonnet / mid model |
| Writing / editing code | Sonnet / mid model |
| Complex refactor, architecture | Opus / large model |

## Claude Code — `/lean-dev` command

After running `npx lean-dev init --tool claude-code`, type `/lean-dev` in Claude Code to open the efficiency menu:

```
[IG] Generate / update .claudeignore
[MD] Restructure CLAUDE.md
[ST] Load STACK.md into context
[AR] Load ARCHITECTURE.md into context
[CM] Compact session (focused)
[LD] Start lean dev session
[HK] Show token-saving tips
```

## Token-Saving Tips

1. **One task per session** — run `/clear` when switching context
2. **Use model tiers** — Haiku for search/read, Sonnet for writing, Opus for architecture
3. **Reference files explicitly** — `src/auth/login.ts:42` beats "find the login function"
4. **Compact after big changes** — `/compact Focus on code changes only`
5. **Keep CLAUDE.md lean** — point to docs, don't inline everything
6. **Use .claudeignore** — exclude node_modules, build artifacts, lock files
7. **Load only what you need** — don't dump all docs at session start

## Development Phases

### Phase 1 — MVP

- [x] CLI with `init` command
- [x] Claude Code templates (lean-dev.md, CLAUDE.md, .claudeignore, STACK.md, ARCHITECTURE.md)
- [x] Auto-detect project type for .claudeignore generation
- [x] README

### Phase 2 — Multi-tool

- [x] Cursor templates
- [x] GitHub Copilot templates
- [x] Codex / AGENTS.md templates
- [x] `--all` flag

### Phase 3 — Polish

- [ ] `update` command (fetch latest from npm)
- [ ] Broader project type detection (Python, Go, Rust, Java, PHP, Ruby)
- [ ] Publish to npm
- [ ] Community contributions guide

## License

MIT
