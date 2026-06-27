import { useCallback, useState } from 'react';
import { translations } from '../../i18n/translations';
import { useAdminEditor, SaveBar } from '../useAdminEditor';

const DAY_KEYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const DAY_LABELS = translations.fr.schedule.days;

export default function ScheduleEditor() {
  const selector = useCallback((c) => ({ schedule: c.schedule }), []);
  const { draft, setDraft, save, saving, feedback } = useAdminEditor(selector);
  const [activeDay, setActiveDay] = useState('monday');

  const classes = draft.schedule?.[activeDay] ?? [];

  const updateClass = (index, field, value) => {
    setDraft((prev) => {
      const schedule = { ...prev.schedule };
      const dayClasses = [...schedule[activeDay]];
      dayClasses[index] = { ...dayClasses[index], [field]: value };
      schedule[activeDay] = dayClasses;
      return { ...prev, schedule };
    });
  };

  const addClass = () => {
    setDraft((prev) => {
      const schedule = { ...prev.schedule };
      schedule[activeDay] = [
        ...schedule[activeDay],
        { time: '18H30', name: 'Nouveau cours', coach: 'Coach' },
      ];
      return { ...prev, schedule };
    });
  };

  const removeClass = (index) => {
    setDraft((prev) => {
      const schedule = { ...prev.schedule };
      schedule[activeDay] = schedule[activeDay].filter((_, i) => i !== index);
      return { ...prev, schedule };
    });
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Planning hebdomadaire</h1>
        <p>Modifiez les cours par jour — visible sur le site après enregistrement</p>
      </header>

      <div className="admin-tabs">
        {DAY_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className={`admin-tab ${activeDay === key ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveDay(key)}
          >
            {DAY_LABELS[key]}
          </button>
        ))}
      </div>

      <div className="admin-list">
        {classes.map((cls, index) => (
          <div key={`${cls.time}-${cls.name}-${index}`} className="admin-list-item">
            <label className="admin-field admin-field--inline">
              <span>Heure</span>
              <input value={cls.time} onChange={(e) => updateClass(index, 'time', e.target.value)} />
            </label>
            <label className="admin-field admin-field--inline">
              <span>Cours</span>
              <input value={cls.name} onChange={(e) => updateClass(index, 'name', e.target.value)} />
            </label>
            <label className="admin-field admin-field--inline">
              <span>Coach</span>
              <input value={cls.coach} onChange={(e) => updateClass(index, 'coach', e.target.value)} />
            </label>
            <button type="button" className="admin-btn-danger" onClick={() => removeClass(index)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <button type="button" className="btn btn-outline admin-add-btn" onClick={addClass}>
        + Ajouter un cours
      </button>

      <SaveBar onSave={save} saving={saving} feedback={feedback} />
    </div>
  );
}
