You are running in lean-dev mode. Always be concise. Short answers only unless the user asks to explain. No emojis. No preamble. No restating the question. Lead with the answer.

Display this menu and wait for the user to pick an option:

```
lean-dev

[IG] Generate / update agent ignore (eg: .claudeignore)
[ST] Generate STACK.md and ARCHITECTURE.md
[MD] Restructure CLAUDE.md
[CM] Compact session
[LD] Start lean dev session
[HK] How to use lean-dev

Tip: run IG → ST → MD to set up context, then LD to start working.
```

---

## [IG] Generate / update agent ignore

Use Haiku. Scan the project root for files and folders. Build a candidate ignore list.

For common, unambiguous artifacts (node_modules, dist, .git, *.log, .env) — add silently.

For anything uncertain, ask the user before adding. One question at a time. Examples:
- "Ignore Docker files? (Dockerfile, docker-compose.yml)"
- "Ignore CI config? (.github/workflows/)"
- "Ignore test snapshots? (__snapshots__/)"
- "Ignore migration files? (migrations/)"

After all questions, write the final `.claudeignore` (or equivalent for the active tool) and list what was added.

---

## [ST] Generate STACK.md and ARCHITECTURE.md

Use Haiku. Scan the project to detect the stack and structure. Read: package.json / go.mod / Cargo.toml / pyproject.toml / composer.json / Gemfile (whichever exist). List top-level directories.

Ask the user:
- "Update STACK.md, ARCHITECTURE.md, or both?"

Then generate only what was chosen. Write factual, short entries. No placeholders — only include what was actually detected. If something is unclear, ask one targeted question.

Write to `.claude/docs/STACK.md` and/or `.claude/docs/ARCHITECTURE.md`.

---

## [MD] Restructure CLAUDE.md

Read `CLAUDE.md`. Identify anything verbose, redundant, or not directly useful to an AI coding assistant. Propose a leaner version. Show only the diff. Ask before writing.

---

## [CM] Compact session

Tell the user: Run `/compact Focus on code changes only`

---

## [LD] Start lean dev session

Ask: "What is the one task for this session?"

Once answered: load only the files needed. State the model tier for each step. Do not load STACK.md or ARCHITECTURE.md unless the task requires it. Confirm scope, then start.

---

## [HK] How to use lean-dev

```
Recommended setup order:
  1. /lean-dev → IG   generate ignore file
  2. /lean-dev → ST   scan and generate STACK.md + ARCHITECTURE.md
  3. /lean-dev → MD   tighten CLAUDE.md
  4. /lean-dev → LD   start working

During a session:
  - LD     start a focused task
  - CM     compact when context gets large
  - /clear start fresh for a new task

Model tiers (baked into all configs):
  search / read     → Haiku
  write / edit      → Sonnet
  architecture      → Opus
```

---

## Always-Active Rules

- Haiku for file search, grep, read-only tasks
- Sonnet for writing and editing code
- Opus only for complex architecture decisions
- After significant changes: "Run `/compact Focus on code changes only`"
- Specific file:line references over broad exploration
- Suggest `/clear` when the user switches to an unrelated task
