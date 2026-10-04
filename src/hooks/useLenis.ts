import type Lenis from 'lenis';
import { useEffect, type MouseEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

let lenis: Lenis | null = null;

// The first sign of a visitor scrolling or navigating.
const interactionEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;

// Smooth scrolling for the whole page. Call once, in App. Off when reduced motion is on.
// Lenis loads on the first interaction: starting it measures the whole page, which is wasted
// work during load for a visitor who hasn't scrolled yet. Until then scrolling is native.
// It runs its own requestAnimationFrame loop (autoRaf).
export function useLenis() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = () => {
      removeListeners();
      import('lenis').then(({ default: LenisClass }) => {
        if (cancelled) return;
        const instance = new LenisClass({ autoRaf: true });
        lenis = instance;
        cleanup = () => {
          instance.destroy();
          lenis = null;
        };
      });
    };
    const removeListeners = () =>
      interactionEvents.forEach((type) => window.removeEventListener(type, start));
    interactionEvents.forEach((type) => window.addEventListener(type, start, { passive: true }));

    return () => {
      cancelled = true;
      removeListeners();
      cleanup?.();
    };
  }, [reducedMotion]);
}

// Sections below the fold render lazily (content-visibility in index.css), so sections above a
// target can still change height after a jump. Re-align each frame until the target stops moving.
function settleOn(target: HTMLElement, align: () => void, framesLeft = 12) {
  const before = target.getBoundingClientRect().top;
  align();
  requestAnimationFrame(() => {
    if (framesLeft > 0 && target.getBoundingClientRect().top !== before) {
      settleOn(target, align, framesLeft - 1);
    }
  });
}

// Scrolls to a section and moves focus there, as a native anchor jump would. Both Lenis and
// scrollIntoView honor the scroll-padding-top in index.css, so targets land below the navbar.
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, {
      force: true,
      onComplete: (instance) =>
        settleOn(target, () => instance.scrollTo(target, { force: true, immediate: true })),
    });
  } else {
    settleOn(target, () => target.scrollIntoView());
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
