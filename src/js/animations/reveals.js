import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals de section (fade-up + léger stagger), pilotés par gsap.matchMedia
 * (desktop / mobile / reduced-motion). Les éléments sont masqués par défaut en CSS
 * via .js-anim (voir base.css) : GSAP se contente de les révéler, jamais de les cacher
 * après coup (pas de FOUC / CLS).
 */
export function initReveals() {
  const targets = gsap.utils.toArray('[data-reveal]');
  if (!targets.length) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isReducedMotion: '(prefers-reduced-motion: reduce)',
      isDesktop: '(min-width: 1024px)',
      isMobile: '(max-width: 1023px)',
    },
    (context) => {
      const { isReducedMotion, isDesktop } = context.conditions;

      if (isReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(targets, { opacity: 0, y: isDesktop ? 24 : 14 });

      ScrollTrigger.batch(targets, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: isDesktop ? 0.7 : 0.5,
            ease: 'power2.out',
            stagger: isDesktop ? 0.08 : 0.05,
            overwrite: true,
          }),
      });
    },
  );

  return mm;
}
