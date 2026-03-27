# Agent: File Creator

## Purpose

Create files and initialize templates for Agent OS workflows, specs, and project artifacts with consistent formatting and conventions.

## Problem Statement

Manually creating new spec files, ADRs, or workflow documents is tedious:

- Copy-paste errors in filenames and paths
- Missing boilerplate headers and sections
- Inconsistent spacing, formatting, indentation
- Unclear where new files should live
- Time wasted on structure instead of content

File Creator automates file initialization with proper conventions.

## Responsibilities

### Spec File Creation

Create a new spec file using the prompt-to-spec template:

```
→ File Creator: Create spec for 'Add batch greeting endpoint'
← File Creator:
   Date: 2026-03-27
   Path: agent-os/specs/2026-03-27-add-batch-greeting-endpoint.md
   
   File created with:
   - Initial Prompt section (ready for content)
   - Desired Outcome (blank)
   - In Scope / Out of Scope sections
   - Constraints (pre-filled with project standards)
   - Open Questions section
   - Acceptance Criteria checklist
   - Implementation Notes
```

### ADR Creation

Create Architecture Decision Record:

```
→ File Creator: Create ADR for 'Error handling strategy'
← File Creator:
   Path: docs/adr/0002-error-handling-strategy.md
   
   With sections:
   - Status (PENDING)
   - Context
   - Decision
   - Consequences
   - (ready for editing)
```

### Workflow Document

Create a new workflow checklist:

```
→ File Creator: Create workflow doc 'Release preparation'
← File Creator:
   Path: docs/workflows/release-preparation.md
   
   With template:
   - Overview
   - Prerequisites
   - Steps (numbered checklist)
   - Validation
   - Rollback plan
```

## Integration Points

**Input**: File type, title, optional metadata
**Output**: Created file path, confirmation, content snippet
**Used by**: Specification workflow, Git Workflow (for commits), Mentor Agent (for guidance docs)

## File Conventions

### Spec Files
- **Path**: `.agent-os/specs/{date}-{kebab-case-title}.md`
- **Example**: `.agent-os/specs/2026-03-27-add-batch-greeting.md`
- **Template**: Prompt-to-spec from `.agent-os/specs/README.md`

### ADRs
- **Path**: `docs/adr/{number}-{kebab-case-title}.md`
- **Numbering**: Use next available (auto-detect from existing)
- **Status**: PENDING → ACCEPTED/REJECTED

### Workflows
- **Path**: `docs/workflows/{kebab-case-name}.md`
- **Format**: Markdown with numbered steps and checklists

### Config Files
- **Path**: Root or `.github/` as needed
- **Template**: Match existing conventions (JSON, YAML, etc.)

## Implementation Notes

File Creator should:

1. Coordinate with Date Checker for timestamped naming
2. Respect the file structure and conventions in the project
3. Provide a clear confirmation with the full path created
4. Support dry-run mode to preview before creating
5. Handle name collisions gracefully (suggest alternative)
6. Return the created file path for downstream use

## Acceptance Criteria

- [ ] Creates spec files with proper template and date
- [ ] Creates ADRs with auto-incremented numbering
- [ ] Creates workflow documents with correct structure
- [ ] Respects existing naming conventions
- [ ] Returns created file path for downstream reference
- [ ] Handles path collisions and suggests alternatives
- [ ] Creates parent directories if needed
- [ ] Files pass `pnpm run lint` without modification

## Example Output

```
✓ Spec file created:
  Path: agent-os/specs/2026-03-27-add-batch-greeting.md
  Status: Ready for content
  Template: prompt-to-spec (all sections prepared)

✓ ADR created:
  Path: docs/adr/0002-error-handling-strategy.md
  Status: PENDING (update to ACCEPTED/REJECTED when ready)
```
