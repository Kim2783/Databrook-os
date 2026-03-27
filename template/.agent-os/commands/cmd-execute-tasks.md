# Command: Execute Tasks

## Purpose

Work through a task list systematically with validation, testing, and completion tracking. Ensures each task shipped with quality, and progress is visible.

## Problem Statement

When implementing a spec:

- Tasks done in unclear order, causing rework
- Tests not validated until the end
- Coverage drops or regressions introduced
- No clear record of what's done
- Difficult to context-switch without losing progress
- Commits are sparse or unclear

**execute-tasks** structures implementation into clear, trackable work items with validation at each step.

## Workflow

### Task Startup

```
Step 1: Identify next task
→ Context Fetcher: Review task list, dependencies
→ "Which tasks are unblocked?"

Step 2: Start task
→ Git Workflow: Create branch for task
   Branch: feat/add-quiet-flag-{task-name}
   Example: feat/add-quiet-flag-cli-parsing

Step 3: Summarize task
→ Mentor Agent: Clarify task definition of done
→ "What do we need for Task 1 to be complete?"
```

### Task Work

```
Step 4: Implement
→ User: Work through implementation
→ Context Fetcher: Reference similar code in codebase
→ Mentor: Use for questions and learning

Step 5: Self-validation
→ User: "I think this is done..."
→ Mentor: Review approach
→ "Does this meet the definition of done?"
```

### Task Completion & Validation

```
Step 6: Test & validate
→ Test Runner: Run tests for this task
→ "Did tests pass? Coverage okay?"

Step 7: Verify completion
→ Task list checklist: Update task status
   [x] Task 1 complete
   
→ Mentor: Final review
   "Everything looks right? Ready for next task?"

Step 8: Commit
→ Git Workflow: Commit with clear message
   Conventional Commit: feat(infra): add --quiet flag parsing
   Reference task: Task 1 of 2026-03-27-add-quiet-flag
```

## Parallel Execution

```
For independent tasks:

Task 1 (CLI parsing) → complete
Task 2 (Output suppression) → depends on Task 1
Task 3 (Unit tests) → complete in parallel with Task 2
Task 4 (Integration) → depends on Task 2

→ Git Workflow: Can work on both:
   Branch 1: feat/add-quiet-flag-unit-tests
   Branch 2: feat/add-quiet-flag-output
   
   Merge in sequence (3 then 2+3) to keep main clean
```

## Full Workflow

```
Task 1: Update CliApp Parsing
---------------------------------
→ Git Workflow: Create branch
← Branch: feat/add-quiet-flag-parsing

→ Mentor: Clarify task
← Definition of done: 
   - --quiet recognized
   - quiet state in CliResult
   - Types updated

→ Implement in src/infra/cli.ts
→ Context Fetcher: Reference existing CliApp patterns
→ Mentor: Review approach

→ Test Runner: Run lint, typecheck, tests
← Build: ✓ Clean
← Tests: ✓ Existing tests still pass

→ Mentor: Does this meet the definition of done?
← Yes, but consider: what if --quiet is used with --help?

→ User: Add check for that conflict
→ Test Runner: Validate again
← Tests: ✓ All pass

→ Git Workflow: Commit and push
   Message: feat(infra): add --quiet flag parsing
   Description: 
     Adds --quiet flag recognition to CliApp.
     Returns error if used with --help (conflicting modes).
     Tests validate parsing and conflicts.
     Refs: Task 1 of 2026-03-27-add-quiet-flag

✓ Task 1 complete
→ Next: Task 2
```

## Agents Used

1. **Mentor Agent**: Clarify task, review approach
2. **Test Runner**: Validate implementation, coverage
3. **Git Workflow**: Branch, commit, push
4. **Context Fetcher**: Reference patterns and code
5. **File Creator**: Track tasks (optional, for documentation)

## Inputs

- Task list (from create-tasks)
- Task definitions and acceptance criteria
- Current codebase

## Outputs

### Task Progress Tracking

```markdown
# Task Execution: Add --quiet Flag

## Status: In Progress
Date started: 2026-03-27
Tasks completed: 1/5

## Task 1: Update CliApp Parsing
- Status: ✓ COMPLETE
- Duration: 32 min (estimate: 30 min)
- Branch: feat/add-quiet-flag-parsing
- Commit: abc1234
- Validation: 
  - [x] Build clean
  - [x] Tests passing (15/15)
  - [x] Coverage 95%+
- Notes: Added conflict check for --quiet + --help

## Task 2: Suppress Output When Quiet
- Status: IN PROGRESS
- Duration: 23 min so far
- Branch: feat/add-quiet-flag-output
- Current file: src/index.ts

## Task 3-5: Pending (unblocked after Task 2)

## Summary
✓ On track. Expected completion: 3.5 hours.
```

### Commit Log

```
feat(infra): add --quiet flag parsing
  Task 1 of add-quiet-flag spec
  Refs: 2026-03-27-add-quiet-flag

feat(infra): suppress output when quiet flag set
  Task 2 of add-quiet-flag spec
  - stdout suppressed when quiet: true
  - stderr still visible
  - help/version unaffected by quiet
  Refs: 2026-03-27-add-quiet-flag

test(infra): add unit tests for quiet flag
  Task 3 of add-quiet-flag spec
  - CLI parsing with --quiet
  - Output suppression
  - Conflict detection
  Coverage: 100% for quiet code paths
  Refs: 2026-03-27-add-quiet-flag
```

## Acceptance Criteria per Task

- [ ] Task definition of done is achieved
- [ ] All tests pass (locally and in CI)
- [ ] Coverage thresholds met
- [ ] Code reviewed (by Mentor or peer)
- [ ] Commit message is clear and conventional
- [ ] Task marked complete in task tracking
- [ ] Next task unblocked (dependencies resolved)

## Example Task Execution

```bash
→ Command: execute-tasks
  Task list: agent-os/specs/2026-03-27-add-quiet-flag-tasks.md

← Ready to work through tasks?

→ Start Task 1

← Git Workflow: Create branch feat/add-quiet-flag-parsing
← Mentor: Task 1 definition of done:
   ✓ Parse --quiet flag
   ✓ Store in CliResult
   ✓ Handle conflicts

[User implements]

→ Test Runner: Validate Task 1
← Build: ✓
  Tests: ✓ (15 passed)
  Coverage: 95.77% ✓

→ Mentor: Review against definition of done
← ✓ Complete. Ready to commit and continue.

→ Git Workflow: Commit Task 1
← Committed: feat(infra): add --quiet flag parsing

[Repeat for Tasks 2-5]

✓ All tasks complete
→ Ready for: Code review, merge, release
```

## Task Completion Checklist

For each task, ensure:

- [ ] Definition of done is clear and met
- [ ] Lint passes: `pnpm run lint`
- [ ] Types check: `pnpm run typecheck`
- [ ] Tests run: `pnpm run test`
- [ ] Coverage maintained or improved
- [ ] Code reviewed (by Mentor or team)
- [ ] Commit message follows Conventional Commits
- [ ] Branch pushed and task marked done
- [ ] Next task unblocked

## Staying on Track

| Issue | Recovery |
|-------|----------|
| "I forgot what I was doing" | Review branch name and task definition; check Context Fetcher |
| "This is harder than estimated" | Use Mentor to tackle complexity; break into smaller steps |
| "Tests failing for unclear reason" | Use Test Runner diagnosis; ask Mentor for pattern help |
| "Lost in the code" | Step back; review task definition of done; simplify approach |
| "Dependencies appeared" | Discuss with Mentor; resequence if needed; update task list |

## Integration

During `execute-tasks`:

- Use **mentor** for design/implementation questions
- Use **test-runner** after each task completes
- Use **git-workflow** for commits and pushes
- Update task list as you complete tasks
- Reference task in all commits and discussions

## See Also

- [create-tasks](cmd-create-tasks.md) - Before executing
- [mentor](cmd-mentor.md) - For guidance during execution
- [test-runner](agent-test-runner.md) - For validation
- [git-workflow](agent-git-workflow.md) - For commits and branches
