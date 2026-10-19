# Engineering portfolio redesign

Direction A brings selected work forward, simplifies the visual hierarchy, and gives the portfolio one shared design system across English, French, and German.

## What changed

- A graphite, white, and violet palette with consistent spacing, readable typography, and matching dark-theme tokens.
- A static hero with clear project and CV actions. No typing delay, entrance animation, or autoplaying homepage video.
- Communic Flow, ALLO DOCTOR, and GoTrip featured immediately after the introduction. All other projects remain accessible through the project collection and their existing URLs.
- Case studies organize existing project context, capabilities, technologies, delivery processes, media, demo access, and source links. Architecture summaries use technologies already documented in the project data. No client outcomes or numerical results were invented.
- A condensed experience section, expandable earlier experience, grouped capabilities, article previews, and direct contact links replace the longer sequence of competing sections and popup prompts.
- Shared navigation and content layouts; a native mobile dialog with keyboard focus handling; reduced-motion support; selectable text; correct document languages; and translated route mapping for articles with different slugs.
- WebP images generated from existing media. Videos load only on request, and unavailable demos are not rendered as broken players.
- Builds now produce ignored `.next` and `out` directories, regenerate the sitemap, and refresh the committed `docs` site while preserving the custom domain.

Original project, article, experience, and other dictionary data were retained unchanged; the new interface copy is under `engineering` in each dictionary.

## Validation performed

- Frozen dependency installation with `npm ci`, media preparation, ESLint, TypeScript checking, and production static generation passed.
- `npm run check:export` passed for all 97 content pages. It validates languages, primary headings, internal paths and anchors, referenced assets, and deployment files. The generated 404 page is excluded from that count.
- Chromium browser checks covered English, French, and German; light and dark themes; 320, 390, 768, and 1440-pixel layouts; mobile menu focus cycling, Escape and focus restoration; skip navigation; project and experience disclosures; article language switching; representative case studies; and the article layout.
- No browser JavaScript errors or tested horizontal overflow. Fourteen axe accessibility runs across representative pages and themes reported zero violations for the selected WCAG A/AA and best-practice rules. This is automated coverage, not a complete manual accessibility certification.
- The custom domain, Pages marker, and original dictionary data were checked for preservation.

## Local mobile Lighthouse comparison

Recorded on 19 October 2026 with Lighthouse 12.8.2 and Chromium. The baseline is the committed published site at the start of the change; the redesign is the rebuilt export. Both used the same local static server, mobile simulation, and audit command. The server did not compress responses. These are individual lab runs, not production field measurements.

| Measurement | Before | Redesign |
| --- | ---: | ---: |
| Performance | 67 | 86 |
| Accessibility | 90 | 100 |
| Best practices | 93 | 96 |
| SEO | 100 | 100 |
| First contentful paint | 3.6 s | 1.8 s |
| Largest contentful paint | 25.3 s | 4.0 s |
| Total blocking time | 30 ms | 0 ms |
| Cumulative layout shift | 0.038 | 0 |
| Measured transfer size | 7,798 KiB | 566 KiB |

Measured transfer fell by approximately 93%. Production compression, caching, network conditions, and device capabilities will change the timings. LCP still has room to improve under this simulated, uncompressed setup. External Google tracking requests were unavailable in the test environment; analytics delivery and the live hosting deployment were not verified.

To repeat the main application checks:

```bash
npm ci
npm run prepare:media
npm run lint
npm run build
npm run check:export
```

For browser auditing, serve `out` with a static server supporting extensionless HTML routes, then run Lighthouse against `/en`, `/fr`, and `/de`. The recorded browser checks also exercised selected project and article routes.

## Deployment

The refreshed `docs` export remains compatible with the existing branch-based Pages site. The workflow also builds and uploads `out` for automated GitHub Actions deployment. For that workflow, select **Settings → Pages → Build and deployment → Source → GitHub Actions** once. The `github-pages` environment must allow deployment from `main`.
