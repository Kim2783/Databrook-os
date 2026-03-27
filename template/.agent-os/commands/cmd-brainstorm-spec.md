# Command: Brainstorm Spec

## Purpose

Explore and refine ideas through natural, collaborative dialogue before formalizing into a structured specification. Clarify scope, uncover hidden assumptions, and establish shared understanding.

## Problem Statement

Jumping directly from a rough idea to a formal spec:

- Miss important edge cases or constraints
- Discover midway through implementation that scope wasn't clear
- Assumptions go unspoken until they conflict
- Stakeholders realize they had different understandings
- Time wasted on false starts

**brainstorm-spec** is a structured conversation that clarifies thinking before committing to a spec.

## Workflow

### Phase 1: Seed the Conversation

```
Step 1: User presents initial idea
→ User: "I want to add a --quiet flag"
→ Mentor Agent: "Interesting! Let's explore this."

Step 2: Mentor asks discovery questions
→ Mentor:
   - "What is the user problem we're solving?"
   - "Who uses --quiet and why?"
   - "When should --quiet be available?"
   - "What happens when --quiet is set?"
   - "Are there conflicts with other flags or modes?"
```

### Phase 2: Explore & Clarify

```
Step 3: User answers and elaborates
→ User: "Developers running in CI want silent output..."
→ Mentor: "Got it. Continue..."

Step 4: Mentor probes assumptions
→ Mentor:
   - "When you say 'silent', do you mean no stdout AND no stderr?"
   - "What if an error occurs in quiet mode—should we report it?"
   - "Does quiet affect the exit code?"
   - "Should --quiet work with --help or --version?"

Step 5: User refines understanding
→ User: "Ah, stderr should still print... quiet is just outputs"
→ Mentor: "So errors and warnings visible, but regular output suppressed?"
```

### Phase 3: Validate & Synthesize

```
Step 6: Mentor reflects back
→ Mentor:
   "Let me confirm what I'm hearing:
   - --quiet suppresses normal output (stdout)
   - Errors, warnings, help all still visible
   - Works in CI; tested with CI systems
   - Exit codes unchanged
   
   Did I get that right?"

Step 7: User validates or refines
→ User: "Yes, and also it should respect exit codes..."
→ Mentor: "Already noted—exit codes are the contract"

Step 8: Scope crystallizes
→ Mentor: "Here's what I understand we're building..."
   [Summary of refined idea]
```

### Phase 4: Ready for Spec

```
Step 9: Is this ready?
→ Mentor: "Before we write a spec, do we have shared understanding?"
→ User: "Yes, I think so"

Step 10: Offer next steps
→ Mentor:
   "Great! You're ready for create-spec.
   
   I've noted the key points:
   ✓ Scope: --quiet flag, suppresses normal output
   ✓ Constraints: Errors/warnings visible, exit codes unchanged
   ✓ Testing: CI scenario validation
   ✓ Non-goals: Configuration file support, default quiet mode
   
   Next: Create formal spec with these points"
```

## Agents Used

1. **Mentor Agent**: Primary (Socratic questioning, validation)
2. **Context Fetcher**: Optional (reference existing similar features)

## Inputs

- Initial idea (can be vague)
- Context or use case
- Any known constraints

## Outputs

### Brainstorm Summary

```
Date: 2026-03-27
Idea: Add --quiet flag to CLI

Key Points Clarified
--------------------
✓ Problem: CI environments need silent output mode
✓ Scope: Suppress normal output, keep errors visible
✓ Exit codes: Unchanged
✓ Behavior with other flags: Incompatible with --help (error)
✓ Testing: Validate in CI pipeline simulation
✓ Configuration: No config file support (out of scope)

Assumptions
-----------
- Quiet mode is opt-in (flag only, no env var)
- Exit code reflects success/failure, not verbosity
- Errors still help debugging

Open Questions (None—resolved in brainstorm)

Ready for Spec: YES ✓
Suggested Title: "Add --quiet flag for silent CI mode"
```

### Reference for Spec Creation

```
Use these notes when running create-spec:

Title: Add --quiet flag for silent CI mode
Problem: CI environments need output suppression without losing errors
Scope: 
  - Suppress normal output (stdout)
  - Keep errors and warnings visible
  - Exit codes unchanged
  - Error with --help
Acceptance Criteria:
  - [ ] --quiet suppresses output
  - [ ] Errors still visible
  - [ ] Exit code reflects success/failure
  - [ ] --quiet --help returns error
```

## Acceptance Criteria

- [ ] Initial idea has been explored from multiple angles
- [ ] Key assumptions are surfaced and validated
- [ ] Scope is clear (what's in, what's out)
- [ ] Constraints and trade-offs discussed
- [ ] No major open questions remain
- [ ] Shared understanding confirmed between user and Mentor
- [ ] Summary notes prepared for spec creation
- [ ] User confident moving to formal spec

## Example: Multi-Round Brainstorm

```
→ Command: brainstorm-spec
  Idea: Better error messages

← Mentor: Tell me about these errors.

→ User: Our errors are confusing. People don't know what to do.

← Mentor: What errors come up most? Give me an example.

→ User: Invalid argument errors, missing required files

← Mentor: When they see "invalid argument", what do they need?
   The name of the argument? What it should be?

→ User: Yes, and maybe an example of correct usage.

← Mentor: So the error should show:
    "Invalid argument: --config"
    "Usage: cli-tool --config <file>"
    "Example: cli-tool --config config.json"
    
    That would help?

→ User: Perfect. And context about where the error happened.

← Mentor: Like the current command/context? Or the file/line?

→ User: Both would be great for debugging.

← Mentor: Alright. So:
    ✓ Show argument name and valid format
    ✓ Include usage example
    ✓ Show command context
    ✓ Show where it failed (file, line if applicable)
    
    Am I right?

→ User: Yes! That's exactly it.

← Mentor: Great. Ready for spec? I'll have these points ready.

✓ Brainstorm complete. Ready for create-spec.
```

## Patterns in Brainstorming

| Issue | Mentor Probes |
|-------|-------------|
| Vague scope | "What's included and what's not?" |
| Undefined success | "How will we know this is done?" |
| Hidden assumptions | "You're assuming...—is that right?" |
| Edge cases | "What if...?" |
| Conflicts | "This conflicts with...—how do we resolve?" |
| Tradeoffs | "We could do A or B, but...—which matters more?" |

## Integration

After `brainstorm-spec`:

- Use **create-spec** immediately with the brainstorm notes
- Reference the summary in the spec's "Initial Prompt" section
- Keep brainstorm notes for context in PRs or discussions

## See Also

- [create-spec](cmd-create-spec.md) - Formalize after brainstorm
- [mentor](cmd-mentor.md) - For deeper dives on specific questions
