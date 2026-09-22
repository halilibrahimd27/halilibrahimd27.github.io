import type { AstroIntegration } from 'astro';
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * CSP hash entegrasyonu.
 *
 * GitHub Pages HTTP header veremiyor, bu yüzden politika <meta http-equiv>
 * ile kuruluyor. Tek sorun: sayfada kalan inline script'ler (JSON-LD veri
 * bloğu) `script-src 'self'` ile uyumlu olmaz.
 *
 * Bu entegrasyon build bittikten sonra her HTML dosyasını gezer, src'siz
 * <script> bloklarının sha256'sını hesaplar ve CSP meta'sındaki
 * __CSP_SCRIPT_HASHES__ yer tutucusunu bu hash'lerle değiştirir.
 * Böylece 'unsafe-inline' HİÇ kullanılmaz.
 *
 * DÜRÜST NOT: <meta> ile kurulan CSP'de `frame-ancestors`, `sandbox` ve
 * `report-uri` tarayıcı tarafından yok sayılır (spec gereği). GitHub Pages
 * header veremediği için bu üçü bu sitede uygulanamaz; politikaya eklenip
 * varmış gibi gösterilmiyor.
 */

const PLACEHOLDER = '__CSP_SCRIPT_HASHES__';
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) files.push(full);
  }

  return files;
}

function sha256(source: string): string {
  return `'sha256-${createHash('sha256').update(source, 'utf8').digest('base64')}'`;
}

export default function csp(): AstroIntegration {
  return {
    name: 'csp-inline-hashes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const files = await htmlFiles(outDir);
        let patched = 0;
        let hashed = 0;

        for (const file of files) {
          const html = await readFile(file, 'utf8');
          if (!html.includes(PLACEHOLDER)) continue;

          const hashes = new Set<string>();
          for (const match of html.matchAll(INLINE_SCRIPT)) {
            const body = match[1];
            if (body === undefined || body.trim() === '') continue;
            hashes.add(sha256(body));
          }

          /* Yer tutucu meta'da boşluksuz durur: script-src 'self'__CSP_SCRIPT_HASHES__;
             Hash yoksa iz bırakmadan silinir, varsa baştaki boşlukla eklenir. */
          const replacement = hashes.size > 0 ? ` ${[...hashes].join(' ')}` : '';
          await writeFile(file, html.replaceAll(PLACEHOLDER, replacement), 'utf8');

          patched += 1;
          hashed += hashes.size;
        }

        logger.info(`CSP: ${patched} sayfa işlendi, ${hashed} inline script hash'lendi.`);
      },
    },
  };
}
