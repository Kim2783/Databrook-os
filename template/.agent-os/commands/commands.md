# Agent OS Commands

Commands are high-level operations that orchestrate multiple agents to accomplish complex tasks. They represent common workflows in product development and code maintenance.

## Command List

### Discovery & Strategy

- **[analyse-product](cmd-analyse-product.md)**: Audit entire codebase and product; assess readiness; install/upgrade Agent OS
- **[plan-product](cmd-plan-product.md)**: Design a new product from scratch and initialize Agent OS in its codebase

### Specification & Design

- **[brainstorm-spec](cmd-brainstorm-spec.md)**: Explore and refine ideas through collaborative dialogue before formalizing specification
- **[create-spec](cmd-create-spec.md)**: Turn a validated idea into a formal specification ready for implementation
- **[create-tasks](cmd-create-tasks.md)**: Break a specification into actionable, tracked tasks with acceptance criteria

### Development & Guidance

- **[mentor](cmd-mentor.md)**: Interactive guidance on code, architecture, and implementation through Socratic questioning
- **[execute-tasks](cmd-execute-tasks.md)**: Work through a task list with validation, testing, and completion tracking
- **[complete-tasks](cmd-complete-tasks.md)**: Run full regression gate and confirm acceptance criteria when all tasks are done

## Command Lifecycle

Typical project flow:

```
New project:
plan-product → brainstorm-spec → create-spec → create-tasks → execute-tasks → complete-tasks

Existing project:
analyse-product → [identify needs] → brainstorm-spec → create-spec → create-tasks → execute-tasks → complete-tasks

During development:
mentor (as needed for guidance)
```

## Command Structure

Each command includes:

- **Purpose**: What problem does this command solve?
- **Workflow**: Steps to complete the command
- **Agents Used**: Which agents coordinate to accomplish it
- **Inputs**: What the user provides
- **Outputs**: What the command produces
- **Acceptance** Criteria: How you know it's done
- **Example**: Real-world usage

## Using Commands

Commands are invoked directly, often with context:

```
→ Command: analyse-product
← Analysis report, recommendations, Agent OS installation

→ Command: brainstorm-spec 'Add real-time notifications'
← Refined idea, clarified scope, ready for formal spec

→ Command: create-spec (from brainstorm results)
← Timestamped spec file, validation report

→ Command: mentor
← Interactive guidance on current code/task
```

## Agent Coordination in Commands

Commands use agents to accomplish sub-tasks:

| Command | Primary Agents |
|---------|----------------|
| analyse-product | Context Fetcher, Test Runner, Mentor |
| plan-product | File Creator, Date Checker, Mentor |
| brainstorm-spec | Mentor, Context Fetcher |
| create-spec | Date Checker, File Creator |
| create-tasks | Mentor, File Creator |
| mentor | Mentor (primary) |
| execute-tasks | Test Runner, Git Workflow, Mentor |
| complete-tasks | Test Runner, Git Workflow, Mentor, Context Fetcher |

## Extensibility

Additional commands can be added by creating a new spec following the pattern:

1. Create `cmd-your-command.md` in `.agent-os/specs/`
2. Document purpose, workflow, agents, inputs, outputs
3. Include concrete examples
4. Link from this index
5. Reference in `.github/copilot-instructions.md` if top-priority
