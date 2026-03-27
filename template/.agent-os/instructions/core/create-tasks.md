# Instruction: Create Tasks

Translate an approved spec into a hierarchical task list.

## Preconditions

- Spec folder exists: `.agent-os/specs/YYYY-MM-DD-slug/`
- `spec.md` contains `Status: approved` (case-insensitive)

If either precondition fails:
- Missing folder → prompt: "Run `create-spec` first."
- Not approved → prompt: "Add `Status: approved` to spec.md before creating tasks."

## Steps

### 1. Read the spec

Read `spec.md` fully. Note In Scope, Acceptance Criteria, and Implementation Notes.

### 2. Identify task groups

Common sequence for this project:

1. Core logic changes (`src/core/`)
2. Infra/adapter changes (`src/infra/`)
3. Integration wiring (`src/index.ts`)
4. Unit tests
5. Integration tests
6. Documentation

Adjust based on spec scope.

### 3. Write tasks.md

Create `.agent-os/specs/YYYY-MM-DD-slug/tasks.md`:

```markdown
# Tasks — <Feature Title>

Spec: agent-os/specs/YYYY-MM-DD-slug/spec.md

## Task 1 — <Parent Task Name>
- [ ] 1.1 <subtask>
- [ ] 1.2 <subtask>

## Task 2 — <Parent Task Name>
- [ ] 2.1 <subtask>
- [ ] 2.2 <subtask>
```

### 4. Preservation rule

If `tasks.md` already exists:
- Preserve all `[x]` completed tasks.
- Append new tasks after existing ones.
- Do not reorder completed tasks.
- If file is unparsable → append `REVIEW REQUIRED` block and stop.

### 5. Confirm with user

Show task list. Ask: "Does this breakdown look right?"

## Output Summary Format

```
✅ Tasks Created — Spec "YYYY-MM-DD-slug"

Task File: agent-os/specs/YYYY-MM-DD-slug/tasks.md
Tasks Generated: N parent tasks, N subtasks
Status: Ready to execute

Next: run execute-tasks
```

## Acceptance Criteria

- [ ] `tasks.md` created in spec folder
- [ ] All tasks traceable to spec acceptance criteria
- [ ] Tasks right-sized (0.5–4 hours each)
- [ ] User confirmed breakdown
