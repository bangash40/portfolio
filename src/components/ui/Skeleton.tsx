interface SkeletonProps {
  className?: string;
}

// Static loading block in the Line color; no spinners or shimmer (DESIGN.md §6.8).
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div aria-hidden="true" className={`rounded-field bg-line ${className}`} />;
}
