# Contributing

Thanks for your interest in improving this portfolio.

## Development setup

```bash
npm ci
npm run dev
```

The site runs at `http://localhost:3000` (locale routes such as `/en`, `/fr`, `/de`).

## Project notes

- **Stack:** Next.js 14 (App Router) + TypeScript + Sass, static export.
- **Source layout:** `src/app/` (routes/layout), `src/components/`, `src/lib/`, `src/content/`, localized content in `dictionaries/`.
- **Static assets:** `public/` (images, videos, CVs, icons).
- **Static export output:** `docs/` (`next.config.js` uses `output: "export"` with `distDir: "docs"` for GitHub Pages). `next-sitemap` runs postbuild.

## Quality checks

```bash
npm run lint
npm run build
```

## Content & correctness

- Keep content grounded in real sources (CV, live sites, actual repositories). Do not invent facts, credentials, or dates.
- Preserve multilingual parity (FR/EN/DE) when changing user-facing copy.
- Prefer accessible, responsive, and performance-conscious UI changes.

## Pull requests

- Keep changes focused and describe the motivation and impact.
- Include screenshots/recordings for UI changes when helpful.
- Ensure lint and build pass before opening a PR.

## Reporting issues

Use the GitHub issue templates (bug report / feature request). For security concerns, see [SECURITY.md](SECURITY.md).
