import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroAnimations, initLiquidScrollAnimations } from '../animations/liquidScroll';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const hero = document.querySelector('.hero');
      if (hero) initHeroAnimations(hero);

      initLiquidScrollAnimations(document);
    });

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);
}
