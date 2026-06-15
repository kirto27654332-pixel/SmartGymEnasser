import { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_ITEMS } from '../data/content';
import { SectionGlow } from './ScrollEffects';
import './Services.css';

export default function Services() {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector('.service-card')?.offsetWidth || 320;
    const gap = 24;
    const newIndex = Math.max(0, Math.min(SERVICE_ITEMS.length - 1, activeIndex + dir));
    setActiveIndex(newIndex);
    track.scrollTo({ left: newIndex * (cardWidth + gap), behavior: 'smooth' });
  };

  return (
    <section id="services" className="services" data-section-glow>
      <SectionGlow variant="magenta" />
      <div className="container">
        <div className="services__header" data-liquid="up">
          <span className="section-label">{t.services.label}</span>
          <h2 className="section-title">
            {t.services.title} <span className="highlight">{t.services.titleHighlight}</span>
          </h2>
          <div className="services__nav">
            <button onClick={() => scroll(-1)} aria-label={t.services.prev} className="services__arrow">←</button>
            <button onClick={() => scroll(1)} aria-label={t.services.next} className="services__arrow">→</button>
          </div>
        </div>
      </div>

      <div className="services__track" ref={trackRef} data-liquid-stagger>
        {SERVICE_ITEMS.map((service) => {
          const info = t.services.items[service.id];
          return (
            <article key={service.id} className="service-card" data-liquid-child>
              <img src={service.image} alt={info.title} loading="lazy" />
              <div className="service-card__overlay" />
              <div className="service-card__content">
                <h3>{info.title}</h3>
                <p>{info.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
