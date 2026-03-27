# Changelog

All notable changes to Databrook OS will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

## [1.0.0] — 2026-03-27

### Added

- `install` command — copies `.agent-os/` template, `AGENT.md`, and `.github/copilot-instructions.md` symlink
- `update` command — refreshes workflow files while preserving `.agent-os/product/` and `.agent-os/specs/`
- `verify` command — checks installation health (directories, symlink, version file)
- Version tracking — writes `.agent-os/.version` on install and update
- Template: 8 agent definitions in `.agent-os/agents/`
- Template: 9 commands including `complete-tasks` in `.agent-os/commands/`
- Template: 11 core workflow instructions in `.agent-os/instructions/core/` (git, testing lifecycle, all spec/task commands)
- Template: blank product stubs (`mission.md`, `tech-stack.md`, `roadmap.md`)
- Template: standards (`code-style.md`, `best-practices.md`, `tech-stack.md`)
- Generic `AGENT.md` with full Copilot instruction structure and `<!-- TODO -->` placeholders
