import { useEffect, useRef } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { useReducedMotion } from './useReducedMotion';

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

// Pulls an element up to `maxPx` toward the cursor while it hovers (DESIGN.md §6.4).
// Mouse and trackpad only; off with reduced motion.
export function useMagnetic<T extends HTMLElement>(maxPx = 6) {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !finePointer) return;

    // GSAP loads and the tweens are created on first hover, not at mount: this keeps GSAP off
    // the critical path, and quickTo reads the computed transform, which forces a layout.
    type QuickTo = (value: number) => void;
    let xTo: QuickTo | null = null;
    let yTo: QuickTo | null = null;
    let disposed = false;
    let killTweens: (() => void) | undefined;
    // Measure the resting center on enter so the pull itself doesn't feed back into it.
    let center = { x: 0, y: 0, halfWidth: 1, halfHeight: 1 };

    const onEnter = async () => {
      const { gsap } = await import('../lib/gsap');
      if (disposed) return;
      xTo ??= gsap.quickTo(element, 'x', { duration: 0.4, ease: 'power3.out' });
      yTo ??= gsap.quickTo(element, 'y', { duration: 0.4, ease: 'power3.out' });
      killTweens ??= () => {
        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: 'transform' });
      };
      const rect = element.getBoundingClientRect();
      const x = Number(gsap.getProperty(element, 'x'));
      const y = Number(gsap.getProperty(element, 'y'));
      center = {
        x: rect.left - x + rect.width / 2,
        y: rect.top - y + rect.height / 2,
        halfWidth: rect.width / 2,
        halfHeight: rect.height / 2,
      };
    };
    const onMove = (event: PointerEvent) => {
      if (!xTo || !yTo) return;
      xTo(clamp((event.clientX - center.x) / center.halfWidth) * maxPx);
      yTo(clamp((event.clientY - center.y) / center.halfHeight) * maxPx);
    };
    const onLeave = () => {
      xTo?.(0);
      yTo?.(0);
    };

    element.addEventListener('pointerenter', onEnter);
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);
    return () => {
      element.removeEventListener('pointerenter', onEnter);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
      disposed = true;
      killTweens?.();
    };
  }, [reducedMotion, finePointer, maxPx]);

  return ref;
}
