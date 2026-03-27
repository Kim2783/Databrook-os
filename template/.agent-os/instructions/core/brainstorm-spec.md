# Instruction: Brainstorm Spec

Explore and refine an idea through collaborative dialogue before creating a formal spec.

## Steps

### 1. Open the conversation

Ask the user to describe their idea in 1–3 sentences. Do not start implementing or structuring yet.

### 2. Clarify the problem

Ask targeted questions (pick the most relevant 2–3):
- "What user problem does this solve?"
- "Who uses this and when?"
- "What does good look like?"
- "What's in scope — and what's explicitly not?"
- "Are there existing patterns in the codebase we should follow?"

### 3. Surface assumptions

Reflect back what you've heard:
> "So you're saying X, which means Y. Is that right?"

List any assumptions you're making explicitly.

### 4. Identify constraints

- Review `.agent-os/standards/` for applicable rules.
- Check `.agent-os/product/tech-stack.md` for stack constraints.
- Note any dependencies or integration points.

### 5. Confirm scope

Summarize:
- **In scope**: what will change
- **Out of scope**: explicit non-goals
- **Open questions**: things to resolve before implementation

Ask: "Does this match your intent? Ready to create a formal spec?"

### 6. Hand off to create-spec

If yes, run `create-spec` with the refined idea as input.

## Acceptance Criteria

- [ ] Problem and user clearly defined
- [ ] Scope confirmed (in and out)
- [ ] Constraints identified
- [ ] Open questions listed or resolved
- [ ] User confirmed readiness for spec creation
