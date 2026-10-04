import type { ReactNode } from 'react';

interface ChipProps {
  /** Primary-tinted, for the technologies that matter most. */
  hot?: boolean;
  children: ReactNode;
}

// Mono technology chip, 28px tall with a 7px radius (DESIGN.md §3, §4).
export function Chip({ hot = false, children }: ChipProps) {
  return (
    <span
      className={`inline-flex h-7 items-center gap-1.5 rounded-[7px] border px-2.5 font-mono text-xs ${
        hot
          ? 'border-primary-line bg-primary-soft text-primary'
          : 'border-border bg-surface-2 text-muted'
      }`}
    >
      {children}
    </span>
  );
}
