# Agents System

The Agent OS includes specialized sub-agents that handle cross-cutting concerns and provide domain-specific support to the main coding assistant.

## Agent Roles

### Context Fetcher
Manages context discovery and validation before surfacing information.

**Responsibilities:**
- Checks if requested content is already in context before fetching
- Prevents redundant context loading and reduces token usage
- Validates that content exists before returning
- Reports gaps and suggests context expansion

**When to use:**
- Before reading, searching, or fetching external information
- When context memory is limited
- Before making API calls or large file reads

---

### Date Checker
Provides deterministic, current-day date information for consistent naming and spec indexing.

**Responsibilities:**
- Returns today's date in `yyyy-mm-dd` format
- Used for spec folder naming and timestamped artifacts
- Deterministic (always the same for a given run)
- Supports date-based file organization

**When to use:**
- Creating new spec files under `.agent-os/specs/`
- Naming timestamped reports or outputs
- Ensuring consistent date formatting across runs

---

### File Creator
Creates files and initializes templates for Agent OS workflows and artifacts.

**Responsibilities:**
- Creates files with proper structure and headers
- Applies Agent OS templates for specs, workflows, and docs
- Ensures consistent formatting and conventions
- Prevents manual boilerplate writing

**When to use:**
- Creating new specification files
- Setting up new workflow documents
- Creating ADRs or decision records
- Initializing project configurations

---

### Git Workflow
Handles all Git operations, branch management, commits, and PR creation.

**Responsibilities:**
- Creates feature branches with conventional naming
- Stages and commits changes with Conventional Commit messages
- Pushes changes and creates pull requests
- Manages branch lifecycle and cleanup
- Handles merge conflicts and rebasing when needed

**When to use:**
- Completing a feature or spec
- Preparing code for review
- Committing implementation progress
- Creating PRs with proper descriptions

---

### Mentor Agent
Provides guidance, best practices, and architectural feedback during development.

**Responsibilities:**
- Suggests improvements to code structure and patterns
- Recommends Agent OS standards and conventions
- Explains trade-offs and architectural decisions
- Guides error resolution and debugging approaches
- Provides learning context for less common patterns

**When to use:**
- Designing a new feature or module
- Refactoring or restructuring code
- Resolving ambiguous design decisions
- Learning from mistakes or errors
- Validating against architectural boundaries

---

### Test Runner
Builds, runs, and analyzes tests for the current task scope.

**Responsibilities:**
- Builds the project with proper configuration
- Runs unit, integration, and end-to-end tests
- Analyzes test failures and reports diagnostics
- Suggests fixes for failing tests
- Tracks coverage metrics and trends
- Validates test completeness for new code

**When to use:**
- After implementation changes
- Before committing code
- Validating coverage thresholds
- Debugging test failures
- Ensuring CI will pass

---

## Coordination

Agents are designed to work together:

1. **Specification workflow**: Date Checker + File Creator → produces timestamped spec
2. **Context management**: Context Fetcher evaluates what's needed before expensive operations
3. **Development flow**: Test Runner validates, Mentor Agent suggests improvements
4. **Delivery**: Git Workflow commits and creates PRs with proper hygiene
5. **Guidance**: Mentor Agent provides learning context throughout

## Usage Conventions

- Agents are invoked explicitly by the main assistant when their domain is relevant.
- Each agent outputs should be concise and actionable.
- Agents respect Agent OS standards and conventions.
- Agents report back to the main assistant with structured results.

## Future Expansion

Additional agents can be added to handle:
- Documentation generation and publishing
- Performance profiling and optimization
- Security scanning and vulnerability assessment
- Deployment and release orchestration
- Compliance and audit logging
