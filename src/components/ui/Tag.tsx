import type { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
}

// Tech stack label: outlined, no per-technology colors (DESIGN.md §6.5).
export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-field border border-line px-3 py-1 text-small text-slate">
      {children}
    </span>
  );
}
