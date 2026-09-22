import type { Locale } from '../data/types';

export const LOCALES = ['tr', 'en'] as const satisfies readonly Locale[];
export const DEFAULT_LOCALE: Locale = 'tr';

/** Sitedeki sayfa türleri — her biri her dilde var. */
export const PAGES = ['home', 'uses'] as const;
export type PageKey = (typeof PAGES)[number];

/** hreflang etiketleri için dil → BCP 47 kodu. */
export const HREFLANG: Record<Locale, string> = {
  tr: 'tr',
  en: 'en',
};

export function otherLocale(locale: Locale): Locale {
  return locale === 'tr' ? 'en' : 'tr';
}
