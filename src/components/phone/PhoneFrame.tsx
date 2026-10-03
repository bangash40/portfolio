import type { ReactNode } from 'react';

export type PhoneSize = 'lg' | 'sm';
export type PhoneState = 'off' | 'booting' | 'on';

interface PhoneFrameProps {
  size?: PhoneSize;
  state?: PhoneState;
  /** Describes what the screen currently shows (DESIGN.md §6.1). */
  label: string;
  /** Letter shown at screen center during the boot sequence. */
  monogram?: string;
  className?: string;
  children?: ReactNode;
}

// lg is the hero and pinned phone; sm is the per-project and 404 phone. The sm radii are the
// lg ones (52px body, 42px screen) scaled down so the device keeps the same proportions.
const sizes: Record<PhoneSize, { width: string; body: string; screen: string; led: string }> = {
  lg: {
    width: 'w-[min(70vw,300px)]',
    body: 'rounded-phone p-[10px]',
    screen: 'rounded-screen',
    led: 'top-[3px] size-1',
  },
  sm: {
    width: 'w-[min(56vw,200px)]',
    body: 'rounded-[36px] p-[7px]',
    screen: 'rounded-[29px]',
    led: 'top-[2px] size-[3px]',
  },
};

// The signature device: pure CSS, graphite body, dynamic island, side buttons, power LED,
// 9:19.5 screen and a soft glass reflection. State sets static end points; the boot sequence
// (GSAP, in Hero) animates between them through the data-phone-* hooks.
export function PhoneFrame({
  size = 'lg',
  state = 'on',
  label,
  monogram,
  className = '',
  children,
}: PhoneFrameProps) {
  const s = sizes[size];
  const powered = state === 'on';

  return (
    <div
      role="img"
      aria-label={label}
      data-phone-state={state}
      className={`relative ${s.width} ${className}`}
    >
      {/* Side buttons: volume up and down on the left, power on the right */}
      <span
        aria-hidden="true"
        className="absolute top-[20%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-phone-rim"
      />
      <span
        aria-hidden="true"
        className="absolute top-[29%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-phone-rim"
      />
      <span
        aria-hidden="true"
        className="absolute top-[24%] -right-[2px] h-[11%] w-[3px] rounded-r-sm bg-phone-rim"
      />

      <div className={`relative bg-phone shadow-phone ring-1 ring-phone-rim ring-inset ${s.body}`}>
        {/* Power LED: dim until the phone is on, then a saffron glow */}
        <span
          aria-hidden="true"
          className={`absolute right-[30%] rounded-full bg-phone-rim ${s.led}`}
        >
          <span
            data-phone-led
            className={`absolute inset-0 rounded-full bg-saffron shadow-[0_0_6px_1px_var(--color-saffron)] ${
              powered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </span>

        <div
          data-phone-screen
          className={`@container relative isolate aspect-[9/19.5] overflow-hidden bg-phone-screen ${s.screen}`}
        >
          {children}

          {/* Black glass shown while the phone is off or booting */}
          <div
            data-phone-power
            aria-hidden="true"
            className={`absolute inset-0 z-10 flex items-center justify-center bg-phone-screen ${
              powered ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {monogram && (
              <span
                data-phone-monogram
                className="font-display text-[22cqw] leading-none font-extrabold text-white opacity-0"
              >
                {monogram}
              </span>
            )}
          </div>

          <div
            aria-hidden="true"
            className="absolute top-[2.4%] left-1/2 z-20 h-[3.4%] w-[31%] -translate-x-1/2 rounded-full bg-black"
          />

          {/* The only gradient on the site: a soft diagonal reflection at 6% white */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(135deg,rgb(255_255_255/0.06)_0%,rgb(255_255_255/0)_55%)]"
          />
        </div>
      </div>
    </div>
  );
}
