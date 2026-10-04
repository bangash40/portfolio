import type { ComponentPropsWithRef } from 'react';

type IconLinkProps = ComponentPropsWithRef<'a'> & { href: string; label: string };

// 44 × 44 icon-only link (DESIGN.md §6.12). `label` is its accessible name.
export function IconLink({ label, className = '', children, ...rest }: IconLinkProps) {
  return (
    <a
      aria-label={label}
      className={`inline-flex size-11 items-center justify-center rounded-[11px] border border-transparent text-muted transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-px hover:border-border hover:bg-surface hover:text-text motion-reduce:transition-none ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
