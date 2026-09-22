import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import csp from './integrations/csp';

/* ────────────────────────────────────────────────────────────────────────────
 * DEPLOY HEDEFİ — burası siteyi taşımak için değiştirmeniz gereken TEK yer.
 *
 *   User site   → https://halilibrahimd27.github.io        BASE = '/'
 *   Proje repo  → https://halilibrahimd27.github.io/xyz    BASE = '/xyz/'
 *   Özel alan   → https://ornek.com                        BASE = '/'
 *
 * BASE değişince tüm iç linkler, sitemap, OG URL'leri ve hreflang otomatik
 * olarak güncellenir (hiçbir yerde elle yazılmış yol yok).
 * ──────────────────────────────────────────────────────────────────────────── */
const SITE = 'https://halilibrahimd27.github.io';
const BASE = '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: {
    // Inline <style> üretilmesin: CSP'de style-src 'unsafe-inline' gerekmesin.
    inlineStylesheets: 'never',
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: { tr: 'tr-TR', en: 'en-GB' },
      },
    }),
    // Inline script'lerin sha256'sını hesaplayıp CSP meta'sına yazar.
    csp(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Tek CSS dosyası, öngörülebilir isim → CSP ve cache için sade çıktı.
      assetsInlineLimit: 0,
    },
  },
  devToolbar: { enabled: false },
});
