import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage } from '@/lib/og-image';
import { locales, type Locale } from '@/i18n/config';

export const getStaticPaths = (() => locales.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params, site }) => {
  const png = renderOgImage(params.lang as Locale, site?.host ?? 'wassimmarouani.github.io');
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
