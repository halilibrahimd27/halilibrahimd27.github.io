/**
 * Build çıktısı denetimi — bağımlılık gerektirmez, CI'da her koşuda çalışır.
 *
 * Dört şeyi doğrular:
 *   1) target="_blank" olan HER <a> rel="noopener noreferrer" taşıyor mu
 *   2) CSP meta'sında doldurulmamış __CSP_SCRIPT_HASHES__ yer tutucusu kalmış mı
 *   3) 'unsafe-inline' / 'unsafe-eval' politikaya sızmış mı
 *   4) Doldurulmamış bir içerik yer tutucusu sayfaya basılmış mı
 *
 * (4) bir kez gerçekten kaçtı: /uses sayfasındaki donanım satırları canlıya
 * "<PLACEHOLDER_LAPTOP>" olarak çıktı. Artık build kırılıyor.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = 'dist';

/** Sayfaya asla basılmaması gereken kalıplar. */
const FORBIDDEN_TEXT = [
  { pattern: /<PLACEHOLDER_[A-Z0-9_]*>/g, label: 'doldurulmamış içerik yer tutucusu' },
  { pattern: /\bTODO\b|\bFIXME\b|\bXXX\b/g, label: 'geliştirme notu' },
  { pattern: /lorem ipsum/gi, label: 'dolgu metni' },
];

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

  /* 1) Dış linklerde rel ------------------------------------------------- */
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/target\s*=\s*["']_blank["']/i.test(tag)) continue;

    const rel = tag.match(/rel\s*=\s*["']([^"']*)["']/i)?.[1]?.toLowerCase() ?? '';
    const tokens = rel.split(/\s+/);

    if (!tokens.includes('noopener') || !tokens.includes('noreferrer')) {
      problems.push(`${where}: target="_blank" ama rel eksik → ${tag}`);
    }
  }

  /* 2) + 3) CSP ----------------------------------------------------------- */
  if (html.includes('__CSP_SCRIPT_HASHES__')) {
    problems.push(`${where}: CSP yer tutucusu doldurulmamış (integrations/csp.ts çalışmamış)`);
  }

  const csp = html.match(/http-equiv="Content-Security-Policy"\s+content="([^"]*)"/i)?.[1] ?? '';
  for (const unsafe of ["'unsafe-inline'", "'unsafe-eval'"]) {
    if (csp.includes(unsafe)) problems.push(`${where}: CSP içinde ${unsafe} var`);
  }

  /* 4) Yayına çıkmaması gereken metin ------------------------------------- */
  for (const { pattern, label } of FORBIDDEN_TEXT) {
    const hits = [...new Set(html.match(pattern) ?? [])];
    for (const hit of hits) {
      problems.push(`${where}: ${label} yayına çıkmış → ${hit}`);
    }
  }
}

if (problems.length > 0) {
  console.error(`✗ ${problems.length} sorun bulundu:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`✓ ${files.length} sayfa denetlendi: dış link rel'leri, CSP ve içerik temiz.`);
