# Best Practices

## Development approach
1. Test-driven development (TDD) by default.
2. Red -> Green -> Refactor cycle.
3. Keep APIs stable and documented.

## Code quality
- TypeScript strict mode (`strict: true`).
- `eslint` with the Next.js recommended config.
- `prettier` enforcing formatting.
- `jest` for unit tests + `@testing-library/react`.
- `playwright` for end-to-end testing.

## Database
- Use Prisma for ORM.
- Strong typing for schema + migrations.
- Seed data for PF2 treasure table.
- Transactions for multi-step operations.

## Security
- Sanitize and validate all input.
- Auth + RBAC for campaigns & sessions.
- Use HTTPS and secure cookies in production.

## Documentation
- Keep docs updated in `docs/`.
- Write high-level architecture and data flows.
- Include sample data and usage guides.
