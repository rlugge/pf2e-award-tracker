# Reward Tracking (Pathfinder 2E)

A full-stack Next.js + PostgreSQL app to help Pathfinder 2E Game Masters track party treasure progress against the rulebook benchmark (table 10-9). The system supports campaigns, variable party size per session, session rewards, and per-user authorization.

## About this project

This codebase is a portfolio project demonstrating full-stack TypeScript development with a real-world problem domain. The design and implementation are AI-driven, using Claude Code as a collaborative development partner — from architecture decisions through to code generation. The goal is to showcase how thoughtful AI-assisted development can produce clean, well-structured, production-quality software.

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

### Environment files
Two gitignored env files are required before running anything:

**`.env`** — used by Prisma CLI tools (`migrate`, `generate`, `studio`):
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rewardtracking?schema=public"
```

**`.env.local`** — used by the Next.js dev server:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random string — generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))">
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rewardtracking?schema=public"
```

> `.env` and `.env.local` serve different toolchains. Prisma CLI reads `.env`; Next.js reads `.env.local`. Both are needed.

### Steps
1. Create `.env` and `.env.local` as above
2. `docker compose up --build`
3. `npm install`
4. `npx prisma generate`
5. `npm run migrate`
6. `npm run dev`

## Common commands
```bash
npm run dev          # start dev server
npm test             # run unit tests
npm run test:e2e     # run e2e tests (Playwright)
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run format       # Prettier
npm run migrate      # run Prisma migrations
```
