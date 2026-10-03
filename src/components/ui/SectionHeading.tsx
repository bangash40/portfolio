import type { ReactNode } from 'react';

interface SectionHeadingProps {
  id?: string;
  intro?: ReactNode;
  children: ReactNode;
}

// Plain, sentence-case section heading with an optional lead paragraph (DESIGN.md §3).
export function SectionHeading({ id, intro, children }: SectionHeadingProps) {
  return (
    <div className="mb-12 lg:mb-16">
      <h2 id={id} className="font-display text-h2 font-extrabold text-graphite">
        {children}
      </h2>
      {intro && <p className="mt-6 max-w-[68ch] text-lead text-slate">{intro}</p>}
    </div>
  );
}
