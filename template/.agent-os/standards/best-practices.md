# Best Practices

## Architecture

- Separate domain logic from IO concerns (no side effects in pure functions).
- Use dependency injection at composition roots.
- Prefer composition over inheritance.
- Keep layers thin — adapters translate, services compute.

## Changesets

- Make the smallest change that satisfies the requirement.
- One concern per commit.
- Refactoring commits separate from behaviour changes.

## Error Handling

- Fail fast and loudly.
- Return typed errors where callers need to handle them.
- Unexpected errors bubble up to the boundary.
- Log with enough context to reproduce the issue.

## Dependencies

- Prefer standard library over third-party where reasonable.
- Every new dependency requires justification.
- Pin major versions; review minor updates.

## Security

- Never commit secrets or credentials.
- Validate all external input at the boundary.
- Follow least-privilege principle.

## Performance

- Profile before optimising.
- Prefer readable code over micro-optimisations.
- Cache at appropriate boundaries.

## Documentation

- README explains: what it is, how to set it up, how to contribute.
- Non-obvious decisions get an ADR in `docs/adr/`.
- Update docs when behaviour changes.
