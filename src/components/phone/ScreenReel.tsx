import { Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { ReelItem } from '../../lib/reel';
import { PhoneFrame, type PhoneSize, type PhoneState } from './PhoneFrame';
import { PlaceholderScreen } from './PlaceholderScreen';

const INTERVAL_MS = 3500;
const SCREENSHOT_WIDTH = 1080;
const SCREENSHOT_HEIGHT = 2340;

interface ScreenReelProps {
  items: ReelItem[];
  size?: PhoneSize;
  state?: PhoneState;
  /** Letter for the phone boot screen. */
  monogram?: string;
  /** Keep the first screen while something else is happening (the hero boot sequence). */
  hold?: boolean;
  /** Load the first screen eagerly (hero only). */
  priority?: boolean;
  /** Controlled mode: show this screen and never auto-cycle (the pinned projects phone). */
  activeIndex?: number;
  className?: string;
}

function usePageVisible() {
  const [visible, setVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  );
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}

// Cycles screens inside the phone: crossfade with a 12px upward slide, 600ms, every 3.5s.
// Pauses on hover, focus, a hidden tab or the pause button; never cycles with reduced motion.
export function ScreenReel({
  items,
  size = 'lg',
  state = 'on',
  monogram,
  hold = false,
  priority = false,
  activeIndex,
  className = '',
}: ScreenReelProps) {
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisible();
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // In controlled mode, remember the outgoing screen so it fades out in place.
  const controlled = activeIndex !== undefined;
  const [lastActive, setLastActive] = useState(activeIndex);
  if (controlled && activeIndex !== lastActive) {
    setPrevious(lastActive ?? null);
    setLastActive(activeIndex);
  }

  const canCycle = !controlled && items.length > 1 && !reducedMotion;
  const playing =
    canCycle && state === 'on' && !hold && !userPaused && !hovered && !focused && pageVisible;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setPrevious(index);
      setIndex((index + 1) % items.length);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [playing, index, items.length]);

  const current = controlled ? activeIndex : reducedMotion ? 0 : index;

  return (
    <div
      className={`flex flex-col items-center gap-4 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <PhoneFrame
        size={size}
        state={state}
        monogram={monogram}
        label={items[current]?.screen.alt ?? ''}
      >
        {items.map((item, i) => {
          // The incoming screen fades and slides in on top of the outgoing one, which stays
          // opaque underneath so the black glass never shows through mid-crossfade.
          const position =
            i === current
              ? 'z-2 translate-y-0 opacity-100'
              : i === previous
                ? 'z-1 translate-y-0 opacity-100'
                : 'z-0 translate-y-3 opacity-0';
          return (
            <div
              key={item.key}
              className={`absolute inset-0 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:translate-y-0 motion-reduce:transition-opacity motion-reduce:duration-100 ${position}`}
            >
              <ReelScreen item={item} eager={priority && i === 0} />
            </div>
          );
        })}
      </PhoneFrame>

      {canCycle && (
        <button
          type="button"
          onClick={() => setUserPaused((paused) => !paused)}
          aria-label={userPaused ? 'Play app screens' : 'Pause app screens'}
          className="inline-flex size-11 items-center justify-center rounded-full text-slate transition-colors duration-150 hover:bg-line hover:text-graphite motion-reduce:transition-none"
        >
          {userPaused ? (
            <Play size={20} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Pause size={20} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}

function ReelScreen({ item, eager }: { item: ReelItem; eager: boolean }) {
  const { screen } = item;
  if (screen.kind === 'placeholder') {
    return <PlaceholderScreen variant={screen.variant} name={item.projectName} tint={item.tint} />;
  }
  // Real screenshot: exported at the 1080 x 2340 source size (DESIGN.md §9). Explicit
  // dimensions reserve the space; only the first hero screen loads eagerly.
  return (
    <img
      src={screen.src}
      alt={screen.alt}
      width={SCREENSHOT_WIDTH}
      height={SCREENSHOT_HEIGHT}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
