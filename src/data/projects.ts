import type { ProjectFacts } from './types';

/**
 * Projelerin DİLDEN BAĞIMSIZ gerçekleri.
 * Açıklama metinleri content.tr.ts / content.en.ts içinde, aynı `id` ile.
 *
 * Yeni proje eklemek:
 *   1) buraya bir obje ekleyin
 *   2) iki content dosyasına aynı id ile birer `tagline` ekleyin
 * Birini unutursanız TypeScript build'i kırar.
 *
 * `tier`:
 *   featured → büyük kart (Öne çıkanlar)
 *   more     → kompakt satır (Diğer projeler)
 *   hidden   → hiç render edilmez  ← göstermek için 'more' yapmanız yeterli
 *
 * `stars` / `updated` yalnızca YEDEK değerdir: sayfa açıldığında GitHub API'den
 * canlı veri çekilir ve yerinde güncellenir. API'ye ulaşılamazsa bu değerler
 * görünür. Son elle güncelleme: 2026-09-22.
 */
export const projects = [
  {
    id: 'cheat-sheet',
    repo: 'halilibrahimd27/cheat-sheet',
    tech: ['JavaScript', 'PWA', 'Docker', 'Local-first'],
    tier: 'featured',
    homepage: 'https://halilibrahimd27.github.io/cheat-sheet/',
    stars: 41,
    updated: '2026-09-15',
  },
  {
    id: 'tenant-trace',
    repo: 'halilibrahimd27/tenant-trace',
    tech: ['Python', 'DAST', 'Docker', 'GitHub Actions'],
    tier: 'featured',
    homepage: 'https://halilibrahimd27.github.io/tenant-trace/',
    stars: 5,
    updated: '2026-08-09',
  },
  {
    id: 'devsecops-handbook',
    repo: 'halilibrahimd27/devsecops-handbook',
    tech: ['Documentation', 'TR / EN', 'Kubernetes', 'Terraform'],
    tier: 'featured',
    homepage: 'https://halilibrahimd27.github.io/devsecops-handbook/',
    stars: 12,
    updated: '2026-07-26',
  },
  {
    id: 'databases-stack',
    repo: 'halilibrahimd27/databases-stack',
    tech: ['Shell', 'Docker Compose', 'Kubernetes', 'PostgreSQL'],
    tier: 'featured',
    stars: 0,
    updated: '2026-09-07',
  },
  {
    id: 'pipeline-101-lab',
    repo: 'halilibrahimd27/pipeline-101-lab',
    tech: ['GitHub Actions', 'CI/CD', 'Supply chain', 'JavaScript'],
    tier: 'featured',
    stars: 0,
    updated: '2026-08-25',
  },
  {
    id: 'api-sentinel',
    repo: 'halilibrahimd27/api-sentinel',
    tech: ['Python', 'FastAPI', 'APScheduler', 'SQLite'],
    tier: 'featured',
    stars: 0,
    updated: '2026-04-30',
  },
  {
    id: 'wakapi-admin',
    repo: 'halilibrahimd27/wakapi-admin',
    tech: ['Python', 'Flask', 'Prometheus', 'Grafana'],
    tier: 'featured',
    stars: 0,
    updated: '2026-06-11',
  },
  {
    id: 'goad-light-vmware-windows',
    repo: 'halilibrahimd27/goad-light-vmware-windows',
    tech: ['PowerShell', 'Active Directory', 'VMware', 'Red team'],
    tier: 'featured',
    stars: 1,
    updated: '2026-09-12',
  },

  /* ─── Diğer projeler (kompakt liste) ─────────────────────────────────── */
  {
    id: 'file-crypter',
    repo: 'halilibrahimd27/file-crypter',
    tech: ['Python', 'AES-256', 'PBKDF2'],
    tier: 'more',
    stars: 0,
    updated: '2026-04-30',
  },
  {
    id: 'ai-dev-swarm',
    repo: 'halilibrahimd27/ai-dev-swarm',
    tech: ['Python', 'Multi-agent'],
    tier: 'more',
    stars: 1,
    updated: '2026-06-07',
  },
  {
    id: 'living-api-contract-guardian',
    repo: 'halilibrahimd27/living-api-contract-guardian',
    tech: ['Python', 'Static analysis', 'CI'],
    tier: 'more',
    stars: 0,
    updated: '2026-06-07',
  },
  {
    id: 'kurulum',
    repo: 'halilibrahimd27/kurulum',
    tech: ['Kubernetes', 'Ubuntu', 'Documentation'],
    tier: 'more',
    stars: 0,
    updated: '2025-04-29',
  },

  /* ─── Gizli: göstermek için tier'ı 'more' yapın ──────────────────────── */
  {
    id: 'yepaket',
    repo: 'halilibrahimd27/yepaket',
    tech: ['NestJS', 'React', 'Flutter', 'PostGIS'],
    tier: 'hidden',
    stars: 3,
    updated: '2026-08-22',
  },
  {
    id: 'trafik-analiz',
    repo: 'halilibrahimd27/trafik-analiz',
    tech: ['Python', 'TensorFlow', 'CNN'],
    tier: 'hidden',
    stars: 0,
    updated: '2026-06-03',
  },
  {
    id: 'RealTimeObjectDetection',
    repo: 'halilibrahimd27/RealTimeObjectDetection',
    tech: ['YOLOv8', 'Angular', 'Flask'],
    tier: 'hidden',
    stars: 0,
    updated: '2025-12-24',
  },
] as const satisfies readonly ProjectFacts[];

export type ProjectId = (typeof projects)[number]['id'];

export const featuredProjects = projects.filter((p) => p.tier === 'featured');
export const moreProjects = projects.filter((p) => p.tier === 'more');
/** GitHub stats fetch'inin ilgileneceği repo adları. */
export const visibleRepoNames = projects.filter((p) => p.tier !== 'hidden').map((p) => p.id);
