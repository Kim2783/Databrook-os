# Instruction: Analyse Product

Audit an existing codebase and produce a structured assessment. Install or validate Agent OS if not present.

## Steps

### 1. Gather context

- Read `README.md`, `package.json`, `Makefile` or equivalent entry points.
- List key directories: `src/`, `tests/`, `docs/`, configuration files.
- Note runtime, package manager, language, and framework.

### 2. Run quality checks

- Execute `pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run build`.
- Record passing/failing state for each gate.
- Note coverage percentage if available.

### 3. Review architecture

- Identify main layers (e.g. `core/`, `infra/`, `api/`, `ui/`).
- Note separation of concerns: is business logic isolated from IO?
- List observed patterns (services, adapters, composition root).

### 4. Assess documentation

- Does `README.md` explain setup, usage, and contribution?
- Are architectural decisions recorded (ADRs)?
- Are specs and workflows documented?

### 5. Check Agent OS status

- Does `.agent-os/` exist with canonical folders?
- Run `make agent-os-verify` if available.
- If missing: run `make agent-os-bootstrap` to install.

### 6. Produce report

Write findings to `reports/YYYY-MM-DD-analyse-product.md`:

```markdown
# Product Analysis — YYYY-MM-DD

## Quality Gates
- Lint: ✅ / ❌
- Typecheck: ✅ / ❌
- Tests: ✅ / ❌  (N passing, N failing, N% coverage)
- Build: ✅ / ❌

## Architecture
- Layers: ...
- Separation: ...
- Patterns: ...

## Documentation
- README: ...
- ADRs: ...
- Specs: ...

## Agent OS
- Status: installed / not installed
- Action: ...

## Top Opportunities
1. ...
2. ...
3. ...
```

## Acceptance Criteria

- [ ] Quality gates executed and results recorded
- [ ] Architecture layers identified
- [ ] Agent OS status confirmed
- [ ] Report written to `reports/`
