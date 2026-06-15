import { GYM_INFO } from '../data/content';
import './NavbarSocial.css';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 8.5V6.8c0-.7.5-1.1 1.2-1.1h1.6V3h-2.3C13.2 3 12 4.4 12 6.2V8.5H9v2.7h3v7.8h2.8v-7.8h2.4l.3-2.7H14z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NavbarSocial({ className = '' }) {
  return (
    <div className={`navbar-social ${className}`}>
      <a
        href={`tel:+216${GYM_INFO.phone.replace(/\s/g, '')}`}
        className="navbar-social__phone"
        aria-label={GYM_INFO.phoneFull}
      >
        <PhoneIcon />
        <span>{GYM_INFO.phone}</span>
      </a>

      <div className="navbar-social__icons">
        <a
          href={GYM_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-social__icon"
          aria-label="Instagram Smart Gym Ennasr"
        >
          <InstagramIcon />
        </a>
        <a
          href={GYM_INFO.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-social__icon"
          aria-label="Facebook Smart Gym Ennasr"
        >
          <FacebookIcon />
        </a>
      </div>
    </div>
  );
}
