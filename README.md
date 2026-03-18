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
1. `docker compose up --build`
2. `npm install`
3. `npm run migrate` (Prisma migration)
4. `npm run dev`
