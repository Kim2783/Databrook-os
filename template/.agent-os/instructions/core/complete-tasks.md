# Instruction: Complete Tasks

Run the full quality gate when all tasks in a spec are done. Prepare for PR.

## Preconditions

- All tasks in `tasks.md` are marked `[x]`
- No uncommitted changes (or all changes staged and ready)

## Steps

### 1. Confirm all tasks done

Read `tasks.md` and verify no `[ ]` tasks remain. If any remain, stop and report.

### 2. Layer 4 — Full regression

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
```

If any step fails:
- Fix the issue.
- Append a remediation task to `tasks.md` rather than rewriting history.
- Re-run full gate after fix.

### 3. Verify spec acceptance criteria

Re-read `spec.md` acceptance criteria. Confirm each is demonstrably met.

### 4. Confirm clean workspace

```bash
git status
```

All changes must be committed. No untracked modified files.

### 5. Final commit (if needed)

If minor fixes were made during gate:

```bash
git commit -m "fix(<scope>): address final gate issues for YYYY-MM-DD-slug"
```

Confirm before committing.

### 6. Produce completion summary

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

### 7. Prompt for PR

Ask: "Ready to create a PR? I'll draft the description from the spec."

## Acceptance Criteria

- [ ] All `tasks.md` tasks are `[x]`
- [ ] All four quality gates pass
- [ ] All spec acceptance criteria confirmed met
- [ ] Clean `git status`
- [ ] Completion summary produced
