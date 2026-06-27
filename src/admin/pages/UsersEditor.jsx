import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchAllUsers } from '../../lib/users';

export default function UsersEditor() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const list = await fetchAllUsers();
      setUsers(list);
    } catch (err) {
      setError(err.message || 'Impossible de charger les membres');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1>Membres inscrits</h1>
        <p>Liste des utilisateurs ayant créé un compte via Join</p>
      </header>

      {user && (
        <p className="admin-help admin-help--inline">
          Votre UID admin : <code>{user.uid}</code> — pour activer l&apos;admin, mettez{' '}
          <code>isAdmin: true</code> sur ce document dans Firestore → collection{' '}
          <strong>users</strong>.
        </p>
      )}

      {loading && <p className="admin-feedback">Chargement...</p>}
      {error && <p className="admin-feedback admin-feedback--error">{error}</p>}

      {!loading && !error && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Admin</th>
                <th>Inscription</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-table__empty">Aucun membre inscrit</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || '—'}</td>
                    <td>
                      <span className={`admin-badge ${u.isAdmin ? 'admin-badge--yes' : ''}`}>
                        {u.isAdmin ? 'Oui' : 'Non'}
                      </span>
                    </td>
                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('fr-FR') : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <button type="button" className="btn btn-outline admin-add-btn" onClick={load}>
        Actualiser
      </button>
    </div>
  );
}
