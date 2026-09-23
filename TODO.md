# Before launch

Everything the site still needs from you, most important first.

## 1. Content

- [x] Arabic spelling of your name confirmed: **وسيم مرواني**.
- [x] CV published: `public/cv/Wassim_Marouani_CV.pdf` (approved by you as-is). It is the only CV offered, as a direct download in all three languages.
- [ ] **Future fix: align the CV's project stacks with the site.** The CV still describes the auction platform as "Real-Time" with Prisma + PostgreSQL (the repository uses TypeORM + SQL Server and has no real-time bidding), the e-learning platform as PHP + MySQL (it is Laravel 12 + React 19 + TypeScript + MySQL + Redis), and the e-commerce apps (MyBookstore, Eshop) as React + NestJS + PostgreSQL (they are Symfony 7 + Twig + Doctrine + MySQL, and Java Servlets/JSP + SQL Server). Update the PDF, then replace `public/cv/Wassim_Marouani_CV.pdf`.
- [ ] **Review the French text.** Every file marked `_reviewed: "no"`: `src/i18n/fr.json`, `src/data/*.ts`, `src/content/projects/*.json`.
- [ ] **Review the Arabic text** (same files, `ar` fields). Three Arabic strings contain an explicit `\u200e` (left-to-right mark) so that `.NET` and `@nestjs/schedule` display correctly. Keep them if you edit those sentences.

## 2. Assets

- [ ] **Project screenshots.** Every project currently shows a generated cover. Add `_source/projects/<slug>/cover.png` (16:9, at least 1600 px wide), then run `npm run prepare:assets`:
  - `artisraw-b2b`: b2b.artisraw.com home or catalog
  - `fishing-fleet-management`: a screen without client data, or a mock-up
  - `enterprise-bi-dashboard`: the sales dashboard (Angular or React)
  - `auction-platform`: an auction detail page
  - `medical-app`, `edusmart-learning`, `mybookstore`, `eshop`
  - `jalysscom-platform`, `mim-spare-parts-store`, `artisraw-b2c-store`
- [ ] **Contact form key.** Create a free key at [web3forms.com](https://web3forms.com) for wassimmarweni.sfax@gmail.com and add it as the repository variable `PUBLIC_WEB3FORMS_KEY`. Until then the form opens the visitor's email app (mailto fallback).

## 3. Facts to confirm

I kept to your brief and the repositories. These points are my interpretation, so please check them:

- [ ] **Fishing-fleet diagram:** it shows the calculation engine and local-first store on the client side, syncing to the ASP.NET Core API for backup. Adjust `src/content/projects/fishing-fleet-management.json` if the engine runs on the server.
- [ ] **Roles on academic projects:** the case studies say "the whole chain" (BI dashboard) and "backend API and React front end" (auction platform). Change these if they were team projects.
- [ ] **ArtisRaw B2B highlights:** the two "Technical highlights" bullets are framing of facts you gave me (SSR + structured data; qualifying form + routing). Rephrase if they overstate anything.
- [ ] **Live URLs:** add `"live"` links for the ArtisRaw B2C store and the MIM Groupe store if they are public (none were provided).
- [ ] **EduSmart Learning:** only course management, enrolment and progress tracking are claimed. Add the other README features once confirmed.
- [ ] **Medical app:** the brief mentioned appointments, but the repository has no appointment module, so the site doesn't claim it.
- [ ] **Licence:** choose one for the code if you want the repository to be reusable (the README currently says "All rights reserved").

## 4. Outside this repository (recommended)

- [ ] **LinkedIn:** update the Projects section to match the site. It still says "real-time bidding" and "Prisma, PostgreSQL" for the auction platform, "PHP, MySQL, JavaScript" for EduSmart, and "appointments" for the medical app. Your ArtisRaw title on LinkedIn ("E-Commerce & Data Analyst") also differs from the site ("Full-stack developer & e-commerce data analyst").
- [ ] **auction-platform repository:** add a root README (only `backend/` and `front-end/` have one), since recruiters will land there from the case study.

## 5. Deployment

- [ ] Create the repository `wassimmarouani.github.io`, push, and enable Pages with "GitHub Actions" as the source (steps in the handover notes and in README.md). Until then, the footer's "Source code" link returns 404.
