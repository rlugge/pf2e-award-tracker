# Claude Code Context — Reward Tracking

## Project overview
A full-stack Next.js + PostgreSQL app for Pathfinder 2E Game Masters to track party treasure progress against the PF2e rulebook benchmark (Table 10-9). GMs record per-session rewards; the app compares cumulative totals against expected wealth-by-level with variable party size.

## Tech stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js
- **Testing:** Jest + React Testing Library (unit), Playwright (e2e)
- **Dev infrastructure:** Docker Compose (app + db)
- **Linting/formatting:** ESLint (Next.js config) + Prettier
- **Git hooks:** Husky + lint-staged (enforce formatting + tests on commit)

## Common commands
```bash
npm run dev          # start dev server
npm test             # run unit tests (jest)
npm run test:e2e     # run e2e tests (playwright)
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run format       # prettier --write .
npm run migrate      # prisma migrate dev
npm run db:seed      # prisma db seed
docker compose up --build  # start full stack (app + postgres)
```

## Project structure
```
app/              # Next.js App Router pages/routes
  dashboard/
  campaigns/
  sessions/
  auth/
components/       # reusable UI components
lib/              # business logic + DB access
  auth/
  db/
  model/
prisma/
  schema.prisma   # source of truth for data model
  migrations/
tests/
  unit/
  integration/
  e2e/
```

## Data model (prisma/schema.prisma)
- **User** — authenticated users (email + password)
- **Campaign** — owns `startLevel`, `currentLevel`, `partySize`, and a materialized reward balance: `coinsOwedGp: Float`, `permanentsOwed: Json`, `consumablesOwed: Json`
- **CampaignMember** — join table: User ↔ Campaign with role (`GM` | `PLAYER`)
- **CampaignEvent** — immutable log of events that add to rewards owed: `CAMPAIGN_CREATED`, `LEVEL_UP`, `PARTY_SIZE_CHANGE`. Stores typed nullable fields (`fromLevel`, `toLevel`, `fromPartySize`, `toPartySize`) rather than a JSON payload.
- **Session** — an editable play session (date, notes). No level or party size — those live on Campaign.
- **Reward** — a reward distributed in a session. `category: COINS | PERMANENT | CONSUMABLE`. For COINS: `valueGp` is set, `itemLevel` is null. For PERMANENT/CONSUMABLE: `itemLevel` and `quantity` are set, `valueGp` is null.

### Balance design
The reward balance on Campaign is a **materialized cache** — delta-updated on writes, but fully recomputable from scratch at any time by replaying all `CampaignEvent` records and subtracting all `Session` rewards.

- `permanentsOwed` / `consumablesOwed` JSON shape: `[{ level: number, qty: number }, ...]`
- `coinsOwedGp` is a flat float (coins have no item level)
- `RewardCategory`: `COINS`, `PERMANENT` (lasting items), `CONSUMABLE` (temporary/one-use items)

## Development approach
- **TDD by default:** write failing tests first, then implement (Red → Green → Refactor)
- All new features belong to a `feature/<short-description>` branch
- Commit convention: `feat`, `fix`, `chore`, `test` prefixes
- Prisma transactions for any multi-step DB operations
- RBAC enforced: only campaign GMs can add/edit sessions and rewards

## Domain knowledge
- **PF2e Table 10-9** defines expected treasure per level per player. The benchmark scales with party size — always factor `partySize` when comparing session rewards to expected values.
- `RewardCategory`: `COINS`, `PERMANENT` (lasting items), `CONSUMABLE` (temporary/one-use items)
- A campaign owner is the GM; other members may be players
