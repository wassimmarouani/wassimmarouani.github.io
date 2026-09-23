export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** A value translated into every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

/** Plain strings are language-neutral (technology names, proper nouns). */
export type MaybeLocalized = string | Localized;

export interface LocaleMeta {
  /** BCP 47 tag used for `lang`, `hreflang` and Intl formatting. */
  tag: string;
  dir: 'ltr' | 'rtl';
  /** Open Graph locale (language_TERRITORY). */
  ogLocale: string;
  /** Name of the language in that language. */
  name: string;
  /** Short label for the language switcher. */
  short: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { tag: 'en', dir: 'ltr', ogLocale: 'en_US', name: 'English', short: 'EN' },
  fr: { tag: 'fr', dir: 'ltr', ogLocale: 'fr_FR', name: 'Français', short: 'FR' },
  // Latin digits keep dates and numbers readable next to Latin tech names.
  ar: { tag: 'ar', dir: 'rtl', ogLocale: 'ar_TN', name: 'العربية', short: 'عربي' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function pick(value: MaybeLocalized, locale: Locale): string {
  return typeof value === 'string' ? value : value[locale];
}
