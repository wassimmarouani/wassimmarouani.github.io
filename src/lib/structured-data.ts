import type { CollectionEntry } from 'astro:content';
import { profile } from '@/data/profile';
import { localeMeta, type Locale } from '@/i18n/config';

type JsonLd = Record<string, unknown>;

export function personSchema(locale: Locale, site: URL, pageUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: profile.name.en,
    alternateName: profile.name.ar,
    jobTitle: profile.headline[locale],
    description: profile.tagline[locale],
    url: pageUrl,
    email: `mailto:${profile.email}`,
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsLanguage: profile.languages.map((l) => l.code),
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.address.locality,
      addressCountry: profile.address.country,
    },
    knowsAbout: ['Full-stack development', 'Business intelligence', 'Data engineering', 'E-commerce'],
  };
}

export function projectSchema(
  project: CollectionEntry<'projects'>,
  locale: Locale,
  site: URL,
  pageUrl: string,
): JsonLd {
  const { data } = project;
  const author = { '@id': new URL('/#person', site).href, '@type': 'Person', name: profile.name.en };
  const base = {
    '@context': 'https://schema.org',
    name: data.title[locale],
    description: data.summary[locale],
    url: pageUrl,
    inLanguage: localeMeta[locale].tag,
    author,
    keywords: data.stack.join(', '),
  };
  if (data.links.github) {
    return {
      ...base,
      '@type': 'SoftwareSourceCode',
      codeRepository: data.links.github,
      programmingLanguage: data.stack,
    };
  }
  return {
    ...base,
    '@type': 'CreativeWork',
    ...(data.links.live ? { sameAs: data.links.live } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
