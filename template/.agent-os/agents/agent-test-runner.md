# Agent: Test Runner

## Purpose

Build, run, and analyze tests for the current task scope. Diagnose failures, suggest fixes, and validate coverage thresholds.

## Problem Statement

Testing and debugging is manual and time-consuming:

- Run tests remotely without seeing what failed
- Coverage reports are hard to parse
- Test output is verbose and unclear
- Difficult to understand why a specific assertion failed
- No clear path from failure to fix

Test Runner automates testing, analysis, and actionable feedback.

## Responsibilities

### Build Project

Compile and prepare for testing:

```
→ Test Runner: Build and test current changes
← Test Runner:
   Build: Successful (TypeScript compiled, 0 errors)
   Config: vitest with coverage thresholds
   Ready: 5 test files, 15 tests total
   Status: Running...
```

### Run Tests

Execute the full suite or specific files:

```
→ Test Runner: Run tests for 'src/infra/cli.ts'
← Test Runner:
   
   ✓ tests/unit/infra/cli.test.ts (6 tests) 15ms
   
   Test results:
   - returns greeting output when no name is provided ✓
   - returns help output for the help flag ✓
   - returns the version for the version flag ✓
   - returns an error for unknown options ✓
   - returns an error when too many names are provided ✓
   - returns an error when options are mixed with other arguments ✓
   
   Status: All pass
```

### Analyze Failures

Diagnose test failures with clear context:

```
→ Test Runner: Run tests (one is failing)
← Test Runner:
   
   ✗ returns error for mixed arguments FAILED
   
   Expected: { exitCode: 1, stderr: 'Options must...' }
   Received: { exitCode: 0, stdout: 'Hello, --help!' }
   
   Analysis:
   Problem: Option detection logic is not checking correctly
   
   Debugging steps:
   1. Check isOption() method - does it catch '--help'?
   2. Verify args are being passed correctly
   3. Add: console.log('args:', args); to see what's received
   
   Common causes:
   - Array indexing error
   - Missing condition check
   - Wrong operator (|| vs &&)
   
   Hint: Look at line 26 in cli.ts where options are checked
```

### Coverage Analysis

Report and validate coverage thresholds:

```
→ Test Runner: Check coverage metrics
← Test Runner:
   
   Coverage report:
   ├─ src/infra/cli.ts         100% ✓
   ├─ src/core/services        100% ✓
   ├─ src/infra/package-metadata.ts 92.3% (missing: line 42)
   ├─ src/index.ts             90.24% (missing: error paths)
   └─ Overall                  95.77% ✓
   
   Thresholds (vitest.config.ts):
   ├─ Lines: 95.77% >= 90% ✓
   ├─ Functions: 100% >= 90% ✓
   ├─ Branches: 92.68% >= 80% ✓
   ├─ Statements: 95.77% >= 90% ✓
   Status: All pass
```

### Integration Tests

Run tests that exercise real artifacts:

```
→ Test Runner: Run integration tests
← Test Runner:
   
   ✓ CLI integration tests (3 tests) 2.8s
   - prints expected greeting from source entrypoint ✓
   - prints help from built output ✓
   - prints the package version from built output ✓
   
   Validation:
   - Source execution works correctly
   - Built artifact runs as expected
   - Help and version flags respond correctly
   Status: All pass
```

## Integration Points

**Input**: Test suite, specific file, coverage check
**Output**: Test results, failure analysis, coverage metrics
**Used by**: Development workflow, pre-commit checks, CI/CD validation

## Test Scopes

- **Unit**: Fast, deterministic, domain logic (`tests/unit/core`)
- **Unit (infra)**: Test adapters cleanly (`tests/unit/infra`)
- **Integration**: Exercise real entry points (`tests/integration`)
- **Full suite**: `pnpm run test` with coverage

## Implementation Notes

Test Runner should:

1. Build the project before running tests
2. Run vitest with configured coverage thresholds
3. Parse test output and identify failures
4. Suggest fixes based on common patterns
5. Report coverage gaps and suggest test additions
6. Validate that integration tests use built artifacts
7. Support filtering (run only specific files)
8. Return structured results (JSON, summary, recommendations)

## Acceptance Criteria

- [ ] Builds project and identifies compilation errors
- [ ] Runs unit, integration, and full test suites
- [ ] Reports test results clearly (pass/fail with names)
- [ ] Analyzes failures with debugging suggestions
- [ ] Reports coverage metrics and validates thresholds
- [ ] Flags missing test cases for uncovered code
- [ ] Integrates with vitest configuration
- [ ] Output is actionable (not just raw test logs)

## Example Full Test Session

```
→ Test Runner: Run all tests and check coverage
← Test Runner:

BUILD:
  TypeScript: ✓ (0 errors)
  Config: vitest, coverage thresholds

TESTS (5 files, 15 total):
  ✓ tests/unit/core/services/greeting-service.test.ts (2) ✓
  ✓ tests/unit/infra/cli.test.ts (6) ✓
  ✓ tests/unit/infra/package-metadata.test.ts (2) ✓
  ✓ tests/unit/index.test.ts (2) ✓
  ✓ tests/integration/cli.integration.test.ts (3) ✓

SUMMARY:
  Tests: 15 passed (15)
  Duration: 3.98s
  
COVERAGE:
  Lines: 95.77% (threshold: 90%) ✓
  Functions: 100% (threshold: 90%) ✓
  Branches: 92.68% (threshold: 80%) ✓
  Statements: 95.77% (threshold: 90%) ✓

STATUS: ✓ Ready to commit
```

## Common Issues and Fixes

| Issue | Usual Cause | Test Output Look For |
|-------|-----------|----------------------|
| Type errors in tests | Missing import or wrong type | `error TS` in output |
| Assertion failed | Logic bug or wrong expectation | `Expected ... but got ...` |
| Missing coverage | New code not tested | Coverage report gaps |
| Timeout | Async not awaited | `TIMEOUT: ... test` |
| Mock not working | Wrong spy/mock setup | `calls: 0` or wrong value |
