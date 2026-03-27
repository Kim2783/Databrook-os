# Databrook OS

Personal Agent OS template for [DataBrook](https://github.com/kim2783) projects.

Provides a structured development workflow with AI agent support (GitHub Copilot).

## Install into a project

```bash
npx github:kim2783/Databrook-os install
```

This will:
- Add `.agent-os/` workflow files (commands, instructions, agents, standards)
- Create `AGENT.md` at your project root
- Create `.github/copilot-instructions.md` as a symlink → `../AGENT.md`

## Update an existing installation

```bash
npx github:kim2783/Databrook-os update
```

Preserved during updates: `.agent-os/product/**` and `.agent-os/specs/**`

## After installing

1. Edit `AGENT.md` — fill in **Mission**, **Coding Rules**, and **Testing Rules** for your project
2. Fill in `.agent-os/product/mission.md`
3. Fill in `.agent-os/product/tech-stack.md`
4. Start using commands in GitHub Copilot Chat (e.g. `create-spec`, `execute-tasks`)

## Verify an installation

```bash
npx github:Kim2783/Databrook-os verify
```

Checks `.agent-os/` structure, symlink health, version file, and reports any mismatches.

## Development workflow

```
/brainstorm-spec  →  /create-spec  →  [approve spec]
    →  /create-tasks  →  /execute-tasks  →  /complete-tasks
```

Full docs: `.agent-os/instructions/core/`

## Versioning this template

Tag releases so you can pin installs:

```bash
git tag v1.0.0 && git push origin v1.0.0
# Then pin with:
npx github:kim2783/Databrook-os@v1.0.0 install
```
