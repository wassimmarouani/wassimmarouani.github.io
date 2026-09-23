# wassimmarouani.github.io

Source of my portfolio: **[wassimmarouani.github.io](https://wassimmarouani.github.io)**.

I'm Wassim Marouani, a full-stack developer with a Business Intelligence and data engineering background and production e-commerce experience. The site presents my work in English, French and Arabic, with a case study and an architecture diagram for each main project.

## Stack

- [Astro](https://astro.build) with static output, TypeScript in strict mode, and Tailwind CSS v4.
- **No UI framework at runtime.** The few interactive parts (theme toggle, language switcher, project filter, mobile menu, contact form) are small inline TypeScript modules.
- **i18n:** Astro's built-in routing (`/en/`, `/fr/`, `/ar/`). Arabic pages are right-to-left and use CSS logical properties only, so the layout mirrors without separate styles.
- **Fonts:** IBM Plex Sans and IBM Plex Sans Arabic, self-hosted with `@fontsource`.
- **Architecture diagrams:** inline SVG computed from data at build time (`src/lib/diagram.ts`). The flow runs in the reading direction of each language and switches to a vertical layout on small screens.
- **Open Graph images:** rendered at build time with `@resvg/resvg-js`, which shapes Arabic text correctly.
- **Deployment:** GitHub Pages via the official `withastro/action`.

Lighthouse, mobile and desktop, on the three home pages and two case studies: 98–100 in Performance, and 100 in Accessibility, Best Practices and SEO.

## Run locally

Requires Node.js 22 or later.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check (astro check) + static build into dist/
npm run preview   # serve the built site
```

## Project structure

```
src/
  content/projects/*.json   one file per project (all three languages)
  content.config.ts         Zod schema for projects and case studies
  data/                     profile, experience, education, skills, CV path
  i18n/                     en.json · fr.json · ar.json (UI strings) + helpers
  components/               layout pieces, sections, ArchDiagram, ProjectCover
  lib/                      diagram layout, structured data, OG image rendering
  pages/                    [lang]/ home and case studies, 404, OG images, robots.txt
scripts/prepare-assets.mjs  crops the photo, copies screenshots, builds favicons
```

## Editing content

All text lives in typed data files; components never hard-code content.

- **Add a project:** create `src/content/projects/<slug>.json`. The schema in `src/content.config.ts` validates it at build time. Set `"featured": true` and add a `caseStudy` block (problem, what was built, highlights, diagram) to get a case-study page at `/[lang]/projects/<slug>/`.
- **Add a screenshot:** put it at `_source/projects/<slug>/cover.png`, then run `npm run prepare:assets`. Projects without one get a generated cover.
- **Profile, experience, education, skills:** edit the files in `src/data/`.
- **Interface text:** edit `src/i18n/*.json`. TypeScript fails the build if the French or Arabic file is missing a key that English has.
- **CV:** replace `public/cv/Wassim_Marouani_CV.pdf` (the file name is set in `src/data/cv.ts`). The download button only appears when the file exists.
- **Translation review:** French and Arabic content carries a `_reviewed: "no"` marker until it has been proofread.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which type-checks, builds and publishes to GitHub Pages. Two optional repository variables (Settings → Secrets and variables → Actions → Variables) change the build:

| Variable | Purpose |
|---|---|
| `PUBLIC_WEB3FORMS_KEY` | Enables the contact form through [Web3Forms](https://web3forms.com). Without it, the form opens the visitor's email app. |
| `SITE_URL` | Public URL, for moving to a custom domain (also add `public/CNAME`). |

## Licence

© Wassim Marouani. All rights reserved.
