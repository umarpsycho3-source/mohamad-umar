Render deployment steps

1. Create a new Web Service on Render and connect your GitHub repo.
2. Use the repository root; Render will run the `buildCommand` and `startCommand` from `render.yaml` if present.
3. Required env vars (optional):
   - `DATABASE_URL` — Postgres connection string (if you want persistence across devices).
   - `PORT` — (optional) defaults to 10000.
4. Deploy: Render will run `npm install` then `npm run build` and `npm start` per `render.yaml`.

Notes:
- The app serves both the static site and the API from a single Node service (`server/index.js`). If you do not set `DATABASE_URL`, the app will use seeded data and localStorage fallback for client-side sync.
- Use the `/api/status` endpoint to check database connectivity after deploy.
