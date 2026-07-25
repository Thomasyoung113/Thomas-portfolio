# @thomas_young113 Portfolio

Vite + React + TypeScript + Tailwind portfolio site.

## Before this builds outside AppDeploy

Two files reference AppDeploy's platform-injected SDKs, which don't exist on npm:

- `src/App.tsx` imports `api` from `@appdeploy/client` (used for the newsletter subscribe call)
- `backend/index.ts` imports from `@appdeploy/sdk` (router, db, json, error helpers)

For a plain Vercel deploy you have two options:
1. **Drop the newsletter backend for now** — remove the `@appdeploy/client` import and point the subscribe button at a service like Mailchimp/ConvertKit/Formspree, or just disable it temporarily.
2. **Rebuild `backend/index.ts` as a Vercel serverless function** (e.g. `api/subscribe.ts` using `@vercel/node`) backed by your own storage (Vercel KV, a database, etc.), then swap the `api.post(...)` call in `App.tsx` for a plain `fetch('/api/subscribe', ...)`.

Everything else (markup, styling, project data, animations) is plain React/Vite/Tailwind and will build as-is.

## Local dev
```
npm install
npm run dev
```

## Build
```
npm run build
```
