# Instruction: Git Workflow

Branch naming, commit conventions, and PR standards for this project.

## Branch Naming

Pattern: `<type>/<slug>`

| Type | Use |
|------|-----|
| `feat` | New feature or behaviour |
| `fix` | Bug fix |
| `chore` | Tooling, config, CI (no logic change) |
| `docs` | Documentation only |
| `refactor` | Code restructure without behaviour change |
| `test` | Test additions or corrections |

Examples:
- `feat/add-quiet-flag`
- `fix/exit-code-on-error`
- `chore/upgrade-vitest`
- `docs/update-readme`

### Creating a branch

```bash
git checkout -b feat/your-feature-slug
```

Always branch from `main`. Never commit directly to `main`.

---

## Commit Format

Pattern: `<type>(<scope>): <subject>`

**Rules:**
- Subject in imperative present tense: "add" not "added" or "adds"
- No trailing period
- Scope matches the primary module changed: `core`, `infra`, `cli`, `config`, `ci`
- 72 character limit on subject line

**Multi-line format** (for task commits):

```
feat(core): add greeting options

- Add `GreetingOptions` type to greeting-service
- Support `quiet` flag that suppresses output
- Preserve existing default behaviour

TASK: 1.2 — Add options type from 2025-01-15-greeting-options
```

**Agent commit confirmation:**
Agents MUST show the full commit message and ask for explicit user confirmation before running `git commit`. Never commit silently.

---

## Commit Types

Match `commitlint.config.cjs` config:

- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation
- `style` — formatting (not behaviour)
- `refactor` — restructure
- `perf` — performance
- `test` — tests
- `chore` — other
- `ci` — CI/CD config
- `build` — build system

---

## Pull Requests

### Before creating a PR

- [ ] All tasks `[x]` in `tasks.md`
- [ ] All quality gates pass: `pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run build`
- [ ] Clean `git status`
- [ ] Branch pushed: `git push -u origin <branch>`

### PR description template

Use `PULL_REQUEST_TEMPLATE.md` if present, otherwise:

```markdown
## Summary
<What changed and why>

## Changes
- `src/core/...` — ...
- `tests/...` — ...

## Spec
agent-os/specs/YYYY-MM-DD-slug/spec.md

## Testing
- Unit: N tests, N% coverage
- Integration: ...

## Quality Gates
- [x] lint
- [x] typecheck
- [x] test
- [x] build
```

---

## Merge Policy

- Squash merge preferred for feature branches.
- Rebase acceptable for patch/fix branches.
- Delete branch after merge.
