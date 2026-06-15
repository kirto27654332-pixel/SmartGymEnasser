import { useLanguage } from '../context/LanguageContext';
import './LanguageToggle.css';

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`lang-toggle ${className}`}
      role="group"
      aria-label={t.nav.langSwitch}
    >
      <button
        type="button"
        className={`lang-toggle__btn ${lang === 'fr' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLang('fr')}
        aria-pressed={lang === 'fr'}
      >
        FR
      </button>
      <button
        type="button"
        className={`lang-toggle__btn ${lang === 'en' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <span className="lang-toggle__slider" data-lang={lang} aria-hidden />
    </div>
  );
}
