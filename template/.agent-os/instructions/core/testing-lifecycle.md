# Instruction: Testing Lifecycle

Layered test strategy used during task execution and at completion.

## Layer Overview

| Layer | When | Command | Purpose |
|-------|------|---------|---------|
| 1 | After each subtask | `pnpm test -- --run <file>` | Immediate unit validation |
| 2 | After each parent task | `pnpm run lint && pnpm run typecheck && pnpm run test` | Integration confidence |
| 3 | Optional mid-spec | `pnpm run test && pnpm run build` | Incremental regression |
| 4 | Before `complete-tasks` | `pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run build` | Full gate |

---

## Layer 1 — Task Unit Tests

Run immediately after each subtask implementation.

**Goal:** Verify the smallest unit of change is correct before moving on.

**Command:**
```bash
pnpm run test -- --run tests/unit/core/services/my-service.test.ts
```

**Rules:**
- Write the test before or immediately after implementation.
- Test behaviour, not implementation details.
- Must pass before marking subtask `[x]`.

**Coverage target:** New code must maintain project thresholds (90% lines/functions, 80% branches).

---

## Layer 2 — Parent Task Integration

Run after all subtasks in a parent task are marked `[x]`.

**Goal:** Confirm the parent task's parts work together and nothing regressed.

**Command:**
```bash
pnpm run lint && pnpm run typecheck && pnpm run test
```

**Rules:**
- All three must pass before committing the parent task.
- Fix failures immediately — do not accumulate.
- Commit after passing.

---

## Layer 3 — Incremental Regression (Optional)

Run mid-spec when changes span multiple layers or shared interfaces.

**When to use:**
- Services and adapters both modified.
- Shared types changed.
- Mid-point in a large spec.

**Command:**
```bash
pnpm run test && pnpm run build
```

---

## Layer 4 — Full Regression (complete-tasks)

Run once — when all tasks are `[x]`.

**Goal:** Final proof that the complete spec is implemented correctly.

**Command:**
```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
```

All four must pass with zero warnings (lint) and zero type errors before the spec is closed.

---

## Test File Locations

Mirror `src/` structure:
- `src/core/services/greeting-service.ts` → `tests/unit/core/services/greeting-service.test.ts`
- `src/infra/cli.ts` → `tests/unit/infra/cli.test.ts`
- Runtime integration → `tests/integration/cli.integration.test.ts`

---

## Test Writing Rules

- Test user-visible behaviour, not private implementation.
- Use descriptive `it('should ...')` names.
- Use `describe` blocks to group related tests.
- `vi.mock` only at the boundary between layers.
- All test files must pass in isolation.
