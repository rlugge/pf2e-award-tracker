# Project Structure

```
/ (root)
  /app (Next.js App Router)
    /dashboard
    /campaigns
    /sessions
    /auth
  /components
  /lib
    /auth
    /db
    /model
  /prisma
    schema.prisma
    migrations/
  /tests
    /unit
    /integration
    /e2e
  /docker
    Dockerfile
    docker-compose.yml
  .github/workflows/ci.yml
  README.md
  BEST_PRACTICES.md
  CONTRIBUTING.md
```

## Key modules
- `app/` for pages/routes.
- `components/` for reusable UI parts.
- `lib/` for business logic and database access.
- `tests/` for test suites and fixtures.
- `prisma/` for schema and migrations.

## Data model (high level)
- User
- Campaign
- Session
- Reward
- CampaignMember (roles GM/Player)
- TreasureBenchmark (PF2 table per level, party count variation)
