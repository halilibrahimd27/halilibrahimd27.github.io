/**
 * GitHub yıldız / son push verisini build ÖNCESİ çeker.
 *
 * Neden ayrı bir adım, build'in içinde değil:
 * Yetkili istek için token gerekiyor (Actions runner'ları IP paylaştığı için
 * auth'suz istek sık sık rate-limit yiyor). Token'ı tüm Vite build'ine, yani
 * yüzlerce transitif bağımlılığın çalıştığı bir sürece vermek gereksiz bir
 * tedarik zinciri yüzeyi açar. Bu script yalnızca Node built-in'leri kullanır;
 * tek bir üçüncü parti paket bile import etmez.
 *
 * Çıktı: src/data/repo-stats.generated.json (gitignore'lu)
 * Build bu dosyayı VARSA kullanır, YOKSA projects.ts'teki yedek değerlere
 * düşer. Dosya hiç üretilemese bile build kırılmaz.
 *
 * Kullanım:
 *   node scripts/fetch-stats.mjs          # auth'suz (60 istek/saat/IP)
 *   GITHUB_TOKEN=... node scripts/…       # yetkili (5000 istek/saat)
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const USER = 'halilibrahimd27';
const ENDPOINT = `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`;
const OUT = join('src', 'data', 'repo-stats.generated.json');
const TIMEOUT_MS = 10_000;

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': `${USER}-portfolio-build` };
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

try {
  const response = await fetch(ENDPOINT, {
    headers,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  const repos = await response.json();
  if (!Array.isArray(repos)) throw new Error('beklenmeyen yanıt şekli');

  const stats = {};
  for (const repo of repos) {
    if (!repo || typeof repo.name !== 'string') continue;
    /* pushed_at = son commit. updated_at metadata değişiminde de oynar
       (yıldız, açıklama), "son güncelleme" için yanıltıcı olur. */
    const iso = repo.pushed_at ?? repo.updated_at;
    stats[repo.name] = {
      stars: Number(repo.stargazers_count) || 0,
      updated: typeof iso === 'string' ? iso.slice(0, 10) : null,
    };
  }

  await writeFile(OUT, `${JSON.stringify(stats, null, 2)}\n`, 'utf8');
  console.log(`✓ ${Object.keys(stats).length} repo istatistiği yazıldı → ${OUT}`);
} catch (error) {
  /* Ağ yok, rate-limit, zaman aşımı… hepsi tolere edilir.
     Build projects.ts'teki yedek değerlerle devam eder. */
  console.warn(
    `! GitHub istatistikleri çekilemedi (${error.message}) — yedek değerler kullanılacak.`,
  );
}
