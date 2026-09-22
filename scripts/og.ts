/**
 * Open Graph görselleri + apple-touch-icon üretimi.
 *
 * BUILD'İN PARÇASI DEĞİLDİR. Bir kez çalıştırılır, çıktılar public/og/ ve
 * public/ altına commit edilir. Böylece CI'da ne satori/resvg bağımlılığı ne
 * de font dönüştürme adımı olur; build deterministik ve hızlı kalır.
 *
 * Çalıştırma (bağımlılıklar geçici olarak indirilir, lockfile'a girmez):
 *   pnpm add -D satori @resvg/resvg-js @fontsource/jetbrains-mono tsx
 *   npx tsx scripts/og.ts
 *   pnpm remove satori @resvg/resvg-js @fontsource/jetbrains-mono tsx
 *
 * Bağımlılıklar bilerek kalıcı DEĞİL: CI'ın her koşuda native bir resvg
 * binary'si indirmesine ve lockfile'ın şişmesine gerek yok.
 *
 * Yeniden çalıştırmanız gereken durumlar:
 *   - ad / ünvan / ogTagline değişirse (src/data/content.*.ts)
 *   - accent rengi ya da tipografi değişirse
 *
 * Metin src/data/content.*.ts'ten gelir — burada elle yazılmış içerik yoktur.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { tr } from '../src/data/content.tr.ts';
import { en } from '../src/data/content.en.ts';
import { site } from '../src/data/site.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const COLOR = {
  bg: '#0B0E11',
  line: '#1E252D',
  text: '#E6EDF3',
  muted: '#808C99',
  accent: '#4ADE80',
};

/**
 * Sitenin kendisi variable font kullanır, ama satori'nin opentype.js çatalı
 * variable font'un `fvar` tablosunda kırılıyor — bu yüzden OG üretiminde
 * @fontsource/jetbrains-mono'nun STATİK ağırlıkları (.woff) kullanılıyor.
 * Görsel sonuç aynı: aynı aile, aynı 400/700 ağırlıkları.
 *
 * Dört dosyanın hepsi aynı aile adıyla yüklenir; satori eksik glyph'te
 * diğerine düşer. Türkçe için şart: İ (U+0130) ve ş (U+015F) latin-ext'te,
 * ü ve i latin'de.
 */
const FAMILY = 'JetBrains Mono';
const FAMILY_EXT = 'JetBrains Mono Ext';

/**
 * Alt kümeler AYRI aile adlarıyla yüklenir. satori aynı aile adı altındaki
 * ikinci dosyaya düşmez — glyph bulunamazsa tofu basar. Fallback ancak
 * fontFamily listesiyle çalışır: 'JetBrains Mono, JetBrains Mono Ext'.
 */
const FONT_FILES = [
  { file: 'jetbrains-mono-latin-400-normal.woff', weight: 400, name: FAMILY },
  { file: 'jetbrains-mono-latin-700-normal.woff', weight: 700, name: FAMILY },
  { file: 'jetbrains-mono-latin-ext-400-normal.woff', weight: 400, name: FAMILY_EXT },
  { file: 'jetbrains-mono-latin-ext-700-normal.woff', weight: 700, name: FAMILY_EXT },
] as const;

async function loadFonts() {
  const fonts = [];

  for (const { file, weight, name } of FONT_FILES) {
    const data = await readFile(
      join(ROOT, 'node_modules', '@fontsource/jetbrains-mono/files', file),
    );
    fonts.push({ name, data, weight, style: 'normal' as const });
  }

  return fonts;
}

interface Node {
  type: string;
  props: Record<string, unknown>;
}

const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, ...(children === undefined ? {} : { children }) },
});

function card(name: string, role: string, tagline: string, footer: string): Node {
  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: COLOR.bg,
      padding: '64px 72px',
      fontFamily: `${FAMILY}, ${FAMILY_EXT}`,
    },
    [
      /* Üst: accent işaret + ünvan */
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', {
          width: 72,
          height: 6,
          backgroundColor: COLOR.accent,
          borderRadius: 2,
          marginBottom: 40,
        }),
        el(
          'div',
          { fontSize: 26, color: COLOR.accent, letterSpacing: 4, textTransform: 'uppercase' },
          role,
        ),
      ]),

      /* Orta: ad + tek satır konumlandırma */
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el(
          'div',
          { fontSize: 76, fontWeight: 700, color: COLOR.text, lineHeight: 1.1, marginBottom: 24 },
          name,
        ),
        el('div', { fontSize: 26, color: COLOR.muted, lineHeight: 1.4 }, tagline),
      ]),

      /* Alt: hairline + kimlik satırı */
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', { height: 1, backgroundColor: COLOR.line, marginBottom: 24 }),
        el('div', { fontSize: 22, color: COLOR.muted }, footer),
      ]),
    ],
  );
}

async function renderPng(node: Node, fonts: Awaited<ReturnType<typeof loadFonts>>, out: string) {
  const svg = await satori(node as never, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await writeFile(out, png);
  console.log(`✓ ${out.replace(ROOT, '.')}  (${(png.length / 1024).toFixed(1)} KB)`);
}

async function renderIcon() {
  const svg = await readFile(join(ROOT, 'public', 'favicon.svg'), 'utf8');
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 180 } }).render().asPng();
  const out = join(ROOT, 'public', 'apple-touch-icon.png');
  await writeFile(out, png);
  console.log(`✓ ${out.replace(ROOT, '.')}  (${(png.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  const fonts = await loadFonts();
  await mkdir(join(ROOT, 'public', 'og'), { recursive: true });

  /* Alt satır da veriden türetilir — burada elle yazılmış metin yok. */
  const handle = `github.com/${site.github.user}`;

  for (const content of [tr, en]) {
    await renderPng(
      card(
        content.hero.name,
        content.hero.role,
        content.meta.ogTagline,
        `${handle}  ·  ${content.hero.location}`,
      ),
      fonts,
      join(ROOT, 'public', 'og', `og-${content.meta.locale}.png`),
    );
  }

  await renderIcon();
}

await main();
