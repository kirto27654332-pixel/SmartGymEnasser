import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';
import { seedSiteContentIfEmpty } from '../lib/firestore';
import { useState } from 'react';

export default function AdminDashboard() {
  const { content, source, reload } = useSiteContent();
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setSeeding(true);
    setMessage('');
    try {
      await seedSiteContentIfEmpty();
      await reload();
      setMessage('Base initialisée avec le contenu actuel du site.');
    } catch (err) {
      setMessage(err.message || 'Erreur lors de l\'initialisation');
    } finally {
      setSeeding(false);
    }
  };

  const classCount = Object.values(content.schedule).reduce((n, day) => n + day.length, 0);

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Tableau de bord</h1>
        <p>Gérez le contenu du site Smart Gym Ennasr</p>
      </header>

      <div className="admin-status">
        <span className={`admin-status__dot admin-status__dot--${source}`} />
        Source : {source === 'firestore' ? 'Firebase (en ligne)' : 'Données locales (pas encore synchronisées)'}
      </div>

      {source === 'local' && (
        <div className="admin-alert">
          <p>Firestore est vide ou inaccessible. Initialisez la base pour activer les modifications en ligne.</p>
          <button type="button" className="btn btn-primary" onClick={handleSeed} disabled={seeding}>
            {seeding ? 'Initialisation...' : 'Initialiser Firebase avec le contenu actuel'}
          </button>
        </div>
      )}

      {message && <p className="admin-feedback admin-feedback--success">{message}</p>}

      <div className="admin-cards">
        <article className="admin-stat-card">
          <span className="admin-stat-card__value">{classCount}</span>
          <span className="admin-stat-card__label">Cours / semaine</span>
          <Link to="/admin/planning" className="admin-stat-card__link">Modifier →</Link>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-card__value">{content.pricingData.length}</span>
          <span className="admin-stat-card__label">Formules tarifaires</span>
          <Link to="/admin/tarifs" className="admin-stat-card__link">Modifier →</Link>
        </article>
        <article className="admin-stat-card">
          <span className="admin-stat-card__value">{content.serviceItems.length}</span>
          <span className="admin-stat-card__label">Services</span>
          <Link to="/admin/services" className="admin-stat-card__link">Modifier →</Link>
        </article>
      </div>

      <section className="admin-help">
        <h2>Guide rapide</h2>
        <ul>
          <li><strong>Planning</strong> — ajoutez, modifiez ou supprimez les cours par jour</li>
          <li><strong>Tarifs</strong> — prix et avantages FR/EN</li>
          <li><strong>Services</strong> — images Cloudinary + descriptions</li>
          <li><strong>Infos</strong> — téléphone, email, textes hero et règles</li>
        </ul>
      </section>
    </div>
  );
}
