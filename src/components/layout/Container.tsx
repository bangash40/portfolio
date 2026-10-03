import type { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

// Max 1200px wide, 24px side padding on mobile and 48px on desktop (DESIGN.md §4).
export function Container({ className = '', children }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-page px-6 lg:px-12 ${className}`}>{children}</div>;
}
