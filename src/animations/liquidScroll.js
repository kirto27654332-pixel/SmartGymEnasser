import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EASE_SNAP = 'power3.out';

const REVEAL = {
  start: 'top 90%',
  once: true,
  toggleActions: 'play none none none',
};

function revealFromTo(target, from, to, trigger) {
  return gsap.fromTo(target, from, {
    ...to,
    immediateRender: false,
    ease: to.ease ?? EASE_SNAP,
    scrollTrigger: {
      trigger: trigger ?? target,
      ...REVEAL,
    },
  });
}

export function initHeroAnimations(scope) {
  const tl = gsap.timeline({ defaults: { ease: EASE_SNAP } });

  tl.from(scope.querySelector('.hero__badge'), { opacity: 0, y: 30, duration: 0.7 })
    .from(scope.querySelectorAll('.hero__title span'), {
      opacity: 0, y: 50, stagger: 0.08, duration: 0.8,
    }, '-=0.4')
    .from(scope.querySelector('.hero__desc'), { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
    .from(scope.querySelector('.hero__actions'), { opacity: 0, y: 25, duration: 0.6 }, '-=0.4')
    .from(scope.querySelector('.hero__social'), { opacity: 0, x: -20, duration: 0.6 }, '-=0.3')
    .from(scope.querySelectorAll('.hero__tags span'), {
      opacity: 0, y: 15, stagger: 0.04, duration: 0.4,
    }, '-=0.3')
    .from(scope.querySelector('.hero__visual'), { opacity: 0, y: 40, duration: 0.9 }, '-=0.8');
}

export function initLiquidScrollAnimations(root = document) {
  /* ── Simple scroll reveals (no blur, no scrub) ── */
  gsap.utils.toArray('[data-liquid="up"]', root).forEach((el) => {
    revealFromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, el);
  });

  gsap.utils.toArray('[data-liquid="left"]', root).forEach((el) => {
    revealFromTo(el, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 }, el);
  });

  gsap.utils.toArray('[data-liquid="right"]', root).forEach((el) => {
    revealFromTo(el, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8 }, el);
  });

  gsap.utils.toArray('[data-liquid="scale"]', root).forEach((el) => {
    revealFromTo(
      el,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.1)' },
      el,
    );
  });

  gsap.utils.toArray('[data-liquid="reveal"]', root).forEach((el) => {
    revealFromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, el);
  });

  gsap.utils.toArray('[data-liquid-stagger]', root).forEach((parent) => {
    const children = parent.querySelectorAll('[data-liquid-child]');
    if (!children.length) return;

    revealFromTo(
      children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
      parent,
    );
  });

  /* ── Stats counters ── */
  root.querySelectorAll('.stats__number[data-value]').forEach((el) => {
    const target = parseInt(el.dataset.value, 10);
    const suffix = el.dataset.suffix || '';
    const counter = { val: 0 };

    gsap.to(counter, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.val)}${suffix}`;
      },
    });
  });

  /* ── Scroll progress bar ── */
  const progressBar = root.querySelector('.scroll-progress');
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'max',
        scrub: 0.3,
      },
    });
  }
}

export function animateScheduleClasses(container) {
  if (!container) return;
  const items = container.querySelectorAll('.schedule__class');

  gsap.fromTo(
    items,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: EASE_SNAP,
    },
  );
}
