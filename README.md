# Reward Tracking (Pathfinder 2E)

A full-stack Next.js + PostgreSQL app to help Pathfinder 2E Game Masters track party treasure progress against the rulebook benchmark (table 10-9). The system supports campaigns, variable party size per session, session rewards, and per-user authorization.

## Goals
- GM-focused treasure progress tracking
- Dynamic per-session party size + level
- Campaign separation + role-based access
- Easy local dev with Docker
- Test-driven architecture

## Architecture
- Next.js (App Router)
- PostgreSQL + Prisma ORM
- Docker Compose (app + db)
- Auth: NextAuth.js
- TDD: Jest + React Testing Library + Playwright

## Project docs
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `BEST_PRACTICES.md`
- `.github/workflows/ci.yml`
- `docs/project-structure.md`

## Quick start
1. `docker compose up --build`
2. `npm install`
3. `npm run migrate` (Prisma migration)
4. `npm run dev`
