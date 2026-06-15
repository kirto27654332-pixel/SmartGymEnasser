import './ScrollEffects.css';

export default function ScrollEffects() {
  return <div className="scroll-progress" aria-hidden />;
}

export function SectionGlow({ variant = 'purple' }) {
  return <div className={`section-liquid-glow section-liquid-glow--${variant}`} aria-hidden />;
}
