/**
 * Build çıktısında güvenlik denetimi — bağımlılık gerektirmez, CI'da koşar.
 *
 * Üç şeyi doğrular:
 *   1) target="_blank" olan HER <a> rel="noopener noreferrer" taşıyor mu
 *   2) CSP meta'sında doldurulmamış __CSP_SCRIPT_HASHES__ yer tutucusu kalmış mı
 *   3) 'unsafe-inline' / 'unsafe-eval' politikaya sızmış mı
 *
 * Bunlar bileşen düzeyinde zaten garanti (ui/ExternalLink.astro), ama bu
 * kontrol garantinin ileride sessizce bozulmasını engeller.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = 'dist';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) files.push(full);
  }

  return files;
}

const problems = [];
const files = await htmlFiles(DIST);

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const where = relative(DIST, file);

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/target\s*=\s*["']_blank["']/i.test(tag)) continue;

    const rel = tag.match(/rel\s*=\s*["']([^"']*)["']/i)?.[1]?.toLowerCase() ?? '';
    const tokens = rel.split(/\s+/);

    if (!tokens.includes('noopener') || !tokens.includes('noreferrer')) {
      problems.push(`${where}: target="_blank" ama rel eksik → ${tag}`);
    }
  }

  if (html.includes('__CSP_SCRIPT_HASHES__')) {
    problems.push(`${where}: CSP yer tutucusu doldurulmamış (integrations/csp.ts çalışmamış)`);
  }

  const csp = html.match(/http-equiv="Content-Security-Policy"\s+content="([^"]*)"/i)?.[1] ?? '';
  for (const unsafe of ["'unsafe-inline'", "'unsafe-eval'"]) {
    if (csp.includes(unsafe)) problems.push(`${where}: CSP içinde ${unsafe} var`);
  }
}

if (problems.length > 0) {
  console.error(`✗ ${problems.length} sorun bulundu:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`✓ ${files.length} sayfa denetlendi: dış link rel'leri ve CSP temiz.`);
