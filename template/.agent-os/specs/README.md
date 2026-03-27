# Specs

This folder contains feature specifications. Each spec lives in a dated folder and tracks the full lifecycle from idea to implementation.

## Folder Convention

Each spec uses:**`YYYY-MM-DD-feature-slug/`**

Example: `.agent-os/specs/2025-01-15-add-quiet-flag/`

```
agent-os/specs/YYYY-MM-DD-feature-slug/
├── spec.md          # Primary spec — problem, scope, acceptance criteria
├── tasks.md         # Task breakdown (created by create-tasks)
└── sub-specs/       # Technical deep-dives (create only if needed)
    └── parser.md
```

## When to Create a Spec

Create a spec when:
- The prompt affects multiple files or layers
- Behaviour is ambiguous or under-defined
- Acceptance criteria are not yet explicit
- The work needs durable planning context before implementation

Small, obvious edits can skip a formal spec.

## Spec Lifecycle

```
brainstorm-spec  →  create-spec  →  [Status: approved]
    →  create-tasks  →  execute-tasks  →  complete-tasks
```

A spec must have `Status: approved` in `spec.md` before `create-tasks` runs.

## spec.md Template

```markdown
# <Feature Title>

Status: draft

## Initial Prompt

> <paste the request verbatim>

## Desired Outcome

<1–2 paragraphs describing the user-visible result>

## In Scope

- <smallest required change>
- <supporting changes>

## Out of Scope

- <explicit non-goals>

## Constraints

- Preserve `src/core` / `src/infra` separation.
- No new dependencies unless clearly justified.
- Maintain 90%+ test coverage.
- Keep `lint`, `typecheck`, `test`, `build` green.

## Assumptions

- <assumption>

## Open Questions

- <question> (or "None")

## Acceptance Criteria

- [ ] <observable user-facing behaviour>
- [ ] <testable outcome>
- [ ] `pnpm run lint` passes
- [ ] `pnpm run typecheck` passes
- [ ] `pnpm run test` passes
- [ ] `pnpm run build` passes

## Implementation Notes

**Files to change:**
- `src/...`
- `tests/...`

**Approach:**
1. ...
2. ...
```

## tasks.md Template

Created by `create-tasks`. Do not create by hand.

```markdown
# Tasks — <Feature Title>

Spec: agent-os/specs/YYYY-MM-DD-slug/spec.md

## Task 1 — <Parent Task Name>
- [ ] 1.1 <subtask>
- [ ] 1.2 <subtask>

## Task 2 — <Parent Task Name>
- [ ] 2.1 <subtask>
```

## Authoring Guidance

- Use `brainstorm-spec` to refine scope before `create-spec`.
- Prefer user-visible outcomes over implementation details.
- Convert vague requests into explicit acceptance criteria.
- Separate confirmed facts from assumptions.
- Full instruction: `.agent-os/instructions/core/create-spec.md`

- Keep the first version minimal; refine only as new information appears.