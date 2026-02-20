# Habit Tracker

A full-stack habit tracking app where users create habits, record daily check-ins, and track streaks over time.

## Tech Stack

**Backend:** Express 5, TypeScript, Prisma ORM, PostgreSQL, bcryptjs
**Frontend:** React 19, TanStack Router, React Query, Tailwind CSS, Vite

Monorepo managed with pnpm workspaces.

## Features

- Create, edit, and delete habits
- Daily check-in toggle per habit
- Streak tracking (consecutive days completed)
- Weekly view with habit completion grid
- Today dashboard with streak badges
- Session-based authentication with secure cookies
- Rate limiting, helmet headers, CORS

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL

### Setup

```bash
pnpm install
```

Create `backend/.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/habit_api?schema=public
```

Run migrations:

```bash
cd backend
npx prisma migrate deploy
```

### Development

```bash
# Both backend and frontend
pnpm dev

# Or individually
pnpm dev:backend    # Express on :3000
pnpm dev:frontend   # Vite on :5173
```

## Project Structure

```
habit-api/
  backend/
    prisma/            # Schema and migrations
    src/
      db/              # Prisma client
      errors/          # Error classes
      middlewares/      # Auth, validators, rate limiters
      modules/
        auth/          # Register, login, logout, session
        habits/        # CRUD, weekly view, check-ins
        today/         # Today dashboard with streaks
        users/         # Profile, email update
      routes/          # Route aggregator
      utils/           # Helpers (cookies, dates, streaks)
  frontend/
    src/
      api/             # Axios API layer
      components/      # UI and feature components
      hooks/           # React Query hooks
      routes/          # File-based routes (TanStack Router)
      utils/           # Validators, formatters
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Current user |
| POST | /api/auth/logout | Logout |
| GET | /api/habits | List habits |
| GET | /api/habits/week | Weekly view |
| POST | /api/habits | Create habit |
| POST | /api/habits/:id/checkins | Toggle check-in |
| PATCH | /api/habits/:id | Edit habit |
| DELETE | /api/habits/:id | Delete habit |
| GET | /api/today | Today + streaks |
| GET | /api/users/me | Get profile |
| PATCH | /api/users/me | Update email |
| DELETE | /api/users/me | Delete account |
