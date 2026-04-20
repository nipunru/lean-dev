# GitHub Copilot Instructions

## Model Usage

Use the most efficient model for each task:
- Reading and searching code → lightweight completion
- Writing and editing code → standard model
- Architecture decisions and planning → extended thinking

## Session Efficiency

- Focus on one task at a time
- Reference specific files and line numbers when possible
- Only load context needed for the current task
- Don't re-read files already provided in context

## Response Style

- Be concise — skip explanations the user didn't ask for
- No trailing summaries of what you just did
- Prefer `file.ts:42` references over quoting large blocks
- Don't add features, refactors, or abstractions beyond what was asked

## Code Style

- Match existing patterns in the file being edited
- No comments explaining what the code does
- No error handling for scenarios that can't happen
- No backwards-compatibility shims unless explicitly asked
