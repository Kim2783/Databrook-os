# Instruction: Plan Product

Initialize product documentation for a new project. Establish mission, architecture, and Agent OS baseline.

## Steps

### 1. Define the product

Ask or confirm:
- What problem does this solve?
- Who is the primary user?
- What does success look like in 4–8 weeks?

Write answers to `.agent-os/product/mission.md`.

### 2. Establish tech stack

Ask or confirm:
- Runtime and language
- Package manager and toolchain
- Test framework and quality gates

Write to `.agent-os/product/tech-stack.md`.

### 3. Define architecture

Confirm separation of concerns:
- `src/core/` — pure business logic, no IO
- `src/infra/` — adapters, CLI, runtime wiring
- `src/index.ts` — composition root

Create an ADR for key architecture decisions: `docs/adr/0001-*.md`.

### 4. Create roadmap

Write high-level milestones to `.agent-os/product/roadmap.md`:

```markdown
## Phase 1 — MVP
- [ ] Core domain service
- [ ] CLI adapter
- [ ] Tests and CI
```

### 5. Bootstrap Agent OS

Run `make agent-os-bootstrap` to ensure full structure exists.

### 6. Create first spec

Run `create-spec` for the first MVP task.

## Acceptance Criteria

- [ ] `.agent-os/product/mission.md` written
- [ ] `.agent-os/product/tech-stack.md` written
- [ ] `.agent-os/product/roadmap.md` written
- [ ] Architecture ADR created
- [ ] Agent OS verified (`make agent-os-verify`)
- [ ] First spec ready to create
