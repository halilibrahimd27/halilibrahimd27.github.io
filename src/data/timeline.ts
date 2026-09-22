import type { EducationFacts, ExperienceFacts, VolunteeringStep } from './types';

/**
 * Deneyim / eğitim / gönüllülüğün DİLDEN BAĞIMSIZ gerçekleri.
 * Ünvanlar ve madde metinleri content.tr.ts / content.en.ts içinde, aynı id ile.
 *
 * `location` CV ile birebir aynı düzeyde: deneyim satırlarında şehir, hero'daki
 * konum satırında ülke. CV de tam olarak bunu yapıyor (başlıkta "Türkiye",
 * kayıtlarda "Malatya / Muğla"), böylece iki belge çelişmiyor.
 */
export const experience = [
  {
    id: 'ayssoft',
    org: 'Ayssoft Bilgi Teknolojileri',
    start: '2025-05',
    end: null,
    location: 'Malatya, Türkiye',
  },
  {
    id: 'inonu-ddo',
    org: 'İnönü Üniversitesi · Dijital Dönüşüm Ofisi',
    start: '2024-12',
    end: '2025-05',
    location: 'Malatya, Türkiye',
  },
  {
    id: 'shiftsoft',
    org: 'ShiftSoft Software Technology',
    start: '2024-07',
    end: '2024-09',
    location: 'Muğla, Türkiye',
  },
  {
    id: 'unity-dev',
    org: 'Unity Dev Group',
    start: '2023-08',
    end: '2024-12',
    location: 'Muğla, Türkiye',
  },
  {
    id: 'rextabi',
    org: 'Rextabi Creative',
    start: '2021-06',
    end: '2023-08',
    location: 'Muğla, Türkiye',
  },
] as const satisfies readonly ExperienceFacts[];

export type ExperienceId = (typeof experience)[number]['id'];

export const education = [
  {
    id: 'msc',
    org: 'İnönü Üniversitesi',
    start: '2026-09',
    end: null,
  },
  {
    id: 'bsc',
    org: 'İnönü Üniversitesi',
    start: '2021-10',
    end: '2026-06',
  },
] as const satisfies readonly EducationFacts[];

export type EducationId = (typeof education)[number]['id'];

/**
 * Siber Güvenlik Topluluğu'ndaki ilerleme — rol adları content dosyalarında.
 *
 * DİKKAT: bu dizi ESKİDEN YENİYE sıralı; yukarıdaki `experience` ve `education`
 * ise yeniden eskiye. Bu yüzden "şu anki rol" konumdan (son eleman) değil
 * `currentVolunteeringId` ile TARİHTEN türetilir — sıralama değişirse
 * vurgulanan adım yanlışa kaymasın diye.
 */
export const volunteering = [
  { id: 'member', since: '2023-10' },
  { id: 'board', since: '2024-09' },
  { id: 'lead', since: '2025-09' },
  { id: 'handover', since: '2026-09' },
] as const satisfies readonly VolunteeringStep[];

export type VolunteeringId = (typeof volunteering)[number]['id'];

/** En güncel gönüllülük adımı — dizinin sıralamasından bağımsız. */
export const currentVolunteeringId: VolunteeringId = volunteering.reduce((latest, step) =>
  step.since > latest.since ? step : latest,
).id;
