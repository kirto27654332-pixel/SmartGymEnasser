import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './AdminSwitch.css';

export default function AdminSwitch({ variant = 'navbar' }) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const onAdmin = pathname.startsWith('/admin');

  if (onAdmin) {
    return (
      <Link to="/" className={`admin-switch admin-switch--${variant}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
        {t.nav.viewSite}
      </Link>
    );
  }

  return (
    <Link to="/admin" className={`admin-switch admin-switch--${variant}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
      {t.nav.adminPanel}
    </Link>
  );
}
