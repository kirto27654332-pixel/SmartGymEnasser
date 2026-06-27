import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import NavbarSocial from './NavbarSocial';
import AdminSwitch from './AdminSwitch';
import './Navbar.css';
import '../pages/auth.css';
import './AdminSwitch.css';

export default function Navbar() {
  const { t } = useLanguage();
  const { profile, firstName, isAdmin, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { href: '#accueil', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#planning', label: t.nav.planning },
    { href: '#tarifs', label: t.nav.pricing },
    { href: '#localisation', label: t.nav.location },
    { href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const userBlock = profile && (
    <div className="navbar__welcome">
      <span>{t.nav.welcome}, <strong>{firstName}</strong></span>
      <button type="button" className="navbar__logout" onClick={logout}>
        {t.auth.logout}
      </button>
    </div>
  );

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Logo size="sm" />

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <div className="navbar__nav-mobile">
            <NavbarSocial className="navbar-social--mobile" />
            {profile ? (
              <div className="navbar__welcome navbar__welcome--mobile">
                <span>{t.nav.welcome}, <strong>{firstName}</strong></span>
                {isAdmin && <AdminSwitch variant="mobile" />}
                <button type="button" className="navbar__logout" onClick={logout}>
                  {t.auth.logout}
                </button>
              </div>
            ) : (
              <Link to="/join" className="btn btn-primary navbar__cta-mobile" onClick={closeMenu}>
                {t.nav.join}
              </Link>
            )}
            <LanguageToggle className="lang-toggle--mobile navbar__lang-mobile" />
          </div>
        </nav>

        <div className="navbar__actions">
          <NavbarSocial className="navbar-social--desktop" />
          {userBlock}
          {isAdmin && <AdminSwitch variant="navbar" />}
          <LanguageToggle className="navbar__lang" />
          {profile ? null : (
            <Link to="/join" className="btn btn-primary navbar__cta">
              {t.nav.join}
            </Link>
          )}
        </div>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.nav.menu}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
