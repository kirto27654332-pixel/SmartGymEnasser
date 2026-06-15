import './Logo.css';

export default function Logo({ size = 'md' }) {
  return (
    <a href="#accueil" className={`logo logo--${size}`} aria-label="Smart Gym Ennasr">
      <span className="logo__ennasr">ENNASR</span>
      <span className="logo__main">
        <span className="logo__smart">SMART</span>
        <span className="logo__gym">GYM</span>
      </span>
    </a>
  );
}
