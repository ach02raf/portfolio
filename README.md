# Mohamed Achraf Ben Fredj — Portfolio

[![CI & GitHub Pages](https://github.com/ach02raf/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ach02raf/portfolio/actions/workflows/ci.yml)
[![CodeQL](https://github.com/ach02raf/portfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/ach02raf/portfolio/actions/workflows/codeql.yml)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=flat-square)](LICENSE)

A static, multilingual personal portfolio showcasing projects, writing, experience, and services across **Web, Mobile, DevOps, and AI**.

**Live:** [ach02raf.pro](https://ach02raf.pro)

## Highlights

- **Multilingual:** French, English, and German (`/fr`, `/en`, `/de`) with localized content dictionaries and locale-aware routing.
- **Static export:** built with Next.js (App Router) and exported for GitHub Pages (`docs/`), no backend or database.
- **Project case studies:** dedicated project pages with media, links, and technical details, plus a writing/blog section.
- **SEO & accessibility minded:** metadata, Open Graph/Twitter cards, structured data, sitemap/robots generation, and responsive UI with theme support.
- **Direct contact:** email/phone/location links only — no forms, no server-side message handling.

## Tech stack

| Area | Details |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript |
| Styling | Sass (SCSS modules/files), CSS variables, light/dark theme (`next-themes`) |
| Content/i18n | JSON dictionaries (`dictionaries/`), locale config (`i18n-config.ts`, `get-dictionary.ts`) |
| SEO | `next-sitemap` (postbuild), metadata/structured data in app/lib |
| CI/CD | GitHub Actions (lint/build, Pages deploy, CodeQL, release automation) |

## Project structure

```text
portfolio/
├─ src/
│  ├─ app/                 # App Router routes, layouts, global styles
│  │  ├─ (landing)/        # Root landing
│  │  └─ (site)/[lang]/    # Localized site, projects, blog
│  ├─ components/          # UI components
│  ├─ content/             # UI/search content helpers
│  └─ lib/                 # Utilities (SEO, media, locale, metadata, etc.)
├─ dictionaries/           # Localized content (fr.json, en.json, de.json)
├─ public/                 # Static assets (images, media, CVs, icons)
├─ docs/                   # Static export output (GitHub Pages distDir)
├─ .github/workflows/      # CI, Pages deploy, CodeQL, releases
├─ next.config.js          # output: "export", distDir: "docs"
└─ next-sitemap.config.js  # Sitemap/robots config
```

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install & run

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Build static export to `docs/` (runs `next-sitemap` via postbuild) |
| `npm run sitemap` | Generate sitemap/robots manually |
| `npm run start` | Start Next.js server (not used for static Pages hosting) |

## Environment variables

Optional (analytics only), e.g. in `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

No API keys, SMTP credentials, or backend services are required.

## Deployment

The site is a **static export** (`output: "export"`, `distDir: "docs"`).

- **GitHub Actions:** pushes to `main` run lint/build and deploy to GitHub Pages (see [ci.yml](.github/workflows/ci.yml)).
- **Manual/local:** `npm run build` produces the deployable site in `docs/`.

## Releases & versioning

- Semantic Versioning with tags like `v4.0.0` (see [CHANGELOG.md](CHANGELOG.md)).
- Pushing a `v*` tag triggers the [Release workflow](.github/workflows/release.yml) to create a GitHub Release with generated notes (configured via [.github/release.yml](.github/release.yml)).

## Contributing & security

- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)

## License

[Apache-2.0](LICENSE)

## Author

**Mohamed Achraf Ben Fredj** — [ach02raf.pro](https://ach02raf.pro) · [github.com/ach02raf](https://github.com/ach02raf)
