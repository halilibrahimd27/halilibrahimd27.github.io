/**
 * Tarayıcı denetimi — konsol temizliği + JS kapalı senaryosu.
 *
 * CI'DA KOŞMAZ. Tarayıcı sürücüsü (puppeteer-core) kalıcı bir bağımlılık
 * değil; gerektiğinde geçici kurulur. CI zaten statik denetimleri yapıyor
 * (scripts/check-external-links.mjs + linkinator).
 *
 * Çalıştırma:
 *   pnpm build
 *   pnpm preview &                       # http://localhost:4321
 *   pnpm add -D puppeteer-core
 *   node scripts/browser-audit.mjs
 *   pnpm remove puppeteer-core
 *
 * CHROME yolunu ortam değişkeniyle geçebilirsiniz:
 *   CHROME_PATH=/usr/bin/chromium node scripts/browser-audit.mjs
 *
 * Neyi yakalar (gerçek bir örnek): inline `style` ATTRIBUTE'ları
 * `style-src 'self'` tarafından bloklanır ve hash'ler style attribute'larına
 * uygulanmaz. Bu denetim olmasaydı scroll-reveal gecikmeleri sessizce
 * çalışmıyor olacaktı.
 */
import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.PREVIEW_URL ?? 'http://localhost:4321';
const PAGES = ['/', '/en/', '/uses/', '/en/uses/', '/404.html'];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox'],
});

let failed = false;

/* ─── 1. Konsol temizliği ────────────────────────────────────────────────── */

for (const path of PAGES) {
  const page = await browser.newPage();
  const problems = [];

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      problems.push(`[${message.type()}] ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => problems.push(`[pageerror] ${error.message}`));
  page.on('requestfailed', (request) =>
    problems.push(`[requestfailed] ${request.url()} — ${request.failure()?.errorText}`),
  );
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`[http ${response.status()}] ${response.url()}`);
  });

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(BASE + path, { waitUntil: 'networkidle0' });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 900)));

  if (problems.length > 0) {
    failed = true;
    console.log(`✗ konsol ${path}`);
    for (const problem of [...new Set(problems)]) console.log(`    ${problem}`);
  } else {
    console.log(`✓ konsol temiz: ${path}`);
  }

  await page.close();
}

/* ─── 2. JS kapalıyken site okunabiliyor mu ──────────────────────────────── */

const page = await browser.newPage();
await page.setJavaScriptEnabled(false);
await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });

const nojs = await page.evaluate(() => {
  const visible = (element) => !!element && element.getClientRects().length > 0;

  return {
    sections: [
      'about',
      'experience',
      'projects',
      'skills',
      'principles',
      'education',
      'contact',
    ].filter((id) => visible(document.getElementById(id))),
    projects: document.querySelectorAll('[data-repo]').length,
    hiddenReveals: [...document.querySelectorAll('[data-reveal]')].filter(
      (element) => getComputedStyle(element).opacity === '0',
    ).length,
    themeToggleVisible: visible(document.querySelector('[data-theme-toggle]')),
    langLinkVisible: visible(document.querySelector('[data-lang-switch]')),
    characters: document.body.innerText.length,
  };
});

console.log('\n── JS KAPALI ──');
console.log(`  görünen bölüm            : ${nojs.sections.length}/7`);
console.log(`  proje kartı / satırı     : ${nojs.projects}`);
console.log(`  gizli kalan reveal öğesi : ${nojs.hiddenReveals}  (0 olmalı)`);
console.log(`  tema butonu görünür      : ${nojs.themeToggleVisible}  (false olmalı)`);
console.log(`  dil linki görünür        : ${nojs.langLinkVisible}  (true olmalı)`);
console.log(`  okunabilir metin         : ${nojs.characters} karakter`);

if (
  nojs.sections.length !== 7 ||
  nojs.hiddenReveals !== 0 ||
  nojs.themeToggleVisible ||
  !nojs.langLinkVisible
) {
  failed = true;
  console.log('✗ JS kapalı senaryosu beklentiyi karşılamadı');
}

await browser.close();
process.exit(failed ? 1 : 0);
