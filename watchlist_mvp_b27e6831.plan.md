---
name: Watchlist MVP
overview: Build the first usable Watchlist version with email/password auth and a single authenticated movie list where users can add titles only. Keep the UI intentionally plain and remove or ignore starter/demo surfaces that would distract from the core flow.
todos:
  - id: data-model
    content: Define the movie/watchlist table and generate the Drizzle migration.
    status: completed
  - id: auth-routes
    content: Promote the demo Better Auth login/register flow into real `/login` routes.
    status: completed
  - id: watchlist-page
    content: Build the protected `/` page with load data, add-title action, and sign-out action.
    status: completed
  - id: cleanup-docs
    content: Remove starter distractions where appropriate and update the README for the MVP.
    status: completed
  - id: verify
    content: Run typecheck, lint, build, and smoke-test the login/add-movie flow.
    status: completed
isProject: false
---

# Watchlist MVP Plan

## Scope

Implement only:
- Email/password login and registration using the existing Better Auth setup.
- A protected home page where the signed-in user can add movie titles.
- A minimal list showing only that user's saved movie titles.
- A basic sign-out button.

Do not add search, posters, ratings, notes, delete/edit, watched state, external APIs, recommendations, or polished styling in this version.

## Current Foundation

Use the existing auth and database wiring:
- [`src/lib/server/auth.ts`](/Users/liiyang/development/watchlist/src/lib/server/auth.ts) already enables Better Auth email/password with the Drizzle adapter.
- [`src/hooks.server.ts`](/Users/liiyang/development/watchlist/src/hooks.server.ts) already loads the session and sets `event.locals.user`.
- [`src/lib/server/db/index.ts`](/Users/liiyang/development/watchlist/src/lib/server/db/index.ts) already exports the Drizzle client.
- [`src/routes/demo/better-auth`](/Users/liiyang/development/watchlist/src/routes/demo/better-auth) has reusable login, registration, guarded load, and sign-out patterns.

The app schema currently has starter data that should be replaced or superseded:

```ts
export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});
```

## Implementation Approach

1. Add a real watchlist table in [`src/lib/server/db/schema.ts`](/Users/liiyang/development/watchlist/src/lib/server/db/schema.ts), for example `movie`, with:
   - `id` serial primary key
   - `userId` text foreign key to Better Auth `user.id`, cascade delete
   - `title` text not null
   - `createdAt` timestamp default now

2. Generate a Drizzle migration from the schema change.
   - Prefer removing/replacing the starter `task` table if this branch has not shipped.
   - If preserving existing DB state is important, leave `task` unused and only add the new `movie` table.

3. Move the Better Auth demo flow into real app routes:
   - Create `/login` from [`src/routes/demo/better-auth/login`](/Users/liiyang/development/watchlist/src/routes/demo/better-auth/login).
   - Keep two form actions: `signInEmail` and `signUpEmail`.
   - Redirect authenticated users away from `/login` to `/`.
   - Redirect successful login/registration to `/` instead of the demo route.

4. Replace the starter home page with the protected watchlist:
   - Add [`src/routes/+page.server.ts`](/Users/liiyang/development/watchlist/src/routes/+page.server.ts).
   - In `load`, redirect anonymous users to `/login`.
   - Query movies where `userId === event.locals.user.id`, newest first.
   - Add actions for `addMovie` and `signOut`.
   - Validate by trimming the submitted title and rejecting an empty value.

5. Keep [`src/routes/+page.svelte`](/Users/liiyang/development/watchlist/src/routes/+page.svelte) minimal:
   - Heading: `Watchlist`
   - Add-title form with one text input and one submit button
   - Plain list of saved movie titles
   - Sign-out form/button
   - Small inline error message for empty title or auth failures

6. Clean up starter/demo clutter after the real routes work:
   - Remove or leave unused demo routes depending on how clean the repo should be for V1.
   - Remove starter SvelteKit welcome copy.
   - Update [`README.md`](/Users/liiyang/development/watchlist/README.md) with minimal setup commands and required env vars.

## Verification

Run:
- `npm run check`
- `npm run lint`
- `npm run test:unit -- --run`
- `npm run build`

If a database is available locally, also run:
- `npm run db:generate`
- `npm run db:migrate`

Manual smoke test:
- Register a user.
- Sign out.
- Sign in again.
- Add a movie by title.
- Confirm the movie appears on `/`.
- Confirm an empty title is rejected.
- Confirm anonymous users are redirected to `/login`.
