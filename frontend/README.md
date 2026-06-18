# ATSBoost AI — Frontend

The Next.js 16 (App Router) web client for **ATSBoost AI**. See the
[root README](../README.md) for full project docs, architecture, and backend
setup.

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Clerk · framer-motion · lucide-react

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Clerk keys + NEXT_PUBLIC_API_URL
npm run dev                  # http://localhost:3000
```

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack).    |
| `npm run build` | Type-check + production build.       |
| `npm run start` | Serve the production build.          |
| `npm run lint`  | Run ESLint.                          |

## Environment

Configure `.env.local` (see `.env.example`):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` — Clerk auth
- `NEXT_PUBLIC_API_URL` — FastAPI backend base URL (e.g. `http://localhost:8000`)

## Structure

```
app/          # routes: landing, dashboard, upload, interview, roadmap, reports, share, auth
components/    # landing, dashboard, resume, roadmap UI
lib/          # API client (api.ts), helpers (interview, stats, utils), types
```
