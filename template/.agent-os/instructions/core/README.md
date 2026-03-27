# Core Workflow Instructions

This folder contains detailed workflow instructions for Agent OS commands. Each file describes a complete workflow including steps, agent usage, and acceptance criteria.

## Files

- `analyse-product.md` — Audit existing codebase and install/validate Agent OS
- `plan-product.md` — Initialize product documentation for a new project
- `brainstorm-spec.md` — Collaborative idea refinement through dialogue
- `create-spec.md` — Generate a formal spec from an approved idea
- `create-tasks.md` — Break an approved spec into a task hierarchy
- `execute-tasks.md` — Implement all tasks with layered testing
- `execute-task.md` — Implement a single task with unit tests
- `complete-tasks.md` — Full regression and final quality gate
- `git.md` — Branch naming, commit conventions, PR standards
- `testing-lifecycle.md` — Layered testing model (unit → integration → regression)
- `mermaid-diagrams.md` — Diagram creation guidelines

## Relationship to Commands

`.agent-os/commands/cmd-*.md` — concise command definitions used as quick reference.
`.agent-os/instructions/core/*.md` — detailed workflow instructions with full implementation guidance.

Commands are the "what"; instructions are the "how".
