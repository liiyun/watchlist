# Watchlist

Watchlist is a small SvelteKit app for saving movies you want to watch.

## MVP

The first version supports:

- Email/password registration and login.
- A protected home page for signed-in users.
- Adding movies by title.
- Viewing your own saved movie titles.
- Signing out.

## Environment

Create a `.env` file with:

```sh
DATABASE_URL=...
BETTER_AUTH_SECRET=...
ORIGIN=http://localhost:5173
```

## Developing

```sh
npm install
npm run db:migrate
npm run dev
```

## Database

Schema changes are defined in `src/lib/server/db/schema.ts`.

```sh
npm run db:generate
npm run db:migrate
```

Use migrations for schema changes instead of `db:push`.

## Verification

```sh
npm run check
npm run lint
npm run test:unit -- --run
npm run build
```
