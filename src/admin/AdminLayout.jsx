import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import AdminSwitch from '../components/AdminSwitch';
import './admin.css';
import '../components/AdminSwitch.css';

const NAV = [
  { to: '/admin', label: 'Tableau de bord', end: true },
  { to: '/admin/planning', label: 'Planning' },
  { to: '/admin/tarifs', label: 'Tarifs' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/images', label: 'Images sections' },
  { to: '/admin/infos', label: 'Infos & Textes' },
  { to: '/admin/members', label: 'Membres' },
];

export default function AdminLayout({ children }) {
  const { logout, user } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <Logo size="sm" />
          <span>Admin Panel</span>
        </div>

        <AdminSwitch variant="sidebar" />

        <nav className="admin-sidebar__nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__email">{user?.email}</p>
          <button type="button" className="admin-sidebar__logout" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <AdminSwitch variant="topbar" />
        </div>
        {children}
      </main>
    </div>
  );
}
