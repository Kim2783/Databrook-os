# Instruction: Create Spec

Generate a formal specification for an approved idea and write it to a dated spec folder.

## Preconditions

- A clear idea or brainstorm output exists.
- User has confirmed scope and intent.

## Steps

### 1. Get today's date

Use Date Checker agent to get `YYYY-MM-DD`.

### 2. Derive the slug

Convert the feature title to `kebab-case`. Example: "Add quiet flag" → `add-quiet-flag`.

### 3. Create spec folder

```
agent-os/specs/YYYY-MM-DD-slug/
├── spec.md
└── sub-specs/     (create only if needed)
```

### 4. Write spec.md

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

### 5. Review and approve

Show spec to user. Ask for any corrections.
When approved, user adds (or confirms adding):

```
Status: approved
```

## Acceptance Criteria

- [ ] Spec folder `.agent-os/specs/YYYY-MM-DD-slug/` created
- [ ] `spec.md` complete with all sections
- [ ] Acceptance criteria are testable
- [ ] User has approved (`Status: approved` present)
- [ ] Ready to run `create-tasks`
