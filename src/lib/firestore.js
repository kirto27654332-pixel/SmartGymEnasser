import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import {
  DEFAULT_SITE_CONTENT,
  SITE_COLLECTION,
  SITE_DOC_ID,
} from '../data/defaultSiteContent';

export async function fetchSiteContent() {
  if (!isFirebaseConfigured || !db) return null;

  const ref = doc(db, SITE_COLLECTION, SITE_DOC_ID);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
}

export async function saveSiteContent(data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase non configuré');
  }

  const ref = doc(db, SITE_COLLECTION, SITE_DOC_ID);
  await setDoc(ref, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function seedSiteContentIfEmpty() {
  const existing = await fetchSiteContent();
  if (existing) return existing;

  const defaults = DEFAULT_SITE_CONTENT;
  await saveSiteContent(defaults);
  return defaults;
}

export function mergeSiteContent(fetched) {
  if (!fetched) return DEFAULT_SITE_CONTENT;

  const defaults = DEFAULT_SITE_CONTENT;

  return {
    gymInfo: { ...defaults.gymInfo, ...fetched.gymInfo },
    scheduleKeys: fetched.scheduleKeys ?? defaults.scheduleKeys,
    schedule: fetched.schedule ?? defaults.schedule,
    serviceItems: fetched.serviceItems ?? defaults.serviceItems,
    pricingData: fetched.pricingData ?? defaults.pricingData,
    statsValues: fetched.statsValues ?? defaults.statsValues,
    images: { ...defaults.images, ...fetched.images },
    content: {
      fr: {
        ...defaults.content.fr,
        ...fetched.content?.fr,
        hero: { ...defaults.content.fr.hero, ...fetched.content?.fr?.hero },
        services: {
          items: {
            ...defaults.content.fr.services.items,
            ...fetched.content?.fr?.services?.items,
          },
        },
        pricing: {
          plans: {
            ...defaults.content.fr.pricing.plans,
            ...fetched.content?.fr?.pricing?.plans,
          },
          benefits: fetched.content?.fr?.pricing?.benefits ?? defaults.content.fr.pricing.benefits,
        },
        rules: {
          ...defaults.content.fr.rules,
          ...fetched.content?.fr?.rules,
          items: fetched.content?.fr?.rules?.items ?? defaults.content.fr.rules.items,
        },
        stats: {
          items: fetched.content?.fr?.stats?.items ?? defaults.content.fr.stats.items,
        },
        hours: { ...defaults.content.fr.hours, ...fetched.content?.fr?.hours },
      },
      en: {
        ...defaults.content.en,
        ...fetched.content?.en,
        hero: { ...defaults.content.en.hero, ...fetched.content?.en?.hero },
        services: {
          items: {
            ...defaults.content.en.services.items,
            ...fetched.content?.en?.services?.items,
          },
        },
        pricing: {
          plans: {
            ...defaults.content.en.pricing.plans,
            ...fetched.content?.en?.pricing?.plans,
          },
          benefits: fetched.content?.en?.pricing?.benefits ?? defaults.content.en.pricing.benefits,
        },
        rules: {
          ...defaults.content.en.rules,
          ...fetched.content?.en?.rules,
          items: fetched.content?.en?.rules?.items ?? defaults.content.en.rules.items,
        },
        stats: {
          items: fetched.content?.en?.stats?.items ?? defaults.content.en.stats.items,
        },
        hours: { ...defaults.content.en.hours, ...fetched.content?.en?.hours },
      },
    },
  };
}
