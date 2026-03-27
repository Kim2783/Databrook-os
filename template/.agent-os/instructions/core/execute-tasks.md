# Instruction: Execute Tasks

Implement all parent tasks in order, running layered tests after each.

## Preconditions

- `.agent-os/specs/YYYY-MM-DD-slug/tasks.md` exists
- All prerequisite tasks are unblocked

## Steps per Parent Task

### 1. Announce task

State which parent task is starting and list its subtasks.

### 2. Implement subtasks

Work through each `[ ]` subtask:
- Make the minimal change needed.
- Follow `.agent-os/standards/code-style.md` and `best-practices.md`.
- Keep `src/core` free of IO; keep `src/infra` thin.

### 3. Layer 1 — Task unit tests

After each subtask implementation:
- Write or update unit tests for changed behaviour.
- Run: `pnpm run test -- --run <test file>`
- Fix failures before proceeding.

### 4. Mark subtasks complete

Update `tasks.md`: `[ ]` → `[x]`

### 5. Layer 2 — Parent task integration

After all subtasks in a parent task complete:
- Run full test suite: `pnpm run test`
- Run lint and typecheck: `pnpm run lint && pnpm run typecheck`
- Fix any failures before moving to next parent task.

### 6. Commit parent task

```bash
git add -p
git commit -m "feat(<scope>): <subject>

<bullet summary of changes>

TASK: <parent task name> from YYYY-MM-DD-slug"
```

Confirm before committing (show exact message, require explicit yes).

### 7. Repeat for next parent task

Continue until all parent tasks are complete.

### 8. Layer 3 (optional) — Incremental regression

If spec touches multiple layers or shared interfaces:
- Run: `pnpm run test && pnpm run build`
- Verify integration tests pass end-to-end.

### 9. Hand off to complete-tasks

When all tasks are `[x]`: run `complete-tasks`.

## Acceptance Criteria

- [ ] All tasks in `tasks.md` marked `[x]`
- [ ] All Layer 1 and Layer 2 checks passed
- [ ] Commits made per parent task
- [ ] Ready for `complete-tasks`
