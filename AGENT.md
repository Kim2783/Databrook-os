# Agent Instructions

This repository uses Databrook OS — an opinionated Agent OS system for structured, AI-assisted development.

## Mission

<!-- TODO: Describe what this project does and who it's for in 1–2 sentences. -->

## Non-Negotiables

1. Keep changes minimal and focused on the request.
2. Update tests for behaviour changes.
3. Keep quality gates green (lint, typecheck, test, build).
4. Prefer explicit types and small, composable functions.
5. Do not add dependencies unless clearly required.

## Delivery Checklist

Before finishing any task, confirm:

- [ ] Lint passes
- [ ] Typecheck passes
- [ ] Tests pass
- [ ] Build passes
- [ ] Docs updated if behaviour changed

## Coding Rules

<!-- TODO: Add project-specific rules, e.g.:
- Use strict TypeScript; avoid `any`
- Keep `src/core` free of IO concerns
- Use pnpm as package manager
-->

## Testing Rules

<!-- TODO: Add project-specific testing rules, e.g.:
- Unit tests mirror src/ structure
- Test user-visible behaviour, not implementation details
-->
- Full lifecycle: `.agent-os/instructions/core/testing-lifecycle.md`

## Standard Feature Workflow

For any non-trivial feature, follow this sequence:

```
brainstorm-spec  →  create-spec  →  [user approves]
    →  create-tasks  →  execute-tasks  →  complete-tasks
```

1. **brainstorm-spec** — refine the idea, confirm scope, surface constraints
2. **create-spec** — write formal spec to `.agent-os/specs/YYYY-MM-DD-slug/spec.md`
3. **Approval** — user adds `Status: approved` to spec.md
4. **create-tasks** — break spec into `tasks.md` in the spec folder
5. **execute-tasks** — implement with layered testing; commit per parent task
6. **complete-tasks** — full gate (lint + typecheck + test + build); prep PR

## Git Workflow

Full reference: `.agent-os/instructions/core/git.md`

**Branch naming:** `<type>/<slug>` — e.g. `feat/add-quiet-flag`

**Commit format:** `<type>(<scope>): <subject>`
- Imperative present tense subject (e.g. "add", not "added")
- Scope = primary module changed

**Confirm before committing:** Always show the full commit message and require explicit user confirmation. Never commit silently.

**PR:** Branch pushed, all quality gates green, completion summary ready.

## Testing Lifecycle

Full reference: `.agent-os/instructions/core/testing-lifecycle.md`

| Layer | When | Command |
|-------|------|---------|
| 1 — Unit | After each subtask | run relevant test file only |
| 2 — Integration | After each parent task | lint + typecheck + test |
| 3 — Regression (opt.) | Mid-spec, cross-layer changes | test + build |
| 4 — Full gate | Before `complete-tasks` | all four quality commands |

## Context Refresh Protocol

At the start of any non-trivial task:
1. Read `.agent-os/product/mission.md` — confirm product scope.
2. Read `.agent-os/product/tech-stack.md` — confirm stack and constraints.
3. Scan the relevant spec folder (`.agent-os/specs/YYYY-MM-DD-slug/`) if continuing existing work.
4. Run `git status` to confirm clean state.

Skip steps already known from recent context. Never assume stale context is current.

## Diagram Creation

When adding architecture, sequence, or state diagrams:
- Use Mermaid syntax embedded in Markdown.
- Full guidelines: `.agent-os/instructions/core/mermaid-diagrams.md`

## Agent Coordination

Use Agent OS agents as appropriate:

- **Context Fetcher**: Before expensive reads; prevents redundant loading
- **Date Checker**: For spec naming and timestamped artifacts
- **File Creator**: For new specs, ADRs, or workflow documents
- **Git Workflow**: For commits, branches, and PR creation after completions
- **Mentor Agent**: For architectural decisions and standards validation
- **Test Runner**: For validating tests pass and coverage thresholds met

Full agent reference: `.agent-os/agents/agents-system.md`

## Command Orchestration

Use high-level commands to orchestrate agents for complex workflows:

- **analyse-product**: Full codebase audit and Agent OS installation
- **plan-product**: New product design and Agent OS setup
- **brainstorm-spec**: Collaborative idea refinement before specs
- **create-spec**: Formalize specs from brainstorm or validated ideas
- **create-tasks**: Break specs into task lists with dependencies
- **execute-tasks**: Work through tasks with validation and tracking
- **complete-tasks**: Full regression gate; confirm criteria met; prep PR
- **mentor**: Interactive guidance on code, architecture, decisions

See `.agent-os/commands/commands.md` for when to use which command.
Detailed workflows: `.agent-os/instructions/core/`

## Source of Truth Docs

Read these first when making non-trivial changes:

- `.agent-os/product/mission.md`
- `.agent-os/product/roadmap.md`
- `.agent-os/product/tech-stack.md`
- `.agent-os/standards/tech-stack.md`
- `.agent-os/standards/code-style.md`
- `.agent-os/standards/best-practices.md`
- `.agent-os/agents/agents-system.md`
