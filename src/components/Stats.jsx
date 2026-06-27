import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';
import { SectionGlow } from './ScrollEffects';
import './Stats.css';

export default function Stats() {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const statsValues = content.statsValues;
  const statsImage = content.images?.stats ?? '/images/gym/gym-interior-2.jpg';

  const hoursRows = [
    { label: t.stats.hours.weekdays, time: t.hours.weekdays },
    { label: t.stats.hours.saturday, time: t.hours.saturday },
    { label: t.stats.hours.sunday, time: t.hours.sunday },
  ];

  return (
    <section id="about" className="stats" data-section-glow>
      <SectionGlow variant="cyan" />
      <div className="container">
        <div className="stats__header" data-liquid="up">
          <span className="section-label">{t.stats.label}</span>
          <h2 className="section-title">
            {t.stats.title} <span className="highlight">{t.stats.titleHighlight}</span> {t.stats.titleEnd}
          </h2>
        </div>

        <div className="stats__grid" data-liquid-stagger>
          {statsValues.map((stat, i) => (
            <div key={stat.value} className="stats__item" data-liquid-child>
              <div className="stats__number" data-value={stat.value} data-suffix={stat.suffix}>
                0{stat.suffix}
              </div>
              <p>{t.stats.items[i]}</p>
            </div>
          ))}
        </div>

        <div className="stats__visual" data-liquid="reveal">
          <img src={statsImage} alt={t.stats.imageAlt} />
          <div className="stats__hours" data-liquid="scale">
            <h3>{t.stats.hoursTitle}</h3>
            {hoursRows.map((h) => (
              <div key={h.label} className="stats__hour-row">
                <span>{h.label}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
