# Maple — Canada Newcomer Onboarding Hub (MVP)

Personalized, province-aware checklist for newcomers to Canada. Bilingual (EN/FR). No login. Public data only.

## Tech
- Next.js (App Router) + React + TypeScript
- Tailwind CSS (v4)
- i18next + react-i18next
- Leaflet + OpenStreetMap tiles
- Plausible Analytics (cookieless)
- Local storage state (no backend)

## Getting started

```bash
bun install
bun run dev
```

Open http://localhost:3000

## Environment variables

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — set to your production domain (e.g. `maple.vercel.app`). Script loads in production only.

Create `.env.local` for local overrides if needed.

## Content

- National steps: `content/ca/national.json`
- Province steps: `content/ca/provinces/{on,bc,qc}.json`
- JSON Schema: `content/schemas/step.schema.json`

Validate content:

```bash
bun run validate:content
```

### Authoring guide
- Write EN first; include FR as best-effort (add `TODO(fr)` in comments if unsure).
- `title`/`description` can be a string or `{ en, fr }` object.
- Use official links (`links.official`) and optional guides (`links.guide`).
- Mark province-specific steps with `province: ["on"]` etc.
- Use stable, authoritative URLs (avoid 404s).

## i18n
- UI strings in `public/locales/{en,fr}/common.json`.
- Language toggle persists to `localStorage` and `?lang=` query param.

## Accessibility
- WCAG 2.1 AA: keyboard nav, visible focus, reduced motion, high-contrast grays.

## Analytics
- Plausible events: `wizard_completed`, `step_completed`, `checklist_printed`.

## CI / Tests
- Vitest + RTL. Run `bun run test`.
- GitHub Actions runs typecheck, lint, tests, and content validation on push.

## Deploy (Vercel)
- Import repo into Vercel.
- Framework preset: Next.js.
- Env: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` for production.

## Disclaimer
Maple is an independent information resource. We are not affiliated with any government. Links go to official sources where possible.
