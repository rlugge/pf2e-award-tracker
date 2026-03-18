# Contributing

This repository is intended as both a working tool and a portfolio-quality coding example. Contributions should follow these guiding principles:

- Follow TDD: add failing tests first, then implement passing code.
- Keep changes isolated, small, and reviewable.
- Maintain clean commit history (`feat`, `fix`, `chore`, `test`).
- Use descriptive PR titles and link to issues.

## Branching
- `main` is protected.
- Feature branches: `feature/<short-description>`.

## Testing
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`
- Lint: `npm run lint`
- Pre-commit hooks enforce formatting + tests (via Husky).
