import { GYM_INFO, SCHEDULE, SCHEDULE_KEYS, SERVICE_ITEMS } from './content';
import { STATS_VALUES, translations } from '../i18n/translations';

const { fr, en } = translations;

export const SITE_DOC_ID = 'content';
export const SITE_COLLECTION = 'site';

export function buildDefaultSiteContent() {
  return {
    gymInfo: { ...GYM_INFO },
    scheduleKeys: [...SCHEDULE_KEYS],
    schedule: JSON.parse(JSON.stringify(SCHEDULE)),
    serviceItems: SERVICE_ITEMS.map((item) => ({ ...item })),
    pricingData: JSON.parse(JSON.stringify(fr.pricingData)),
    statsValues: STATS_VALUES.map((s) => ({ ...s })),
    images: {
      hero: '/images/gym/boxing-class.jpg',
      stats: '/images/gym/gym-interior-2.jpg',
      why: '/images/gym/instructor-class.jpg',
    },
    content: {
      fr: {
        hero: { desc: fr.hero.desc },
        services: { items: JSON.parse(JSON.stringify(fr.services.items)) },
        pricing: {
          plans: JSON.parse(JSON.stringify(fr.pricing.plans)),
          benefits: [...fr.pricing.benefits],
        },
        rules: { desc: fr.rules.desc, items: [...fr.rules.items] },
        stats: { items: [...fr.stats.items] },
        hours: { ...fr.hours },
      },
      en: {
        hero: { desc: en.hero.desc },
        services: { items: JSON.parse(JSON.stringify(en.services.items)) },
        pricing: {
          plans: JSON.parse(JSON.stringify(en.pricing.plans)),
          benefits: [...en.pricing.benefits],
        },
        rules: { desc: en.rules.desc, items: [...en.rules.items] },
        stats: { items: [...en.stats.items] },
        hours: { ...en.hours },
      },
    },
  };
}

export const DEFAULT_SITE_CONTENT = buildDefaultSiteContent();
