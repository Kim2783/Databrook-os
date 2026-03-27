# Command: Analyse Product

## Purpose

Audit the entire codebase, product structure, and developer experience. Assess current health, identify gaps, and determine if/how Agent OS should be installed or upgraded.

## Problem Statement

When taking over a project or audit an existing one:

- Unclear current state: tests? scripts? documentation quality?
- No system for spec creation or task management
- Architecture unclear or unmaintained
- Missing or outdated Developer workflows
- No clear onboarding or contribution path

**analyse-product** provides a comprehensive audit and readiness assessment.

## Workflow

### Phase 1: Context & Discovery

```
Step 1: Gather initial information
→ Context Fetcher: What files are in the codebase?
   (Scan structure, key files, configuration)
→ Read file: README.md, package.json, Makefile/scripts
→ Note: Tech stack, existing conventions

Step 2: Assess testing
→ Test Runner: Run tests, analyze coverage
→ Report: What's tested? Coverage gaps?

Step 3: Check for existing Agent OS
→ Context Fetcher: Are agent-os/ specs/ docs/ present?
→ If yes: What version? What's configured?
→ If no: Recommend installation
```

### Phase 2: Quality Assessment

```
Step 4: Code quality
→ Test Runner: Lint, types, build
→ Report: Passing? Warnings? Blockers?

Step 5: Architecture review
→ Mentor Agent: Review key files for patterns
→ Report: Clear structure? Testable? Well-separated?

Step 6: Documentation
→ Context Fetcher: Review docs/ README patterns
→ Report: Clear? Up to date? Helpful?
```

### Phase 3: Recommendations

```
Step 7: Synthesize findings
→ Mentor Agent: Based on full audit, what matters most?
→ Prioritize gaps & improvements

Step 8: Install or upgrade Agent OS
→ File Creator: Set up agent-os/ structure if missing
→ Create: specs/, product/, standards/ directories
→ Copy: Templates and baseline documentation
→ Report: Agent OS ready ✓
```

## Agents Used

1. **Context Fetcher**: Understand current structure and scope
2. **Test Runner**: Validate test health and coverage
3. **Mentor Agent**: Architectural and quality assessment
4. **File Creator**: Install Agent OS if needed

## Inputs

- Codebase path (usually current directory)
- Optional: Known issues or focus areas
- Optional: Reference projects to compare against

## Outputs

### Analysis Report

```
Project: my-project
Tech Stack: TypeScript, Node, React
Tests: 42 passing, 0 failing, 78% coverage
Lint: Clean (0 warnings)
Docs: README present, architecture unclear

Architecture Quality: 7/10
- Strengths: Clear layering, good tests
- Gaps: No error handling standard, scripts undocumented

Agent OS Status: NOT INSTALLED
Recommendation: Install Agent OS
  → Will provide: spec system, task tracking, Mentor guidance
  → Time to install: ~10 minutes

Top 5 Improvements:
1. Add architecture decision records (ADRs)
2. Document error handling expectations
3. Create spec workflow for features
4. Establish task tracking system
5. Add Mentor guidance during PRs
```

### Installation

If Agent OS not present:

```
→ File Creator: Install Agent OS
← Created directories:
   ✓ agent-os/product/
   ✓ agent-os/standards/
   ✓ agent-os/specs/
  ✓ agent-os/agents/agents-system.md (baseline)
   
   ✓ docs/agent-os/ (durable guides)
   ✓ docs/adr/ (decision records)

Next steps:
1. Review agent-os/product/mission.md
2. Customize agent-os/standards/ for your project
3. Start using brainstorm-spec and create-spec
```

## Acceptance Criteria

- [ ] Full codebase audit completed
- [ ] Test health and coverage assessed
- [ ] Code quality validated (lint, types, build)
- [ ] Architecture strengths and gaps identified
- [ ] Documentation quality reviewed
- [ ] Agent OS status determined
- [ ] Recommendations prioritized and actionable
- [ ] Agent OS installed if missing
- [ ] Report saved to `reports/analyse-product-{date}.md`

## Example Output

```bash
→ Command: analyse-product
← Running comprehensive product audit...

BUILD & QUALITY
  TypeScript: ✓ (0 errors)
  ESLint: ✓ (0 warnings)
  Prettier: ✓ (formatted)
  Tests: ✓ (15 passed, 95% coverage)

STRUCTURE
  src/: Clear (core/ and infra/)
  tests/: Well-organized (unit/ and integration/)
  docs/: Exists but sparse
  
ARCHITECTURE
  Layer separation: Excellent
  Testing patterns: Consistent
  Error handling: Needs standard
  Documentation: Moderate
  
AGENT OS STATUS
  Installed: YES ✓
  Version: 1.0 (current)
  Status: Ready
  
GROWTH OPPORTUNITIES
  1. Add output formatting standards
  2. Create integration with external APIs
  3. Implement configuration file support
  4. Add internationalization support
  5. Create deployment automation

NEXT STEPS
  1. Review growth opportunities
  2. Brainstorm priority features
  3. Create specs for top 2 items
  4. Execute phase 1

Full report saved: reports/2026-03-27-analyse-product.md
```

## Integration

After `analyse-product`:

- Use **brainstorm-spec** for new features
- Use **create-spec** to formalize ideas
- Use **mentor** for architectural questions
- Refer to audit findings when planning

## See Also

- [plan-product](cmd-plan-product.md) - For new projects
- [brainstorm-spec](cmd-brainstorm-spec.md) - Next step after audit
