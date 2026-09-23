// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Public URL of the site. To move to a custom domain, set SITE_URL
 * (e.g. in the GitHub Actions workflow) and add public/CNAME.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://wassimmarouani.github.io';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  // Pages ship their CSS inline: one request fewer before first paint.
  build: { format: 'directory', inlineStylesheets: 'always' },
  i18n: {
    locales: ['en', 'fr', 'ar'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      // The root page does its own browser-language detection.
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', fr: 'fr', ar: 'ar' },
      },
      // Only localized pages belong in the sitemap (not the language picker or 404).
      filter: (page) => /\/(en|fr|ar)\//.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
