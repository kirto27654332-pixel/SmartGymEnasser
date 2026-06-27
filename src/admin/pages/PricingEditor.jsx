import { useCallback, useState } from 'react';
import { useAdminEditor, SaveBar } from '../useAdminEditor';

export default function PricingEditor() {
  const selector = useCallback((c) => ({
    pricingData: c.pricingData,
    content: c.content,
  }), []);
  const { draft, setDraft, save, saving, feedback } = useAdminEditor(selector);
  const [lang, setLang] = useState('fr');

  const updatePrice = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      pricingData: prev.pricingData.map((p) =>
        p.id === id ? { ...p, [field]: value === '' ? null : Number(value) } : p,
      ),
    }));
  };

  const updatePlan = (planId, field, value) => {
    setDraft((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          pricing: {
            ...prev.content[lang].pricing,
            plans: {
              ...prev.content[lang].pricing.plans,
              [planId]: {
                ...prev.content[lang].pricing.plans[planId],
                [field]: value,
              },
            },
          },
        },
      },
    }));
  };

  const updateFeatures = (planId, text) => {
    const features = text.split('\n').filter(Boolean);
    updatePlan(planId, 'features', features);
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Tarifs</h1>
        <p>Prix et descriptions des formules</p>
      </header>

      <div className="admin-lang-toggle">
        <button type="button" className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>FR</button>
        <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>

      <div className="admin-list">
        {draft.pricingData?.map((plan) => {
          const planInfo = draft.content?.[lang]?.pricing?.plans?.[plan.id];
          return (
            <div key={plan.id} className="admin-card-block">
              <h3>{planInfo?.name || plan.id}</h3>
              <div className="admin-grid-2">
                <label className="admin-field">
                  <span>Prix ({lang === 'fr' ? 'DT' : 'TND'})</span>
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updatePrice(plan.id, 'price', e.target.value)}
                  />
                </label>
                <label className="admin-field">
                  <span>Ancien prix (optionnel)</span>
                  <input
                    type="number"
                    value={plan.originalPrice ?? ''}
                    onChange={(e) => updatePrice(plan.id, 'originalPrice', e.target.value)}
                  />
                </label>
              </div>
              <label className="admin-field">
                <span>Nom ({lang.toUpperCase()})</span>
                <input
                  value={planInfo?.name ?? ''}
                  onChange={(e) => updatePlan(plan.id, 'name', e.target.value)}
                />
              </label>
              <label className="admin-field">
                <span>Avantages (un par ligne)</span>
                <textarea
                  rows={5}
                  value={(planInfo?.features ?? []).join('\n')}
                  onChange={(e) => updateFeatures(plan.id, e.target.value)}
                />
              </label>
              <label className="admin-field admin-field--check">
                <input
                  type="checkbox"
                  checked={Boolean(plan.popular)}
                  onChange={(e) => {
                    setDraft((prev) => ({
                      ...prev,
                      pricingData: prev.pricingData.map((p) => ({
                        ...p,
                        popular: p.id === plan.id ? e.target.checked : false,
                      })),
                    }));
                  }}
                />
                <span>Meilleure offre</span>
              </label>
            </div>
          );
        })}
      </div>

      <SaveBar onSave={save} saving={saving} feedback={feedback} />
    </div>
  );
}
