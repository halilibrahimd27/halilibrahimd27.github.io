import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Kimlik ve site geneli sabitler.
 * Buradaki değerler her iki dilde de aynıdır (isim, link, dosya yolu).
 */

/**
 * E-postanız.
 *
 * Aşağıdaki placeholder'ı gerçek adresinizle değiştirin:
 *   export const EMAIL = 'ornek@alanadi.com';
 *
 * Placeholder olduğu sürece İletişim bölümünde e-posta satırı "yakında"
 * olarak gösterilir — kırık bir mailto linki ASLA basılmaz.
 * Adres HTML karakter entity'lerine çevrilerek yazılır (naif scraper koruması),
 * bu dönüşüm otomatiktir, siz düz metin yazın.
 */
export const EMAIL = '<PLACEHOLDER_EMAIL>';

export const isEmailConfigured = !EMAIL.startsWith('<PLACEHOLDER');

/** CV dosya adı — public/cv/ altına koyduğunuzda CTA otomatik görünür. */
export const CV_FILENAME = 'HALIL_IBRAHIM_DURMUS_CV_INTL.pdf';

/**
 * CV linki build sırasında dosya sistemi kontrolü ile belirlenir.
 * Dosya yoksa hero ve iletişim bölümündeki "CV indir" butonu hiç render
 * edilmez — kırık link çıkmaz.
 */
export const hasCv = existsSync(join(process.cwd(), 'public', 'cv', CV_FILENAME));

export const site = {
  name: 'Halil İbrahim Dürmüş',
  /** OG görseli ve JSON-LD için ASCII sürüm. */
  nameAscii: 'Halil Ibrahim Durmus',
  initials: 'HİD',
  github: {
    user: 'halilibrahimd27',
    url: 'https://github.com/halilibrahimd27',
    /** Portfolyo kaynak kodu repo'su (footer linki). */
    repo: 'https://github.com/halilibrahimd27/halilibrahimd27.github.io',
  },
  linkedin: {
    handle: 'halil-ibrahim-durmus',
    url: 'https://www.linkedin.com/in/halil-ibrahim-durmus',
  },
  cvPath: `cv/${CV_FILENAME}`,
  /** Tema rengi ve accent — CSS token'ları ile aynı olmalı. */
  themeColorDark: '#0B0E11',
  themeColorLight: '#FBFCFD',
} as const;

/** GitHub REST API — auth'suz, sadece public veri, 1 saat localStorage cache. */
export const GITHUB_API = `https://api.github.com/users/${site.github.user}/repos?per_page=100&sort=updated`;

/**
 * Her karakteri HTML sayısal entity'sine çevirir.
 *
 * Adres tarayıcıda normal görünür ve mailto: linki JS olmadan çalışır; ham
 * HTML'i regex ile tarayan basit e-posta toplayıcıları ise eşleşme bulamaz.
 */
export function toHtmlEntities(value: string): string {
  return [...value].map((character) => `&#${character.codePointAt(0)};`).join('');
}
