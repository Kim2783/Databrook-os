# Command: Mentor

## Purpose

Get interactive guidance and support through Socratic questioning on code decisions, architectural choices, and implementation approaches. Learn by thinking through problems with expert guidance.

## Problem Statement

During development, engineers face decisions without clear paths:

- "Where should this logic go? Core or infra?"
- "This is getting complicated—am I doing this right?"
- "Why did the test fail? How do I debug?"
- "Is this the best pattern for this problem?"

**mentor** provides structured, educational guidance through questioning rather than direct answers.

## Workflow

### Flexible Interaction Pattern

```
Step 1: Bring your question or code
→ User: "I'm stuck on this file structure"
→ Or: [Paste code]
→ Or: "How do I approach error handling?"

Step 2: Mentor asks clarifying questions
→ Mentor:
   - "Tell me about the problem you're solving"
   - "What have you tried so far?"
   - "What's the constraint here?"
   - "What would good look like?"

Step 3: Think out loud
→ User: Works through the problem with Mentor's guidance
→ Mentor: Asks follow-up questions, provides context
→ Reference: Past patterns, project standards, best practices

Step 4: Arrive at understanding
→ User: Realizes the answer or decision
→ Mentor: Validates approach, suggests resources
```

## Five Common Mentor Patterns

### Pattern 1: Architectural Decision

```
→ User: "Should I put this in core or infra?"

← Mentor: "Let's think about it.
   - What does this code do—does it touch I/O?
   - Is it pure business logic or framework-specific?
   - If you moved to a different framework, would this code still work?"

→ User: "It's pure business logic. Would work in API, CLI, scripts..."

← Mentor: "So it belongs in core. Let's design it as a service.
   Remember greeting-service.ts? Similar pattern?"
```

### Pattern 2: Test Failure Debugging

```
→ User: "This test is failing but I don't understand why"

← Mentor: "Let's debug together. What's the test trying to do?

   Run it and tell me:
   1. What did you expect?
   2. What actually happened?
   3. What's the difference?"

→ User: "Expected X, got Y—they're off by..."

← Mentor: "Aha! Look at line 32. What happens there?
   Think about the input... what's being passed?"

→ User: "Oh! I see the bug now..."
```

### Pattern 3: Learning a Pattern

```
→ User: "I don't understand this interface pattern"

← Mentor: "Let's break it down. Interfaces define contracts.
   
   Think about it: if I give you a function that returns something,
   what do you need to know about that thing?
   
   That's what an interface tells you."

→ User: "So CliIo is a contract for I/O?"

← Mentor: "Exactly! What does CliIo promise?"

→ User: "[Reads interface] It promises stdout, stderr, exitCode methods"

← Mentor: "Right. And because it's a contract:
   - In production, write() goes to console
   - In tests, we mock it to capture output
   
   Does that pattern make sense now?"
```

### Pattern 4: Stuck on Complexity

```
→ User: "This is getting too complex. Am I over-engineering?"

← Mentor: "Let's step back. What's the minimal version
   that solves the problem?
   
   What can we remove and still have it work?"

→ User: "We could skip X and Y for now..."

← Mentor: "Try that. Remember: simple first, complex if needed.
   Once it works simply, you can add sophistication.
   
   What's the simplest version?"
```

### Pattern 5: Code Review Perspective

```
→ User: "Can you review this approach before I code it?"

← Mentor: "Walk me through it.
   - What problem does this solve?
   - What are the trade-offs?
   - How does it fit with existing code?
   - What could go wrong?"

→ User: "[Explains approach]

← Mentor: "I see. Looks solid. One thing: have you considered...?
   Here's how others handle it: [reference].
   
   Your approach is good because...
   Consider also..."
```

## Agents Used

1. **Mentor Agent**: Primary (Socratic questioning, guidance)
2. **Context Fetcher**: Reference existing patterns and code
3. **Test Runner**: If diagnosing test failures

## Inputs

- Question, problem, or code
- Context or background
- Any error messages or output

## Outputs

### Learning & Guidance

```
Mentor Response:
- Clarifying questions that help you think
- Reference to relevant patterns in codebase
- Links to documentation
- Suggested approaches (not just one answer)
- Follow-up questions to deepen understanding

Example:
"Three approaches here:
1. Simple: [description]
2. Moderate: [description]
3. Complex: [description]

Which fits your constraints best? Why?"
```

### Resources

```
Mentor may point you to:
- Existing code patterns: "See greeting-service.ts line 12"
- Documentation: "docs/agent-os/architecture.md explains this"
- Standards: "We handle this in agent-os/standards/..."
- Similar decisions: ADR about error handling
```

## Acceptance Criteria

- [ ] Your question is answered through questioning, not direct solution
- [ ] You understand the reasoning behind the approach
- [ ] You can explain the decision to someone else
- [ ] You know where to find related patterns or docs
- [ ] You feel more confident in the approach

## Example Sessions

### Session 1: Architecture Question

```
→ Mentor: I'm implementing notification system. Where does it go?

← Mentor: Good question. Let me ask:
   1. Does it touch external APIs?
   2. Could it be used without a CLI (e.g., libray)?
   3. Is it core to the business or a feature on top?

→ User: 
   1. Yes, external APIs
   2. Maybe—could be reused
   3. Core-ish... it enables our main feature

← Mentor: So the pattern is:
   - Core layer: NotificationService (business logic, no API calls)
   - Infra layer: ExternalNotificationAdapter (handles API calls)
   - CLI links them together
   
   You separate IO (unstable) from logic (stable).
   Understand?"

→ User: Got it. Design it like GreetingService + adapter?

← Mentor: Exactly.
```

### Session 2: Test Failure

```
→ Mentor: Why is this test failing?
   Test: "returns error for invalid input"
   Expected: { exitCode: 1, stderr: "Invalid..." }
   Got: { exitCode: 0, stdout: "Hello, invalid!" }

← Mentor: Interesting. The code is accepting "invalid" as input.
   Why would that happen?
   
   Look at your argument parsing logic.
   What happens when isValidInput() is called?

→ User: Oh! isValidInput() isn't being called...

← Mentor: Right. Where should it be called?

→ User: In run(), before we build the greeting.

← Mentor: Try that. Reporter back.
```

## Integration

Use **mentor** at any point:

- During design (before coding)
- While implementing (stuck or unsure)
- During debugging (test failures, unexpected behavior)
- Code review (validate approach)
- Learning (understand patterns)

## When NOT to Use Mentor

Mentor is for learning and guidance, not for:
- Direct code implementation ("Write this function for me")
- Specific bug fixes ("Fix this error for me")
- Tool operations (use Git Workflow, Test Runner instead)

## See Also

- [execute-tasks](cmd-execute-tasks.md) - Use mentor during task execution
- [analyse-product](cmd-analyse-product.md) - Mentor helps assess product
- [brainstorm-spec](cmd-brainstorm-spec.md) - Mentor guides discovery
