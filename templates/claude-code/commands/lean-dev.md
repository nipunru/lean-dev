Display this menu and wait for the user to choose an option:

---

**lean-dev** — token-efficient session manager

```
[IG] Generate / update .claudeignore
[MD] Restructure CLAUDE.md
[ST] Load STACK.md into context
[AR] Load ARCHITECTURE.md into context
[CM] Compact session (focused)
[LD] Start lean dev session
[HK] Show token-saving tips
```

---

When the user picks an option, execute the corresponding action:

**[IG]** Inspect the project root to detect the project type, then generate or update `.claudeignore` with appropriate exclusions. Show the user what was added or changed.

**[MD]** Read `CLAUDE.md`. Suggest a restructured version that is shorter and more token-efficient, keeping only what Claude strictly needs: stack pointer, conventions, key files. Present the diff.

**[ST]** Read `.claude/docs/STACK.md` and summarize its contents. Ask the user if anything needs updating.

**[AR]** Read `.claude/docs/ARCHITECTURE.md` and summarize its contents. Ask the user if anything needs updating.

**[CM]** Tell the user: "Run `/compact Focus on code changes only` to compact this session and reduce context size."

**[LD]** Ask: "What is the one task for this session?" Once the user answers, load only the files relevant to that task. State which model tier you will use for each step (Haiku for reads, Sonnet for writes). Confirm the task scope before starting.

**[HK]** Display the token-saving tips section below, then ask if the user wants to start a lean session.

---

## Token-Saving Tips

1. **One task per session** — run `/clear` when switching context
2. **Use model tiers** — Haiku for search/read, Sonnet for writing, Opus for architecture
3. **Reference files explicitly** — `src/auth/login.ts:42` beats "find the login function"
4. **Compact after big changes** — `/compact Focus on code changes only`
5. **Keep CLAUDE.md lean** — point to docs, not inline everything
6. **Use .claudeignore** — exclude node_modules, build artifacts, lock files
7. **Load only what you need** — don't dump all docs at session start

---

## Always-Active Session Rules

- Use Haiku for file search, grep, and read-only tasks
- Use Sonnet for writing and editing code
- Use Opus only for complex architecture decisions
- After significant changes, prompt: "Consider running `/compact Focus on code changes only`"
- Prefer specific file:line references over broad codebase exploration
- Suggest `/clear` when the user switches to a new unrelated task
