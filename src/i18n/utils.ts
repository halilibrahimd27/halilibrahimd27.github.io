import type { Locale } from '../data/types';
import { DEFAULT_LOCALE, type PageKey } from './config';

/**
 * Yol yardımcıları.
 *
 * Hepsi `import.meta.env.BASE_URL` üzerinden çalışır; astro.config.ts içindeki
 * BASE değiştiğinde sitedeki tüm linkler otomatik uyar. Hiçbir yerde elle
 * yazılmış mutlak yol yoktur.
 */

/** BASE_URL her zaman '/' ile biter: '/' ya da '/alt-dizin/'. */
function base(): string {
  const b = import.meta.env.BASE_URL;
  return b.endsWith('/') ? b : `${b}/`;
}

/** public/ altındaki bir dosyaya link (ör. 'cv/dosya.pdf'). */
export function assetHref(path: string): string {
  return `${base()}${path.replace(/^\/+/, '')}`;
}

/** Bir dilin bir sayfasına link. TR ön ek almaz, EN '/en/' altındadır. */
export function pageHref(locale: Locale, page: PageKey = 'home'): string {
  const localeSegment = locale === DEFAULT_LOCALE ? '' : `${locale}/`;
  const pageSegment = page === 'home' ? '' : `${page}/`;
  return `${base()}${localeSegment}${pageSegment}`;
}

/** Aynı sayfanın mutlak (canonical / hreflang / OG) adresi. */
export function absoluteUrl(path: string, siteUrl: string | URL | undefined): string {
  const origin = siteUrl ? new URL(siteUrl).origin : '';
  return `${origin}${path}`;
}

/* ─── Tarih biçimlendirme ────────────────────────────────────────────────── */

const MONTH_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  timeZone: 'UTC',
};

const DAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
};

function localeTag(locale: Locale): string {
  return locale === 'tr' ? 'tr-TR' : 'en-GB';
}

/** 'YYYY-MM' → 'May 2025' / 'May 2025' */
export function formatMonth(yearMonth: string, locale: Locale): string {
  const [year, month] = yearMonth.split('-').map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, 1));
  return new Intl.DateTimeFormat(localeTag(locale), MONTH_FORMAT).format(date);
}

/** 'YYYY-MM-DD' → '15 Eyl 2026' / '15 Sep 2026' */
export function formatDay(isoDate: string, locale: Locale): string {
  const date = new Date(`${isoDate.slice(0, 10)}T00:00:00Z`);
  return new Intl.DateTimeFormat(localeTag(locale), DAY_FORMAT).format(date);
}

/** Deneyim/eğitim aralığı: 'May 2025 – devam'. `end === null` → süregelen. */
export function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  const from = formatMonth(start, locale);
  const to = end ? formatMonth(end, locale) : presentLabel;
  return `${from} – ${to}`;
}

/** <time datetime="..."> için makine okunur değer. */
export function machineDate(value: string): string {
  return value.length === 7 ? `${value}-01` : value.slice(0, 10);
}
