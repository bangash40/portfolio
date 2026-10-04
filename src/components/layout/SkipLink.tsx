interface SkipLinkProps {
  targetId?: string;
}

// First focusable element on the page; hidden until it receives keyboard focus.
export function SkipLink({ targetId = 'main' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:inline-flex focus:h-12 focus:items-center focus:rounded-full focus:bg-primary focus:px-6 focus:font-semibold focus:text-primary-ink"
    >
      Skip to content
    </a>
  );
}
