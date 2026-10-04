import type { ReactNode } from 'react';

export type PhoneSize = 'lg' | 'sm';
export type PhoneState = 'off' | 'on';

interface PhoneFrameProps {
  size?: PhoneSize;
  state?: PhoneState;
  /** Describes what the screen currently shows (DESIGN.md §10). */
  label: string;
  className?: string;
  children?: ReactNode;
}

// lg is the hero phone; sm is used in project cards and on the 404 page. Body radius 46px,
// screen 38px (DESIGN.md §4); sm scales them down so the device keeps its proportions.
const sizes: Record<PhoneSize, { width: string; body: string; screen: string }> = {
  lg: {
    // Also bounded by viewport height so the phone fits short laptop screens.
    width: 'w-[min(72vw,280px,max(190px,calc((100svh_-_170px)*0.48)))]',
    body: 'rounded-phone p-[9px]',
    screen: 'rounded-screen',
  },
  sm: {
    width: 'w-[min(56vw,200px)]',
    body: 'rounded-[36px] p-[7px]',
    screen: 'rounded-[30px]',
  },
};

// The device: near-black body with a thin rim, side buttons, dynamic island and a 9:19.5 screen.
export function PhoneFrame({
  size = 'lg',
  state = 'on',
  label,
  className = '',
  children,
}: PhoneFrameProps) {
  const s = sizes[size];

  return (
    <div role="img" aria-label={label} className={`relative ${s.width} ${className}`}>
      {/* The long soft shadow, pre-rendered by scripts/phone-shadow.html: a live 80px blur is very
          slow to paint without a GPU. Insets are percentages, so it scales with every size. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-[20%] -top-[3.22%] -bottom-[16.26%] bg-[url(/phone-shadow.png)] bg-size-[100%_100%] bg-no-repeat"
      />

      {/* Side buttons: volume up and down on the left, power on the right */}
      <span
        aria-hidden="true"
        className="absolute top-[20%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-border-2"
      />
      <span
        aria-hidden="true"
        className="absolute top-[29%] -left-[2px] h-[7%] w-[3px] rounded-l-sm bg-border-2"
      />
      <span
        aria-hidden="true"
        className="absolute top-[24%] -right-[2px] h-[11%] w-[3px] rounded-r-sm bg-border-2"
      />

      <div className={`relative bg-device ring-1 ring-border-2 ring-inset ${s.body}`}>
        <div className={`relative isolate aspect-[9/19.5] overflow-hidden bg-bg-2 ${s.screen}`}>
          {children}
          {state === 'off' && (
            <div aria-hidden="true" className="absolute inset-0 z-10 bg-device" />
          )}
          <div
            aria-hidden="true"
            className="absolute top-[2.4%] left-1/2 z-20 h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
  );
}
