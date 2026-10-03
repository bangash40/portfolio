import type { ComponentType, CSSProperties } from 'react';
import type { Screen } from '../../types/content';

type Variant = Extract<Screen, { kind: 'placeholder' }>['variant'];

interface PlaceholderScreenProps {
  variant: Variant;
  /** Project name shown in the app title bar. */
  name: string;
  /** Project accent color, applied at low opacity. */
  tint: string;
}

// Designed stand-in app screens used until real screenshots exist (DESIGN.md §6.3).
// Everything is sized in container query units so one design fits the lg and sm phones.
export function PlaceholderScreen({ variant, name, tint }: PlaceholderScreenProps) {
  const Body = bodies[variant];

  return (
    <div
      aria-hidden="true"
      className="@container absolute inset-0 overflow-hidden bg-[#f6f7f9] font-body text-[#1d2330]"
      style={{ '--tint': tint } as CSSProperties}
    >
      <div className="absolute inset-0 bg-(--tint) opacity-[0.07]" />
      <div className="relative flex h-full flex-col">
        <StatusBar />
        <p className="line-clamp-2 px-[7cqw] pt-[3cqw] pb-[4cqw] font-display text-[6.4cqw] leading-tight font-extrabold tracking-[-0.02em]">
          {name}
        </p>
        <div className="flex-1 px-[7cqw]">
          <Body />
        </div>
      </div>
      <span className="absolute bottom-[2.2cqw] left-1/2 h-[1.4cqw] w-[34cqw] -translate-x-1/2 rounded-full bg-[#1d2330]" />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-[13cqw] items-center justify-between px-[9cqw] pt-[1.5cqw] text-[4.2cqw] font-semibold">
      <span>9:41</span>
      <span className="relative h-[3.6cqw] w-[7cqw] rounded-[1cqw] border-[0.5cqw] border-current p-[0.4cqw]">
        <span className="block h-full w-3/4 rounded-[0.4cqw] bg-current" />
      </span>
    </div>
  );
}

function Bar({ className = '', width }: { className?: string; width?: number }) {
  return (
    <span
      className={`block rounded-full bg-[#d9dde4] ${className}`}
      style={width ? { width: `${width}%` } : undefined}
    />
  );
}

function Accent({ className = '', strong = false }: { className?: string; strong?: boolean }) {
  return (
    <span className={`block bg-(--tint) ${strong ? 'opacity-40' : 'opacity-20'} ${className}`} />
  );
}

// Intern Management System: intern/admin switch and a list of interns.
function ImsBody() {
  return (
    <div className="flex flex-col gap-[4cqw]">
      <div className="flex h-[10cqw] rounded-full bg-[#e7eaef] p-[1cqw] text-[3.6cqw] font-semibold">
        <span className="flex flex-1 items-center justify-center rounded-full bg-white">
          Intern
        </span>
        <span className="flex flex-1 items-center justify-center text-[#5b6475]">Admin</span>
      </div>
      <Bar className="mt-[2cqw] h-[2.4cqw] w-[30%]" />
      {[70, 55, 64, 48, 60].map((width) => (
        <div
          key={width}
          className="flex items-center gap-[3.5cqw] rounded-[4cqw] bg-white p-[3cqw]"
        >
          <Accent strong className="size-[9cqw] shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-[1.8cqw]">
            <span
              className="block h-[2.6cqw] rounded-full bg-[#1d2330] opacity-70"
              style={{ width: `${width}%` }}
            />
            <Bar className="h-[2.2cqw] w-[40%]" />
          </div>
          <Accent className="h-[5cqw] w-[11cqw] rounded-full" />
        </div>
      ))}
    </div>
  );
}

// Kheench: link field, fetch button, preview and quality chips.
function KheenchBody() {
  return (
    <div className="flex flex-col gap-[4cqw]">
      <div className="flex h-[11cqw] items-center gap-[3cqw] rounded-[3cqw] border-[0.5cqw] border-[#d9dde4] bg-white px-[3.5cqw]">
        <Accent strong className="size-[4.5cqw] rounded-full" />
        <Bar className="h-[2.4cqw] w-[65%]" />
      </div>
      <div className="relative flex h-[10cqw] items-center justify-center overflow-hidden rounded-full">
        <Accent strong className="absolute inset-0" />
        <span className="relative block h-[2.4cqw] w-[22%] rounded-full bg-white" />
      </div>
      <div className="relative mt-[2cqw] aspect-video overflow-hidden rounded-[4cqw] bg-[#e1e4ea]">
        <span className="absolute top-1/2 left-1/2 size-0 -translate-x-1/3 -translate-y-1/2 border-y-[4cqw] border-l-[6.5cqw] border-y-transparent border-l-white" />
      </div>
      <div className="flex flex-wrap gap-[2.2cqw] text-[3.4cqw] font-semibold">
        {['1080p', '720p', '480p', 'Audio'].map((label, index) => (
          <span
            key={label}
            className="relative overflow-hidden rounded-full border-[0.5cqw] border-[#d9dde4] bg-white px-[3.2cqw] py-[1.4cqw]"
          >
            {index === 0 && <Accent strong className="absolute inset-0" />}
            <span className="relative">{label}</span>
          </span>
        ))}
      </div>
      {[80, 62, 70].map((width) => (
        <Bar key={width} width={width} className="h-[2.4cqw]" />
      ))}
    </div>
  );
}

// Arc-style mini player: a web page with a floating video player on top.
function MiniPlayerBody() {
  return (
    <>
      <div className="flex flex-col gap-[3.5cqw]">
        <div className="flex h-[8cqw] items-center rounded-full bg-[#e7eaef] px-[3.5cqw]">
          <span className="block h-[2.2cqw] w-[55%] rounded-full bg-[#cfd4dc]" />
        </div>
        <span className="mt-[2cqw] block h-[4cqw] w-[80%] rounded-full bg-[#1d2330] opacity-70" />
        <div className="aspect-video rounded-[3cqw] bg-[#e1e4ea]" />
        {[92, 85, 96, 70, 88, 60].map((width, index) => (
          <Bar key={index} width={width} className="h-[2.4cqw]" />
        ))}
      </div>
      <div className="absolute right-[7cqw] bottom-[10cqw] w-[56cqw] overflow-hidden rounded-[4cqw] bg-[#1d2330] shadow-[0_3cqw_8cqw_rgb(29_35_48/0.35)]">
        <div className="relative aspect-video">
          <Accent strong className="absolute inset-0 opacity-60" />
          <span className="absolute top-1/2 left-1/2 size-0 -translate-x-1/3 -translate-y-1/2 border-y-[3cqw] border-l-[5cqw] border-y-transparent border-l-white" />
        </div>
        <div className="flex items-center gap-[2.5cqw] p-[2.5cqw]">
          <span className="block h-[1.2cqw] flex-1 rounded-full bg-white/25">
            <span className="block h-full w-2/5 rounded-full bg-white" />
          </span>
        </div>
      </div>
    </>
  );
}

// This portfolio: the hero of this site, in miniature.
function PortfolioBody() {
  return (
    <div className="flex flex-col gap-[3cqw]">
      <div className="flex items-center justify-between">
        <span className="block h-[3cqw] w-[22%] rounded-full bg-[#1d2330] opacity-70" />
        <Accent strong className="h-[6cqw] w-[18cqw] rounded-full" />
      </div>
      <span className="mt-[8cqw] block h-[9cqw] w-[58%] rounded-[2cqw] bg-[#1d2330]" />
      <span className="block h-[9cqw] w-[80%] rounded-[2cqw] bg-[#1d2330]" />
      <Bar className="mt-[3cqw] h-[2.6cqw] w-[90%]" />
      <Bar className="h-[2.6cqw] w-[70%]" />
      <div className="mt-[3cqw] flex gap-[2.5cqw]">
        <Accent strong className="h-[8cqw] w-[30cqw] rounded-full" />
        <span className="block h-[8cqw] w-[30cqw] rounded-full border-[0.6cqw] border-[#1d2330]" />
      </div>
      <div className="mt-[6cqw] flex justify-center">
        <div className="h-[56cqw] w-[27cqw] rounded-[5cqw] border-[1.4cqw] border-[#1d2330] p-[1cqw]">
          <Accent strong className="h-full w-full rounded-[3.5cqw]" />
        </div>
      </div>
    </div>
  );
}

const bodies: Record<Variant, ComponentType> = {
  ims: ImsBody,
  kheench: KheenchBody,
  miniplayer: MiniPlayerBody,
  portfolio: PortfolioBody,
};
