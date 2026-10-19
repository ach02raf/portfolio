# Mohamed Achraf Ben Fredj · Engineering portfolio

A project-first portfolio built with Next.js 14, React, TypeScript, and Sass. Available in English, French, and German, with responsive light and dark themes.

## Development

Use the existing checkout. Node.js is pinned in `.nvmrc` (24.19.0); npm is the supported package manager.

```bash
npm ci
npm run dev
```

Open the local development server and visit `/en`, `/fr`, or `/de`. The root renders the French homepage immediately. Build output stays in ignored `.next` and `out` directories during development.

## Production validation

```bash
npm run prepare:media
npm run lint
npm run build
npm run check:export
```

`build` exports the site into `out`, generates the sitemap and robots file, and refreshes the committed `docs` copy. It preserves `docs/CNAME` and creates `.nojekyll` for GitHub Pages. Treat `docs` as generated output; edit source files instead. Commit the refreshed `docs` when using branch-based Pages publishing.

`check:export` validates document languages, primary headings, internal routes and anchors, referenced media and assets, deployment files, and the absence of autoplaying videos and obsolete snow markup.

Because this is a static export, `next start` is not the production hosting command. Serve `out` through a static host. The old feedback API cannot run on GitHub Pages; the redesigned site uses direct email, LinkedIn, and GitHub contact links.

## GitHub Pages deployment

The **Validate and deploy portfolio** workflow installs locked dependencies, lints, optimizes images, builds, checks the export, and deploys the `out` artifact on pushes to `main`. Pull requests run validation without deploying.

For automated deployment, set **Settings → Pages → Build and deployment → Source → GitHub Actions** once. The workflow needs Pages deployments and the `github-pages` environment enabled for `main`. The checked-in `docs` directory remains compatible with the existing `main /docs` publishing setup until this switch is made. The custom domain remains `ach02raf.pro`.

## Content and design

- `dictionaries/{en,fr,de}.json`: original projects, articles, experience, and localized interface copy under `engineering`.
- `src/app/[lang]/page.tsx`: homepage and section order.
- `src/app/[lang]/Projects/[slug]/page.tsx`: project case studies.
- `src/app/[lang]/blog`: writing index and articles.
- `src/component/portfolio`: shared document, project cards, footer, and icons.
- `src/app/globals.scss`: design tokens, typography, responsive layouts, themes, and reduced-motion styles.
- `public/Images`: original media; `public/media`: optimized WebP versions.
- `scripts/prepare-media.mjs`: repeatable image optimization using Sharp. The Communic Flow cover is an actual frame extracted from the existing demonstration video; regenerate it from a clean video frame when replacing that demo.

The homepage features Communic Flow, ALLO DOCTOR, and GoTrip. All other projects remain accessible under **More projects** and at their original URLs. No project metrics, client claims, or screenshots are invented. The earlier experience list uses a disclosure so the complete history stays accessible.

Accessibility includes semantic landmarks, one primary heading, correct document languages, keyboard focus indicators, a skip link, native dialog navigation, readable themes, and reduced-motion support. Essential page content is rendered statically; it does not depend on an entrance animation or typing effect.

Analytics configuration is retained in `src/component/portfolio/Document.tsx` and `src/lib/gtag.ts`. External tracking delivery requires the hosting network and was not validated by local UI tests.

## License

Apache-2.0. See [LICENSE](LICENSE).
