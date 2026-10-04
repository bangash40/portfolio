// The file-tab label that opens every section: `lib/<name>.dart`, name in primary (DESIGN.md §6.4).
export function FileLabel({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[12.5px] text-muted">
      lib/<span className="font-medium text-primary">{name}</span>.dart
    </span>
  );
}
