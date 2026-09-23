import { getRelativeLocaleUrl } from 'astro:i18n';
import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import { locales, type Locale } from './config';

export * from './config';

export type UIKey = keyof typeof en;

/** Every locale must define every key that English defines. */
const dictionaries: Record<Locale, Record<UIKey, string>> = { en, fr, ar };

export type Translate = (key: UIKey, vars?: Record<string, string | number>) => string;

export function useTranslations(locale: Locale): Translate {
  const dict = dictionaries[locale];
  return (key, vars) => {
    const text = dict[key];
    if (!vars) return text;
    return text.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in vars ? String(vars[name]) : match,
    );
  };
}

/**
 * Localized path for a route, e.g. localePath('fr', 'projects/x') → '/fr/projects/x/'.
 * `route` is the part after the locale prefix, without leading or trailing slashes.
 */
export function localePath(locale: Locale, route = ''): string {
  return getRelativeLocaleUrl(locale, route);
}

/** The same route in every locale, for hreflang tags and the language switcher. */
export function alternatePaths(route = ''): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, localePath(l, route)])) as Record<Locale, string>;
}

/** Month + year, with Latin digits in every locale. */
export function formatMonth(isoMonth: string, locale: Locale): string {
  const [year, month] = isoMonth.split('-').map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, 1));
  return new Intl.DateTimeFormat(`${locale}-u-nu-latn`, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
