import { useCallback, useEffect, useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';

export function useAdminEditor(initialSelector) {
  const { content, persist } = useSiteContent();
  const [draft, setDraft] = useState(() => initialSelector(content));
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setDraft(initialSelector(content));
  }, [content, initialSelector]);

  const save = useCallback(async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const next = { ...content };

      if (draft.schedule) next.schedule = draft.schedule;
      if (draft.pricingData) next.pricingData = draft.pricingData;
      if (draft.serviceItems) next.serviceItems = draft.serviceItems;
      if (draft.gymInfo) next.gymInfo = { ...content.gymInfo, ...draft.gymInfo };
      if (draft.images) next.images = { ...content.images, ...draft.images };
      if (draft.statsValues) next.statsValues = draft.statsValues;
      if (draft.content) {
        next.content = {
          fr: {
            ...content.content.fr,
            ...draft.content.fr,
            hero: { ...content.content.fr.hero, ...draft.content.fr?.hero },
            services: {
              items: {
                ...content.content.fr.services.items,
                ...draft.content.fr?.services?.items,
              },
            },
            pricing: {
              plans: {
                ...content.content.fr.pricing.plans,
                ...draft.content.fr?.pricing?.plans,
              },
              benefits: draft.content.fr?.pricing?.benefits ?? content.content.fr.pricing.benefits,
            },
            rules: {
              ...content.content.fr.rules,
              ...draft.content.fr?.rules,
            },
            stats: {
              items: draft.content.fr?.stats?.items ?? content.content.fr.stats.items,
            },
            hours: { ...content.content.fr.hours, ...draft.content.fr?.hours },
          },
          en: {
            ...content.content.en,
            ...draft.content.en,
            hero: { ...content.content.en.hero, ...draft.content.en?.hero },
            services: {
              items: {
                ...content.content.en.services.items,
                ...draft.content.en?.services?.items,
              },
            },
            pricing: {
              plans: {
                ...content.content.en.pricing.plans,
                ...draft.content.en?.pricing?.plans,
              },
              benefits: draft.content.en?.pricing?.benefits ?? content.content.en.pricing.benefits,
            },
            rules: {
              ...content.content.en.rules,
              ...draft.content.en?.rules,
            },
            stats: {
              items: draft.content.en?.stats?.items ?? content.content.en.stats.items,
            },
            hours: { ...content.content.en.hours, ...draft.content.en?.hours },
          },
        };
      }

      await persist(next);
      setFeedback({ type: 'success', text: 'Enregistré avec succès !' });
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Erreur de sauvegarde' });
    } finally {
      setSaving(false);
    }
  }, [content, draft, persist]);

  return { draft, setDraft, save, saving, feedback };
}

export function SaveBar({ onSave, saving, feedback }) {
  return (
    <div className="admin-save-bar">
      {feedback && (
        <p className={`admin-feedback admin-feedback--${feedback.type}`}>{feedback.text}</p>
      )}
      <button type="button" className="btn btn-primary" onClick={onSave} disabled={saving}>
        {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
      </button>
    </div>
  );
}
