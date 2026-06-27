import { useCallback, useState } from 'react';
import { useAdminEditor, SaveBar } from '../useAdminEditor';

export default function InfoEditor() {
  const selector = useCallback((c) => ({
    gymInfo: c.gymInfo,
    content: c.content,
    statsValues: c.statsValues,
  }), []);
  const { draft, setDraft, save, saving, feedback } = useAdminEditor(selector);
  const [lang, setLang] = useState('fr');

  const updateGym = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      gymInfo: { ...prev.gymInfo, [field]: value },
    }));
  };

  const updateContent = (section, field, value) => {
    setDraft((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          [section]: {
            ...prev.content[lang][section],
            [field]: value,
          },
        },
      },
    }));
  };

  const updateRulesItems = (text) => {
    const items = text.split('\n').filter(Boolean);
    setDraft((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          rules: { ...prev.content[lang].rules, items },
        },
      },
    }));
  };

  const updateStatsItems = (text) => {
    const items = text.split('\n').filter(Boolean);
    setDraft((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          stats: { items },
        },
      },
    }));
  };

  const updateHours = (key, value) => {
    setDraft((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          hours: { ...prev.content[lang].hours, [key]: value },
        },
      },
    }));
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Infos & Textes</h1>
        <p>Contact, hero, règles et horaires</p>
      </header>

      <div className="admin-lang-toggle">
        <button type="button" className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>FR</button>
        <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>

      <section className="admin-card-block">
        <h3>Contact & réseaux</h3>
        <div className="admin-grid-2">
          <label className="admin-field">
            <span>Téléphone</span>
            <input value={draft.gymInfo?.phone ?? ''} onChange={(e) => updateGym('phone', e.target.value)} />
          </label>
          <label className="admin-field">
            <span>Téléphone affiché</span>
            <input value={draft.gymInfo?.phoneFull ?? ''} onChange={(e) => updateGym('phoneFull', e.target.value)} />
          </label>
          <label className="admin-field">
            <span>Email</span>
            <input value={draft.gymInfo?.email ?? ''} onChange={(e) => updateGym('email', e.target.value)} />
          </label>
          <label className="admin-field">
            <span>Instagram URL</span>
            <input value={draft.gymInfo?.instagramUrl ?? ''} onChange={(e) => updateGym('instagramUrl', e.target.value)} />
          </label>
        </div>
      </section>

      <section className="admin-card-block">
        <h3>Hero ({lang.toUpperCase()})</h3>
        <label className="admin-field">
          <span>Description</span>
          <textarea
            rows={4}
            value={draft.content?.[lang]?.hero?.desc ?? ''}
            onChange={(e) => updateContent('hero', 'desc', e.target.value)}
          />
        </label>
      </section>

      <section className="admin-card-block">
        <h3>Horaires ({lang.toUpperCase()})</h3>
        <div className="admin-grid-2">
          {['weekdays', 'saturday', 'sunday'].map((key) => (
            <label key={key} className="admin-field">
              <span>{key}</span>
              <input
                value={draft.content?.[lang]?.hours?.[key] ?? ''}
                onChange={(e) => updateHours(key, e.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="admin-card-block">
        <h3>Stats labels ({lang.toUpperCase()})</h3>
        <label className="admin-field">
          <span>Labels (un par ligne)</span>
          <textarea
            rows={4}
            value={(draft.content?.[lang]?.stats?.items ?? []).join('\n')}
            onChange={(e) => updateStatsItems(e.target.value)}
          />
        </label>
      </section>

      <section className="admin-card-block">
        <h3>Règlement ({lang.toUpperCase()})</h3>
        <label className="admin-field">
          <span>Description</span>
          <textarea
            rows={2}
            value={draft.content?.[lang]?.rules?.desc ?? ''}
            onChange={(e) => updateContent('rules', 'desc', e.target.value)}
          />
        </label>
        <label className="admin-field">
          <span>Règles (une par ligne)</span>
          <textarea
            rows={6}
            value={(draft.content?.[lang]?.rules?.items ?? []).join('\n')}
            onChange={(e) => updateRulesItems(e.target.value)}
          />
        </label>
      </section>

      <SaveBar onSave={save} saving={saving} feedback={feedback} />
    </div>
  );
}
