import { useLanguage } from '../context/LanguageContext';
import { GYM_INFO } from '../data/content';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="footer" data-liquid="up">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size="lg" />
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer__links">
          <h4>{t.footer.navigation}</h4>
          <a href="#accueil">{t.nav.home}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#planning">{t.nav.planning}</a>
          <a href="#tarifs">{t.nav.pricing}</a>
          <a href="#localisation">{t.nav.location}</a>
        </div>

        <div className="footer__contact">
          <h4>{t.footer.contact}</h4>
          <a href={`tel:+216${GYM_INFO.phone.replace(/\s/g, '')}`}>{GYM_INFO.phoneFull}</a>
          <a href={`mailto:${GYM_INFO.email}`}>{GYM_INFO.email}</a>
          <a href={GYM_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">
            @{GYM_INFO.instagram}
          </a>
          <p className="footer__address">
            {t.footer.location}<br />
            {t.footer.city}<br />
            <a href={GYM_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer__maps-link">
              {t.footer.viewOnMaps}
            </a>
          </p>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>© {new Date().getFullYear()} Smart Gym Ennasr. {t.footer.rights}</span>
          <span className="footer__bar-phone">
            {t.footer.callUs} <strong>{GYM_INFO.phone}</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
