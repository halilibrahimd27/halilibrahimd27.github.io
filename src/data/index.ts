import { tr } from './content.tr';
import { en } from './content.en';
import type { Content, Locale } from './types';
import type { EducationId, ExperienceId, VolunteeringId } from './timeline';
import type { ProjectId } from './projects';
import type { SkillGroupId } from './skills';

/**
 * İçeriğin tek giriş noktası.
 *
 * Dönüş tipi bilinçli olarak `Content` arayüzüne genişletilir: bileşenler
 * içeriğin hangi dilden geldiğini bilmez, sadece sözleşmeyi görür.
 */
export type SiteContent = Content<
  ExperienceId,
  ProjectId,
  SkillGroupId,
  EducationId,
  VolunteeringId
>;

/**
 * YAPISAL EŞLİK DENETİMİ — build sırasında çalışır, ihlalde build'i kırar.
 *
 * `satisfies Content` ANAHTARLARI zorunlu kılar ama DİZİ UZUNLUKLARINI kılmaz:
 * bir dile bir madde/paragraf/prensip ekleyip diğerine eklememek tip hatası
 * vermez ve iki dil sessizce ayrışır. Repo birkaç yerde "iki dil ayrışamaz"
 * iddiasında bulunuyor; bu fonksiyon o iddiayı gerçekten karşılar.
 */
function assertParity(a: unknown, b: unknown, path: string): void {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      throw new Error(`İçerik eşliği bozuk: ${path} yalnızca bir dilde dizi.`);
    }
    if (a.length !== b.length) {
      throw new Error(
        `İçerik eşliği bozuk: ${path} → TR ${a.length} öğe, EN ${b.length} öğe. ` +
          `İki dil dosyasına da aynı sayıda madde ekleyin.`,
      );
    }
    a.forEach((item, i) => assertParity(item, b[i], `${path}[${i}]`));
    return;
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const key of keys) {
      assertParity(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
        `${path}.${key}`,
      );
    }
  }
}

assertParity(tr, en, 'content');

const contents: Record<Locale, SiteContent> = { tr, en };

export function getContent(locale: Locale): SiteContent {
  return contents[locale];
}

export { tr, en };
