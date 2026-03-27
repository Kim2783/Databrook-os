# Agent: Git Workflow

## Purpose

Handle all Git operations, branch management, commits, and PR creation with Conventional Commits discipline and proper workflow hygiene.

## Problem Statement

Manual Git operations are error-prone:

- Inconsistent commit messages (no Conventional Commits)
- Unclear branch naming (`fix-stuff` vs `feat/improve-cli`)
- Forgotten to push before PR creation
- PRs without proper descriptions or linked context
- Merge conflicts handled ad-hoc without clear strategy

Git Workflow automates these operations within project conventions.

## Responsibilities

### Branch Creation

Create feature branches with conventional naming:

```
→ Git Workflow: Create branch for 'Add CLI help command'
← Git Workflow:
   Branch: feat/add-cli-help-command
   Tracking: origin/main (or current base)
   Status: Ready to code
```

**Branch naming conventions:**
- `feat/...` for features
- `fix/...` for bug fixes
- `docs/...` for documentation
- `refactor/...` for refactoring
- `test/...` for tests
- `infra/...` for infrastructure/tooling

### Commit Operations

Stage, commit, and push changes:

```
→ Git Workflow: Commit changes with message 'Add --help flag to CLI'
← Git Workflow:
   Files staged: 3 (src/infra/cli.ts, tests/unit/infra/cli.test.ts, docs/cli-contract.md)
   Commit: feat(infra): add --help flag to CLI
   
   Description: Implementation includes help text formatting and error cases.
   Pull request ready? (requires push)
```

**Commit format**: Conventional Commits
- Type: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`
- Scope: Optional (e.g., `infra`, `core`)
- Message: Imperative, lowercase, <50 chars
- Breaking changes: Use `BREAKING CHANGE:` in footer

### PR Creation

Create a pull request with proper context:

```
→ Git Workflow: Create PR for 'Add --help flag'
← Git Workflow:
   PR Title: feat(infra): add --help flag to CLI
   Base: main
   Head: feat/add-cli-help-command
   
   Description:
   ## Overview
   Adds `--help` / `-h` flag to the CLI and formats help text.
   
   ## Changes
   - Updated CliApp.run() to handle help flag
   - Added help text generation
   - Updated tests and docs
   
   ## Checklist
   - [x] Tests pass locally
   - [x] Lint and typecheck clean
   - [x] PR follows template
```

### Branch Cleanup

Clean up merged or abandoned branches:

```
→ Git Workflow: Clean up branch 'feat/add-cli-help-command'
← Git Workflow:
   Status: Branch merged to main
   Deleted: origin/feat/add-cli-help-command
   Local: feat/add-cli-help-command (ready to delete)
```

## Integration Points

**Input**: Operation (create-branch, commit, push, create-pr, cleanup)
**Output**: Git status, URLs (if PR), confirmation
**Used by**: Development workflow, release automation, CI/CD pipelines

## Workflow Coordination

1. **Feature start**: `create-branch` → implement → code
2. **Code complete**: `commit` with Conventional Commit message
3. **Ready to review**: `push` → `create-pr`
4. **PR reviewed**: merge via GitHub UI (not agent) for visibility
5. **Cleanup**: `cleanup-branch` after merge

## Implementation Notes

Git Workflow should:

1. Use system git with proper authentication
2. Respect repository's main/master branch naming
3. Implement Conventional Commits parsing and validation
4. Create PR descriptions automatically from commit messages
5. Support dry-run mode for safety
6. Handle merge conflicts gracefully (report, suggest resolution)
7. Validate branch clean state before operations
8. Link to related issues/specs if referenced in commit

## Acceptance Criteria

- [ ] Creates branches with Conventional Commit naming
- [ ] Stages and commits with proper message format
- [ ] Pushes to origin and sets upstream tracking
- [ ] Creates PRs with auto-generated descriptions
- [ ] Validates git status before operations
- [ ] Handles merge conflicts and reports resolution needed
- [ ] Integrates with PR templates from `.github/`
- [ ] All commits follow project conventions

## Example Full Workflow

```
→ Git Workflow: Start new feature 'Improve error messages'
← Git Workflow: Created branch feat/improve-error-messages

[Developer implements changes]

→ Git Workflow: Commit 'Add error context to API failures'
← Git Workflow:
   Commit: fix(infra): add error context to API failures
   Files: 2 changed, 45+ 32-

→ Git Workflow: Push and create PR
← Git Workflow:
   Pushed to origin/feat/improve-error-messages
   PR #42 created: link to review
   Checks status: passing
```

## See Also

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- `.github/PULL_REQUEST_TEMPLATE.md`
