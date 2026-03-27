# Command: Complete Tasks

## Purpose

Run the full quality gate when all tasks in a spec are done. Confirm acceptance criteria, verify clean workspace, and prepare the branch for PR.

## Problem Statement

After finishing implementation:

- Quality gates not run in full before PR
- Spec acceptance criteria not re-verified against the implementation
- Workspace has uncommitted changes or debugging artifacts
- No clear signal that the spec is actually done

**complete-tasks** provides a deterministic close-out sequence so "done" means done.

## Workflow

### Pre-flight Checks

```
Step 1: Confirm all tasks complete
→ Context Fetcher: Read tasks.md
→ "Are all tasks marked [x] ?"
→ If any [ ] remain: STOP — return to execute-tasks

Step 2: Confirm clean workspace
→ Git Workflow: git status
→ Any uncommitted changes? Stage and commit before continuing
```

### Layer 4 — Full Regression

```
Step 3: Lint
→ Test Runner: pnpm run lint
→ Zero warnings required. Fix any failures immediately.

Step 4: Typecheck
→ Test Runner: pnpm run typecheck
→ Zero errors required.

Step 5: Full test suite
→ Test Runner: pnpm run test
→ All tests must pass. Coverage thresholds must hold
   (90% lines/functions, 80% branches).

Step 6: Build
→ Test Runner: pnpm run build
→ Production build must succeed with no errors.
```

### Acceptance Criteria Review

```
Step 7: Verify spec criteria
→ Context Fetcher: Read spec.md acceptance criteria
→ Mentor Agent: Confirm each criterion is demonstrably met
→ "Is each acceptance criterion satisfied by the implementation?"
```

### Close Out

```
Step 8: Final commit (if needed)
→ Git Workflow: Commit any remediation fixes
   Format: "fix(<scope>): address final gate issues
   
   TASK: gate remediation for YYYY-MM-DD-slug"
→ Confirm before committing

Step 9: Produce completion summary
→ Format shown in Outputs section below

Step 10: Prompt for PR
→ "Ready to create a PR? I'll draft the description from the spec."
```

## Agents Used

| Agent | Role |
|-------|------|
| Context Fetcher | Read tasks.md and spec.md |
| Test Runner | Execute all quality gates |
| Git Workflow | Clean workspace, stage, commit |
| Mentor Agent | Validate acceptance criteria met |

## Inputs

- `spec-slug` — identifies which spec's tasks.md and spec.md to use
- Or read `tasks.md` from current context

## Outputs

### Completion Summary

```
✅ Tasks Complete — Spec "YYYY-MM-DD-slug"

Quality Gates:
  Lint:       ✅
  Typecheck:  ✅
  Tests:      ✅  (N passing, N% coverage)
  Build:      ✅

Spec Criteria Met: N/N
Commits: N

Ready for: PR / code review
```

### On Failure

```
❌ Gate Failure — Spec "YYYY-MM-DD-slug"

Failing gate: <lint|typecheck|test|build>
Errors: <summary>

Action required: Fix failures, then re-run complete-tasks.
```

## Acceptance Criteria

- [ ] All `tasks.md` tasks are `[x]`
- [ ] `pnpm run lint` passes with zero warnings
- [ ] `pnpm run typecheck` passes with zero errors
- [ ] `pnpm run test` passes, coverage ≥ thresholds
- [ ] `pnpm run build` succeeds
- [ ] All spec acceptance criteria confirmed met
- [ ] Clean `git status`
- [ ] Completion summary produced

## Example

```
→ Command: complete-tasks spec-slug:"2025-01-15-add-quiet-flag"

→ Context Fetcher reads tasks.md: all 8 tasks [x] ✅
→ git status: clean ✅
→ pnpm run lint: 0 problems ✅
→ pnpm run typecheck: 0 errors ✅
→ pnpm run test: 15/15 passing, 96.4% coverage ✅
→ pnpm run build: success ✅
→ Mentor: all 5 acceptance criteria confirmed met ✅

✅ Tasks Complete — "2025-01-15-add-quiet-flag"
Ready for PR.
```

## Instruction Reference

Detailed steps: `.agent-os/instructions/core/complete-tasks.md`
