# Code Style

<!-- Adapt for each project's language and toolchain -->

## General

- Small, composable functions with single responsibilities.
- Explicit over implicit — name things clearly.
- Avoid deep nesting; prefer early returns.
- No commented-out code in committed files.

## Naming

- Variables and functions: `camelCase`
- Classes and types: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case`

## Functions

- One level of abstraction per function.
- Maximum 20–30 lines; extract if longer.
- Descriptive names that describe behaviour, not implementation.

## Types

- Avoid `any`. Use specific types or generics.
- Prefer `interface` for object shapes, `type` for unions/aliases.
- Make invalid states unrepresentable.

## Tests

- Test names follow `it('should <verb> when <condition>')`.
- Group with `describe` blocks matching the module name.
- Test behaviour, not implementation details.

## Comments

- Comments explain *why*, not *what*.
- Complex logic or non-obvious decisions get inline comments.
- Public APIs get JSDoc/docstrings.
