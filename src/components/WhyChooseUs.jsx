import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionGlow } from './ScrollEffects';
import './WhyChooseUs.css';

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(1);
  const icons = ['⚡', '🎯', '🔥', '🤝'];

  return (
    <section className="why" data-section-glow>
      <SectionGlow variant="purple" />
      <div className="container why__grid">
        <div className="why__image" data-liquid="left">
          <img src="/images/gym/instructor-class.jpg" alt={t.why.imageAlt} />
          <div className="why__image-glow" />
        </div>

        <div className="why__content" data-liquid="right">
          <span className="section-label">{t.why.label}</span>
          <h2 className="section-title">
            {t.why.title} <span className="highlight">{t.why.titleHighlight}</span>
          </h2>

          <div className="why__accordion" data-liquid-stagger>
            {t.why.items.map((feature, i) => (
              <div
                key={feature.title}
                className={`why__item ${openIndex === i ? 'why__item--open' : ''}`}
                data-liquid-child
              >
                <button
                  className="why__item-header"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <span className="why__item-icon">{icons[i]}</span>
                  <span>{feature.title}</span>
                  <span className="why__item-chevron">{openIndex === i ? '−' : '+'}</span>
                </button>
                <div className="why__item-body">
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
