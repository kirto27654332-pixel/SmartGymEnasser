import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';
import { useSiteContent } from './SiteContentContext';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'smart-gym-lang';

function mergeTranslations(base, overrides, pricingData, statsValues) {
  if (!overrides) {
    return {
      ...base,
      pricingData: pricingData ?? base.pricingData,
    };
  }

  return {
    ...base,
    pricingData: pricingData ?? base.pricingData,
    hero: { ...base.hero, ...overrides.hero },
    hours: { ...base.hours, ...overrides.hours },
    services: {
      ...base.services,
      items: { ...base.services.items, ...overrides.services?.items },
    },
    pricing: {
      ...base.pricing,
      plans: {
        ...base.pricing.plans,
        ...overrides.pricing?.plans,
      },
      benefits: overrides.pricing?.benefits ?? base.pricing.benefits,
    },
    rules: {
      ...base.rules,
      desc: overrides.rules?.desc ?? base.rules.desc,
      items: overrides.rules?.items ?? base.rules.items,
    },
    stats: {
      ...base.stats,
      items: overrides.stats?.items ?? base.stats.items,
    },
  };
}

export function LanguageProvider({ children }) {
  const { content } = useSiteContent();
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'fr';
  });

  const t = useMemo(
    () => mergeTranslations(
      translations[lang],
      content.content[lang],
      content.pricingData,
      content.statsValues,
    ),
    [lang, content],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.title = t.meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({
    lang,
    t,
    setLang,
    toggleLang: () => setLang((prev) => (prev === 'fr' ? 'en' : 'fr')),
  }), [lang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function useGymInfo() {
  const { content } = useSiteContent();
  return content.gymInfo;
}
