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

const contents: Record<Locale, SiteContent> = { tr, en };

export function getContent(locale: Locale): SiteContent {
  return contents[locale];
}

export { tr, en };
