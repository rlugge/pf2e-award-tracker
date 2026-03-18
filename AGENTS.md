# Agent Support: Claude and Copilot

This file describes how to use AI agents with this repository for project guidance, code generation, and documentation.

## Goals
- Make project structure explicit for AI tools.
- Keep prompt/response reproducible.
- Align with repository conventions.

## Suggested prompts
- "Analyze the Next.js folder structure and propose a REST API design for reward tracking."
- "Write unit tests for `campaign` service following TDD style and the existing `Jest` setup."

## Modeled workflows
1. Design schema and write tests first.
2. Generate implementation code and run failing test iteration.
3. Run `npm test`; fix until green.

## Context for tools
- Path: `prisma/schema.prisma` for DB shape.
- Path: `app/` for frontend UI routes.
- Path: `lib/` for business logic.
- Path: `tests/` for unit/e2e definitions.
