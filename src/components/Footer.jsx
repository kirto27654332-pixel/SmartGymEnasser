import { useLanguage, useGymInfo } from '../context/LanguageContext';
import Logo from './Logo';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  const gymInfo = useGymInfo();

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
          <a href={`tel:+216${gymInfo.phone.replace(/\s/g, '')}`}>{gymInfo.phoneFull}</a>
          <a href={`mailto:${gymInfo.email}`}>{gymInfo.email}</a>
          <a href={gymInfo.instagramUrl} target="_blank" rel="noopener noreferrer">
            @{gymInfo.instagram}
          </a>
          <p className="footer__address">
            {t.footer.location}<br />
            {t.footer.city}<br />
            <a href={gymInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer__maps-link">
              {t.footer.viewOnMaps}
            </a>
          </p>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>© {new Date().getFullYear()} Smart Gym Ennasr. {t.footer.rights}</span>
          <span className="footer__bar-phone">
            {t.footer.callUs} <strong>{gymInfo.phone}</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
