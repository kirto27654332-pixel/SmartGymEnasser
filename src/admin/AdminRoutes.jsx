import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './AdminLayout';

export default function AdminRoutes() {
  const { user, loading, refreshProfile } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [adminOk, setAdminOk] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setAdminOk(false);
      setChecking(false);
      return;
    }

    setChecking(true);
    refreshProfile()
      .then((profile) => setAdminOk(profile?.isAdmin === true))
      .catch(() => setAdminOk(false))
      .finally(() => setChecking(false));
  }, [user, loading, location.pathname, refreshProfile]);

  if (loading || checking) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner" />
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user || !adminOk) {
    return <Navigate to="/join" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
