import Lenis from 'lenis';
import { useEffect, type MouseEvent } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

let lenis: Lenis | null = null;

// Smooth scrolling for the whole page. Call once, in App. Off when reduced motion is on.
export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis();
    lenis = instance;
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      lenis = null;
    };
  }, [reducedMotion]);
}

// Scrolls to a section and moves focus there, as a native anchor jump would. Both Lenis and
// scrollIntoView honor the scroll-padding-top in index.css, so targets land below the navbar.
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { force: true });
  } else {
    target.scrollIntoView();
  }

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  history.replaceState(null, '', `#${id}`);
}

// Modified clicks (new tab, new window, etc.) should keep native link behavior.
export function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

// Click handler for in-page links.
export function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
  if (isModifiedClick(event)) return;
  event.preventDefault();
  scrollToSection(id);
}

// Pauses smooth scrolling while an overlay (the mobile menu) is open.
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
}
