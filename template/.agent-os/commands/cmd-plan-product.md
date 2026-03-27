# Command: Plan Product

## Purpose

Design a new product from conceptual stage through implementation-ready setup. Initialize Agent OS in the new codebase to establish strong DevEx and spec discipline from day one.

## Problem Statement

Starting a new project from scratch:

- Unclear where to begin (architecture, naming, structure)
- Multiple decisions without recorded rationale
- No specification or task system in place
- Discovery questions mix with implementation decisions
- Onboarding takes too long; setup is manual

**plan-product** guides the planning process and sets up a ready-to-develop project with Agent OS.

## Workflow

### Phase 1: Product Discovery

```
Step 1: Define the problem
→ Mentor Agent: Socratic questions to clarify the problem
   - "What problem are we solving?"
   - "Who is the user?"
   - "What motivates them?"
   - "How do we know if this is successful?"

Step 2: Establish success criteria
→ User: Define measurable outcomes
→ Mentor Agent: Validate outcomes are SMART

Step 3: Identify constraints
→ User: Tech stack preferences, timeline, team, budget
→ Mentor Agent: How do constraints shape decisions?
```

### Phase 2: Architecture & Setup

```
Step 4: Design high-level architecture
→ Mentor Agent: Guidance on patterns, layers, scalability
→ User: Create architecture sketch or narrative
→ Mentor Agent: Validate against best practices

Step 5: Tech stack decision
→ Mentor Agent: Pros/cons of tech choices
→ User: Finalize stack
→ Decision recorded as ADR

Step 6: Create project structure
→ File Creator: Initialize project with chosen stack
→ Create: Directories, templates, baseline config
```

### Phase 3: Agent OS Installation

```
Step 7: Install Agent OS
→ File Creator: Set up full Agent OS structure
→ Create: product/, standards/, specs/ with templates
→ Create: docs/adr/, docs/workflows/
→ Create: Baseline configuration files

Step 8: Customize for project
→ File Creator: Update mission.md, tech-stack.md
→ Mentor: Review and refine standards for project

Step 9: Create first task list
→ Mentor Agent: What's the MVP (minimum viable product)?
→ Create-tasks: Break MVP into 3-5 first tasks
```

### Phase 4: Validation & Readiness

```
Step 10: Verify setup
→ Test Runner: Build, lint, typecheck (should pass)
→ Context Fetcher: Review directory structure
→ Report: Project ready to code ✓
```

## Agents Used

1. **Mentor Agent**: Guidance on product design, architecture, decisions
2. **File Creator**: Initialize project structure and Agent OS
3. **Date Checker**: Timestamp ADRs and project artifacts
4. **Test Runner**: Validate project builds and quality gates
5. **Context Fetcher**: Audit project structure

## Inputs

- Product name/concept
- Problem statement or user need
- Team size and experience level
- Preferred tech stack (or willingness to be guided)
- Timeline/MVP scope

## Outputs

### Product Plan Document

```
Product: Smart CLI for X
Team: Solo / 2-3 engineers
Timeline: 6 weeks to MVP

Mission
--------
Enable developers to X by providing Y without Z.
Success: 100+ users in first month, <5min onboarding.

Key Decisions
---------
Architecture: Modular, layered (core + infra)
Tech: TypeScript, Node 22, Vitest, pnpm
Standards: Strict types, tests first, ADRs for big decisions

MVP Tasks
---------
1. [ ] Core domain logic (service X)
2. [ ] CLI adapter (command parsing, help)
3. [ ] Integration tests
4. [ ] Documentation & examples
5. [ ] Initial release

Architecture
---------
src/
  core/      Business logic (no IO)
  infra/     Adapters (CLI, config, etc.)
  index.ts   Composition root
tests/
  unit/      Fast, isolated
  integration/ Real behavior validation
docs/
  adr/       Architecture decisions
  ..

Agent OS
--------
✓ Overview: agent-os/product/mission.md
✓ Standards: agent-os/standards/*.md
✓ Specs: agent-os/specs/ (ready for first feature)
```

### Project Directory

```
my-project/
├── agent-os/
│   ├── product/
│   │   ├── mission.md       ← Your product mission
│   │   ├── roadmap.md
│   │   └── tech-stack.md
│   ├── standards/
│   │   ├── code-style.md
│   │   ├── best-practices.md
│   │   └── tech-stack.md
│   ├── specs/
│   │   ├── README.md
│   │   └── 2026-03-27-project-plan.md
│   └── README.md
├── docs/
│   ├── adr/
│   │   ├── 0001-typescript-strict-mode.md
│   │   └── README.md
│   ├── agent-os/
│   │   └── ...
│   └── README.md
├── src/
│   ├── core/
│   │   └── services/
│   ├── infra/
│   └── index.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── README.md
├── package.json       ← With build, test, lint scripts
├── tsconfig.json      ← Strict mode enabled
├── vitest.config.ts   ← Coverage thresholds set
├── eslint.config.mjs
├── prettier.config.mjs
├── Makefile
└── README.md
```

## Acceptance Criteria

- [ ] Product problem clearly defined
- [ ] Success criteria established and measurable
- [ ] Constraints and assumptions documented
- [ ] High-level architecture designed and validated
- [ ] Tech stack chosen with rationale (ADR created)
- [ ] Project directory initialized
- [ ] Agent OS fully installed and customized
- [ ] First MVP tasks created and broken down
- [ ] Project builds and passes lint/typecheck
- [ ] Team has clear onboarding path
- [ ] Product plan saved: `.agent-os/specs/plan-{project-name}.md`

## Example: New CLI Project

```bash
→ Command: plan-product
  Project: My Awesome CLI
  Problem: Developers struggle with X, need Y
← Planning session with Mentor...

[Mentor asks clarifying questions]
→ User: Provides answers, constraints

[Mentor validates]
← Architecture and tech stack decided

[File Creator initializes]
← Project structure created
← Agent OS installed
← First tasks created

✓ Project ready! Next steps:
  1. Review MVP tasks in agent-os/specs/
  2. Start with task #1 using create-spec + execute-tasks
  3. Use mentor for architecture questions

Directory ready at: ./my-awesome-cli/
```

## Integration

After `plan-product`:

- Use **create-spec** for each MVP task
- Use **create-tasks** to break specs into work items
- Use **execute-tasks** to work through tasks
- Use **mentor** to stay aligned on architecture
- Use **analyse-product** periodically to assess health

## See Also

- [analyse-product](cmd-analyse-product.md) - For existing projects
- [brainstorm-spec](cmd-brainstorm-spec.md) - For designing features
- [create-spec](cmd-create-spec.md) - For formalizing ideas
