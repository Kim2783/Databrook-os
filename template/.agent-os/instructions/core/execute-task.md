# Instruction: Execute Task (Single)

Implement one specific task with unit tests and a focused commit.

## Input

Task identifier — e.g. `id:"1.2"` or a quoted task description.

## Steps

### 1. Locate task

Find the task in `tasks.md`. Read parent context to understand intent.

### 2. Implement

Make the minimal change needed:
- `src/core/` for business logic.
- `src/infra/` for adapters and wiring.
- Follow project standards (`.agent-os/standards/`).

### 3. Write unit tests

- Add tests in the appropriate `tests/unit/` file.
- Tests must cover the new behaviour and edge cases.

### 4. Run task unit cycle

```bash
pnpm run test -- --run <relevant test file>
pnpm run typecheck
pnpm run lint
```

Fix all failures.

### 5. Mark complete

In `tasks.md`: `[ ] 1.2 ...` → `[x] 1.2 ...`

### 6. Focused commit

```bash
git commit -m "feat(<scope>): <subject>

TASK: 1.2 — <task name>"
```

Confirm before committing.

## Acceptance Criteria

- [ ] Task implementation complete
- [ ] Unit tests written and passing
- [ ] Lint and typecheck clean
- [ ] Task marked `[x]` in `tasks.md`
- [ ] Commit made with task reference
