import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ProjectFacts } from './types';

/**
 * Build sırasında GitHub istatistiklerini birleştirir.
 *
 * Akış:
 *   1. scripts/fetch-stats.mjs  → src/data/repo-stats.generated.json (CI'da)
 *   2. bu modül                 → sunucuda basılan HTML'e taze değerleri koyar
 *   3. src/scripts/github-stats → ziyaretçinin tarayıcısında canlı günceller
 *
 * projects.ts'teki `stars` / `updated` alanları yalnızca ÜÇÜNÜN DE
 * başarısız olduğu durum için son çare yedektir; elle bakım gerektirmez.
 *
 * Bu dosya YALNIZCA sunucu tarafında (build) çalışır — node:fs kullanır,
 * hiçbir client script'i buradan import etmemelidir.
 */

interface RepoStat {
  readonly stars: number;
  readonly updated: string | null;
}

const GENERATED = join(process.cwd(), 'src', 'data', 'repo-stats.generated.json');

function loadGenerated(): Record<string, RepoStat> {
  if (!existsSync(GENERATED)) return {};

  try {
    const parsed: unknown = JSON.parse(readFileSync(GENERATED, 'utf8'));
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, RepoStat>) : {};
  } catch {
    /* Bozuk dosya build'i kırmaz — yedek değerlerle devam. */
    return {};
  }
}

const generated = loadGenerated();

/** Bir projenin build anındaki en taze yıldız/tarih değerleri. */
export function resolveStats(project: ProjectFacts): { stars: number; updated: string } {
  const live = generated[project.id];

  return {
    stars: typeof live?.stars === 'number' ? live.stars : project.stars,
    updated: live?.updated ?? project.updated,
  };
}

/** Çekilmiş veri var mı — build çıktısında bilgi amaçlı loglamak için. */
export const hasGeneratedStats = Object.keys(generated).length > 0;
