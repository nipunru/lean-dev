# Agent Instructions

## Model Selection

| Task | Model |
|------|-------|
| File search, grep, read | Smallest capable model |
| Planning, analysis | Mid-tier model |
| Writing, editing code | Mid-tier model |
| Complex refactor, architecture | Most capable model |

## File Routing

- Read-only tasks (search, grep, inspect): prefer fast, cheap models
- Write tasks (editing, creating files): use the standard model
- Design and architecture decisions: use the full model

## Session Rules

- One task per agent run
- Reference specific files and line numbers
- Don't explore broadly — use targeted reads
- Load only the context the task requires

## Code Style

- Match existing patterns in the file being edited
- No comments explaining what the code does
- No features, refactors, or abstractions beyond what was asked
- No error handling for scenarios that can't happen

## Project Context

See ARCHITECTURE.md for project structure.
See STACK.md for tech stack details.

## Conventions

- [fill in: naming conventions, formatting, patterns]

## Key Files

- [fill in: entry points, config files, files agents should know about]
