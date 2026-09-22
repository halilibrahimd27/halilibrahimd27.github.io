/**
 * Tek tip sözleşmesi.
 *
 * content.tr.ts ve content.en.ts bu arayüzü `satisfies Content` ile karşılar.
 * Bir alan eksik ya da fazla olursa `pnpm build` KIRILIR — iki dilin içerik
 * yapısı asla birbirinden ayrışamaz.
 */

export type Locale = 'tr' | 'en';

/** Bölüm id'leri iki dilde de aynı (İngilizce) — dil değiştirici #hash'i koruyabilsin diye. */
export const SECTION_IDS = [
  'about',
  'experience',
  'projects',
  'skills',
  'principles',
  'education',
  'contact',
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/* ─── Dilden bağımsız gerçekler (src/data/*.ts) ──────────────────────────── */

export type ProjectTier = 'featured' | 'more' | 'hidden';

export interface ProjectFacts {
  /** GitHub repo adı — aynı zamanda kartın başlığı ve stats anahtarı. */
  readonly id: string;
  /** "owner/name" */
  readonly repo: string;
  /** Teknoloji etiketleri — kartta rozet olarak çıkar. */
  readonly tech: readonly string[];
  /** featured = büyük kart · more = kompakt satır · hidden = hiç render edilmez */
  readonly tier: ProjectTier;
  /** Canlı demo / GitHub Pages adresi (varsa). */
  readonly homepage?: string;
  /** GitHub API erişilemezse gösterilecek statik yıldız sayısı. */
  readonly stars: number;
  /** GitHub API erişilemezse gösterilecek son güncelleme (ISO, YYYY-MM-DD). */
  readonly updated: string;
}

export interface ExperienceFacts {
  readonly id: string;
  readonly org: string;
  readonly start: string; // YYYY-MM
  readonly end: string | null; // null = devam ediyor
  readonly location: string;
}

export interface EducationFacts {
  readonly id: string;
  readonly org: string;
  readonly start: string; // YYYY-MM
  readonly end: string | null;
}

export interface SkillGroupFacts {
  readonly id: string;
  readonly items: readonly string[];
}

export interface VolunteeringStep {
  readonly id: string;
  readonly since: string; // YYYY-MM
}

/* ─── Dile bağlı içerik (content.tr.ts / content.en.ts) ──────────────────── */

export interface ExperienceCopy {
  readonly role: string;
  readonly summary: string;
  readonly bullets: readonly string[];
}

export interface ProjectCopy {
  readonly tagline: string;
}

export interface EducationCopy {
  readonly degree: string;
  readonly note?: string;
}

export interface Principle {
  readonly title: string;
  readonly body: string;
}

export interface UsesGroup {
  readonly title: string;
  readonly items: readonly { readonly name: string; readonly note: string }[];
}

export interface CertificationCopy {
  readonly name: string;
  readonly full: string;
}

export interface Content<
  E extends string = string,
  P extends string = string,
  S extends string = string,
  D extends string = string,
  V extends string = string,
> {
  readonly meta: {
    readonly locale: Locale;
    readonly htmlLang: string;
    readonly title: string;
    readonly description: string;
    readonly ogImageAlt: string;
    /** OG görselinin alt satırı — scripts/og.ts bunu basar. */
    readonly ogTagline: string;
    readonly usesTitle: string;
    readonly usesDescription: string;
  };

  readonly ui: {
    readonly skipToContent: string;
    readonly sectionsLabel: string;
    readonly themeToggle: string;
    readonly themeLight: string;
    readonly themeDark: string;
    readonly languageLabel: string;
    readonly switchTo: string;
    readonly backToTop: string;
    readonly externalLink: string;
    readonly stars: string;
    readonly updatedPrefix: string;
    readonly liveDemo: string;
    readonly sourceCode: string;
    readonly present: string;
    readonly inPreparation: string;
    readonly backHome: string;
  };

  readonly nav: Readonly<Record<SectionId, string>>;

  readonly hero: {
    readonly name: string;
    readonly role: string;
    readonly positioning: string;
    readonly locationLabel: string;
    readonly location: string;
    /** Hero'nun sağındaki "Şu an" kartı — değerler timeline/CV'den türer. */
    readonly nowHeading: string;
    readonly roleLabel: string;
    readonly companyLabel: string;
    readonly prepLabel: string;
    readonly ctaGithub: string;
    readonly ctaLinkedin: string;
    readonly ctaCv: string;
  };

  readonly about: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly languagesLabel: string;
    readonly languages: readonly string[];
  };

  readonly experience: {
    readonly heading: string;
    readonly items: Readonly<Record<E, ExperienceCopy>>;
  };

  readonly projects: {
    readonly heading: string;
    readonly intro: string;
    readonly moreHeading: string;
    readonly allReposLabel: string;
    readonly items: Readonly<Record<P, ProjectCopy>>;
  };

  readonly skills: {
    readonly heading: string;
    readonly intro: string;
    readonly groups: Readonly<Record<S, string>>;
  };

  readonly principles: {
    readonly heading: string;
    readonly intro: string;
    readonly items: readonly Principle[];
  };

  readonly education: {
    readonly heading: string;
    readonly educationLabel: string;
    readonly volunteeringLabel: string;
    readonly certificationsLabel: string;
    readonly items: Readonly<Record<D, EducationCopy>>;
    readonly volunteeringOrg: string;
    /** Anahtarlar src/data/timeline.ts → volunteering id'leri ile birebir. */
    readonly volunteeringRoles: Readonly<Record<V, string>>;
    readonly volunteeringNote: string;
    readonly certifications: readonly CertificationCopy[];
  };

  readonly contact: {
    readonly heading: string;
    readonly intro: string;
    readonly emailLabel: string;
    readonly emailPending: string;
    readonly githubLabel: string;
    readonly linkedinLabel: string;
    readonly cvLabel: string;
  };

  readonly uses: {
    readonly heading: string;
    readonly intro: string;
    readonly groups: readonly UsesGroup[];
  };

  readonly notFound: {
    readonly code: string;
    readonly title: string;
    readonly body: string;
  };

  readonly footer: {
    readonly builtWith: string;
    readonly sourceLabel: string;
    readonly rights: string;
  };
}
