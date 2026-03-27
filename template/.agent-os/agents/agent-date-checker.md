# Agent: Date Checker

## Purpose

Provide deterministic, current-date information in `yyyy-mm-dd` format for spec naming, artifact timestamping, and consistent file organization.

## Problem Statement

When creating specifications, reports, or any timestamped artifact:

- Manual date entry is error-prone and inconsistent
- Date format varies across files (`2026-03-27` vs `27-03-2026` vs `03/27/26`)
- Specs stored under `.agent-os/specs/` need consistent naming to be findable
- Multiple operations in a session should use the same date for cohesion

Date Checker provides a single, deterministic date service.

## Behavior

### Return Today's Date

```
Request: "What is today's date?"
Response: "2026-03-27"
```

**Format**: Always `yyyy-mm-dd`
**Determinism**: Same date for an entire session
**Timezone**: System/runner timezone

### Support Spec Folder Naming

When creating a new spec:

```
Spec title: "Add async error handling"
Date: 2026-03-27
Recommended folder: agent-os/specs/2026-03-27-add-async-error-handling.md
```

### Support Reports and Artifacts

When saving test results, coverage reports, or logs:

```
Reports:
- reports/2026-03-27-test-results.json
- reports/2026-03-27-coverage-summary.txt
```

## Integration Points

**Input**: Request for current date
**Output**: `yyyy-mm-dd` string
**Used by**: File Creator, Git Workflow, Test Runner, any operation needing timestamped naming

## Implementation Notes

Date Checker should:

1. Use the system date (no manual overrides)
2. Run once per session and cache the result for consistency
3. Support optional time component if needed (e.g., `2026-03-27T14:35:00Z`)
4. Return synchronously, no I/O or external calls
5. Be deterministic: same date for a session running on the same day

## Acceptance Criteria

- [ ] Returns current date in `yyyy-mm-dd` format
- [ ] Format is consistent across all calls in a session
- [ ] Supports filename-safe naming (suitable for spec folders)
- [ ] Response is instant (<10ms)
- [ ] Works across different timezones
- [ ] Integrates with File Creator for spec naming

## Example Usage

```
→ Date Checker: What is today's date?
← Date Checker: 2026-03-27

→ File Creator: Create a spec for 'Improve CLI help output'
← File Creator: Using date 2026-03-27...
   Created: agent-os/specs/2026-03-27-improve-cli-help-output.md
```
