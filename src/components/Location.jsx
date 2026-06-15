import { useLanguage } from '../context/LanguageContext';
import { GYM_INFO } from '../data/content';
import { SectionGlow } from './ScrollEffects';
import './Location.css';

const INFO_ICONS = ['📍', '🏢', '🅿️', '📞'];

export default function Location() {
  const { t } = useLanguage();

  const infoItems = [
    { title: t.location.cards.address, value: t.location.cards.addressValue },
    { title: t.location.cards.floor, value: t.location.cards.floorValue },
    { title: t.location.cards.parking, value: t.location.cards.parkingValue },
    { title: t.location.cards.phone, value: GYM_INFO.phoneFull, href: `tel:+216${GYM_INFO.phone.replace(/\s/g, '')}` },
  ];

  return (
    <section id="localisation" className="location" data-section-glow>
      <SectionGlow variant="purple" />
      <div className="location__grid-bg" aria-hidden />

      <div className="container">
        <div className="location__header" data-liquid="up">
          <span className="section-label">{t.location.label}</span>
          <h2 className="section-title">
            {t.location.title}{' '}
            <span className="highlight">{t.location.titleHighlight}</span>
          </h2>
          <p className="location__desc">{t.location.desc}</p>
        </div>

        <div className="location__layout">
          <div className="location__panel" data-liquid="left">
            <div className="location__cards" data-liquid-stagger>
              {infoItems.map((item, i) => (
                <article key={item.title} className="location__card" data-liquid-child>
                  <span className="location__card-icon" aria-hidden>{INFO_ICONS[i]}</span>
                  <div>
                    <h3>{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="location__card-link">{item.value}</a>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="location__actions">
              <a
                href={GYM_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary location__btn"
              >
                {t.location.directions}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="tel:+21658805805" className="btn btn-outline location__btn">
                {t.location.call}
              </a>
            </div>

            <div className="location__coords" aria-hidden>
              <span className="location__coords-label">GPS</span>
              <span className="location__coords-value">
                {GYM_INFO.coords.lat.toFixed(4)}° N · {GYM_INFO.coords.lng.toFixed(4)}° E
              </span>
            </div>
          </div>

          <div className="location__map-wrap" data-liquid="right">
            <div className="location__map-frame">
              <div className="location__map-corner location__map-corner--tl" aria-hidden />
              <div className="location__map-corner location__map-corner--tr" aria-hidden />
              <div className="location__map-corner location__map-corner--bl" aria-hidden />
              <div className="location__map-corner location__map-corner--br" aria-hidden />
              <div className="location__map-scan" aria-hidden />
              <div className="location__map-grid" aria-hidden />

              <div className="location__map-inner">
                <iframe
                  title={t.location.mapTitle}
                  src={GYM_INFO.mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="location__map-pin" aria-hidden>
                <span className="location__map-pin-core" />
                <span className="location__map-pin-ring" />
                <span className="location__map-pin-ring location__map-pin-ring--delay" />
              </div>

              <a
                href={GYM_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location__map-badge"
              >
                <span>{t.location.openMaps}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
