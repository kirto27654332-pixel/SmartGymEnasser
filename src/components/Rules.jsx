import { useLanguage } from '../context/LanguageContext';
import { SectionGlow } from './ScrollEffects';
import './Rules.css';

export default function Rules() {
  const { t } = useLanguage();

  return (
    <section className="rules" data-section-glow>
      <SectionGlow variant="purple" />
      <div className="rules__overlay" />

      <div className="container">
        <div className="rules__header" data-liquid="up">
          <span className="section-label">{t.rules.label}</span>
          <h2 className="section-title">
            {t.rules.title} <span className="highlight">{t.rules.titleHighlight}</span>
          </h2>
          <p className="rules__desc">{t.rules.desc}</p>
          <div className="rules__meta">
            <span>🅿️ {t.rules.parking}</span>
            <span>📞 58 805 805</span>
          </div>
        </div>

        <div className="rules__grid" data-liquid-stagger>
          {t.rules.items.map((text, i) => (
            <article key={text} className="rules__item" data-liquid-child>
              <span className="rules__number">{String(i + 1).padStart(2, '0')}</span>
              <span className="rules__icon">{t.ruleIcons[i]}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
