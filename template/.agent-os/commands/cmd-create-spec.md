# Command: Create Spec

## Purpose

Formalize a clarified idea into a structured specification ready for implementation. Convert brainstorm notes or a validated concept into a complete spec file with acceptance criteria and implementation guidance.

## Problem Statement

Without a formal spec:

- Implementation takes different direction than intended
- Tests and acceptance criteria are unclear
- Multiple interpretations of vague requirements
- No clear definition of done
- Knowledge lives only in heads, not docs

**create-spec** formalizes ideas so implementation is clear and testable.

## Workflow

### Phase 1: Prepare Inputs

```
Step 1: Gather context
→ Context Fetcher: Is there a brainstorm summary? Existing spec?
→ User: Provides idea or references brainstorm notes

Step 2: Determine scope
→ User/Mentor: Rough estimate—small, medium, or large?
   - Small: <4 hours, one file, straightforward
   - Medium: <2 days, multiple files, moderate complexity
   - Large: >2 days, multiple layers, integration effort
```

### Phase 2: Create Spec File

```
Step 3: File creation
→ Date Checker: Get today's date for filename
→ File Creator: Create spec file with template
   Path: agent-os/specs/{date}-{kebab-case-title}.md
   Example: agent-os/specs/2026-03-27-add-quiet-flag.md

Step 4: Fill in spec
→ User/Mentor populate:
   - Initial Prompt (what was requested)
   - Desired Outcome (user-visible result)
   - In Scope / Out of Scope
   - Constraints (project standards)
   - Assumptions
   - Acceptance Criteria (testable)
   - Implementation Notes (files, layers, tests)
```

### Phase 3: Validate

```
Step 5: Mentor review
→ Mentor Agent: Review spec for clarity
   - Clear outcome?
   - Testable criteria?
   - All constraints noted?
   - Realistic scope?

Step 6: Refine if needed
→ User: Address feedback
→ Mentor: Validate refined spec

Step 7: Finalize
→ Save: Spec ready for implementation
```

## Agents Used

1. **Date Checker**: Timestamp for filename
2. **File Creator**: Initialize spec file and template
3. **Mentor Agent**: Review clarity and completeness
4. **Context Fetcher**: Find related specs or patterns

## Inputs

- Clear idea or validated brainstorm notes
- Problem statement (1-2 sentences)
- Success criteria (rough)

## Outputs

### Spec File

```markdown
# Add --quiet Flag for Silent CI Mode

## Initial Prompt

User requested: "Add a --quiet flag so CI environments can suppress normal output without losing error visibility."

## Desired Outcome

- CLI respects --quiet flag
- Stdout is suppressed when flag is set
- Stderr (errors, warnings) still visible
- Exit code reflects success/failure, not verbosity
- Tested in CI simulation

## In Scope

- Implement --quiet flag parsing in CliApp
- Suppress normal output to stdout
- Keep error and warning output
- Document in help text
- Add integration test for --quiet behavior

## Out of Scope

- Configuration file support
- Environment variable alternative (flag only)
- Default quiet mode
- Quiet mode for help/version output (show them anyway)

## Constraints

- Preserve core/infra separation
- No new dependencies
- Maintain 90%+ test coverage
- Keep CLI help text clear

## Assumptions

- Quiet mode applies to normal operation only
- Errors always visible (security/debugging)
- Exit codes unchanged

## Open Questions

None—brainstorm is complete

## Acceptance Criteria

- [ ] --quiet flag recognized and parsed
- [ ] Normal output suppressed when --quiet set
- [ ] Errors and warnings still print
- [ ] --quiet --help shows help (or errors cleanly)
- [ ] Exit code correct for quiet mode
- [ ] Integration test validates quiet behavior
- [ ] Help text documents --quiet option
- [ ] All tests pass with 90%+ coverage

## Implementation Notes

**Files to modify/create:**
- src/infra/cli.ts: Add quiet flag to CliApp
- tests/unit/infra/cli.test.ts: Add quiet tests
- tests/integration/cli.integration.test.ts: Quiet behavior

**Approach:**
1. Add `quiet: boolean` to CliAppOptions
2. Check quiet flag in run() method
3. Suppress output conditionally in main()
4. Update help text
5. Write tests

**Tests needed:**
- Unit: CliApp respects quiet flag
- Unit: Output functions respect quiet
- Integration: Built CLI quiet behavior

**Docs:**
- Update docs/cli-contract.md
- Update README.md if needed
```

## Acceptance Criteria

- [ ] Spec file created with today's date in filename
- [ ] All template sections completed
- [ ] Desired outcome is clear and testable
- [ ] Scope and constraints documented
- [ ] Acceptance criteria are SMART (specific, measurable, achievable)
- [ ] Implementation notes identify exact files
- [ ] Related code patterns referenced
- [ ] Mentor has reviewed for clarity
- [ ] Ready for implementation: YES ✓
- [ ] Spec saved: `.agent-os/specs/{date}-{title}.md`

## Example Workflow

```bash
→ Command: create-spec
  Title: Add --quiet flag
  From: Brainstorm notes (in Context Fetcher)

← Gathering inputs...

→ File Creator: Initialize spec file
← Created: agent-os/specs/2026-03-27-add-quiet-flag.md

[User fills in sections]

→ Mentor Agent: Review this spec for completeness
← Mentor feedback:
   ✓ Clear outcome
   ✓ Good scope
   ✓ Testable criteria
   ✓ Realistic
   
   Minor feedback: Add reference to related --help behavior

[User updates spec]

✓ Spec complete and ready for implementation

Next: Use execute-tasks or create-tasks to break into work items
```

## Integration

After `create-spec`:

- Use **create-tasks** to break spec into task items
- Use **execute-tasks** to work through implementation
- Reference spec file in commit messages: "WIP: 2026-03-27-add-quiet-flag"
- Use spec as acceptance criteria during code review

## See Also

- [brainstorm-spec](cmd-brainstorm-spec.md) - Before creating spec
- [create-tasks](cmd-create-tasks.md) - Break spec into tasks
- [execute-tasks](cmd-execute-tasks.md) - Implement spec
