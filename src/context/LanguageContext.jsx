import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'smart-gym-lang';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'fr';
  });

  const t = translations[lang];

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
