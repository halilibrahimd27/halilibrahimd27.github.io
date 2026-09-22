/**
 * Build çıktısı denetimi — bağımlılık gerektirmez, CI'da her koşuda çalışır.
 *
 * Dört şeyi doğrular:
 *   1) target="_blank" olan HER <a> rel="noopener noreferrer" taşıyor mu
 *   2) CSP meta'sı var mı, içeriği beklenen direktifleri taşıyor mu
 *   3) 'unsafe-inline' / 'unsafe-eval' politikaya sızmış mı
 *   4) Doldurulmamış bir içerik yer tutucusu sayfaya basılmış mı
 *
 * (4) bir kez gerçekten kaçtı: /uses sayfasındaki donanım satırları canlıya
 * "<PLACEHOLDER_LAPTOP>" olarak çıktı. Artık build kırılıyor.
 *
 * Attribute değerini okurken tırnak tipi GERİ-REFERANSLA eşleştirilir. Naif
 * ["']([^"']*)["'] kalıbı burada işe yaramaz: content="default-src 'self'; …"
 * değerinin içinde tek tırnaklar var, yakalama ilk 'self' tırnağında kesilir
 * ve politikanın geri kalanı denetlenmeden geçerdi.
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

/** CSP'de bulunması beklenen direktifler. */
const REQUIRED_DIRECTIVES = [
  'default-src',
  'script-src',
  'style-src',
  'img-src',
  'connect-src',
  'object-src',
  'base-uri',
  'form-action',
];

/** Tırnak tipini geri-referansla eşleştirip attribute değerini döndürür. */
function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'));
  return match ? match[2] : undefined;
}

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

  /* 1) Dış linklerde rel --------------------------------------------------- */
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/target\s*=\s*["']_blank["']/i.test(tag)) continue;

    const tokens = (attr(tag, 'rel') ?? '').toLowerCase().split(/\s+/);

    if (!tokens.includes('noopener') || !tokens.includes('noreferrer')) {
      problems.push(`${where}: target="_blank" ama rel eksik → ${tag}`);
    }
  }

  /* 2) + 3) CSP ------------------------------------------------------------
   *
   * Meta attribute SIRASINDAN bağımsız aranır ve YOKLUĞU da hata sayılır.
   * Önceki sürüm `http-equiv=… content=…` sırasını şart koşuyordu: attribute'lar
   * yer değiştirse ya da meta tamamen kaybolsa eşleşme boş string olur,
   * 'unsafe-inline' araması boş stringde tutmaz ve denetim sessizce GEÇERDİ —
   * yani korumakla yükümlü olduğu iki durumda kördü.
   */
  if (html.includes('__CSP_SCRIPT_HASHES__')) {
    problems.push(`${where}: CSP yer tutucusu doldurulmamış (integrations/csp.ts çalışmamış)`);
  }

  const cspTag = html.match(
    /<meta\b[^>]*http-equiv\s*=\s*["']Content-Security-Policy["'][^>]*>/i,
  )?.[0];

  if (!cspTag) {
    problems.push(`${where}: Content-Security-Policy meta'sı yok`);
  } else {
    const csp = attr(cspTag, 'content');

    if (!csp) {
      problems.push(`${where}: CSP meta'sının content'i boş`);
    } else {
      for (const unsafe of ["'unsafe-inline'", "'unsafe-eval'"]) {
        if (csp.includes(unsafe)) problems.push(`${where}: CSP içinde ${unsafe} var`);
      }
      for (const directive of REQUIRED_DIRECTIVES) {
        if (!csp.includes(`${directive} `)) {
          problems.push(`${where}: CSP'de ${directive} eksik`);
        }
      }
    }
  }

  /* 4) Yayına çıkmaması gereken metin --------------------------------------- */
  for (const { pattern, label } of FORBIDDEN_TEXT) {
    for (const hit of new Set(html.match(pattern) ?? [])) {
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
