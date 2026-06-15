import { useLanguage } from '../context/LanguageContext';
import { GYM_INFO } from '../data/content';
import ContactForm from './ContactForm';
import { SectionGlow } from './ScrollEffects';
import './CTA.css';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="cta" data-section-glow>
      <SectionGlow variant="cyan" />
      <div className="cta__glow" />
      <div className="container cta__content" data-liquid="scale">
        <h2 className="cta__title">{t.cta.title}</h2>
        <p className="cta__desc">{t.cta.desc}</p>

        <ContactForm />

        <div className="cta__actions">
          <a href="tel:+21658805805" className="btn btn-outline cta__btn">
            {t.cta.call} — {GYM_INFO.phone}
          </a>
          <a
            href={GYM_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            @{GYM_INFO.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
