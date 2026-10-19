# 🎨 Portfolio (Next.js)

> A sleek, multi-language personal portfolio with dark/light themes, animations, and SEO-ready deployment.

[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Sass](https://img.shields.io/badge/Sass-1.69-CC6699?style=flat-square&logo=sass)](https://sass-lang.com)
[![License](https://img.shields.io/badge/License-Apache--2.0-green?style=flat-square)](LICENSE)

---

## ✨ Features

- 🌍 **i18n Support**: English, French, German with dynamic locale routing
- 🎭 **Theme Toggle**: Light/dark mode with smooth transitions (powered by `next-themes`)
- 📊 **Analytics Ready**: Google Analytics hooks for tracking engagement
- ✨ **Animations**: Framer Motion + custom Sass animations (snowfall, fade-ins)
- 📱 **Responsive Design**: Mobile-first approach with Bootstrap 5
- 🔍 **SEO Optimized**: Automatic sitemap generation (`next-sitemap`)
- ⚡ **Performance**: Next.js 14 with static generation and optimized builds

## 🎬 Live Demo

👉 **[Deploy your portfolio](https://vercel.com)** on Vercel or your preferred hosting platform

---

## 🛠️ Tech Stack & Key Packages

| Layer | Tech |
|-------|------|
| **Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | Sass, Bootstrap 5, Framer Motion |
| **Icons & UI** | Font Awesome, custom animations |
| **Theming** | `next-themes` with CSS variables |
| **i18n** | `@formatjs/intl-localematcher`, `negotiator` |
| **Analytics** | [src/lib/gtag.ts](src/lib/gtag.ts) (Google Analytics) |
| **SEO** | `next-sitemap` for dynamic sitemaps |

## 🎨 Color & Theme System

The portfolio uses a **premium violet + yellow** color scheme with smooth theme transitions.

### Base Palette (see [src/app/global-variables.scss](src/app/global-variables.scss))

```scss
$violet-dark:  #2b0945  // Main dark background
$violet-light: #44285b  // Secondary surfaces
$yellow:       #fec260  // Accent / highlights
$white:        #fff     // Light text
$black:        #111     // Dark text
```

### CSS Theme Variables

| Variable | Light | Dark |
|----------|-------|------|
| `--page-bg` | `#ffffff` | `#0b0812` |
| `--page-text` | `#111111` | `#ffffff` |
| `--accent` | `#fec260` | `#c79af0` |
| `--section-bg` | Light gradient | Dark gradient |

👉 **Edit** [src/app/globals.scss](src/app/globals.scss) and [src/app/global-variables.scss](src/app/global-variables.scss) to customize colors. Changes apply instantly with CSS variable transitions.

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── [lang]/             # Dynamic locale routes
│   │   ├── globals.scss        # Theme variables & animations
│   │   └── global-variables.scss # Color palette
│   ├── component/              # Reusable UI components
│   │   ├── Header/             # Navigation & locale switcher
│   │   ├── Footer/             # Footer section
│   │   ├── ThemeButton.tsx     # Light/dark toggle
│   │   └── ...
│   └── lib/
│       └── gtag.ts             # Google Analytics helpers
├── dictionaries/               # i18n translation files
│   ├── en.json
│   ├── fr.json
│   └── de.json
├── public/Images/              # Static assets
├── get-dictionary.ts           # i18n server loader
├── i18n-config.ts              # Locale configuration
├── .github/workflows/ci.yml    # CI/CD pipeline
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** (or yarn)

### Installation & Development

```bash
# Clone and install
git clone <your-repo-url>
cd portfolio
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm run start

# Run linter
npm run lint

# Generate sitemap
npm run sitemap
```

## 🌐 Environment Variables

Create a `.env.local` file in the root:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

| Variable | Type | Default | Notes |
|----------|------|---------|-------|
| `NEXT_PUBLIC_GA_ID` | string | (optional) | Your Google Analytics measurement ID |

## 🌍 Internationalization (i18n)

Dictionaries live in [dictionaries](dictionaries): [en.json](dictionaries/en.json), [fr.json](dictionaries/fr.json), [de.json](dictionaries/de.json).

### Add a New Language

1. **Create** a new dictionary file:
   ```bash
   cp dictionaries/en.json dictionaries/es.json
   # Edit es.json with Spanish translations
   ```

2. **Register** the locale in [i18n-config.ts](i18n-config.ts):
   ```typescript
   export const i18n = {
     defaultLocale: 'fr',
     locales: ['en', 'fr', 'de', 'es'],  // ← Add 'es'
   } as const
   ```

3. **Create** route folder:
   ```bash
   mkdir -p src/app/es
   # Create es-specific pages as needed
   ```

✅ Your new locale is live!

## 🎯 Customization Guide

### Update Colors & Theme

Edit the Sass files to match your brand:

```scss
// src/app/global-variables.scss
$violet-dark:  #2b0945;   // Change to your primary color
$violet-light: #44285b;   // Change to your secondary
$yellow:       #fec260;   // Change to your accent
```

### Update Content

| What | Where |
|------|-------|
| Hero section | [src/app/[lang]/page.tsx](src/app/%5Blang%5D/page.tsx) |
| Components | [src/component/](src/component) |
| Styles | `src/app/*.scss` and component `.scss` files |
| Images | [public/Images/](public/Images) |
| Fonts | [src/app/globals.scss](src/app/globals.scss) (Google Fonts import) |

### Add Animations

Use Framer Motion in your components:

```tsx
import { motion } from 'framer-motion';

export default function Card() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Your content here
    </motion.div>
  );
}
```

## 📸 Screenshots & Gallery

Store project images and screenshots under [public/Images](public/Images):

```
public/Images/
├── cover.png        # Hero image
├── mobile.png       # Mobile preview
├── dark-theme.png   # Dark mode screenshot
└── Icons/
    ├── logo.svg
    └── ...
```

Reference in pages:

```tsx
<img src="/Images/cover.png" alt="Portfolio cover" className="w-100" />
```

Or use Next.js Image for optimization:

```tsx
import Image from 'next/image';

<Image
  src="/Images/cover.png"
  alt="Portfolio"
  width={1200}
  height={600}
  priority
/>
```

## 🚢 Deployment

### Vercel (Recommended ⭐)

Vercel is the creator of Next.js and provides seamless deployment:

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add env variables (optional: `NEXT_PUBLIC_GA_ID`)
4. Deploy with one click — automatic builds & preview URLs

### Other Node Hosts

```bash
# Build
npm run build

# Deploy (adjust for your host)
npm run start
```

Set env variables in your host dashboard. Node.js 18+ required.

**Example: AWS, DigitalOcean, Render, Railway, Heroku**

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| **Missing translations** | Check [dictionaries/](dictionaries) files exist and [i18n-config.ts](i18n-config.ts) has the locale |
| **No analytics events** | Set `NEXT_PUBLIC_GA_ID` in `.env.local` and verify GA tag is loaded |
| **Styling looks broken** | Confirm [src/app/globals.scss](src/app/globals.scss) imports are correct and Sass is installed |
| **Build fails** | Run `npm run build` locally, check stack trace, clear `.next` folder |
| **Theme toggle not working** | Ensure `ThemeWrapper` provider wraps your app in [src/app/layout.tsx](src/app/layout.tsx) |

**Need help?** Open an issue or check the [docs](https://nextjs.org/docs).

## 📋 CI/CD with GitHub Actions

Automatic checks on every push and PR:

**Workflow:** [.github/workflows/ci.yml](.github/workflows/ci.yml)

- ✔️ Install dependencies
- ✔️ Run ESLint (`npm run lint`)
- ✔️ Build production bundle (`npm run build`)
- 🔄 Node 18 with npm caching for speed

### Add CI Badge to Readme

Replace `<owner>/<repo>` with your GitHub org/repo name:

```markdown
[![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<owner>/<repo>/actions)
```

---

## 🔒 Security & License

| File | Purpose |
|------|---------|
| [SECURITY.md](SECURITY.md) | Vulnerability reporting & response policy |
| [LICENSE](LICENSE) | Apache-2.0 open-source license |

### Report Security Issues

📧 Email: `your-email@example.com` (Update with your contact)

**Do not open public issues for unpatched vulnerabilities!**

---

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes and commit: `git commit -m 'Add my feature'`
4. Push and open a pull request
5. CI will automatically run checks

---

## 💬 Contact & Support

**Author:** Update with your name and GitHub profile

- ⭐ Star this repo if you find it useful!
- 💬 Open issues for bugs or feature requests
- 🔗 Follow for updates

**Happy coding! 🚀**
