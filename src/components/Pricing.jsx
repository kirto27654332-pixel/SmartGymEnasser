import { useLanguage } from '../context/LanguageContext';
import { SectionGlow } from './ScrollEffects';
import './Pricing.css';

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="tarifs" className="pricing" data-section-glow>
      <SectionGlow variant="magenta" />
      <div className="pricing__bg-glow" />

      <div className="container">
        <div className="pricing__header" data-liquid="up">
          <span className="section-label">{t.pricing.label}</span>
          <h2 className="section-title">
            {t.pricing.title} <span className="highlight">{t.pricing.titleHighlight}</span> {t.pricing.titleEnd}
          </h2>
          <p className="pricing__tagline">{t.pricing.tagline}</p>
        </div>

        <div className="pricing__cards" data-liquid-stagger>
          {t.pricingData.map((plan) => {
            const planInfo = t.pricing.plans[plan.id];
            return (
              <article
                key={plan.id}
                className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
                data-liquid-child
              >
                {plan.popular && <span className="pricing-card__badge">{t.pricing.bestOffer}</span>}
                <div className="pricing-card__inner">
                  <h3>{planInfo.name}</h3>
                  <div className="pricing-card__price">
                    <span className="pricing-card__amount">{plan.price}</span>
                    <span className="pricing-card__currency">{t.pricing.currency}</span>
                  </div>
                  {plan.originalPrice && (
                    <span className="pricing-card__original">{plan.originalPrice} {t.pricing.currency}</span>
                  )}
                  <ul className="pricing-card__features">
                    {planInfo.features.map((f) => (
                      <li key={f}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="tel:+21658805805" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} pricing-card__cta`}>
                    {t.pricing.start}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pricing__benefits" data-liquid-stagger>
          {t.pricing.benefits.map((b) => (
            <div key={b} className="pricing__benefit" data-liquid-child>
              <span className="pricing__benefit-dot" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
