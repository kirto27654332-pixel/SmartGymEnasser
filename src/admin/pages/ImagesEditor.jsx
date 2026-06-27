import { useCallback, useState } from 'react';
import { uploadImage } from '../../lib/cloudinary';
import { useAdminEditor, SaveBar } from '../useAdminEditor';

const SECTIONS = [
  { key: 'hero', label: 'Hero (accueil)', hint: 'Grande image à droite du titre' },
  { key: 'stats', label: 'Section À propos', hint: 'Image panoramique avec horaires' },
  { key: 'why', label: 'Section Pourquoi nous', hint: 'Image coach / salle' },
];

export default function ImagesEditor() {
  const selector = useCallback((c) => ({ images: c.images }), []);
  const { draft, setDraft, save, saving, feedback } = useAdminEditor(selector);
  const [uploading, setUploading] = useState(null);

  const handleUpload = async (key, file) => {
    if (!file) return;
    setUploading(key);
    try {
      const url = await uploadImage(file);
      setDraft((prev) => ({
        ...prev,
        images: { ...prev.images, [key]: url },
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
        <h1>Images des sections</h1>
        <p>Hero et images principales — upload Cloudinary</p>
      </header>

      <div className="admin-list">
        {SECTIONS.map(({ key, label, hint }) => (
          <div key={key} className="admin-card-block admin-service-card">
            <div className="admin-service-card__image">
              <img src={draft.images?.[key]} alt={label} />
              <label className="btn btn-outline admin-upload-btn">
                {uploading === key ? 'Upload...' : 'Changer l\'image'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => handleUpload(key, e.target.files?.[0])}
                />
              </label>
            </div>
            <div className="admin-service-card__fields">
              <h3>{label}</h3>
              <p className="admin-service-card__hint">{hint}</p>
              <label className="admin-field">
                <span>URL (Cloudinary ou chemin)</span>
                <input
                  value={draft.images?.[key] ?? ''}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      images: { ...prev.images, [key]: e.target.value },
                    }))
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <SaveBar onSave={save} saving={saving} feedback={feedback} />
    </div>
  );
}
