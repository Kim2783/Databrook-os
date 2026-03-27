# Command: Create Tasks

## Purpose

Break a specification into concrete, actionable task items with clear acceptance criteria, dependencies, and effort estimates. Transform a spec into a task list ready for execution.

## Problem Statement

A spec is great, but implementation is fuzzy:

- You don't know where to start
- Tasks are too big or too small
- Dependencies hidden until mid-implementation
- No clear order for work
- Acceptance criteria mixing spec validation with task completion
- Effort estimates are guesses

**create-tasks** structures a spec into a prioritized, sequenced task list.

## Workflow

### Phase 1: Analyze Spec

```
Step 1: Review spec
→ User: Open or reference completed spec
→ Mentor Agent: Analyze for natural task breaks

Step 2: Identify layers & components
→ Mentor:
   "Looking at implementation notes, I see:
   - Changes to CliApp (infra)
   - Changes to tests
   - Documentation updates
   
   Let's sequence them..."
```

### Phase 2: Define Tasks

```
Step 3: Break into sequence
→ Mentor guides:
   "Most specs follow this pattern:
   1. Core logic (if any)
   2. Adapter/infra changes
   3. Integration
   4. Tests
   5. Documentation
   
   For your spec, that means..."

Step 4: Create task list
→ File Creator: Create task file
   Path: agent-os/specs/{spec-date}-tasks.md
   Or update existing spec with tasks section

Step 5: Define each task
   Task 1: Update CliApp to recognize --quiet flag
   Task 2: Add output suppression logic
   Task 3: Write unit tests
   Task 4: Write integration tests
   Task 5: Update documentation
```

### Phase 3: Refine & Validate

```
Step 6: Estimate effort
→ Mentor: "How long for each task?"
   - Task 1: 30 min (straightforward)
   - Task 2: 45 min (requires understanding quiet state)
   - Task 3: 1 hour (comprehensive test coverage)
   etc.

Step 7: Identify dependencies
→ Mentor: "Can these run in parallel? Which must sequence?"
   - Task 1 → Task 2 (must have flag parsing first)
   - Task 2 → Task 3, 4 (need implementation before testing)
   - Task 5 (documentation) can start anytime

Step 8: Finalize priority
→ Mentor: "This order makes sense?"
   User validates
```

## Agents Used

1. **Mentor Agent**: Analyze spec, guide task breakdown
2. **File Creator**: Create task tracking file
3. **Context Fetcher**: Reference related specs or past task patterns

## Inputs

- Completed specification file
- Team size/capacity (optional)
- Timeline (optional)

## Outputs

### Task List Document

```markdown
# Tasks for: Add --quiet Flag (2026-03-27)

Parent Spec: agent-os/specs/2026-03-27-add-quiet-flag.md

## Summary
- Total estimated effort: 3.5 hours
- Recommended approach: Sequential (4 dependency chains)
- Ready to execute: YES ✓

## Task 1: Update CliApp Parsing
- **Effort**: 30 min (3/10 complexity)
- **Depends on**: Nothing
- **Files**: src/infra/cli.ts
- **Work**:
  1. Add quiet flag recognition in CliApp.run()
  2. Store quiet state in CliResult
  3. Update CliAppOptions interface
- **Definition of done**:
  - Flag is parsed correctly
  - quiet: true when --quiet present
  - quiet: false otherwise

## Task 2: Suppress Output When Quiet
- **Effort**: 45 min (4/10 complexity)
- **Depends on**: Task 1
- **Files**: src/index.ts, src/infra/cli.ts
- **Work**:
  1. Check quiet state before writing to stdout
  2. Update main() to accept quiet flag
  3. Test suppression logic
- **Definition of done**:
  - Stdout suppressed when quiet
  - Stderr still visible
  - Help and version visible regardless

## Task 3: Unit Test CLI Quiet Flag
- **Effort**: 1 hour (5/10 complexity)
- **Depends on**: Task 1, 2
- **Files**: tests/unit/infra/cli.test.ts
- **Work**:
  1. Test --quiet flag parsing
  2. Test output with quiet mode
  3. Test quiet conflicts (--quiet --help = error)
  4. Test quiet with errors
- **Acceptance**:
  - All quiet scenarios tested
  - 100% coverage of quiet-related code

## Task 4: Integration Test Quiet CLI
- **Effort**: 1 hour (5/10 complexity)
- **Depends on**: Task 2
- **Files**: tests/integration/cli.integration.test.ts
- **Work**:
  1. Test built CLI with --quiet flag
  2. Verify output suppression in real execution
  3. Test error visibility in quiet mode
- **Acceptance**:
  - Integration test passes
  - Quiet behavior working end-to-end

## Task 5: Update Docs
- **Effort**: 30 min (2/10 complexity)
- **Depends on**: Nothing (but after Task 2 best)
- **Files**: docs/cli-contract.md, README.md
- **Work**:
  1. Document --quiet in CLI contract
  2. Add example usage in README
  3. Explain quiet mode behavior
- **Acceptance**:
  - --quiet documented
  - Examples show quiet + errors
  - Clarifies stdout vs stderr behavior

## Critical Path
Task 1 → Task 2 → Tasks 3 & 4 (parallel) → Task 5

## Ready to Execute
→ Next: Execute tasks in order using execute-tasks command
   Tracking: agent-os/specs/2026-03-27-add-quiet-flag-tasks.md
```

## Acceptance Criteria

- [ ] Each task has clear definition of done
- [ ] Tasks are sequenced correctly (dependencies clear)
- [ ] Effort estimates are realistic (align with team velocity)
- [ ] Tasks are right-sized (1-4 hours each, ideally)
- [ ] Specification links to tasks
- [ ] No vague tasks ("clean up", "refactor")
- [ ] Ready to execute: YES ✓

## Task Design Patterns

### Good Task Definition

```
Task: Update CliApp Parsing

Definition: Add --quiet flag recognition
- [ ] Parse --quiet in CliApp.run()
- [ ] Store flag state in CliResult
- [ ] Update CliAppOptions interface
- [ ] Add type annotations

Done when:
- Flag recognized: --quiet sets quiet: true
- Flag absent: quiet: false
- No breaking changes to existing flags
```

### Avoid

```
Task: Implement quiet feature (❌ too vague)
Task: Fix everything (❌ meaningless)
Task: Improve code (❌ not specific)
Task: Work on CLI (❌ too broad)
```

## Task Effort Guide

| Effort | Duration | Complexity | Characteristics |
|--------|----------|-----------|-----------------|
| 30 min | 0.5h | 2/10 | Obvious, straightforward, one file |
| 1 hour | 1h | 4/10 | Clear scope, requires thought, multi-file prep |
| 2 hours | 2h | 6/10 | Gaps to discover, integration needed |
| 4+ hours | 4h+ | 8+/10 | Unknown factors, complex integration |

Break 4h+ tasks into smaller pieces.

## Integration

After `create-tasks`:

- Use **execute-tasks** to work through task list
- Reference task file in work tracking: "WIP: Task 3 quiet flag tests"
- Check off completed tasks as you finish
- Use task dependencies to plan work parallelization

## Example Workflow

```bash
→ Command: create-tasks
  From spec: 2026-03-27-add-quiet-flag.md

← Mentor: Analyzing spec structure...
← File Creator: Creating task list...

✓ Task list created:
  - 5 tasks
  - 3.5 hours total effort
  - Sequential with parallel phases

Task breakdown saved:
  agent-os/specs/2026-03-27-add-quiet-flag-tasks.md

Ready to execute?
→ Next: execute-tasks with this task list
```

## See Also

- [create-spec](cmd-create-spec.md) - Before creating tasks
- [execute-tasks](cmd-execute-tasks.md) - Work through tasks
- [mentor](cmd-mentor.md) - Use for task questions
