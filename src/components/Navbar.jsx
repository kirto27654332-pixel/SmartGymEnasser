import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import NavbarSocial from './NavbarSocial';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
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
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="navbar__nav-mobile">
            <NavbarSocial className="navbar-social--mobile" />
            <a href="tel:+21658805805" className="btn btn-primary navbar__cta-mobile">
              {t.nav.join}
            </a>
            <LanguageToggle className="lang-toggle--mobile navbar__lang-mobile" />
          </div>
        </nav>

        <div className="navbar__actions">
          <NavbarSocial className="navbar-social--desktop" />
          <LanguageToggle className="navbar__lang" />
          <a href="tel:+21658805805" className="btn btn-primary navbar__cta">
            {t.nav.join}
          </a>
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
