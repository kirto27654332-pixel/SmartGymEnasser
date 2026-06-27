import { useCallback, useState } from 'react';
import { uploadImage } from '../../lib/cloudinary';
import { useAdminEditor, SaveBar } from '../useAdminEditor';

export default function ServicesEditor() {
  const selector = useCallback((c) => ({
    serviceItems: c.serviceItems,
    content: c.content,
  }), []);
  const { draft, setDraft, save, saving, feedback } = useAdminEditor(selector);
  const [lang, setLang] = useState('fr');
  const [uploading, setUploading] = useState(null);

  const updateServiceText = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          services: {
            items: {
              ...prev.content[lang].services.items,
              [id]: {
                ...prev.content[lang].services.items[id],
                [field]: value,
              },
            },
          },
        },
      },
    }));
  };

  const handleImageUpload = async (id, file) => {
    if (!file) return;
    setUploading(id);
    try {
      const url = await uploadImage(file);
      setDraft((prev) => ({
        ...prev,
        serviceItems: prev.serviceItems.map((item) =>
          item.id === id ? { ...item, image: url } : item,
        ),
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Services & Images</h1>
        <p>Upload Cloudinary + titres et descriptions</p>
      </header>

      <div className="admin-lang-toggle">
        <button type="button" className={lang === 'fr' ? 'active' : ''} onClick={() => setLang('fr')}>FR</button>
        <button type="button" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>

      <div className="admin-list">
        {draft.serviceItems?.map((service) => {
          const info = draft.content?.[lang]?.services?.items?.[service.id];
          return (
            <div key={service.id} className="admin-card-block admin-service-card">
              <div className="admin-service-card__image">
                <img src={service.image} alt={info?.title} />
                <label className="btn btn-outline admin-upload-btn">
                  {uploading === service.id ? 'Upload...' : 'Changer l\'image'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    hidden
                    onChange={(e) => handleImageUpload(service.id, e.target.files?.[0])}
                  />
                </label>
              </div>
              <div className="admin-service-card__fields">
                <p className="admin-service-card__id">ID: {service.id}</p>
                <label className="admin-field">
                  <span>Titre ({lang.toUpperCase()})</span>
                  <input
                    value={info?.title ?? ''}
                    onChange={(e) => updateServiceText(service.id, 'title', e.target.value)}
                  />
                </label>
                <label className="admin-field">
                  <span>Description ({lang.toUpperCase()})</span>
                  <textarea
                    rows={3}
                    value={info?.desc ?? ''}
                    onChange={(e) => updateServiceText(service.id, 'desc', e.target.value)}
                  />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <SaveBar onSave={save} saving={saving} feedback={feedback} />
    </div>
  );
}
