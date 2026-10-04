import type { MouseEvent } from 'react';
import { content } from '../../data/content';
import { TreeGlyph } from '../ui/icons';

interface LogoProps {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  showHandle?: boolean;
}

// Primary square with the widget-tree glyph, the name and the GitHub handle (DESIGN.md §6.1).
export function Logo({ onClick, showHandle = true }: LogoProps) {
  return (
    <a href="#home" onClick={onClick} className="inline-flex min-h-11 items-center gap-2.5">
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[9px] bg-primary text-primary-ink">
        <TreeGlyph size={18} />
      </span>
      <span className="text-base font-bold tracking-[-0.01em] whitespace-nowrap max-[359px]:sr-only">
        {content.person.fullName}
      </span>
      {showHandle && (
        <span className="font-mono text-xs text-muted max-sm:hidden min-[980px]:max-[1179px]:hidden">
          @{content.githubUsername}
        </span>
      )}
    </a>
  );
}
