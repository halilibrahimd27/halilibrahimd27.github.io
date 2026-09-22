/**
 * GitHub yıldız / son güncelleme verisi (island #3).
 *
 * Sözleşme:
 *   - Kartlar sunucuda ZATEN statik veriyle tam render edilmiştir.
 *   - Bu script yalnızca mevcut metni YERİNDE günceller.
 *   - İstek başarısız olursa (offline, rate-limit, 404) hiçbir şey yapmaz:
 *     hata gösterilmez, boş alan kalmaz, düzen kaymaz.
 *   - Tek istek, 1 saatlik localStorage cache. Auth yok, token yok.
 */

interface Repo {
  name: string;
  stargazers_count: number;
  pushed_at: string | null;
  updated_at: string | null;
}

interface CacheEntry {
  at: number;
  repos: Repo[];
}

const CACHE_KEY = 'gh-repos-v1';
const TTL_MS = 60 * 60 * 1000;

function readCache(): Repo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (!entry || typeof entry.at !== 'number' || !Array.isArray(entry.repos)) return null;
    if (Date.now() - entry.at > TTL_MS) return null;
    return entry.repos;
  } catch {
    return null;
  }
}

function writeCache(repos: Repo[]): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos } satisfies CacheEntry));
  } catch {
    /* kota dolu / private mode — cache olmadan da çalışır */
  }
}

async function fetchRepos(endpoint: string): Promise<Repo[] | null> {
  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/vnd.github+json' },
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    if (!Array.isArray(data)) return null;
    return data as Repo[];
  } catch {
    return null;
  }
}

function formatDay(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}

function apply(repos: Repo[]): void {
  const byName = new Map(repos.map((repo) => [repo.name, repo]));
  const locale = document.documentElement.lang || 'en';

  for (const card of document.querySelectorAll<HTMLElement>('[data-repo]')) {
    const repo = byName.get(card.dataset.repo ?? '');
    if (!repo) continue;

    const starsValue = card.querySelector<HTMLElement>('[data-stars-value]');
    const starsWrap = card.querySelector<HTMLElement>('[data-stars]');
    if (starsValue && starsWrap) {
      const count = Number(repo.stargazers_count) || 0;
      starsValue.textContent = String(count);
      starsWrap.hidden = count === 0;
    }

    const updated = card.querySelector<HTMLElement>('[data-updated]');
    const iso = repo.pushed_at ?? repo.updated_at;
    if (updated && iso) {
      const date = new Date(iso);
      if (!Number.isNaN(date.getTime())) {
        updated.textContent = formatDay(iso, locale);
        updated.setAttribute('datetime', iso.slice(0, 10));
      }
    }
  }
}

async function run(): Promise<void> {
  const endpoint =
    document.querySelector<HTMLElement>('[data-github-endpoint]')?.dataset.githubEndpoint;
  if (!endpoint) return;

  const cached = readCache();
  if (cached) {
    apply(cached);
    return;
  }

  const repos = await fetchRepos(endpoint);
  if (!repos) return; /* sessizce statik veride kal */

  const slim: Repo[] = repos.map((repo) => ({
    name: repo.name,
    stargazers_count: repo.stargazers_count,
    pushed_at: repo.pushed_at,
    updated_at: repo.updated_at,
  }));

  writeCache(slim);
  apply(slim);
}

void run();

/* Bu dosya bir modül olarak derlensin — global scope kirlenmesin. */
export {};
