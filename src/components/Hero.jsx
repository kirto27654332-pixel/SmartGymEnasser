import { useLanguage } from '../context/LanguageContext';
import ThreeBackground from './ThreeBackground';
import { SectionGlow } from './ScrollEffects';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="hero" data-section-glow>
      <SectionGlow variant="purple" />
      <ThreeBackground />

      <div className="hero__gradient" />
      <div className="hero__glow hero__glow--purple" />
      <div className="hero__glow hero__glow--cyan" />

      <div className="hero__inner container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            {t.hero.badge}
          </div>

          <h1 className="hero__title">
            <span>{t.hero.title1}</span>
            <span>{t.hero.title2} <em>{t.hero.titleHighlight}</em></span>
            <span>{t.hero.title3}</span>
          </h1>

          <p className="hero__desc">{t.hero.desc}</p>

          <div className="hero__actions">
            <a href="tel:+21658805805" className="btn btn-primary">
              {t.hero.join}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#planning" className="btn btn-outline hero__video-btn">
              <span className="hero__play">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {t.hero.planning}
            </a>
          </div>

          <div className="hero__social">
            <div className="hero__avatars">
              {[1, 2, 3].map((i) => (
                <div key={i} className="hero__avatar" style={{ backgroundImage: `url(/images/gym/gym-interior-${i}.jpg)` }} />
              ))}
              <div className="hero__avatar hero__avatar--plus">+</div>
            </div>
            <div className="hero__rating">
              <div className="hero__stars">★★★★★</div>
              <span>{t.hero.community}</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img src="/images/gym/boxing-class.jpg" alt={t.hero.imageAlt} className="hero__image" />
            <div className="hero__image-overlay" />
          </div>
          <div className="hero__floating-card">
            <span className="hero__floating-icon">🏋️</span>
            <div>
              <strong>60+</strong>
              <span>{t.hero.coursesWeek}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__tags container">
        {t.hero.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </section>
  );
}
