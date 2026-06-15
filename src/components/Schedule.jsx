import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SCHEDULE, SCHEDULE_KEYS } from '../data/content';
import { animateScheduleClasses } from '../animations/liquidScroll';
import { SectionGlow } from './ScrollEffects';
import './Schedule.css';

export default function Schedule() {
  const { t } = useLanguage();
  const classesRef = useRef(null);
  const [activeDay, setActiveDay] = useState('monday');

  useEffect(() => {
    animateScheduleClasses(classesRef.current);
  }, [activeDay]);

  return (
    <section id="planning" className="schedule" data-section-glow>
      <SectionGlow variant="cyan" />
      <div className="schedule__bg-text">PLANNING</div>

      <div className="container">
        <div className="schedule__header" data-liquid="up">
          <span className="section-label">{t.schedule.label}</span>
          <h2 className="section-title">
            {t.schedule.title} <span className="highlight">{t.schedule.titleHighlight}</span>
          </h2>
          <p className="schedule__subtitle">{t.schedule.subtitle}</p>
        </div>

        <div className="schedule__days" data-liquid-stagger>
          {SCHEDULE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className={`schedule__day-btn ${activeDay === key ? 'schedule__day-btn--active' : ''}`}
              onClick={() => setActiveDay(key)}
              data-liquid-child
            >
              {t.schedule.days[key]}
            </button>
          ))}
        </div>

        <div className="schedule__classes" ref={classesRef}>
          {SCHEDULE[activeDay].map((cls) => (
            <div key={`${cls.time}-${cls.name}`} className="schedule__class">
              <span className="schedule__time">{cls.time}</span>
              <div className="schedule__class-info">
                <h4>{cls.name}</h4>
                <span>{t.schedule.coach} {cls.coach}</span>
              </div>
              <span className="schedule__dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
