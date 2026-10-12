/**
 * Kimlik ve site geneli sabitler.
 * Buradaki değerler her iki dilde de aynıdır (isim, link, dosya yolu).
 */

/**
 * İletişim e-postası. Boş bırakılırsa İletişim bölümündeki e-posta satırı
 * "yakında" olarak gösterilir; kırık bir `mailto:` linki asla basılmaz.
 *
 * Adres düz metin olarak yazılır — HTML karakter entity'lerine çevirme işi
 * otomatiktir (bkz. `toHtmlEntities`), naif e-posta toplayıcılarına karşı.
 */
export const EMAIL = 's.ibrahimdrms@gmail.com';

export const isEmailConfigured = EMAIL.trim().length > 0;

/*
 * CV bilerek sitede YOK: PDF telefon numarası içeriyor ve public/ altındaki
 * her dosya, hiçbir yerden link verilmese bile herkese açık bir URL'dir.
 * İletişim e-posta ve LinkedIn üzerinden.
 */

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
